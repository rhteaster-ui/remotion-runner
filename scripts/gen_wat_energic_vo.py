import base64
import json
import os
import subprocess
import time
import urllib.error
import urllib.request

ROOT = "/root/remotion-krypton"
RAW_WAV = os.path.join(ROOT, "public/audio/vo/wat-vo.wav")
NORM_WAV = os.path.join(ROOT, "public/audio/vo/wat-vo-norm.wav")

with open("/home/rdev/gemini.txt") as f:
    keys = [line.strip().split()[-1] for line in f if line.strip().startswith("akun ")]

# Naskah kebenaran tunggal versi ucap
FULL_TEXT = """Satu tambah satu… sebelas.
Kamu nggak salah dengar, ini JavaScript.
Dibikin cuma sepuluh hari, tapi dipakai hampir semua website di bumi.
Masalahnya, dia nggak pernah mau bilang error.

Contoh. Angka ketemu teks, plus berubah jadi tempel.
Satu plus teks satu, sebelas.
Tapi minus? Lima teks kurang tiga, dua.
Plus tempel, minus hitung. Konsisten? Enggak. Percaya diri? Banget.
Bayangin kasir minimarket pakai JavaScript: belanja seribu, parkir seribu, totalnya… sepuluh juta seribu, Mas.

Berikutnya, Nan, artinya bukan angka.
Cek tipenya… number.
Bukan angka, tapi tipenya angka.
Ini kayak pesan es teh, terus pelayannya bilang: Mas, ini bukan es teh, tapi tipenya es teh.

Yang lebih gila, tuker posisi aja beda hasil.
Di konsol, array kosong tambah objek kosong, hasilnya tulisan object.
Dibalik? Hasilnya nol.
Kayak resep martabak: telor campur terigu, jadi martabak.
Terigu campur telor… semen tiga roda.

Masih ada. Urutin sepuluh, sembilan, satu? Hasilnya: satu, sepuluh, sembilan.
Soalnya diurutin kayak abjad.
Terus b, a, plus plus a, a? Hasilnya… banana.

Terus datang TypeScript. Katanya bikin aman.
Aman? Enggak. Dia cuma marahin kamu duluan, sebelum kodenya jalan.
Bahasa lain bilang: error. JavaScript bilang: ya udah, aku tebak aja.
Komedi tech lainnya ada di Rahmat official. R H M T titik biz titik I D."""

# Prompt energik, ceplas-ceplos, playful khas video pertama
prompt = (
    "Bacakan dengan gaya konten kreator tech Indonesia yang sangat energik, "
    "ceplas-ceplos, playful, sarkas, heran sendiri, dan ekspresif dengan tempo lincah:\n\n"
    f"{FULL_TEXT}"
)

payload = {
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {
        "responseModalities": ["AUDIO"],
        "speechConfig": {
            "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": "Puck"}}
        },
    },
}

pcm_data = None
for attempt in range(len(keys) * 3):
    key = keys[attempt % len(keys)]
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={key}"
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    try:
        print(f"[*] Trying key index {attempt % len(keys)}...")
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
            pcm_data = base64.b64decode(b64)
            print(f"[+] TTS successfully received! PCM size: {len(pcm_data)} bytes")
            break
    except urllib.error.HTTPError as e:
        print(f"    HTTP {e.code}: {e.reason}, rotating key...")
        time.sleep(2)
    except Exception as e:
        print(f"    Error: {e}, retrying...")
        time.sleep(2)

if not pcm_data:
    raise RuntimeError("Failed to generate TTS after all key attempts.")

pcm_path = "/tmp/wat-vo-energic.pcm"
with open(pcm_path, "wb") as f:
    f.write(pcm_data)

# Proses dengan atempo 1.05 agar tempo lebih padat dan energik
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
        "atempo=1.05",
        "-ar",
        "48000",
        RAW_WAV,
    ],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

# Normalisasi audio standar broadcast
subprocess.run(
    [
        "ffmpeg",
        "-y",
        "-i",
        RAW_WAV,
        "-af",
        "loudnorm=I=-16:TP=-1.5:LRA=9",
        "-ar",
        "48000",
        NORM_WAV,
    ],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

dur = subprocess.check_output(
    [
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        NORM_WAV,
    ]
).decode().strip()

print(f"[+] Energetic VO generated! Duration: {dur}s")
print(f"    Saved: {NORM_WAV}")
