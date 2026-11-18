import os
import subprocess
import wave
import numpy as np
from scipy import signal

SR = 44100
OUT_MUSIC = "/root/remotion-krypton/public/audio/wat-music-bed.mp3"
rng = np.random.default_rng(2026)

BPM = 108.0
BEAT = 60.0 / BPM
BAR = BEAT * 4.0
TOTAL_BARS = 54  # ~120 detik
TOTAL_TIME = TOTAL_BARS * BAR
N_SAMP = int(SR * TOTAL_TIME)

bed = np.zeros(N_SAMP, dtype=np.float64)

def t(d: float) -> np.ndarray:
    return np.linspace(0, d, int(SR * d), endpoint=False)

def env(n: int, a: float = 0.005, r: float = 0.2, curve: float = 2.0) -> np.ndarray:
    e = np.ones(n)
    na = max(1, min(n, int(a * SR)))
    e[:na] = np.linspace(0, 1, na)
    nr = max(1, min(n, int(r * SR)))
    e[-nr:] *= np.linspace(1, 0, nr) ** curve
    return e

def hp(x: np.ndarray, f: float, order: int = 2) -> np.ndarray:
    return signal.sosfilt(signal.butter(order, max(20.0, f), "high", fs=SR, output="sos"), x)

def marimba_hit(freq: float, dur: float = 0.32) -> np.ndarray:
    tm = t(dur)
    return (
        np.sin(2 * np.pi * freq * tm) * np.exp(-tm * 10.0)
        + 0.25 * np.sin(2 * np.pi * freq * 3.0 * tm) * np.exp(-tm * 24.0)
    ) * env(len(tm), 0.002, 0.06, 1.5)

def pizz_bass(freq: float, dur: float = 0.36) -> np.ndarray:
    tp = t(dur)
    return (
        np.sin(2 * np.pi * freq * tp) * np.exp(-tp * 7.0)
        + 0.40 * np.sin(2 * np.pi * freq * 2.0 * tp) * np.exp(-tp * 14.0)
    ) * env(len(tp), 0.003, 0.08, 1.5)

# Akor komedi tech: F - G - Em - Am
CHORDS = [
    (87.31,  [174.61, 220.00, 261.63, 349.23]),  # F
    (98.00,  [196.00, 246.94, 293.66, 392.00]),  # G
    (82.41,  [164.81, 196.00, 246.94, 329.63]),  # Em
    (110.00, [220.00, 261.63, 329.63, 440.00]),  # Am
]

pattern_8ths = [0, 1, 2, 3, 2, 1, 3, 2]

for bar_i in range(TOTAL_BARS):
    bass_f, notes = CHORDS[bar_i % 4]
    bar_t = bar_i * BAR
    # Bass beat 1, beat 3
    for b_off, b_mult in [(0.0, 1.0), (2.0 * BEAT, 1.0 if bar_i % 2 == 0 else 1.5)]:
        p = pizz_bass(bass_f * b_mult) * 0.30
        i0 = int((bar_t + b_off) * SR)
        if i0 + len(p) < N_SAMP:
            bed[i0 : i0 + len(p)] += p
    # Marimba
    for step_i, note_idx in enumerate(pattern_8ths):
        step_t = bar_t + step_i * (BEAT * 0.5)
        f = notes[note_idx]
        vel = 0.14 if step_i % 2 == 0 else 0.09
        m = marimba_hit(f) * vel
        i0 = int(step_t * SR)
        if i0 + len(m) < N_SAMP:
            bed[i0 : i0 + len(m)] += m
    # Shaker
    for beat_i in range(4):
        sh_t = bar_t + (beat_i + 0.5) * BEAT
        sh = hp(rng.standard_normal(int(SR * 0.04)), 5500) * np.exp(-t(0.04) * 70) * 0.04
        i0 = int(sh_t * SR)
        if i0 + len(sh) < N_SAMP:
            bed[i0 : i0 + len(sh)] += sh

bed = bed / (np.max(np.abs(bed)) + 1e-9) * 0.70
tmp_bed_wav = OUT_MUSIC + ".wav"
with wave.open(tmp_bed_wav, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((bed * 32767).astype(np.int16).tobytes())

subprocess.run(
    ["ffmpeg", "-y", "-i", tmp_bed_wav, "-c:a", "libmp3lame", "-b:a", "192k", OUT_MUSIC],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)
os.remove(tmp_bed_wav)
print("wat-music-bed.mp3 created successfully! Duration:", TOTAL_TIME, "s")
