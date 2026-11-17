"""Sintesis SFX Kustom Non-Generic & Music Bed Komedi-Sains Platypus (tanpa aset eksternal).
Jalankan: python3 pipeline/build_sfx_platypus.py
"""
import os
import subprocess
import wave
import numpy as np
from scipy import signal

SR = 44100
OUT_SFX = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "sfx-platypus")
OUT_MUSIC = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "platypus-music-bed.mp3")
os.makedirs(OUT_SFX, exist_ok=True)
rng = np.random.default_rng(42)


def t(d: float) -> np.ndarray:
    return np.linspace(0, d, int(SR * d), endpoint=False)


def env(n: int, a: float = 0.005, r: float = 0.2, curve: float = 2.5) -> np.ndarray:
    e = np.ones(n)
    na = max(1, min(n, int(a * SR)))
    e[:na] = np.linspace(0, 1, na)
    nr = max(1, min(n, int(r * SR)))
    e[-nr:] *= np.linspace(1, 0, nr) ** curve
    return e


def noise(d: float) -> np.ndarray:
    return rng.standard_normal(int(SR * d))


def bp(x: np.ndarray, lo: float, hi: float, order: int = 2) -> np.ndarray:
    lo = max(20.0, lo)
    hi = min(SR / 2 - 100.0, hi)
    return signal.sosfilt(signal.butter(order, [lo, hi], "bandpass", fs=SR, output="sos"), x)


def lp(x: np.ndarray, f: float, order: int = 2) -> np.ndarray:
    return signal.sosfilt(signal.butter(order, min(SR / 2 - 100.0, f), "low", fs=SR, output="sos"), x)


def hp(x: np.ndarray, f: float, order: int = 2) -> np.ndarray:
    return signal.sosfilt(signal.butter(order, max(20.0, f), "high", fs=SR, output="sos"), x)


def sweep(f0: float, f1: float, d: float, exp: bool = True) -> np.ndarray:
    tt = t(d)
    f = f0 * (f1 / f0) ** (tt / d) if exp else np.linspace(f0, f1, len(tt))
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


def reverb(x: np.ndarray, wet: float = 0.22, tail: float = 0.35) -> np.ndarray:
    n = int(SR * tail)
    ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 8, n))
    y = np.pad(signal.fftconvolve(x, ir), (0, 1))[: len(x) + n]
    x_pad = np.pad(x, (0, n))
    scale = np.max(np.abs(x)) / (np.max(np.abs(y)) + 1e-9)
    return x_pad + wet * y * scale


def save_wav(name: str, x: np.ndarray, peak: float = 0.85) -> None:
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    with wave.open(os.path.join(OUT_SFX, f"{name}.wav"), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


# 1. water-splash: river plunge + bubbling droplets
d = 0.95
tt = t(d)
splash_nz = bp(noise(d), 350, 4600, 2) * np.exp(-tt * 5.2) * 0.75
sub_plunge = sweep(190, 65, 0.25) * np.exp(-t(0.25) * 12) * 0.8
y = splash_nz.copy()
y[: len(sub_plunge)] += sub_plunge
for s_off, f0, f1 in [(0.08, 420, 980), (0.14, 580, 1220), (0.21, 390, 890), (0.29, 640, 1400), (0.37, 500, 1100), (0.46, 720, 1550)]:
    bd = 0.085
    b = sweep(f0, f1, bd) * env(int(SR * bd), 0.004, 0.06, 2) * 0.45
    i0 = int(s_off * SR)
    y[i0 : i0 + len(b)] += b[: len(y) - i0]
save_wav("water-splash", reverb(y, 0.2, 0.3), 0.88)

# 2. duck-quack: double formant-filtered comedic duck quack
def single_quack(dur=0.17, f_start=320, f_end=205):
    ttq = t(dur)
    f = np.linspace(f_start, f_end, len(ttq)) + np.sin(2 * np.pi * 24 * ttq) * 14
    saw = signal.sawtooth(2 * np.pi * np.cumsum(f) / SR)
    # Two vocal tract formants give authentic nasal "quack" character
    q1 = bp(saw, 750, 1250, 2) * 0.8
    q2 = bp(saw, 1500, 2400, 2) * 0.55
    return (q1 + q2) * env(len(ttq), 0.012, 0.07, 2.0)

y_quack = np.zeros(int(SR * 0.48))
q_a = single_quack(0.16, 330, 210)
q_b = single_quack(0.19, 310, 190)
y_quack[: len(q_a)] += q_a
i1 = int(0.22 * SR)
y_quack[i1 : i1 + len(q_b)] += q_b[: len(y_quack) - i1]
save_wav("duck-quack", reverb(y_quack, 0.14, 0.22), 0.86)

# 3. rubber-stretch: comic elastic stretch + snap-back boing
d_str = 0.65
tts = t(d_str)
stretch = sweep(220, 560, 0.36) * env(int(SR * 0.36), 0.02, 0.05, 1.5) * 0.6
boing_d = 0.32
ttb = t(boing_d)
boing_f = 240 + 180 * np.sin(2 * np.pi * 16 * ttb) * np.exp(-ttb * 6)
boing = np.sin(2 * np.pi * np.cumsum(boing_f) / SR) * np.exp(-ttb * 7) * 0.9
y_str = np.zeros(int(SR * 0.72))
y_str[: len(stretch)] += stretch
ib = int(0.35 * SR)
y_str[ib : ib + len(boing)] += boing[: len(y_str) - ib]
save_wav("rubber-stretch", y_str, 0.85)

# 4. egg-crack-pop: crisp shell crack impulses + hollow pop
y_egg = np.zeros(int(SR * 0.55))
for c_t, amp in [(0.0, 0.6), (0.045, 0.85), (0.085, 1.0)]:
    cr = hp(noise(0.03), 2400) * np.exp(-t(0.03) * 140) * amp
    ic = int(c_t * SR)
    y_egg[ic : ic + len(cr)] += cr[: len(y_egg) - ic]
pop_e = sweep(360, 760, 0.09) * np.exp(-t(0.09) * 28) * 0.9
ip = int(0.14 * SR)
y_egg[ip : ip + len(pop_e)] += pop_e[: len(y_egg) - ip]
save_wav("egg-crack-pop", reverb(y_egg, 0.16, 0.22), 0.88)

# 5. sweat-drops: trio of glistening liquid droplet plops
y_drop = np.zeros(int(SR * 0.65))
for s_off, f0, f1 in [(0.0, 520, 1280), (0.16, 660, 1520), (0.32, 820, 1820)]:
    bd = 0.13
    b = sweep(f0, f1, bd) * np.exp(-t(bd) * 18) * env(int(SR * bd), 0.003, 0.05, 1.5)
    i0 = int(s_off * SR)
    y_drop[i0 : i0 + len(b)] += b[: len(y_drop) - i0]
save_wav("sweat-drops", reverb(y_drop, 0.24, 0.3), 0.82)

# 6. tube-zip-bloop: slide-whistle zip straight down + intestinal bloop
y_zip = np.zeros(int(SR * 0.65))
zw = sweep(1450, 210, 0.34, exp=True) * env(int(SR * 0.34), 0.01, 0.05, 1.5) * 0.75
y_zip[: len(zw)] += zw
bloop = sweep(190, 440, 0.14) * np.exp(-t(0.14) * 16) * 0.95
ib = int(0.35 * SR)
y_zip[ib : ib + len(bloop)] += bloop[: len(y_zip) - ib]
save_wav("tube-zip-bloop", reverb(y_zip, 0.18, 0.25), 0.85)

# 7. gerd-honk: deadpan comic wrong double-honk
def honk_note(dur=0.14):
    th = t(dur)
    s1 = signal.sawtooth(2 * np.pi * 138 * th)
    s2 = signal.sawtooth(2 * np.pi * 145 * th)
    return lp((s1 + s2) * 0.5, 1400) * env(len(th), 0.008, 0.05, 1.5)

y_honk = np.zeros(int(SR * 0.52))
h1 = honk_note(0.13)
h2 = honk_note(0.24)
y_honk[: len(h1)] += h1
ih = int(0.17 * SR)
y_honk[ih : ih + len(h2)] += h2[: len(y_honk) - ih]
save_wav("gerd-honk", y_honk, 0.80)

# 8. venom-sting: thriller anime dissonant sting + venomous rattle hiss
d_ven = 0.85
ttv = t(d_ven)
chord = (
    np.sin(2 * np.pi * 587.33 * ttv) * 0.5
    + np.sin(2 * np.pi * 622.25 * ttv) * 0.5  # minor second dissonance!
    + np.sin(2 * np.pi * 880.0 * ttv) * 0.4
    + signal.sawtooth(2 * np.pi * 110.0 * ttv) * 0.35
) * np.exp(-ttv * 4.2)
rattle = bp(noise(d_ven), 3600, 7500, 2) * (0.5 + 0.5 * np.sin(2 * np.pi * 28 * ttv)) * np.exp(-ttv * 3.5) * 0.45
save_wav("venom-sting", reverb(chord + rattle, 0.28, 0.45), 0.88)

# 9. elaina-wand-chime: crystalline witch sparkle arpeggio
def celesta(f, dur=0.75):
    tc = t(dur)
    return (
        np.sin(2 * np.pi * f * tc) * np.exp(-tc * 4.5)
        + 0.38 * np.sin(2 * np.pi * f * 2.0 * tc) * np.exp(-tc * 7.0)
        + 0.16 * np.sin(2 * np.pi * f * 3.0 * tc) * np.exp(-tc * 11.0)
    )

y_wand = np.zeros(int(SR * 1.1))
for k, f in enumerate([587.33, 739.99, 880.0, 1108.73, 1318.51]):
    c_note = celesta(f, 0.65) * 0.55
    i0 = int(k * 0.065 * SR)
    y_wand[i0 : i0 + len(c_note)] += c_note[: len(y_wand) - i0]
save_wav("elaina-wand-chime", reverb(y_wand, 0.32, 0.48), 0.78)

# 10. elaina-gasp-pop: cute anime startled chime + bounce
y_gasp = celesta(1174.66, 0.35) * 0.5
sw_g = sweep(480, 980, 0.12) * np.exp(-t(0.12) * 14) * 0.6
y_gasp[: len(sw_g)] += sw_g
save_wav("elaina-gasp-pop", reverb(y_gasp, 0.22, 0.28), 0.78)

# 11. seblak-rimshot: classic ba-dum-tss comedy rimshot + sizzle
y_rim = np.zeros(int(SR * 0.95))
# Ba (kick)
k1 = sweep(150, 55, 0.11) * np.exp(-t(0.11) * 18) * 0.8
# Dum (snare)
s1 = (sweep(240, 130, 0.08) * 0.6 + bp(noise(0.08), 1000, 4800) * 0.7) * np.exp(-t(0.08) * 24)
# Tss (crash/sizzle)
c1 = hp(noise(0.55), 3200) * np.exp(-t(0.55) * 5.2) * 0.7
y_rim[: len(k1)] += k1
y_rim[int(0.14 * SR) : int(0.14 * SR) + len(s1)] += s1
y_rim[int(0.28 * SR) : int(0.28 * SR) + len(c1)] += c1
save_wav("seblak-rimshot", reverb(y_rim, 0.18, 0.3), 0.88)

# 12. water-whoosh-wipe: fluid organic air-water scene transition
d_w = 0.72
nw = noise(d_w)
yw = bp(nw, 240, 2600, 2) * 0.75 + hp(nw, 2800) * 0.22
ew = np.sin(np.pi * np.linspace(0, 1, len(yw))) ** 1.7
bub = sweep(340, 780, d_w) * ew * 0.15
save_wav("water-whoosh-wipe", reverb((yw * ew) + bub, 0.22, 0.3), 0.82)

# 13. absurd-thud: punchy comedic sub-impact + woody knock
d_th = 0.65
tth = t(d_th)
sub = np.sin(2 * np.pi * (55 + 95 * np.exp(-tth * 18)) * tth) * np.exp(-tth * 5.5)
wood = bp(noise(0.06), 300, 1100, 2) * np.exp(-t(0.06) * 40) * 0.7
y_th = sub.copy()
y_th[: len(wood)] += wood
save_wav("absurd-thud", reverb(y_th, 0.2, 0.35), 0.90)

# 14. Custom Playful Comedic Marimba & Pizzicato Music Bed (~88s MP3)
print("Synthesizing custom playful comedic music bed...")
BPM = 114
BEAT = 60.0 / BPM
BAR = BEAT * 4
TOTAL_BARS = 62  # ~130.5 seconds
TOTAL_S = TOTAL_BARS * BAR
N_SAMP = int(SR * TOTAL_S)
bed = np.zeros(N_SAMP, dtype=np.float64)

# Playful C-major / A-minor sneaky-curious marimba & pizzicato chord loop (4 bars)
# Progression: Cmaj -> Amin -> Fmaj -> G7
CHORDS = [
    (130.81, [261.63, 329.63, 392.00, 523.25]),  # C
    (110.00, [220.00, 261.63, 329.63, 440.00]),  # Am
    (87.31,  [174.61, 220.00, 261.63, 349.23]),  # F
    (98.00,  [196.00, 246.94, 293.66, 392.00]),  # G
]

def marimba_hit(freq: float, dur: float = 0.36) -> np.ndarray:
    tm = t(dur)
    return (
        np.sin(2 * np.pi * freq * tm) * np.exp(-tm * 9.5)
        + 0.22 * np.sin(2 * np.pi * freq * 4.0 * tm) * np.exp(-tm * 26.0)
    ) * env(len(tm), 0.002, 0.08, 1.5)

def pizz_bass(freq: float, dur: float = 0.38) -> np.ndarray:
    tp = t(dur)
    return (
        np.sin(2 * np.pi * freq * tp) * np.exp(-tp * 7.5)
        + 0.35 * np.sin(2 * np.pi * freq * 2.0 * tp) * np.exp(-tp * 13.0)
    ) * env(len(tp), 0.004, 0.08, 1.5)

pattern_8ths = [0, 2, 1, 3, 2, 1, 3, 2]
for bar_i in range(TOTAL_BARS):
    bass_f, notes = CHORDS[bar_i % 4]
    bar_t = bar_i * BAR
    # Bass on beat 1 & beat 3 (and cheeky pickup on 4.5 every 2nd bar)
    for b_off, b_mult in [(0.0, 1.0), (2.0 * BEAT, 1.5 if bar_i % 2 == 0 else 1.0)]:
        p = pizz_bass(bass_f * (1.0 if b_mult == 1.0 else b_mult)) * 0.28
        i0 = int((bar_t + b_off) * SR)
        if i0 + len(p) < N_SAMP:
            bed[i0 : i0 + len(p)] += p
    # Bouncy 8th-note marimba ostinato
    for step_i, note_idx in enumerate(pattern_8ths):
        step_t = bar_t + step_i * (BEAT * 0.5)
        f = notes[note_idx] * (1.0 if step_i % 4 != 3 else 1.5 if bar_i % 4 == 3 else 1.0)
        vel = 0.16 if step_i % 2 == 0 else 0.10
        m = marimba_hit(f) * vel
        i0 = int(step_t * SR)
        if i0 + len(m) < N_SAMP:
            bed[i0 : i0 + len(m)] += m
    # Light soft shaker on offbeats
    for beat_i in range(4):
        sh_t = bar_t + (beat_i + 0.5) * BEAT
        sh = hp(noise(0.045), 5500) * np.exp(-t(0.045) * 65) * 0.045
        i0 = int(sh_t * SR)
        if i0 + len(sh) < N_SAMP:
            bed[i0 : i0 + len(sh)] += sh

bed = reverb(bed, 0.14, 0.22)[:N_SAMP]
bed = bed / (np.max(np.abs(bed)) + 1e-9) * 0.72
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

print("SFX OK:", sorted(os.listdir(OUT_SFX)))
print("Music Bed OK:", OUT_MUSIC)
