#!/usr/bin/env python3
"""Sintesis SFX + musik latar untuk video TermiusPro (tanpa aset eksternal).
Jalankan: python3 scripts/build_sfx_termius.py  -> public/audio/sfx/*.mp3
"""
import os, subprocess, wave
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'sfx')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t_(d): return np.arange(int(SR * d)) / SR
def env(n, a=0.002, r=0.05):
    e = np.ones(n); na, nr = max(1, int(SR * a)), max(1, int(SR * r))
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr); return e
def decay(t, k): return np.exp(-t * k)
def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype='band', fs=SR, output='sos'), x)
def lp(x, f, order=2): return sosfilt(butter(order, f, btype='low', fs=SR, output='sos'), x)
def hp(x, f, order=2): return sosfilt(butter(order, f, btype='high', fs=SR, output='sos'), x)
def norm(x, peak=0.9): return x / (np.max(np.abs(x)) + 1e-9) * peak
def stereo(x): return np.stack([x, x], axis=1)

def save(name, x, mp3=True, peak=0.9):
    x = norm(x, peak) if peak else x
    st = x if x.ndim == 2 else stereo(x)
    wav = os.path.join(OUT, name + '.wav')
    with wave.open(wav, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(st, -1, 1) * 32767).astype('<i2').tobytes())
    if mp3:
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-b:a', '192k', os.path.join(OUT, name + '.mp3')], check=True)
        os.remove(wav)

def key(pitch=1.0):
    t = t_(0.07); n = rng.standard_normal(len(t))
    click = bp(n, 2500 * pitch, 7000) * decay(t, 90)
    thump = np.sin(2 * np.pi * 220 * pitch * t) * decay(t, 70) * 0.5
    return (click + thump) * env(len(t), 0.0005, 0.02)
for i, p in enumerate([0.9, 1.0, 1.1, 1.2]): save(f'key{i+1}', key(p), peak=0.6)

t = t_(0.14); save('enter', (np.sin(2*np.pi*150*t)*decay(t, 30) + bp(rng.standard_normal(len(t)), 1500, 5000)*decay(t, 60)*0.6) * env(len(t), 0.0005, 0.03), peak=0.8)

t = t_(0.18)
tick = lambda f, d: np.sin(2*np.pi*f*t)*decay(t, 55)*(t >= d)
save('click', (tick(2400, 0) + 0.7*np.concatenate([np.zeros(int(SR*0.045)), (np.sin(2*np.pi*1500*t)*decay(t, 70))[:len(t)-int(SR*0.045)]])) * env(len(t), 0.0005, 0.04), peak=0.7)

t = t_(0.7); sweep = np.cumsum(np.linspace(250, 5000, len(t)) / SR) * 2 * np.pi
w = bp(rng.standard_normal(len(t)), 400, 9000) * np.sin(sweep) * 0 + bp(rng.standard_normal(len(t)), 500, 6000)
sh = np.sin(np.pi * np.linspace(0, 1, len(t))) ** 2
x = w * sh; sf = np.linspace(0, 1, len(t))
save('whoosh', hp(x, 300) * 1.0, peak=0.75)

t = t_(0.35); save('whoosh_short', hp(bp(rng.standard_normal(len(t)), 800, 7000) * np.sin(np.pi*np.linspace(0,1,len(t)))**1.5, 400), peak=0.6)

t = t_(0.16); f = 380 + 700 * (1 - np.exp(-t * 28))
save('pop', np.sin(2*np.pi*np.cumsum(f)/SR) * decay(t, 22) * env(len(t), 0.002, 0.04), peak=0.8)

def chime(notes, gap=0.09, dur=0.9):
    n = int(SR * (dur + gap * len(notes))); y = np.zeros(n)
    for i, f in enumerate(notes):
        tt = t_(dur); s = (np.sin(2*np.pi*f*tt) + 0.35*np.sin(2*np.pi*2*f*tt) + 0.15*np.sin(2*np.pi*3*f*tt)) * decay(tt, 4.2) * env(len(tt), 0.003, 0.2)
        o = int(SR * gap * i); y[o:o+len(s)] += s
    return y
save('success', chime([659.25, 987.77]), peak=0.7)
save('connect', chime([523.25, 659.25, 783.99, 1046.5], gap=0.08), peak=0.7)
save('ding', chime([1174.66], dur=1.2), peak=0.6)

t = t_(0.9); f = 110 * np.exp(-t * 2.5) + 38
x = np.sin(2*np.pi*np.cumsum(f)/SR) * decay(t, 4.5) + lp(rng.standard_normal(len(t)), 400) * decay(t, 12) * 0.4
save('impact', x * env(len(t), 0.001, 0.2), peak=0.9)

t = t_(0.05); save('blip', np.sin(2*np.pi*1300*t) * decay(t, 80) * env(len(t), 0.001, 0.01), peak=0.5)

t = t_(1.2); up = np.cumsum(np.linspace(300, 1800, len(t)) / SR) * 2 * np.pi
save('progress', np.sin(up) * 0.5 * np.linspace(0.2, 1, len(t)) * env(len(t), 0.05, 0.3) + bp(rng.standard_normal(len(t)), 3000, 9000) * 0.05, peak=0.35)

# ---------- Musik latar (A minor, 96 BPM, ~96 detik, loop-able) ----------
BPM = 96; beat = 60 / BPM; bars = 38; total = bars * 4 * beat
n = int(SR * total); L = np.zeros(n); R = np.zeros(n)
mid = lambda m: 440 * 2 ** ((m - 69) / 12)
CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
def add(buf, x, at):
    o = int(SR * at); e = min(n, o + len(x))
    if o < n: buf[o:e] += x[:e - o]
for bi in range(bars // 2):
    ch = CH[bi % 4]; st = bi * 8 * beat; d = 8 * beat + 0.5; tt = t_(d)
    pad = sum(np.sin(2*np.pi*mid(m + dt)*tt + ph) for m in ch for dt, ph in [(-0.08, 0), (0.08, 1.3)])
    pad = lp(pad, 1100) * np.minimum(tt / 1.2, 1) * np.minimum((d - tt) / 1.0, 1) * 0.10
    add(L, pad, st); add(R, pad, st)
    root = mid(ch[0] - 12)
    for q in range(8):
        tt = t_(beat * 0.9); b = np.sin(2*np.pi*root*tt) * decay(tt, 3) * 0.22
        add(L, b, st + q * beat); add(R, b, st + q * beat)
    pat = [0, 1, 2, 1, 2, 1, 0, 2] * 2
    for k, pi in enumerate(pat):
        m = ch[pi] + 12 + (12 if k % 8 > 4 else 0); tt = t_(0.35)
        p = (np.sin(2*np.pi*mid(m)*tt) + 0.4*np.sin(4*np.pi*mid(m)*tt)) * decay(tt, 9) * 0.07
        at = st + k * beat / 2
        add(L, p, at); add(R, p, at + 0.012)
for b in range(bars * 4):
    at = b * beat
    if b % 2 == 0:
        tt = t_(0.25); kk = np.sin(2*np.pi*np.cumsum(120*np.exp(-tt*22)+45)/SR) * decay(tt, 12) * 0.35
        add(L, kk, at); add(R, kk, at)
    tt = t_(0.05); hh = hp(rng.standard_normal(len(tt)), 7000) * decay(tt, 70) * 0.06
    add(L, hh, at + beat / 2); add(R, hh, at + beat / 2 + 0.006)
fade = np.minimum(np.linspace(0, total, n) / 3, 1) * np.minimum((total - np.linspace(0, total, n)) / 4, 1)
mus = np.stack([L * fade, R * fade], axis=1)
save('music', mus, peak=0.8)
print('OK ->', os.path.abspath(OUT))
