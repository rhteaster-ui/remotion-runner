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


def dispatch_workflow(composition="PlatypusCreative", scale="1", crf="20"):
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


def send_telegram_document(video_path, thumb_path, caption):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
    with open(video_path, "rb") as f_doc:
        files = {
            "document": ("Platypus-Elaina-Final.mp4", f_doc, "video/mp4"),
        }
        if thumb_path and os.path.exists(thumb_path):
            files["thumbnail"] = ("thumb.jpg", open(thumb_path, "rb"), "image/jpeg")

        data = {
            "chat_id": TELEGRAM_OWNER_ID,
            "caption": caption,
            "parse_mode": "HTML",
        }
        r = requests.post(url, data=data, files=files, timeout=300)
        try:
            return r.json()
        except Exception:
            return {"ok": False, "raw": r.text}


def main():
    print("[*] Dispatching GitHub Actions Cloud Runner for PlatypusElaina...")
    dispatch_workflow(composition="PlatypusElaina", scale="1", crf="22")

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

    zip_path = os.path.join(OUT_DIR, "platypus_elaina_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "platypus_elaina_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh artifact video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    thumb_source = os.path.join(extract_dir, "thumb.jpg")
    final_video = os.path.join(OUT_DIR, "Platypus-Creative-Final.mp4")
    final_thumb = os.path.join(OUT_DIR, "Platypus-Creative-Final-thumb.jpg")

    if os.path.exists(video_source):
        os.replace(video_source, final_video)
    if os.path.exists(thumb_source):
        os.replace(thumb_source, final_thumb)

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

    print(f"\n[+] Hasil FFprobe Metadata Video:")
    print(f"    - Resolusi: {w}x{h} ({codec})")
    print(f"    - Durasi: {dur:.2f} detik")
    print(f"    - Ukuran: {fsize:.2f} MB")

    caption = (
        f"<b>REMOTION VIDEO DELIVERY · PLATYPUS ITU JANGGAL BANGET (CREATIVE FULL-STAGE EDITION)</b>\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<b>Kreator:</b> rhmt ofc (rhmt.biz.id)\n"
        f"<b>Komposisi:</b> <code>PlatypusCreative</code> (9:16 Vertical 1080x1920)\n"
        f"<b>Durasi:</b> {dur:.1f} detik | <b>Ukuran:</b> {fsize:.2f} MB | <b>Codec:</b> {w}x{h} {codec}\n\n"
        f"<b>Upgrade Craft &amp; Desain Kreatif:</b>\n"
        f"• <b>Full-Stage Creative Visuals:</b> 100% tanpa karakter/maskot kecil, panggung visual hero diperbesar masif memenuhi layar 1080x1920.\n"
        f"• <b>Biometric Scanner &amp; 3-in-1 Dissection:</b> Visual dinamis reticle bidik laser Australia, anatomi 3 donor organ (bebek, berang, katak), dan arsip 1799 Shaw &amp; Nodder.\n"
        f"• <b>Digestive Blueprint &amp; Chat Comedy:</b> Skema pencernaan tembus usus tanpa lambung + mockup chat WhatsApp penolakan cuti GERD.\n"
        f"• <b>High-Res Calcaneal Spur &amp; Seblak:</b> Macro close-up taji beracun peptida defensin + outro seblak pengkolan khas creator tech.\n"
        f"• <b>Subtitle Karaoke Presisi 44px:</b> Bersih, kontras tinggi di bottom safe-zone tanpa menutupi visual.\n"
        f"━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        f"<i>Dirender via GitHub Actions Cloud &amp; dikirim langsung ke WhatsApp dan Telegram</i>"
    )

    print("\n[*] Mengirim dokumen video final ke Telegram Tuan Rahmat...")
    res = send_telegram_document(final_video, final_thumb, caption)
    if res.get("ok"):
        print("[+] Dokumen Video BERHASIL dikirimkan ke Telegram Tuan Rahmat!")
    else:
        print(f"[!] Gagal mengirim ke Telegram: {res}")


if __name__ == "__main__":
    main()
