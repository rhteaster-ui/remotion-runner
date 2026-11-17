import {loadFont as loadSpace} from '@remotion/google-fonts/SpaceGrotesk';
import {loadFont as loadManrope} from '@remotion/google-fonts/Manrope';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const REPO_FONT = {
  display: loadSpace('normal', {
    weights: ['500', '600', '700'],
    subsets: ['latin'],
  }).fontFamily,
  sans: loadManrope('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

/**
 * Design tokens for RepoFlow (https://repoflow.web.id)
 * Blueprint Grid, Sky/Cyan glow, Deep Space Slate, and Crisp Clean Light.
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
    accentSoft: 'rgba(56, 189, 248, 0.14)',
    accentBorder: 'rgba(56, 189, 248, 0.45)',
    gridLine: 'rgba(56, 189, 248, 0.05)',
    gridAccent: 'rgba(56, 189, 248, 0.12)',
    line: 'rgba(148, 163, 184, 0.16)',
    lineStrong: 'rgba(56, 189, 248, 0.32)',
    shadow: '0 24px 50px -12px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(0, 0, 0, 0.45)',
  },
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    surface2: '#f1f5f9',
    glass: 'rgba(255, 255, 255, 0.95)',
    ink: '#0f172a',
    muted: '#475569',
    quiet: '#64748b',
    accent: '#0284c7',
    accentSoft: 'rgba(2, 132, 199, 0.1)',
    accentBorder: 'rgba(2, 132, 199, 0.35)',
    gridLine: 'rgba(15, 23, 42, 0.04)',
    gridAccent: 'rgba(2, 132, 199, 0.08)',
    line: 'rgba(15, 23, 42, 0.12)',
    lineStrong: 'rgba(2, 132, 199, 0.28)',
    shadow: '0 20px 45px -12px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.06)',
  },
} as const;
