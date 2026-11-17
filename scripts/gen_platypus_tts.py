import base64
import json
import math
import os
import re
import struct
import subprocess
import urllib.error
import urllib.request
import wave

ROOT = "/root/remotion-krypton"
VO_DIR = os.path.join(ROOT, "public/audio/vo-platypus")
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
        "id": "p1-hook",
        "title": "Binatang Paling Janggal Sedunia",
        "bg": "dark",
        "text": (
            "Binatang paling janggal sedunia itu bukan buaya atau komodo, tapi Platypus. "
            "Karena hewan ini kayaknya dibikin pakai sisaan sparepart binatang lain yang gak kepake."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya konten kreator sains Indonesia yang energik, ceplas-ceplos, "
            "heran, dan ekspresif dengan tempo lincah:"
        ),
    },
    {
        "id": "p2-sparepart",
        "title": "Sparepart Campuran & Ilmuwan 1799",
        "bg": "light",
        "text": (
            "Pertama, dia ini mamalia, berbulu kayak berang-berang. "
            "Tapi moncongnya bebek, ekornya berang-berang, terus kakinya katak. "
            "Waktu pertama kali ilmuwan nemu Platypus di Australia, mereka kira ini boneka mainan "
            "yang dijait iseng sama anak SD. Ditarik paruhnya, eh asli. Janggal banget."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya bercerita komedi yang heran, lincah, dan ekspresif, "
            "beri penekanan kaget saat bilang 'eh asli. Janggal banget':"
        ),
    },
    {
        "id": "p3-telur-keringat",
        "title": "Mamalia Bertelur & Susu Keringat",
        "bg": "dark",
        "text": (
            "Kedua, kalau mamalia lain melahirkan terus menyusui dengan normal, "
            "Platypus bertelur. Mamalia tapi nelor. "
            "Dan yang lebih absurd lagi: dia gak punya puting susu. Terus nyusuin anaknya gimana? "
            "Keringat. Susunya keluar lewat pori-pori keringat di perutnya. "
            "Lu bayangin kalau manusia begitu: Eh Dek, haus ya? Sini jilat ketek Mama. "
            "Janggal banget, stres anaknya dari bayi."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya komedi Indonesia yang ekspresif, heran, dan jenaka, "
            "mainkan intonasi menggoda saat dialog 'Eh Dek, haus ya? Sini jilat ketek Mama':"
        ),
    },
    {
        "id": "p4-tanpa-lambung",
        "title": "Gak Punya Lambung & GERD",
        "bg": "light",
        "text": (
            "Terus kita ke pencernaannya. Platypus itu gak punya lambung. "
            "Makanan dari tenggorokan langsung nyelonong masuk usus. "
            "Gak ada proses mikir, gak ada proses asam lambung. "
            "Jadi Platypus gak bakal bisa tuh izin kerja: Bos, izin ya, GERD saya lagi kambuh. "
            "Pasti bohong dia, orang lambung aja gak punya."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya ceplas-ceplos dan komedi natural, "
            "perankan nada memelas saat dialog 'Bos, izin ya, GERD saya lagi kambuh' lalu punchline tegas:"
        ),
    },
    {
        "id": "p5-taji-beracun",
        "title": "Muka Lucu Tapi Taji Beracun",
        "bg": "dark",
        "text": (
            "Dan yang paling curang... Kaki belakang pejantannya punya taji beracun "
            "yang sakitnya bisa bikin pingsan berbulan-bulan. "
            "Udah mukanya lucu kayak kartun bebek, badannya empuk, eh punya jarum beracun. "
            "Bete banget lawannya."
        ),
        "tts_prompt": (
            "Bacakan dengan nada dramatis lalu berubah kesal jenaka di akhir, "
            "tempo padat dan ekspresif:"
        ),
    },
    {
        "id": "p6-outro-seblak",
        "title": "Cuma di Australia... Atau Seblak?",
        "bg": "light",
        "text": (
            "Takut kan lu ketemu dia? Tenang aja, Platypus cuma ada di Australia kok. "
            "Aman dong, Bang? "
            "Iya aman, kalau lu gak apes ketemu dia lagi jajan seblak di pengkolan. "
            "Fakta absurd lainnya bareng Elaina, cek di rhmt ofc — rhmt.biz.id."
        ),
        "tts_text": (
            "Takut kan lu ketemu dia? Tenang aja, Platypus cuma ada di Australia kok. "
            "Aman dong, Bang? "
            "Iya aman, kalau lu gak apes ketemu dia lagi jajan seblak di pengkolan. "
            "Fakta absurd lainnya bareng Elaina, cek di Rahmat official, r h m t dot biz dot id."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya obrolan santai dan punchline komedi tajam, "
            "bedakan suara polos saat bertanya 'Aman dong, Bang?' lalu jawab santai kocak dan tutup ramah:"
        ),
    },
]


def tts_scene(scene_id: str, text: str, prompt_prefix: str, tempo: float = 1.06) -> str:
    mp3_path = os.path.join(VO_DIR, f"{scene_id}.mp3")
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 1000:
        return mp3_path
    pcm_path = os.path.join(VO_DIR, f"{scene_id}.pcm")
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": f"{prompt_prefix} {text}"
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
            "-af",
            f"atempo={tempo},silenceremove=start_periods=1:start_silence=0.05:start_threshold=-42dB",
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


def extract_fps_amplitude(mp3_path: str, fps: int = 30) -> list[float]:
    """Extract normalized 0..1 per-frame RMS amplitude envelope from MP3 for Elaina reactivity."""
    tmp_wav = mp3_path + ".tmp.wav"
    subprocess.run(
        ["ffmpeg", "-y", "-i", mp3_path, "-ac", "1", "-ar", "12000", tmp_wav],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    with wave.open(tmp_wav, "rb") as w:
        sr = w.getframerate()
        raw = w.readframes(w.getnframes())
    os.remove(tmp_wav)
    samples = struct.unpack(f"<{len(raw) // 2}h", raw)
    step = sr // fps
    amps = []
    for i in range(0, len(samples), step):
        chunk = samples[i : i + step]
        if not chunk:
            break
        rms = math.sqrt(sum(s * s for s in chunk) / len(chunk)) / 32768.0
        amps.append(rms)
    peak = max(amps) if amps else 1.0
    if peak < 1e-6:
        peak = 1.0
    return [round(min(1.0, (a / peak) * 1.25), 3) for a in amps]


def detect_speech_segments(mp3_path: str, total_dur: float):
    proc = subprocess.run(
        ["ffmpeg", "-i", mp3_path, "-af", "silencedetect=noise=-28dB:d=0.18", "-f", "null", "-"],
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
        if s_start - pos > 0.05:
            speech.append((pos, s_start))
        pos = max(pos, s_end)
    if total_dur - pos > 0.05:
        speech.append((pos, total_dur))
    return speech if speech else [(0.0, total_dur)]


def chunk_lines(words, max_chars=25, max_lines=2):
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


def map_words_to_speech(text: str, speech_segs, vo_offset: float):
    words = text.split()
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
        print(f"Generating TTS for {sc['id']}...")
        spoken_text = sc.get("tts_text", sc["text"])
        mp3_path = tts_scene(sc["id"], spoken_text, sc["tts_prompt"], tempo=1.06)
        dur = probe_duration(mp3_path)
        speech_segs = detect_speech_segments(mp3_path, dur)
        amp = extract_fps_amplitude(mp3_path, fps=30)

        lead_in = 0.45 if i == 0 else 0.40
        tail_pad = 1.40 if i == len(SCENES) - 1 else 0.50
        vo_start = round(cur_t + lead_in, 3)
        vo_end = round(vo_start + dur, 3)
        sc_end = round(vo_end + tail_pad, 3)

        w_timings = map_words_to_speech(sc["text"], speech_segs, vo_start)

        timeline_scenes.append(
            {
                "id": sc["id"],
                "title": sc["title"],
                "bg": sc["bg"],
                "audio": f"audio/vo-platypus/{sc['id']}.mp3",
                "start": round(cur_t, 3),
                "duration": round(sc_end - cur_t, 3),
                "vo_start": vo_start,
                "vo_end": vo_end,
                "end": sc_end,
                "amp": amp,
                "words": w_timings,
            }
        )

        chunks = chunk_lines([w["text"] for w in w_timings], max_chars=25, max_lines=2)
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
            f"  -> {sc['id']}: dur={dur:.2f}s, speech_segs={len(speech_segs)}, amp_frames={len(amp)}, end={sc_end:.2f}s"
        )

    os.makedirs(os.path.join(ROOT, "src/data"), exist_ok=True)
    with open(os.path.join(ROOT, "src/data/platypus-timeline.json"), "w") as f:
        json.dump(
            {
                "fps": 30,
                "estimated": False,
                "total": round(cur_t, 3),
                "scenes": timeline_scenes,
            },
            f,
            indent=1,
        )

    with open(os.path.join(ROOT, "src/data/platypus-subtitles.json"), "w") as f:
        json.dump({"captions": captions}, f, indent=1)

    print(f"DONE! Total duration: {cur_t:.2f}s")


if __name__ == "__main__":
    main()
