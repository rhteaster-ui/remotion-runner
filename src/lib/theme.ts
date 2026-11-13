import {COLOR_PALETTE, FONT} from '../theme-tokens';

export type Mode = 'dark' | 'light';
export const W = 1080;
export const H = 1920;
export const M = 72;
export const CW = W - 2 * M;

export const ACCENT = {argon: '#ff9800', carbon: '#4285f4', hydrogen: '#00e676'} as const;

export const MODELS = {
  argon: {num: 18, sym: 'Ar', name: 'Argon', accent: ACCENT.argon, shells: [2, 8, 8]},
  carbon: {num: 6, sym: 'C', name: 'Carbon', accent: ACCENT.carbon, shells: [2, 4]},
  hydrogen: {num: 1, sym: 'H', name: 'Hydrogen', accent: ACCENT.hydrogen, shells: [1]},
} as const;
export type ModelKey = keyof typeof MODELS;

export const pal = (m: Mode) => ({
  ...COLOR_PALETTE[m],
  textAccent: m === 'dark' ? '#38bdf8' : '#0284c7',
});
export {FONT};
