import React from 'react';
import {Img, staticFile} from 'remotion';

/** Exact color tokens sampled directly from official Termius Desktop screenshots */
export const TERMIUS = {
  outerBg: '#090C16',
  chrome: '#141728',       // Top bar & left sidebar
  workspace: '#0F1221',    // Main hosts/snippets background
  terminal: '#111424',     // Terminal pane background
  card: '#1C2034',         // Host / Group / Snippet card
  cardHover: '#232842',
  pill: '#1E2236',         // Inactive topbar pill & toolbar buttons
  border: '#262B42',       // Subtle Termius divider/card border
  activeTabBg: '#143B32',  // Authentic Termius active green tab fill
  green: '#29D386',        // Authentic Termius emerald terminal green
  blue: '#3B82F6',         // Terminal label blue & group icon
  magenta: '#E11D74',      // Authentic Termius IP address magenta
  red: '#EF4444',          // Used memory/disk bar red
  ubuntu: '#E95420',
  debian: '#D70A53',
  amber: '#F59E0B',
  text: '#F3F4F6',
  muted: '#8B92A8',
  dim: '#5A6178',
};

/** Official Termius App Icon (winking >_ cloud on deep navy squircle) */
export const TermiusAppIcon: React.FC<{size?: number; radius?: number}> = ({size = 64, radius}) => (
  <Img
    src={staticFile('images/termius-icon.png')}
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? Math.round(size * 0.22),
      display: 'block',
      objectFit: 'cover',
    }}
  />
);

/** Real Termius Vault Safe icon */
export const VaultSafeIcon: React.FC<{color?: string; size?: number}> = ({color = '#D1D5DB', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="15" rx="3" />
    <circle cx="13.5" cy="11.5" r="3.2" />
    <line x1="7" y1="9" x2="7" y2="14" />
    <line x1="7" y1="19" x2="7" y2="21" />
    <line x1="17" y1="19" x2="17" y2="21" />
  </svg>
);

export const HostsRackIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
    <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
    <circle cx="7" cy="7.25" r="1" fill={color} stroke="none" />
    <circle cx="7" cy="16.75" r="1" fill={color} stroke="none" />
    <line x1="11" y1="7.25" x2="17" y2="7.25" />
    <line x1="11" y1="16.75" x2="17" y2="16.75" />
  </svg>
);

export const KeychainKeyIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M12 11.5V21" />
    <path d="M12 16.5H15.5" />
    <path d="M12 19.5H14.5" />
  </svg>
);

export const PortFwdArrowsIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h14l-3.5-3.5" />
    <path d="M4 15h14l-3.5 3.5" />
  </svg>
);

/** Real Termius Snippets icon: curly braces { } */
export const SnippetsBracesIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4C6.5 4 6 5 6 6.5V9.5C6 11 5 12 4 12C5 12 6 13 6 14.5V17.5C6 19 6.5 20 8 20" />
    <path d="M16 4C17.5 4 18 5 18 6.5V9.5C18 11 19 12 20 12C19 12 18 13 18 14.5V17.5C18 19 17.5 20 16 20" />
  </svg>
);

export const KnownHostsFingerprintIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round">
    <path d="M12 11v4" />
    <path d="M8.5 11.5a3.5 3.5 0 0 1 7 0v2.5a6 6 0 0 1-1.2 3.6" />
    <path d="M5.5 11a6.5 6.5 0 0 1 13 0v1.5" />
    <path d="M9.5 17.5A9 9 0 0 1 8 12" />
  </svg>
);

export const LogsClockIcon: React.FC<{color?: string; size?: number}> = ({color = 'currentColor', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    <polyline points="12 7.5 12 12 15 14" />
  </svg>
);

export const FolderSolidIcon: React.FC<{color?: string; size?: number}> = ({color = '#D1D5DB', size = 19}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M3 6a2 2 0 0 1 2-2h4.2l2 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
  </svg>
);

export const TerminalPromptIcon: React.FC<{color?: string; size?: number}> = ({color = '#29D386', size = 19}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <polyline points="7 9.5 10.5 12.5 7 15.5" />
    <line x1="12.5" y1="15.5" x2="16.5" y2="15.5" />
  </svg>
);

/** Real Ubuntu Circle-of-Friends SVG inside orange rounded square (matching Termius Hosts UI) */
export const UbuntuHostIcon: React.FC<{size?: number; monochrome?: string}> = ({size = 44, monochrome}) => {
  const svg = (
    <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6.8" stroke={monochrome ?? '#fff'} strokeWidth="2.2" strokeDasharray="9 4.5" />
      <circle cx="5.2" cy="12" r="2.2" fill={monochrome ?? '#fff'} />
      <circle cx="16.4" cy="6.2" r="2.2" fill={monochrome ?? '#fff'} />
      <circle cx="16.4" cy="17.8" r="2.2" fill={monochrome ?? '#fff'} />
    </svg>
  );
  if (monochrome) return svg;
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, background: TERMIUS.ubuntu,
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>
      {svg}
    </div>
  );
};

/** Real Debian swirl icon inside crimson square (matching Termius Hosts UI) */
export const DebianHostIcon: React.FC<{size?: number}> = ({size = 44}) => (
  <div style={{
    width: size, height: size, borderRadius: 12, background: TERMIUS.debian,
    display: 'grid', placeItems: 'center', flexShrink: 0,
  }}>
    <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12.8 14.5c-2.2.8-4.5-.6-4.5-3 0-2.6 2.2-4.7 4.8-4.7 3.2 0 5.4 2.5 5.4 5.7 0 4.2-3.4 7.5-7.6 7.5-3.4 0-6.2-2.2-7-5.4" />
    </svg>
  </div>
);

/** Real Termius Group Icon (blue rounded square with 3-node cluster squares) */
export const GroupBadgeIcon: React.FC<{size?: number}> = ({size = 42}) => (
  <div style={{
    width: size, height: size, borderRadius: 12, background: '#0B5A9E',
    display: 'grid', placeItems: 'center', flexShrink: 0,
  }}>
    <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="#fff">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" fillOpacity="0.45" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" fillOpacity="0.45" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" />
    </svg>
  </div>
);

export const CloudHostIcon: React.FC<{bg?: string; size?: number}> = ({bg = '#2563EB', size = 44}) => (
  <div style={{
    width: size, height: size, borderRadius: 12, background: bg,
    display: 'grid', placeItems: 'center', flexShrink: 0,
  }}>
    <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a4 4 0 0 1 0-5.6l1.4-1.4a4 4 0 0 1 5.6 5.6l-.8.8" />
      <path d="M14 11a4 4 0 0 1 0 5.6l-1.4 1.4a4 4 0 0 1-5.6-5.6l.8-.8" />
    </svg>
  </div>
);

export const BroadcastNodesIcon: React.FC<{color?: string; size?: number}> = ({color = '#29D386', size = 20}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="18.5" cy="6.5" r="2.2" />
    <circle cx="18.5" cy="12" r="2.2" />
    <circle cx="18.5" cy="17.5" r="2.2" />
    <path d="M7.2 11.2L16.3 7.3M7.2 12h9.1M7.2 12.8l9.1 3.9" />
  </svg>
);

export const PlayTriangleIcon: React.FC<{color?: string; size?: number}> = ({color = '#29D386', size = 18}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);
