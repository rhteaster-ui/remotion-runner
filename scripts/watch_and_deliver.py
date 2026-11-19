import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN") or (open("/root/gh.txt").read().strip() if os.path.exists("/root/gh.txt") else "")
REPO = "rhteaster-ui/remotion-runner"
RUN_ID = "43995741860"

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_OWNER_ID = 8343466107

OUT_DIR = "/root/remotion-krypton/out"
os.makedirs(OUT_DIR, exist_ok=True)


def check_run_status():
    url = f"https://api.github.com/repos/{REPO}/actions/runs/{RUN_ID}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-Watcher",
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data.get("status"), data.get("conclusion")


def get_artifact_id():
    url = f"https://api.github.com/repos/{REPO}/actions/runs/{RUN_ID}/artifacts"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-Watcher",
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
        "curl",
        "-sL",
        "-H",
        f"Authorization: token {GITHUB_TOKEN}",
        "-H",
        "Accept: application/vnd.github.v3+json",
        url,
        "-o",
        target_zip,
    ]
    subprocess.run(cmd, check=True)


def send_telegram_video(video_path, thumb_path, caption):
    # Gunakan curl multipart agar andal menangani file besar
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
    cmd = [
        "curl",
        "-s",
        "-F",
        f"chat_id={TELEGRAM_OWNER_ID}",
        "-F",
        f"video=@{video_path}",
        "-F",
        f"caption={caption}",
        "-F",
        "parse_mode=Markdown",
    ]
    if thumb_path and os.path.exists(thumb_path):
        cmd.extend(["-F", f"thumb=@{thumb_path}"])

    res = subprocess.run(cmd, capture_output=True, text=True)
    try:
        data = json.loads(res.stdout)
        return data
    except Exception:
        return {"ok": False, "raw": res.stdout}


def main():
    print(f"[*] Menunggu GitHub Actions Run {RUN_ID} selesai...")
    while True:
        status, conclusion = check_run_status()
        print(f"    Current status: {status} | conclusion: {conclusion}")
        if status == "completed":
            if conclusion != "success":
                print(f"[!] Run gagal dengan status: {conclusion}")
                sys.exit(1)
            print("[+] GitHub Actions Runner berhasil menyelesaikan render!")
            break
        time.sleep(10)

    # Dapatkan Artifact ID
    art_id, size = get_artifact_id()
    if not art_id:
        print("[!] Artifact remotion-video tidak ditemukan!")
        sys.exit(1)
    print(f"[+] Menemukan artifact: ID={art_id}, Ukuran={size / (1024 * 1024):.2f} MB")

    zip_path = os.path.join(OUT_DIR, "repoflow_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "repoflow_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh artefak video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    thumb_source = os.path.join(extract_dir, "thumb.jpg")
    final_video = os.path.join(OUT_DIR, "RepoFlowPremium.mp4")
    final_thumb = os.path.join(OUT_DIR, "RepoFlowPremium-thumb.jpg")

    if os.path.exists(video_source):
        os.replace(video_source, final_video)
    if os.path.exists(thumb_source):
        os.replace(thumb_source, final_thumb)

    # Verifikasi FFprobe
    probe_cmd = [
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration,size,bit_rate:stream=width,height,codec_name",
        "-of",
        "json",
        final_video,
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

    print(
        f"[+] Verifikasi FFprobe: {w}x{h} ({codec}) | Durasi: {dur:.2f}s | Ukuran: {fsize:.2f} MB"
    )

    caption = (
        "🎬 *RepoFlow v2 — Vertical Video Teardown*\n"
        "Karya Orisinal: *rhmt ofc* (`rhmt.biz.id`)\n\n"
        "⚡ *Highlight Aspek Pembaruan:*\n"
        "• *Pembersihan Ikon:* Ikon 3D lama dihapus tuntas, digantikan aset resmi squircle RepoFlow (`icon.png`) & vektor SVG presisi.\n"
        "• *Authentic Workspace UI:* Tampilan riil dashboard & staging Merkle Tree (`repoflow.web.id`) dengan metrik 1.190 sync dan JSZip Worker 48ms.\n"
        "• *Branding Portofolio rhmt.biz.id:* Foto profil resmi Tuan Rahmat, emblem relay, serta badges tech stack (AGY, React, TS, Gemini).\n"
        "• *Google AI Audio Engine:* Voiceover Puck (Cheeky Sidekick) + 20 SFX synthesis sinkron dan subtitle dynamic karaoke 42px.\n\n"
        f"📊 *Metadata:* 1080x1920 (9:16) · {dur:.2f}s · {fsize:.1f} MB · Cloud Render GitHub Actions."
    )

    print("[*] Mengirimkan video ke Telegram Tuan Rahmat...")
    tg_resp = send_telegram_video(final_video, final_thumb, caption)
    print("[+] Respon Telegram API:", json.dumps(tg_resp, indent=2))


if __name__ == "__main__":
    main()
