import base64
import json
import os
import re
import subprocess
import time
import urllib.error
import urllib.request

ROOT = "/root/remotion-krypton"
VO_DIR = os.path.join(ROOT, "public/audio/vo-repoflow")
os.makedirs(VO_DIR, exist_ok=True)


def load_gemini_keys():
    raw = ""
    if os.path.exists("/home/rdev/gemini.txt"):
        with open("/home/rdev/gemini.txt", "r") as f:
            raw = f.read()
    else:
        raw = subprocess.check_output(
            ["ssh", "-o", "ConnectTimeout=5", "vps1", "cat /home/rdev/gemini.txt"],
            text=True,
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

# Definisi 5 Scene resmi RepoFlow
SCENES = [
    {
        "id": "s1-hook",
        "title": "Masalah Push ZIP ke GitHub",
        "bg": "dark",
        "text": (
            "Pernah mau push folder project ke GitHub dari HP atau laptop, "
            "tapi malas buka terminal dan ribet install Git? "
            "Mau lewat web GitHub? Dibatasi seratus file dan sering macet! "
            "Untung ada RepoFlow!"
        ),
        "display_text": (
            "Pernah mau push folder project ke GitHub dari HP atau laptop, "
            "tapi malas buka terminal dan ribet install Git? "
            "Mau lewat web GitHub? Dibatasi 100 file dan sering macet! "
            "Untung ada RepoFlow!"
        ),
    },
    {
        "id": "s2-unpack",
        "title": "Ekstraksi Memori Klien Instan",
        "bg": "light",
        "text": (
            "RepoFlow bekerja seratus persen di browser tanpa server perantara. "
            "Tinggal drag dan drop file ZIP, ratusan berkas langsung diekstrak di RAM browser "
            "via web worker dalam empat puluh delapan milidetik."
        ),
        "display_text": (
            "RepoFlow bekerja 100% di browser tanpa server perantara. "
            "Tinggal drag & drop file ZIP, ratusan berkas langsung diekstrak di RAM browser "
            "via Web Worker cuma 48 milidetik!"
        ),
    },
    {
        "id": "s3-tree",
        "title": "Atomic Git Tree & Zero Broken State",
        "bg": "dark",
        "text": (
            "Beda dari upload biasa yang bikin commit satu per satu, "
            "RepoFlow merakit Git blobs secara paralel dan membuat satu Git Tree utuh. "
            "Hasilnya, commit atomik instan tanpa risiko broken state di tengah jalan!"
        ),
        "display_text": (
            "Beda dari upload biasa yang bikin commit satu per satu, "
            "RepoFlow merakit Git blobs secara paralel dan membuat satu Git Tree utuh. "
            "Hasilnya, commit atomik instan tanpa risiko broken state di tengah jalan!"
        ),
    },
    {
        "id": "s4-vault",
        "title": "Enkripsi Token Web Crypto AES-256",
        "bg": "light",
        "text": (
            "Soal keamanan juga kelas militer. "
            "Token akses GitHub kamu dienkripsi AES-GCM dua ratus lima puluh enam bit "
            "di memori lokal dengan kunci non-extractable. "
            "Bahkan dari DevTools browser pun tokenmu tetap aman terlindungi."
        ),
        "display_text": (
            "Soal keamanan juga kelas militer. "
            "Token akses GitHub kamu dienkripsi AES-GCM 256-bit "
            "di memori lokal dengan kunci non-extractable. "
            "Bahkan dari DevTools browser pun tokenmu tetap aman terlindungi."
        ),
    },
    {
        "id": "s5-brand",
        "title": "Karya Orisinal RHMT OFC",
        "bg": "dark",
        "text": (
            "Web client canggih ini dirancang mandiri oleh Rahmat, atau RHMT official, "
            "kreator ekosistem rhmt.biz.id. "
            "Buka repoflow.web.id sekarang, dan rasakan deploy instan tanpa terminal!"
        ),
        "display_text": (
            "Web client canggih ini dirancang mandiri oleh Rahmat, atau RHMT ofc, "
            "kreator ekosistem rhmt.biz.id. "
            "Buka repoflow.web.id sekarang, dan rasakan deploy instan tanpa terminal!"
        ),
    },
]


def generate_tts(scene_id: str, text: str) -> str:
    mp3_path = os.path.join(VO_DIR, f"{scene_id}.mp3")
    pcm_path = os.path.join(VO_DIR, f"{scene_id}.pcm")
    if os.path.exists(mp3_path):
        os.remove(mp3_path)
    if os.path.exists(pcm_path):
        os.remove(pcm_path)

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
                "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Puck"}}
            },
        },
    }

    data = None
    for key in API_KEYS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
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
    with open(pcm_path, "wb") as f:
        f.write(base64.b64decode(b64))

    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "s16le",
            "-ar",
            "24000",
            "-ac",
            "1",
            "-i",
            pcm_path,
            "-c:a",
            "libmp3lame",
            "-b:a",
            "192k",
            mp3_path,
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    if os.path.exists(pcm_path):
        os.remove(pcm_path)
    return mp3_path


def probe_duration(mp3_path: str) -> float:
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            mp3_path,
        ]
    ).decode().strip()
    return float(out)


def align_words_with_gemini(mp3_path: str, display_text: str, vo_offset: float):
    with open(mp3_path, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")

    prompt = f"""Listen carefully to this audio.
Align each word of the following TARGET DISPLAY TEXT to the exact start and end timestamps (in seconds as floats, e.g. 1.25) when it is spoken in the audio.

TARGET DISPLAY TEXT:
"{display_text}"

Rules:
1. Every single word in the TARGET DISPLAY TEXT must appear in the output array in exact sequential order.
2. If two words are pronounced as one or contracted (like "100%" or "256-bit"), provide the start and end of that vocal token.
3. Start and end must be accurate within 0.05 seconds of the spoken audio.
4. Output ONLY a valid JSON array of objects:
[
  {{"text": "<word>", "start": 0.00, "end": 0.00}},
  ...
]"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {"inlineData": {"mimeType": "audio/mp3", "data": audio_b64}},
                ]
            }
        ],
        "generationConfig": {"responseMimeType": "application/json"},
    }

    data = None
    for key in API_KEYS:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as e:
            if e.code in (429, 403, 401):
                print(f"  key rotated for alignment after HTTP {e.code}")
                continue
            raise

    if not data:
        raise RuntimeError("Failed to align words via Gemini API")

    raw_json = data["candidates"][0]["content"]["parts"][0]["text"]
    words_data = json.loads(raw_json)

    # Offset timestamps to global video timeline
    word_timings = []
    for item in words_data:
        w_text = item.get("text") or item.get("word") or ""
        s = float(item["start"])
        e = float(item["end"])
        if e <= s:
            e = s + 0.15
        word_timings.append(
            {
                "text": w_text,
                "start": round(vo_offset + s, 3),
                "end": round(vo_offset + e, 3),
            }
        )
    return word_timings


def chunk_lines(words, max_chars=24, max_lines=2):
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


def main():
    timeline_scenes = []
    captions = []
    cur_t = 0.0
    cap_id = 1

    for i, sc in enumerate(SCENES):
        print(f"\n[*] Processing scene: {sc['id']} ({sc['title']})...")
        mp3_path = generate_tts(sc["id"], sc["text"])
        dur = probe_duration(mp3_path)
        print(f"    TTS generated: duration = {dur:.2f}s")

        lead_in = 0.50 if i == 0 else 0.40
        tail_pad = 1.20 if i == len(SCENES) - 1 else 0.55
        vo_start = round(cur_t + lead_in, 3)
        vo_end = round(vo_start + dur, 3)
        sc_end = round(vo_end + tail_pad, 3)

        timeline_scenes.append(
            {
                "id": sc["id"],
                "title": sc["title"],
                "bg": sc["bg"],
                "audio": f"audio/vo-repoflow/{sc['id']}.mp3",
                "start": round(cur_t, 3),
                "duration": round(sc_end - cur_t, 3),
                "vo_start": vo_start,
                "vo_end": vo_end,
                "end": sc_end,
            }
        )

        display_text = sc.get("display_text", sc["text"])
        print("    Aligning words via Gemini Flash...")
        w_timings = align_words_with_gemini(mp3_path, display_text, vo_start)
        print(f"    Aligned {len(w_timings)} words successfully.")

        # Chunk into readable 1-2 lines
        chunks = chunk_lines([w["text"] for w in w_timings], max_chars=24, max_lines=2)
        w_idx = 0
        scene_caps = []
        for lines in chunks:
            n_words = sum(len(l.split()) for l in lines)
            sub_words = w_timings[w_idx : w_idx + n_words]
            w_idx += n_words
            if not sub_words:
                continue
            scene_caps.append(
                {
                    "id": cap_id,
                    "scene": sc["id"],
                    "bg": sc["bg"],
                    "lines": lines,
                    "words": sub_words,
                    "start": sub_words[0]["start"],
                    "end": sub_words[-1]["end"],
                }
            )
            cap_id += 1

        # Smooth chunk durations so captions don't flicker between chunks
        for c_idx in range(len(scene_caps)):
            if c_idx < len(scene_caps) - 1:
                # extend end to the start of next caption
                scene_caps[c_idx]["end"] = max(
                    scene_caps[c_idx]["end"], scene_caps[c_idx + 1]["start"]
                )
            else:
                # last chunk extends to vo_end + 0.35s
                scene_caps[c_idx]["end"] = min(sc_end - 0.1, scene_caps[c_idx]["end"] + 0.35)

        captions.extend(scene_caps)
        cur_t = sc_end
        print(f"    Scene {sc['id']} total duration: {sc_end:.2f}s")
        time.sleep(1)

    os.makedirs(os.path.join(ROOT, "src/data"), exist_ok=True)
    with open(os.path.join(ROOT, "src/data/repoflow-timeline.json"), "w") as f:
        json.dump(
            {
                "fps": 30,
                "estimated": False,
                "total": round(cur_t, 3),
                "scenes": timeline_scenes,
            },
            f,
            indent=2,
        )

    with open(os.path.join(ROOT, "src/data/repoflow-subtitles.json"), "w") as f:
        json.dump(
            {
                "captions": captions,
            },
            f,
            indent=2,
        )

    print(f"\n[+] Pipeline Complete! Total video duration: {cur_t:.2f}s, Captions: {len(captions)}")


if __name__ == "__main__":
    main()
