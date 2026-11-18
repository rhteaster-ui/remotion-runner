#!/usr/bin/env python3
import base64
import json
import os
import re
import subprocess
from scripts.gen_chip_tts import parse_script, call_gemini, detect_speech_segments

ROOT = "/root/remotion-krypton"
SRC_TXT = os.path.join(ROOT, "naskah_chip.txt")
VO_WAV = os.path.join(ROOT, "public/audio/vo/chip-vo-norm.wav")
ALIGN_MP3 = os.path.join(ROOT, "public/audio/vo/chip-vo-align.mp3")
OUT_JSON = os.path.join(ROOT, "src/data/chip-cues.json")
FPS = 30
TAIL_SEC = 1.4


def align_by_sentences(scenes):
    dur = float(
        subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", VO_WAV]
        ).decode().strip()
    )

    # Flatten sentences from naskah_chip.txt
    sentences = []
    for s in scenes:
        # Build tokens per line (each line in naskah_chip.txt is a sentence)
        pass

    # Re-parse per-line so each line is 1 sentence
    tok_re = re.compile(r"(?:@(\w+)=)?(\{[^}]+\}\S*|\S+)")
    grp_re = re.compile(r"\{([^|}]+)\|([^}]+)\}(.*)")
    cur_scene = None
    with open(SRC_TXT, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line or (line.startswith("# ") and not line.startswith("## ")):
                continue
            if line.startswith("## "):
                cur_scene = line[3:].strip()
                continue
            tokens = []
            said_words = []
            for m in tok_re.finditer(line):
                marker, raw = m.group(1), m.group(2)
                g = grp_re.fullmatch(raw)
                if g:
                    shown, said = g.group(1) + g.group(3), g.group(2) + g.group(3)
                else:
                    shown, said = raw, raw
                tokens.append({"marker": marker, "shown": shown, "said": said})
                said_words.append(said)
            sentences.append({
                "scene": cur_scene,
                "text": " ".join(said_words),
                "tokens": tokens,
            })

    with open(ALIGN_MP3, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    sent_list_str = "\n".join([f'{i}: "{s["text"]}"' for i, s in enumerate(sentences)])
    prompt = (
        f"Listen to the attached {dur:.2f}s Indonesian audio. "
        f"Here are the EXACT {len(sentences)} sentences spoken in order. "
        f"Return the exact [start_sec, end_sec] in seconds for EACH sentence index 0..{len(sentences)-1}. "
        f"Be precise to the tenth of a second and ensure sentences do not overlap.\n\n"
        f"{sent_list_str}\n\n"
        f'Return ONLY JSON: {{"sentences": [{{"i": 0, "s": 0.0, "e": 3.9}}, ...]}}'
    )
    payload = {
        "contents": [{"parts": [
            {"inlineData": {"mimeType": "audio/mp3", "data": b64}},
            {"text": prompt},
        ]}],
        "generationConfig": {"responseMimeType": "application/json", "temperature": 0.0},
    }
    res = call_gemini("gemini-2.5-flash", payload, timeout=120)
    sent_times = json.loads(res["candidates"][0]["content"]["parts"][0]["text"])["sentences"]
    assert len(sent_times) == len(sentences), f"Mismatch {len(sent_times)} vs {len(sentences)}"

    speech_segs = detect_speech_segments(VO_WAV, dur)

    words_out = []
    markers = {}
    scene_bounds = {}

    for idx, (sent, st) in enumerate(zip(sentences, sent_times)):
        s_start = max(0.0, float(st["s"]))
        s_end = min(dur, float(st["e"]))
        if idx > 0:
            prev_end = words_out[-1]["e"]
            if s_start < prev_end:
                s_start = prev_end + 0.04
        if s_end <= s_start + 0.1:
            s_end = min(dur, s_start + 0.8)

        # Intersect [s_start, s_end] with active FFmpeg speech segments for sub-sentence accuracy
        active_sub = []
        for a, b in speech_segs:
            ia = max(s_start, a)
            ib = min(s_end, b)
            if ib - ia > 0.05:
                active_sub.append((ia, ib))
        if not active_sub:
            active_sub = [(s_start, s_end)]

        # Distribute tokens across active_sub weighted by clean character length + punctuation pause
        tokens = sent["tokens"]
        weights = [
            max(2, len(re.sub(r"[^a-zA-Z0-9]", "", t["said"])) + (2 if t["shown"].endswith((".", ",", "?", "!", ":")) else 0))
            for t in tokens
        ]
        total_w = sum(weights)
        total_sp = sum(b - a for a, b in active_sub)

        seg_i = 0
        seg_pos = active_sub[0][0]
        for t, wt in zip(tokens, weights):
            rem = (wt / total_w) * total_sp
            w_s = seg_pos
            while rem > 0 and seg_i < len(active_sub):
                sa, sb = active_sub[seg_i]
                avail = sb - seg_pos
                if rem <= avail:
                    seg_pos += rem
                    rem = 0.0
                else:
                    rem -= avail
                    seg_i += 1
                    seg_pos = active_sub[seg_i][0] if seg_i < len(active_sub) else sb
            w_e = max(w_s + 0.07, seg_pos)
            w_obj = {
                "w": t["shown"],
                "s": round(w_s, 3),
                "e": round(w_e, 3),
                "scene": sent["scene"],
            }
            words_out.append(w_obj)
            if t["marker"]:
                markers[t["marker"]] = {"t": round(w_s, 3), "f": int(round(w_s * FPS))}
            if sent["scene"] not in scene_bounds:
                scene_bounds[sent["scene"]] = [w_s, w_e]
            else:
                scene_bounds[sent["scene"]][1] = w_e

    scene_ids = []
    for s in scenes:
        if s["id"] not in scene_ids:
            scene_ids.append(s["id"])

    out_scenes = []
    for k, sid in enumerate(scene_ids):
        a, b = scene_bounds[sid]
        start_s = 0.0 if k == 0 else (scene_bounds[scene_ids[k - 1]][1] + a) / 2.0
        end_s = (b + TAIL_SEC) if k == len(scene_ids) - 1 else (b + scene_bounds[scene_ids[k + 1]][0]) / 2.0
        out_scenes.append({
            "id": sid,
            "startFrame": int(round(start_s * FPS)),
            "endFrame": int(round(end_s * FPS)),
        })

    out_data = {
        "fps": FPS,
        "totalFrames": out_scenes[-1]["endFrame"],
        "totalDuration": round(out_scenes[-1]["endFrame"] / FPS, 3),
        "scenes": out_scenes,
        "markers": markers,
        "words": words_out,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(out_data, f, ensure_ascii=False, indent=2)

    print("OK:", len(words_out), "words,", len(markers), "markers,", out_data["totalFrames"], "frames", f"({out_data['totalDuration']}s)")
    for s in out_scenes:
        print(f"  {s['id']}: {s['startFrame']} -> {s['endFrame']} ({s['startFrame']/FPS:.2f}s -> {s['endFrame']/FPS:.2f}s)")


if __name__ == "__main__":
    scenes = parse_script(SRC_TXT)
    align_by_sentences(scenes)
