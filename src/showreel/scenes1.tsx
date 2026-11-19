import React from 'react';
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { E, focusCam, p, pad2, RampSeg, rampRateAt, shake } from './motion';
import {
  BrowserFrame,
  FloatTag,
  Icon,
  mono,
  PlainVideo,
  RampVideo,
  sans,
  T,
} from './primitives';

/* ═════════ S0 · Cold open: kinetic typography → logo ═════════ */
export const SceneCold: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = [
    { t: 'REKAP.', bg: T.lime, fg: T.canopyDeep, a: 0, b: 26, n: '01' },
    { t: 'KEHADIRAN.', bg: T.canopy, fg: '#FFFFFF', a: 26, b: 52, n: '02' },
    { t: 'SISWA.', bg: '#FFFFFF', fg: T.canopy, a: 52, b: 78, n: '03' },
    { t: 'TANPA RIBET.', bg: T.canopyDeep, fg: T.lime, a: 78, b: 104, n: '04' },
  ];
  const cur = words.find((w) => f >= w.a && f < w.b);
  const irisR = p(f, 100, 126, E.inOut) * 1800;
  const logo = spring({ frame: f - 112, fps, config: { damping: 12, stiffness: 110, mass: 0.9 } });

  return (
    <AbsoluteFill style={{ background: T.canopyDeep }}>
      {cur &&
        (() => {
          const l = f - cur.a;
          const sh = shake(l, 0, 9, 5);
          const fs = Math.min(330, 1800 / (cur.t.length * 0.66));
          return (
            <AbsoluteFill style={{ background: cur.bg, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {[-1, 0, 1].map((r) => (
                <div
                  key={r}
                  style={{
                    position: 'absolute',
                    top: 540 + r * 330 - 150,
                    left: 0,
                    whiteSpace: 'nowrap',
                    fontFamily: sans,
                    fontWeight: 800,
                    fontSize: 300,
                    letterSpacing: '-0.04em',
                    color: 'transparent',
                    WebkitTextStroke: `2px ${cur.fg}`,
                    opacity: 0.1,
                    transform: `translateX(${(r % 2 === 0 ? -1 : 1) * l * 14 - 200}px)`,
                  }}
                >
                  {`${cur.t} `.repeat(6)}
                </div>
              ))}
              <div style={{ position: 'absolute', top: 54, left: 70, fontFamily: mono, fontWeight: 800, fontSize: 22, color: cur.fg, letterSpacing: '0.3em' }}>
                E-REKAP · {cur.n}/04
              </div>
              <div
                style={{
                  display: 'flex',
                  fontFamily: sans,
                  fontWeight: 800,
                  fontSize: fs,
                  letterSpacing: '-0.045em',
                  color: cur.fg,
                  transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)`,
                }}
              >
                {cur.t.split('').map((ch, i) => {
                  const q = p(l, i * 0.7, i * 0.7 + 8, E.back);
                  return (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        whiteSpace: 'pre',
                        transform: `translateY(${(1 - q) * 120}px) scale(${1.4 - 0.4 * q})`,
                        opacity: Math.min(1, q * 2),
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 250,
                  height: 14,
                  width: 1500 * p(l, 4, 18),
                  borderRadius: 7,
                  background: cur.fg === T.lime ? T.lime : cur.bg === T.lime ? T.canopy : T.lime,
                }}
              />
            </AbsoluteFill>
          );
        })()}

      {f >= 100 && (
        <AbsoluteFill style={{ background: T.bg, clipPath: `circle(${irisR}px at 50% 50%)`, alignItems: 'center', justifyContent: 'center' }}>
          <AbsoluteFill
            style={{
              backgroundImage: 'radial-gradient(rgba(10,61,38,0.09) 1.2px, transparent 1.2px)',
              backgroundSize: '28px 28px',
            }}
          />
          {[0, 1, 2].map((i) => {
            const q = p(f, 112 + i * 9, 150, E.out);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 300 + q * 900,
                  height: 300 + q * 900,
                  borderRadius: 999,
                  border: `2px solid ${T.lime}`,
                  opacity: (1 - q) * 0.7,
                }}
              />
            );
          })}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
            <Img
              src={staticFile('assets/erekap/icon-erekap.png')}
              style={{
                width: 250,
                height: 250,
                borderRadius: 56,
                transform: `scale(${logo}) rotate(${(1 - logo) * -12}deg)`,
                boxShadow: '0 40px 80px -20px rgba(10,61,38,0.4)',
              }}
            />
            <div style={{ display: 'flex', fontFamily: sans, fontWeight: 800, fontSize: 150, letterSpacing: '-0.045em', color: T.canopy }}>
              {'E-Rekap'.split('').map((ch, i) => {
                const q = p(f, 124 + i * 2, 138 + i * 2, E.out);
                return (
                  <span key={i} style={{ display: 'inline-block', color: ch === '-' ? '#65A30D' : T.canopy, opacity: q, transform: `translateY(${(1 - q) * 60}px)`, filter: `blur(${(1 - q) * 8}px)` }}>
                    {ch}
                  </span>
                );
              })}
            </div>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 20, letterSpacing: '0.38em', color: T.inkMuted, opacity: p(f, 136, 152) }}>
              SISTEM REKAPITULASI KEHADIRAN
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

/* ═════════ S1 · Preview Project (keyframe kamera) ═════════ */
const URL_TXT = 'https://rhmt.biz.id/xiiclass';

const SideCard: React.FC<{ label: string; value: string; delay: number; side: 'l' | 'r'; top: number; accent?: string }> = ({
  label,
  value,
  delay,
  side,
  top,
  accent = T.lime,
}) => {
  const f = useCurrentFrame();
  const q = p(f, delay, delay + 22, E.back);
  const dir = side === 'l' ? -1 : 1;
  return (
    <div
      style={{
        position: 'absolute',
        top,
        [side === 'l' ? 'left' : 'right']: 50,
        width: 270,
        padding: '16px 20px',
        borderRadius: 20,
        background: '#fff',
        border: '1.5px solid rgba(10,61,38,0.12)',
        boxShadow: T.shadowCard,
        opacity: Math.min(1, q * 1.5),
        transform: `translateX(${(1 - q) * 120 * dir}px) translateY(${Math.sin(f * 0.05 + delay) * 4}px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono, fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', color: T.inkMuted }}>
        <span style={{ width: 9, height: 9, borderRadius: 999, background: accent }} />
        {label}
      </div>
      <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 30, color: T.canopy, marginTop: 6, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
};

export const ScenePreview: React.FC = () => {
  const f = useCurrentFrame();
  const typed = URL_TXT.slice(0, Math.floor(p(f, 6, 44, E.lin) * URL_TXT.length));
  const cam = focusCam(f, [
    { f: 0, s: 2.0, py: -375 },
    { f: 46, s: 2.0, py: -375 },
    { f: 84, s: 1.0, py: 0 },
    { f: 118, s: 1.0, py: 0 },
    { f: 150, s: 1.5, py: -250, ry: -5 },
    { f: 188, s: 1.5, py: -90, ry: -5 },
    { f: 210, s: 1.0, py: 0, ry: 0 },
  ]);
  const cover = 1 - p(f, 52, 68);
  const bar = p(f, 44, 60, E.inOut);
  const stack = ['Next.js 16', 'Tailwind CSS', 'SQLite', 'TypeScript'];

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 380,
          top: 546 - 397,
          transform: cam.css,
          transformOrigin: '50% 50%',
        }}
      >
        <BrowserFrame width={1200} contentHeight={750} url={typed + (f % 14 < 7 && f < 46 ? '|' : '')} badge="LIVE PREVIEW">
          <PlainVideo src="video/record_laptop.mp4" startFrom={45} />
          <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: cover, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{ width: 110, borderRadius: 26, transform: `scale(${1 + Math.sin(f * 0.3) * 0.04})` }} />
          </div>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 4, width: `${bar * 100}%`, background: T.lime, opacity: 1 - p(f, 60, 70) }} />
        </BrowserFrame>
      </div>

      <div style={{ position: 'absolute', left: 50, top: 190, opacity: p(f, 96, 112), fontFamily: mono, fontWeight: 800, fontSize: 13, letterSpacing: '0.3em', color: T.canopy }}>
        ─ TECH STACK
      </div>
      {stack.map((s, i) => {
        const q = p(f, 100 + i * 7, 122 + i * 7, E.back);
        return (
          <div
            key={s}
            style={{
              position: 'absolute',
              left: 50,
              top: 230 + i * 74,
              padding: '14px 22px',
              borderRadius: 16,
              background: i === 0 ? T.canopy : '#fff',
              color: i === 0 ? T.lime : T.canopy,
              border: '1.5px solid rgba(10,61,38,0.14)',
              fontFamily: sans,
              fontWeight: 800,
              fontSize: 22,
              boxShadow: T.shadowCard,
              opacity: Math.min(1, q * 1.5),
              transform: `translateX(${(1 - q) * -140}px)`,
            }}
          >
            {s}
          </div>
        );
      })}
      <SideCard side="r" top={230} delay={104} label="TOTAL SISWA" value="13 siswa" />
      <SideCard side="r" top={354} delay={112} label="MULTI-KELAS" value="3 kelas" accent="#10B981" />
      <SideCard side="r" top={478} delay={120} label="KEHADIRAN" value="95.2%" accent="#F59E0B" />
      <FloatTag left={470} top={150} delay={130} label="Light Mode Native" sub="PREVIEW PROJECT" />
    </AbsoluteFill>
  );
};

/* ═════════ S2 · Keyframe & Speed Ramp ═════════ */
export const RAMP: RampSeg[] = [
  { frames: 24, rate: 1 },
  { frames: 8, rate: 1.5 },
  { frames: 8, rate: 2.2 },
  { frames: 56, rate: 3.2 },
  { frames: 8, rate: 2.2 },
  { frames: 8, rate: 1.4 },
  { frames: 8, rate: 0.8 },
  { frames: 10, rate: 0.5 },
  { frames: 70, rate: 0.3 },
  { frames: 8, rate: 0.6 },
  { frames: 8, rate: 1.0 },
  { frames: 24, rate: 1.0 },
];

const KEYS = {
  Kamera: [0, 100, 134, 200, 232],
  Kecepatan: [24, 40, 96, 130, 200, 232],
  Efek: [24, 96, 130, 200],
};

export const SceneRamp: React.FC = () => {
  const f = useCurrentFrame();
  const rate = rampRateAt(f, RAMP);
  const fast = rate > 1.3;
  const slow = rate < 0.9;
  const cam = focusCam(f, [
    { f: 0, s: 1 },
    { f: 100, s: 1.02 },
    { f: 134, s: 1.28, px: 120, py: -30 },
    { f: 200, s: 1.34, px: 120, py: -30 },
    { f: 232, s: 1, px: 0, py: 0 },
  ]);
  const label = fast ? 'FAST FORWARD' : slow ? 'SLOW MOTION' : 'REAL-TIME';
  const chipBg = fast ? T.lime : slow ? '#FEF3C7' : T.surfaceMint;
  const chipFg = slow ? '#92400E' : T.canopy;

  // grafik kurva kecepatan
  const gw = 600;
  const gh = 170;
  const pts: string[] = [];
  for (let i = 0; i <= 240; i += 4) {
    const r = rampRateAt(i, RAMP);
    pts.push(`${(i / 240) * gw},${gh * 0.62 - Math.log2(r) * 30}`);
  }
  const curY = gh * 0.62 - Math.log2(rate) * 30;

  const tx0 = 200;
  const tw = 1620;
  const kfList = [
    { f: 24, t: 'Ramp-up → 3.2×', c: T.lime },
    { f: 96, t: 'Rem bertahap', c: '#10B981' },
    { f: 130, t: 'Slow-mo 0.3×', c: '#F59E0B' },
    { f: 200, t: 'Kembali 1.0×', c: T.canopy },
  ];
  const activeK = kfList.reduce((a, k, i) => (f >= k.f ? i : a), -1);

  return (
    <AbsoluteFill>
      {/* frame video */}
      <div style={{ position: 'absolute', left: 70, top: 110, transform: cam.css, transformOrigin: '50% 50%' }}>
        <BrowserFrame width={1100} contentHeight={687} url="rhmt.biz.id/xiiclass" badge={`${rate.toFixed(1)}×`}>
          <div style={{ position: 'absolute', inset: 0, filter: fast ? `blur(${Math.min(2.4, (rate - 1) * 0.9)}px)` : undefined }}>
            <RampVideo src="video/record_laptop.mp4" baseFrame={272} segs={RAMP} />
          </div>
          {fast && (
            <div style={{ position: 'absolute', inset: 0, opacity: Math.min(1, (rate - 1.2) / 2) * 0.55 }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${(i * 7.3 + f * 3.1) % 100}%`,
                    top: 0,
                    width: 3,
                    height: '100%',
                    background: `linear-gradient(180deg, transparent, ${T.lime}, transparent)`,
                  }}
                />
              ))}
            </div>
          )}
          {slow && (
            <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 140px rgba(245,158,11,0.35)' }} />
          )}
        </BrowserFrame>
      </div>

      {/* panel kanan */}
      <div style={{ position: 'absolute', left: 1210, top: 110, width: 640, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ borderRadius: 26, background: '#fff', border: '1.5px solid rgba(10,61,38,0.12)', boxShadow: T.shadowCard, padding: '22px 28px', opacity: p(f, 4, 20), transform: `translateX(${(1 - p(f, 4, 24)) * 60}px)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 13, letterSpacing: '0.22em', color: T.inkMuted }}>SPEED RAMP</span>
            <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 13, padding: '5px 14px', borderRadius: 999, background: chipBg, color: chipFg }}>{label}</span>
          </div>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 124, letterSpacing: '-0.05em', color: slow ? '#B45309' : T.canopy, lineHeight: 1.05, marginTop: 6 }}>
            {rate.toFixed(2)}<span style={{ fontSize: 56, color: '#65A30D' }}>×</span>
          </div>
        </div>

        <div style={{ borderRadius: 26, background: '#fff', border: '1.5px solid rgba(10,61,38,0.12)', boxShadow: T.shadowCard, padding: '18px 22px', opacity: p(f, 10, 26) }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 12, letterSpacing: '0.22em', color: T.inkMuted, marginBottom: 8 }}>KURVA KECEPATAN</div>
          <svg width={gw} height={gh} viewBox={`0 0 ${gw} ${gh}`}>
            <line x1={0} x2={gw} y1={gh * 0.62} y2={gh * 0.62} stroke="rgba(10,61,38,0.18)" strokeDasharray="5 6" />
            <text x={4} y={gh * 0.62 - 6} fontFamily={mono} fontSize={11} fill="#526058">1×</text>
            <polyline points={pts.join(' ')} fill="none" stroke={T.canopy} strokeWidth={3} strokeLinejoin="round" />
            <line x1={(f / 240) * gw} x2={(f / 240) * gw} y1={0} y2={gh} stroke={T.lime} strokeWidth={2} />
            <circle cx={(f / 240) * gw} cy={curY} r={8} fill={T.lime} stroke={T.canopy} strokeWidth={3} />
          </svg>
        </div>

        <div style={{ borderRadius: 26, background: '#fff', border: '1.5px solid rgba(10,61,38,0.12)', boxShadow: T.shadowCard, padding: '18px 22px', opacity: p(f, 16, 32) }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 12, letterSpacing: '0.22em', color: T.inkMuted, marginBottom: 10 }}>KEYFRAMES</div>
          {kfList.map((k, i) => (
            <div
              key={k.t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '9px 12px',
                borderRadius: 12,
                marginBottom: 4,
                background: i === activeK ? T.surfaceMint : 'transparent',
                transform: `translateX(${i === activeK ? 8 : 0}px)`,
              }}
            >
              <span style={{ width: 12, height: 12, transform: 'rotate(45deg)', background: f >= k.f ? k.c : 'rgba(10,61,38,0.15)', border: `1.5px solid ${T.canopy}` }} />
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: T.inkMuted, width: 54 }}>
                {pad2(k.f / 30)}:{pad2((k.f % 30) * 2)}
              </span>
              <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 17, color: T.canopy }}>{k.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* timeline */}
      <div style={{ position: 'absolute', left: 70, top: 868, width: 1780, height: 112, borderRadius: 22, background: 'rgba(255,255,255,0.96)', border: '1.5px solid rgba(10,61,38,0.12)', boxShadow: T.shadowCard, opacity: p(f, 8, 24), transform: `translateY(${(1 - p(f, 8, 28)) * 40}px)` }}>
        {Object.entries(KEYS).map(([name, ks], row) => (
          <div key={name} style={{ position: 'absolute', left: 0, right: 0, top: 14 + row * 31, height: 28 }}>
            <div style={{ position: 'absolute', left: 22, fontFamily: mono, fontWeight: 800, fontSize: 12, letterSpacing: '0.14em', color: T.inkMuted, lineHeight: '28px' }}>{name.toUpperCase()}</div>
            <div style={{ position: 'absolute', left: tx0 - 70, width: tw, top: 13, height: 2, background: 'rgba(10,61,38,0.1)' }} />
            {ks.map((k) => {
              const q = p(f, k, k + 8, E.back);
              return (
                <div
                  key={k}
                  style={{
                    position: 'absolute',
                    left: tx0 - 70 + (k / 240) * tw - 8,
                    top: 5,
                    width: 16,
                    height: 16,
                    background: f >= k ? T.lime : '#fff',
                    border: `2px solid ${T.canopy}`,
                    transform: `rotate(45deg) scale(${f >= k ? 0.7 + 0.3 * q : 1})`,
                  }}
                />
              );
            })}
          </div>
        ))}
        <div style={{ position: 'absolute', top: 6, bottom: 6, left: tx0 - 70 + (f / 240) * tw, width: 2, background: T.canopy }}>
          <div style={{ position: 'absolute', top: -4, left: -22, padding: '2px 8px', borderRadius: 6, background: T.canopy, color: T.lime, fontFamily: mono, fontWeight: 800, fontSize: 11 }}>
            {pad2(f / 30)}:{pad2((f % 30) * 2)}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════ S3 · Multi-device ═════════ */
export const SceneDevices: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = focusCam(f, [
    { f: 0, s: 0.94, ry: -10, rx: 3 },
    { f: 105, s: 1.03, ry: 2, rx: 0 },
    { f: 210, s: 1.08, ry: 7, rx: -1 },
  ]);
  const enter = spring({ frame: f, fps, config: { damping: 16, stiffness: 85 } });
  const phone = spring({ frame: f - 12, fps, config: { damping: 14, stiffness: 90 } });
  const kpi = 89.2 + (94.7 - 89.2) * p(f, 46, 100, E.out);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 300,
          left: 0,
          whiteSpace: 'nowrap',
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 420,
          letterSpacing: '-0.05em',
          color: 'transparent',
          WebkitTextStroke: '3px rgba(10,61,38,0.08)',
          transform: `translateX(${-f * 3.2}px)`,
        }}
      >
        MULTI-DEVICE · REAL-TIME · RESPONSIF · MULTI-DEVICE
      </div>

      <div style={{ position: 'absolute', left: 340, top: 140, transform: cam.css, transformOrigin: '50% 50%', opacity: enter }}>
        <BrowserFrame width={1180} contentHeight={737} url="rhmt.biz.id/xiiclass/dashboard" badge="DESKTOP">
          <PlainVideo src="video/record_laptop.mp4" startFrom={540} />
          <div
            style={{
              position: 'absolute',
              left: 36,
              bottom: 36,
              padding: '12px 20px',
              borderRadius: 18,
              background: 'rgba(255,255,255,0.96)',
              border: '1.5px solid rgba(10,61,38,0.15)',
              boxShadow: '0 16px 36px -10px rgba(10,61,38,0.22)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transform: `scale(${1 + 0.05 * p(f, 46, 60)})`,
              transformOrigin: 'left bottom',
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 12, background: T.surfaceMint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={24} stroke={3} />
            </div>
            <div>
              <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 10, color: T.inkMuted, letterSpacing: '0.1em' }}>KEHADIRAN REAL-TIME</div>
              <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 28, color: T.canopy }}>
                {kpi.toFixed(1)}% <span style={{ fontSize: 12, color: '#15803D' }}>↑ Aktif</span>
              </div>
            </div>
          </div>
        </BrowserFrame>

        <div
          style={{
            position: 'absolute',
            right: -150,
            bottom: -30,
            width: 270,
            height: 560,
            borderRadius: 42,
            padding: 10,
            background: T.canopy,
            boxShadow: '0 40px 80px -16px rgba(7,41,25,0.55), 0 0 0 1px rgba(255,255,255,0.25) inset',
            transform: `translateY(${(1 - phone) * 160 + Math.sin(f * 0.06) * 6}px) rotate(${(1 - phone) * 7}deg)`,
            opacity: Math.min(1, phone * 1.4),
          }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: 33, overflow: 'hidden', position: 'relative', background: '#fff' }}>
            <PlainVideo src="video/record_mobile.mp4" startFrom={360} />
            <div style={{ position: 'absolute', top: 8, left: '50%', width: 56, height: 14, marginLeft: -28, borderRadius: 999, background: T.canopyDeep }} />
          </div>
        </div>
      </div>

      <FloatTag left={120} top={250} delay={30} label="Real-time" sub="SINKRON DESKTOP & HP" />
      <FloatTag right={110} top={190} delay={44} label="Responsif" sub="MOBILE-FIRST" color="#10B981" />
      <FloatTag left={200} bottom={170} delay={58} label="Satu data, semua layar" color="#F59E0B" />
    </AbsoluteFill>
  );
};
