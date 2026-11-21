import {Easing, interpolate} from 'remotion';
export const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';
export const SERIF = '"Playfair Display", Georgia, serif';
export const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
export type Theme = 'intro' | 'evo' | 'openai' | 'deepmind' | 'anthropic' | 'compare' | 'close';
// bg gradient, accent, foreground
export const TH: Record<Theme, {bg: [string, string]; ac: string; fg: string}> = {
  intro: {bg: ['#07080f', '#10131f'], ac: '#7dd3fc', fg: '#eaf0ff'},
  evo: {bg: ['#0a0a12', '#141428'], ac: '#c4b5fd', fg: '#eaf0ff'},
  openai: {bg: ['#02030a', '#0b1030'], ac: '#9ab8ff', fg: '#f2f5ff'},
  deepmind: {bg: ['#06100f', '#0a1f1c'], ac: '#5eead4', fg: '#e8fffb'},
  anthropic: {bg: ['#efe6d2', '#e3d6bb'], ac: '#c2410c', fg: '#2a1f14'},
  compare: {bg: ['#08090d', '#12141c'], ac: '#fbbf24', fg: '#f4f4f5'},
  close: {bg: ['#02030a', '#0b1030'], ac: '#7dd3fc', fg: '#f2f5ff'},
};
