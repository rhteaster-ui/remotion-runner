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
    bg: '#080b10',
    surface: '#10161e',
    surface2: '#161d27',
    ink: '#f1f3f6',
    muted: '#a9b1be',
    line: 'rgba(175, 191, 218, 0.20)',
    shadow: 'rgba(0, 0, 0, 0.65)',
  },
  light: {
    bg: '#eef0f2',
    surface: '#fafbfc',
    surface2: '#e4e8ed',
    ink: '#181e28',
    muted: '#4d5868',
    line: 'rgba(65, 83, 109, 0.16)',
    shadow: 'rgba(51, 75, 107, 0.20)',
  },
  spark: {
    lime: '#d4ff3f',
    periwinkle: '#6f86ff',
    coral: '#ff7a59',
  }
};
