import React from 'react';
import {ModelKey} from '../lib/theme';

export const ModelCoreIcon: React.FC<{m: ModelKey; size?: number; color?: string}> = ({m, size = 64, color}) => {
  if (m === 'argon') {
    // Code & Logic
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#ff9800'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    );
  }
  if (m === 'carbon') {
    // Deep Neural & Quantum Ultra
    const c = color ?? '#4285f4';
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" fill={c} fillOpacity="0.35" />
        <circle cx="12" cy="3.5" r="2" fill={c} />
        <circle cx="12" cy="20.5" r="2" fill={c} />
        <circle cx="3.5" cy="12" r="2" fill={c} />
        <circle cx="20.5" cy="12" r="2" fill={c} />
        <line x1="12" y1="5.5" x2="12" y2="8.5" />
        <line x1="12" y1="15.5" x2="12" y2="18.5" />
        <line x1="5.5" y1="12" x2="8.5" y2="12" />
        <line x1="15.5" y1="12" x2="18.5" y2="12" />
        <line x1="6.5" y1="6.5" x2="9.5" y2="9.5" />
        <line x1="14.5" y1="14.5" x2="17.5" y2="17.5" />
        <line x1="6.5" y1="17.5" x2="9.5" y2="14.5" />
        <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
      </svg>
    );
  }
  // hydrogen: Hyperspeed Bolt & Velocity
  const hc = color ?? '#00e676';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={hc} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={hc} fillOpacity="0.3" />
    </svg>
  );
};
