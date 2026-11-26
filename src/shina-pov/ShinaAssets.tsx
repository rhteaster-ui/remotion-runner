import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {LIGHT as L, MONO, SANS} from './MacOSChrome';

/** Sleek, authentic Google Antigravity geometric ribbon 'A' vector logo */
export const AntigravityLogo: React.FC<{size?: number}> = ({size = 44}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="agyLeft" x1="12" y1="54" x2="34" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="55%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#34A853" />
      </linearGradient>
      <linearGradient id="agyRight" x1="30" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBC05" />
        <stop offset="50%" stopColor="#EA4335" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    {/* Left ascending wing */}
    <path
      d="M11 53L28.2 12.2C29.4 9.3 34.6 9.3 35.8 12.2L39.5 21L23.2 53C21.6 56 17.5 56.5 14.2 55.4C11.4 54.5 10.2 54.8 11 53Z"
      fill="url(#agyLeft)"
    />
    {/* Right descending wing */}
    <path
      d="M35.8 12.2L53 53C53.8 54.8 51.8 56.5 48.8 55.4C45.5 54.3 43.2 52.2 41.2 47.6L32 26.2L35.8 12.2Z"
      fill="url(#agyRight)"
    />
    {/* Anti-gravity floating arc */}
    <path
      d="M23 41C27.5 36.2 36.5 36.2 41 41"
      stroke="#0F172A"
      strokeWidth="4.2"
      strokeLinecap="round"
      strokeOpacity="0.18"
    />
  </svg>
);

/** Crisp Hiyori Shiina Portrait Card with live speaking waveform & Antigravity badge */
export const ShinaPortraitCard: React.FC<{
  size?: number;
  statusText?: string;
  showEngine?: boolean;
  rotate?: number;
}> = ({size = 300, statusText = 'SHINA · ONLINE', showEngine = true, rotate = -2}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 14) * 4;

  return (
    <div style={{
      width: size,
      background: '#FFFFFF',
      borderRadius: 26,
      padding: 14,
      border: `1.5px solid rgba(37, 99, 235, 0.16)`,
      boxShadow: '0 28px 70px rgba(37, 99, 235, 0.13), 0 4px 16px rgba(15, 23, 42, 0.06)',
      transform: `translateY(${bob}px) rotate(${rotate}deg)`,
      fontFamily: SANS,
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: size * 0.96,
        borderRadius: 18,
        overflow: 'hidden',
        background: '#EEF2FA',
        position: 'relative',
      }}>
        <Img
          src={staticFile('images/shina-pov/hiyori-shina.jpg')}
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
        />
        {/* Live speaking equalizer pill */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.92)', borderRadius: 999,
          padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 12px rgba(15,23,42,0.10)',
        }}>
          <span style={{width: 8, height: 8, borderRadius: 4, background: L.green}} />
          <span style={{fontFamily: MONO, fontSize: 11, fontWeight: 800, color: L.text}}>{statusText}</span>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 6px 2px',
      }}>
        <div>
          <div style={{fontSize: 21, fontWeight: 800, color: L.text}}>Shina</div>
          <div style={{fontSize: 13, color: L.muted, fontFamily: MONO}}>Hiyori Shiina AI</div>
        </div>
        {showEngine && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 11px', borderRadius: 999,
            background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.2)',
            fontSize: 12, fontWeight: 800, color: L.blue, fontFamily: MONO,
          }}>
            <AntigravityLogo size={16} />
            <span>AGY</span>
          </div>
        )}
      </div>
    </div>
  );
};

/** Mini circular Shina avatar for chat/headers */
export const ShinaMiniAvatar: React.FC<{size?: number}> = ({size = 54}) => (
  <div style={{
    width: size, height: size, borderRadius: Math.round(size * 0.28),
    overflow: 'hidden', border: '2px solid #2563EB', flexShrink: 0,
    background: '#EEF2FA',
  }}>
    <Img
      src={staticFile('images/shina-pov/hiyori-shina.jpg')}
      style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
    />
  </div>
);

/** Crisp vector macOS Dock with authentic app icons (no plain letter boxes) */
export const RichMacDock: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(255,255,255,0.92)',
    border: `1px solid ${L.border}`,
    boxShadow: '0 16px 42px rgba(15, 23, 42, 0.13)',
    borderRadius: 22, padding: '10px 18px',
    display: 'flex', alignItems: 'center', gap: 16,
  }}>
    {/* VS Code */}
    <div style={{width: 48, height: 48, borderRadius: 13, background: '#007ACC', display: 'grid', placeItems: 'center'}}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </div>
    {/* Termius official icon */}
    <Img src={staticFile('images/termius-icon.png')} style={{width: 48, height: 48, borderRadius: 13}} />
    {/* Antigravity Engine (Active) */}
    <div style={{
      width: 52, height: 52, borderRadius: 14, background: '#FFFFFF',
      border: `2.5px solid ${L.blue}`, display: 'grid', placeItems: 'center',
      boxShadow: '0 8px 20px rgba(37,99,235,0.22)', position: 'relative',
    }}>
      <AntigravityLogo size={32} />
      <span style={{position: 'absolute', bottom: -8, width: 6, height: 6, borderRadius: 3, background: L.blue}} />
    </div>
    {/* WhatsApp */}
    <div style={{width: 48, height: 48, borderRadius: 13, background: '#22C55E', display: 'grid', placeItems: 'center'}}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </div>
    {/* TikTok */}
    <div style={{width: 48, height: 48, borderRadius: 13, background: '#0F172A', display: 'grid', placeItems: 'center'}}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
      </svg>
    </div>
    {/* GitHub Actions */}
    <div style={{width: 48, height: 48, borderRadius: 13, background: '#1E293B', display: 'grid', placeItems: 'center'}}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </div>
  </div>
);
