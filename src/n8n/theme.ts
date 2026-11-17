import {loadFont as loadBricolage} from '@remotion/google-fonts/BricolageGrotesque';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const FONT = {
  sans: loadBricolage('normal', {weights: ['500', '700', '800'], subsets: ['latin']}).fontFamily,
  mono: loadMono('normal', {weights: ['400', '700'], subsets: ['latin']}).fontFamily,
};

/* Warm graphite canvas + satu aksen koral. Sengaja bukan biru/lime/oranye ala Gemini. */
export const C = {
  bg: '#0E0F12',
  tile: '#1A1B20',
  tile2: '#23252B',
  border: '#2E3038',
  ink: '#F3F0EA',
  muted: '#8A8E99',
  dim: '#5A5E69',
  wire: '#4B4E58',
  coral: '#FF6D5A',
  green: '#3DDC97',
  amber: '#FFC857',
  violet: '#A68BFF',
  sky: '#55B8FF',
};

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
