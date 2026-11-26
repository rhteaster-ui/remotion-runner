import React from 'react';

export const TERMIUS_COLORS = {
  canvas: '#090D18',
  canvasAlt: '#0D1324',
  chrome: '#121728',
  sidebar: '#151B2E',
  surface: '#1B2238',
  surfaceHover: '#232C47',
  terminalBg: '#0B0F1A',
  border: 'rgba(148, 163, 184, 0.16)',
  borderActive: 'rgba(0, 198, 137, 0.55)',
  green: '#00C689',
  greenSoft: 'rgba(0, 198, 137, 0.16)',
  blue: '#3B82F6',
  blueSoft: 'rgba(59, 130, 246, 0.16)',
  amber: '#F59E0B',
  amberSoft: 'rgba(245, 158, 11, 0.15)',
  purple: '#8B5CF6',
  text: '#F1F5F9',
  muted: '#94A3B8',
  dim: '#64748B',
};

/** Authentic Termius geometric app icon (deep navy squircle + emerald shield/terminal chevron) */
export const TermiusLogo: React.FC<{size?: number}> = ({size = 64}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="termiusBg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1B233B" />
        <stop offset="100%" stopColor="#0E1322" />
      </linearGradient>
      <linearGradient id="termiusGreen" x1="22" y1="22" x2="98" y2="98" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2EE8A5" />
        <stop offset="100%" stopColor="#00A876" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="116" height="116" rx="28" fill="url(#termiusBg)" stroke="rgba(0,198,137,0.45)" strokeWidth="3" />
    {/* Outer Termius geometric shield / frame */}
    <path
      d="M32 28H88C91.3 28 94 30.7 94 34V74C94 82.8 86.8 90 78 90H42C33.2 90 26 82.8 26 74V34C26 30.7 28.7 28 32 28Z"
      fill="rgba(0, 198, 137, 0.10)"
      stroke="url(#termiusGreen)"
      strokeWidth="5"
    />
    {/* Prompt chevron > */}
    <path
      d="M41 48L57 60L41 72"
      stroke="url(#termiusGreen)"
      strokeWidth="7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Terminal underscore _ */}
    <path
      d="M62 72H79"
      stroke="#F1F5F9"
      strokeWidth="7.5"
      strokeLinecap="round"
    />
  </svg>
);

export const HostsIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="7" rx="2" />
    <rect x="2" y="14" width="20" height="7" rx="2" />
    <circle cx="6.5" cy="6.5" r="1" fill={color} stroke="none" />
    <circle cx="6.5" cy="17.5" r="1" fill={color} stroke="none" />
    <line x1="11" y1="6.5" x2="17" y2="6.5" />
    <line x1="11" y1="17.5" x2="17" y2="17.5" />
  </svg>
);

export const SftpIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16M16 3l4 4-4 4" />
    <path d="M20 17H4M8 13l-4 4 4 4" />
  </svg>
);

export const KeychainIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l9-9" />
    <path d="M16 7l3 3" />
    <path d="M18 5l2 2" />
  </svg>
);

export const SnippetsIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

export const PortFwdIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="2.5" />
    <circle cx="19" cy="6" r="2.5" />
    <circle cx="19" cy="18" r="2.5" />
    <path d="M7.5 11.2L16.5 7.2M7.5 12.8L16.5 16.8" />
  </svg>
);

export const SettingsIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export const SplitPaneIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 22}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

export const SearchIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.5" y2="16.5" />
  </svg>
);

export const FolderIcon: React.FC<{color?: string; size?: number}> = ({color = '#F59E0B', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const FileIcon: React.FC<{color?: string; size?: number}> = ({color = '#94A3B8', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export const PlayIcon: React.FC<{color?: string; size?: number}> = ({color = '#00C689', size = 18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

export const UbuntuBadge: React.FC<{size?: number}> = ({size = 38}) => (
  <div style={{
    width: size, height: size, borderRadius: 11,
    background: 'linear-gradient(135deg, #E95420, #C73E1D)',
    display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 900, fontSize: size * 0.44,
    fontFamily: 'Inter, system-ui, sans-serif', boxShadow: '0 4px 12px rgba(233,84,32,0.35)',
  }}>
    U
  </div>
);

export const LinuxBadge: React.FC<{label: string; bg: string; size?: number}> = ({label, bg, size = 38}) => (
  <div style={{
    width: size, height: size, borderRadius: 11, background: bg,
    display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 800, fontSize: size * 0.36,
    fontFamily: '"JetBrains Mono", monospace',
  }}>
    {label}
  </div>
);
