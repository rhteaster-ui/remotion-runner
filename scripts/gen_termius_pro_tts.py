#!/usr/bin/env python3
"""
Generate Google AI Studio TTS (gemini-2.5-flash-preview-tts, voice Leda)
for TermiusPro TikTok video + real ffmpeg silence-detected word timings.
"""
import base64
import json
import os
import re
import subprocess
import urllib.request
import urllib.error

KEYS_FILE = "/home/rdev/gemini.txt"
OUT_AUDIO_DIR = "/home/rdev/remotion-runner/public/audio/termius-pro"
OUT_TIMELINE = "/home/rdev/remotion-runner/src/data/termius-pro-timeline.json"
VOICE = "Leda"
FPS = 30
STYLE = (
    "Ucapkan dengan tempo bicara normal yang santai, jelas, luwes, dan menarik untuk konten edukasi tech TikTok "
    "(tidak terlalu lambat dan tidak terlalu cepat), suara perempuan muda yang ramah dan natural dalam bahasa Indonesia:"
)

SCENES = [
    {
        "id": "s1-hook",
        "title": "Hook",
        "step": "INTRO",
        "text": (
            "Masih ketik SSH manual tiap mau masuk VPS? "
            "Kenalan sama Termius, aplikasi terminal modern yang bikin kelola banyak server jadi jauh lebih cepat dan rapi!"
        ),
    },
    {
        "id": "s2-hosts",
        "title": "Hosts & Keychain",
        "step": "HOSTS",
        "text": (
            "Pertama, simpan semua server di menu Hosts. "
            "Cukup isi label, alamat IP, username, dan pilih SSH Key dari Keychain sekali saja. "
            "Setelah disimpan, tinggal klik dua kali langsung connect tanpa ribet ketik password lagi."
        ),
    },
    {
        "id": "s3-commands",
        "title": "Command Harian",
        "step": "COMMAND",
        "text": (
            "Begitu masuk terminal, ini command wajib buat pantau VPS: "
            "cek RAM dan CPU pakai htop, cek kapasitas storage pakai df strip h, "
            "pantau aplikasi berjalan pakai pm2 status, dan pakai tmux supaya sesi terminal tetap aman meski internet putus."
        ),
    },
    {
        "id": "s4-snippets-sftp",
        "title": "Snippets & SFTP",
        "step": "FITUR",
        "text": (
            "Biar makin ngebut, simpan command panjang kayak deploy atau restart server ke menu Snippets, tinggal satu klik langsung jalan! "
            "Mau upload atau download file? Buka tab SFTP di Termius, tinggal drag and drop langsung tanpa aplikasi tambahan."
        ),
    },
    {
        "id": "s5-shortcuts",
        "title": "Shortcut Wajib",
        "step": "SHORTCUT",
        "text": (
            "Terakhir, hafalin shortcut andalan Termius ini: "
            "Control J buat cari dan connect server instan, Control T buat buka tab baru, "
            "Control Shift D buat split layar pantau dua server sekaligus, "
            "dan Control Tab buat pindah antar server secepat kilat."
        ),
    },
    {
        "id": "s6-outro",
        "title": "Outro",
        "step": "SELESAI",
        "text": (
            "Gampang dan bikin kerjaan server makin sat-set kan? "
            "Save video ini biar nggak lupa command dan shortcut-nya, dan follow r h m t o f c untuk tips server lainnya!"
        ),
    },
]


def load_keys():
    keys = []
    with open(KEYS_FILE, "r", encoding="utf-8") as f:
        for line in f:
            m = re.search(r"(AQ\.[A-Za-z0-9_\-]+|AIza[A-Za-z0-9_\-]+)", line)
            if m and m.group(1) not in keys:
                keys.append(m.group(1))
    return keys


def ffprobe_duration(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path],
        text=True,
    ).strip()
    return float(out)


def detect_speech_segments(mp3_path, total_dur):
    """Use ffmpeg silencedetect to find real speech intervals (anti-drift)."""
    proc = subprocess.run(
        ["ffmpeg", "-i", mp3_path, "-af", "silencedetect=noise=-30dB:d=0.18", "-f", "null", "-"],
        capture_output=True,
        text=True,
    )
    stderr = proc.stderr
    silences = []
    cur_start = None
    for line in stderr.splitlines():
        m_s = re.search(r"silence_start:\s*([0-9.]+)", line)
        m_e = re.search(r"silence_end:\s*([0-9.]+)", line)
        if m_s:
            cur_start = float(m_s.group(1))
        if m_e and cur_start is not None:
            silences.append((cur_start, float(m_e.group(1))))
            cur_start = None
    if cur_start is not None:
        silences.append((cur_start, total_dur))

    speech = []
    pos = 0.0
    for s_start, s_end in silences:
        if s_start - pos > 0.08:
            speech.append((pos, s_start))
        pos = max(pos, s_end)
    if total_dur - pos > 0.08:
        speech.append((pos, total_dur))
    if not speech:
        speech = [(0.0, total_dur)]
    return speech


def map_words_to_segments(text, speech_segments):
    """Map words proportionally by syllable/char weight onto real speech intervals."""
    display_text = text.replace("r h m t o f c", "@rhmtofc").replace("df strip h", "df -h")
    words = display_text.split()
    if not words:
        return []
    weights = [max(2, len(re.sub(r"[^A-Za-z0-9]", "", w))) for w in words]
    total_w = sum(weights)
    total_speech = sum(e - s for s, e in speech_segments)

    word_timings = []
    cum_w = 0.0
    for w, wt in zip(words, weights):
        t0_speech = (cum_w / total_w) * total_speech
        t1_speech = ((cum_w + wt) / total_w) * total_speech
        cum_w += wt

        def speech_to_wall(ts):
            acc = 0.0
            for s, e in speech_segments:
                dur = e - s
                if ts <= acc + dur or (s, e) == speech_segments[-1]:
                    return s + max(0.0, min(dur, ts - acc))
                acc += dur
            return speech_segments[-1][1]

        word_timings.append({
            "word": w,
            "start": round(speech_to_wall(t0_speech), 3),
            "end": round(speech_to_wall(t1_speech), 3),
        })
    return word_timings


def synth_scene(scene, keys):
    mp3_path = os.path.join(OUT_AUDIO_DIR, f"{scene['id']}.mp3")
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 4000:
        print(f"[CACHE] {scene['id']}.mp3 exists")
        return mp3_path

    payload = {
        "contents": [{"parts": [{"text": f"{STYLE}\n\n{scene['text']}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}
            },
        },
    }
    body = json.dumps(payload).encode("utf-8")
    last_err = None
    for idx, key in enumerate(keys, 1):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={key}"
        req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
            pcm_path = mp3_path + ".pcm"
            with open(pcm_path, "wb") as f:
                f.write(base64.b64decode(b64))
            subprocess.run(
                [
                    "ffmpeg", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1",
                    "-i", pcm_path,
                    "-af", "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB,loudnorm=I=-16:TP=-1.5:LRA=11",
                    "-c:a", "libmp3lame", "-b:a", "192k", mp3_path,
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            os.remove(pcm_path)
            print(f"[OK] {scene['id']}.mp3 (key #{idx})")
            return mp3_path
        except Exception as e:
            last_err = e
            print(f"[WARN] {scene['id']} key #{idx} failed: {e}")
    raise RuntimeError(f"Failed to synth {scene['id']}: {last_err}")


def main():
    os.makedirs(OUT_AUDIO_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(OUT_TIMELINE), exist_ok=True)
    keys = load_keys()
    assert keys, "No API keys found"

    timeline_scenes = []
    cursor_sec = 0.0
    pad_sec = 0.35

    for scene in SCENES:
        mp3_path = synth_scene(scene, keys)
        audio_dur = ffprobe_duration(mp3_path)
        speech_segs = detect_speech_segments(mp3_path, audio_dur)
        words = map_words_to_segments(scene["text"], speech_segs)
        scene_dur = round(audio_dur + pad_sec, 3)
        start_frame = round(cursor_sec * FPS)
        dur_frames = max(30, round(scene_dur * FPS))

        timeline_scenes.append({
            "id": scene["id"],
            "title": scene["title"],
            "step": scene["step"],
            "audio": f"audio/termius-pro/{scene['id']}.mp3",
            "audioDuration": round(audio_dur, 3),
            "duration": scene_dur,
            "startFrame": start_frame,
            "durationInFrames": dur_frames,
            "words": words,
        })
        cursor_sec += scene_dur

    total_frames = sum(s["durationInFrames"] for s in timeline_scenes)
    timeline = {
        "fps": FPS,
        "voice": VOICE,
        "total": round(total_frames / FPS, 3),
        "totalFrames": total_frames,
        "scenes": timeline_scenes,
    }
    with open(OUT_TIMELINE, "w", encoding="utf-8") as f:
        json.dump(timeline, f, indent=2, ensure_ascii=False)
    print(f"[DONE] Timeline saved -> {OUT_TIMELINE} | Total: {timeline['total']}s ({total_frames} frames)")


if __name__ == "__main__":
    main()
