import {Easing, interpolate, spring} from 'remotion';
import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

const jakarta = loadJakarta('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
const serif = loadSerif('italic', {weights: ['400'], subsets: ['latin']});
const mono = loadMono('normal', {weights: ['500', '700', '800'], subsets: ['latin']});

export const SANS = `${jakarta.fontFamily}, -apple-system, "Segoe UI", sans-serif`;
export const SERIF = `${serif.fontFamily}, Georgia, serif`;
export const MONO = `${mono.fontFamily}, Menlo, monospace`;

export const FPS = 30;

export const L = {
  bg: '#F8FAFC',
  surface: '#FFFFFF',
  border: 'rgba(15, 23, 42, 0.09)',
  text: '#0F172A',
  sub: '#334155',
  muted: '#64748B',
  blue: '#2563EB',
  sky: '#0EA5E9',
  violet: '#7C3AED',
  cyan: '#06B6D4',
  emerald: '#10B981',
  green: '#059669',
  amber: '#F59E0B',
  red: '#DC2626',
  wa: '#25D366',
  shadow: '0 22px 60px rgba(15, 23, 42, 0.09), 0 2px 10px rgba(15, 23, 42, 0.04)',
  shadowLg: '0 40px 100px rgba(15, 23, 42, 0.16), 0 4px 18px rgba(15, 23, 42, 0.06)',
};

export const E = Easing.bezier(0.22, 1, 0.36, 1);
export const EIO = Easing.bezier(0.65, 0, 0.35, 1);

export const ramp = (
  f: number,
  a: number,
  b: number,
  from = 0,
  to = 1,
  easing: (t: number) => number = E,
) =>
  interpolate(f, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const pop = (f: number, delay = 0, damping = 13, stiffness = 140, mass = 1) =>
  spring({frame: f - delay, fps: FPS, config: {damping, stiffness, mass}});

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const pad2 = (n: number) => String(Math.floor(n)).padStart(2, '0');
