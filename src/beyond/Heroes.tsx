import React, { useMemo } from 'react';
import { random, useCurrentFrame } from 'remotion';
import { noise2D } from '@remotion/noise';
import { E, p } from './theme';

type HeroProps = { size: number };

const Defs: React.FC = () => (
  <defs>
    <filter id="blur6" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
    <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
    <filter id="blur30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30" /></filter>
  </defs>
);

/* ═══════════════ OpenAI · kosmik ═══════════════ */

export const Galaxy: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const R = size / 2;
  const stars = useMemo(
    () =>
      Array.from({ length: 1000 }).map((_, i) => {
        const r = Math.pow(random(`gr${i}`), 0.75);
        const th = r * 6.2 + (i % 3) * ((Math.PI * 2) / 3) + (random(`gt${i}`) - 0.5) * (0.9 - r * 0.55);
        return { r, th, s: 0.7 + random(`gs${i}`) * 2.3, o: 0.35 + random(`go${i}`) * 0.65 };
      }),
    []
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="gcore">
          <stop offset="0" stopColor="#FFF1CF" stopOpacity="0.95" />
          <stop offset="0.22" stopColor="#FFD08A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#6B7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`rotate(-22 ${R} ${R})`}>
        <ellipse cx={R} cy={R} rx={R} ry={R * 0.6} fill="url(#gcore)" opacity={0.6} />
        {stars.map((s, i) => {
          const th = s.th + f * 0.006 * (1.3 - s.r);
          const x = R + Math.cos(th) * s.r * R * 0.96;
          const y = R + Math.sin(th) * s.r * R * 0.56;
          const tw = 0.7 + 0.3 * Math.sin(f * 0.05 + i);
          return <circle key={i} cx={x} cy={y} r={s.s * (size / 700)} fill={`hsl(${40 + s.r * 190}, 75%, ${s.r < 0.2 ? 88 : 78}%)`} opacity={s.o * tw} />;
        })}
        <circle cx={R} cy={R} r={R * 0.05} fill="#FFF6DF" />
      </g>
    </svg>
  );
};

export const Sun: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const R = size * 0.27;
  const grains = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        a: random(`sa${i}`) * Math.PI * 2,
        d: Math.sqrt(random(`sd${i}`)) * 0.92,
        r: 0.05 + random(`sr${i}`) * 0.1,
        dark: random(`sk${i}`) > 0.5,
      })),
    []
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <defs>
        <radialGradient id="sunbody">
          <stop offset="0" stopColor="#FFF7DA" />
          <stop offset="0.4" stopColor="#FFC857" />
          <stop offset="0.8" stopColor="#FF8A1F" />
          <stop offset="1" stopColor="#E5560E" />
        </radialGradient>
        <radialGradient id="sunglow">
          <stop offset="0.3" stopColor="#FF9A2E" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FF6A1A" stopOpacity="0" />
        </radialGradient>
        <clipPath id="sunclip"><circle cx={c} cy={c} r={R} /></clipPath>
      </defs>
      <circle cx={c} cy={c} r={R * 2.1} fill="url(#sunglow)" />
      {Array.from({ length: 44 }).map((_, i) => {
        const a = (i / 44) * Math.PI * 2 + f * 0.0025;
        const len = R * (0.2 + 0.28 * (0.5 + 0.5 * noise2D(`ray${i}`, f * 0.03, 0)));
        const x1 = c + Math.cos(a) * R * 0.98;
        const y1 = c + Math.sin(a) * R * 0.98;
        return <line key={i} x1={x1} y1={y1} x2={x1 + Math.cos(a) * len} y2={y1 + Math.sin(a) * len} stroke="#FFB454" strokeWidth={size * 0.007} strokeLinecap="round" opacity={0.55} />;
      })}
      <circle cx={c} cy={c} r={R} fill="url(#sunbody)" />
      <g clipPath="url(#sunclip)">
        {grains.map((g, i) => {
          const dx = noise2D(`gx${i}`, f * 0.012, 0) * R * 0.05;
          const dy = noise2D(`gy${i}`, 0, f * 0.012) * R * 0.05;
          return <circle key={i} cx={c + Math.cos(g.a) * g.d * R + dx} cy={c + Math.sin(g.a) * g.d * R + dy} r={g.r * R} fill={g.dark ? 'rgba(170,50,0,0.14)' : 'rgba(255,255,255,0.12)'} />;
        })}
      </g>
      {[0.6, 2.4, 4.3].map((a0, i) => {
        const a = a0 + f * 0.003 * (i + 1);
        const x1 = c + Math.cos(a) * R;
        const y1 = c + Math.sin(a) * R;
        const x2 = c + Math.cos(a + 0.5) * R;
        const y2 = c + Math.sin(a + 0.5) * R;
        const mx = c + Math.cos(a + 0.25) * R * (1.45 + 0.1 * Math.sin(f * 0.05 + i));
        const my = c + Math.sin(a + 0.25) * R * (1.45 + 0.1 * Math.sin(f * 0.05 + i));
        return <path key={i} d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke="#FF8A1F" strokeWidth={size * 0.012} strokeLinecap="round" opacity={0.8} />;
      })}
    </svg>
  );
};

export const Earth: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const R = size * 0.31;
  const Wd = R * 4;
  const { land, clouds } = useMemo(
    () => ({
      land: Array.from({ length: 36 }).map((_, i) => ({ x: random(`ex${i}`) * Wd, y: -R * 0.8 + random(`ey${i}`) * R * 1.6, rx: R * (0.1 + random(`erx${i}`) * 0.34), ry: R * (0.06 + random(`ery${i}`) * 0.17), t: random(`et${i}`) })),
      clouds: Array.from({ length: 30 }).map((_, i) => ({ x: random(`cx${i}`) * Wd, y: -R * 0.9 + random(`cy${i}`) * R * 1.8, rx: R * (0.16 + random(`crx${i}`) * 0.3), ry: R * 0.035 })),
    }),
    [Wd, R]
  );
  const shift = (f * 0.9) % Wd;
  const cshift = (f * 1.35) % Wd;
  const copies = [0, Wd];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <defs>
        <clipPath id="eclip"><circle cx={c} cy={c} r={R} /></clipPath>
        <radialGradient id="eshade" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0.35" stopColor="rgba(0,8,30,0)" />
          <stop offset="1" stopColor="rgba(0,6,24,0.82)" />
        </radialGradient>
        <linearGradient id="eocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F6FC4" />
          <stop offset="1" stopColor="#123A7A" />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={R * 1.07} fill="none" stroke="#7FB8FF" strokeWidth={size * 0.018} opacity={0.55} filter="url(#blur14)" />
      <g clipPath="url(#eclip)">
        <rect x={c - R} y={c - R} width={R * 2} height={R * 2} fill="url(#eocean)" />
        {copies.map((o) => (
          <g key={o} transform={`translate(${c - R - shift + o} ${c})`}>
            {land.map((l, i) => (
              <ellipse key={i} cx={l.x} cy={l.y} rx={l.rx} ry={l.ry} fill={l.t > 0.55 ? '#6E9B52' : '#A9955C'} opacity={0.95} />
            ))}
          </g>
        ))}
        <rect x={c - R} y={c - R} width={R * 2} height={R * 0.14} fill="#F2F6FA" opacity={0.9} />
        <rect x={c - R} y={c + R * 0.86} width={R * 2} height={R * 0.14} fill="#F2F6FA" opacity={0.9} />
        {copies.map((o) => (
          <g key={`c${o}`} transform={`translate(${c - R - cshift + o} ${c})`}>
            {clouds.map((l, i) => (
              <ellipse key={i} cx={l.x} cy={l.y} rx={l.rx} ry={l.ry} fill="#FFFFFF" opacity={0.5} />
            ))}
          </g>
        ))}
        <circle cx={c} cy={c} r={R} fill="url(#eshade)" />
      </g>
      <circle cx={c} cy={c} r={R} fill="none" stroke="#9CCBFF" strokeWidth={2} opacity={0.6} />
    </svg>
  );
};

export const Moon: React.FC<HeroProps & { phase?: number }> = ({ size, phase }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const R = size * 0.3;
  const k = phase ?? p(f, 6, 150, E.inOut);
  const craters = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => {
        const a = random(`ma${i}`) * Math.PI * 2;
        const d = Math.sqrt(random(`md${i}`)) * 0.88;
        return { x: Math.cos(a) * d, y: Math.sin(a) * d, r: 0.03 + random(`mr${i}`) * 0.085 };
      }),
    []
  );
  const shadowX = c - R * (0.12 + 2.1 * k);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <defs>
        <radialGradient id="moonbody" cx="0.62" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#F1EFE8" />
          <stop offset="0.6" stopColor="#B7B5AC" />
          <stop offset="1" stopColor="#74726B" />
        </radialGradient>
        <clipPath id="moonclip"><circle cx={c} cy={c} r={R} /></clipPath>
      </defs>
      <circle cx={c} cy={c} r={R * 1.25} fill="#BBD0FF" opacity={0.06 + 0.12 * k} filter="url(#blur30)" />
      <circle cx={c} cy={c} r={R} fill="url(#moonbody)" />
      <g clipPath="url(#moonclip)">
        {[[-0.25, -0.2, 0.34], [0.3, 0.1, 0.28], [-0.1, 0.45, 0.22], [0.35, -0.4, 0.18]].map(([x, y, r], i) => (
          <circle key={i} cx={c + x * R} cy={c + y * R} r={r * R} fill="#8C8A82" opacity={0.42} />
        ))}
        {craters.map((cr, i) => (
          <g key={i}>
            <circle cx={c + cr.x * R} cy={c + cr.y * R} r={cr.r * R} fill="rgba(70,68,62,0.28)" />
            <circle cx={c + cr.x * R + cr.r * R * 0.18} cy={c + cr.y * R + cr.r * R * 0.18} r={cr.r * R * 0.78} fill="rgba(255,255,255,0.1)" />
          </g>
        ))}
        <circle cx={shadowX} cy={c} r={R * 1.04} fill="#04060F" opacity={0.95} />
      </g>
      <circle cx={c} cy={c} r={R} fill="none" stroke="rgba(220,228,255,0.35)" strokeWidth={1.5} />
    </svg>
  );
};

/* ═══════════════ Google · unsur ═══════════════ */

export const HydrogenAtom: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const a0 = size * 0.07;
  const cloud = useMemo(
    () =>
      Array.from({ length: 560 }).map((_, i) => {
        const r = (-Math.log(1 - random(`h1${i}`) * 0.999) - Math.log(1 - random(`h2${i}`) * 0.999) - Math.log(1 - random(`h3${i}`) * 0.999)) * 0.5 * a0;
        const ct = random(`h4${i}`) * 2 - 1;
        const ph = random(`h5${i}`) * Math.PI * 2;
        const st = Math.sqrt(1 - ct * ct);
        return { x: r * st * Math.cos(ph), y: r * st * Math.sin(ph), o: 0.25 + random(`h6${i}`) * 0.6 };
      }),
    [a0]
  );
  const rx = size * 0.36;
  const ry = size * 0.15;
  const ang = f * 0.075;
  const ex = Math.cos(ang) * rx;
  const ey = Math.sin(ang) * ry;
  const tilt = -28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <circle cx={c} cy={c} r={a0 * 3.2} fill="#F58AC9" opacity={0.18} filter="url(#blur30)" />
      {cloud.map((d, i) => (
        <circle key={i} cx={c + d.x} cy={c + d.y} r={size * 0.0036} fill="#F9B4DD" opacity={d.o * (0.75 + 0.25 * Math.sin(f * 0.06 + i))} />
      ))}
      <g transform={`rotate(${tilt} ${c} ${c})`}>
        <ellipse cx={c} cy={c} rx={rx} ry={ry} fill="none" stroke="rgba(245,138,201,0.55)" strokeWidth={2} strokeDasharray="4 10" />
        <circle cx={c + ex} cy={c + ey} r={size * 0.03} fill="#FFE3F3" filter="url(#blur6)" />
        <circle cx={c + ex} cy={c + ey} r={size * 0.016} fill="#FFFFFF" />
      </g>
      <circle cx={c} cy={c} r={size * 0.03} fill="#FFD4EA" filter="url(#blur6)" />
      <circle cx={c} cy={c} r={size * 0.016} fill="#FFFFFF" />
    </svg>
  );
};

export const CarbonLattice: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const a = size * 0.052;
  const hexes = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let j = -8; j <= 8; j++) for (let i = -8; i <= 8; i++) out.push({ x: a * Math.sqrt(3) * (i + j / 2), y: a * 1.5 * j });
    return out;
  }, [a]);
  const pts = (cx: number, cy: number) =>
    Array.from({ length: 6 }).map((_, k) => {
      const ang = (Math.PI / 3) * k + Math.PI / 6;
      return [cx + Math.cos(ang) * a, cy + Math.sin(ang) * a] as const;
    });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="cfade"><stop offset="0.55" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
        <mask id="cmask"><rect width={size} height={size} fill="url(#cfade)" /></mask>
      </defs>
      <g mask="url(#cmask)" transform={`rotate(${Math.sin(f * 0.01) * 4} ${c} ${c})`}>
        {hexes.map((h, i) => {
          const cx = c + h.x;
          const cy = c + h.y;
          const d = Math.hypot(h.x, h.y);
          const pulse = Math.sin(d * 0.035 - f * 0.1);
          const op = 0.3 + 0.45 * Math.max(0, pulse);
          const vs = pts(cx, cy);
          return (
            <g key={i}>
              <polygon points={vs.map((v) => v.join(',')).join(' ')} fill="none" stroke="#7F9BB3" strokeWidth={2} opacity={op} />
              {vs.map((v, k) => (
                <circle key={k} cx={v[0]} cy={v[1]} r={size * (0.006 + 0.004 * Math.max(0, pulse))} fill="#E7F1FA" opacity={0.4 + 0.6 * Math.max(0, pulse)} />
              ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const NE_N = 'M60 400 L60 110 L250 400 L250 110';
const NE_E = 'M360 280 L520 280 C520 150 340 140 340 270 C340 400 490 420 535 345';

export const NeonTube: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const flick = f < 50 ? (noise2D('ign', f * 0.6, 0) > -0.1 || f > 38 ? 1 : 0.15) : 0.93 + 0.07 * noise2D('nf', f * 0.15, 0);
  const sc = size / 600;
  const layers: [number, string, number, string | undefined][] = [
    [64, '#FF3D00', 0.28, 'url(#blur30)'],
    [34, '#FF5A1F', 0.55, 'url(#blur14)'],
    [16, '#FF7A3D', 1, 'url(#blur6)'],
    [11, '#FFB38A', 1, undefined],
    [4, '#FFF3EA', 1, undefined],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" style={{ overflow: 'visible' }}>
      <Defs />
      <g transform="translate(0 40)">
        <rect x={20} y={70} width={560} height={400} rx={28} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" />
        {[NE_N, NE_E].map((d, i) => (
          <g key={i}>
            {layers.map(([w, col, o, fil], k) => (
              <path key={k} d={d} fill="none" stroke={col} strokeWidth={w * Math.max(0.8, sc)} strokeLinecap="round" strokeLinejoin="round" opacity={o * flick} filter={fil} />
            ))}
          </g>
        ))}
        {[[60, 400], [250, 110], [360, 280], [535, 345]].map(([x, y], i) => (
          <rect key={i} x={x - 9} y={y - 9} width={18} height={18} rx={4} fill="#2A2E33" stroke="#555B63" />
        ))}
      </g>
    </svg>
  );
};

export const ArgonPlasma: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const R = size * 0.38;
  const fil = Array.from({ length: 13 });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <defs>
        <radialGradient id="aglass" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#2A1F5C" /><stop offset="0.7" stopColor="#120C2E" /><stop offset="1" stopColor="#0A0720" />
        </radialGradient>
        <clipPath id="aclip"><circle cx={c} cy={c} r={R} /></clipPath>
      </defs>
      <circle cx={c} cy={c} r={R * 1.12} fill="#8A7CFF" opacity={0.18} filter="url(#blur30)" />
      <circle cx={c} cy={c} r={R} fill="url(#aglass)" stroke="rgba(190,175,255,0.5)" strokeWidth={2} />
      <g clipPath="url(#aclip)">
        {fil.map((_, i) => {
          const base = (i / fil.length) * Math.PI * 2 + noise2D(`ab${i}`, f * 0.012, 0) * 0.5;
          const pts = Array.from({ length: 9 }).map((__, k) => {
            const t = k / 8;
            const jitter = noise2D(`aj${i}-${k}`, f * 0.07, 0) * R * 0.13 * Math.sin(t * Math.PI);
            const ang = base + noise2D(`ak${i}-${k}`, 0, f * 0.03) * 0.25 * t;
            return `${c + Math.cos(ang) * R * 1.02 * t + Math.cos(ang + 1.57) * jitter},${c + Math.sin(ang) * R * 1.02 * t + Math.sin(ang + 1.57) * jitter}`;
          });
          const d = `M${pts.join(' L')}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#8A7CFF" strokeWidth={9} opacity={0.35} filter="url(#blur6)" />
              <path d={d} fill="none" stroke="#D7CEFF" strokeWidth={2.4} opacity={0.9} strokeLinecap="round" />
            </g>
          );
        })}
        <circle cx={c} cy={c} r={R * 0.17} fill="#EDE8FF" filter="url(#blur14)" />
        <circle cx={c} cy={c} r={R * 0.07} fill="#FFFFFF" />
      </g>
      <ellipse cx={c - R * 0.35} cy={c - R * 0.45} rx={R * 0.22} ry={R * 0.11} fill="rgba(255,255,255,0.12)" transform={`rotate(-30 ${c - R * 0.35} ${c - R * 0.45})`} />
      <rect x={c - R * 0.22} y={c + R * 0.96} width={R * 0.44} height={R * 0.2} rx={10} fill="#1C1836" stroke="rgba(190,175,255,0.35)" />
    </svg>
  );
};

/* ═══════════════ Anthropic · seni (di atas kertas washi) ═══════════════ */

const INK = '#14171C';
const LAPIS = '#2A3C9A';
const GOLD = '#8A6A1E';

export const Score: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const w = size * 1.05;
  const h = size * 0.6;
  const y0 = h * 0.28;
  const gap = h * 0.075;
  const pitches = [0, 2, 4, 2, 5, 4, 2, 0, -1, 1, 3, 1, 4, 6, 4, 2];
  const x0 = w * 0.1;
  const xs = (i: number) => x0 + 20 + (i * (w * 0.84)) / pitches.length;
  const yOf = (pt: number) => y0 + 4 * gap - (pt * gap) / 2;
  const play = p(f, 20, 200, E.lin) * (w * 0.84) + x0;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={x0} x2={x0 + (w * 0.88) * p(f, i * 4, 40 + i * 4)} y1={y0 + i * gap} y2={y0 + i * gap} stroke={INK} strokeWidth={2} />
      ))}
      {[x0, x0 + w * 0.44, x0 + w * 0.88].map((x, i) => (
        <line key={i} x1={x} x2={x} y1={y0} y2={y0 + 4 * gap} stroke={INK} strokeWidth={i === 2 ? 5 : 2.4} opacity={p(f, 20 + i * 6, 40 + i * 6)} />
      ))}
      {pitches.map((pt, i) => {
        const x = xs(i);
        const y = yOf(pt);
        const q = p(f, 24 + i * 9, 38 + i * 9, E.back);
        const up = pt < 3;
        return (
          <g key={i} opacity={Math.min(1, q * 1.6)} transform={`translate(0 ${(1 - q) * -14})`}>
            <ellipse cx={x} cy={y} rx={gap * 0.66} ry={gap * 0.46} transform={`rotate(-20 ${x} ${y})`} fill={INK} />
            <line x1={up ? x + gap * 0.62 : x - gap * 0.62} x2={up ? x + gap * 0.62 : x - gap * 0.62} y1={y} y2={up ? y - gap * 3.2 : y + gap * 3.2} stroke={INK} strokeWidth={2.4} />
            {pt === 0 || pt === 6 ? <line x1={x - gap} x2={x + gap} y1={y} y2={y} stroke={INK} strokeWidth={2} /> : null}
          </g>
        );
      })}
      <line x1={play} x2={play} y1={y0 - gap * 1.4} y2={y0 + 4 * gap + gap * 1.4} stroke={LAPIS} strokeWidth={3} opacity={0.9} />
      <circle cx={play} cy={y0 - gap * 1.4} r={6} fill={LAPIS} />
    </svg>
  );
};

export const SonnetLines: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const rhyme = 'ABABCDCDEFEFGG'.split('');
  const w = size * 0.95;
  const lh = size * 0.052;
  const groups = [4, 4, 4, 2];
  let idx = 0;
  const rows: { y: number; i: number }[] = [];
  groups.forEach((g, gi) => {
    for (let k = 0; k < g; k++) rows.push({ y: gi * lh * 0.9 + idx * lh * 1.25, i: idx++ });
  });
  return (
    <svg width={w + 90} height={size * 0.95} viewBox={`0 0 ${w + 90} ${size * 0.95}`} style={{ overflow: 'visible' }}>
      {rows.map(({ y, i }) => {
        const words = Array.from({ length: 5 + Math.floor(random(`sw${i}`) * 3) }).map((_, k) => 0.07 + random(`sl${i}-${k}`) * 0.13);
        const total = words.reduce((a, b) => a + b, 0) + words.length * 0.035;
        const scale = (0.78 + 0.22 * random(`ss${i}`)) / total;
        const draw = p(f, 10 + i * 7, 30 + i * 7);
        let x = 0;
        return (
          <g key={i}>
            {words.map((wl, k) => {
              const len = wl * scale * w;
              const x0 = x;
              x += len + 0.035 * scale * w;
              const seg = Math.max(0, Math.min(1, (draw * w - x0) / len));
              return <rect key={k} x={x0} y={y} width={len * seg} height={lh * 0.34} rx={lh * 0.17} fill={INK} opacity={0.86} />;
            })}
            <text x={w + 28} y={y + lh * 0.34} fontFamily="Newsreader, serif" fontStyle="italic" fontSize={lh * 0.82} fill={LAPIS} opacity={p(f, 30 + i * 7, 44 + i * 7)}>
              {rhyme[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const Enso: React.FC<HeroProps & { dots?: boolean }> = ({ size, dots = true }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const R = size * 0.34;
  const circ = 2 * Math.PI * R;
  const draw = p(f, 8, 70, E.out);
  const dash = circ * 0.93 * draw;
  const dotRows = [5, 7, 5];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={size * 0.03} />
        </filter>
      </defs>
      <g filter="url(#rough)" transform={`rotate(-70 ${c} ${c})`}>
        <circle cx={c} cy={c} r={R} fill="none" stroke={INK} strokeWidth={size * 0.06} strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} opacity={0.92} />
        <circle cx={c} cy={c} r={R * 0.985} fill="none" stroke={INK} strokeWidth={size * 0.016} strokeLinecap="round" strokeDasharray={`${dash * 0.97} ${circ}`} opacity={0.55} />
      </g>
      {dots &&
        dotRows.map((n, r) => (
          <g key={r}>
            {Array.from({ length: n }).map((_, k) => {
              const q = p(f, 70 + r * 22 + k * 4, 84 + r * 22 + k * 4, E.back);
              const spread = size * 0.052;
              return <circle key={k} cx={c + (k - (n - 1) / 2) * spread} cy={c - size * 0.07 + r * size * 0.075} r={size * 0.012 * q} fill={r === 1 ? LAPIS : INK} />;
            })}
          </g>
        ))}
    </svg>
  );
};

export const FableBook: React.FC<HeroProps> = ({ size }) => {
  const f = useCurrentFrame();
  const c = size / 2;
  const bw = size * 0.34;
  const by = size * 0.62;
  const path = `M${c} ${by - 6} C ${c - size * 0.2} ${by - size * 0.35}, ${c + size * 0.24} ${by - size * 0.4}, ${c + size * 0.05} ${size * 0.1}`;
  const L = 900;
  const draw = p(f, 10, 110, E.out);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <Defs />
      <path d={`M${c} ${by} C ${c - bw * 0.4} ${by - 22}, ${c - bw * 0.8} ${by - 22}, ${c - bw} ${by - 6} L ${c - bw} ${by + size * 0.22} C ${c - bw * 0.8} ${by + size * 0.2}, ${c - bw * 0.4} ${by + size * 0.2}, ${c} ${by + size * 0.24} Z`} fill="rgba(255,255,255,0.35)" stroke={INK} strokeWidth={3} />
      <path d={`M${c} ${by} C ${c + bw * 0.4} ${by - 22}, ${c + bw * 0.8} ${by - 22}, ${c + bw} ${by - 6} L ${c + bw} ${by + size * 0.22} C ${c + bw * 0.8} ${by + size * 0.2}, ${c + bw * 0.4} ${by + size * 0.2}, ${c} ${by + size * 0.24} Z`} fill="rgba(255,255,255,0.5)" stroke={INK} strokeWidth={3} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} opacity={p(f, 6 + i * 4, 22 + i * 4)}>
          <line x1={c - bw * 0.85} x2={c - bw * 0.12 - (i % 2) * 28} y1={by + 24 + i * 26} y2={by + 24 + i * 26} stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
          <line x1={c + bw * 0.12} x2={c + bw * 0.85 - (i % 3) * 22} y1={by + 24 + i * 26} y2={by + 24 + i * 26} stroke={INK} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
        </g>
      ))}
      <path d={path} fill="none" stroke={GOLD} strokeWidth={14} strokeLinecap="round" opacity={0.28} strokeDasharray={`${L * draw} ${L * 2}`} filter="url(#blur6)" />
      <path d={path} fill="none" stroke={GOLD} strokeWidth={4.5} strokeLinecap="round" strokeDasharray={`${L * draw} ${L * 2}`} />
      {Array.from({ length: 16 }).map((_, i) => {
        const t = ((f * 0.006 + random(`fs${i}`)) % 1);
        const x = c + (random(`fx${i}`) - 0.5) * size * 0.34 + Math.sin(t * 6 + i) * 20;
        const y = by - t * size * 0.55;
        return <circle key={i} cx={x} cy={y} r={2 + random(`fr${i}`) * 3} fill={GOLD} opacity={Math.sin(t * Math.PI) * draw} />;
      })}
    </svg>
  );
};
