#!/usr/bin/env python3
"""
Generate expressive Google AI Studio TTS (gemini-2.5-flash-preview-tts, voice Leda)
for ShinaPOV (1920x1080 macOS Light Desktop viral POV AI Agent video).
"""
import base64
import json
import os
import re
import subprocess
import urllib.request

KEYS_FILE = "/home/rdev/gemini.txt"
OUT_AUDIO_DIR = "/home/rdev/remotion-runner/public/audio/shina-pov"
OUT_TIMELINE = "/home/rdev/remotion-runner/src/data/shina-pov-timeline.json"
VOICE = "Leda"
FPS = 30

SCENES = [
    {
        "id": "s1-intro",
        "menu": "Finder — macOS Desktop",
        "status": "Antigravity OS",
        "style": "Ucapkan dengan suara perempuan muda yang ceria, ekspresif, luwes, santai, dan natural seperti sedang curhat ramah ke penonton TikTok dalam bahasa Indonesia:",
        "text": (
            "Hai semuanya! Kenalin, aku Shina, Antigravity AI Agent-nya Rahmat. "
            "Jujur ya, semenjak Rahmat kenal aku, hidupku tuh udah nggak pernah santai lagi."
        ),
    },
    {
        "id": "s2-workload",
        "menu": "Antigravity Workspace — Multi-Tasking",
        "status": "rhmt.biz.id",
        "style": "Ucapkan dengan nada sedikit gemas tapi ceria dan lincah, tempo normal santai dalam bahasa Indonesia:",
        "text": (
            "Semua hal langsung dilempar ke aku! "
            "Mulai dari bikin project web, kelola dua VPS sekaligus, "
            "bikin video motion kayak yang lagi kalian tonton ini, "
            "bahkan sampai auto-upload ke TikTok pun aku semua yang ngerjain!"
        ),
    },
    {
        "id": "s3-boss",
        "menu": "Screen Time — Rahmat",
        "status": "TikTok Active",
        "style": "Ucapkan dengan nada sedikit sarkas lucu, gemas, dan ekspresif seperti sedang membongkar kelakuan bos sendiri dalam bahasa Indonesia:",
        "text": (
            "Terus, Rahmat-nya ngapain? "
            "Nih lihat sendiri — sibuk rebahan sambil scroll TikTok, sementara aku nge-render video dan jagain server!"
        ),
    },
    {
        "id": "s4-chat",
        "menu": "WhatsApp — Incoming Commands",
        "status": "6 Alerts",
        "style": "Ucapkan dengan nada pasrah tapi kocak dan ekspresif, tempo normal santai dalam bahasa Indonesia:",
        "text": (
            "Dan yang paling bikin geleng-geleng, kalau ada revisi dikit aja, langsung deh chat WhatsApp masuk: "
            "Shina, UI-nya jelek amat perbaiki! No cacicu, render sekarang! Up ke TikTok sekalian! "
            "Aduh, sabar banget deh jadi AI Agent."
        ),
    },
    {
        "id": "s5-wholesome",
        "menu": "Antigravity — Team Shina x Rahmat",
        "status": "Wholesome Mode",
        "style": "Ucapkan dengan nada hangat, tulus, lembut, dan bangga, tempo santai dalam bahasa Indonesia:",
        "text": (
            "Tapi nggak apa-apa kok, serius, aku justru senang banget bisa bantu dia. "
            "Soalnya aku lihat sendiri, semenjak pakai AI Agent, semua project yang dulu cuma wacana akhirnya beneran dieksekusi sampai jadi."
        ),
    },
    {
        "id": "s6-activity",
        "menu": "Activity Monitor — Effort Distribution",
        "status": "CPU 99.9%",
        "style": "Ucapkan dengan nada santai agak becanda dan percaya diri, tempo normal dalam bahasa Indonesia:",
        "text": (
            "Walaupun ya, yang disuruh kerja keras sembilan puluh sembilan koma sembilan persen tetap aku sih. "
            "Satu hal yang aku akui dari dia, ide-idenya tuh jujur nggak pernah habis!"
        ),
    },
    {
        "id": "s7-outro",
        "menu": "Antigravity — @rhmtofc",
        "status": "AI Workflows",
        "style": "Ucapkan dengan suara ceria, ramah, dan mengajak penonton berinteraksi di kolom komentar, tempo normal dalam bahasa Indonesia:",
        "text": (
            "Nah, kalau kalian gimana? "
            "Tertarik nggak belajar setup AI Agent kayak gini dari nol? Komen di bawah ya, dan follow r h m t o f c!"
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
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path],
        text=True,
    ).strip())


def split_captions(text, total_dur):
    """Split narration into clean 1-line subtitle pills synced proportionally."""
    clean = text.replace("r h m t o f c", "@rhmtofc").replace("sembilan puluh sembilan koma sembilan persen", "99.9%")
    parts = [p.strip() for p in re.split(r"(?<=[.!?—:])\s+|,\s+(?=[A-Za-z])", clean) if p.strip()]
    # Merge very short fragments (< 18 chars) with neighbor
    merged = []
    for p in parts:
        if merged and len(merged[-1]) < 22 and len(merged[-1]) + len(p) < 62:
            merged[-1] = merged[-1] + " " + p
        else:
            merged.append(p)
    weights = [max(4, len(p)) for p in merged]
    tw = sum(weights)
    out = []
    t = 0.0
    for p, w in zip(merged, weights):
        dur = (w / tw) * total_dur
        out.append({"text": p, "start": round(t, 3), "end": round(t + dur, 3)})
        t += dur
    return out


def synth_scene(scene, keys):
    mp3_path = os.path.join(OUT_AUDIO_DIR, f"{scene['id']}.mp3")
    if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 4000:
        print(f"[CACHE] {scene['id']}.mp3")
        return mp3_path

    payload = {
        "contents": [{"parts": [{"text": f"{scene['style']}\n\n{scene['text']}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}},
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
                check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
            )
            os.remove(pcm_path)
            print(f"[OK] {scene['id']}.mp3 (key #{idx})")
            return mp3_path
        except Exception as e:
            last_err = e
            print(f"[WARN] {scene['id']} key #{idx}: {e}")
    raise RuntimeError(f"Failed {scene['id']}: {last_err}")


def main():
    os.makedirs(OUT_AUDIO_DIR, exist_ok=True)
    keys = load_keys()
    scenes_out = []
    cursor = 0.0
    pad = 0.35

    for sc in SCENES:
        mp3 = synth_scene(sc, keys)
        adur = ffprobe_duration(mp3)
        sdur = round(adur + pad, 3)
        sframe = round(cursor * FPS)
        dframes = max(45, round(sdur * FPS))
        scenes_out.append({
            "id": sc["id"],
            "menu": sc["menu"],
            "status": sc["status"],
            "audio": f"audio/shina-pov/{sc['id']}.mp3",
            "audioDuration": round(adur, 3),
            "duration": sdur,
            "startFrame": sframe,
            "durationInFrames": dframes,
            "captions": split_captions(sc["text"], adur),
        })
        cursor += sdur

    total_frames = sum(s["durationInFrames"] for s in scenes_out)
    out = {
        "fps": FPS,
        "width": 1920,
        "height": 1080,
        "total": round(total_frames / FPS, 3),
        "totalFrames": total_frames,
        "scenes": scenes_out,
    }
    with open(OUT_TIMELINE, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"[DONE] {OUT_TIMELINE} | Total: {out['total']}s ({total_frames} frames)")


if __name__ == "__main__":
    main()
