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
VO_DIR = os.path.join(ROOT, "public/audio/vo-js")
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
        "id": "js1-hook",
        "title": "Bahasa Paling Janggal Sedunia",
        "bg": "dark",
        "text": (
            "Bahasa pemrograman paling janggal sedunia itu JavaScript. "
            "Karena ternyata bahasa yang dipakai 90% website di bumi ini lebih aneh dari yang kita kira."
        ),
        "tts_text": (
            "Bahasa pemrograman paling janggal sedunia itu JavaScript. "
            "Karena ternyata bahasa yang dipakai sembilan puluh persen website di bumi ini lebih aneh dari yang kita kira."
        ),
        "tts_prompt": (
            "Bacakan dengan nada penasaran, playful, dan sarkas khas pembawa acara tech yang heran sendiri dengan tempo lincah:"
        ),
    },
    {
        "id": "js2-angka-teks",
        "title": "Satu Tambah Satu Sebelas",
        "bg": "light",
        "text": (
            "Pertama, di JavaScript, kalau lu nambahin angka sama teks... "
            "Satu ditambah satu itu bukan dua. Tapi sebelas. "
            "Lu bayangin, kalau kasir minimarket pakai JavaScript: "
            "Total belanjaan Mas seribu, terus bayar parkir seribu, jadinya sejuta seribu ya Mas. "
            "Rugi bandar lu. Tahu dia cara bikin miskin."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya bercerita komedi Indonesia yang heran, ekspresif, dan berenergi, "
            "perankan dialog kasir dengan nada santai, lalu punchline tegas:"
        ),
    },
    {
        "id": "js3-nan",
        "title": "Logika NaN: Bukan Angka Tapi Angka",
        "bg": "dark",
        "text": (
            "Sekarang kita ke logika nilainya. Di bahasa normal, kosong ya kosong, nol ya nol. "
            "Di JavaScript, ada yang namanya NaN alias Not a Number, artinya Bukan Angka. "
            "Tapi pas lu cek tipe datanya pakai typeof NaN... Jawabannya: Number. "
            "Bukan angka, tapi tipenya angka! Bete banget gak tuh? "
            "Itu ibarat lu mesen es teh manis, pas dateng dikasih tahu: "
            "Mas, ini bukan es teh ya, tapi tipenya es teh. Janggal banget."
        ),
        "tts_text": (
            "Sekarang kita ke logika nilainya. Di bahasa normal, kosong ya kosong, nol ya nol. "
            "Di JavaScript, ada yang namanya N a N alias Not a Number, artinya Bukan Angka. "
            "Tapi pas lu cek tipe datanya pakai type of N a N... Jawabannya: Number. "
            "Bukan angka, tapi tipenya angka! Bete banget gak tuh? "
            "Itu ibarat lu mesen es teh manis, pas dateng dikasih tahu: "
            "Mas, ini bukan es teh ya, tapi tipenya es teh. Janggal banget."
        ),
        "tts_prompt": (
            "Bacakan dengan intonasi sarkastik dan heran, mainkan nada kesal saat bilang 'Bete banget gak tuh?' "
            "dan perankan dialog pelayan es teh secara natural:"
        ),
    },
    {
        "id": "js4-array-objek",
        "title": "Array vs Objek & Semen Tiga Roda",
        "bg": "light",
        "text": (
            "Dan yang paling bikin geleng-geleng kepala... "
            "Array kosong ditambah objek kosong, hasilnya objek kosong. "
            "Tapi objek kosong ditambah array kosong, hasilnya nol! Bolak-balik beda hasil. Curang banget. "
            "Lu bayangin kalau resep martabak kayak gitu: Telor campur terigu jadi martabak. "
            "Tapi terigu campur telor jadi semen tiga roda. Stres programmernya."
        ),
        "tts_prompt": (
            "Bacakan dengan tempo lincah, ekspresif, heran komedi, dan punchline resep martabak jadi semen tiga roda yang kocak:"
        ),
    },
    {
        "id": "js5-typescript-outro",
        "title": "Tombol Geser 1 Pixel & Solusi TypeScript",
        "bg": "dark",
        "text": (
            "Belum lagi masalah tombol. Lu bikin tombol geser ke kanan satu pixel, "
            "eh navbar di atas terbang ke luar angkasa, footer-nya tenggelam ke dasar palung laut. "
            "Takut kan lu? Tenang aja, sekarang udah ada TypeScript kok. "
            "Bisa bikin aman gak, Bang? Enggak, itu cuma bikin lu dimarahin komputer sebelum kodingannya jalan. "
            "Tetap aja janggal. Cek komedi tech lainnya bareng Elaina di rhmt ofc — rhmt.biz.id."
        ),
        "tts_text": (
            "Belum lagi masalah tombol. Lu bikin tombol geser ke kanan satu pixel, "
            "eh navbar di atas terbang ke luar angkasa, footer-nya tenggelam ke dasar palung laut. "
            "Takut kan lu? Tenang aja, sekarang udah ada TypeScript kok. "
            "Bisa bikin aman gak, Bang? Enggak, itu cuma bikin lu dimarahin komputer sebelum kodingannya jalan. "
            "Tetap aja janggal. Cek komedi tech lainnya bareng Elaina di Rahmat official, r h m t dot biz dot id."
        ),
        "tts_prompt": (
            "Bacakan dengan gaya obrolan santai dan komedi tajam, variasikan suara tanya polos 'Bisa bikin aman gak, Bang?' "
            "lalu jawaban to the point kocak, dan penutup ramah:"
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
        target_dur = (wt / total_w) * total_speech
        rem_dur = target_dur

        w_start = vo_offset + seg_pos
        while rem_dur > 0 and seg_idx < len(speech_segs):
            sa, sb = speech_segs[seg_idx]
            avail = sb - seg_pos
            if rem_dur <= avail:
                seg_pos += rem_dur
                rem_dur = 0.0
            else:
                rem_dur -= avail
                seg_idx += 1
                if seg_idx < len(speech_segs):
                    seg_pos = speech_segs[seg_idx][0]
                else:
                    seg_pos = sb
        w_end = vo_offset + seg_pos
        word_timings.append({
            "word": w,
            "start": round(w_start, 3),
            "end": round(max(w_start + 0.08, w_end), 3),
        })

    return word_timings


def build_cues_for_scene(scene_id: str, text: str, word_timings, scene_start_s: float):
    words = [wt["word"] for wt in word_timings]
    chunks = chunk_lines(words, max_chars=26, max_lines=2)

    cues = []
    w_idx = 0
    for chunk_idx, lines in enumerate(chunks):
        chunk_word_count = sum(len(ln.split()) for ln in lines)
        chunk_wts = word_timings[w_idx : w_idx + chunk_word_count]
        w_idx += chunk_word_count

        if not chunk_wts:
            continue

        c_start = chunk_wts[0]["start"]
        c_end = chunk_wts[-1]["end"] + 0.18

        cue_words = []
        for wt in chunk_wts:
            cue_words.append({
                "word": wt["word"],
                "start": round(wt["start"], 3),
                "end": round(wt["end"], 3),
            })

        cues.append({
            "id": f"{scene_id}-cue-{chunk_idx + 1}",
            "sceneId": scene_id,
            "start": round(c_start, 3),
            "end": round(c_end, 3),
            "lines": lines,
            "words": cue_words,
        })
    return cues


def main():
    fps = 30
    timeline = {
        "fps": fps,
        "scenes": [],
        "totalDuration": 0,
        "totalFrames": 0,
    }
    all_cues = []
    all_word_timings = []

    cur_time = 0.0

    print("Generating VO and timeline for JavaScript Absurdity...")
    for idx, s in enumerate(SCENES):
        sid = s["id"]
        print(f"[{idx+1}/{len(SCENES)}] Processing {sid}...")
        prompt_txt = s.get("tts_text", s["text"])
        mp3 = tts_scene(sid, prompt_txt, s["tts_prompt"], tempo=1.07)
        dur = probe_duration(mp3)
        print(f"  dur: {dur:.2f}s")

        vo_offset = 0.15 if idx > 0 else 0.08
        scene_leadout = 0.25 if idx < len(SCENES) - 1 else 0.50
        scene_duration = vo_offset + dur + scene_leadout
        scene_frames = int(round(scene_duration * fps))

        speech_segs = detect_speech_segments(mp3, dur)
        word_timings = map_words_to_speech(s["text"], speech_segs, vo_offset=cur_time + vo_offset)
        cues = build_cues_for_scene(sid, s["text"], word_timings, cur_time)

        all_word_timings.extend(word_timings)
        all_cues.extend(cues)

        timeline["scenes"].append({
            "id": sid,
            "title": s["title"],
            "theme": s["bg"],
            "audioFile": f"audio/vo-js/{sid}.mp3",
            "audioDuration": round(dur, 3),
            "voOffset": round(vo_offset, 3),
            "duration": round(scene_duration, 3),
            "start": round(cur_time, 3),
            "end": round(cur_time + scene_duration, 3),
            "durationFrames": scene_frames,
            "startFrame": int(round(cur_time * fps)),
            "endFrame": int(round(cur_time * fps)) + scene_frames,
        })

        cur_time += scene_duration

    total_frames = int(round(cur_time * fps))
    timeline["totalDuration"] = round(cur_time, 3)
    timeline["totalFrames"] = total_frames

    # Save artifacts
    subtitles_path = os.path.join(ROOT, "src/data/js-subtitles.json")
    with open(subtitles_path, "w") as f:
        json.dump({"cues": all_cues, "words": all_word_timings}, f, indent=2)
    print(f"Saved subtitles to {subtitles_path} ({len(all_cues)} cues)")

    timeline_path = os.path.join(ROOT, "src/data/js-timeline.json")
    with open(timeline_path, "w") as f:
        json.dump(timeline, f, indent=2)
    print(f"Saved timeline to {timeline_path} ({total_frames} frames / {cur_time:.2f}s)")


if __name__ == "__main__":
    main()
