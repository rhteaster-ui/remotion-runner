import {loadFont as loadSpace} from '@remotion/google-fonts/SpaceGrotesk';
import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const REPO_FONT = {
  display: loadSpace('normal', {
    weights: ['500', '600', '700'],
    subsets: ['latin'],
  }).fontFamily,
  sans: loadJakarta('normal', {
    weights: ['500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

/**
 * Modern Keynote Studio Tokens for RepoFlow
 * Crisp Studio Slate, Pure Apple Light, Radiant Cyan & Electric Ocean.
 * Clean of any blueprint grid or hairline coordinates.
 */
export const REPO_TOKENS = {
  sky: '#38bdf8',
  skyGlow: '#0ea5e9',
  skyDark: '#0284c7',
  mint: '#10b981',
  amber: '#f59e0b',
  crimson: '#ef4444',
  dark: {
    bg: '#07090e',
    surface: '#0d131f',
    surface2: '#131c2e',
    glass: 'rgba(13, 19, 31, 0.94)',
    ink: '#f8fafc',
    muted: '#94a3b8',
    quiet: '#64748b',
    accent: '#38bdf8',
    accentSoft: 'rgba(56, 189, 248, 0.16)',
    accentBorder: 'rgba(56, 189, 248, 0.45)',
    line: 'rgba(255, 255, 255, 0.12)',
    lineStrong: 'rgba(56, 189, 248, 0.5)',
    shadow: '0 28px 65px -14px rgba(0, 0, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.5)',
  },
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    glass: 'rgba(255, 255, 255, 0.96)',
    ink: '#0f172a',
    muted: '#475569',
    quiet: '#64748b',
    accent: '#0284c7',
    accentSoft: 'rgba(2, 132, 199, 0.12)',
    accentBorder: 'rgba(2, 132, 199, 0.45)',
    line: 'rgba(15, 23, 42, 0.12)',
    lineStrong: 'rgba(2, 132, 199, 0.35)',
    shadow: '0 24px 55px -14px rgba(15, 23, 42, 0.12), 0 6px 16px rgba(15, 23, 42, 0.05)',
  },
} as const;
