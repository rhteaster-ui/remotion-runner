import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';

export type NavTab = 'dashboard' | 'rekap' | 'admin' | 'info';

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const EXPO = Easing.bezier(0.16, 1, 0.3, 1);

/** Hook waktu lokal scene (detik) + helper progres/spring. */
export const useProg = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const now = frame / fps;
  const prog = (from: number, dur = 0.6, easing: (n: number) => number = EXPO) =>
    interpolate(now, [from, from + dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing,
    });
  const spr = (from: number, stiffness = 160, damping = 15) =>
    spring({frame: frame - Math.round(from * fps), fps, config: {stiffness, damping, mass: 0.8}});
  return {frame, fps, now, prog, spr};
};

/* ───────── Reveal: masuk dengan blur + naik + skala ───────── */
export const Reveal: React.FC<{
  at: number;
  y?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, y = 28, blur = 10, style, children}) => {
  const {prog, spr} = useProg();
  const p = prog(at, 0.7);
  const s = spr(at, 150, 16);
  return (
    <div
      style={{
        opacity: clamp(p * 1.5),
        transform: `translateY(${(1 - s) * y}px) scale(${0.965 + 0.035 * s})`,
        filter: blur ? `blur(${(1 - p) * blur}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ───────── Kata-per-kata sinkron VO ───────── */
export const WordReveal: React.FC<{
  words: {t: string; at: number; accent?: boolean}[];
  style?: React.CSSProperties;
  accentColor?: string;
}> = ({words, style, accentColor = T.lime}) => {
  const {prog, spr} = useProg();
  return (
    <div style={{...style}}>
      {words.map((w, i) => {
        const p = prog(w.at, 0.5);
        const s = spr(w.at, 190, 14);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.26em',
              opacity: clamp(p * 1.6),
              transform: `translateY(${(1 - s) * 34}px) scale(${0.9 + 0.1 * s})`,
              filter: `blur(${(1 - p) * 8}px)`,
              color: w.accent ? accentColor : undefined,
            }}
          >
            {w.t}
          </span>
        );
      })}
    </div>
  );
};

/* ───────── Kilau diagonal ───────── */
export const Shine: React.FC<{at: number; dur?: number; radius?: number; alpha?: number}> = ({
  at,
  dur = 0.9,
  radius = 24,
  alpha = 0.5,
}) => {
  const {prog} = useProg();
  const p = prog(at, dur, Easing.inOut(Easing.cubic));
  if (p <= 0 || p >= 1) return null;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: radius, pointerEvents: 'none', zIndex: 15}}>
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          bottom: '-20%',
          width: '34%',
          left: `${interpolate(p, [0, 1], [-45, 125])}%`,
          transform: 'skewX(-18deg)',
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,${alpha}), transparent)`,
        }}
      />
    </div>
  );
};

/* ───────── Percikan lime ───────── */
export const Sparks: React.FC<{at: number; count?: number; radius?: number; color?: string; style?: React.CSSProperties}> = ({
  at,
  count = 16,
  radius = 150,
  color = T.lime,
  style,
}) => {
  const {now} = useProg();
  const u = (now - at) / 0.95;
  if (u < 0 || u > 1) return null;
  const e = Easing.out(Easing.cubic)(u);
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, pointerEvents: 'none', zIndex: 30, ...style}}>
      {Array.from({length: count}).map((_, i) => {
        const a = random(`sa-${at}-${i}`) * Math.PI * 2;
        const d = radius * (0.45 + random(`sd-${at}-${i}`) * 0.75) * e;
        const s = 4 + random(`ss-${at}-${i}`) * 8;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: s,
              height: s,
              borderRadius: 999,
              background: color,
              boxShadow: `0 0 14px ${color}`,
              opacity: (1 - u) * 0.95,
              transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(${1 - u * 0.5})`,
            }}
          />
        );
      })}
    </div>
  );
};

/* ───────── Kursor + ripple (menempel ke elemen target) ───────── */
export const Tap: React.FC<{
  at: number;
  from?: {x: number; y: number};
  approach?: number;
  stay?: number;
  ripple?: string;
}> = ({at, from = {x: 120, y: 140}, approach = 0.55, stay = 0.45, ripple = T.lime}) => {
  const {now} = useProg();
  const a0 = at - approach;
  if (now < a0 - 0.02 || now > at + stay + 0.5) return null;
  const appr = interpolate(now, [a0, at], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const leave = interpolate(now, [at + stay, at + stay + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const x = from.x * (1 - appr) + 26 * leave;
  const y = from.y * (1 - appr) + 46 * leave;
  const press = interpolate(now, [at - 0.07, at + 0.04, at + 0.2], [1, 0.8, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const op = interpolate(now, [a0, a0 + 0.18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * (1 - leave);
  const rp = interpolate(now, [at, at + 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 40, pointerEvents: 'none'}}>
      {rp > 0 && rp < 1 && (
        <>
          <div style={{position: 'absolute', width: 30 + rp * 170, height: 30 + rp * 170, left: -(15 + rp * 85), top: -(15 + rp * 85), borderRadius: 999, border: `3px solid ${ripple}`, opacity: (1 - rp) * 0.85}} />
          <div style={{position: 'absolute', width: 20 + rp * 90, height: 20 + rp * 90, left: -(10 + rp * 45), top: -(10 + rp * 45), borderRadius: 999, background: ripple, opacity: (1 - rp) * 0.35}} />
        </>
      )}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        style={{position: 'absolute', left: 0, top: 0, opacity: op, transform: `translate(${x}px, ${y}px) scale(${press})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.35))'}}
      >
        <path d="M4 2 L4 19 L8.6 14.8 L11.8 22 L14.6 20.8 L11.5 13.8 L17.8 13.4 Z" fill="#FFFFFF" stroke="#0B1410" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/* ───────── Ambient: aurora + partikel + grid ───────── */
export const Ambient: React.FC<{dark: boolean}> = ({dark}) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const orbs = [
    {x: 82, y: 8, r: 760, c: dark ? 'rgba(163,230,53,0.22)' : 'rgba(163,230,53,0.20)', sp: 0.32, ph: 0},
    {x: 6, y: 72, r: 880, c: dark ? 'rgba(17,87,55,0.55)' : 'rgba(17,87,55,0.10)', sp: 0.22, ph: 2},
    {x: 60, y: 96, r: 700, c: dark ? 'rgba(52,211,153,0.14)' : 'rgba(52,211,153,0.12)', sp: 0.27, ph: 4},
  ];
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {orbs.map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${o.x + Math.sin(t * o.sp + o.ph) * 9}%`,
            top: `${o.y + Math.cos(t * o.sp * 1.2 + o.ph) * 5}%`,
            width: o.r,
            height: o.r,
            marginLeft: -o.r / 2,
            marginTop: -o.r / 2,
            borderRadius: 999,
            background: `radial-gradient(circle, ${o.c} 0%, transparent 66%)`,
          }}
        />
      ))}
      {dark && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage: 'linear-gradient(to right, #A3E635 1px, transparent 1px), linear-gradient(to bottom, #A3E635 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            backgroundPosition: `0px ${(t * 9) % 54}px`,
            maskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 0%, transparent 72%)',
          }}
        />
      )}
      {Array.from({length: 26}).map((_, i) => {
        const x = random(`px${i}`) * 1080 + Math.sin(t * 0.6 + i) * 16;
        const sp = 16 + random(`ps${i}`) * 38;
        const y = (((random(`py${i}`) * 1920 - t * sp) % 1920) + 1920) % 1920;
        const s = 3 + random(`pz${i}`) * 7;
        const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + i * 1.7);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: 999,
              background: dark ? '#BEF264' : T.canopyMid,
              boxShadow: dark ? '0 0 12px rgba(190,242,100,0.8)' : 'none',
              opacity: (dark ? 0.5 : 0.16) * tw,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{dark: boolean}> = ({dark}) => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: dark
        ? 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(2,14,8,0.55) 100%)'
        : 'radial-gradient(ellipse at 50% 45%, transparent 62%, rgba(10,61,38,0.10) 100%)',
    }}
  />
);

/* ───────── Transisi tirai lime (menutup potongan antar-scene) ───────── */
export const TransitionSweep: React.FC<{atFrame: number; half?: number}> = ({atFrame, half = 12}) => {
  const frame = useCurrentFrame();
  const u = interpolate(frame, [atFrame - half, atFrame + half], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (u <= 0 || u >= 1) return null;
  const ease = Easing.inOut(Easing.cubic);
  const xLead = interpolate(ease(u), [0, 1], [-106, 106]);
  const xLag = interpolate(ease(clamp(u - 0.09)), [0, 1], [-106, 106]);
  const iconP = Math.pow(Math.sin(Math.PI * u), 3);
  const panel = (x: number, bg: string, z: number): React.CSSProperties => ({
    position: 'absolute',
    top: '-8%',
    height: '116%',
    left: '-35%',
    width: '170%',
    background: bg,
    transform: `translateX(${x}%) skewX(-14deg)`,
    zIndex: z,
  });
  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 80, overflow: 'hidden'}}>
      <div style={panel(xLag, `linear-gradient(160deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`, 1)} />
      <div style={panel(xLead, `linear-gradient(160deg, ${T.limeHover} 0%, ${T.lime} 100%)`, 2)}>
        <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 10, background: 'rgba(255,255,255,0.85)', boxShadow: '0 0 40px rgba(255,255,255,0.9)'}} />
      </div>
      <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, opacity: iconP}}>
        <div style={{width: 188, height: 188, borderRadius: 48, background: T.canopyDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.7 + 0.4 * iconP}) rotate(${(u - 0.5) * 24}deg)`, boxShadow: '0 30px 70px rgba(7,41,25,0.55)'}}>
          <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{width: 128, height: 128, objectFit: 'contain'}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Shell aplikasi (UI sama persis dengan source) ───────── */
const TAB_ORDER: NavTab[] = ['dashboard', 'rekap', 'admin', 'info'];

export const PremiumShell: React.FC<{
  mode: 'dark' | 'light';
  from: NavTab;
  moves: {t: number; tab: NavTab}[];
  accessLabel: string;
  adminLabel?: string;
  adminMix?: number;
  icons: Record<NavTab, React.ReactNode>;
  labels: Record<NavTab, string>;
  children: React.ReactNode;
}> = ({mode, from, moves, accessLabel, adminLabel, adminMix = 0, icons, labels, children}) => {
  const {frame, now, prog} = useProg();
  const dark = mode === 'dark';
  const topP = prog(0.1, 0.7);
  const dockP = prog(0.2, 0.8);
  const idxF = moves.reduce(
    (acc, m) => interpolate(prog(m.t, 0.55), [0, 1], [acc, TAB_ORDER.indexOf(m.tab)]),
    TAB_ORDER.indexOf(from)
  );
  const zoom = 1 + frame * 0.00009;
  const pulse = 0.55 + 0.45 * Math.sin(now * 4);
  const label = adminMix > 0.5 && adminLabel ? adminLabel : accessLabel;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? T.canopyDeep : T.bg,
        backgroundImage: dark ? `linear-gradient(165deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)` : undefined,
        fontFamily: EREKAP_FONT.sans,
        color: dark ? '#FFFFFF' : T.ink,
      }}
    >
      <Ambient dark={dark} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '62px 52px 246px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `scale(${zoom})`,
          transformOrigin: '50% 42%',
        }}
      >
        {/* App bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderRadius: 24,
            backgroundColor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.92)',
            border: dark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${T.border}`,
            boxShadow: dark ? 'none' : T.shadowCard,
            opacity: topP,
            transform: `translateY(${(1 - topP) * -24}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{width: 44, height: 44, borderRadius: 12, objectFit: 'contain'}} />
            <div>
              <div style={{fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1}}>E-Rekap</div>
              <div style={{fontSize: 15, fontWeight: 600, color: dark ? 'rgba(220,252,231,0.78)' : T.inkMuted}}>Sistem Rekapitulasi Kehadiran</div>
            </div>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 999,
              backgroundColor: adminMix > 0.5 ? T.lime : dark ? 'rgba(255,255,255,0.12)' : T.surfaceMint,
              color: adminMix > 0.5 ? T.limeInk : dark ? '#FFFFFF' : T.canopy,
              fontSize: 16,
              fontWeight: 800,
              border: dark ? '1px solid rgba(255,255,255,0.14)' : `1px solid ${T.borderStrong}`,
              boxShadow: adminMix > 0.5 ? '0 0 24px rgba(163,230,53,0.55)' : 'none',
            }}
          >
            <span style={{width: 9, height: 9, borderRadius: 999, backgroundColor: adminMix > 0.5 ? T.canopyDeep : T.lime, boxShadow: `0 0 ${6 + pulse * 8}px ${T.lime}`}} />
            <span>{label}</span>
          </div>
        </div>

        {/* Stage */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', paddingTop: 12, paddingBottom: 12, position: 'relative'}}>{children}</div>

        {/* Dock dengan indikator meluncur */}
        <div
          style={{
            alignSelf: 'center',
            width: '100%',
            maxWidth: 760,
            position: 'relative',
            backgroundColor: dark ? 'rgba(6, 28, 17, 0.94)' : 'rgba(11, 20, 16, 0.94)',
            borderRadius: 30,
            padding: '10px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: T.shadowDock,
            opacity: dockP,
            transform: `translateY(${(1 - dockP) * 40}px)`,
          }}
        >
          <div style={{position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8}}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 'calc((100% - 24px) / 4)',
                left: `calc(${idxF} * ((100% - 24px) / 4 + 8px))`,
                borderRadius: 22,
                backgroundColor: T.canopy,
                border: '1px solid rgba(163,230,53,0.4)',
                boxShadow: '0 0 22px rgba(163,230,53,0.25)',
              }}
            />
            {TAB_ORDER.map((id, i) => {
              const active = Math.abs(idxF - i) < 0.5;
              return (
                <div
                  key={id}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '12px 10px',
                    color: active ? T.lime : 'rgba(255,255,255,0.62)',
                    fontWeight: active ? 800 : 600,
                    fontSize: 17,
                  }}
                >
                  {icons[id]}
                  <span>{labels[id]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Vignette dark={dark} />
    </AbsoluteFill>
  );
};
