import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { noise2D } from '@remotion/noise';
import { EREKAP_FONT, EREKAP_TOKENS as T } from '../lib/erekapTokens';
import { E, p, pad2, RampSeg } from './motion';

export const sans = EREKAP_FONT.sans;
export const mono = EREKAP_FONT.mono;
export { T };

/* ───────── Latar terang dengan orb noise ───────── */
export const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const orb = (seed: string, x: number, y: number, size: number, c: string, amp: number) => (
    <div
      style={{
        position: 'absolute',
        left: x + noise2D(seed, f * 0.004, 0) * amp - size / 2,
        top: y + noise2D(seed, 0, f * 0.004) * amp - size / 2,
        width: size,
        height: size,
        borderRadius: 999,
        background: `radial-gradient(circle, ${c} 0%, transparent 70%)`,
        filter: 'blur(70px)',
      }}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: T.bg }}>
      {orb('a', 220, 160, 760, 'rgba(163,230,53,0.20)', 120)}
      {orb('b', 1700, 940, 860, 'rgba(10,61,38,0.10)', 110)}
      {orb('c', 1500, 140, 520, 'rgba(16,185,129,0.12)', 90)}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(10,61,38,0.09) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          backgroundPosition: `${(f * 0.25) % 28}px ${(f * 0.15) % 28}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ───────── Frame browser terang ───────── */
export const BrowserFrame: React.FC<{
  width: number;
  contentHeight: number;
  url: string;
  badge?: string;
  children: React.ReactNode;
}> = ({ width, contentHeight, url, badge = 'E-REKAP', children }) => (
  <div
    style={{
      position: 'relative',
      width,
      height: contentHeight + 44,
      borderRadius: 22,
      overflow: 'hidden',
      backgroundColor: '#fff',
      border: '1.5px solid rgba(10,61,38,0.12)',
      boxShadow: '0 40px 80px -22px rgba(10,61,38,0.22), 0 10px 24px -6px rgba(0,0,0,0.05)',
    }}
  >
    <div
      style={{
        height: 44,
        padding: '0 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FBF9',
        borderBottom: '1px solid rgba(10,61,38,0.08)',
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
          <div key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c }} />
        ))}
      </div>
      <div
        style={{
          minWidth: 380,
          padding: '4px 18px',
          borderRadius: 999,
          background: '#fff',
          border: '1px solid rgba(10,61,38,0.1)',
          fontFamily: mono,
          fontSize: 13,
          fontWeight: 600,
          color: T.canopy,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="#15803D" strokeWidth="2.5" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#15803D" strokeWidth="2.5" />
        </svg>
        <span>{url}</span>
      </div>
      <div
        style={{
          padding: '3px 10px',
          borderRadius: 999,
          background: T.surfaceMint,
          border: '1px solid rgba(15,81,50,0.2)',
          fontFamily: mono,
          fontSize: 10,
          fontWeight: 800,
          color: T.canopy,
        }}
      >
        {badge}
      </div>
    </div>
    <div style={{ position: 'relative', height: contentHeight, overflow: 'hidden', background: '#fff' }}>
      {children}
    </div>
  </div>
);

/* ───────── Video dengan speed ramp (potongan kecepatan konstan) ───────── */
export const RampVideo: React.FC<{
  src: string;
  baseFrame: number;
  segs: RampSeg[];
  style?: React.CSSProperties;
}> = ({ src, baseFrame, segs, style }) => {
  let from = 0;
  let srcF = baseFrame;
  return (
    <>
      {segs.map((s, i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={s.frames} layout="none">
            <OffthreadVideo
              src={staticFile(src)}
              startFrom={Math.round(srcF)}
              playbackRate={s.rate}
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', ...style }}
            />
          </Sequence>
        );
        from += s.frames;
        srcF += s.frames * s.rate;
        return el;
      })}
    </>
  );
};

export const PlainVideo: React.FC<{ src: string; startFrom: number; rate?: number }> = ({
  src,
  startFrom,
  rate = 1,
}) => (
  <OffthreadVideo
    src={staticFile(src)}
    startFrom={startFrom}
    playbackRate={rate}
    muted
    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
  />
);

/* ───────── Kursor ───────── */
export const Cursor: React.FC<{ x: number; y: number; click?: number }> = ({ x, y, click = 0 }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      zIndex: 80,
      pointerEvents: 'none',
      transform: `translate(-3px,-3px) scale(${1 - click * 0.14})`,
      filter: 'drop-shadow(0 6px 12px rgba(10,61,38,0.28))',
    }}
  >
    {click > 0 && (
      <div
        style={{
          position: 'absolute',
          left: 3,
          top: 3,
          width: 30 + (1 - click) * 70,
          height: 30 + (1 - click) * 70,
          borderRadius: 999,
          border: `2px solid ${T.lime}`,
          background: 'rgba(163,230,53,0.22)',
          transform: 'translate(-50%,-50%)',
          opacity: click,
        }}
      />
    )}
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path d="M4 3L11.5 21L14.5 13.5L21.5 10.5L4 3Z" fill={T.canopy} stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ───────── Ikon sederhana ───────── */
export type IconName = 'grid' | 'shield' | 'printer' | 'file' | 'devices' | 'db' | 'lock' | 'check' | 'bolt';
export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number }> = ({
  name,
  size = 32,
  color = T.canopy,
  stroke = 2.2,
}) => {
  const c = { stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'grid' && (
        <g {...c}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </g>
      )}
      {name === 'shield' && (
        <g {...c}>
          <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
          <path d="M8.5 12l2.6 2.6L15.8 9.8" />
        </g>
      )}
      {name === 'printer' && (
        <g {...c}>
          <path d="M7 9V3h10v6" />
          <rect x="3" y="9" width="18" height="8" rx="2" />
          <rect x="7" y="14" width="10" height="7" rx="1" />
        </g>
      )}
      {name === 'file' && (
        <g {...c}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4" />
          <path d="M9 12l4 5M13 12l-4 5" />
        </g>
      )}
      {name === 'devices' && (
        <g {...c}>
          <rect x="2" y="5" width="15" height="10" rx="1.5" />
          <path d="M1 18h17" />
          <rect x="16" y="9" width="6" height="11" rx="1.5" />
        </g>
      )}
      {name === 'db' && (
        <g {...c}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
          <path d="M4.5 5.5v6.5c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V5.5" />
          <path d="M4.5 12v6.5c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8V12" />
        </g>
      )}
      {name === 'lock' && (
        <g {...c}>
          <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
          <path d="M8 10.5V7a4 4 0 018 0v3.5" />
        </g>
      )}
      {name === 'check' && (
        <g {...c}>
          <path d="M4 12.5L9.5 18L20 6" />
        </g>
      )}
      {name === 'bolt' && (
        <g {...c}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
        </g>
      )}
    </svg>
  );
};

/* ───────── HUD: header, subtitle, progress ───────── */
export const CHAPTERS = [
  'Preview Project',
  'Keyframe & Speed Ramp',
  'Multi-Device',
  'Dashboard Live',
  'Mode Excel',
  'Cetak A4',
  'Backup & Keamanan',
];

export const Header: React.FC<{ chapter: number; sinceChapter: number; globalFrame: number }> = ({
  chapter,
  sinceChapter,
  globalFrame,
}) => {
  const k = p(sinceChapter, 0, 14);
  const sec = globalFrame / 30;
  return (
    <div
      style={{
        position: 'absolute',
        top: 26,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 1560,
        padding: '9px 22px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(10,61,38,0.12)',
        boxShadow: '0 14px 34px -10px rgba(10,61,38,0.14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 90,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{ width: 28, height: 28, borderRadius: 7 }} />
        <span style={{ fontFamily: sans, fontWeight: 800, fontSize: 16, color: T.canopy, letterSpacing: '-0.02em' }}>E-Rekap</span>
        <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#15803D', background: T.surfaceMint, padding: '2px 7px', borderRadius: 6 }}>
          SHOWREEL
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden', height: 32 }}>
        <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 12, color: T.canopy, background: T.lime, padding: '4px 10px', borderRadius: 999 }}>
          {pad2(chapter + 1)}/{pad2(CHAPTERS.length)}
        </span>
        <span
          style={{
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 17,
            color: T.ink,
            display: 'inline-block',
            transform: `translateY(${(1 - k) * 22}px)`,
            opacity: k,
          }}
        >
          {CHAPTERS[chapter]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: sans, fontSize: 12, fontWeight: 700, color: T.inkMuted }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#10B981' }} />
          MA NU Islamiyah Asembagus
        </span>
        <span style={{ fontFamily: mono, fontWeight: 700, color: T.canopy }}>
          {pad2(sec / 60)}:{pad2(sec % 60)}
        </span>
      </div>
    </div>
  );
};

export const SubtitlePill: React.FC<{ text: string; dur: number }> = ({ text, dur }) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  const inP = p(f, 4, 20);
  const outP = p(f, dur - 14, dur - 2, E.in);
  const speakEnd = dur * 0.78;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 34,
        left: '50%',
        transform: `translate(-50%, ${(1 - inP) * 24 + outP * 12}px)`,
        opacity: inP * (1 - outP),
        padding: '11px 26px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(14px)',
        border: '1.5px solid rgba(10,61,38,0.12)',
        boxShadow: '0 14px 30px -10px rgba(10,61,38,0.14)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 90,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: 999, background: T.lime, boxShadow: `0 0 8px ${T.lime}` }} />
      <span style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>
        {words.map((w, i) => {
          const on = f > 10 + (i / words.length) * (speakEnd - 10);
          return (
            <span key={i} style={{ color: on ? T.canopy : 'rgba(82,96,88,0.55)', marginRight: '0.3em' }}>
              {w}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export const FloatTag: React.FC<{
  label: string;
  sub?: string;
  color?: string;
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  delay?: number;
}> = ({ label, sub, color = T.lime, delay = 0, ...pos }) => {
  const f = useCurrentFrame();
  const k = p(f, delay, delay + 20, E.back);
  return (
    <div
      style={{
        position: 'absolute',
        ...pos,
        opacity: Math.min(1, k * 1.6),
        transform: `scale(${0.8 + 0.2 * k}) translateY(${Math.sin(f * 0.06 + delay) * 5}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px 12px 14px',
        borderRadius: 18,
        background: 'rgba(255,255,255,0.96)',
        border: '1.5px solid rgba(10,61,38,0.14)',
        boxShadow: '0 18px 36px -12px rgba(10,61,38,0.22)',
        zIndex: 70,
      }}
    >
      <span style={{ width: 12, height: 12, borderRadius: 999, background: color, boxShadow: `0 0 10px ${color}` }} />
      <div>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 19, color: T.canopy }}>{label}</div>
        {sub && <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 11, letterSpacing: '0.14em', color: T.inkMuted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
};
