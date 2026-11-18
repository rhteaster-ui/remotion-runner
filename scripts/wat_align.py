import re, json, os, sys
import stable_whisper

ROOT = "/root/remotion-krypton"
FPS = 30
SRC = os.path.join(ROOT, "naskah_wat.txt")
WAV = os.path.join(ROOT, "public/audio/vo/wat-vo-norm.wav")
OUT = os.path.join(ROOT, "src/data/wat-cues.json")
TAIL = 1.4  # detik hold di akhir (end card)

os.makedirs(os.path.dirname(OUT), exist_ok=True)

TOK = re.compile(r'(?:@(\w+)=)?(\{[^}]+\}\S*|\S+)')
GRP = re.compile(r'\{([^|}]+)\|([^}]+)\}(.*)')

scenes, cur = [], None
for line in open(SRC, encoding="utf-8"):
    line = line.rstrip("\n")
    if line.startswith("## "):
        cur = {"id": line[3:].strip(), "tokens": []}
        scenes.append(cur)
        continue
    if cur is None or not line.strip() or line.startswith("#"):
        continue
    for m in TOK.finditer(line):
        marker, raw = m.group(1), m.group(2)
        g = GRP.fullmatch(raw)
        shown, said = (g.group(1) + g.group(3), g.group(2) + g.group(3)) if g else (raw, raw)
        cur["tokens"].append({"marker": marker, "shown": shown, "said": said.split()})

said_words = [w for s in scenes for t in s["tokens"] for w in t["said"]]
print(f"Total said_words from naskah: {len(said_words)}")

model_name = sys.argv[1] if len(sys.argv) > 1 else "small"
print(f"Loading stable_whisper model: {model_name}...")
model = stable_whisper.load_model(model_name)
print(f"Aligning {WAV}...")
res = model.align(WAV, " ".join(said_words), language="id")
aw = [w for seg in res.segments for w in seg.words]
print(f"Aligned words count: {len(aw)} vs naskah: {len(said_words)}")

if len(aw) != len(said_words):
    print("WARNING: Mismatch in word counts!")
    for idx in range(min(len(aw), len(said_words))):
        if aw[idx].word.strip().lower() != said_words[idx].strip().lower():
            print(f"  [{idx}] aligned: {repr(aw[idx].word)} vs naskah: {repr(said_words[idx])}")
            if idx > 15:
                break
    # jika selisih sedikit, sesuaikan atau cek
    assert len(aw) == len(said_words), f"alignment {len(aw)} kata != naskah {len(said_words)} kata."

i, words, markers, bounds = 0, [], {}, []
for s in scenes:
    first = i
    for t in s["tokens"]:
        a, b = float(aw[i].start), float(aw[i + len(t["said"]) - 1].end)
        # pastikan durasi minimal 0.08 detik agar highlight kata terbaca
        if b - a < 0.08:
            b = a + 0.08
        words.append({"w": t["shown"], "s": round(a, 3), "e": round(b, 3), "scene": s["id"]})
        if t["marker"]:
            assert t["marker"] not in markers, f"marker dobel: {t['marker']}"
            markers[t["marker"]] = {"t": round(a, 3), "f": round(a * FPS)}
        i += len(t["said"])
    bounds.append((s["id"], float(aw[first].start), float(aw[i - 1].end)))

out_scenes = []
for k, (sid, a, b) in enumerate(bounds):
    start = 0.0 if k == 0 else (bounds[k - 1][2] + a) / 2
    end = (b + TAIL) if k == len(bounds) - 1 else (b + bounds[k + 1][1]) / 2
    out_scenes.append({"id": sid, "startFrame": round(start * FPS), "endFrame": round(end * FPS)})

for w in words:
    assert w["e"] - w["s"] >= 0.04, f"kata terlalu pendek, alignment curiga: {w}"

json.dump({"fps": FPS, "totalFrames": out_scenes[-1]["endFrame"], "scenes": out_scenes,
           "markers": markers, "words": words},
          open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("SUCCESS: OK", len(words), "kata,", len(markers), "marker,", out_scenes[-1]["endFrame"], "frame")
