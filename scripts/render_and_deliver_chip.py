#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import time
import urllib.request

GITHUB_TOKEN = (
    os.environ.get("GITHUB_TOKEN")
    or (open("/root/.runner_token").read().strip() if os.path.exists("/root/.runner_token") else "")
    or (open("/root/gh.txt").read().strip() if os.path.exists("/root/gh.txt") else "")
)
REPO = "rhteaster-ui/remotion-runner"
WORKFLOW_FILE = "render.yml"
ROOT = "/root/remotion-krypton"
OUT_DIR = os.path.join(ROOT, "out")
QA_DIR = os.path.join(OUT_DIR, "qa_chip")
WA_OUTBOX_DIR = "/root/wa2shell/tmp/outbox"
WA_TARGET_JID = "6285196636945@s.whatsapp.net"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(QA_DIR, exist_ok=True)
os.makedirs(WA_OUTBOX_DIR, exist_ok=True)


def gh_req(url, data=None, method="GET"):
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Agency-DevOps",
    }
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8") if data is not None else None,
        headers=headers,
        method=method,
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        raw = resp.read()
        return resp.status, json.loads(raw.decode("utf-8")) if raw else {}


def main():
    print("=== [1/4] Dispatching GitHub Actions Cloud Render: ChipMerahPutih ===")
    status, _ = gh_req(
        f"https://api.github.com/repos/{REPO}/actions/workflows/{WORKFLOW_FILE}/dispatches",
        data={"ref": "main", "inputs": {"composition": "ChipMerahPutih", "scale": "1", "crf": "18"}},
        method="POST",
    )
    if status not in (200, 201, 204):
        raise RuntimeError(f"Workflow dispatch failed with status {status}")

    time.sleep(10)
    _, runs_data = gh_req(f"https://api.github.com/repos/{REPO}/actions/runs?per_page=5")
    run_id = runs_data["workflow_runs"][0]["id"]
    print(f"[+] GitHub Run ID: {run_id}")

    t0 = time.time()
    while True:
        _, rinfo = gh_req(f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}")
        st, conc = rinfo.get("status"), rinfo.get("conclusion")
        print(f"  [{int(time.time() - t0)}s] status={st} conclusion={conc}")
        if st == "completed":
            if conc != "success":
                raise RuntimeError(f"Cloud render failed: conclusion={conc}")
            break
        time.sleep(12)

    print("=== [2/4] Downloading rendered artifact ===")
    _, arts = gh_req(f"https://api.github.com/repos/{REPO}/actions/runs/{run_id}/artifacts")
    art_id = None
    for a in arts.get("artifacts", []):
        if a.get("name") == "remotion-video":
            art_id = a.get("id")
            break
    if not art_id:
        raise RuntimeError("Artifact remotion-video not found!")

    zip_path = os.path.join(OUT_DIR, "chip_merah_putih.zip")
    import requests
    r = requests.get(
        f"https://api.github.com/repos/{REPO}/actions/artifacts/{art_id}/zip",
        headers={
            "Authorization": f"token {GITHUB_TOKEN}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Agency-DevOps",
        },
        stream=True,
        timeout=180,
    )
    r.raise_for_status()
    with open(zip_path, "wb") as f:
        for chunk in r.iter_content(65536):
            if chunk:
                f.write(chunk)

    ext_dir = os.path.join(OUT_DIR, "chip_extracted")
    os.makedirs(ext_dir, exist_ok=True)
    subprocess.run(["unzip", "-o", zip_path, "-d", ext_dir], check=True)
    final_mp4 = os.path.join(OUT_DIR, "Chip-Merah-Putih-Elaina.mp4")
    subprocess.run(["mv", "-f", os.path.join(ext_dir, "video.mp4"), final_mp4], check=True)

    probe = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size", "-of", "json", final_mp4],
        text=True,
    )
    print(f"[+] Rendered MP4 ready: {final_mp4}\n{probe}")

    print("=== [3/4] Extracting 6 QA frames across all scenes ===")
    cues = json.load(open(os.path.join(ROOT, "src/data/chip-cues.json")))
    for s in cues["scenes"]:
        mid_t = ((s["startFrame"] + s["endFrame"]) / 2.0) / 30.0
        out_jpg = os.path.join(QA_DIR, f"{s['id']}.jpg")
        subprocess.run(
            ["ffmpeg", "-y", "-ss", f"{mid_t:.2f}", "-i", final_mp4, "-vframes", "1", "-q:v", "2", out_jpg],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
    print(f"[+] QA frames saved in {QA_DIR}")

    print("=== [4/4] Queueing WhatsApp delivery via wa2shell outbox ===")
    caption = (
        "*Chip Merah Putih Indonesia — Tech Satire*\n"
        "Karya: rhmt ofc (rhmt.biz.id)\n\n"
        "• *Voiceover 1-Take:* Suara tunggal konsisten Puck dari awal sampai akhir\n"
        "• *Konsep Visual:* Hardware Zine & Die-Cut Sticker (bukan template generik, bebas logo Gemini)\n"
        "• *Alur:* Komentar TikTok -> Snapdragon vs e-Paspor -> Fakta Fabless -> Private Key -> CTA Follow -> rhmt ofc"
    )
    outbox_file = os.path.join(WA_OUTBOX_DIR, "chip_merah_putih.json")
    with open(outbox_file, "w", encoding="utf-8") as f:
        json.dump(
            {
                "type": "video",
                "jid": WA_TARGET_JID,
                "filePath": final_mp4,
                "caption": caption,
            },
            f,
            indent=2,
        )
    print(f"[+] Queued WA delivery job: {outbox_file} -> {WA_TARGET_JID}")


if __name__ == "__main__":
    main()
