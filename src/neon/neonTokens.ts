import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const NEON_FONT = {
  sans: loadJakarta('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['400', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

export const NEON_TOKENS = {
  bg: '#080B12',
  bgRadial: 'radial-gradient(circle at 50% 20%, #151C2C 0%, #080B12 75%)',
  surface: '#0F172A',
  surfaceElevated: '#1E293B',
  ink: '#FFFFFF',
  inkMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.1)',
  borderNeon: 'rgba(255, 94, 30, 0.45)',
  
  // Model signature accents
  neon: '#FF5E1E',
  neonGlow: '0 0 35px rgba(255, 94, 30, 0.6)',
  cyan: '#00E5FF',
  cyanGlow: '0 0 25px rgba(0, 229, 255, 0.5)',
  carbon: '#3B82F6',
  hydrogen: '#10B981',
  
  // Competitor colors
  claude: '#F59E0B',
  gpt: '#14B8A6',

  shadowCard: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
} as const;
