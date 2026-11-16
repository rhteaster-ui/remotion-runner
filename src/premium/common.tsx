import React from 'react';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {IconInfo, IconSliders, IconSquares, IconTable} from '../scenes/ERekapScenes';
import {NavTab, PremiumShell, Reveal} from './fx';

export const mono = EREKAP_FONT.mono;
export const sans = EREKAP_FONT.sans;
export {T};

export const bump = (now: number, t: number, d = 0.4) => {
  const u = (now - t) / d;
  return u < 0 || u > 1 ? 0 : Math.sin(Math.PI * u);
};

const ICONS: Record<NavTab, React.ReactNode> = {
  dashboard: <IconSquares size={24} />,
  rekap: <IconTable size={24} />,
  admin: <IconSliders size={24} />,
  info: <IconInfo size={24} />,
};
const LABELS: Record<NavTab, string> = {dashboard: 'Dashboard', rekap: 'Rekap', admin: 'Kelola', info: 'Info'};

export const Shell: React.FC<{
  mode: 'dark' | 'light';
  from: NavTab;
  moves?: {t: number; tab: NavTab}[];
  accessLabel: string;
  adminLabel?: string;
  adminMix?: number;
  children: React.ReactNode;
}> = ({moves = [], children, ...rest}) => (
  <PremiumShell {...rest} moves={moves} icons={ICONS} labels={LABELS}>
    {children}
  </PremiumShell>
);

export const Ctx: React.FC<{step: string; title: string; route: string; mode: 'dark' | 'light'; at?: number}> = ({step, title, route, mode, at = 0.3}) => {
  const dark = mode === 'dark';
  return (
    <Reveal at={at} y={18} blur={6}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
        <div>
          <div style={{fontFamily: mono, fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', color: dark ? T.lime : T.canopy, textTransform: 'uppercase'}}>{step}</div>
          <div style={{fontSize: 34, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, color: dark ? '#FFFFFF' : T.ink, marginTop: 2}}>{title}</div>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 16,
            fontWeight: 700,
            padding: '8px 16px',
            borderRadius: 14,
            backgroundColor: dark ? 'rgba(255,255,255,0.09)' : T.surface,
            color: dark ? '#D1FAE5' : T.canopy,
            border: dark ? '1px solid rgba(255,255,255,0.14)' : `1px solid ${T.borderStrong}`,
            flexShrink: 0,
          }}
        >
          {route}
        </div>
      </div>
    </Reveal>
  );
};

export const IconLock: React.FC<{size?: number; color?: string}> = ({size = 28, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <rect x="48" y="104" width="160" height="112" rx="18" />
    <path d="M84 104V76a44 44 0 0 1 88 0v28" />
    <circle cx="128" cy="160" r="10" fill={color} stroke="none" />
  </svg>
);
