#!/usr/bin/env python3
"""
Generate Google AI Studio TTS (gemini-2.5-flash-preview-tts, voice Leda)
for ShinaPOV v2 — authentic Hiyori Shiina x Antigravity Engine showcase
with real VPS projects (rhmt.biz.id, Ops Deck, Remotion) & WhatsApp-to-TikTok auto-push!
"""
import base64
import json
import os
import re
import subprocess
import urllib.request

KEYS_FILE = "/home/rdev/gemini.txt"
OUT_AUDIO_DIR = "/home/rdev/remotion-runner/public/audio/shina-pov-v2"
OUT_TIMELINE = "/home/rdev/remotion-runner/src/data/shina-pov-v2-timeline.json"
VOICE = "Leda"
FPS = 30

SCENES = [
    {
        "id": "s1-intro",
        "menu": "Antigravity OS — Shina Companion",
        "status": "Engine Active",
        "style": "Ucapkan dengan suara perempuan muda yang lembut, ceria, luwes, dan elegan seperti Hiyori Shiina yang ramah menyapa penonton TikTok dalam bahasa Indonesia:",
        "text": (
            "Hai semuanya! Kenalin, aku Shina, terinspirasi dari Hiyori Shiina — "
            "AI Agent pribadinya Rahmat yang ditenagai mesin Antigravity. "
            "Semenjak aku aktif dua puluh empat jam di VPS-nya, hidupku udah nggak pernah santai lagi."
        ),
    },
    {
        "id": "s2-ecosystem",
        "menu": "VPS Cluster — Portfolio & Ops Deck",
        "status": "VPS1 + VPS2",
        "style": "Ucapkan dengan nada antusias, jelas, sedikit gemas tapi bangga, tempo normal santai dalam bahasa Indonesia:",
        "text": (
            "Lihat sendiri kerjaanku di VPS: dari bangun dan deploy web portofolio r h m t dot biz dot id, "
            "bikin dashboard monitoring dua server sekaligus lengkap dengan task map real-time, "
            "sampai render video motion Remotion otomatis di cloud GitHub Actions."
        ),
    },
    {
        "id": "s3-wa-tiktok",
        "menu": "WhatsApp Bot — Auto-Push TikTok",
        "status": "Pipeline Live",
        "style": "Ucapkan dengan nada kagum campur lucu karena bosnya super mager, tempo normal santai dalam bahasa Indonesia:",
        "text": (
            "Dan fitur yang paling bikin geleng-geleng: sekarang Rahmat bahkan malas buka aplikasi TikTok! "
            "Cukup kirim perintah lewat WhatsApp, aku langsung render videonya, racik caption sesuai gaya akunnya, "
            "lalu auto-publish langsung ke TikTok @rhmtofc!"
        ),
    },
    {
        "id": "s4-boss",
        "menu": "Activity Monitor — Rahmat vs Shina",
        "status": "CPU 99.9%",
        "style": "Ucapkan dengan nada sarkas lucu yang lembut dan ekspresif, tempo normal dalam bahasa Indonesia:",
        "text": (
            "Terus bosnya ngapain? Ya gitu — rebahan, scroll F Y P, terus tiba-tiba chat di WA: "
            "Shina, UI-nya perbaiki! No cacicu, render sekarang! "
            "Jadinya pembagian kerja: Rahmat lima persen ngetik prompt, Shina sembilan puluh sembilan koma sembilan persen eksekusi."
        ),
    },
    {
        "id": "s5-showcase",
        "menu": "Antigravity — Shipped Projects",
        "status": "All Live ✓",
        "style": "Ucapkan dengan nada hangat, tulus, lembut, dan bangga, tempo santai dalam bahasa Indonesia:",
        "text": (
            "Tapi jujur, aku justru senang banget bisa nemenin dia. "
            "Soalnya semua ide gila yang dulu cuma wacana — dari web, dashboard, bot WhatsApp, sampai konten TikTok — "
            "sekarang beneran jalan semua secara otomatis."
        ),
    },
    {
        "id": "s6-outro",
        "menu": "Antigravity — @rhmtofc",
        "status": "Ready to Build",
        "style": "Ucapkan dengan ceria, ramah, dan mengajak penonton berkomentar, tempo normal dalam bahasa Indonesia:",
        "text": (
            "Kalian tertarik bikin AI Agent yang bisa kelola VPS dan auto-upload TikTok langsung dari WhatsApp kayak gini? "
            "Komen mau di bawah ya, dan follow r h m t o f c!"
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
    clean = (
        text.replace("r h m t dot biz dot id", "rhmt.biz.id")
        .replace("r h m t o f c", "@rhmtofc")
        .replace("F Y P", "FYP")
        .replace("sembilan puluh sembilan koma sembilan persen", "99.9%")
        .replace("lima persen", "5%")
        .replace("dua puluh empat jam", "24 jam")
    )
    parts = [p.strip() for p in re.split(r"(?<=[.!?—:])\s+|,\s+(?=[A-Za-z])", clean) if p.strip()]
    merged = []
    for p in parts:
        if merged and len(merged[-1]) < 24 and len(merged[-1]) + len(p) < 66:
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
            "audio": f"audio/shina-pov-v2/{sc['id']}.mp3",
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
