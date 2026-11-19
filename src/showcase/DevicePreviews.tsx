import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {Shine} from '../premium/fx';

export const BrowserPreview: React.FC<{
  width?: number;
  startFrom?: number;
  url?: string;
  badge?: string;
  dark?: boolean;
  shineAt?: number;
  style?: React.CSSProperties;
}> = ({
  width = 964,
  startFrom = 0,
  url = 'rhmt.biz.id/xiiclass',
  badge = 'DESKTOP LIVE',
  dark = true,
  shineAt,
  style,
}) => {
  const chromeH = 54;
  // Exact 1440x900 (16:10) aspect ratio of record_laptop.mp4
  const videoH = Math.round(width * (900 / 1440));

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: dark ? '#0A2E1D' : '#FFFFFF',
        border: dark
          ? '2px solid rgba(163, 230, 53, 0.34)'
          : `2px solid ${T.borderStrong}`,
        boxShadow: dark
          ? '0 32px 72px -18px rgba(0, 0, 0, 0.72), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 28px 60px -16px rgba(10, 61, 38, 0.24), 0 4px 12px rgba(10, 61, 38, 0.08)',
        ...style,
      }}
    >
      {/* Top Browser Chrome */}
      <div
        style={{
          height: chromeH,
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: dark ? '#051F13' : T.canopyDeep,
          borderBottom: '1px solid rgba(163, 230, 53, 0.18)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 9}}>
          <div style={{width: 12, height: 12, borderRadius: 999, backgroundColor: '#EF4444'}} />
          <div style={{width: 12, height: 12, borderRadius: 999, backgroundColor: '#F59E0B'}} />
          <div style={{width: 12, height: 12, borderRadius: 999, backgroundColor: T.lime}} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.09)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            fontFamily: EREKAP_FONT.mono,
            fontSize: 15,
            fontWeight: 600,
            color: '#E7F5EC',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: T.lime,
              boxShadow: `0 0 8px ${T.lime}`,
            }}
          />
          {url}
        </div>

        <div
          style={{
            padding: '4px 12px',
            borderRadius: 999,
            backgroundColor: 'rgba(163, 230, 53, 0.16)',
            border: '1px solid rgba(163, 230, 53, 0.4)',
            fontFamily: EREKAP_FONT.mono,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: T.limeHover,
          }}
        >
          {badge}
        </div>
      </div>

      {/* Exact 16:10 Viewport Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: videoH,
          backgroundColor: '#F1F5F2',
          overflow: 'hidden',
        }}
      >
        <OffthreadVideo
          src={staticFile('video/record_laptop.mp4')}
          startFrom={startFrom}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(155deg, rgba(255,255,255,0.06) 0%, transparent 32%)',
            pointerEvents: 'none',
          }}
        />
        {shineAt !== undefined && <Shine at={shineAt} radius={0} alpha={0.35} />}
      </div>
    </div>
  );
};

export const MobilePreview: React.FC<{
  width?: number;
  startFrom?: number;
  dark?: boolean;
  shineAt?: number;
  style?: React.CSSProperties;
}> = ({width = 330, startFrom = 0, dark = true, shineAt, style}) => {
  const bezel = 12;
  const innerW = width - bezel * 2;
  // Exact 412x892 mobile ratio
  const innerH = Math.round(innerW * (892 / 412));

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: innerH + bezel * 2,
        padding: bezel,
        borderRadius: 42,
        background: 'linear-gradient(155deg, #134E33 0%, #072919 60%, #04190F 100%)',
        border: dark
          ? '2px solid rgba(163, 230, 53, 0.48)'
          : '2px solid rgba(10, 61, 38, 0.35)',
        boxShadow:
          '0 28px 64px -14px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255,255,255,0.22)',
        ...style,
      }}
    >
      {/* Screen */}
      <div
        style={{
          position: 'relative',
          width: innerW,
          height: innerH,
          borderRadius: 31,
          overflow: 'hidden',
          backgroundColor: '#F1F5F2',
        }}
      >
        <OffthreadVideo
          src={staticFile('video/record_mobile.mp4')}
          startFrom={startFrom}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Minimalist Punch-Hole Camera Dot (Never blocks web header text) */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 12,
            borderRadius: 999,
            backgroundColor: '#051B11',
            border: '1.5px solid rgba(163, 230, 53, 0.25)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
          }}
        />
        {shineAt !== undefined && <Shine at={shineAt} radius={31} alpha={0.3} />}
      </div>
    </div>
  );
};
