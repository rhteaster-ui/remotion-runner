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

TELEGRAM_BOT_TOKEN = "9045696572:AAHSPg6Q9sgSOlybaXTV5D0Vzq2azhl3mdw"
TELEGRAM_OWNER_ID = 8343466107

OUT_DIR = "/root/remotion-krypton/out"
os.makedirs(OUT_DIR, exist_ok=True)


def dispatch_workflow(composition="ERekapHorizontal", scale="1", crf="22"):
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


def send_telegram_video(video_path, thumb_path, caption, width=1920, height=1080, duration=60):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
    with open(video_path, "rb") as f_vid:
        files = {
            "video": ("ERekap-Horizontal-1080p.mp4", f_vid, "video/mp4"),
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
        r = requests.post(url, data=data, files=files, timeout=300)
        try:
            return r.json()
        except Exception:
            return {"ok": False, "raw": r.text}


def main():
    print("[*] Dispatching GitHub Actions Cloud Runner for ERekapHorizontal (1920x1080)...")
    if not dispatch_workflow(composition="ERekapHorizontal", scale="1", crf="22"):
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
            print("[+] Cloud Runner sukses menyelesaikan render video horizontal!")
            break
        time.sleep(12)

    art_id, size = get_artifact_id(run_id)
    if not art_id:
        print("[!] Artifact remotion-video tidak ditemukan!")
        sys.exit(1)
    print(f"[+] Artifact ditemukan: ID={art_id}, Ukuran={size / (1024 * 1024):.2f} MB")

    zip_path = os.path.join(OUT_DIR, "erekap_horizontal_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "erekap_horizontal_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh artifact video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    thumb_source = os.path.join(extract_dir, "thumb.jpg")
    final_video = os.path.join(OUT_DIR, "ERekap-Horizontal-Final.mp4")
    final_thumb = os.path.join(OUT_DIR, "ERekap-Horizontal-Final-thumb.jpg")

    if os.path.exists(video_source):
        os.replace(video_source, final_video)
    if os.path.exists(thumb_source):
        os.replace(thumb_source, final_thumb)

    # Also sync to /root/rekap-absen/public for web application showcase
    web_public = "/root/rekap-absen/public"
    if os.path.exists(web_public):
        import shutil
        web_video = os.path.join(web_public, "erekap-horizontal-upgraded.mp4")
        shutil.copy2(final_video, web_video)
        if os.path.exists(final_thumb):
            shutil.copy2(final_thumb, os.path.join(web_public, "erekap-horizontal-poster.jpg"))
        print(f"[+] Asset video dan poster berhasil disinkronkan ke {web_public}")

    probe_cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration,size,bit_rate:stream=width,height,codec_name",
        "-of", "json",
        final_video
    ]
    probe_res = subprocess.run(probe_cmd, capture_output=True, text=True)
    meta = json.loads(probe_res.stdout)
    fmt = meta.get("format", {})
    dur = float(fmt.get("duration", 0))
    fsize = int(fmt.get("size", 0)) / (1024 * 1024)

    streams = meta.get("streams", [])
    v_stream = next((s for s in streams if s.get("width")), {})
    w = v_stream.get("width")
    h = v_stream.get("height")
    codec = v_stream.get("codec_name")

    print(f"\n[+] Hasil FFprobe Metadata Video:")
    print(f"    - Resolusi: {w}x{h} ({codec})")
    print(f"    - Durasi: {dur:.2f} detik")
    print(f"    - Ukuran: {fsize:.2f} MB")

    caption = (
        f"🎬 <b>REMOTION SHOWCASE (1 MENIT) · E-REKAP REFINED</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<b>Karya Orisinal:</b> rhmt ofc (rhmt.biz.id)\n"
        f"<b>Komposisi:</b> <code>ERekapHorizontal</code> (1920x1080 · 60 FPS)\n"
        f"<b>Voiceover:</b> Google AI Studio (Fenrir · Energetic Male Tech)\n"
        f"<b>Durasi:</b> {dur:.1f}s ({int(dur*30)} Frames) | <b>Ukuran:</b> {fsize:.2f} MB\n\n"
        f"<b>Penyempurnaan Visual & Audio (Sesuai Arahan):</b>\n"
        f"• <b>Zero Cursor Clutter:</b> Kursor mengganggu dibuang tuntas, panggung visual bersih & fokus.\n"
        f"• <b>Suara Lebih Bertenaga:</b> Karakter Fenrir yang berwibawa, tegas, cepat, & antusias.\n"
        f"• <b>Speed Ramping & Slow-Mo:</b> Whip-in berkecepatan tinggi diikuti slow-motion float mewah.\n"
        f"• <b>Camera Keyframing:</b> Zoom fokus ke rolling counter 94.7% & pan freeze-column Excel.\n"
        f"• <b>Stempel A4 Slam & Shake:</b> Hentakan stempel resmi madrasah dengan getaran kamera nyata.\n"
        f"• <b>Architectural Bento Grid:</b> Panggung 3 kolom rapi spesifikasi Next.js 16 & rhmt ofc.\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<i>Dirender via GitHub Actions Cloud Runner</i>"
    )

    print("\n[*] Mengirim video final ke Telegram Tuan Rahmat...")
    res = send_telegram_video(final_video, final_thumb, caption, width=w or 1920, height=h or 1080, duration=dur)
    if res.get("ok"):
        print("[+] Video BERHASIL dikirimkan ke Telegram Tuan Rahmat!")
    else:
        print(f"[!] Gagal mengirim video ke Telegram: {res}")


if __name__ == "__main__":
    main()
