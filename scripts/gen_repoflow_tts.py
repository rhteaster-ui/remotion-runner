import base64
import json
import os
import re
import subprocess
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
        ),
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
        ),
    },
    {
        "id": "s3-tree",
        "title": "Atomic Git Tree & Zero Broken State",
        "bg": "dark",
        "text": (
            "Beda sama upload biasa yang bikin commit satu per satu, "
            "RepoFlow merakit git blobs secara paralel, menyusun satu Git Tree utuh, "
            "lalu menggeser pointer branch secara atomik. "
            "Hasilnya? Branch selalu bersih dan nol risiko gagal di tengah jalan!"
        ),
        "display_text": (
            "Beda sama upload biasa yang bikin commit satu per satu, "
            "RepoFlow merakit git blobs secara paralel, menyusun satu Git Tree utuh, "
            "lalu menggeser pointer branch secara atomik. "
            "Hasilnya? Branch selalu bersih dan 0 risiko gagal di tengah jalan!"
        ),
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
        ),
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
        ),
    },
]


def tts_scene(scene_id: str, text: str) -> str:
    mp3_path = os.path.join(VO_DIR, f"{scene_id}.mp3")
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 1000:
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


def detect_speech_segments(mp3_path: str, total_dur: float):
    proc = subprocess.run(
        ["ffmpeg", "-i", mp3_path, "-af", "silencedetect=noise=-28dB:d=0.2", "-f", "null", "-"],
        capture_output=True,
        text=True,
    )
    silences = []
    cur_start = None
    for line in proc.stderr.splitlines():
        m1 = re.search(r"silence_start:\s*([0-9.]+)", line)
        m2 = re.search(r"silence_end:\s*([0-9.]+)", line)
        if m1:
            cur_start = float(m1.group(1))
        elif m2 and cur_start is not None:
            silences.append((cur_start, float(m2.group(1))))
            cur_start = None
    if cur_start is not None:
        silences.append((cur_start, total_dur))

    speech = []
    pos = 0.0
    for s_start, s_end in silences:
        if s_start - pos > 0.06:
            speech.append((pos, s_start))
        pos = max(pos, s_end)
    if total_dur - pos > 0.06:
        speech.append((pos, total_dur))
    return speech if speech else [(0.0, total_dur)]


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


def map_words_to_speech(display_text: str, speech_segs, vo_offset: float):
    words = display_text.split()
    weights = [
        max(
            2,
            len(re.sub(r"[^a-zA-Z0-9]", "", w))
            + (3 if w.endswith((".", ",", "?", "!", ":")) else 0),
        )
        for w in words
    ]
    total_w = sum(weights)
    total_speech = sum(b - a for a, b in speech_segs)

    word_timings = []
    seg_idx = 0
    seg_pos = speech_segs[0][0]
    for w, wt in zip(words, weights):
        dur = (wt / total_w) * total_speech
        w_start = None
        rem = dur
        while rem > 1e-6 and seg_idx < len(speech_segs):
            s_a, s_b = speech_segs[seg_idx]
            seg_pos = max(seg_pos, s_a)
            avail = s_b - seg_pos
            if w_start is None:
                w_start = seg_pos
            if rem <= avail + 1e-6:
                seg_pos += rem
                rem = 0.0
            else:
                rem -= avail
                seg_idx += 1
                if seg_idx < len(speech_segs):
                    seg_pos = speech_segs[seg_idx][0]
        w_end = seg_pos
        if w_start is None:
            w_start = w_end
        word_timings.append(
            {
                "text": w,
                "start": round(vo_offset + w_start, 3),
                "end": round(vo_offset + max(w_start + 0.08, w_end), 3),
            }
        )
    return word_timings


def main():
    timeline_scenes = []
    captions = []
    cur_t = 0.0
    cap_id = 1

    for i, sc in enumerate(SCENES):
        print(f"Syncing scene {sc['id']}...")
        mp3_path = tts_scene(sc["id"], sc["text"])
        dur = probe_duration(mp3_path)
        speech_segs = detect_speech_segments(mp3_path, dur)

        lead_in = 0.55 if i == 0 else 0.45
        tail_pad = 1.35 if i == len(SCENES) - 1 else 0.55
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
        w_timings = map_words_to_speech(display_text, speech_segs, vo_start)
        chunks = chunk_lines([w["text"] for w in w_timings], max_chars=26, max_lines=2)
        w_idx = 0
        for lines in chunks:
            n_words = sum(len(l.split()) for l in lines)
            sub_words = w_timings[w_idx : w_idx + n_words]
            w_idx += n_words
            captions.append(
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

        cur_t = sc_end
        print(
            f"  -> {sc['id']}: dur={dur:.2f}s, speech_segs={len(speech_segs)}, end={sc_end:.2f}s"
        )

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

    print(f"\nSynced successfully! Total duration: {cur_t:.2f}s, captions: {len(captions)}")


if __name__ == "__main__":
    main()
