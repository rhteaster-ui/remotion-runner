import { Easing, interpolate } from 'remotion';

export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  back: Easing.bezier(0.34, 1.56, 0.64, 1),
  lin: (t: number) => t,
};

/** progress 0→1 antara frame a..b */
export const p = (frame: number, a: number, b: number, ease: (t: number) => number = E.out) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ───── Keyframe kamera ─────
 * s = zoom, px/py = titik fokus (relatif ke pusat elemen, px tanpa zoom),
 * rx/ry = tilt 3D (derajat). ease dipakai untuk segmen MENUJU key ini. */
export type FocusKey = {
  f: number;
  s: number;
  px?: number;
  py?: number;
  rx?: number;
  ry?: number;
  ease?: (t: number) => number;
};

export const focusCam = (frame: number, keys: FocusKey[]) => {
  const ks = keys.map((k) => ({ px: 0, py: 0, rx: 0, ry: 0, ...k }));
  let a = ks[0];
  let b = ks[0];
  let t = 0;
  if (frame >= ks[ks.length - 1].f) {
    a = b = ks[ks.length - 1];
  } else if (frame > ks[0].f) {
    for (let i = 0; i < ks.length - 1; i++) {
      if (frame >= ks[i].f && frame < ks[i + 1].f) {
        a = ks[i];
        b = ks[i + 1];
        t = (b.ease ?? E.inOut)((frame - a.f) / (b.f - a.f));
        break;
      }
    }
  }
  const s = lerp(a.s, b.s, t);
  const px = lerp(a.px, b.px, t);
  const py = lerp(a.py, b.py, t);
  const rx = lerp(a.rx, b.rx, t);
  const ry = lerp(a.ry, b.ry, t);
  return {
    s,
    css: `perspective(2400px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${-px * s}px, ${-py * s}px) scale(${s})`,
  };
};

/* ───── Time remap (slow-mo / fast pada animasi) ─────
 * segs: potongan dengan kecepatan konstan, `until` = frame akhir potongan. */
export type RateSeg = { until: number; rate: number };

export const remap = (frame: number, segs: RateSeg[]) => {
  let t = 0;
  let prev = 0;
  for (const s of segs) {
    if (frame <= s.until) return t + (frame - prev) * s.rate;
    t += (s.until - prev) * s.rate;
    prev = s.until;
  }
  return t + (frame - prev);
};

export const rateAt = (frame: number, segs: RateSeg[]) => {
  for (const s of segs) if (frame <= s.until) return s.rate;
  return 1;
};

/* ───── Speed ramp untuk video: potongan {frames, rate} berurutan ───── */
export type RampSeg = { frames: number; rate: number };

export const rampRateAt = (frame: number, segs: RampSeg[]) => {
  let acc = 0;
  for (const s of segs) {
    acc += s.frames;
    if (frame < acc) return s.rate;
  }
  return segs[segs.length - 1].rate;
};

export const rampTotal = (segs: RampSeg[]) => segs.reduce((a, s) => a + s.frames, 0);

/** Guncangan layar deterministik */
export const shake = (frame: number, start: number, amp: number, decay = 14) => {
  const t = frame - start;
  if (t < 0) return { x: 0, y: 0, r: 0 };
  const k = Math.exp(-t / decay) * amp;
  return {
    x: Math.sin(t * 2.9) * k,
    y: Math.cos(t * 3.7) * k,
    r: Math.sin(t * 2.1) * k * 0.04,
  };
};

export const pad2 = (n: number) => String(Math.floor(n)).padStart(2, '0');
