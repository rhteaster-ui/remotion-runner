import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const FILOSOFI_FONT = {
  sans: loadJakarta('normal', {
    weights: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
  mono: loadMono('normal', {
    weights: ['400', '600', '700', '800'],
    subsets: ['latin'],
  }).fontFamily,
};

export const FILOSOFI_TOKENS = {
  bg: '#080B12',
  bgRadial: 'radial-gradient(circle at 50% 20%, #131A2A 0%, #080B12 80%)',
  surface: '#0F172A',
  surfaceElevated: '#1E293B',
  ink: '#FFFFFF',
  inkMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.1)',
  
  // Model signature accents
  claude: '#F59E0B',
  claudeGlow: '0 0 35px rgba(245, 158, 11, 0.5)',
  gemini: '#4285F4',
  geminiCyan: '#38BDF8',
  geminiGlow: '0 0 35px rgba(66, 133, 244, 0.5)',
  openai: '#10B981',
  openaiGlow: '0 0 35px rgba(16, 185, 129, 0.5)',
  
  shadowCard: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 0 1.5px rgba(255, 255, 255, 0.08)',
} as const;
