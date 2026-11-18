import subprocess
import os

ROOT = "/root/remotion-krypton"
QA_DIR = os.path.join(ROOT, "qa")
os.makedirs(QA_DIR, exist_ok=True)

stills = [
    ("s1_hook_sebelas", 65),
    ("s1_error_stamp", 390),
    ("s2_plus_tempel", 580),
    ("s2_receipt_kasir", 1060),
    ("s3_nan_terminal", 1320),
    ("s3_es_teh_warteg", 1540),
    ("s4_operan_belah", 1820),
    ("s4_semen_tiga_roda", 2100),
    ("s5_sort_array", 2320),
    ("s5_banana_mascot", 2500),
    ("s6_typescript_shield", 2800),
    ("s6_rhmt_endcard", 3100),
]

for name, frame in stills:
    out_path = os.path.join(QA_DIR, f"{name}.png")
    print(f"Rendering still {name} at frame {frame}...")
    subprocess.run([
        "npx", "remotion", "still", "src/index.ts", "JSWat",
        out_path, f"--frame={frame}"
    ], cwd=ROOT, check=True)

print("All key stills rendered! Building montage sheet...")
# montage jika imagemagick ada, atau pakai pillow
try:
    from PIL import Image
    # susun 4 baris x 3 kolom thumbnail
    cols = 3
    rows = (len(stills) + cols - 1) // cols
    thumb_w, thumb_h = 270, 480
    sheet = Image.new("RGBA", (cols * thumb_w, rows * thumb_h), (20, 16, 43, 255))
    for idx, (name, _) in enumerate(stills):
        img_p = os.path.join(QA_DIR, f"{name}.png")
        if os.path.exists(img_p):
            im = Image.open(img_p).resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            r_idx = idx // cols
            c_idx = idx % cols
            sheet.paste(im, (c_idx * thumb_w, r_idx * thumb_h))
    sheet_p = os.path.join(QA_DIR, "sheet.png")
    sheet.save(sheet_p, "PNG")
    print(f"Saved montage contact sheet: {sheet_p}")
except Exception as e:
    print(f"Montage error: {e}")
