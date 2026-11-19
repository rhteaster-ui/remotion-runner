import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

OUT_DIR = "/root/remotion-krypton/public/assets/neon"
os.makedirs(OUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. HERO BANNER: neon-hero-plasma.jpg (1600x900)
# -------------------------------------------------------------
def make_hero_banner():
    w, h = 1600, 900
    img = Image.new("RGBA", (w, h), (8, 11, 18, 255))
    
    # Ambient plasma orbs
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Orange neon glow center-right
    for r in range(400, 50, -25):
        alpha = int(45 * (1 - r / 400))
        draw.ellipse([800 - r, 450 - r, 800 + r, 450 + r], fill=(255, 94, 30, alpha))
        
    for r in range(250, 20, -15):
        alpha = int(70 * (1 - r / 250))
        draw.ellipse([800 - r, 450 - r, 800 + r, 450 + r], fill=(255, 140, 0, alpha))

    # Cyan secondary glow left
    for r in range(300, 40, -20):
        alpha = int(35 * (1 - r / 300))
        draw.ellipse([300 - r, 450 - r, 300 + r, 450 + r], fill=(0, 229, 255, alpha))

    img = Image.alpha_composite(img, overlay)
    
    # Tech Grid
    grid_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    step = 40
    for x in range(0, w, step):
        grid_draw.line([(x, 0), (x, h)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, h, step):
        grid_draw.line([(0, y), (w, y)], fill=(255, 255, 255, 8), width=1)
    img = Image.alpha_composite(img, grid_img)

    draw = ImageDraw.Draw(img)
    
    # Draw Gemini 4-Point Star Sparkle in center
    cx, cy = 800, 400
    sparkle_pts = [
        (cx, cy - 140), (cx + 25, cy - 25), (cx + 140, cy),
        (cx + 25, cy + 25), (cx, cy + 140), (cx - 25, cy + 25),
        (cx - 140, cy), (cx - 25, cy - 25)
    ]
    draw.polygon(sparkle_pts, fill=(255, 255, 255, 245))
    
    # Internal accent diamond
    inner_pts = [
        (cx, cy - 60), (cx + 18, cy), (cx, cy + 60), (cx - 18, cy)
    ]
    draw.polygon(inner_pts, fill=(255, 94, 30, 255))

    # Load system fonts
    font_large = ImageFont.load_default()
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 26)
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 20)
    except Exception:
        pass

    # Title & Subtitle
    title_text = "Gemini 4 Neon"
    sub_text = "THE BALANCED WORKHORSE · FRONTIER REASONING"
    badge_text = "blog.google · Google DeepMind Official Announcement"

    # Draw Title
    draw.text((w // 2, 620), title_text, fill=(255, 255, 255, 255), font=font_large, anchor="mm")
    draw.text((w // 2, 690), sub_text, fill=(255, 94, 30, 255), font=font_sub, anchor="mm")
    
    # Top Official Badge pill
    badge_w, badge_h = 600, 44
    bx1 = (w - badge_w) // 2
    by1 = 60
    draw.rounded_rectangle([bx1, by1, bx1 + badge_w, by1 + badge_h], radius=22, fill=(15, 23, 42, 230), outline=(255, 94, 30, 180), width=2)
    draw.text((w // 2, by1 + badge_h // 2), badge_text, fill=(255, 255, 255, 230), font=font_mono, anchor="mm")

    # Corner brackets
    draw.line([(40, 40), (80, 40)], fill=(255, 94, 30, 200), width=3)
    draw.line([(40, 40), (40, 80)], fill=(255, 94, 30, 200), width=3)
    draw.line([(w - 40, 40), (w - 80, 40)], fill=(255, 94, 30, 200), width=3)
    draw.line([(w - 40, 40), (w - 40, 80)], fill=(255, 94, 30, 200), width=3)
    draw.line([(40, h - 40), (80, h - 40)], fill=(255, 94, 30, 200), width=3)
    draw.line([(40, h - 40), (40, h - 80)], fill=(255, 94, 30, 200), width=3)
    draw.line([(w - 40, h - 40), (w - 80, h - 40)], fill=(255, 94, 30, 200), width=3)
    draw.line([(w - 40, h - 40), (w - 40, h - 80)], fill=(255, 94, 30, 200), width=3)

    out_path = os.path.join(OUT_DIR, "neon-hero-plasma.jpg")
    img.convert("RGB").save(out_path, quality=95)
    print(f"[+] Created {out_path}")


# -------------------------------------------------------------
# 2. LINEUP BANNER: neon-official.jpg (1600x900)
# -------------------------------------------------------------
def make_lineup_banner():
    w, h = 1600, 900
    img = Image.new("RGBA", (w, h), (10, 14, 22, 255))
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 46)
        font_card_h = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 26)
        font_card_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 18)
    except Exception:
        font_title = font_card_h = font_card_sub = font_mono = ImageFont.load_default()

    # Header
    draw.text((w // 2, 90), "THE GEMINI 4 FRONTIER LINEUP", fill=(255, 255, 255, 255), font=font_title, anchor="mm")
    draw.text((w // 2, 140), "Google DeepMind Model Architecture Architecture (Nov 2026)", fill=(148, 163, 184, 255), font=font_card_sub, anchor="mm")

    cards = [
        {"name": "Carbon", "tier": "HEAVYWEIGHT", "role": "Deep Multi-Step Reasoning", "col": (59, 130, 246), "active": False},
        {"name": "Neon", "tier": "THE WORKHORSE", "role": "Optimal Speed & Scalable Thinking", "col": (255, 94, 30), "active": True},
        {"name": "Hydrogen", "tier": "HIGH-SPEED", "role": "Real-time Daily Tasks", "col": (16, 185, 129), "active": False},
    ]

    card_w = 460
    card_h = 580
    start_x = (w - (3 * card_w + 2 * 30)) // 2
    y_card = 210

    for i, c in enumerate(cards):
        cx = start_x + i * (card_w + 30)
        border_col = c["col"] + ((255,) if c["active"] else (80,))
        bg_col = (20, 28, 48, 240) if c["active"] else (15, 23, 42, 210)
        
        # Draw card
        draw.rounded_rectangle([cx, y_card, cx + card_w, y_card + card_h], radius=24, fill=bg_col, outline=border_col, width=3 if c["active"] else 1)
        
        # Pill on active
        if c["active"]:
            draw.rounded_rectangle([cx + 30, y_card + 30, cx + 220, y_card + 68], radius=16, fill=(255, 94, 30, 255))
            draw.text((cx + 125, y_card + 49), "NEW RELEASE", fill=(255, 255, 255, 255), font=font_mono, anchor="mm")
        else:
            draw.rounded_rectangle([cx + 30, y_card + 30, cx + 200, y_card + 68], radius=16, fill=(255, 255, 255, 15))
            draw.text((cx + 115, y_card + 49), c["tier"], fill=c["col"], font=font_mono, anchor="mm")

        # Sparkle logo
        scx, scy = cx + card_w // 2, y_card + 220
        spark_pts = [
            (scx, scy - 70), (scx + 15, scy - 15), (scx + 70, scy),
            (scx + 15, scy + 15), (scx, scy + 70), (scx - 15, scy + 15),
            (scx - 70, scy), (scx - 15, scy - 15)
        ]
        draw.polygon(spark_pts, fill=c["col"] + (255,))

        draw.text((cx + card_w // 2, y_card + 360), f"Gemini 4 {c['name']}", fill=(255, 255, 255, 255), font=font_card_h, anchor="mm")
        draw.text((cx + card_w // 2, y_card + 410), c["role"], fill=(148, 163, 184, 255), font=font_card_sub, anchor="mm")
        
        # Bottom spec
        draw.line([(cx + 30, y_card + 470), (cx + card_w - 30, y_card + 470)], fill=(255, 255, 255, 30), width=1)
        if c["name"] == "Neon":
            draw.text((cx + card_w // 2, y_card + 515), "1M Tokens · Scalable Budget", fill=(255, 94, 30, 255), font=font_mono, anchor="mm")
        elif c["name"] == "Carbon":
            draw.text((cx + card_w // 2, y_card + 515), "Heavy Frontier · Ultra Deep", fill=c["col"], font=font_mono, anchor="mm")
        else:
            draw.text((cx + card_w // 2, y_card + 515), "Ultra Low Latency · High Speed", fill=c["col"], font=font_mono, anchor="mm")

    out_path = os.path.join(OUT_DIR, "neon-lineup-banner.jpg")
    img.convert("RGB").save(out_path, quality=95)
    print(f"[+] Created {out_path}")


# -------------------------------------------------------------
# 3. BENCHMARK BANNER: neon-benchmark-board.png (1600x900)
# -------------------------------------------------------------
def make_benchmark_banner():
    w, h = 1600, 900
    img = Image.new("RGBA", (w, h), (10, 14, 22, 255))
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 44)
        font_h = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 18)
        font_num = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 26)
    except Exception:
        font_title = font_h = font_sub = font_mono = font_num = ImageFont.load_default()

    # Header
    draw.text((w // 2, 80), "OFFICIAL EVALUATION LEADERBOARD", fill=(255, 255, 255, 255), font=font_title, anchor="mm")
    draw.text((w // 2, 130), "Artificial Analysis & DeepMind Empirical Research (November 2026)", fill=(148, 163, 184, 255), font=font_sub, anchor="mm")

    # Table board
    bw, bh = 1440, 680
    bx = (w - bw) // 2
    by = 175
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=28, fill=(15, 23, 42, 240), outline=(255, 94, 30, 140), width=2)

    # Columns: Metric | Gemini 4 Neon | Claude 3.5 Sonnet | GPT-4o
    metrics = [
        {"name": "HumanEval (Code / Python)", "neon": "92.4%", "claude": "93.7%", "gpt": "90.2%", "winner": "Claude (Tied)"},
        {"name": "MATH-500 (Complex Reasoning)", "neon": "91.8%", "claude": "89.2%", "gpt": "86.4%", "winner": "Gemini 4 Neon"},
        {"name": "MMLU-Pro (Academic QA)", "neon": "88.6%", "claude": "87.9%", "gpt": "85.2%", "winner": "Gemini 4 Neon"},
        {"name": "Context Window (Tokens)", "neon": "1,000,000", "claude": "200,000", "gpt": "128,000", "winner": "Gemini 4 Neon (5x)"},
        {"name": "Input Price (per 1M Tokens)", "neon": "$0.35", "claude": "$3.00", "gpt": "$2.50", "winner": "Gemini 4 Neon (8x cheaper)"},
    ]

    # Header Row
    draw.rectangle([bx, by, bx + bw, by + 80], fill=(255, 255, 255, 12))
    draw.text((bx + 50, by + 40), "BENCHMARK METRIC", fill=(148, 163, 184, 255), font=font_mono, anchor="lm")
    draw.text((bx + 620, by + 40), "GEMINI 4 NEON", fill=(255, 94, 30, 255), font=font_mono, anchor="mm")
    draw.text((bx + 920, by + 40), "CLAUDE 3.5 SONNET", fill=(245, 158, 11, 255), font=font_mono, anchor="mm")
    draw.text((bx + 1220, by + 40), "GPT-4O", fill=(20, 184, 166, 255), font=font_mono, anchor="mm")

    row_y = by + 80
    row_h = (bh - 80) // len(metrics)

    for i, m in enumerate(metrics):
        ry = row_y + i * row_h
        # Alternating background
        if i % 2 == 1:
            draw.rectangle([bx, ry, bx + bw, ry + row_h], fill=(255, 255, 255, 5))
        
        # Metric Name
        draw.text((bx + 50, ry + row_h // 2), m["name"], fill=(255, 255, 255, 255), font=font_h, anchor="lm")
        
        # Gemini 4 Neon (Highlighted)
        draw.rounded_rectangle([bx + 480, ry + 12, bx + 760, ry + row_h - 12], radius=14, fill=(255, 94, 30, 35), outline=(255, 94, 30, 160), width=1)
        draw.text((bx + 620, ry + row_h // 2), m["neon"], fill=(255, 255, 255, 255), font=font_num, anchor="mm")
        
        # Claude
        draw.text((bx + 920, ry + row_h // 2), m["claude"], fill=(203, 213, 225, 255), font=font_num, anchor="mm")
        
        # GPT-4o
        draw.text((bx + 1220, ry + row_h // 2), m["gpt"], fill=(148, 163, 184, 255), font=font_num, anchor="mm")

        # Bottom divider
        draw.line([(bx + 20, ry + row_h), (bx + bw - 20, ry + row_h)], fill=(255, 255, 255, 15), width=1)

    out_path = os.path.join(OUT_DIR, "neon-benchmark-board.png")
    img.save(out_path)
    print(f"[+] Created {out_path}")

make_hero_banner()
make_lineup_banner()
make_benchmark_banner()
