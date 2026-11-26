import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {LIGHT as L, MONO, SANS} from './MacOSChrome';

/** 100% Real Official Google Antigravity Icon (from rhmt-dashboard/public/agy-official.png) */
export const AntigravityLogo: React.FC<{size?: number}> = ({size = 44}) => (
  <Img
    src={staticFile('images/shina-pov/agy-official.png')}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      display: 'block',
      flexShrink: 0,
    }}
  />
);

/** Official Shina .menu Banner Portrait Card (hiyori_shina_banner.jpg cropped cleanly on Hiyori Shiina) */
export const ShinaPortraitCard: React.FC<{
  size?: number;
  statusText?: string;
  showEngine?: boolean;
  rotate?: number;
  shake?: number;
}> = ({size = 300, statusText = 'HIYORI SHIINA', showEngine = true, rotate = -2, shake = 0}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 13) * 5;

  return (
    <div style={{
      width: size,
      background: '#FFFFFF',
      borderRadius: 26,
      padding: 14,
      border: `1.5px solid rgba(37, 99, 235, 0.20)`,
      boxShadow: '0 28px 72px rgba(37, 99, 235, 0.16), 0 4px 16px rgba(15, 23, 42, 0.07)',
      transform: `translate(${shake}px, ${bob}px) rotate(${rotate}deg)`,
      fontFamily: SANS,
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: size * 0.96,
        borderRadius: 18,
        overflow: 'hidden',
        background: '#1E293B',
        position: 'relative',
      }}>
        <Img
          src={staticFile('images/shina-pov/hiyori_shina_banner.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '74% 16%',
            transform: 'scale(1.18)',
          }}
        />
        {/* Live status badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,255,255,0.92)', borderRadius: 999,
          padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 12px rgba(15,23,42,0.14)',
        }}>
          <span style={{width: 8, height: 8, borderRadius: 4, background: L.green}} />
          <span style={{fontFamily: MONO, fontSize: 11, fontWeight: 800, color: L.text}}>{statusText}</span>
        </div>

        {/* Live speaking audio bars */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(15,23,42,0.78)', borderRadius: 999,
          padding: '6px 10px', display: 'flex', alignItems: 'flex-end', gap: 3, height: 26,
        }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                width: 3.5,
                height: 6 + Math.abs(Math.sin(f / 4 + i * 1.4)) * 11,
                borderRadius: 2,
                background: '#38BDF8',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 6px 2px',
      }}>
        <div>
          <div style={{fontSize: 22, fontWeight: 800, color: L.text}}>Shina</div>
          <div style={{fontSize: 13, color: L.muted, fontFamily: MONO}}>Hiyori Shiina AI</div>
        </div>
        {showEngine && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 11px', borderRadius: 999,
            background: '#EFF6FF', border: '1px solid rgba(37,99,235,0.22)',
            fontSize: 12, fontWeight: 800, color: L.blue, fontFamily: MONO,
          }}>
            <AntigravityLogo size={17} />
            <span>AGY</span>
          </div>
        )}
      </div>
    </div>
  );
};

/** Mini circular Shina avatar using official menu banner */
export const ShinaMiniAvatar: React.FC<{size?: number}> = ({size = 54}) => (
  <div style={{
    width: size, height: size, borderRadius: Math.round(size * 0.28),
    overflow: 'hidden', border: '2px solid #2563EB', flexShrink: 0,
    background: '#1E293B',
  }}>
    <Img
      src={staticFile('images/shina-pov/hiyori_shina_banner.jpg')}
      style={{
        width: '100%', height: '100%', objectFit: 'cover',
        objectPosition: '74% 16%', transform: 'scale(1.22)',
      }}
    />
  </div>
);

/** Crisp vector macOS Dock with official Antigravity & Termius icons */
export const RichMacDock: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(255,255,255,0.92)',
    border: `1px solid ${L.border}`,
    boxShadow: '0 18px 46px rgba(15, 23, 42, 0.14)',
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
    {/* Official Termius icon */}
    <Img src={staticFile('images/termius-icon.png')} style={{width: 48, height: 48, borderRadius: 13}} />
    {/* Official Google Antigravity Engine (Active) */}
    <div style={{
      width: 54, height: 54, borderRadius: 15, background: '#FFFFFF',
      border: `2.5px solid ${L.blue}`, display: 'grid', placeItems: 'center',
      boxShadow: '0 10px 24px rgba(37,99,235,0.24)', position: 'relative',
    }}>
      <AntigravityLogo size={36} />
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
