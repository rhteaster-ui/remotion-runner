import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {E, EIO, FPS, L, MONO, SANS, SERIF, clamp, pad2, pop, ramp} from './theme';

export const OVERLAP = 12;
const SFCtx = createContext(0);
export const SceneFrameProvider = SFCtx.Provider;
export const useSF = () => useCurrentFrame() - useContext(SFCtx);

export const STAGE_TOP = 60;
export const STAGE_H = 824;

export const img = (p: string) => staticFile(`images/elainacloud/${p}`);

export const Sfx: React.FC<{at: number; file: string; vol?: number; dur?: number}> = ({
  at,
  file,
  vol = 0.48,
  dur = 90,
}) => {
  const offset = useContext(SFCtx);
  return (
    <Sequence from={at + offset} durationInFrames={dur} layout="none">
      <Audio src={staticFile(`audio/sfx/${file}.mp3`)} volume={vol} />
    </Sequence>
  );
};

export const Typing: React.FC<{at: number; count: number; gap?: number; vol?: number}> = ({
  at,
  count,
  gap = 2,
  vol = 0.22,
}) => (
  <>
    {Array.from({length: count}).map((_, i) => (
      <Sfx key={i} at={at + i * gap} file={`key${(i % 4) + 1}`} vol={vol} dur={8} />
    ))}
  </>
);

export const Backdrop: React.FC<{a?: string; b?: string; c?: string; dot?: string}> = ({
  a = 'rgba(37,99,235,0.16)',
  b = 'rgba(16,185,129,0.12)',
  c = 'rgba(6,182,212,0.11)',
  dot = 'rgba(37,99,235,0.20)',
}) => {
  const f = useCurrentFrame();
  const n = (seed: string, k: number, amp: number) => noise2D(seed, f / 200 + k, k * 3.1) * amp;
  return (
    <AbsoluteFill style={{background: L.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: -60,
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.065) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          transform: `translate(${(f * 0.22) % 36}px, ${(f * 0.16) % 36}px)`,
        }}
      />
      <div style={{position: 'absolute', left: -200 + n('o1', 0, 240), top: -240 + n('o1', 7, 190), width: 980, height: 980, borderRadius: '50%', background: `radial-gradient(circle, ${a} 0%, transparent 66%)`}} />
      <div style={{position: 'absolute', right: -220 + n('o2', 2, 240), bottom: -280 + n('o2', 9, 190), width: 1060, height: 1060, borderRadius: '50%', background: `radial-gradient(circle, ${b} 0%, transparent 66%)`}} />
      <div style={{position: 'absolute', left: 720 + n('o3', 4, 300), top: 260 + n('o3', 5, 200), width: 680, height: 680, borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, transparent 66%)`}} />
      {Array.from({length: 14}).map((_, i) => {
        const sp = 0.5 + random(`ep-sp${i}`) * 1.0;
        const y = 1100 - ((f * sp + random(`ep-y${i}`) * 1200) % 1200);
        const s = 4 + random(`ep-z${i}`) * 7;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: random(`ep-x${i}`) * 1920 + Math.sin(f / 42 + i) * 14,
              top: y,
              width: s,
              height: s,
              borderRadius: '50%',
              background: dot,
              opacity: 0.55,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export type Variant = 'none' | 'wipe' | 'iris' | 'rise' | 'soft' | 'doors' | 'zoom';

export const Reveal: React.FC<{variant: Variant; accent?: string; children: React.ReactNode}> = ({
  variant,
  accent = L.blue,
  children,
}) => {
  const f = useSF();
  const p = ramp(f, -OVERLAP, 8, 0, 1, EIO);
  const done = variant === 'none' || p >= 1;
  const st: React.CSSProperties = {};
  let overlay: React.ReactNode = null;

  if (!done) {
    if (variant === 'wipe') {
      const X = -20 + p * 140;
      st.clipPath = `polygon(0 0, ${X + 10}% 0, ${X - 10}% 100%, 0 100%)`;
      overlay = (
        <div style={{position: 'absolute', inset: 0, clipPath: `polygon(${X + 10}% 0, ${X + 19}% 0, ${X - 1}% 100%, ${X - 10}% 100%)`, background: `linear-gradient(180deg, ${accent}, ${L.emerald})`}} />
      );
    } else if (variant === 'iris') {
      const R = p * 1500;
      st.clipPath = `circle(${R}px at 50% 50%)`;
      overlay = <div style={{position: 'absolute', left: 960 - R, top: 540 - R, width: R * 2, height: R * 2, borderRadius: '50%', border: `12px solid ${accent}`, opacity: 1 - p * 0.6}} />;
    } else if (variant === 'rise') {
      st.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
      st.transform = `translateY(${(1 - p) * 70}px)`;
      overlay = <div style={{position: 'absolute', left: 0, right: 0, top: (1 - p) * 1080 + (1 - p) * 70, height: 10, background: `linear-gradient(90deg, ${accent}, ${L.cyan})`}} />;
    } else if (variant === 'doors') {
      st.clipPath = `inset(0 ${(1 - p) * 50}% 0 ${(1 - p) * 50}%)`;
      overlay = (
        <>
          <div style={{position: 'absolute', top: 0, bottom: 0, left: `${50 - p * 50}%`, width: 8, background: accent}} />
          <div style={{position: 'absolute', top: 0, bottom: 0, left: `${50 + p * 50}%`, width: 8, background: accent}} />
        </>
      );
    } else if (variant === 'soft') {
      st.opacity = p;
      st.filter = `blur(${(1 - p) * 20}px)`;
      st.transform = `scale(${1.05 - 0.05 * p})`;
    } else if (variant === 'zoom') {
      st.transform = `scale(${1.2 - 0.2 * p})`;
      st.opacity = clamp(p * 1.8);
      overlay = <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: Math.sin(Math.PI * p) * 0.72}} />;
    }
  }
  return (
    <AbsoluteFill>
      <AbsoluteFill style={st}>{children}</AbsoluteFill>
      {overlay}
    </AbsoluteFill>
  );
};

export type BackdropTone = {a?: string; b?: string; c?: string; dot?: string};

export const SceneShell: React.FC<{
  variant: Variant;
  accent?: string;
  tone?: BackdropTone;
  children: React.ReactNode;
}> = ({variant, accent, tone, children}) => (
  <Reveal variant={variant} accent={accent}>
    <Backdrop {...tone} />
    <div style={{position: 'absolute', left: 0, right: 0, top: STAGE_TOP, height: STAGE_H}}>{children}</div>
  </Reveal>
);

export const ElainaLogo: React.FC<{s?: number; radius?: number}> = ({s = 44, radius = 12}) => (
  <Img src={img('brand/logo.png')} style={{width: s, height: s, borderRadius: radius, objectFit: 'cover', display: 'block', flexShrink: 0}} />
);

export const Check: React.FC<{s?: number; color?: string}> = ({s = 22, color = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 12.5 10 18.5 20 6" />
  </svg>
);

export const ShieldIcon: React.FC<{s?: number; color?: string}> = ({s = 28, color = L.emerald}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ServerIcon: React.FC<{s?: number; color?: string}> = ({s = 28, color = L.blue}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="7" rx="2" />
    <rect x="2" y="14" width="20" height="7" rx="2" />
    <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
    <line x1="6" y1="17.5" x2="6.01" y2="17.5" />
  </svg>
);

export const BoltIcon: React.FC<{s?: number; color?: string}> = ({s = 28, color = L.amber}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const TerminalIcon: React.FC<{s?: number; color?: string}> = ({s = 26, color = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const QrisIcon: React.FC<{s?: number; color?: string}> = ({s = 26, color = '#fff'}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h2" />
  </svg>
);

export const MacWindow: React.FC<{
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  dark?: boolean;
}> = ({title, children, style, bodyStyle, dark}) => (
  <div style={{background: dark ? '#0B1220' : '#fff', borderRadius: 22, border: `1px solid ${L.border}`, boxShadow: L.shadowLg, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: SANS, ...style}}>
    <div style={{height: 46, flexShrink: 0, background: dark ? '#111A2E' : '#FAFBFD', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : L.border}`, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 9}}>
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#FF5F57'}} />
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#FEBC2E'}} />
      <span style={{width: 12, height: 12, borderRadius: 6, background: '#28C840'}} />
      <span style={{marginLeft: 12, fontSize: 15, color: dark ? '#94A3B8' : L.muted, fontFamily: MONO, fontWeight: 600}}>{title}</span>
    </div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden', ...bodyStyle}}>{children}</div>
  </div>
);

export const Chip: React.FC<{children: React.ReactNode; color?: string; bg?: string; style?: React.CSSProperties}> = ({children, color = L.text, bg = '#fff', style}) => (
  <span style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 12, background: bg, border: `1px solid ${L.border}`, boxShadow: '0 6px 16px rgba(15,23,42,0.06)', fontFamily: MONO, fontSize: 16, fontWeight: 700, color, ...style}}>{children}</span>
);

export const Serif: React.CSSProperties = {fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400};

export const KText: React.FC<{words: {t: string; style?: React.CSSProperties}[]; at?: number; stagger?: number; style?: React.CSSProperties}> = ({words, at = 0, stagger = 4, style}) => {
  const f = useSF();
  return (
    <div style={{fontFamily: SANS, ...style}}>
      {words.map((w, i) => {
        const s = pop(f, at + i * stagger, 14, 150);
        return (
          <span key={i} style={{display: 'inline-block', marginRight: '0.26em', opacity: clamp(s * 1.6), transform: `translateY(${(1 - s) * 44}px) scale(${0.9 + 0.1 * s})`, filter: `blur(${(1 - clamp(s)) * 9}px)`, ...w.style}}>{w.t}</span>
        );
      })}
    </div>
  );
};

export const Cursor: React.FC<{path: {f: number; x: number; y: number}[]; clicks?: number[]; scale?: number}> = ({path, clicks = [], scale = 1.4}) => {
  const f = useSF();
  const fs = path.map((p) => p.f);
  const x = interpolate(f, fs, path.map((p) => p.x), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E});
  const y = interpolate(f, fs, path.map((p) => p.y), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E});
  const vis = ramp(f, fs[0], fs[0] + 8);
  const press = clicks.some((c) => f >= c && f < c + 5) ? 0.85 : 1;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, zIndex: 60, opacity: vis, pointerEvents: 'none'}}>
      {clicks.map((c, i) => {
        const k = f - c;
        if (k < 0 || k > 18) return null;
        return <div key={i} style={{position: 'absolute', left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: '50%', border: `4px solid ${L.blue}`, opacity: 1 - k / 18, transform: `scale(${0.3 + k / 12})`}} />;
      })}
      <svg width={30 * scale} height={30 * scale} viewBox="0 0 26 28" style={{position: 'absolute', left: x, top: y, transform: `scale(${press})`, transformOrigin: '2px 2px', filter: 'drop-shadow(0 4px 6px rgba(15,23,42,0.3))'}}>
        <path d="M2 2 L2 22 L7.5 17.2 L11 25.5 L14.6 24 L11.2 15.8 L18.6 15.6 Z" fill="#fff" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const CONF = [L.blue, L.emerald, L.cyan, L.amber, L.violet];
export const Confetti: React.FC<{at: number; x?: number; y?: number; count?: number; power?: number}> = ({at, x = 960, y = 420, count = 65, power = 22}) => {
  const f = useSF();
  const k = f - at;
  if (k < 0 || k > 90) return null;
  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        const a = -Math.PI / 2 + (random(`ec-a${i}`) - 0.5) * 2.4;
        const v = power * (0.4 + random(`ec-v${i}`) * 0.8);
        const px = x + Math.cos(a) * v * k * 0.6;
        const py = y + Math.sin(a) * v * k * 0.6 + 0.5 * 1.1 * k * k * 0.5;
        return <div key={i} style={{position: 'absolute', left: px, top: py, width: 10 + random(`ec-w${i}`) * 8, height: 6 + random(`ec-h${i}`) * 8, background: CONF[i % CONF.length], transform: `rotate(${k * (6 + random(`ec-r${i}`) * 12)}deg)`, opacity: 1 - clamp((k - 55) / 35), borderRadius: 2, zIndex: 65}} />;
      })}
    </>
  );
};

export const MenuBar: React.FC<{sectionTitle: string; status: string; progress: number; sceneFrame: number}> = ({sectionTitle, status, progress, sceneFrame}) => {
  const tin = pop(sceneFrame, 0, 16, 180);
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 46, zIndex: 80, background: 'rgba(255,255,255,0.9)', borderBottom: `1px solid ${L.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', fontFamily: SANS}}>
      <div style={{position: 'absolute', top: 0, left: 0, height: 3, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${L.blue}, ${L.cyan}, ${L.emerald})`}} />
      <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 16}}>
        <ElainaLogo s={24} radius={6} />
        <span style={{fontWeight: 800, color: L.text, letterSpacing: '-0.02em'}}>ELAINACLOUD</span>
        <span style={{color: L.muted}}>·</span>
        <span style={{fontWeight: 700, color: L.blue, opacity: tin, transform: `translateY(${(1 - tin) * -8}px)`}}>{sectionTitle}</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 15, fontFamily: MONO}}>
        <span style={{display: 'inline-flex', alignItems: 'center', gap: 7, color: L.green, fontWeight: 800}}>
          <span style={{width: 8, height: 8, borderRadius: 4, background: L.green, opacity: 0.6 + 0.4 * Math.sin(sceneFrame / 5)}} />
          PANEL 24/7 ONLINE
        </span>
        <span style={{color: L.muted, opacity: tin}}>{status}</span>
        <span style={{color: L.text, fontWeight: 800}}>elainacloud.my.id</span>
      </div>
    </div>
  );
};

export const ChapterTag: React.FC<{no: number; title: string; sceneFrame: number}> = ({no, title, sceneFrame}) => {
  const a = pop(sceneFrame, 4, 16, 170);
  const out = ramp(sceneFrame, 68, 84, 1, 0);
  if (sceneFrame > 86) return null;
  return (
    <div style={{position: 'absolute', top: 60, left: '50%', zIndex: 82, transform: `translate(-50%, ${(1 - a) * -28}px)`, opacity: clamp(a * 2) * out, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '9px 22px 9px 11px', borderRadius: 999, background: 'rgba(15,23,42,0.92)', color: '#fff', fontFamily: SANS, boxShadow: '0 12px 30px rgba(15,23,42,0.24)'}}>
      <span style={{padding: '4px 12px', borderRadius: 999, background: L.blue, fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: '0.08em'}}>{pad2(no)}</span>
      <span style={{fontSize: 17, fontWeight: 700}}>{title}</span>
    </div>
  );
};

const DOCK = [
  {id: 'elaina', bg: '#fff', node: <ElainaLogo s={38} radius={10} />},
  {id: 'panel', bg: L.blue, node: <ServerIcon s={28} color="#fff" />},
  {id: 'wa', bg: L.wa, node: <Img src={img('tools/whatsapp.svg')} style={{width: 28, height: 28, filter: 'brightness(0) invert(1)'}} />},
  {id: 'term', bg: '#0F172A', node: <TerminalIcon s={26} color="#34D399" />},
  {id: 'node', bg: '#EFF6FF', node: <Img src={img('brand/de.png')} style={{width: 30, height: 20, borderRadius: 4, objectFit: 'cover'}} />},
  {id: 'qris', bg: L.emerald, node: <QrisIcon s={26} color="#fff" />},
  {id: 'cta', bg: '#111827', node: <BoltIcon s={26} color="#FBBF24" />},
];

export const Dock: React.FC<{active: string; sceneFrame: number}> = ({active, sceneFrame}) => {
  const lift = pop(sceneFrame, 2, 7, 220);
  return (
    <div style={{position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 80, background: 'rgba(255,255,255,0.92)', border: `1px solid ${L.border}`, boxShadow: '0 18px 46px rgba(15,23,42,0.13)', borderRadius: 24, padding: '9px 16px', display: 'flex', alignItems: 'flex-end', gap: 13, height: 68}}>
      {DOCK.map((d) => {
        const on = d.id === active;
        return (
          <div key={d.id} style={{position: 'relative', width: 48, height: 48, borderRadius: 14, background: d.bg, border: d.bg === '#fff' || d.bg === '#EFF6FF' ? `1.5px solid ${L.border}` : 'none', display: 'grid', placeItems: 'center', overflow: 'hidden', transform: `translateY(${on ? -9 * lift : 0}px) scale(${on ? 1 + 0.16 * lift : 1})`, boxShadow: on ? '0 12px 24px rgba(37,99,235,0.26)' : 'none'}}>
            {d.node}
          </div>
        );
      })}
    </div>
  );
};

export type WordTiming = {word: string; start: number; end: number};
const KEYWORDS = /^(elaina|cloud|gratis|3|5\.000|25\.000|24|1\.099|30|pterodactyl|baileys|discord|sftp|anti-ddos|99,9%|frankfurt|intel|xeon|qris|bca|deploy|elainacloud\.my\.id)$/i;

export const WordSyncCaption: React.FC<{wordTimings: WordTiming[]; f: number; accent?: string}> = ({
  wordTimings,
  f,
  accent = '#7DD3FC',
}) => {
  const t = f / FPS;
  if (!wordTimings.length) return null;

  // Group into balanced 7-word chunks for crisp readability
  const CHUNK = 7;
  const chunks: WordTiming[][] = [];
  for (let i = 0; i < wordTimings.length; i += CHUNK) {
    chunks.push(wordTimings.slice(i, i + CHUNK));
  }

  let activeIdx = 0;
  chunks.forEach((ch, idx) => {
    if (t >= ch[0].start - 0.08) activeIdx = idx;
  });

  const ch = chunks[activeIdx];
  const enter = pop(f - Math.max(0, ch[0].start * FPS), 0, 16, 190);

  return (
    <div style={{position: 'absolute', left: 140, right: 140, bottom: 100, display: 'flex', justifyContent: 'center', zIndex: 85, fontFamily: SANS}}>
      <div style={{background: 'rgba(15,23,42,0.93)', color: '#fff', padding: '14px 34px', borderRadius: 999, fontSize: 29, fontWeight: 700, letterSpacing: '-0.01em', boxShadow: '0 18px 44px rgba(15,23,42,0.3)', textAlign: 'center', maxWidth: 1520, lineHeight: 1.25, opacity: clamp(enter * 2), transform: `translateY(${(1 - enter) * 18}px)`}}>
        {ch.map((w, i) => {
          const clean = w.word.replace(/[.,!?—:]/g, '');
          const isKey = KEYWORDS.test(clean);
          const spoken = t >= w.start - 0.04;
          const activeNow = t >= w.start - 0.04 && t <= w.end + 0.12;
          return (
            <span
              key={`${activeIdx}-${i}`}
              style={{
                display: 'inline-block',
                marginRight: '0.28em',
                color: activeNow ? (isKey ? '#34D399' : accent) : isKey ? accent : spoken ? '#FFFFFF' : 'rgba(255,255,255,0.52)',
                transform: activeNow ? 'translateY(-1.5px) scale(1.04)' : 'none',
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
