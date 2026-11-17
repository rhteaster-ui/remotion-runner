import json
import requests

bot_token = "9045696572:AAHSPg6Q9sgSOlybaXTV5D0Vzq2azhl3mdw"
chat_id = 8343466107
video_path = "/root/remotion-krypton/out/RepoFlow-v2-Final.mp4"
thumb_path = "/root/remotion-krypton/out/RepoFlow-v2-Final-thumb.jpg"

url = f"https://api.telegram.org/bot{bot_token}/sendVideo"

caption = (
    "🎬 RepoFlow v2 — Production Teardown (Authentic Edition)\n"
    "Karya Orisinal: rhmt ofc (rhmt.biz.id)\n\n"
    "⚡ Perbaikan Tuntas Sesuai Arahan Tuan:\n"
    "• Screenshot Asli Terpasang: Menampilkan UI nyata RepoFlow di mobile dashboard, JSZip upload workbench, code inspector @rhmt-ofc/e-rekap, dan dialog AES-256 vault.\n"
    "• Subtitle Dinamis & Luwes: Zero-jitter invariant width, kinetic spring pop highlight, pemenggalan frasa alami, dan backing scrim transparan.\n"
    "• Studio Modern & Clean: Desain Kinetic Keynote Studio bebas garis blueprint grid kaku, sudut rounded 32px, dan depth shadow bertingkat.\n\n"
    "📊 Metadata: 1080x1920 (9:16) · 77.18s · 8.4 MB · Rendered via GitHub Actions Cloud Runner."
)

print("[*] Uploading Refined Video to Telegram...")
with open(video_path, "rb") as f_vid, open(thumb_path, "rb") as f_thumb:
    files = {
        "video": ("RepoFlow-v2-Final.mp4", f_vid, "video/mp4"),
        "thumb": ("thumb.jpg", f_thumb, "image/jpeg"),
    }
    data = {
        "chat_id": chat_id,
        "caption": caption,
        "supports_streaming": True,
        "width": 1080,
        "height": 1920,
        "duration": 77,
    }
    r = requests.post(url, data=data, files=files, timeout=180)
    print("Telegram API Response:", r.status_code, r.text)
