import {Easing, interpolate} from 'remotion';

export const SANS = 'Inter, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
export const SERIF = '"Playfair Display", Georgia, serif';

export const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export type Theme = 'intro' | 'evo' | 'openai' | 'deepmind' | 'anthropic' | 'compare' | 'close';

// Cohesive High-Craft Dark Technical Palette (Zero AI Slop / Zero Rainbow Glare)
export const TH: Record<Theme, {bg: [string, string]; ac: string; fg: string; surface: string; border: string}> = {
  intro: {
    bg: ['#070A11', '#0B111E'],
    ac: '#38BDF8', // Electric Cyan
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  evo: {
    bg: ['#070A11', '#0B111E'],
    ac: '#38BDF8', // Electric Cyan
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  openai: {
    bg: ['#070A11', '#0D111A'],
    ac: '#F59E0B', // Amber / Cosmic Sun
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(245, 158, 11, 0.25)',
  },
  deepmind: {
    bg: ['#070A11', '#08131A'],
    ac: '#10B981', // Quantum Emerald
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(16, 185, 129, 0.25)',
  },
  anthropic: {
    bg: ['#070A11', '#120E1A'],
    ac: '#F97316', // Technical Copper / Warm Ochre
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(249, 115, 22, 0.25)',
  },
  compare: {
    bg: ['#070A11', '#0B111E'],
    ac: '#38BDF8', // Electric Cyan
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  close: {
    bg: ['#070A11', '#0B111E'],
    ac: '#38BDF8', // Electric Cyan
    fg: '#F8FAFC',
    surface: '#0F172A',
    border: 'rgba(56, 189, 248, 0.25)',
  },
};
