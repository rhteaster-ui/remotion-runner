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


def dispatch_workflow(composition="RepoFlowPremium", scale="1", crf="22"):
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
    print("[*] Triggering GitHub Actions cloud render for RepoFlowPremium...")
    dispatch_workflow(composition="RepoFlowPremium", scale="1", crf="22")

    time.sleep(6)
    run_id = get_latest_run_id()
    print(f"[+] Active GitHub Run ID: {run_id}")

    print("[*] Menunggu runner cloud menyelesaikan render...")
    start_time = time.time()
    while True:
        status, conclusion = check_run_status(run_id)
        elapsed = int(time.time() - start_time)
        print(f"    [{elapsed}s] Status: {status} | Conclusion: {conclusion}")
        if status == "completed":
            if conclusion != "success":
                print(f"[!] Run gagal dengan status: {conclusion}")
                sys.exit(1)
            print("[+] Cloud Runner berhasil menyelesaikan render!")
            break
        time.sleep(12)

    art_id, size = get_artifact_id(run_id)
    if not art_id:
        print("[!] Artifact remotion-video tidak ditemukan!")
        sys.exit(1)
    print(f"[+] Artifact ditemukan: ID={art_id}, Ukuran={size / (1024 * 1024):.2f} MB")

    zip_path = os.path.join(OUT_DIR, "repoflow_v2_artifact.zip")
    extract_dir = os.path.join(OUT_DIR, "repoflow_v2_rendered")
    os.makedirs(extract_dir, exist_ok=True)

    print("[*] Mengunduh video dari GitHub Actions...")
    download_artifact(art_id, zip_path)

    print("[*] Mengekstrak video...")
    subprocess.run(["unzip", "-o", "-q", zip_path, "-d", extract_dir], check=True)

    video_source = os.path.join(extract_dir, "video.mp4")
    thumb_source = os.path.join(extract_dir, "thumb.jpg")
    final_video = os.path.join(OUT_DIR, "RepoFlow-v2-Final.mp4")
    final_thumb = os.path.join(OUT_DIR, "RepoFlow-v2-Final-thumb.jpg")

    if os.path.exists(video_source):
        os.replace(video_source, final_video)
    if os.path.exists(thumb_source):
        os.replace(thumb_source, final_thumb)

    # Verifikasi FFprobe
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

    print(f"[+] Verifikasi FFprobe: {w}x{h} ({codec}) | Durasi: {dur:.2f}s | Ukuran: {fsize:.2f} MB")

    caption = (
        "🎬 <b>RepoFlow v2 — Production Teardown (Authentic Edition)</b>\n"
        "Karya Orisinal: <b>rhmt ofc</b> (<code>rhmt.biz.id</code>)\n\n"
        "⚡ <b>Perbaikan Tuntas Sesuai Arahan Tuan:</b>\n"
        "• <b>Screenshot Asli Terpasang:</b> Menampilkan UI nyata RepoFlow di mobile dashboard, JSZip upload workbench, code inspector @rhmt-ofc/e-rekap, dan dialog AES-256 vault.\n"
        "• <b>Subtitle Dinamis & Luwes:</b> Zero-jitter invariant width, kinetic spring pop highlight, pemenggalan frasa alami, dan backing scrim transparan.\n"
        "• <b>Studio Modern & Clean:</b> Desain Kinetic Keynote Studio bebas garis blueprint grid kaku, sudut rounded 32px, dan depth shadow bertingkat.\n\n"
        f"📊 <b>Metadata:</b> {w}x{h} (9:16) · {dur:.2f}s · {fsize:.1f} MB · Rendered via GitHub Actions Cloud Runner."
    )

    print("[*] Mengirimkan video ke Telegram Tuan Rahmat...")
    tg_resp = send_telegram_video(final_video, final_thumb, caption)
    print("[+] Respon Telegram API:", json.dumps(tg_resp, indent=2))


if __name__ == "__main__":
    main()
