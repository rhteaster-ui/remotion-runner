#!/usr/bin/env python3
import os
import sys
import json
import re
import base64
import subprocess
import urllib.request
import urllib.error

ROOT = "/root/remotion-krypton"
VO_DIR = os.path.join(ROOT, "public/audio/vo-neon")
os.makedirs(VO_DIR, exist_ok=True)


def load_gemini_keys():
    raw = ""
    if os.path.exists("/home/rdev/gemini.txt"):
        with open("/home/rdev/gemini.txt", "r") as f:
            raw = f.read()
    keys = [
        line.strip().split()[-1]
        for line in raw.splitlines()
        if line.strip().startswith("akun ") and not line.endswith("J0p-x0")
    ]
    if not keys:
        raise RuntimeError("No Gemini API keys found in /home/rdev/gemini.txt")
    return keys


API_KEYS = load_gemini_keys()

SCENES = [
    {
        "id": "s1-hook",
        "title": "Hook & Reveal Gemini 4 Neon",
        "bg": "dark",
        "text": (
            "Keluarga Gemini 4 resmi kedatangan anggota baru. "
            "Bukan rumor lagi, Google DeepMind baru saja merilis: Gemini 4 Neon!"
        ),
        "tts_text": (
            "Keluarga Gemini 4 resmi kedatangan anggota baru. "
            "Bukan rumor lagi, Google DeepMind baru saja merilis: Gemini 4 Neon!"
        ),
    },
    {
        "id": "s2-posisi",
        "title": "Anatomi Tiga Elemen",
        "bg": "dark",
        "text": (
            "Kalau kemarin kita kenal Carbon sebagai raksasa riset dan Hydrogen si eksekutor kilat harian, "
            "Neon hadir tepat di tengah-tengah sebagai workhorse seimbang berkecerdasan tinggi dan respon cepat."
        ),
        "tts_text": (
            "Kalau kemarin kita kenal Carbon sebagai raksasa riset dan Hydrogen si eksekutor kilat harian, "
            "Neon hadir tepat di tengah-tengah sebagai workhorse seimbang berkecerdasan tinggi dan respon cepat."
        ),
    },
    {
        "id": "s3-thinking",
        "title": "Scalable Thinking Levels & 1M Context",
        "bg": "dark",
        "text": (
            "Senjata rahasianya ada di Scalable Thinking Levels: low, medium, high, sampai mode xhigh "
            "untuk arsitektur kode rumit dan sains. Ditambah context window masif satu juta token!"
        ),
        "tts_text": (
            "Senjata rahasianya ada di Scalable Thinking Levels: low, medium, high, sampai mode xhigh "
            "untuk arsitektur kode rumit dan sains. Ditambah context window masif satu juta token!"
        ),
    },
    {
        "id": "s4-benchmark",
        "title": "Benchmark Resmi vs Claude & GPT",
        "bg": "dark",
        "text": (
            "Di benchmark resmi penalaran dan koding, Neon mencetak skor enam puluh satu di mode xhigh, "
            "menempel ketat Claude Opus 5.5 dan GPT-6.2 Sol, dengan kecepatan eksekusi jauh lebih kilat!"
        ),
        "tts_text": (
            "Di benchmark resmi penalaran dan koding, Neon mencetak skor enam puluh satu di mode xhigh, "
            "menempel ketat Claude Opus 5.5 dan GPT-6.2 Sol, dengan kecepatan eksekusi jauh lebih kilat!"
        ),
    },
    {
        "id": "s5-outro",
        "title": "Outro Resmi rhmt ofc",
        "bg": "dark",
        "text": (
            "Gemini 4 Neon membuktikan AI super cerdas tidak harus lambat dan boros token. "
            "Pantau terus eksplorasi teknologi lainnya bersama Rahmat di rhmt ofc!"
        ),
        "tts_text": (
            "Gemini 4 Neon membuktikan AI super cerdas tidak harus lambat dan boros token. "
            "Pantau terus eksplorasi teknologi lainnya bersama Rahmat di rhmt official!"
        ),
    },
]


def tts_scene(scene_id: str, text: str) -> str:
    mp3_path = os.path.join(VO_DIR, f"{scene_id}.mp3")
    pcm_path = os.path.join(VO_DIR, f"{scene_id}.pcm")
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": (
                            "Gaya narator teknologi cerdas, berenergi tinggi, antusias, cepat, dan percaya diri: "
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
            err_body = e.read().decode("utf-8", errors="ignore")
            print(f"Key error {e.code}: {err_body[:100]}... trying next")
            continue
        except Exception as e:
            print(f"Request failed: {e}... trying next")
            continue

    if not data:
        raise RuntimeError(f"All API keys failed for scene {scene_id}")

    try:
        cand = data["candidates"][0]
        part = cand["content"]["parts"][0]
        audio_b64 = part["inlineData"]["data"]
    except Exception as e:
        print("Data received:", json.dumps(data)[:300])
        raise RuntimeError(f"Invalid TTS response structure: {e}")

    audio_bytes = base64.b64decode(audio_b64)
    with open(pcm_path, "wb") as f:
        f.write(audio_bytes)

    # Convert PCM (s16le, 24kHz, mono) to high-quality MP3
    cmd = [
        "ffmpeg", "-y",
        "-f", "s16le",
        "-ar", "24000",
        "-ac", "1",
        "-i", pcm_path,
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        mp3_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(pcm_path)
    return mp3_path


def probe_duration(mp3_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        mp3_path
    ]
    out = subprocess.check_output(cmd).decode("utf-8").strip()
    return float(out)


def detect_speech_segments(mp3_path: str, total_dur: float):
    cmd = [
        "ffmpeg", "-i", mp3_path,
        "-af", "silencedetect=noise=-28dB:d=0.2",
        "-f", "null", "-"
    ]
    p = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.DEVNULL, text=True)
    silences = []
    for line in p.stderr.splitlines():
        if "silence_start:" in line:
            m = re.search(r"silence_start:\s*([0-9.]+)", line)
            if m:
                silences.append({"type": "start", "t": float(m.group(1))})
        elif "silence_end:" in line:
            m = re.search(r"silence_end:\s*([0-9.]+)", line)
            if m:
                silences.append({"type": "end", "t": float(m.group(1))})

    sil_ranges = []
    pending_start = None
    for s in silences:
        if s["type"] == "start":
            pending_start = s["t"]
        elif s["type"] == "end" and pending_start is not None:
            sil_ranges.append((pending_start, s["t"]))
            pending_start = None

    segments = []
    cur = 0.0
    for s_start, s_end in sil_ranges:
        if s_start > cur + 0.15:
            segments.append((cur, s_start))
        cur = s_end
    if cur < total_dur - 0.1:
        segments.append((cur, total_dur))

    if not segments:
        segments = [(0.0, total_dur)]
    return segments


def map_words_to_speech(text: str, speech_segs, vo_start: float):
    raw_words = text.split()
    total_speech = sum(end - start for start, end in speech_segs)
    char_counts = [len(w) for w in raw_words]
    total_chars = sum(char_counts)

    words_out = []
    seg_idx = 0
    seg_rem = speech_segs[0][1] - speech_segs[0][0]
    seg_cur = speech_segs[0][0]

    for w in raw_words:
        w_dur = (len(w) / total_chars) * total_speech
        w_start = seg_cur
        w_end = w_start + w_dur

        if w_end > speech_segs[seg_idx][1] and seg_idx < len(speech_segs) - 1:
            seg_idx += 1
            seg_cur = speech_segs[seg_idx][0]
            w_start = seg_cur
            w_end = w_start + w_dur

        seg_cur = w_end
        words_out.append({
            "text": w,
            "start": round(vo_start + w_start, 3),
            "end": round(vo_start + w_end, 3)
        })
    return words_out


def chunk_lines(words, max_chars=24, max_lines=2):
    chunks = []
    cur_lines = []
    cur_line = []
    cur_len = 0

    for w in words:
        if cur_len + len(w) + (1 if cur_line else 0) <= max_chars:
            cur_line.append(w)
            cur_len += len(w) + (1 if len(cur_line) > 1 else 0)
        else:
            if cur_line:
                cur_lines.append(" ".join(cur_line))
            cur_line = [w]
            cur_len = len(w)
            if len(cur_lines) == max_lines:
                chunks.append(cur_lines)
                cur_lines = []
    if cur_line:
        cur_lines.append(" ".join(cur_line))
    if cur_lines:
        chunks.append(cur_lines)
    return chunks


def main():
    timeline_scenes = []
    captions = []
    cur_t = 0.0
    cap_id = 1

    print("[*] Generating voiceover & subtitle timing for Gemini 4 Neon...")
    for i, sc in enumerate(SCENES):
        print(f"  -> Generating TTS for {sc['id']} ({sc['title']})...")
        spoken_text = sc.get("tts_text", sc["text"])
        mp3_path = tts_scene(sc["id"], spoken_text)
        dur = probe_duration(mp3_path)
        speech_segs = detect_speech_segments(mp3_path, dur)

        lead_in = 0.5 if i == 0 else 0.4
        tail_pad = 1.8 if i == len(SCENES) - 1 else 0.7
        vo_start = round(cur_t + lead_in, 3)
        vo_end = round(vo_start + dur, 3)
        sc_end = round(vo_end + tail_pad, 3)

        timeline_scenes.append({
            "id": sc["id"],
            "title": sc["title"],
            "bg": sc["bg"],
            "audio": f"audio/vo-neon/{sc['id']}.mp3",
            "start": round(cur_t, 3),
            "duration": round(sc_end - cur_t, 3),
            "vo_start": vo_start,
            "vo_end": vo_end,
            "end": sc_end
        })

        w_timings = map_words_to_speech(sc["text"], speech_segs, vo_start)
        chunks = chunk_lines([w["text"] for w in w_timings], max_chars=24, max_lines=2)
        w_idx = 0
        for lines in chunks:
            n_words = sum(len(l.split()) for l in lines)
            sub_words = w_timings[w_idx:w_idx + n_words]
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
        print(f"     [+] Scene {sc['id']}: dur={dur:.2f}s, end={sc_end:.2f}s")

    os.makedirs(os.path.join(ROOT, "src/data"), exist_ok=True)
    with open(os.path.join(ROOT, "src/data/neon-timeline.json"), "w") as f:
        json.dump({
            "fps": 30,
            "estimated": False,
            "total": round(cur_t, 3),
            "scenes": timeline_scenes
        }, f, indent=2)

    with open(os.path.join(ROOT, "src/data/neon-subtitles.json"), "w") as f:
        json.dump({"captions": captions}, f, indent=2)

    print(f"\n[+] Sukses! Total durasi video: {cur_t:.2f} detik (~{round(cur_t * 30)} frame @ 30fps)")


if __name__ == "__main__":
    main()
