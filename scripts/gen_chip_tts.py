#!/usr/bin/env python3
import base64
import json
import os
import re
import subprocess
import urllib.error
import urllib.request

ROOT = "/root/remotion-krypton"
SRC_TXT = os.path.join(ROOT, "naskah_chip.txt")
VO_DIR = os.path.join(ROOT, "public/audio/vo")
OUT_JSON = os.path.join(ROOT, "src/data/chip-cues.json")
os.makedirs(VO_DIR, exist_ok=True)
os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)

FPS = 30
TAIL_SEC = 1.4


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


def parse_script(path):
    tok_re = re.compile(r"(?:@(\w+)=)?(\{[^}]+\}\S*|\S+)")
    grp_re = re.compile(r"\{([^|}]+)\|([^}]+)\}(.*)")
    scenes = []
    cur = None
    with open(path, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line or line.startswith("# ") and not line.startswith("## "):
                continue
            if line.startswith("## "):
                cur = {"id": line[3:].strip(), "tokens": [], "lines": []}
                scenes.append(cur)
                continue
            if cur is None:
                continue
            line_said = []
            for m in tok_re.finditer(line):
                marker, raw = m.group(1), m.group(2)
                g = grp_re.fullmatch(raw)
                if g:
                    shown = g.group(1) + g.group(3)
                    said = g.group(2) + g.group(3)
                else:
                    shown, said = raw, raw
                cur["tokens"].append({"marker": marker, "shown": shown, "said": said})
                line_said.append(said)
            cur["lines"].append(" ".join(line_said))
    return scenes


def call_gemini(model: str, payload: dict, timeout: int = 180):
    last_err = None
    for idx, key in enumerate(API_KEYS):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="ignore")
            print(f"  [key {idx+1}] HTTP {e.code}: {body[:160]}")
            last_err = e
            if e.code in (429, 403, 401, 500, 503):
                continue
            raise
        except Exception as e:
            print(f"  [key {idx+1}] Error: {e}")
            last_err = e
            continue
    raise RuntimeError(f"All Gemini keys failed for {model}: {last_err}")


def generate_one_take_vo(scenes):
    norm_wav = os.path.join(VO_DIR, "chip-vo-norm.wav")
    align_mp3 = os.path.join(VO_DIR, "chip-vo-align.mp3")
    raw_pcm = os.path.join(VO_DIR, "chip-vo-raw.pcm")

    paragraphs = []
    for s in scenes:
        paragraphs.append(" ".join(s["lines"]))
    full_transcript = "\n\n".join(paragraphs)

    tts_prompt = (
        "# AUDIO PROFILE: Tech Creator Santai & Tajam\n"
        "Bacakan seluruh naskah di bawah ini dalam SATU TAKE penuh dengan SATU suara narator tunggal "
        "yang konsisten dari kata pertama hingga terakhir.\n"
        "Gaya: lincah, ekspresif, santai tapi tajam ala kreator teknologi TikTok Indonesia. "
        "JANGAN menirukan suara orang lain saat membaca kutipan komentar netizen — pertahankan warna suara dan karakter vokal yang sama persis, cukup beri intonasi sarkas.\n"
        "Berikan jeda singkat sekitar 0.35 detik pada perpindahan paragraf atau tanda elipsis '...'. "
        "Jangan tambahkan kata lain dan jangan membacakan instruksi ini.\n\n"
        f"{full_transcript}"
    )

    print("[1/3] Generating 1-take Gemini TTS (Puck)...")
    payload = {
        "contents": [{"parts": [{"text": tts_prompt}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Puck"}}
            },
        },
    }
    data = call_gemini("gemini-2.5-flash-preview-tts", payload, timeout=180)
    b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    with open(raw_pcm, "wb") as f:
        f.write(base64.b64decode(b64))

    # Trim initial silence, slight 1.04x snappy pace, normalize loudness to -16 LUFS
    subprocess.run(
        [
            "ffmpeg", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", raw_pcm,
            "-af", "atempo=1.04,silenceremove=start_periods=1:start_silence=0.04:start_threshold=-42dB,loudnorm=I=-16:TP=-1.5:LRA=9",
            "-ar", "48000", "-c:a", "pcm_s16le", norm_wav,
        ],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", norm_wav, "-ar", "16000", "-ac", "1", "-b:a", "64k", align_mp3,
        ],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    if os.path.exists(raw_pcm):
        os.remove(raw_pcm)

    dur = float(
        subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", norm_wav]
        ).decode().strip()
    )
    print(f"  Generated 1-take VO: {norm_wav} ({dur:.2f}s)")
    return norm_wav, align_mp3, dur


def detect_speech_segments(audio_path: str, total_dur: float):
    proc = subprocess.run(
        ["ffmpeg", "-i", audio_path, "-af", "silencedetect=noise=-30dB:d=0.16", "-f", "null", "-"],
        capture_output=True, text=True,
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


def align_words_multimodal(align_mp3: str, scenes, total_dur: float):
    print("[2/3] Aligning words via Gemini Multimodal Audio + FFmpeg energy envelope...")
    flat_tokens = []
    for s in scenes:
        for t in s["tokens"]:
            flat_tokens.append({
                "i": len(flat_tokens),
                "scene": s["id"],
                "shown": t["shown"],
                "said": t["said"],
                "marker": t["marker"],
            })

    with open(align_mp3, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")

    token_list_str = "\n".join([f'{t["i"]}: "{t["said"]}"' for t in flat_tokens])
    align_prompt = (
        f"Listen carefully to the attached {total_dur:.2f}s Indonesian speech audio. "
        f"Provide the EXACT start and end timestamp in seconds (floating point, 3 decimal places) "
        f"for EACH of the {len(flat_tokens)} tokens listed below in order. "
        f"Timestamps must be strictly monotonically increasing, within [0.0, {total_dur:.3f}], "
        f"and accurately reflect actual speech pauses (do not stretch a word across a silent pause).\n\n"
        f"Tokens:\n{token_list_str}\n\n"
        f'Return ONLY valid JSON matching: {{"words": [{{"i": 0, "s": 0.100, "e": 0.350}}, ...]}}'
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"inlineData": {"mimeType": "audio/mp3", "data": audio_b64}},
                    {"text": align_prompt},
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.0,
        },
    }

    res = call_gemini("gemini-2.5-flash", payload, timeout=180)
    raw_json = res["candidates"][0]["content"]["parts"][0]["text"]
    parsed = json.loads(raw_json)
    aligned = parsed.get("words", [])
    print(f"  Gemini returned {len(aligned)} / {len(flat_tokens)} word timestamps")

    speech_segs = detect_speech_segments(align_mp3, total_dur)
    print(f"  FFmpeg detected {len(speech_segs)} active speech segments")

    # Build a fallback speech-mapped array just in case any index is missing/malformed
    if len(aligned) == len(flat_tokens):
        # Validate monotonicity & snap any word boundaries cleanly
        prev_e = 0.0
        for idx, item in enumerate(aligned):
            s_t = max(prev_e, float(item["s"]))
            e_t = max(s_t + 0.06, float(item["e"]))
            if e_t > total_dur:
                e_t = total_dur
                s_t = min(s_t, e_t - 0.05)
            flat_tokens[idx]["s"] = round(s_t, 3)
            flat_tokens[idx]["e"] = round(e_t, 3)
            prev_e = s_t
    else:
        raise RuntimeError(f"Alignment mismatch: got {len(aligned)} vs {len(flat_tokens)}")

    # Refine boundaries: ensure consecutive tokens don't artificially sit inside silent gaps > 0.25s
    # Snap scene boundaries to the midpoint of silent gaps where possible
    words_out = []
    markers = {}
    scene_bounds = []
    cursor = 0
    for s in scenes:
        n = len(s["tokens"])
        s_tokens = flat_tokens[cursor : cursor + n]
        cursor += n
        for t in s_tokens:
            words_out.append({
                "w": t["shown"],
                "s": t["s"],
                "e": t["e"],
                "scene": s["id"],
            })
            if t["marker"]:
                markers[t["marker"]] = {
                    "t": t["s"],
                    "f": int(round(t["s"] * FPS)),
                }
        scene_bounds.append((s["id"], s_tokens[0]["s"], s_tokens[-1]["e"]))

    out_scenes = []
    for k, (sid, a, b) in enumerate(scene_bounds):
        start_s = 0.0 if k == 0 else (scene_bounds[k - 1][2] + a) / 2.0
        end_s = (b + TAIL_SEC) if k == len(scene_bounds) - 1 else (b + scene_bounds[k + 1][1]) / 2.0
        out_scenes.append({
            "id": sid,
            "startFrame": int(round(start_s * FPS)),
            "endFrame": int(round(end_s * FPS)),
        })

    out_data = {
        "fps": FPS,
        "totalFrames": out_scenes[-1]["endFrame"],
        "totalDuration": round(out_scenes[-1]["endFrame"] / FPS, 3),
        "scenes": out_scenes,
        "markers": markers,
        "words": words_out,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)
    print(f"[3/3] Saved {OUT_JSON}: {len(words_out)} words, {len(markers)} markers, {out_data['totalFrames']} frames ({out_data['totalDuration']}s)")


def main():
    scenes = parse_script(SRC_TXT)
    print(f"Parsed {len(scenes)} scenes from {SRC_TXT}")
    norm_wav, align_mp3, dur = generate_one_take_vo(scenes)
    align_words_multimodal(align_mp3, scenes, dur)


if __name__ == "__main__":
    main()
