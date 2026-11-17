import os
import json
import re
import base64
import urllib.request
import urllib.error
import subprocess
from typing import List, Dict, Any

ROOT = "/root/remotion-krypton"
VO_DIR = os.path.join(ROOT, "public/audio/vo-repoflow")
os.makedirs(VO_DIR, exist_ok=True)

def load_gemini_keys() -> List[str]:
    raw = ""
    if os.path.exists("/home/rdev/gemini.txt"):
        with open("/home/rdev/gemini.txt", "r") as f:
            raw = f.read()
    else:
        raw = subprocess.check_output(
            ["ssh", "-o", "ConnectTimeout=5", "vps1", "cat /home/rdev/gemini.txt"],
            text=True
        )
    keys = [
        line.strip().split()[-1]
        for line in raw.splitlines()
        if line.strip().startswith("akun ")
    ]
    if not keys:
        raise RuntimeError("No Gemini API keys found in gemini.txt")
    return keys

API_KEYS = load_gemini_keys()

SCENES = [
    {
        "id": "s1-hook",
        "title": "Masalah Push ZIP ke GitHub",
        "bg": "dark",
        "text": (
            "Pernah nggak ngoding project di HP atau punya file ZIP puluhan mega, "
            "tapi pas mau push ke GitHub malah ribet setengah mati? "
            "Web GitHub biasa punya batasan file dan nggak bisa ekstrak ZIP. "
            "Tapi tenang, masalah itu tuntas lewat RepoFlow!"
        ),
        "display_text": (
            "Pernah nggak ngoding project di HP atau punya file ZIP puluhan mega, "
            "tapi pas mau push ke GitHub malah ribet setengah mati? "
            "Web GitHub biasa punya batasan file dan nggak bisa ekstrak ZIP. "
            "Tapi tenang, masalah itu tuntas lewat RepoFlow!"
        )
    },
    {
        "id": "s2-unpack",
        "title": "Ekstraksi Memori Klien Instan",
        "bg": "light",
        "text": (
            "RepoFlow bekerja seratus persen di browser tanpa perantara server backend. "
            "Cukup drag dan drop bundel ZIP, ratusan file langsung diekstrak di RAM browser secara instan, "
            "lengkap dengan proteksi traversal dan pratinjau diff sebelum di-push."
        ),
        "display_text": (
            "RepoFlow bekerja 100% di browser tanpa perantara server backend. "
            "Cukup drag & drop bundel ZIP, ratusan file langsung diekstrak di RAM browser secara instan, "
            "lengkap dengan proteksi traversal dan pratinjau diff sebelum di-push."
        )
    },
    {
        "id": "s3-tree",
        "title": "Inspeksi Repo & Atomic Git Tree",
        "bg": "dark",
        "text": (
            "Bukan cuma inspeksi repo dan baca kode file langsung di browser, "
            "RepoFlow juga merakit git blobs secara paralel dan commit satu Git Tree utuh secara atomik. "
            "Hasilnya? Branch selalu bersih dan nol risiko gagal di tengah jalan!"
        ),
        "display_text": (
            "Bukan cuma inspeksi repo dan baca kode file langsung di browser, "
            "RepoFlow juga merakit git blobs secara paralel dan commit 1 Git Tree utuh secara atomik. "
            "Hasilnya? Branch selalu bersih dan 0 risiko gagal di tengah jalan!"
        )
    },
    {
        "id": "s4-vault",
        "title": "Enkripsi Token Web Crypto AES-256",
        "bg": "light",
        "text": (
            "Soal keamanan juga kelas militer. "
            "Token akses GitHub Anda dienkripsi AES-GCM dua ratus lima puluh enam bit di memori lokal. "
            "Kuncinya bersifat non-extractable, jadi bahkan dari DevTools browser pun token Anda tetap aman terlindungi."
        ),
        "display_text": (
            "Soal keamanan juga kelas militer. "
            "Token akses GitHub Anda dienkripsi AES-GCM 256-bit di memori lokal. "
            "Kuncinya bersifat non-extractable, jadi bahkan dari DevTools browser pun token Anda tetap aman terlindungi."
        )
    },
    {
        "id": "s5-brand",
        "title": "Karya Orisinal RHMT OFC",
        "bg": "dark",
        "text": (
            "Web manager canggih ini dirancang mandiri oleh Rahmat, atau RHMT official, "
            "kreator di balik ekosistem rhmt.biz.id. "
            "Buka repoflow.web.id sekarang, dan follow akun ini buat bedah inovasi berikutnya!"
        ),
        "display_text": (
            "Web manager canggih ini dirancang mandiri oleh Rahmat, atau RHMT ofc, "
            "kreator di balik ekosistem rhmt.biz.id. "
            "Buka repoflow.web.id sekarang, dan follow akun ini buat bedah inovasi berikutnya!"
        )
    }
]

def tts_scene(scene_id: str, text: str, force: bool = True) -> str:
    mp3_path = os.path.join(VO_DIR, f"{scene_id}.mp3")
    if not force and os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 1000:
        print(f"  [TTS] using existing {mp3_path}")
        return mp3_path

    pcm_path = os.path.join(VO_DIR, f"{scene_id}.pcm")
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": (
                            "Bacakan dengan gaya narator tech creator TikTok Indonesia "
                            "yang lincah, cerdas, berenergi, tegas, dan ekspresif: "
                            f"{text}"
                        )
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": "Puck"
                    }
                }
            }
        }
    }

    data = None
    for key in API_KEYS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as e:
            if e.code in (429, 403, 401):
                print(f"  key rotated after HTTP {e.code}")
                continue
            raise

    if data is None:
        raise RuntimeError(f"All API keys exhausted for {scene_id}")

    b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    raw_audio = base64.b64decode(b64)
    with open(pcm_path, "wb") as f:
        f.write(raw_audio)

    cmd = [
        "ffmpeg", "-y",
        "-f", "s16le",
        "-ar", "24000",
        "-ac", "1",
        "-i", pcm_path,
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=9",
        "-codec:a", "libmp3lame",
        "-b:a", "192k",
        mp3_path
    ]
    subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(pcm_path):
        os.remove(pcm_path)

    print(f"  [TTS] synthesized {scene_id} -> {mp3_path}")
    return mp3_path

def probe_duration(path: str) -> float:
    out = subprocess.check_output(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            path
        ],
        text=True
    ).strip()
    return float(out)

def transcribe_with_timestamps(mp3_path: str) -> List[Dict[str, Any]]:
    with open(mp3_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    prompt = (
        "Transcribe this audio word by word. Return ONLY a JSON list of objects: "
        "[{\"text\": \"word\", \"start\": float, \"end\": float}]. "
        "Timestamps must be strictly in seconds as numbers. Output raw JSON only."
    )

    payload = {
        "contents": [{
            "parts": [
                {"inlineData": {"mimeType": "audio/mp3", "data": b64}},
                {"text": prompt}
            ]
        }],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }

    res_json = None
    for key in API_KEYS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                res_json = json.loads(text)
                break
        except urllib.error.HTTPError as e:
            if e.code in (429, 403, 401):
                continue
            raise

    if res_json is None:
        raise RuntimeError("Failed to transcribe audio with Gemini")

    return res_json

def chunk_lines(words, max_chars=26, max_lines=2):
    chunks = []
    cur_lines = [""]
    for w in words:
        last = cur_lines[-1]
        cand = f"{last} {w}".strip()
        if len(cand) <= max_chars:
            cur_lines[-1] = cand
        elif len(cur_lines) < max_lines:
            cur_lines.append(w)
        else:
            chunks.append(cur_lines)
            cur_lines = [w]
    if any(cur_lines):
        chunks.append(cur_lines)
    return chunks

def align_display_words_to_gemini(display_text: str, gemini_words: List[Dict[str, Any]], vo_offset: float) -> List[Dict[str, Any]]:
    disp_words = display_text.split()
    n_disp = len(disp_words)
    n_gem = len(gemini_words)

    # If count matches closely, map 1-to-1 or interpolate proportionally
    out_words = []
    for i, dw in enumerate(disp_words):
        # find closest gemini word index
        g_idx = int(round(i * (n_gem - 1) / max(1, n_disp - 1))) if n_gem > 1 else 0
        g_w = gemini_words[min(g_idx, n_gem - 1)]
        start = round(vo_offset + float(g_w["start"]), 3)
        end = round(vo_offset + float(g_w["end"]), 3)
        if end <= start:
            end = round(start + 0.12, 3)
        out_words.append({
            "text": dw,
            "start": start,
            "end": end
        })

    # Ensure strictly non-decreasing timestamps
    for j in range(1, len(out_words)):
        if out_words[j]["start"] < out_words[j-1]["start"]:
            out_words[j]["start"] = out_words[j-1]["start"]
        if out_words[j]["end"] <= out_words[j]["start"]:
            out_words[j]["end"] = round(out_words[j]["start"] + 0.10, 3)

    return out_words

def main():
    timeline_scenes = []
    captions = []
    cur_t = 0.0
    cap_id = 1

    print("Generating fresh voiceover and extracting exact word timestamps...")

    for i, sc in enumerate(SCENES):
        print(f"\nProcessing scene {sc['id']}: {sc['title']}...")
        mp3_path = tts_scene(sc["id"], sc["text"], force=True)
        dur = probe_duration(mp3_path)

        lead_in = 0.55 if i == 0 else 0.45
        tail_pad = 1.35 if i == len(SCENES) - 1 else 0.55
        vo_start = round(cur_t + lead_in, 3)
        vo_end = round(vo_start + dur, 3)
        sc_end = round(vo_end + tail_pad, 3)

        timeline_scenes.append({
            "id": sc["id"],
            "title": sc["title"],
            "bg": sc["bg"],
            "audio": f"audio/vo-repoflow/{sc['id']}.mp3",
            "start": round(cur_t, 3),
            "duration": round(sc_end - cur_t, 3),
            "vo_start": vo_start,
            "vo_end": vo_end,
            "end": sc_end,
        })

        # Gemini Word-by-Word transcription
        gemini_words = transcribe_with_timestamps(mp3_path)
        print(f"  Transcribed {len(gemini_words)} words with exact audio timestamps.")

        display_text = sc.get("display_text", sc["text"])
        w_timings = align_display_words_to_gemini(display_text, gemini_words, vo_start)

        chunks = chunk_lines([w["text"] for w in w_timings], max_chars=26, max_lines=2)
        w_idx = 0
        for lines in chunks:
            n_words = sum(len(l.split()) for l in lines)
            sub_words = w_timings[w_idx : w_idx + n_words]
            w_idx += n_words
            captions.append({
                "id": cap_id,
                "scene": sc["id"],
                "bg": sc["bg"],
                "lines": lines,
                "words": sub_words,
                "start": sub_words[0]["start"],
                "end": sub_words[-1]["end"]
            })
            cap_id += 1

        cur_t = sc_end
        print(f"  -> Scene {sc['id']} synced: dur={dur:.2f}s, start={vo_start:.2f}s, end={vo_end:.2f}s")

    os.makedirs(os.path.join(ROOT, "src/data"), exist_ok=True)
    with open(os.path.join(ROOT, "src/data/repoflow-timeline.json"), "w") as f:
        json.dump({
            "fps": 30,
            "estimated": False,
            "total": round(cur_t, 3),
            "scenes": timeline_scenes
        }, f, indent=2)

    with open(os.path.join(ROOT, "src/data/repoflow-subtitles.json"), "w") as f:
        json.dump({
            "captions": captions
        }, f, indent=2)

    print(f"\nSynced successfully! Total duration: {cur_t:.2f}s, captions: {len(captions)}")

if __name__ == "__main__":
    main()
