import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArgonPlasma, CarbonLattice, Earth, Enso, FableBook, Galaxy, HydrogenAtom, Moon, NeonTube, Score, SonnetLines, Sun } from './Heroes';
import { Chapter, Company, MODELS, ModelId } from './script';
import { E, H, io, p, sans, serif, THEMES, W } from './theme';

const LOGO: Record<Company | 'claude', string> = {
  openai: 'logos/openai.svg',
  google: 'logos/gemini.svg',
  anthropic: 'logos/anthropic.svg',
  claude: 'logos/claude.svg',
};
export const COMPANY_NAME: Record<Company, string> = { openai: 'OpenAI', google: 'Google DeepMind', anthropic: 'Anthropic' };

export const Logo: React.FC<{ company: Company | 'claude'; size: number }> = ({ company, size }) => (
  <Img src={staticFile(LOGO[company])} style={{ width: size, height: size, objectFit: 'contain' }} />
);

/* ───────── subtitle ───────── */
export const Subtitle: React.FC<{ text: string; theme: keyof typeof THEMES }> = ({ text, theme }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const t = THEMES[theme];
  const a = io(f, D, 12, 10);
  const parts = text.split(/(\[\[.*?\]\])/g).filter(Boolean);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', opacity: a, transform: `translateY(${(1 - a) * 14}px)` }}>
      <div
        style={{
          maxWidth: 1560,
          textAlign: 'center',
          fontFamily: sans,
          fontWeight: 500,
          fontSize: 44,
          lineHeight: 1.28,
          color: t.ink,
          textShadow: t.light ? 'none' : '0 2px 24px rgba(0,0,0,0.65)',
        }}
      >
        {parts.map((s, i) =>
          s.startsWith('[[') ? (
            <span key={i} style={{ color: t.accent, fontWeight: 600 }}>{s.slice(2, -2)}</span>
          ) : (
            <span key={i}>{s}</span>
          )
        )}
      </div>
    </div>
  );
};

/* ───────── kartu judul bab ───────── */
export const ChapterTitle: React.FC<{ ch: Chapter }> = ({ ch }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const t = THEMES[ch.theme];
  const a = io(f, D, 20, 16);
  const line = p(f, 10, 60);
  const [lead, rest] = ch.titleEn.includes(':') ? ch.titleEn.split(': ') : [null, ch.titleEn];
  return (
    <AbsoluteFill style={{ opacity: a, transform: `scale(${1.04 - 0.04 * p(f, 0, 60)})` }}>
      <div style={{ position: 'absolute', left: 140, top: 250 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 64, color: t.accent }}>{ch.numeral}</div>
          {ch.company && <Logo company={ch.company} size={64} />}
          {lead && <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 40, color: t.mute }}>{lead}</div>}
        </div>
        <div style={{ width: 1500 * line, height: 2, background: t.rule, margin: '26px 0 34px' }} />
        <div style={{ fontFamily: serif, fontWeight: 400, fontSize: 150, lineHeight: 1.02, color: t.ink, letterSpacing: '-0.02em', maxWidth: 1500, opacity: p(f, 16, 44), transform: `translateY(${(1 - p(f, 16, 50)) * 40}px)` }}>
          {rest}
        </div>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 56, color: t.mute, marginTop: 36, opacity: p(f, 40, 70) }}>{ch.concept}</div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── util kecil ───────── */
const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', ...style }}>{children}</AbsoluteFill>
);

const Note: React.FC<{ label: string; text: string; color: string; x: number; y: number; w?: number; delay?: number }> = ({ label, text, color, x, y, w = 520, delay = 20 }) => {
  const f = useCurrentFrame();
  const a = p(f, delay, delay + 20);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: a, transform: `translateY(${(1 - a) * 16}px)`, borderLeft: `3px solid ${color}`, paddingLeft: 24 }}>
      <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 28, color }}>{label}</div>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 38, lineHeight: 1.25, color: 'inherit', marginTop: 6 }}>{text}</div>
    </div>
  );
};

/* ───────── scene model (satu objek hero per model) ───────── */
const HERO: Record<ModelId, React.FC<{ size: number }>> = {
  astra: Galaxy, sol: Sun, terra: Earth, luna: Moon,
  hydrogen: HydrogenAtom, carbon: CarbonLattice, neon: NeonTube, argon: ArgonPlasma,
  haiku: Enso, sonnet: SonnetLines, opus: Score, fable: FableBook,
};

export const ModelScene: React.FC<{ id: ModelId; theme: keyof typeof THEMES }> = ({ id, theme }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const m = MODELS[id];
  const t = THEMES[theme];
  const Hero = HERO[id];
  const a = io(f, D, 16, 12);
  const heroSize = id === 'opus' || id === 'sonnet' ? 780 : 820;
  const push = 1 + 0.07 * p(f, 0, D, (x) => x);
  const nameChars = m.name.split('');
  const accent = theme === 'washi' ? m.accent : m.accent;
  return (
    <AbsoluteFill style={{ opacity: a }}>
      {/* hero */}
      <div style={{ position: 'absolute', right: 40, top: 70, width: heroSize, height: heroSize, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${push * (0.9 + 0.1 * p(f, 0, 40))})`, filter: `blur(${(1 - p(f, 0, 24)) * 14}px)` }}>
        <Hero size={heroSize} />
      </div>

      {/* teks */}
      <div style={{ position: 'absolute', left: 140, top: 200, width: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: p(f, 0, 18) }}>
          <Logo company={m.company} size={44} />
          <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 34, color: t.mute }}>{m.full}</div>
          {m.tile && (
            <div style={{ marginLeft: 12, padding: '6px 16px', border: `2px solid ${accent}`, borderRadius: 8, fontFamily: sans, fontWeight: 600, fontSize: 28, color: accent }}>
              {m.tile.z} · {m.tile.sym} · {m.tile.mass}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', fontFamily: serif, fontWeight: 400, fontSize: 250, lineHeight: 1.0, letterSpacing: '-0.03em', color: t.ink, marginTop: 24 }}>
          {nameChars.map((ch, i) => {
            const q = p(f, 6 + i * 3, 26 + i * 3);
            return (
              <span key={i} style={{ display: 'inline-block', opacity: q, transform: `translateY(${(1 - q) * 90}px)`, filter: `blur(${(1 - q) * 10}px)` }}>
                {ch}
              </span>
            );
          })}
        </div>
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${t.rule}`, width: 760 * p(f, 24, 60), opacity: 1 }} />
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 52, color: accent, marginTop: 10, opacity: p(f, 34, 58), transform: `translateY(${(1 - p(f, 34, 62)) * 14}px)` }}>
          {m.etymWord}
          <span style={{ fontStyle: 'normal', fontFamily: sans, fontSize: 34, color: t.mute, marginLeft: 18 }}>
            {m.etymLang}: {m.etymGloss}
          </span>
        </div>
        <div style={{ fontFamily: sans, fontWeight: 400, fontSize: 38, lineHeight: 1.3, color: t.ink, marginTop: 30, maxWidth: 820, opacity: p(f, 48, 72) }}>{m.role}</div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── ringkas: berbagai scene ───────── */
const Names3: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const rows: [Company, string][] = [['anthropic', 'Claude Opus'], ['google', 'Gemini Hydrogen'], ['openai', 'GPT Astra']];
  return (
    <Center style={{ opacity: io(f, D, 12, 12) }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {rows.map(([c, n], i) => {
          const q = p(f, 8 + i * 22, 32 + i * 22);
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 36, opacity: q, transform: `translateX(${(1 - q) * -120 + Math.sin(f * 0.03 + i) * 10}px)` }}>
              <Logo company={c} size={104} />
              <div style={{ fontFamily: serif, fontSize: 176, letterSpacing: '-0.03em', color: '#EEF0F6', lineHeight: 1 }}>{n}</div>
            </div>
          );
        })}
      </div>
    </Center>
  );
};

const Why: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const word = 'mengapa?';
  return (
    <Center style={{ opacity: io(f, D, 14, 12) }}>
      <div style={{ display: 'flex', fontFamily: serif, fontStyle: 'italic', fontSize: 340, color: '#EEF0F6', letterSpacing: '-0.04em' }}>
        {word.split('').map((ch, i) => {
          const q = p(f, 6 + i * 4, 30 + i * 4);
          const flick = 0.8 + 0.2 * Math.sin(f * 0.2 + i * 2);
          return (
            <span key={i} style={{ opacity: q * flick, transform: `translateY(${(1 - q) * 60}px)`, filter: `blur(${(1 - q) * 12}px)` }}>
              {ch}
            </span>
          );
        })}
      </div>
    </Center>
  );
};

const OldNames: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const ws = ['Pro', 'Flash', 'Mini'];
  return (
    <Center style={{ opacity: io(f, D, 12, 12) }}>
      <div style={{ display: 'flex', gap: 120 }}>
        {ws.map((w, i) => {
          const q = p(f, 4 + i * 8, 24 + i * 8);
          const strike = p(f, 50 + i * 12, 68 + i * 12);
          return (
            <div key={w} style={{ position: 'relative', fontFamily: sans, fontWeight: 600, fontSize: 230, letterSpacing: '-0.04em', color: '#EEF0F6', opacity: q * (1 - 0.55 * strike), transform: `translateY(${(1 - q) * 50}px)` }}>
              {w}
              <div style={{ position: 'absolute', left: -14, top: '54%', height: 8, width: `${strike * 112}%`, background: '#9DB4FF', borderRadius: 4 }} />
            </div>
          );
        })}
      </div>
    </Center>
  );
};

const TitleCard: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const ls = 0.34 - 0.32 * p(f, 0, 70);
  const a = io(f, D, 18, 14);
  return (
    <Center style={{ opacity: a }}>
      <div style={{ textAlign: 'center', transform: `scale(${1.05 - 0.05 * p(f, 0, 90)})` }}>
        <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 210, lineHeight: 1.0, color: '#EEF0F6', letterSpacing: `${ls}em`, filter: `blur(${(1 - p(f, 0, 40)) * 14}px)` }}>
          BEYOND THE
          <br />
          NAMES
        </div>
        <div style={{ width: 760 * p(f, 40, 90), height: 2, background: 'rgba(238,240,246,0.4)', margin: '36px auto' }} />
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 66, color: '#9DB4FF', opacity: p(f, 56, 90) }}>The Philosophy Behind Frontier AI</div>
      </div>
    </Center>
  );
};

/* ── Evolusi ── */
const Axis: React.FC<{ stage: number }> = ({ stage }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const pts: [string, number, number][] = [['Nano', 0.9, 0.16], ['Mini', 0.78, 0.3], ['Flash', 0.64, 0.46], ['Pro', 0.36, 0.72], ['Ultra', 0.14, 0.92]];
  const X0 = 300, Y0 = 880, Wd = 1300, Ht = 640;
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      <svg width={W} height={H}>
        <line x1={X0} y1={Y0} x2={X0 + Wd} y2={Y0} stroke="rgba(238,240,246,0.4)" strokeWidth={2} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y0 - Ht} stroke="rgba(238,240,246,0.4)" strokeWidth={2} />
        {pts.map(([n, x, y], i) => {
          const q = p(f, 10 + i * 8, 30 + i * 8, E.back);
          const cx = X0 + x * Wd, cy = Y0 - y * Ht;
          return (
            <g key={n} opacity={Math.min(1, q * 1.5)}>
              <circle cx={cx} cy={cy} r={16 * q} fill="#9DB4FF" />
              <text x={cx + 30} y={cy + 14} fontFamily={sans} fontSize={54} fontWeight={600} fill="#EEF0F6">{n}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', left: X0 + Wd - 330, top: Y0 + 14, fontFamily: sans, fontSize: 34, color: 'rgba(238,240,246,0.7)' }}>lebih cepat</div>
      <div style={{ position: 'absolute', left: X0 + 18, top: Y0 - Ht - 8, fontFamily: sans, fontSize: 34, color: 'rgba(238,240,246,0.7)' }}>lebih mampu</div>
      {stage === 1 && (
        <div style={{ position: 'absolute', left: 140, top: 150, display: 'flex', gap: 22, opacity: p(f, 6, 26) }}>
          {['kecepatan', 'ukuran', 'harga'].map((w, i) => (
            <div key={w} style={{ padding: '10px 26px', borderRadius: 999, border: '2px solid #9DB4FF', fontFamily: sans, fontWeight: 500, fontSize: 38, color: '#EEF0F6', opacity: p(f, 6 + i * 10, 24 + i * 10) }}>{w}</div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const TimelineScene: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const rows: [Company, string, string, string, string][] = [
    ['openai', 'OpenAI', 'GPT-4 · mini · nano', 'Astra · Sol · Terra · Luna', '2026'],
    ['google', 'Google DeepMind', 'Nano · Pro · Flash · Ultra', 'Argon · Carbon · Hydrogen · Neon', '2026'],
    ['anthropic', 'Anthropic', 'Haiku · Sonnet · Opus', '+ Fable · Mythos', '2024 → 2026'],
  ];
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      {rows.map(([c, n, a, b], i) => {
        const y = 230 + i * 235;
        const q = p(f, 8 + i * 14, 32 + i * 14);
        const q2 = p(f, 40 + i * 14, 66 + i * 14);
        return (
          <div key={n} style={{ position: 'absolute', left: 140, top: y, width: 1640, opacity: q }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Logo company={c} size={50} />
              <div style={{ fontFamily: sans, fontSize: 40, fontWeight: 600, color: '#EEF0F6' }}>{n}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20, gap: 40 }}>
              <div style={{ fontFamily: sans, fontSize: 46, color: 'rgba(238,240,246,0.6)', width: 700 }}>{a}</div>
              <div style={{ height: 3, width: 160 * q2, background: '#9DB4FF' }} />
              <div style={{ fontFamily: serif, fontSize: 68, color: '#EEF0F6', opacity: q2, letterSpacing: '-0.02em' }}>{b}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const GenScene: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const nums = ['5.6', '6', '6.1'];
  const idx = Math.min(2, Math.floor(f / 46));
  const roll = p(f % 46, 0, 12);
  return (
    <Center style={{ opacity: io(f, D, 14, 12) }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 34, fontFamily: serif, fontSize: 280, letterSpacing: '-0.03em', color: '#EEF0F6' }}>
          <span style={{ fontFamily: sans, fontWeight: 500, fontSize: 130, color: 'rgba(238,240,246,0.6)' }}>GPT</span>
          <span style={{ display: 'inline-block', minWidth: 400, textAlign: 'center', opacity: roll, transform: `translateY(${(1 - roll) * 40}px)`, color: '#9DB4FF' }}>{nums[idx]}</span>
          <span style={{ color: '#FFB454' }}>Sol</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 220, marginTop: 30, fontFamily: sans, fontSize: 40, color: 'rgba(238,240,246,0.7)', opacity: p(f, 40, 70) }}>
          <span>angka: generasi</span>
          <span>nama: tingkat yang bertahan</span>
        </div>
      </div>
    </Center>
  );
};

const IdentityScene: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const rows: [Company, string[]][] = [
    ['openai', ['Astra', 'Sol', 'Terra', 'Luna']],
    ['google', ['Argon', 'Carbon', 'Hydrogen', 'Neon']],
    ['anthropic', ['Haiku', 'Sonnet', 'Opus', 'Fable']],
  ];
  const old = 1 - 0.75 * p(f, 18, 50);
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 12, 12) }}>
      <div style={{ position: 'absolute', left: 140, top: 140, fontFamily: sans, fontWeight: 600, fontSize: 70, color: '#EEF0F6', opacity: old, letterSpacing: '-0.03em' }}>Pro · Flash · Mini</div>
      {rows.map(([c, ws], r) => (
        <div key={c} style={{ position: 'absolute', left: 140, top: 330 + r * 190, display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ opacity: p(f, 24 + r * 10, 44 + r * 10) }}><Logo company={c} size={80} /></div>
          {ws.map((w, k) => {
            const q = p(f, 30 + r * 10 + k * 6, 54 + r * 10 + k * 6);
            return <span key={w} style={{ fontFamily: serif, fontSize: 118, color: '#EEF0F6', letterSpacing: '-0.025em', opacity: q, transform: `translateY(${(1 - q) * 40}px)` }}>{w}</span>;
          })}
        </div>
      ))}
    </AbsoluteFill>
  );
};

const LensScene: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const items = [['Branding', 'nama yang mudah diingat'], ['Positioning', 'tingkat dan perannya jelas'], ['Filosofi', 'teknologi sebagai cerita']];
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 12, 12) }}>
      {items.map(([a, b], i) => {
        const q = p(f, 8 + i * 18, 34 + i * 18);
        return (
          <div key={a} style={{ position: 'absolute', left: 140, top: 190 + i * 250, width: 1640, borderTop: '1px solid rgba(238,240,246,0.28)', paddingTop: 26, opacity: q, transform: `translateX(${(1 - q) * -80}px)` }}>
            <span style={{ fontFamily: serif, fontSize: 150, color: '#EEF0F6', letterSpacing: '-0.03em' }}>{a}</span>
            <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 58, color: '#9DB4FF', marginLeft: 50 }}>{b}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ── Perkenalan perusahaan ── */
const CosmosIntro: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const bodies: [string, React.FC<{ size: number }>][] = [['Astra', Galaxy], ['Sol', Sun], ['Terra', Earth], ['Luna', Moon]];
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      {bodies.map(([n, B], i) => {
        const q = p(f, 6 + i * 16, 34 + i * 16);
        return (
          <div key={n} style={{ position: 'absolute', left: 90 + i * 440, top: 250, width: 420, textAlign: 'center', opacity: q, transform: `translateY(${(1 - q) * 60 + Math.sin(f * 0.03 + i) * 8}px)` }}>
            <div style={{ height: 420, display: 'flex', justifyContent: 'center' }}><B size={420} /></div>
            <div style={{ fontFamily: serif, fontSize: 96, color: '#F1F4FF', marginTop: 10 }}>{n}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const PERIODS: number[][] = [[1, 18], [1, 2, 13, 14, 15, 16, 17, 18], [1, 2, 13, 14, 15, 16, 17, 18], Array.from({ length: 18 }, (_, i) => i + 1), Array.from({ length: 18 }, (_, i) => i + 1), Array.from({ length: 18 }, (_, i) => i + 1), Array.from({ length: 18 }, (_, i) => i + 1)];
const LIT: Record<string, ModelId> = { '0-1': 'hydrogen', '1-14': 'carbon', '1-18': 'neon', '2-18': 'argon' };

const Periodic: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const tile = 78, gap = 8, x0 = 150, y0 = 190;
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      {PERIODS.map((cols, r) =>
        cols.map((g) => {
          const key = `${r}-${g}`;
          const m = LIT[key];
          const q = p(f, 4 + r * 2 + g * 0.5, 22 + r * 2 + g * 0.5);
          const lit = m ? p(f, 50 + Object.keys(LIT).indexOf(key) * 18, 72 + Object.keys(LIT).indexOf(key) * 18) : 0;
          const info = m ? MODELS[m] : null;
          return (
            <div
              key={key}
              style={{
                position: 'absolute',
                left: x0 + (g - 1) * (tile + gap),
                top: y0 + r * (tile + gap),
                width: tile,
                height: tile,
                borderRadius: 8,
                border: `2px solid ${m ? info!.accent : 'rgba(237,243,244,0.16)'}`,
                background: m ? `rgba(255,255,255,${0.04 + 0.12 * lit})` : 'transparent',
                opacity: q,
                transform: `scale(${1 + 0.5 * lit})`,
                zIndex: m ? 5 : 1,
                boxShadow: m ? `0 0 ${40 * lit}px ${info!.accent}66` : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 38,
                color: m ? info!.accent : 'transparent',
              }}
            >
              {info?.tile?.sym}
            </div>
          );
        })
      )}
      {Object.entries(LIT).map(([key, m], i) => {
        const [r, g] = key.split('-').map(Number);
        const q = p(f, 72 + i * 18, 92 + i * 18);
        return (
          <div key={m} style={{ position: 'absolute', left: x0 + (g - 1) * (tile + gap) - 60, top: y0 + (r + 1) * (tile + gap) + 50, width: 200, textAlign: 'center', fontFamily: serif, fontSize: 50, color: MODELS[m].accent, opacity: q, transform: `translateY(${(1 - q) * 14}px)` }}>
            {MODELS[m].name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const FormsIntro: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const ink = '#14171C';
  const Line: React.FC<{ w: number; o?: number }> = ({ w, o = 1 }) => <div style={{ height: 8, width: w, borderRadius: 4, background: ink, opacity: 0.82 * o, marginBottom: 14 }} />;
  const q = (i: number) => p(f, 6 + i * 22, 32 + i * 22);
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      <div style={{ position: 'absolute', left: 190, top: 300, opacity: q(0), transform: `translateY(${(1 - q(0)) * 40}px)` }}>
        <Line w={150} /><Line w={230} /><Line w={150} />
        <div style={{ fontFamily: serif, fontSize: 92, color: ink, marginTop: 70 }}>Haiku</div>
        <div style={{ fontFamily: sans, fontSize: 34, color: THEMES.washi.mute }}>3 baris</div>
      </div>
      <div style={{ position: 'absolute', left: 640, top: 230, opacity: q(1), transform: `translateY(${(1 - q(1)) * 40}px)` }}>
        {Array.from({ length: 14 }).map((_, i) => <Line key={i} w={330 - (i % 3) * 40} />)}
        <div style={{ fontFamily: serif, fontSize: 92, color: ink, marginTop: 40 }}>Sonnet</div>
        <div style={{ fontFamily: sans, fontSize: 34, color: THEMES.washi.mute }}>14 baris</div>
      </div>
      <div style={{ position: 'absolute', left: 1130, top: 150, width: 640, opacity: q(2), transform: `translateY(${(1 - q(2)) * 40}px)` }}>
        <div style={{ border: `3px solid ${ink}`, padding: 34, height: 560 }}>
          {Array.from({ length: 12 }).map((_, i) => <Line key={i} w={540 - (i % 4) * 70} o={0.8} />)}
        </div>
        <div style={{ fontFamily: serif, fontSize: 92, color: ink, marginTop: 30 }}>Opus</div>
        <div style={{ fontFamily: sans, fontSize: 34, color: THEMES.washi.mute }}>satu karya utuh</div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Tafsir ── */
const Orrery: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const b: [string, React.FC<{ size: number }>, number][] = [['Astra', Galaxy, 400], ['Sol', Sun, 380], ['Terra', Earth, 340], ['Luna', Moon, 300]];
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      <div style={{ position: 'absolute', left: 140, top: 150, width: 1640 * p(f, 4, 50), height: 2, background: 'rgba(241,244,255,0.3)' }} />
      {b.map(([n, B, s], i) => {
        const q = p(f, 10 + i * 14, 36 + i * 14);
        return (
          <div key={n} style={{ position: 'absolute', left: 120 + i * 440, top: 280, width: 420, textAlign: 'center', opacity: q }}>
            <div style={{ height: 420, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><B size={s} /></div>
            <div style={{ fontFamily: serif, fontSize: 80, color: '#F1F4FF' }}>{n}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 140, top: 96, fontFamily: sans, fontSize: 38, color: 'rgba(241,244,255,0.7)', opacity: p(f, 30, 50) }}>terjauh</div>
      <div style={{ position: 'absolute', right: 140, top: 96, fontFamily: sans, fontSize: 38, color: 'rgba(241,244,255,0.7)', opacity: p(f, 30, 50) }}>terdekat</div>
    </AbsoluteFill>
  );
};

const AtomicScale: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const top: ModelId[] = ['hydrogen', 'carbon', 'neon', 'argon'];
  const bottom: ModelId[] = ['carbon', 'neon', 'hydrogen', 'argon'];
  const X = (i: number) => 360 + i * 400;
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      <svg width={W} height={H}>
        {top.map((m, i) => {
          const j = bottom.indexOf(m);
          const q = p(f, 40 + i * 8, 80 + i * 8);
          return <line key={m} x1={X(i)} y1={330} x2={X(j)} y2={650} stroke={MODELS[m].accent} strokeWidth={4} opacity={0.8 * q} strokeDasharray="800" strokeDashoffset={800 * (1 - q)} />;
        })}
      </svg>
      <div style={{ position: 'absolute', left: 140, top: 130, fontFamily: sans, fontSize: 40, color: 'rgba(237,243,244,0.7)' }}>urutan nomor atom</div>
      <div style={{ position: 'absolute', left: 140, top: 700, fontFamily: sans, fontSize: 40, color: 'rgba(237,243,244,0.7)' }}>urutan kemampuan menurut penempatan Google</div>
      {top.map((m, i) => (
        <div key={`t${m}`} style={{ position: 'absolute', left: X(i) - 130, top: 200, width: 260, textAlign: 'center', opacity: p(f, 6 + i * 8, 26 + i * 8) }}>
          <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 60, color: MODELS[m].accent }}>{MODELS[m].tile!.sym}</div>
          <div style={{ fontFamily: sans, fontSize: 36, color: '#EDF3F4' }}>{MODELS[m].tile!.z}</div>
        </div>
      ))}
      {bottom.map((m, i) => (
        <div key={`b${m}`} style={{ position: 'absolute', left: X(i) - 150, top: 770, width: 300, textAlign: 'center', fontFamily: serif, fontSize: 64, color: MODELS[m].accent, opacity: p(f, 30 + i * 8, 50 + i * 8) }}>{MODELS[m].name}</div>
      ))}
    </AbsoluteFill>
  );
};

const ScaleScene: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const ink = '#14171C';
  const items: [string, number, string][] = [['Haiku', 260, ink], ['Sonnet', 420, '#2A3C9A'], ['Opus', 600, '#2A3C9A'], ['Fable', 780, '#8A6A1E']];
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 14, 12) }}>
      {items.map(([n, s, c], i) => {
        const q = p(f, 8 + i * 16, 36 + i * 16);
        return (
          <div key={n} style={{ position: 'absolute', left: W / 2 - s / 2, top: 560 - s * 0.42, width: s, height: s * 0.84, border: `3px solid ${c}`, borderRadius: 4, opacity: q, transform: `scale(${0.9 + 0.1 * q})`, boxShadow: n === 'Fable' ? '0 0 80px rgba(138,106,30,0.25)' : undefined }}>
            <div style={{ position: 'absolute', left: 22, top: 14, fontFamily: serif, fontStyle: 'italic', fontSize: 54, color: c }}>{n}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ── Perbandingan (tabel progresif) ── */
const COLS: [Company, string, string][] = [['openai', 'kosmik', '#BBD0FF'], ['google', 'ilmiah', '#7FE0D4'], ['anthropic', 'artistik', '#D97757']];
const ROWS: [string, string[]][] = [
  ['Strategi', ['Tingkat yang bertahan', 'Varian dalam satu generasi', 'Skala sebuah karya']],
  ['Hierarki', ['Astra, Sol, Terra, Luna', 'Peran, bukan peringkat', 'Haiku, Sonnet, Opus, Fable']],
  ['Identitas', ['Bintang, matahari, bumi, bulan', 'Unsur tabel periodik', 'Puisi, musik, dongeng']],
  ['Ekosistem', ['ChatGPT, Codex, API', 'Gemini, AI Studio, Antigravity', 'Claude, API, Claude Code']],
];

const Compare: React.FC<{ upTo: number; verdict?: boolean }> = ({ upTo, verdict }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  return (
    <AbsoluteFill style={{ opacity: io(f, D, 8, 10) * (verdict ? 1 - 0.8 * p(f, 4, 30) : 1) }}>
      {COLS.map(([c, tag, col], i) => (
        <div key={c} style={{ position: 'absolute', left: 420 + i * 470, top: 110, width: 440, display: 'flex', alignItems: 'center', gap: 14 }}>
          <Logo company={c} size={52} />
          <div>
            <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 34, color: '#EEF0F6' }}>{COMPANY_NAME[c]}</div>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 34, color: col }}>{tag}</div>
          </div>
        </div>
      ))}
      {ROWS.map(([label, cells], r) => {
        const isNew = r === upTo;
        const show = r <= upTo;
        const q = show ? (isNew ? p(f, 4, 26) : 1) : 0;
        return (
          <div key={label} style={{ position: 'absolute', left: 140, top: 250 + r * 190, width: 1700, opacity: q, transform: `translateY(${(1 - q) * 24}px)`, borderTop: '1px solid rgba(238,240,246,0.22)', paddingTop: 22 }}>
            <div style={{ position: 'absolute', left: 0, top: 22, fontFamily: serif, fontStyle: 'italic', fontSize: 46, color: '#EEF0F6' }}>{label}</div>
            {cells.map((t, i) => (
              <div key={t} style={{ position: 'absolute', left: 280 + i * 470, top: 18, width: 430, fontFamily: sans, fontWeight: 500, fontSize: 36, lineHeight: 1.25, color: '#EEF0F6', borderLeft: `3px solid ${COLS[i][2]}`, paddingLeft: 18, opacity: isNew ? p(f, 8 + i * 7, 28 + i * 7) : 1 }}>{t}</div>
            ))}
          </div>
        );
      })}
      {verdict && (
        <Center>
          <div style={{ fontFamily: serif, fontSize: 190, letterSpacing: '-0.03em', color: '#EEF0F6', opacity: p(f, 20, 55), transform: `translateY(${(1 - p(f, 20, 60)) * 30}px)` }}>
            Nama sebagai <span style={{ fontStyle: 'italic', color: '#9DB4FF' }}>bahasa.</span>
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};

/* ── Penutup ── */
const Closing: React.FC<{ k: number }> = ({ k }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const a = io(f, D, 14, k === 5 ? 20 : 12);
  const spec = ['v4.1', '128K', 'Pro', 'Flash', 'Mini', '1M ctx', 'API'];
  const merge = k >= 2 ? p(f, 10, 80) : 0;
  const motif = (x: number, node: React.ReactNode) => (
    <div style={{ position: 'absolute', left: x - (k >= 2 ? merge * (x - W / 2) : 0) - 230, top: 540 - 230 - (k >= 3 ? 0 : 0), width: 460, height: 460, opacity: k >= 1 ? p(f, 6, 30) * (1 - 0.0) : 0, transform: `scale(${1 - 0.25 * merge})` }}>{node}</div>
  );
  return (
    <AbsoluteFill style={{ opacity: a }}>
      {k === 0 && (
        <Center>
          <div style={{ display: 'flex', gap: 46, flexWrap: 'wrap', justifyContent: 'center', width: 1400, fontFamily: sans, fontWeight: 500, fontSize: 96, color: 'rgba(238,240,246,0.5)' }}>
            {spec.map((s, i) => <span key={s} style={{ opacity: p(f, 4 + i * 8, 20 + i * 8) }}>{s}</span>)}
          </div>
        </Center>
      )}
      {k >= 1 && k <= 4 && (
        <>
          {motif(420, <Galaxy size={460} />)}
          {motif(960, <CarbonLattice size={460} />)}
          {motif(1500, <Enso size={460} dots={false} />)}
        </>
      )}
      {k === 1 && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center', fontFamily: serif, fontStyle: 'italic', fontSize: 70, color: '#EEF0F6', opacity: p(f, 30, 60) }}>
          bintang · unsur · sastra
        </div>
      )}
      {k >= 3 && k <= 4 && (
        <Center>
          <div style={{ fontFamily: serif, fontSize: k === 3 ? 170 : 150, color: '#EEF0F6', letterSpacing: '-0.03em', opacity: p(f, 12, 44), textAlign: 'center' }}>
            {k === 3 ? <>sekadar <span style={{ fontStyle: 'italic', color: '#9DB4FF' }}>nama?</span></> : <>identitas</>}
          </div>
        </Center>
      )}
      {k === 5 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const q = p(f, 4 + i * 10, 110);
            return <div key={i} style={{ position: 'absolute', left: W / 2 - (200 + q * (500 + i * 140)), top: H / 2 - (200 + q * (500 + i * 140)) * 0.5 + 0, width: (200 + q * (500 + i * 140)) * 2, height: (200 + q * (500 + i * 140)), borderRadius: 999, border: '1.5px solid rgba(157,180,255,0.5)', opacity: (1 - q) * 0.8 + 0.1 }} />;
          })}
          <Center>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 120, color: '#EEF0F6', opacity: p(f, 20, 60) }}>imajinasi</div>
          </Center>
        </>
      )}
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const src = ['openai.com — Previewing GPT-5.6 Sol', 'developers.openai.com — GPT-6 Astra', 'blog.google — Introducing Gemini 4 Neon', 'platform.claude.com — Models overview'];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 140, top: 190, opacity: p(f, 0, 30) }}>
        <div style={{ fontFamily: serif, fontWeight: 300, fontSize: 150, color: '#EEF0F6', lineHeight: 1.02 }}>BEYOND THE NAMES</div>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 58, color: '#9DB4FF', marginTop: 10 }}>The Philosophy Behind Frontier AI</div>
      </div>
      <div style={{ position: 'absolute', left: 140, top: 560, opacity: p(f, 40, 80) }}>
        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 36, color: '#EEF0F6', marginBottom: 20 }}>Sumber utama · data hingga 21 November 2026</div>
        {src.map((s) => <div key={s} style={{ fontFamily: sans, fontSize: 36, color: 'rgba(238,240,246,0.72)', marginBottom: 10 }}>{s}</div>)}
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 34, color: 'rgba(238,240,246,0.55)', marginTop: 22, maxWidth: 1400 }}>
          Etimologi dibedakan dari tafsir. Alasan resmi pemilihan nama tidak diklaim.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── dispatcher ───────── */
export const BeatVisual: React.FC<{ chapter: Chapter; v: string; m?: ModelId }> = ({ chapter, v, m }) => {
  switch (v) {
    case 'names': return <Names3 />;
    case 'why': return <Why />;
    case 'old': return <OldNames />;
    case 'title': return <TitleCard />;
    case 'axis': return <Axis stage={0} />;
    case 'axis2': return <Axis stage={1} />;
    case 'timeline': return <TimelineScene />;
    case 'gen': return <GenScene />;
    case 'identity': return <IdentityScene />;
    case 'lens': return <LensScene />;
    case 'cosmos': return <CosmosIntro />;
    case 'periodic': return <Periodic />;
    case 'forms': return <FormsIntro />;
    case 'model': return <ModelScene id={m!} theme={chapter.theme} />;
    case 'orrery': return <Orrery />;
    case 'atomic': return <AtomicScale />;
    case 'scale': return <ScaleScene />;
    case 'trio': return <Compare upTo={-1} />;
    case 'row0': return <Compare upTo={0} />;
    case 'row1': return <Compare upTo={1} />;
    case 'row2': return <Compare upTo={2} />;
    case 'row3': return <Compare upTo={3} />;
    case 'verdict': return <Compare upTo={3} verdict />;
    case 'z1': return <Closing k={0} />;
    case 'z2': return <Closing k={1} />;
    case 'z3': return <Closing k={3} />;
    case 'z4': return <Closing k={4} />;
    case 'z5': return <Closing k={5} />;
    case 'z6': return <Closing k={5} />;
    case 'end': return <EndCard />;
    default: return null;
  }
};
