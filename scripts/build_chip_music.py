#!/usr/bin/env python3
import os
import subprocess
import numpy as np
from scipy.signal import butter, lfilter

SR = 44100
BPM = 114.0
BEAT = 60.0 / BPM
STEP = BEAT / 4.0  # 16th note
DURATION = 68.0
N = int(SR * DURATION)

t_all = np.arange(N) / SR
mix = np.zeros(N, dtype=np.float64)

# Chord progression: Fmaj7 - G6 - Em7 - Am7 (playful, bright tech commentary)
CHORDS = [
    [174.61, 220.00, 261.63, 329.63],  # Fmaj7
    [196.00, 246.94, 293.66, 329.63],  # G6
    [164.81, 196.00, 246.94, 293.66],  # Em7
    [220.00, 261.63, 329.63, 392.00],  # Am7
]
BASS = [87.31, 98.00, 82.41, 110.00]

# Pluck pattern (16 steps per bar)
PLUCK_STEPS = [0, 3, 6, 8, 10, 12, 14]
BASS_STEPS = [0, 6, 10]
HAT_STEPS = [2, 6, 10, 14]

rng = np.random.default_rng(42)

def add_note(buf, start_s, wave):
    idx = int(start_s * SR)
    if idx >= N:
        return
    end = min(N, idx + len(wave))
    buf[idx:end] += wave[: end - idx]

total_bars = int(DURATION / (4 * BEAT)) + 1
for bar in range(total_bars):
    c_idx = bar % len(CHORDS)
    chord = CHORDS[c_idx]
    bass_f = BASS[c_idx]
    bar_t = bar * 4 * BEAT

    # Crisp marimba/pizzicato arpeggio plucks
    for i, st in enumerate(PLUCK_STEPS):
        freq = chord[(i + bar) % len(chord)] * (2.0 if i % 3 == 1 else 1.0)
        nt = np.arange(int(0.28 * SR)) / SR
        env = np.exp(-nt * 16.0) * (1 - np.exp(-nt * 300.0))
        sig = (np.sin(2 * np.pi * freq * nt) + 0.35 * np.sin(4 * np.pi * freq * nt)) * env * 0.14
        add_note(mix, bar_t + st * STEP, sig)

    # Warm tight bass pulse
    for st in BASS_STEPS:
        nt = np.arange(int(0.24 * SR)) / SR
        env = np.exp(-nt * 12.0) * (1 - np.exp(-nt * 200.0))
        sig = (np.sin(2 * np.pi * bass_f * nt) + 0.25 * np.sin(4 * np.pi * bass_f * nt)) * env * 0.22
        add_note(mix, bar_t + st * STEP, sig)

    # Light closed hi-hat & kick tick
    for st in [0, 8]:
        nt = np.arange(int(0.09 * SR)) / SR
        f_sweep = 115.0 * np.exp(-nt * 38.0) + 45.0
        phase = 2 * np.pi * np.cumsum(f_sweep) / SR
        sig = np.sin(phase) * np.exp(-nt * 28.0) * 0.22
        add_note(mix, bar_t + st * STEP, sig)

    for st in HAT_STEPS:
        nt = np.arange(int(0.045 * SR)) / SR
        noise = rng.normal(0, 1, len(nt))
        b, a = butter(2, 6500 / (SR / 2), btype="high")
        hat = lfilter(b, a, noise) * np.exp(-nt * 65.0) * 0.055
        add_note(mix, bar_t + st * STEP, hat)

# Soft limiter & fade in/out
mix = np.tanh(mix * 1.15) * 0.82
out_wav = "/root/remotion-krypton/public/audio/chip-music-bed.wav"
out_mp3 = "/root/remotion-krypton/public/audio/chip-music-bed.mp3"

import wave
pcm = np.int16(np.clip(mix, -1.0, 1.0) * 32767)
with wave.open(out_wav, "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(pcm.tobytes())

subprocess.run(
    ["ffmpeg", "-y", "-i", out_wav, "-af", "loudnorm=I=-18:TP=-2:LRA=7", "-c:a", "libmp3lame", "-b:a", "192k", out_mp3],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
os.remove(out_wav)
print("Generated custom music bed:", out_mp3)
