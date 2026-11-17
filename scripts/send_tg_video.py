import json
import requests

bot_token = "9045696572:AAHSPg6Q9sgSOlybaXTV5D0Vzq2azhl3mdw"
chat_id = 8343466107
video_path = "/root/remotion-krypton/out/RepoFlowPremium.mp4"
thumb_path = "/root/remotion-krypton/out/RepoFlowPremium-thumb.jpg"

url = f"https://api.telegram.org/bot{bot_token}/sendVideo"

caption = (
    "🎬 RepoFlow v2 — Production Teardown\n"
    "Karya Orisinal: rhmt ofc (rhmt.biz.id)\n\n"
    "⚡ Aspek Naik Level:\n"
    "• 4-Zone Dynamic Shell: Figma Anchor Hook, Breadcrumb Pipeline Stepper, Forensic Stage, dan Karaoke Subtitle.\n"
    "• Architecture Teardown: Client-side memory unzip (0 backend), Atomic Git Tree (batchPushToBranch), dan Web Crypto AES-GCM 256 non-extractable.\n"
    "• Audio & Visual Elevation: Google AI Puck VO (Cheeky Sidekick), 20+ SFX Cues sinkron, Blueprint Cyan vs Crisp Slate Pacing.\n\n"
    "📊 Metadata: 1080x1920 (9:16) · 75.95s · 8.3 MB · Rendered via GitHub Actions Cloud Runner."
)

print("[*] Uploading video to Telegram...")
with open(video_path, "rb") as f_vid, open(thumb_path, "rb") as f_thumb:
    files = {
        "video": ("RepoFlowPremium.mp4", f_vid, "video/mp4"),
        "thumb": ("thumb.jpg", f_thumb, "image/jpeg"),
    }
    data = {
        "chat_id": chat_id,
        "caption": caption,
        "supports_streaming": True,
        "width": 1080,
        "height": 1920,
        "duration": 76,
    }
    r = requests.post(url, data=data, files=files, timeout=180)
    print("Telegram API Response:", r.status_code, r.text)
