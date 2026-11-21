import { loadFont as loadNewsreader } from '@remotion/google-fonts/Newsreader';
import { loadFont as loadInstrument } from '@remotion/google-fonts/InstrumentSans';
import { Easing, interpolate } from 'remotion';

/** Serif editorial untuk nama & etimologi; sans bersih untuk subtitle & data. */
export const serif = loadNewsreader('normal', { weights: ['300', '400', '500'], subsets: ['latin'] }).fontFamily;
loadNewsreader('italic', { weights: ['300', '400'], subsets: ['latin'] });
export const sans = loadInstrument('normal', { weights: ['400', '500', '600'], subsets: ['latin'] }).fontFamily;

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export type ThemeId = 'studio' | 'cosmos' | 'spectral' | 'washi';

export const THEMES: Record<ThemeId, { bg: string; ink: string; mute: string; rule: string; accent: string; light: boolean }> = {
  studio: { bg: '#0B1020', ink: '#EEF0F6', mute: 'rgba(238,240,246,0.64)', rule: 'rgba(238,240,246,0.24)', accent: '#9DB4FF', light: false },
  cosmos: { bg: '#04060F', ink: '#F1F4FF', mute: 'rgba(241,244,255,0.64)', rule: 'rgba(241,244,255,0.22)', accent: '#BBD0FF', light: false },
  spectral: { bg: '#0D1114', ink: '#EDF3F4', mute: 'rgba(237,243,244,0.64)', rule: 'rgba(237,243,244,0.22)', accent: '#7FE0D4', light: false },
  washi: { bg: '#E6E8E2', ink: '#14171C', mute: 'rgba(20,23,28,0.66)', rule: 'rgba(20,23,28,0.28)', accent: '#2A3C9A', light: true },
};

export const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  back: Easing.bezier(0.34, 1.4, 0.64, 1),
  lin: (t: number) => t,
};

/** progress 0→1 antara frame a..b */
export const p = (frame: number, a: number, b: number, ease: (t: number) => number = E.out) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/** masuk + keluar (0→1→0) */
export const io = (frame: number, dur: number, inF = 18, outF = 14) =>
  p(frame, 0, inF) * (1 - p(frame, dur - outF, dur, E.in));
