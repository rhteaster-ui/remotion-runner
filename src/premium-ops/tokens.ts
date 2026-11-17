import {loadFont as loadSpace} from '@remotion/google-fonts/SpaceGrotesk';
import {loadFont as loadManrope} from '@remotion/google-fonts/Manrope';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const PORTFOLIO_FONT = {
  display: loadSpace('normal', {
    weights: ['500', '600', '700'],
    subsets: ['latin'],
  }).fontFamily,
  sans: loadManrope('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['400', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

/**
 * Token desain resmi portofolio R_HMT OFC (rhmt.biz.id)
 * Industrial Darkroom Slate & Precision Technical Glass (DESIGN_SYSTEM.md)
 */
export const PORTFOLIO_TOKENS = {
  gold: '#c5a275',
  goldBright: '#dfc198',
  goldDark: '#8a6b42',
  steelIce: '#d7e0ec',
  relayBlue: '#2166ff',
  dark: {
    bg: '#080b10',
    surface: '#10161e',
    surface2: '#161d27',
    glass: 'rgba(21, 27, 37, 0.92)',
    ink: '#f1f3f6',
    muted: '#a9b1be',
    quiet: '#8390a1',
    accent: '#c5a275',
    accentSoft: 'rgba(197, 162, 117, 0.15)',
    accentBorder: 'rgba(197, 162, 117, 0.48)',
    line: 'rgba(175, 191, 218, 0.18)',
    lineStrong: 'rgba(184, 197, 216, 0.36)',
    shadow: '0 22px 48px -14px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.35)',
  },
  light: {
    bg: '#eef0f2',
    surface: '#fafbfc',
    surface2: '#e4e8ed',
    glass: 'rgba(250, 251, 253, 0.94)',
    ink: '#181e28',
    muted: '#4d5868',
    quiet: '#616e80',
    accent: '#35445a',
    accentSoft: 'rgba(53, 68, 90, 0.1)',
    accentBorder: 'rgba(53, 68, 90, 0.28)',
    line: 'rgba(24, 30, 40, 0.11)',
    lineStrong: 'rgba(24, 30, 40, 0.24)',
    shadow: '0 20px 44px -14px rgba(24, 30, 40, 0.16), 0 4px 12px rgba(24, 30, 40, 0.06)',
  },
} as const;
