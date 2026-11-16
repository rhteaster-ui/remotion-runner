import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const EREKAP_FONT = {
  sans: loadJakarta('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['400', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

export const EREKAP_TOKENS = {
  bg: '#F1F5F2',
  surface: '#FFFFFF',
  surfaceRaised: '#F8FBF9',
  surfaceMint: '#EAF6EE',
  ink: '#0B1410',
  inkMuted: '#526058',
  border: 'rgba(10, 61, 38, 0.09)',
  borderStrong: 'rgba(10, 61, 38, 0.16)',
  canopy: '#0A3D26',
  canopyDeep: '#072919',
  canopyMid: '#115737',
  lime: '#A3E635',
  limeHover: '#BEF264',
  limeInk: '#072919',
  status: {
    hadir: {bg: '#DCFCE7', fg: '#14532D', border: '#86EFAC'},
    sakit: {bg: '#FEF3C7', fg: '#92400E', border: '#FDE68A'},
    izin: {bg: '#E0F2FE', fg: '#075985', border: '#BAE6FD'},
    alpha: {bg: '#FEE2E2', fg: '#991B1B', border: '#FECACA'},
  },
  shadowSheet:
    '0 22px 48px -14px rgba(10, 61, 38, 0.18), 0 4px 12px rgba(10, 61, 38, 0.06)',
  shadowCard:
    '0 12px 28px -12px rgba(10, 61, 38, 0.14), 0 2px 6px rgba(10, 61, 38, 0.05)',
  shadowDock:
    '0 18px 36px -8px rgba(7, 41, 25, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.14)',
} as const;
