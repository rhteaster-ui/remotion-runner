import React from 'react';
import {Img, interpolate, spring, staticFile} from 'remotion';
import {C, FONT, clamp} from './theme';
import {ICONS} from './icons';

const pop = (frame: number, fps: number, at: number, stiffness = 150) =>
  spring({frame: frame - at * fps, fps, config: {damping: 15, stiffness, mass: 0.75}});

/* ───────────── Ops Deck (gaya panel node n8n) — scene 4 ───────────── */
const Block: React.FC<{title: string; right?: React.ReactNode; at: number; frame: number; fps: number; height: number; children: React.ReactNode}> = ({title, right, at, frame, fps, height, children}) => {
  const p = Math.min(1, pop(frame, fps, at, 130));
  const on = frame / fps >= at;
  return (
    <div style={{position: 'relative', height, borderRadius: 28, padding: '22px 28px', background: on ? C.tile : 'transparent', border: on ? `1.5px solid ${C.border}` : `2px dashed ${C.border}`, opacity: on ? 1 : 0.45, boxSizing: 'border-box'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, letterSpacing: '0.14em', color: C.muted}}>
        <span>{title}</span>
        {on && right}
      </div>
      <div style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`}}>{children}</div>
    </div>
  );
};

const MINI = [
  {label: 'Bot TG', img: 'assets/ops/tg-official.svg'},
  {label: 'Termux', img: 'assets/ops/termux-official.svg'},
  {label: 'AGY', img: 'assets/ops/agy-official.png'},
  {label: 'Output', img: ''},
];

const TaskMap: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const t = frame / fps;
  const CX = [70, 310, 550, 790];
  return (
    <div style={{position: 'relative', height: 220, marginTop: 14}}>
      <svg width={860} height={220} style={{position: 'absolute', left: 0, top: 0}}>
        {CX.slice(0, 3).map((x, i) => {
          const x0 = x + 58;
          const x1 = CX[i + 1] - 58;
          const lit = t >= 45.4 + i * 0.6;
          return (
            <g key={i}>
              <line x1={x0} y1={72} x2={x1} y2={72} stroke={lit ? C.coral : C.wire} strokeWidth={5} strokeLinecap="round" strokeDasharray={lit ? '14 16' : undefined} strokeDashoffset={lit ? -frame * 2.6 : 0} />
              <path d={`M ${x1 - 24} 62 L ${x1 - 10} 72 L ${x1 - 24} 82`} fill="none" stroke={lit ? C.coral : C.wire} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
      </svg>
      {MINI.map((m, i) => {
        const litAt = 45.4 + i * 0.6 - 0.2;
        const lit = t >= litAt;
        const done = t >= litAt + 0.7;
        return (
          <div key={m.label} style={{position: 'absolute', left: CX[i] - 58, top: 14, width: 116}}>
            <div style={{width: 116, height: 116, borderRadius: 30, background: C.tile2, border: `2.5px solid ${done ? 'rgba(61,220,151,0.6)' : lit ? C.coral : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
              {m.img ? <Img src={staticFile(m.img)} style={{width: 62, height: 62, objectFit: 'contain'}} /> : <ICONS.check c={C.green} s={56} />}
              {done && (
                <div style={{position: 'absolute', right: -10, bottom: -10, width: 36, height: 36, borderRadius: 18, background: C.green, border: `4px solid ${C.tile}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <ICONS.check c="#0E0F12" s={18} />
                </div>
              )}
            </div>
            <div style={{textAlign: 'center', marginTop: 18, fontFamily: FONT.sans, fontWeight: 800, fontSize: 28, color: C.ink}}>{m.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const CPU_PTS = Array.from({length: 26}, (_, i) => {
  const y = 118 - (34 * Math.sin(i * 0.62 + 0.4) + 20 * Math.sin(i * 1.7 + 1.1) + i * 1.3);
  return [(i / 25) * 860, Math.max(26, Math.min(150, y))] as const;
});
const CPU_D = CPU_PTS.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

const CpuChart: React.FC<{t: number}> = ({t}) => {
  const p = interpolate(t, [48.2, 50.0], [0, 1], clamp);
  return (
    <svg width={860} height={176} style={{marginTop: 10, display: 'block'}}>
      <defs>
        <clipPath id="cpuclip">
          <rect x={0} y={0} width={860 * p} height={176} />
        </clipPath>
      </defs>
      {[30, 80, 130].map((y) => (
        <line key={y} x1={0} y1={y} x2={860} y2={y} stroke={C.border} strokeWidth={1.5} strokeDasharray="4 8" />
      ))}
      <path d={`${CPU_D} L 860 176 L 0 176 Z`} fill="rgba(255,109,90,0.14)" clipPath="url(#cpuclip)" />
      <path d={CPU_D} fill="none" stroke={C.coral} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${p} 1`} />
    </svg>
  );
};

const QUOTA = [
  {alias: 'rai', plan: 'AI Pro', pct: 86, col: C.violet},
  {alias: 'akun2', plan: 'AI Pro', pct: 93, col: C.violet},
  {alias: 'anuadlh', plan: 'Free', pct: 100, col: C.sky},
];

export const OpsDeckModal: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const t = frame / fps;
  if (t < 40.0 || t > 51.8) return null;
  const inP = Math.min(1, pop(frame, fps, 40.0, 120));
  const outP = interpolate(t, [51.0, 51.7], [1, 0], clamp);
  const o = Math.min(inP, outP);
  const blink = 0.5 + 0.5 * Math.sin(frame * 0.28);
  const cpuNow = Math.round(interpolate(t, [48.2, 50.0], [12, 41], clamp));
  return (
    <>
      <div style={{position: 'absolute', inset: 0, background: 'rgba(8,9,11,0.62)', opacity: o, zIndex: 20}} />
      <div style={{position: 'absolute', left: 48, right: 48, top: 176, height: 1236, zIndex: 22, borderRadius: 40, background: '#15161A', border: `2px solid ${C.border}`, boxShadow: '0 40px 90px rgba(0,0,0,0.65)', opacity: o, transform: `translateY(${(1 - inP) * 60}px) scale(${0.94 + 0.06 * inP})`, padding: '30px 34px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 88}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div style={{width: 76, height: 76, borderRadius: 24, background: C.tile2, border: `2px solid ${C.coral}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <ICONS.dash c={C.coral} s={40} />
            </div>
            <div>
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, color: C.ink, letterSpacing: '-0.01em'}}>Ops Deck</div>
              <div style={{fontFamily: FONT.mono, fontSize: 22, color: C.muted, marginTop: 2}}>GET /api/task-map/stream → 200 OK</div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 20, background: 'rgba(61,220,151,0.12)', border: '1.5px solid rgba(61,220,151,0.5)'}}>
            <div style={{width: 14, height: 14, borderRadius: 7, background: C.green, opacity: 0.4 + 0.6 * blink}} />
            <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: C.green}}>LIVE</div>
          </div>
        </div>

        <Block title="TASK MAP" at={40.8} frame={frame} fps={fps} height={348} right={<span style={{color: t >= 45.4 ? C.coral : C.dim}}>{t >= 45.4 ? '● alur menyala' : '○ standby'}</span>}>
          <TaskMap frame={frame} fps={fps} />
        </Block>

        <Block title="CPU · VPS-2" at={47.9} frame={frame} fps={fps} height={296} right={<span style={{color: C.ink, fontSize: 30}}>{cpuNow}%</span>}>
          <CpuChart t={t} />
        </Block>

        <Block title="KUOTA AKUN" at={49.3} frame={frame} fps={fps} height={366}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 24}}>
            {QUOTA.map((q, i) => {
              const f = interpolate(t, [49.6 + i * 0.25, 50.9 + i * 0.25], [0, 1], clamp);
              return (
                <div key={q.alias} style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <div style={{width: 168, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: C.ink}}>{q.alias}</div>
                  <div style={{width: 118, textAlign: 'center', padding: '6px 0', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: `1.5px solid ${q.col}`, fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: q.col}}>{q.plan}</div>
                  <div style={{flex: 1, height: 22, borderRadius: 11, background: C.tile2, overflow: 'hidden'}}>
                    <div style={{width: `${q.pct * f}%`, height: '100%', borderRadius: 11, background: q.col}} />
                  </div>
                  <div style={{width: 92, textAlign: 'right', fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: C.ink}}>{Math.round(q.pct * f)}%</div>
                </div>
              );
            })}
          </div>
        </Block>
      </div>
    </>
  );
};

/* ───────────── Brand card — scene 5 ───────────── */
const TAGS = [
  {k: 'FULLSTACK', v: 'Web Anti-Slop', col: C.amber, at: 58.8},
  {k: 'DEVOPS', v: 'Dual-VPS & PM2', col: C.sky, at: 59.7},
  {k: 'AGENTIC AI', v: 'Bot & Remotion', col: C.green, at: 60.6},
];
const LINKS = [
  {k: 'PORTOFOLIO', v: 'rhmt.biz.id', hot: true},
  {k: 'GITHUB', v: 'rhmt-ofc', hot: false},
  {k: 'TIKTOK', v: '@rhmtofc', hot: false},
  {k: 'KOMUNITAS', v: 'RHMT OFC', hot: false},
];

export const BrandCard: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const t = frame / fps;
  if (t < 51.6) return null;
  const inP = Math.min(1, pop(frame, fps, 51.8, 110));
  const ring = (frame * 1.4) % 360;
  const cta = t >= 66.9 ? 1 + 0.035 * Math.sin((t - 66.9) * 7) : 1;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, background: 'rgba(8,9,11,0.66)', opacity: inP, zIndex: 20}} />
      <div style={{position: 'absolute', left: 48, right: 48, top: 252, height: 1150, zIndex: 22, borderRadius: 40, background: '#15161A', border: `2px solid ${C.border}`, boxShadow: '0 40px 90px rgba(0,0,0,0.65)', opacity: inP, transform: `translateY(${(1 - inP) * 70}px) scale(${0.94 + 0.06 * inP})`, boxSizing: 'border-box', padding: '28px 34px', display: 'flex', flexDirection: 'column', gap: 16}}>
        {/* identitas */}
        <div style={{display: 'flex', alignItems: 'center', gap: 30, height: 190}}>
          <div style={{position: 'relative', width: 176, height: 176, flexShrink: 0}}>
            <svg width={176} height={176} style={{position: 'absolute', inset: 0, transform: `rotate(${ring}deg)`}}>
              <circle cx={88} cy={88} r={84} fill="none" stroke={C.coral} strokeWidth={4} strokeDasharray="18 12" strokeLinecap="round" />
            </svg>
            <Img src={staticFile('assets/ops/pp-dev.png')} style={{position: 'absolute', left: 14, top: 14, width: 148, height: 148, borderRadius: '50%', objectFit: 'cover'}} />
          </div>
          <div>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 74, lineHeight: 1, letterSpacing: '-0.03em', color: C.ink}}>RHMT OFC</div>
            <div style={{fontFamily: FONT.mono, fontSize: 26, color: C.muted, marginTop: 14}}>Rahmat · pelajar yang ngulik</div>
          </div>
        </div>

        {/* keahlian */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {TAGS.map((tg) => {
            const p = Math.min(1, pop(frame, fps, tg.at, 150));
            return (
              <div key={tg.k} style={{height: 92, borderRadius: 24, background: C.tile, border: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px', opacity: t >= tg.at ? p : 0.16, transform: `translateX(${(1 - (t >= tg.at ? p : 0)) * 40}px)`}}>
                <div style={{width: 12, height: 44, borderRadius: 6, background: tg.col}} />
                <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, letterSpacing: '0.12em', color: tg.col, width: 230}}>{tg.k}</div>
                <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 36, color: C.ink}}>{tg.v}</div>
              </div>
            );
          })}
        </div>

        {/* tautan */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {LINKS.map((l, i) => {
            const at = 63.1 + i * 0.4;
            const p = Math.min(1, pop(frame, fps, at, 150));
            const on = t >= at;
            return (
              <div key={l.k} style={{height: 74, borderRadius: 20, background: l.hot && on ? 'rgba(255,109,90,0.12)' : 'transparent', border: `1.5px solid ${l.hot && on ? C.coral : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', opacity: on ? p : 0.16}}>
                <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, letterSpacing: '0.12em', color: C.muted}}>{l.k}</div>
                <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: l.hot ? C.coral : C.ink}}>{l.v}</div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{marginTop: 'auto', height: 104, borderRadius: 30, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, transform: `scale(${cta})`, opacity: t >= 66.0 ? 1 : 0.2}}>
          <ICONS.bolt c="#0E0F12" s={38} />
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, color: '#0E0F12', letterSpacing: '-0.01em'}}>Follow @rhmtofc</div>
        </div>
      </div>
    </>
  );
};
