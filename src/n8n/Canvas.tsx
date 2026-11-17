import React from 'react';
import {Easing, Img, interpolate, spring, staticFile} from 'remotion';
import {C, FONT, clamp} from './theme';
import {ICONS} from './icons';
import {CAM, CASCADE, EDGES, NODES, NODE_BY_ID, STICKIES} from './data';
import type {EdgeDef, NodeDef, StickyDef} from './data';

export const FOCUS = {x: 540, y: 800};
const camEase = Easing.bezier(0.45, 0, 0.12, 1);

export type Cam = {cx: number; cy: number; s: number};

export const getCamera = (frame: number, fps: number): Cam => {
  const input = CAM.map((k) => k[0] * fps);
  const opt = {easing: camEase, ...clamp};
  return {
    cx: interpolate(frame, input, CAM.map((k) => k[1]), opt),
    cy: interpolate(frame, input, CAM.map((k) => k[2]), opt),
    s: interpolate(frame, input, CAM.map((k) => k[3]), opt),
  };
};

export const sizeOf = (n: NodeDef) => n.size ?? (n.kind === 'sub' ? 124 : 168);

const radii = (n: NodeDef): [number, number, number, number] => {
  const s = sizeOf(n);
  if (n.kind === 'sub') return [s / 2, s / 2, s / 2, s / 2];
  if (n.kind === 'trigger') return [s / 2, 34, 34, s / 2];
  return n.kind === 'agent' ? [44, 44, 44, 44] : [34, 34, 34, 34];
};

const rrPath = (w: number, h: number, tl: number, tr: number, br: number, bl: number) =>
  `M${tl},0 H${w - tr} A${tr},${tr} 0 0 1 ${w},${tr} V${h - br} A${br},${br} 0 0 1 ${w - br},${h} H${bl} A${bl},${bl} 0 0 1 0,${h - bl} V${tl} A${tl},${tl} 0 0 1 ${tl},0 Z`;

/* ───────────────────────── Grid (dot canvas ala n8n) ───────────────────────── */
export const Grid: React.FC<{cam: Cam}> = ({cam}) => {
  const {cx, cy, s} = cam;
  const g = 40 * s;
  const ox = FOCUS.x - cx * s;
  const oy = FOCUS.y - cy * s;
  const pos = (m: number) => `${ox - (g * m) / 2}px ${oy - (g * m) / 2}px`;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: C.bg,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.11) ${Math.max(1, 1.5 * s)}px, transparent ${Math.max(1.4, 1.9 * s)}px), radial-gradient(circle, rgba(255,255,255,0.2) ${2.3 * s}px, transparent ${2.8 * s}px)`,
        backgroundSize: `${g}px ${g}px, ${g * 5}px ${g * 5}px`,
        backgroundPosition: `${pos(1)}, ${pos(5)}`,
      }}
    />
  );
};

/* ───────────────────────── Bezier helpers ───────────────────────── */
type Pt = [number, number];
type P4 = [Pt, Pt, Pt, Pt];

const bez = (p: P4, u: number): Pt => {
  const m = 1 - u;
  return [
    m * m * m * p[0][0] + 3 * m * m * u * p[1][0] + 3 * m * u * u * p[2][0] + u * u * u * p[3][0],
    m * m * m * p[0][1] + 3 * m * m * u * p[1][1] + 3 * m * u * u * p[2][1] + u * u * u * p[3][1],
  ];
};

const bezTan = (p: P4, u: number): Pt => {
  const m = 1 - u;
  const dx = 3 * m * m * (p[1][0] - p[0][0]) + 6 * m * u * (p[2][0] - p[1][0]) + 3 * u * u * (p[3][0] - p[2][0]);
  const dy = 3 * m * m * (p[1][1] - p[0][1]) + 6 * m * u * (p[2][1] - p[1][1]) + 3 * u * u * (p[3][1] - p[2][1]);
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
};

const geom = (e: EdgeDef): P4 => {
  const a = NODE_BY_ID[e.from];
  const b = NODE_BY_ID[e.to];
  const sa = sizeOf(a);
  const sb = sizeOf(b);
  if (e.kind === 'sub') {
    const x0 = a.x + ((e.socket ?? 0) - 2) * 38;
    const y0 = a.y + sa / 2;
    const x1 = b.x;
    const y1 = b.y - sb / 2;
    return [[x0, y0], [x0, y0 + 90], [x1, y1 - 90], [x1, y1]];
  }
  const x0 = a.x + sa / 2;
  const y0 = a.y;
  const x1 = b.x - sb / 2;
  const y1 = b.y;
  const k = e.kind === 'ssh' ? 380 : Math.max(60, Math.abs(x1 - x0) * 0.45);
  return [[x0, y0], [x0 + k, y0], [x1 - k, y1], [x1, y1]];
};

const dPath = (p: P4) => `M ${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]}`;

/* ───────────────────────── Edges (SVG layer) ───────────────────────── */
const EdgeSvg: React.FC<{e: EdgeDef; frame: number; fps: number}> = ({e, frame, fps}) => {
  const t = frame / fps;
  if (t < e.appearAt) return null;
  const p = geom(e);
  const d = dPath(p);
  const isSub = e.kind === 'sub';
  const draw = interpolate(t, [e.appearAt, e.appearAt + 0.6], [0, 1], clamp);
  const casc = !e.ghost && t >= CASCADE[0] && t < CASCADE[1];
  const flowing = casc || (t >= e.flowAt && t < e.flowAt + e.flowDur);
  const flowed = !casc && t >= e.flowAt + e.flowDur;
  const dim = e.ghost ? interpolate(t, [3.6, 4.5], [1, 0.4], clamp) : 1;
  const base = flowed ? 'rgba(61,220,151,0.8)' : C.wire;

  // posisi titik-titik data yang berjalan di sepanjang kabel
  const dots: {u: number; o: number}[] = [];
  if (flowing) {
    if (casc || e.kind === 'ssh') {
      const speed = casc ? 0.55 : 0.9 / Math.max(1, e.flowDur * 0.6);
      const n = e.kind === 'ssh' ? 4 : 3;
      for (let i = 0; i < n; i++) dots.push({u: (((t - e.flowAt) * speed + i / n) % 1 + 1) % 1, o: 1});
    } else {
      const raw = (t - e.flowAt) / e.flowDur;
      for (let i = 0; i < 3; i++) {
        const u = Easing.inOut(Easing.quad)(Math.min(1, Math.max(0, raw - i * 0.07)));
        dots.push({u, o: 1 - i * 0.34});
      }
    }
  }

  const end = bez(p, 1);
  const tan = bezTan(p, 1);
  const ang = (Math.atan2(tan[1], tan[0]) * 180) / Math.PI;
  const ax = end[0] - tan[0] * 22;
  const ay = end[1] - tan[1] * 22;

  return (
    <g opacity={dim}>
      <path
        d={d}
        fill="none"
        stroke={base}
        strokeWidth={isSub ? 3 : 4.5}
        strokeLinecap="round"
        {...(isSub ? {strokeDasharray: '8 10', opacity: draw} : {pathLength: 1, strokeDasharray: `${draw} 1`})}
      />
      {flowing && (
        <path
          d={d}
          fill="none"
          stroke={C.coral}
          strokeWidth={isSub ? 4 : 5}
          strokeLinecap="round"
          strokeDasharray="14 16"
          strokeDashoffset={-frame * 2.6}
        />
      )}
      {dots.map((dt, i) => {
        const [x, y] = bez(p, dt.u);
        return <circle key={i} cx={x} cy={y} r={9 - i * 1.5} fill={C.coral} opacity={dt.o} />;
      })}
      {!isSub && draw > 0.95 && (
        <path
          d="M -10 -9 L 2 0 L -10 9"
          fill="none"
          stroke={flowing ? C.coral : base}
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${ax} ${ay}) rotate(${ang})`}
        />
      )}
      {isSub && draw > 0.95 && (
        <rect x={p[3][0] - 7} y={p[3][1] - 7} width={14} height={14} rx={2} fill={C.tile2} stroke={flowing ? C.coral : base} strokeWidth={3} transform={`rotate(45 ${p[3][0]} ${p[3][1]})`} />
      )}
    </g>
  );
};

const EdgeLabel: React.FC<{e: EdgeDef; frame: number; fps: number}> = ({e, frame, fps}) => {
  const t = frame / fps;
  if (!e.label) return null;
  const isSsh = e.kind === 'ssh';
  const showAt = isSsh ? e.flowAt : e.flowAt + e.flowDur;
  if (t < showAt) return null;
  if (!isSsh && t >= CASCADE[0] && t < CASCADE[1] && !e.ghost) return null;
  const p = geom(e);
  const [x, y] = bez(p, 0.5);
  const pop = spring({frame: frame - showAt * fps, fps, config: {damping: 14, stiffness: 190, mass: 0.6}});
  const dim = e.ghost ? interpolate(t, [3.6, 4.5], [1, 0.4], clamp) : 1;
  const Lock = ICONS.lock;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${Math.min(1.05, pop)})`,
        opacity: Math.min(1, pop) * dim,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: isSsh ? '9px 20px' : '6px 16px',
        borderRadius: 16,
        background: C.tile2,
        border: `1.5px solid ${isSsh ? C.coral : C.border}`,
        fontFamily: FONT.mono,
        fontSize: isSsh ? 26 : 22,
        fontWeight: 700,
        color: isSsh ? C.ink : C.muted,
        whiteSpace: 'nowrap',
      }}
    >
      {isSsh && <Lock c={C.coral} s={24} />}
      {e.label}
    </div>
  );
};

/* ───────────────────────── Nodes ───────────────────────── */
const NodeView: React.FC<{n: NodeDef; frame: number; fps: number}> = ({n, frame, fps}) => {
  const t = frame / fps;
  if (t < n.appearAt) return null;
  const size = sizeOf(n);
  const ap = spring({frame: frame - n.appearAt * fps, fps, config: {damping: 15, stiffness: 150, mass: 0.7}});
  const casc = n.kind !== 'ghost' && t >= CASCADE[0] && t < CASCADE[1];
  const end = n.runAt + n.runDur;
  const running = casc || (t >= n.runAt && t < end);
  const done = !running && t >= end;
  const dp = done ? spring({frame: frame - end * fps, fps, config: {damping: 12, stiffness: 220, mass: 0.6}}) : 0;
  const dim = n.kind === 'ghost' ? interpolate(t, [3.6, 4.5], [1, 0.38], clamp) : 1;
  const [tl, tr, br, bl] = radii(n);
  const isSub = n.kind === 'sub';
  const border = running ? C.coral : done ? 'rgba(61,220,151,0.55)' : n.kind === 'ghost' ? '#2A2C33' : C.border;
  const Icon = ICONS[n.icon];
  const imgSize = size * (n.kind === 'agent' ? 0.5 : 0.52);

  return (
    <div
      style={{
        position: 'absolute',
        left: n.x - size / 2,
        top: n.y - size / 2,
        width: size,
        height: size,
        opacity: Math.min(1, ap) * dim,
        transform: `scale(${0.6 + 0.4 * ap})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: C.tile,
          border: `2.5px solid ${border}`,
          borderRadius: `${tl}px ${tr}px ${br}px ${bl}px`,
          boxShadow: running
            ? '0 0 0 9px rgba(255,109,90,0.12), 0 22px 44px rgba(0,0,0,0.5)'
            : '0 22px 44px rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n.img ? (
          <Img src={staticFile(n.img)} style={{width: imgSize, height: imgSize, objectFit: 'contain'}} />
        ) : (
          <Icon c={n.kind === 'ghost' ? C.dim : n.tint} s={size * 0.44} />
        )}
      </div>

      {running && (
        <svg width={size} height={size} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
          <path
            d={rrPath(size, size, tl, tr, br, bl)}
            fill="none"
            stroke={C.coral}
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="20 80"
            strokeDashoffset={-((frame * 2.4) % 100)}
          />
        </svg>
      )}

      {/* port input / output */}
      {n.kind !== 'trigger' && (
        <div style={{position: 'absolute', left: -9, top: size / 2 - 9, width: 18, height: 18, borderRadius: 9, background: C.bg, border: `3px solid ${C.wire}`}} />
      )}
      <div style={{position: 'absolute', right: -9, top: size / 2 - 9, width: 18, height: 18, borderRadius: 9, background: C.bg, border: `3px solid ${done ? C.green : C.wire}`, display: isSub ? 'none' : 'block'}} />

      {/* bolt trigger */}
      {n.kind === 'trigger' && (
        <div style={{position: 'absolute', left: -20, top: size / 2 - 22, width: 44, height: 44, borderRadius: 22, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.4)'}}>
          <ICONS.bolt c="#0E0F12" s={24} />
        </div>
      )}

      {/* status ✓ */}
      {done && (
        <div
          style={{
            position: 'absolute',
            right: isSub ? -4 : -14,
            bottom: isSub ? -4 : -14,
            width: isSub ? 38 : 46,
            height: isSub ? 38 : 46,
            borderRadius: '50%',
            background: C.green,
            border: `4px solid ${C.bg}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${dp})`,
          }}
        >
          <ICONS.check c="#0E0F12" s={isSub ? 20 : 24} />
        </div>
      )}

      {n.badge && (
        <div style={{position: 'absolute', right: -10, top: -10, padding: '3px 12px', borderRadius: 14, background: C.coral, color: '#0E0F12', fontFamily: FONT.mono, fontWeight: 700, fontSize: 24}}>
          {n.badge}
        </div>
      )}

      {/* label (agent: di atas, supaya kabel sub-node bersih) */}
      <div
        style={{
          position: 'absolute',
          left: size / 2 - 190,
          width: 380,
          textAlign: 'center',
          ...(n.kind === 'agent' ? {bottom: size + 16} : {top: size + 16}),
        }}
      >
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: isSub ? 27 : 34, lineHeight: 1.1, letterSpacing: '-0.01em', color: n.kind === 'ghost' ? C.muted : C.ink}}>
          {n.title}
        </div>
        <div style={{fontFamily: FONT.mono, fontSize: isSub ? 19 : 22, color: C.dim, marginTop: 6}}>{n.sub}</div>
      </div>
    </div>
  );
};

/* ───────────────────────── Sticky notes ───────────────────────── */
const StickyView: React.FC<{st: StickyDef; frame: number; fps: number}> = ({st, frame, fps}) => {
  const t = frame / fps;
  if (t < st.appearAt) return null;
  const ap = Math.min(1, spring({frame: frame - st.appearAt * fps, fps, config: {damping: 18, stiffness: 120, mass: 0.8}}));
  const big = st.id === 'hdr';
  return (
    <div
      style={{
        position: 'absolute',
        left: st.x,
        top: st.y,
        width: st.w,
        height: st.h,
        borderRadius: 30,
        background: `rgba(${st.rgb},${big ? 0.12 : 0.055})`,
        border: `2px ${st.id === 'a' || st.id === 'b' ? 'dashed' : 'solid'} rgba(${st.rgb},0.4)`,
        opacity: ap,
        transform: `scale(${0.96 + 0.04 * ap})`,
      }}
    >
      <div style={{position: 'absolute', left: 34, top: 26, fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, letterSpacing: '0.14em', color: `rgb(${st.rgb})`}}>
        {st.title}
      </div>
      {st.body && (
        <div style={{position: 'absolute', left: 34, bottom: big ? 26 : 28, fontFamily: FONT.sans, fontWeight: big ? 800 : 500, fontSize: big ? 46 : 32, color: big ? C.ink : C.muted, letterSpacing: '-0.01em'}}>
          {st.body}
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── World ───────────────────────── */
export const World: React.FC<{cam: Cam; frame: number; fps: number}> = ({cam, frame, fps}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      transformOrigin: '0 0',
      transform: `translate(${FOCUS.x}px, ${FOCUS.y}px) scale(${cam.s}) translate(${-cam.cx}px, ${-cam.cy}px)`,
    }}
  >
    {STICKIES.map((st) => (
      <StickyView key={st.id} st={st} frame={frame} fps={fps} />
    ))}
    <svg width={1} height={1} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {EDGES.map((e) => (
        <EdgeSvg key={e.id} e={e} frame={frame} fps={fps} />
      ))}
    </svg>
    {NODES.map((n) => (
      <NodeView key={n.id} n={n} frame={frame} fps={fps} />
    ))}
    {EDGES.map((e) => (
      <EdgeLabel key={e.id} e={e} frame={frame} fps={fps} />
    ))}
  </div>
);
