import React from 'react';
import {Img, staticFile} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';

interface StudioBrowserProps {
  src: string;
  url: string;
  badge?: string;
  height?: number | string;
  zoom?: number;
  panY?: number;
  panX?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const StudioBrowser: React.FC<StudioBrowserProps> = ({
  src,
  url,
  badge = 'Mode Review (Publik)',
  height = 540,
  zoom = 1,
  panY = 0,
  panX = 0,
  style,
  children,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        border: `1.5px solid ${T.borderStrong}`,
        boxShadow: '0 28px 60px -16px rgba(7, 41, 25, 0.35), 0 4px 16px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          height: 48,
          backgroundColor: '#F8FAF9',
          borderBottom: `1px solid ${T.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Window controls */}
        <div style={{display: 'flex', alignItems: 'center', gap: 7}}>
          <div style={{width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444'}} />
          <div style={{width: 12, height: 12, borderRadius: 6, backgroundColor: '#F59E0B'}} />
          <div style={{width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981'}} />
        </div>

        {/* Address Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: '#FFFFFF',
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: '4px 16px',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: EREKAP_FONT.mono,
            color: T.inkMuted,
            maxWidth: 460,
            width: '100%',
            justifyContent: 'center',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{color: T.canopy, fontWeight: 700}}>https://</span>
          <span>{url}</span>
        </div>

        {/* Badge */}
        <div
          style={{
            fontFamily: EREKAP_FONT.mono,
            fontSize: 11,
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 999,
            backgroundColor: T.surfaceMint,
            color: T.canopy,
            border: `1px solid ${T.borderStrong}`,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {badge}
        </div>
      </div>

      {/* Screen Viewport with Pan/Zoom */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height,
          overflow: 'hidden',
          backgroundColor: '#0F172A',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
            transformOrigin: 'top center',
            transition: 'transform 0.1s linear',
          }}
        >
          <Img
            src={staticFile(src)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

interface StudioMobileProps {
  src: string;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

export const StudioMobile: React.FC<StudioMobileProps> = ({
  src,
  height = 560,
  width = 270,
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 36,
        padding: 8,
        backgroundColor: '#1E293B',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.15)',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Screen Chassis */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 7,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 76,
            height: 18,
            borderRadius: 9,
            backgroundColor: '#000000',
            zIndex: 30,
          }}
        />

        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};
