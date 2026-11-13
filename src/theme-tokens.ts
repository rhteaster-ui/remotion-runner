import {loadFont as loadManrope} from '@remotion/google-fonts/Manrope';
import {loadFont as loadSpace} from '@remotion/google-fonts/SpaceGrotesk';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const FONT = {
  sans: loadManrope('normal', {weights: ['400', '600', '800'], subsets: ['latin']}).fontFamily,
  space: loadSpace('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily,
  mono: loadMono('normal', {weights: ['400', '700'], subsets: ['latin']}).fontFamily,
};

export const COLOR_PALETTE = {
  dark: {
    bg: '#080b14',
    surface: '#0f172a',
    surface2: '#1e293b',
    ink: '#f8fafc',
    muted: '#94a3b8',
    line: 'rgba(148, 163, 184, 0.18)',
    shadow: 'rgba(0, 0, 0, 0.70)',
  },
  light: {
    bg: '#f8fafd',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    ink: '#0f172a',
    muted: '#64748b',
    line: 'rgba(148, 163, 184, 0.22)',
    shadow: 'rgba(15, 23, 42, 0.08)',
  },
  spark: {
    lime: '#00e676',
    periwinkle: '#4285f4',
    coral: '#ff9800',
  }
};
