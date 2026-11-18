#!/usr/bin/env python3
import os
import sys
import json
import time
import subprocess
import urllib.request
import urllib.error
import requests

GITHUB_TOKEN = (
    os.environ.get("GITHUB_TOKEN")
    or (open("/root/.runner_token").read().strip() if os.path.exists("/root/.runner_token") else "")
    or (open("/root/gh.txt").read().strip() if os.path.exists("/root/gh.txt") else "")
)
REPO = "rhteaster-ui/remotion-runner"
WORKFLOW_FILE = "render.yml"

TELEGRAM_BOT_TOKEN = "9045696572:AAHSPg6Q9sgSOlybaXTV5D0Vzq2azhl3mdw"
TELEGRAM_OWNER_ID = 8343466107

OUT_DIR = "/root/remotion-krypton/out"
os.makedirs(OUT_DIR, exist_ok=True)


def dispatch_workflow(composition="JavaScriptAbsurd", scale="1", crf="22"):
    url = f"https://api.github.com/repos/{REPO}/actions/workflows/{WORKFLOW_FILE}/dispatches"
    payload = {
        "ref": "main",
        "inputs": {
            "composition": composition,
            "scale": scale,
            "crf": crf,
        },
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "Agency-DevOps",
        },
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        if resp.status in (200, 201, 204):
            print(f"[+] Workflow {WORKFLOW_FILE} dispatched for {composition}!")
            return True
    return False


def get_latest_run_id():
    url = f"https://api.github.com/repos/{REPO}/actions/runs?per_page=5"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps",
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
        "User-Agent": "Agency-DevOps",
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
        "User-Agent": "Agency-DevOps",
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for art in data.get("artifacts", []):
            if art.get("name") == "remotion-video":
                return art.get("id"), art.get("size_in_bytes")
    return None, None


def download_artifact(art_id, target_zip):
    url = f"https://api.github.com/repos/{REPO}/actions/artifacts/{art_id}/zip"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps",
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        with open(target_zip, "wb") as f:
            while True:
                chunk = resp.read(65536)
                if not chunk:
                    break
                f.write(chunk)
    return os.path.exists(target_zip) and os.path.getsize(target_zip) > 0


def send_telegram_video(video_path, caption):
    print(f"[*] Sending {video_path} to Telegram user {TELEGRAM_OWNER_ID}...")
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
    with open(video_path, "rb") as f:
        files = {"video": (os.path.basename(video_path), f, "video/mp4")}
        data = {
            "chat_id": TELEGRAM_OWNER_ID,
            "caption": caption,
            "parse_mode": "HTML",
            "supports_streaming": "true",
        }
        res = requests.post(url, data=data, files=files, timeout=300)
        res_data = res.json()
        if res_data.get("ok"):
            print("[+] Successfully sent video to Telegram!")
            return True
        else:
            print(f"[-] Telegram delivery failed: {res_data}")
            return False


def main():
    print("=== Disptaching Cloud Render for JavaScript Absurdity ===")
    if not dispatch_workflow("JavaScriptAbsurd", scale="1", crf="22"):
        print("[-] Failed to dispatch workflow.")
        sys.exit(1)

    print("[*] Waiting for runner to pick up task...")
    time.sleep(12)
    run_id = get_latest_run_id()
    print(f"[+] Found GitHub Run ID: {run_id}")

    start_t = time.time()
    while True:
        status, conclusion = check_run_status(run_id)
        elapsed = int(time.time() - start_t)
        print(f"[{elapsed}s] Workflow status: {status} | conclusion: {conclusion}")
        if status == "completed":
            if conclusion == "success":
                print("[+] Cloud render SUCCESS!")
                break
            else:
                print(f"[-] Cloud render FAILED with conclusion: {conclusion}")
                sys.exit(1)
        time.sleep(12)

    print("[*] Fetching artifact metadata...")
    art_id, art_size = get_artifact_id(run_id)
    if not art_id:
        print("[-] Artifact remotion-video not found!")
        sys.exit(1)

    print(f"[+] Found artifact ID {art_id} ({art_size / 1024 / 1024:.2f} MB)")
    zip_path = os.path.join(OUT_DIR, "javascript_absurd.zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)

    print("[*] Downloading video artifact...")
    download_artifact(art_id, zip_path)

    unzip_dir = os.path.join(OUT_DIR, "js_extracted")
    os.makedirs(unzip_dir, exist_ok=True)
    subprocess.run(["unzip", "-o", zip_path, "-d", unzip_dir], check=True)

    extracted_video = os.path.join(unzip_dir, "video.mp4")
    final_video = os.path.join(OUT_DIR, "JavaScript-Janggal-Elaina.mp4")
    if os.path.exists(extracted_video):
        subprocess.run(["mv", "-f", extracted_video, final_video], check=True)
    else:
        # Search for any mp4 inside unzip_dir
        for root, dirs, files in os.walk(unzip_dir):
            for file in files:
                if file.endswith(".mp4"):
                    subprocess.run(["mv", "-f", os.path.join(root, file), final_video], check=True)
                    break

    size_mb = os.path.getsize(final_video) / 1024 / 1024
    print(f"[+] Video ready at {final_video} ({size_mb:.2f} MB)")

    caption = (
        "<b>✨ JAVASCRIPT ITU JANGGAL BANGET! (Presenter Elaina GPT)</b>\n\n"
        "• <b>Presenter:</b> Elaina Seragam Sekolah (Aset asli ChatGPT pilihan Tuan Rahmat)\n"
        "• <b>Fisika Animasi:</b> Halus, calm floating &amp; sway organik tanpa getar/jitter kaku\n"
        "• <b>Materi Humor &amp; Sains IT:</b>\n"
        "  1. Coercion <code>1 + '1' = '11'</code> &amp; Struk Kasir Minimarket\n"
        "  2. <code>typeof NaN === 'number'</code> &amp; Analogi Es Teh Warteg\n"
        "  3. <code>[] + {} vs {} + []</code> &amp; Resep Martabak jadi Semen Tiga Roda\n"
        "  4. Geser Tombol 1px, Navbar Orbit ke Luar Angkasa, &amp; Solusi TypeScript\n"
        "• <b>Subtitles:</b> Word-by-word dynamic highlight 42px di offset bawah 72px\n"
        "• <b>Branding:</b> rhmt ofc (rhmt.biz.id) dengan pelafalan TTS 'Rahmat official'\n\n"
        "<i>Rendered via GitHub Actions Cloud Runner 1080x1920 30FPS</i>"
    )

    send_telegram_video(final_video, caption)


if __name__ == "__main__":
    main()
