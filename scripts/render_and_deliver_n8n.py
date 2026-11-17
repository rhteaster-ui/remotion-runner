#!/usr/bin/env python3
import os
import sys
import json
import time
import subprocess
import urllib.request
import urllib.parse
import urllib.error

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN") or (open("/root/.runner_token").read().strip() if os.path.exists("/root/.runner_token") else (open("/root/gh.txt").read().strip() if os.path.exists("/root/gh.txt") else ""))
REPO = "rhteaster-ui/remotion-runner"
WORKFLOW_FILE = "render.yml"

TELEGRAM_BOT_TOKEN = "9045696572:AAHSPg6Q9sgSOlybaXTV5D0Vzq2azhl3mdw"
TELEGRAM_OWNER_ID = 8343466107

OUT_DIR = "/root/remotion-krypton/out"
os.makedirs(OUT_DIR, exist_ok=True)


def dispatch_workflow(composition="OpsFlowN8N", scale="1", crf="22"):
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


def send_telegram_video(video_path, thumb_path, caption):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
    cmd = [
        "curl", "-s",
        "-F", f"chat_id={TELEGRAM_OWNER_ID}",
        "-F", f"video=@{video_path}",
        "-F", f"caption={caption}",
        "-F", "parse_mode=HTML"
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
    print("[*] Dispatching GitHub Actions Cloud Runner for OpsFlowN8N...")
    dispatch_workflow(composition="OpsFlowN8N", scale="1", crf="22")

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
            print("[+] Cloud Runner sukses menyelesaikan render video!")
            break
        time.sleep(12)

    art_id, size = get_artifact_id(run_id)
    if not art_id:
        print("[!] Artifact remotion-video tidak ditemukan!")
        sys.exit(1)
    print(f"[+] Artifact ditemukan: ID={art_id}, Ukuran={size / (1024 * 1024):.2f} MB")

    zip_path = os.path.join(OUT_DIR, "opsflow_n8n_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "opsflow_n8n_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh artifact video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    thumb_source = os.path.join(extract_dir, "thumb.jpg")
    final_video = os.path.join(OUT_DIR, "OpsFlow-N8N-Final.mp4")
    final_thumb = os.path.join(OUT_DIR, "OpsFlow-N8N-Final-thumb.jpg")

    if os.path.exists(video_source):
        os.replace(video_source, final_video)
    if os.path.exists(thumb_source):
        os.replace(thumb_source, final_thumb)

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
        f"<b>REMOTION VIDEO DELIVERY · OPSFLOW N8N REDESIGN</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<b>Kreator:</b> rhmt ofc\n"
        f"<b>Komposisi:</b> <code>OpsFlowN8N</code> (Workflow Canvas Edition)\n"
        f"<b>Resolusi:</b> {w}x{h} vertikal (9:16 Shorts/Reels/TikTok)\n"
        f"<b>Durasi:</b> {dur:.1f} detik | <b>Ukuran:</b> {fsize:.2f} MB\n"
        f"<b>Engine:</b> GitHub Actions Cloud Runner + Remotion\n"
        f"<b>Fitur Redesign:</b>\n"
        f"• Continuous N8N Workflow Canvas dengan dynamic flying camera\n"
        f"• Visual trigger node: Bot Telegram, WhatsApp, Terminal SSH bridge\n"
        f"• AGY Agent executor node & sub-tools branching\n"
        f"• Interactive Ops Deck Modal & Personal Branding RHMT OFC\n"
        f"• Subtitle presisi 44px karaoke word-by-word highlight\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<i>Dikirim otomatis via Agency AI Super-Admin &amp; DevOps VPS</i>"
    )

    print("\n[*] Mengirim video final ke Telegram Tuan Rahmat...")
    res = send_telegram_video(final_video, final_thumb, caption)
    if res.get("ok"):
        print("[+] Video BERHASIL dikirimkan ke Telegram Tuan Rahmat!")
    else:
        print(f"[!] Gagal mengirim ke Telegram: {res}")


if __name__ == "__main__":
    main()
