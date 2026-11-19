#!/usr/bin/env python3
import os
import sys
import json
import time
import subprocess
import urllib.request
import urllib.parse
import urllib.error
import requests

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN") or (open("/root/.runner_token").read().strip() if os.path.exists("/root/.runner_token") else (open("/root/gh.txt").read().strip() if os.path.exists("/root/gh.txt") else ""))
REPO = "rhteaster-ui/remotion-runner"
WORKFLOW_FILE = "render.yml"

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_OWNER_ID = 8343466107
WA_OWNER_JID = "6285196636945@s.whatsapp.net"
WA_GROUP_JID = "120363428833806826@g.us"
WA_OUTBOX_DIR = "/root/wa2shell/tmp/outbox"

OUT_DIR = "/root/remotion-krypton/out"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(WA_OUTBOX_DIR, exist_ok=True)
WEB_PUBLIC = "/root/rekap-absen/public"


def dispatch_workflow(composition="Gemini4Neon", scale="1", crf="20"):
    url = f"https://api.github.com/repos/{REPO}/actions/workflows/{WORKFLOW_FILE}/dispatches"
    payload = {
        "ref": "main",
        "inputs": {
            "composition": composition,
            "scale": scale,
            "crf": crf
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "Agency-DevOps"
        },
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        if resp.status in (204, 201, 200):
            print(f"[+] Workflow {WORKFLOW_FILE} dispatched successfully for {composition}!")
            return True
    return False


def get_latest_run_id():
    url = f"https://api.github.com/repos/{REPO}/actions/runs?per_page=5"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps"
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        runs = data.get("workflow_runs", [])
        if runs:
            return runs[0].get("id")
    return None


def check_run_status(run_id):
    url = f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps"
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data.get("status"), data.get("conclusion")


def get_artifact_id(run_id):
    url = f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}/artifacts"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps"
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        artifacts = data.get("artifacts", [])
        for art in artifacts:
            if art.get("name") == "remotion-video":
                return art.get("id"), art.get("size_in_bytes")
    return None, None


def download_artifact(art_id, target_zip):
    url = f"https://api.github.com/repos/{REPO}/actions/artifacts/{art_id}/zip"
    cmd = [
        "curl", "-sL",
        "-H", f"Authorization: token {GITHUB_TOKEN}",
        "-H", "Accept: application/vnd.github.v3+json",
        url,
        "-o", target_zip
    ]
    subprocess.run(cmd, check=True)


def send_telegram_video(video_path, thumb_path, caption, width=1080, height=1920, duration=62):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
    with open(video_path, "rb") as f_vid:
        files = {
            "video": ("Gemini-4-Neon-Official.mp4", f_vid, "video/mp4"),
        }
        if thumb_path and os.path.exists(thumb_path):
            files["thumbnail"] = ("thumb.jpg", open(thumb_path, "rb"), "image/jpeg")

        data = {
            "chat_id": TELEGRAM_OWNER_ID,
            "caption": caption,
            "parse_mode": "HTML",
            "supports_streaming": True,
            "width": width,
            "height": height,
            "duration": int(duration),
        }
        r = requests.post(url, data=data, files=files, timeout=600)
        try:
            return r.json()
        except Exception:
            return {"ok": False, "raw": r.text}


def queue_whatsapp_video(video_path, caption):
    for jid in [WA_GROUP_JID, WA_OWNER_JID]:
        job_id = f"outbox_{int(time.time() * 1000)}_{abs(hash(jid)) % 10000}"
        job_file = os.path.join(WA_OUTBOX_DIR, f"{job_id}.json")
        job_data = {
            "jid": jid,
            "type": "video",
            "filePath": video_path,
            "caption": caption
        }
        with open(job_file, "w") as f:
            json.dump(job_data, f, indent=2)
        print(f"[+] WhatsApp outbox queued for {jid}: {job_file}")
        time.sleep(1)


def main():
    composition = "Gemini4Neon"
    scale = "1"
    crf = "20"

    print(f"[*] Dispatching GitHub Actions Cloud Runner for {composition} (scale={scale}, crf={crf})...")
    if not dispatch_workflow(composition=composition, scale=scale, crf=crf):
        print("[!] Gagal mendispatch workflow!")
        sys.exit(1)

    time.sleep(6)
    run_id = get_latest_run_id()
    print(f"[+] Active GitHub Run ID: {run_id}")

    print("[*] Menunggu GitHub Actions Cloud Runner menyelesaikan rendering...")
    start_time = time.time()
    while True:
        status, conclusion = check_run_status(run_id)
        elapsed = int(time.time() - start_time)
        print(f"    [{elapsed}s] Status: {status} | Conclusion: {conclusion}")
        if status == "completed":
            if conclusion != "success":
                print(f"[!] Cloud run gagal dengan conclusion: {conclusion}")
                sys.exit(1)
            print("[+] Cloud Runner sukses menyelesaikan render video Gemini 4 Neon!")
            break
        time.sleep(12)

    art_id, size = get_artifact_id(run_id)
    if not art_id:
        print("[!] Artifact remotion-video tidak ditemukan!")
        sys.exit(1)
    print(f"[+] Artifact ditemukan: ID={art_id}, Ukuran={size / (1024 * 1024):.2f} MB")

    zip_path = os.path.join(OUT_DIR, "gemini4_neon_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "gemini4_neon_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh artifact video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    raw_video = os.path.join(OUT_DIR, "Gemini-4-Neon-Raw.mp4")

    if os.path.exists(video_source):
        os.replace(video_source, raw_video)

    # Web & Streaming optimization with FFmpeg (+faststart, high profile)
    final_video = os.path.join(OUT_DIR, "Gemini-4-Neon-Final.mp4")
    web_video = os.path.join(WEB_PUBLIC, "gemini4-neon.mp4")
    poster_img = os.path.join(WEB_PUBLIC, "gemini4-neon-poster.jpg")

    print("[*] Mengoptimasi video untuk streaming (+faststart)...")
    ffmpeg_cmd = [
        "ffmpeg", "-y", "-i", raw_video,
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.2",
        "-pix_fmt", "yuv420p", "-crf", "22", "-preset", "slow",
        "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "192k",
        final_video
    ]
    subprocess.run(ffmpeg_cmd, check=True)

    # Copy to web public
    subprocess.run(["cp", "-f", final_video, web_video], check=True)

    print("[*] Membuat poster thumbnail...")
    thumb_cmd = [
        "ffmpeg", "-y", "-ss", "00:00:42.000", "-i", final_video,
        "-vframes", "1", "-q:v", "2",
        poster_img
    ]
    subprocess.run(thumb_cmd, check=True)

    final_size_mb = os.path.getsize(final_video) / (1024 * 1024)
    print(f"[+] Final Video siap: {final_video} ({final_size_mb:.2f} MB)")

    # Telegram Caption
    tg_caption = (
        "<b>Gemini 4 Neon · Kinetic Motion Graphics Edition (Official Nov 2026)</b>\n\n"
        "Upgraded Tech Explainer (1080x1920 9:16 Vertikal · 62s @ 30 FPS):\n"
        "• <b>3D Kinetic Camera:</b> Smooth 3D tilt, continuous Bezier zoom, &amp; camera slam shake.\n"
        "• <b>Aset Resmi Original:</b> Vektor asli Google Gemini 4-color Spark, Anthropic Claude, &amp; OpenAI.\n"
        "• <b>Zero Periodic Slop:</b> Arsitektur 3 Tier Google AI (Carbon Frontier, Neon Workhorse, Hydrogen Edge).\n"
        "• <b>Interactive Thinking Selector:</b> Low → Medium → High → X-High + 1 Juta Token Context.\n"
        "• <b>Benchmark Battle:</b> Skor 61.4 menempel ketat Claude Opus 5.5 &amp; GPT-6.2 Sol dengan kecepatan 142 tok/s.\n"
        "• <b>Sound Design &amp; Ducking:</b> 22 frame-locked micro-SFX (whoosh, lock, impact, stamp) + BGM auto-ducking.\n"
        "• <b>Subtitle Karaoke:</b> Safe-zone bawah 80px, font 42px, sinkron suara Puck.\n\n"
        f"Ukuran: {final_size_mb:.2f} MB | Codec: H.264 / AAC (+faststart)\n"
        "<i>Dikembangkan oleh <b>rhmt ofc</b> · rhmt.biz.id</i>"
    )

    print("[*] Mengirim video ke Telegram Tuan Rahmat...")
    tg_resp = send_telegram_video(final_video, poster_img, tg_caption, width=1080, height=1920, duration=62)
    if tg_resp.get("ok"):
        print("[+] Video Gemini 4 Neon BERHASIL terkirim ke Telegram!")
    else:
        print(f"[!] Gagal kirim Telegram: {tg_resp}")

    # Queue to WhatsApp
    wa_caption = (
        "*Gemini 4 Neon · Kinetic Motion Graphics Edition (Nov 2026)*\n\n"
        "Video Motion Graphics Standar Tinggi (1080x1920 Vertikal · 62 Detik):\n"
        "• *3D Kinetic Camera:* Pergerakan kamera 3D perspektif, tilt dinamis, dan slam shake\n"
        "• *Aset Vektor Asli:* Vektor resmi Google Gemini Spark, Claude, dan OpenAI (Zero CSS polos)\n"
        "• *Arsitektur 3 Tier AI:* Carbon (Riset Berat) vs Neon (Workhorse Seimbang) vs Hydrogen (Eksekutor Kilat)\n"
        "• *Scalable Thinking & 1M Context:* Mode bertingkat hingga xhigh & context window masif 1 juta token\n"
        "• *Adu Otak Resmi:* Skor 61.4 menempel Claude Opus 5.5 & GPT-6.2 Sol, kecepatan hampir 3x lipat lebih ngebut (142 tok/s)\n"
        "• *Audio Mix Presisi:* Micro-SFX tersinkron frame + auto-ducking musik latar\n"
        f"• *Ukuran Berkas:* {final_size_mb:.2f} MB (+faststart streaming)\n\n"
        "_Dikembangkan oleh *rhmt ofc* (rhmt.biz.id)_"
    )
    print("[*] Memasukkan video ke antrean WhatsApp outbox...")
    queue_whatsapp_video(final_video, wa_caption)
    print("[+] Selesai!")


if __name__ == "__main__":
    main()
