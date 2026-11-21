import {Easing, interpolate} from 'remotion';
export const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, Menlo, monospace';
export const SERIF = '"Playfair Display", Georgia, serif';
export const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
export type Theme = 'intro' | 'evo' | 'openai' | 'deepmind' | 'anthropic' | 'compare' | 'close';
// bg gradient, accent, foreground
export const TH: Record<Theme, {bg: [string, string]; ac: string; fg: string; b: [string, string]}> = {
  intro: {bg: ['#12063a', '#2a0a5e'], ac: '#ffd23f', fg: '#ffffff', b: ['#ff3d9a', '#3d7bff']},
  evo: {bg: ['#061a40', '#0b3d91'], ac: '#4cc9f0', fg: '#ffffff', b: ['#7b2ff7', '#00e0ff']},
  openai: {bg: ['#0b1026', '#3a1c8f'], ac: '#ffb703', fg: '#ffffff', b: ['#ff7a18', '#6a5cff']},
  deepmind: {bg: ['#031b34', '#0a4a6b'], ac: '#00f5d4', fg: '#ffffff', b: ['#00f5d4', '#ff5d73']},
  anthropic: {bg: ['#f6ead7', '#f0d9b8'], ac: '#d9480f', fg: '#2b1a10', b: ['#ff9a62', '#ffd6a5']},
  compare: {bg: ['#14001f', '#3b0a4a'], ac: '#ffd23f', fg: '#ffffff', b: ['#ff3d9a', '#ffd23f']},
  close: {bg: ['#0a0420', '#2b0d6e'], ac: '#ff6bd6', fg: '#ffffff', b: ['#ff6bd6', '#4cc9f0']},
};
