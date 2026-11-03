import {loadFont} from '@remotion/google-fonts/SpaceGrotesk';
import {staticFile} from 'remotion';

const f = loadFont('normal', {weights: ['300', '400', '500', '700'], subsets: ['latin']});
export const fontFamily = f.fontFamily;

export const FPS = 30;

// Token dari rhmt.biz.id: theme-color #080b10, konsep graphite + silver + kaca.
export const C = {
  bg: '#080b10',
  panel: '#121821',
  text: '#e8ecf1',
  silver: '#c9d1da',
  mute: '#7d8896',
  line: 'rgba(255,255,255,0.10)',
  glint: '#8fb4ff',
};

// false = ambil aset langsung dari rhmt.biz.id. true = pakai public/ hasil `npm run assets`.
export const USE_LOCAL = true;
export const asset = (p: string) =>
  p.startsWith('http') ? p : USE_LOCAL ? staticFile(p) : `https://www.rhmt.biz.id/${p}`;

export const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Durasi tiap scene (frame @30fps). Total 2400 = 80 detik.
export const SCENES = {
  boot: 180,
  hero: 300,
  works: 540,
  journey: 420,
  stack: 300,
  universe: 240,
  community: 180,
  outro: 240,
};
export const TOTAL = Object.values(SCENES).reduce((a, b) => a + b, 0);
