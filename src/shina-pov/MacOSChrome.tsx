import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const SANS = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const SERIF = 'Georgia, "Times New Roman", serif';
export const MONO = '"JetBrains Mono", "Fira Code", Menlo, monospace';

export const LIGHT = {
  bg: '#F4F6FB',
  surface: '#FFFFFF',
  border: 'rgba(15, 23, 42, 0.08)',
  text: '#0F172A',
  muted: '#64748B',
  blue: '#2563EB',
  red: '#DC2626',
  green: '#059669',
  shadow: '0 22px 60px rgba(15, 23, 42, 0.09), 0 2px 10px rgba(15, 23, 42, 0.04)',
};

export interface CaptionChunk {
  text: string;
  start: number;
  end: number;
}

/** Authentic macOS Light Menu Bar (top of 1920x1080 desktop) */
export const MacMenuBar: React.FC<{
  appTitle: string;
  rightStatus: string;
  progress?: number;
}> = ({appTitle, rightStatus, progress = 0}) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: 46,
    background: 'rgba(255, 255, 255, 0.86)',
    borderBottom: `1px solid ${LIGHT.border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 28px', fontFamily: SANS, zIndex: 20,
  }}>
    {/* Top subtle progress bar */}
    <div style={{
      position: 'absolute', top: 0, left: 0, height: 3,
      width: `${Math.min(100, Math.max(0, progress * 100))}%`,
      background: LIGHT.blue,
    }} />

    <div style={{display: 'flex', alignItems: 'center', gap: 22, fontSize: 16}}>
      {/* Apple-style minimal mark */}
      <svg width="16" height="18" viewBox="0 0 16 18" fill="#0F172A">
        <path d="M12.9 9.5c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.4 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.5 2.1 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.5.6 2.6.6 1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3.1zM10.8 3.5c.6-.7 1-1.7.9-2.7-.8 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
      </svg>
      <span style={{fontWeight: 700, color: LIGHT.text}}>{appTitle}</span>
      <span style={{color: LIGHT.muted, fontWeight: 500}}>File</span>
      <span style={{color: LIGHT.muted, fontWeight: 500}}>Edit</span>
      <span style={{color: LIGHT.muted, fontWeight: 500}}>Agent</span>
      <span style={{color: LIGHT.muted, fontWeight: 500}}>Window</span>
    </div>

    <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 15, fontFamily: MONO}}>
      <span style={{display: 'inline-flex', alignItems: 'center', gap: 7, color: LIGHT.green, fontWeight: 700}}>
        <span style={{width: 8, height: 8, borderRadius: 4, background: LIGHT.green}} />
        SHINA ONLINE
      </span>
      <span style={{color: LIGHT.muted}}>{rightStatus}</span>
      <span style={{color: LIGHT.text, fontWeight: 700}}>21:34</span>
    </div>
  </div>
);

/** Crisp White Polaroid Card for Tuan Rahmat (@rhmtofc) */
export const BossPolaroid: React.FC<{rotate?: number; size?: number}> = ({rotate = 2.5, size = 310}) => (
  <div style={{
    width: size,
    background: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    boxShadow: '0 28px 70px rgba(15, 23, 42, 0.14), 0 2px 10px rgba(15, 23, 42, 0.05)',
    border: `1px solid ${LIGHT.border}`,
    transform: `rotate(${rotate}deg)`,
    fontFamily: SANS,
  }}>
    <div style={{
      width: '100%',
      height: size * 1.02,
      borderRadius: 16,
      overflow: 'hidden',
      background: '#0F172A',
    }}>
      <Img
        src={staticFile('images/rhmtofc-avatar.jpg')}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </div>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 6px 4px',
    }}>
      <div>
        <div style={{fontSize: 22, fontWeight: 800, color: LIGHT.text}}>Rahmat</div>
        <div style={{fontSize: 14, color: LIGHT.muted, fontFamily: MONO}}>@rhmtofc</div>
      </div>
      <div style={{
        padding: '6px 14px', borderRadius: 999,
        background: '#0F172A', color: '#FFFFFF',
        fontSize: 12, fontWeight: 800, letterSpacing: '0.06em',
      }}>
        THE BOSS
      </div>
    </div>
  </div>
);

/** Crisp macOS Window Card with traffic dots */
export const MacWindow: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({title, children, style}) => (
  <div style={{
    background: '#FFFFFF',
    borderRadius: 20,
    border: `1px solid ${LIGHT.border}`,
    boxShadow: LIGHT.shadow,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: SANS,
    ...style,
  }}>
    <div style={{
      height: 44,
      background: '#FAFBFD',
      borderBottom: `1px solid ${LIGHT.border}`,
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
    }}>
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#FF5F57'}} />
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#FEBC2E'}} />
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#28C840'}} />
      <span style={{marginLeft: 10, fontSize: 14, color: LIGHT.muted, fontFamily: MONO, fontWeight: 500}}>
        {title}
      </span>
    </div>
    <div style={{flex: 1, padding: 22, display: 'flex', flexDirection: 'column'}}>
      {children}
    </div>
  </div>
);

/** Floating macOS Dock at bottom of Scene 1 */
export const MacDock: React.FC = () => {
  const icons = [
    {label: 'VS', bg: '#007ACC', color: '#fff'},
    {label: 'CH', bg: '#EA4335', color: '#fff'},
    {label: 'A', bg: '#FFFFFF', color: '#2563EB', active: true},
    {label: 'AI', bg: '#D97706', color: '#fff'},
    {label: 'TM', bg: '#141728', color: '#29D386'},
    {label: 'WA', bg: '#22C55E', color: '#fff'},
    {label: '>_', bg: '#0F172A', color: '#fff'},
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(255,255,255,0.88)',
      border: `1px solid ${LIGHT.border}`,
      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
      borderRadius: 22, padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: MONO,
    }}>
      {icons.map((ic) => (
        <div key={ic.label} style={{
          width: 50, height: 50, borderRadius: 14,
          background: ic.bg, color: ic.color,
          border: ic.active ? `2.5px solid ${LIGHT.blue}` : `1px solid rgba(15,23,42,0.08)`,
          display: 'grid', placeItems: 'center',
          fontSize: ic.active ? 24 : 16, fontWeight: 900,
          boxShadow: ic.active ? '0 8px 20px rgba(37,99,235,0.22)' : 'none',
          position: 'relative',
        }}>
          {ic.label}
          {ic.active && (
            <span style={{
              position: 'absolute', bottom: -8, width: 5, height: 5,
              borderRadius: 3, background: LIGHT.blue,
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

/** Sleek Dark Pill Subtitle (exact lunareaii bottom pill style) */
export const DarkPillSubtitle: React.FC<{captions: CaptionChunk[]; bottomOffset?: number}> = ({
  captions,
  bottomOffset = 42,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  if (!captions.length) return null;

  const active = captions.find((c) => t >= c.start && t <= c.end + 0.15) || captions[captions.length - 1];

  return (
    <div style={{
      position: 'absolute',
      bottom: bottomOffset,
      left: 120,
      right: 120,
      display: 'flex',
      justifyContent: 'center',
      zIndex: 30,
      fontFamily: SANS,
    }}>
      <div style={{
        background: '#111827',
        color: '#FFFFFF',
        padding: '15px 34px',
        borderRadius: 999,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.28)',
        textAlign: 'center',
        maxWidth: 1380,
      }}>
        {active.text}
      </div>
    </div>
  );
};
