"""Sintesis SFX E-Rekap (tanpa aset eksternal). Jalankan: python3 pipeline/build_sfx_erekap.py"""
import numpy as np, wave, os
from scipy import signal

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'sfx-erekap')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t(d): return np.linspace(0, d, int(SR * d), endpoint=False)
def env(n, a=0.005, r=0.2, curve=3.0):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    nr = max(1, min(n, int(r * SR))); e[-nr:] *= np.linspace(1, 0, nr) ** curve
    return e
def noise(d): return rng.standard_normal(int(SR * d))
def bp(x, lo, hi, order=2):
    return signal.sosfilt(signal.butter(order, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, order=2):
    return signal.sosfilt(signal.butter(order, f, 'high', fs=SR, output='sos'), x)
def sweep(f0, f1, d, exp=True):
    tt = t(d)
    f = f0 * (f1 / f0) ** (tt / d) if exp else np.linspace(f0, f1, len(tt))
    return np.sin(2 * np.pi * np.cumsum(f) / SR)
def reverb(x, wet=0.25, tail=0.35):
    n = int(SR * tail); ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 7, n))
    y = np.pad(signal.fftconvolve(x, ir), (0, 1))[: len(x) + n]
    x = np.pad(x, (0, n)); return x + wet * y / (np.max(np.abs(y)) + 1e-9) * np.max(np.abs(x))
def save(name, x, peak=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

# whoosh halus (naik) & whoosh transisi (berat, turun-naik)
d = 0.7; n = noise(d); sw = np.linspace(300, 5200, len(n)); y = np.zeros_like(n)
for i in range(0, len(n), 512):
    f = sw[i]; seg = n[i:i+512]; y[i:i+512] = bp(seg, max(80, f*0.6), min(SR/2-100, f*1.4), 1) if len(seg) > 20 else seg
save('whoosh-soft', y * env(len(y), 0.25, 0.3, 2) , 0.7)
d = 0.8; n = noise(d); y = lp(n, 1800) * 0.8 + hp(n, 3000) * 0.35
e = np.sin(np.pi * np.linspace(0, 1, len(y))) ** 1.6
save('whoosh-wipe', reverb(y * e, 0.18, 0.3), 0.85)

# pop, pop-lembut, tick, key
x = sweep(900, 260, 0.11) * env(int(SR*0.11), 0.002, 0.1, 2); save('pop', x, 0.75)
x = sweep(520, 320, 0.14) * env(int(SR*0.14), 0.004, 0.13, 2); save('pop-soft', x, 0.55)
x = hp(noise(0.03), 2500) * env(int(SR*0.03), 0.0005, 0.028, 2) + 0.5 * np.sin(2*np.pi*1800*t(0.03)) * env(int(SR*0.03), 0.0005, 0.03, 2); save('tick', x, 0.6)
x = bp(noise(0.06), 1200, 5200) * env(int(SR*0.06), 0.0005, 0.055, 3) + 0.7 * np.sin(2*np.pi*140*t(0.06)) * env(int(SR*0.06), 0.001, 0.06, 2); save('key', x, 0.55)

# ding sukses (bel) & download arpeggio
def bell(f, d=1.0):
    tt = t(d); return sum(a * np.sin(2*np.pi*f*m*tt) * np.exp(-tt*dec) for m, a, dec in [(1,1,3.2),(2.01,0.45,4.5),(3.02,0.25,6),(4.2,0.12,8)])
save('ding', reverb(bell(1318.5, 1.1) * env(int(SR*1.1), 0.002, 0.5, 1.5), 0.3, 0.5), 0.8)
x = np.zeros(int(SR*0.9))
for k, (f, s) in enumerate([(784, 0), (988, 0.1), (1318, 0.2)]):
    b = bell(f, 0.6) * 0.8; i0 = int(s * SR); x[i0:i0+len(b)] += b[: len(x)-i0]
save('success-arp', reverb(x, 0.25, 0.4), 0.8)

# impact (sub thump + noise burst + tail)
d = 1.3; tt = t(d); sub = np.sin(2*np.pi*(48 + 90*np.exp(-tt*14))*tt) * np.exp(-tt*3.6)
nz = lp(noise(d), 900) * np.exp(-tt*9) * 0.5; crack = hp(noise(d), 2500) * np.exp(-tt*35) * 0.35
save('impact', reverb(sub + nz + crack, 0.35, 0.7), 0.95)

# riser (noise + sweep naik)
d = 1.3; n = noise(d); y = bp(n, 400, 7000, 1) * np.linspace(0.05, 1, len(n)) ** 2.2 * 0.6
y = y + sweep(180, 1400, d) * np.linspace(0, 1, len(n)) ** 2 * 0.35
save('riser', y * env(len(y), 0.05, 0.08, 1), 0.8)

# shimmer / sparkle
y = np.zeros(int(SR*1.2))
for _ in range(16):
    f = rng.choice([2093, 2637, 3136, 3951, 4699]); s = rng.uniform(0, 0.7); tt = t(0.35)
    b = np.sin(2*np.pi*f*tt) * np.exp(-tt*14) * rng.uniform(0.3, 1); i0 = int(s*SR); y[i0:i0+len(b)] += b[: len(y)-i0]
save('shimmer', reverb(y, 0.3, 0.5), 0.6)

# buzz error (selisih data)
tt = t(0.45); y = (signal.sawtooth(2*np.pi*95*tt) + signal.sawtooth(2*np.pi*101*tt)) * 0.5
y = lp(y, 1500) * env(len(tt), 0.004, 0.18, 1.5) * (1 + 0.4*np.sign(np.sin(2*np.pi*22*tt)))
save('buzz-error', y, 0.65)

# kertas dicetak (printer: burst berulang)
d = 1.5; tt = t(d); y = np.zeros(len(tt))
for k in range(int(d * 22)):
    i0 = int(k / 22 * SR); b = bp(noise(0.04), 600, 4200, 1) * env(int(SR*0.04), 0.001, 0.035, 2); y[i0:i0+len(b)] += b[: len(y)-i0] * (0.6 + 0.4*rng.random())
y += lp(noise(d), 300) * 0.25
save('print', y * env(len(y), 0.05, 0.25, 1), 0.7)

# stempel & lock/unlock click
tt = t(0.5); y = np.sin(2*np.pi*(70+60*np.exp(-tt*30))*tt) * np.exp(-tt*10) + hp(noise(0.5), 1800) * np.exp(-tt*60) * 0.5
save('stamp', y, 0.9)
y = np.zeros(int(SR*0.35))
for s, f in [(0, 3200), (0.11, 2200)]:
    b = (hp(noise(0.04), f) * env(int(SR*0.04), 0.0005, 0.04, 3) + 0.4*np.sin(2*np.pi*f/3*t(0.04)) * env(int(SR*0.04), 0.0005, 0.04, 3)); i0 = int(s*SR); y[i0:i0+len(b)] += b
save('lock-click', y, 0.7)

# swell penutup (chord pad + sparkle)
d = 2.6; tt = t(d); y = sum(np.sin(2*np.pi*f*tt) for f in [261.6, 329.6, 392, 523.3]) * 0.25
y = y * np.sin(np.pi * np.clip(tt/d, 0, 1)) ** 1.5
save('swell', reverb(y, 0.35, 0.8), 0.7)
print('OK', sorted(os.listdir(OUT)))
