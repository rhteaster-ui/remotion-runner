import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnthropicLogo, DeepMindLogo, GeminiSparkle, OpenAILogo} from './Logos';
import {NEON_FONT, NEON_TOKENS as T} from './neonTokens';

const CW = 952;
const M = 64;

// Helper spring & progress
const p = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const shake = (frame: number, start: number, amp: number, decay = 12) => {
  const t = frame - start;
  if (t < 0) return {x: 0, y: 0, r: 0};
  const k = Math.exp(-t / decay) * amp;
  return {
    x: Math.sin(t * 2.9) * k,
    y: Math.cos(t * 3.7) * k,
    r: Math.sin(t * 2.1) * k * 0.05,
  };
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1: HOOK & REVEAL (Dark Obsidian Canvas -> Neon Blast)
   ══════════════════════════════════════════════════════════════════════════ */
export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const enter = p(f, 4, 24);
  const ring = p(f, 18, 50);
  const blast = p(f, 46, 68);

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, backgroundImage: T.bgRadial, overflow: 'hidden'}}>
      {/* Top Header */}
      <div style={{position: 'absolute', top: 120, left: M, right: M, textAlign: 'center', opacity: enter}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 999, background: 'rgba(255, 94, 30, 0.12)', border: '1.5px solid rgba(255, 94, 30, 0.4)'}}>
          <DeepMindLogo size={22} />
          <span style={{fontFamily: NEON_FONT.mono, fontSize: 16, fontWeight: 700, color: T.neon, letterSpacing: '0.15em'}}>
            GOOGLE DEEPMIND · OFFICIAL DISPATCH
          </span>
        </div>
        <h1 style={{fontFamily: NEON_FONT.sans, fontSize: 72, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.04em', margin: '24px 0 8px', lineHeight: 1.08}}>
          Keluarga Gemini 4 <br />
          <span style={{color: T.neon, textShadow: T.neonGlow}}>Resmi Kedatangan Anggota Baru</span>
        </h1>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 22, color: T.inkMuted}}>
          Bukan rumor — Varian Mid-Tier Resmi Dirilis November 2026
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div style={{position: 'absolute', top: 580, left: '50%', transform: 'translateX(-50%)', width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Expanding Plasma Rings */}
        {[1, 2, 3].map((r) => (
          <div
            key={r}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 320 + r * 140 * ring,
              height: 320 + r * 140 * ring,
              marginLeft: -(160 + r * 70 * ring),
              marginTop: -(160 + r * 70 * ring),
              borderRadius: 999,
              border: `2px solid rgba(255, 94, 30, ${0.7 - r * 0.2})`,
              opacity: (1 - ring) * 0.9,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Central Chemical Element Badge */}
        <div
          style={{
            position: 'relative',
            width: 520,
            height: 520,
            borderRadius: 48,
            backgroundColor: T.surface,
            border: `3px solid ${T.neon}`,
            boxShadow: `${T.neonGlow}, inset 0 0 40px rgba(255, 94, 30, 0.2)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${0.85 + 0.15 * blast})`,
            padding: 30,
          }}
        >
          <div style={{position: 'absolute', top: 32, left: 38, fontFamily: NEON_FONT.mono, fontSize: 32, fontWeight: 800, color: T.neon}}>
            10
          </div>
          <div style={{position: 'absolute', top: 32, right: 38, fontFamily: NEON_FONT.mono, fontSize: 20, fontWeight: 700, color: T.inkMuted}}>
            20.179
          </div>

          <GeminiSparkle size={110} color={T.neon} style={{marginBottom: 10, filter: 'drop-shadow(0 0 25px #FF5E1E)'}} />

          <div style={{fontFamily: NEON_FONT.sans, fontSize: 136, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.05em', lineHeight: 0.9}}>
            Ne
          </div>
          <div style={{fontFamily: NEON_FONT.sans, fontSize: 42, fontWeight: 800, color: T.neon, letterSpacing: '0.12em', marginTop: 12}}>
            NEON
          </div>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 16, fontWeight: 700, color: T.inkMuted, letterSpacing: '0.2em', marginTop: 6}}>
            THE BALANCED WORKHORSE
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div style={{display: 'flex', gap: 16, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center'}}>
          {['1 Million Token Context', 'Scalable Thinking Levels', 'Frontier Mid-Tier Pricing'].map((t, i) => (
            <div
              key={t}
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                backgroundColor: T.surfaceElevated,
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                fontFamily: NEON_FONT.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#FFFFFF',
                opacity: p(f, 30 + i * 8, 48 + i * 8),
                transform: `translateY(${(1 - p(f, 30 + i * 8, 48 + i * 8)) * 20}px)`,
              }}
            >
              ✓ {t}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: ANATOMI TIGA ELEMEN (Carbon vs Neon vs Hydrogen)
   ══════════════════════════════════════════════════════════════════════════ */
export const S2Posisi: React.FC = () => {
  const f = useCurrentFrame();
  const enter = p(f, 4, 20);

  const ELEMENTS = [
    {
      num: '06',
      sym: 'C',
      name: 'CARBON',
      role: 'Heavy Research & Reasoning',
      trait: 'Deep, Massive, Expensive',
      color: T.carbon,
      glow: 'rgba(59, 130, 246, 0.4)',
      score: '63.5',
      speed: '38 tok/s',
    },
    {
      num: '10',
      sym: 'Ne',
      name: 'NEON',
      role: 'The Balanced Workhorse',
      trait: 'Sweet Spot: High IQ & Speed',
      color: T.neon,
      glow: 'rgba(255, 94, 30, 0.6)',
      score: '61.4',
      speed: '142 tok/s',
      highlight: true,
    },
    {
      num: '01',
      sym: 'H',
      name: 'HYDROGEN',
      role: 'Daily Rapid Execution',
      trait: 'Light, Realtime, Cheap',
      color: T.hydrogen,
      glow: 'rgba(16, 185, 129, 0.4)',
      score: '49.2',
      speed: '210 tok/s',
    },
  ];

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, backgroundImage: T.bgRadial, overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 120, left: M, right: M, textAlign: 'center', opacity: enter}}>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 18, color: T.neon, letterSpacing: '0.2em', fontWeight: 800}}>
          POSISI DALAM EKOSISTEM GEMINI 4
        </div>
        <h2 style={{fontFamily: NEON_FONT.sans, fontSize: 62, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', margin: '14px 0 0'}}>
          Tiga Spektrum: Riset, Workhorse, & Kilat
        </h2>
      </div>

      {/* 3 Elemental Cards Grid */}
      <div style={{position: 'absolute', top: 380, left: M, right: M, display: 'flex', flexDirection: 'column', gap: 24}}>
        {ELEMENTS.map((el, idx) => {
          const k = p(f, 10 + idx * 10, 26 + idx * 10);
          return (
            <div
              key={el.sym}
              style={{
                width: '100%',
                height: 250,
                borderRadius: 32,
                backgroundColor: T.surface,
                border: el.highlight ? `2.5px solid ${T.neon}` : '1.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow: el.highlight ? T.neonGlow : T.shadowCard,
                padding: '24px 34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: k,
                transform: `translateX(${(1 - k) * (idx === 1 ? 0 : idx === 0 ? -60 : 60)}px) scale(${el.highlight ? 1.04 : 0.98})`,
              }}
            >
              {/* Left Elemental Box */}
              <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 24,
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: `2px solid ${el.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <span style={{position: 'absolute', top: 8, left: 12, fontFamily: NEON_FONT.mono, fontSize: 18, color: el.color, fontWeight: 800}}>
                    {el.num}
                  </span>
                  <span style={{fontFamily: NEON_FONT.sans, fontSize: 64, fontWeight: 800, color: '#FFFFFF', lineHeight: 1}}>
                    {el.sym}
                  </span>
                </div>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontFamily: NEON_FONT.sans, fontSize: 36, fontWeight: 800, color: '#FFFFFF'}}>
                      Gemini 4 {el.name}
                    </span>
                    {el.highlight && (
                      <span style={{padding: '4px 12px', borderRadius: 999, backgroundColor: T.neon, color: '#FFFFFF', fontFamily: NEON_FONT.mono, fontSize: 13, fontWeight: 800}}>
                        NEW RELEASE
                      </span>
                    )}
                  </div>
                  <div style={{fontFamily: NEON_FONT.sans, fontSize: 22, fontWeight: 600, color: el.color, marginTop: 4}}>
                    {el.role}
                  </div>
                  <div style={{fontFamily: NEON_FONT.mono, fontSize: 16, color: T.inkMuted, marginTop: 6}}>
                    {el.trait}
                  </div>
                </div>
              </div>

              {/* Right Metrics Box */}
              <div style={{textAlign: 'right', minWidth: 200}}>
                <div style={{fontFamily: NEON_FONT.mono, fontSize: 14, color: T.inkMuted}}>REASONING INDEX</div>
                <div style={{fontFamily: NEON_FONT.mono, fontSize: 44, fontWeight: 800, color: el.color}}>
                  {el.score}
                </div>
                <div style={{fontFamily: NEON_FONT.mono, fontSize: 15, color: '#FFFFFF', marginTop: 2}}>
                  ⚡ {el.speed}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 240,
          left: M,
          right: M,
          padding: '24px 32px',
          borderRadius: 24,
          backgroundColor: 'rgba(255, 94, 30, 0.1)',
          border: '1.5px solid rgba(255, 94, 30, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{fontFamily: NEON_FONT.sans, fontSize: 24, fontWeight: 700, color: '#FFFFFF'}}>
          🎯 <b style={{color: T.neon}}>Kesimpulan:</b> Neon mengambil 96% kecerdasan Carbon dengan kecepatan hampir 4x lipat!
        </span>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: SCALABLE THINKING LEVELS & 1M CONTEXT
   ══════════════════════════════════════════════════════════════════════════ */
export const S3Thinking: React.FC = () => {
  const f = useCurrentFrame();
  const enter = p(f, 4, 20);

  const LEVELS = [
    {name: 'LOW', desc: 'Tugas singkat & triage cepat', tokens: '1k think'},
    {name: 'MEDIUM', desc: 'Refactor kode & perbaikan bug', tokens: '4k think'},
    {name: 'HIGH', desc: 'Default reasoning cerdas', tokens: '16k think'},
    {name: 'X-HIGH', desc: 'Arsitektur rumit & kalkulasi sains', tokens: '64k deep think', hero: true},
  ];

  const activeLevelIdx = Math.min(3, Math.floor(p(f, 30, 160) * 4));

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, backgroundImage: T.bgRadial, overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 120, left: M, right: M, textAlign: 'center', opacity: enter}}>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 18, color: T.cyan, letterSpacing: '0.2em', fontWeight: 800}}>
          DYNAMIC REASONING CONTROL
        </div>
        <h2 style={{fontFamily: NEON_FONT.sans, fontSize: 62, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', margin: '14px 0 0'}}>
          Scalable Thinking Levels
        </h2>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 22, color: T.inkMuted, marginTop: 8}}>
          Atur kedalaman berpikir AI sesuai kerumitan masalah & efisiensi token
        </div>
      </div>

      {/* Interactive Thinking Selector Slider Mockup */}
      <div style={{position: 'absolute', top: 410, left: M, right: M, backgroundColor: T.surface, borderRadius: 36, padding: '36px 32px', border: '1.5px solid rgba(255, 255, 255, 0.1)', boxShadow: T.shadowCard}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 24}}>
          <span style={{fontFamily: NEON_FONT.mono, fontSize: 18, color: T.inkMuted}}>MODE THINKING AKTIF</span>
          <span style={{fontFamily: NEON_FONT.mono, fontSize: 20, fontWeight: 800, color: T.neon}}>
            PARAM: --thinking-level={LEVELS[activeLevelIdx].name.toLowerCase()}
          </span>
        </div>

        {/* 4 Levels Grid */}
        <div style={{display: 'flex', gap: 16}}>
          {LEVELS.map((lvl, idx) => {
            const isActive = idx === activeLevelIdx;
            return (
              <div
                key={lvl.name}
                style={{
                  flex: 1,
                  padding: '28px 18px',
                  borderRadius: 24,
                  backgroundColor: isActive ? 'rgba(255, 94, 30, 0.18)' : T.surfaceElevated,
                  border: isActive ? `2px solid ${T.neon}` : '1.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? T.neonGlow : 'none',
                  textAlign: 'center',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{fontFamily: NEON_FONT.sans, fontSize: 32, fontWeight: 800, color: isActive ? T.neon : '#FFFFFF'}}>
                  {lvl.name}
                </div>
                <div style={{fontFamily: NEON_FONT.mono, fontSize: 13, color: isActive ? '#FFFFFF' : T.inkMuted, marginTop: 10, minHeight: 40}}>
                  {lvl.desc}
                </div>
                <div style={{display: 'inline-block', marginTop: 14, padding: '4px 12px', borderRadius: 999, backgroundColor: isActive ? T.neon : 'rgba(255,255,255,0.06)', fontFamily: NEON_FONT.mono, fontSize: 12, fontWeight: 700, color: isActive ? '#FFFFFF' : T.inkMuted}}>
                  {lvl.tokens}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1 Million Context Section */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          left: M,
          right: M,
          backgroundColor: T.surface,
          borderRadius: 36,
          padding: '36px 40px',
          border: '1.5px solid rgba(0, 229, 255, 0.3)',
          boxShadow: T.cyanGlow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <span style={{width: 12, height: 12, borderRadius: 999, backgroundColor: T.cyan}} />
            <span style={{fontFamily: NEON_FONT.mono, fontSize: 16, color: T.cyan, fontWeight: 800, letterSpacing: '0.15em'}}>
              UNIFIED MULTIMODAL CONTEXT
            </span>
          </div>
          <div style={{fontFamily: NEON_FONT.sans, fontSize: 44, fontWeight: 800, color: '#FFFFFF', marginTop: 8}}>
            1 Juta Token Context Window
          </div>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 18, color: T.inkMuted, marginTop: 4}}>
            Input repo raksasa, log server berjam-jam, spreadsheet masif, & video HD
          </div>
        </div>

        <div style={{textAlign: 'right'}}>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 72, fontWeight: 800, color: T.cyan, lineHeight: 1}}>
            1,000,000
          </div>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 16, color: '#FFFFFF', marginTop: 6}}>
            TOKENS NATIVE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: BENCHMARK RESMI (Neon vs Claude Opus 5.5 vs GPT-6.2 Sol)
   ══════════════════════════════════════════════════════════════════════════ */
export const S4Benchmark: React.FC = () => {
  const f = useCurrentFrame();
  const enter = p(f, 4, 18);
  const roll = p(f, 20, 80);
  const sh = shake(f, 85, 12, 10);

  const BENCHMARKS = [
    {
      name: 'Gemini 4 Neon (xhigh)',
      vendor: 'Google DeepMind',
      Logo: GeminiSparkle,
      logoColor: T.neon,
      score: (61.4 * roll).toFixed(1),
      maxScore: 61.4,
      widthPct: 88 * roll,
      color: T.neon,
      barGradient: 'linear-gradient(90deg, #FF5E1E, #FF9900)',
      glow: T.neonGlow,
      speed: '142 tok/s (Super Cepat)',
      isWinner: true,
    },
    {
      name: 'Claude Opus 5.5',
      vendor: 'Anthropic',
      Logo: AnthropicLogo,
      logoColor: T.claude,
      score: (60.2 * roll).toFixed(1),
      maxScore: 60.2,
      widthPct: 85 * roll,
      color: T.claude,
      barGradient: 'linear-gradient(90deg, #D97706, #F59E0B)',
      glow: 'none',
      speed: '48 tok/s (3x Lebih Lambat)',
      isWinner: false,
    },
    {
      name: 'GPT-6.2 Sol',
      vendor: 'OpenAI',
      Logo: OpenAILogo,
      logoColor: T.gpt,
      score: (59.8 * roll).toFixed(1),
      maxScore: 59.8,
      widthPct: 83 * roll,
      color: T.gpt,
      barGradient: 'linear-gradient(90deg, #0D9488, #14B8A6)',
      glow: 'none',
      speed: '54 tok/s (2.6x Lebih Lambat)',
      isWinner: false,
    },
  ];

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, backgroundImage: T.bgRadial, overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: 110, left: M, right: M, textAlign: 'center', opacity: enter}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 18px', borderRadius: 999, background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)'}}>
          <span style={{fontFamily: NEON_FONT.mono, fontSize: 15, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.12em'}}>
            OFFICIAL FRONTIER REASONING BENCHMARK (NOVEMBER 2026)
          </span>
        </div>
        <h2 style={{fontFamily: NEON_FONT.sans, fontSize: 58, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', margin: '14px 0 0'}}>
          Adu Otak: Neon vs Claude vs GPT
        </h2>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 20, color: T.inkMuted, marginTop: 6}}>
          Artificial Analysis Intelligence & Coding Index Benchmark
        </div>
      </div>

      {/* Main Benchmark Cards with Screenshake */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: M,
          right: M,
          transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {BENCHMARKS.map((b) => (
          <div
            key={b.name}
            style={{
              backgroundColor: T.surface,
              borderRadius: 28,
              padding: '24px 30px',
              border: b.isWinner ? `2.5px solid ${T.neon}` : '1.5px solid rgba(255, 255, 255, 0.08)',
              boxShadow: b.isWinner ? T.neonGlow : T.shadowCard,
            }}
          >
            {/* Header model */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <b.Logo size={36} color={b.logoColor} />
                <div>
                  <div style={{fontFamily: NEON_FONT.sans, fontSize: 28, fontWeight: 800, color: '#FFFFFF'}}>
                    {b.name}
                  </div>
                  <div style={{fontFamily: NEON_FONT.mono, fontSize: 14, color: T.inkMuted}}>
                    {b.vendor} · Speed: <span style={{color: '#FFFFFF'}}>{b.speed}</span>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                {b.isWinner && (
                  <span style={{padding: '6px 14px', borderRadius: 999, backgroundColor: T.neon, color: '#FFFFFF', fontFamily: NEON_FONT.mono, fontSize: 13, fontWeight: 800}}>
                    ★ WINNER / SWEET SPOT
                  </span>
                )}
                <div style={{fontFamily: NEON_FONT.mono, fontSize: 48, fontWeight: 800, color: b.color, minWidth: 100, textAlign: 'right'}}>
                  {b.score}
                </div>
              </div>
            </div>

            {/* Horizontal Progress Bar */}
            <div style={{width: '100%', height: 26, borderRadius: 13, backgroundColor: 'rgba(255, 255, 255, 0.06)', overflow: 'hidden', padding: 3}}>
              <div
                style={{
                  width: `${b.widthPct}%`,
                  height: '100%',
                  borderRadius: 10,
                  background: b.barGradient,
                  boxShadow: b.isWinner ? '0 0 20px #FF5E1E' : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Coding Benchmark Extra Details (Terminal-Bench) */}
      <div
        style={{
          position: 'absolute',
          top: 1080,
          left: M,
          right: M,
          backgroundColor: T.surfaceElevated,
          borderRadius: 24,
          padding: '24px 30px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 15, color: T.inkMuted}}>TERMINAL-BENCH CODING</div>
          <div style={{fontFamily: NEON_FONT.sans, fontSize: 32, fontWeight: 800, color: T.neon, marginTop: 4}}>
            Neon 74.8% <span style={{fontSize: 18, color: '#FFFFFF'}}>(Unggul 1.6%)</span>
          </div>
        </div>
        <div style={{width: 1, backgroundColor: 'rgba(255,255,255,0.1)'}} />
        <div>
          <div style={{fontFamily: NEON_FONT.mono, fontSize: 15, color: T.inkMuted}}>COST PER 1M TOKENS</div>
          <div style={{fontFamily: NEON_FONT.sans, fontSize: 32, fontWeight: 800, color: T.cyan, marginTop: 4}}>
            $3.00 / $15.00 <span style={{fontSize: 18, color: '#FFFFFF'}}>(Jauh Lebih Hemat)</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: OUTRO & BRANDING RHMT OFC
   ══════════════════════════════════════════════════════════════════════════ */
export const S5Outro: React.FC = () => {
  const f = useCurrentFrame();
  const enter = p(f, 4, 22);

  const STACKS = ['Gemini 4 API', 'Next.js 16', 'TypeScript', 'Remotion 4', 'Tailwind CSS'];

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, backgroundImage: T.bgRadial, overflow: 'hidden'}}>
      {/* Background Floating Confetti */}
      {Array.from({length: 24}).map((_, i) => {
        const t = f - random(`c${i}`) * 20;
        if (t < 0) return null;
        const x = random(`cx${i}`) * 1080;
        const y = (t * (4 + random(`cs${i}`) * 4)) % 1920;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 10,
              height: 18,
              borderRadius: 3,
              backgroundColor: i % 2 === 0 ? T.neon : T.cyan,
              opacity: 0.6,
              transform: `rotate(${t * 6}deg)`,
            }}
          />
        );
      })}

      {/* Center Profile Showcase */}
      <div style={{position: 'absolute', top: 320, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: enter}}>
        <div style={{position: 'relative', width: 340, height: 340}}>
          {/* Glowing Ring */}
          <div style={{position: 'absolute', inset: -14, borderRadius: 999, border: `3px dashed ${T.neon}`, opacity: 0.5, transform: `rotate(${f * 0.5}deg)`}} />
          <div style={{position: 'absolute', inset: -6, borderRadius: 999, border: `3px solid ${T.neon}`, boxShadow: T.neonGlow}} />
          <Img
            src={staticFile('assets/erekap/pp-dev.webp')}
            style={{width: 340, height: 340, borderRadius: 999, objectFit: 'cover'}}
          />
          <div
            style={{
              position: 'absolute',
              right: 12,
              bottom: 12,
              width: 64,
              height: 64,
              borderRadius: 999,
              backgroundColor: T.neon,
              border: '4px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Name & Identity */}
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 20, color: T.neon, fontWeight: 800, letterSpacing: '0.24em', marginTop: 36}}>
          DIKEMBANGKAN OLEH
        </div>
        <h2 style={{fontFamily: NEON_FONT.sans, fontSize: 84, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.04em', margin: '8px 0 0'}}>
          Rahmat
        </h2>
        <div style={{fontFamily: NEON_FONT.sans, fontSize: 44, fontWeight: 800, color: T.neon, letterSpacing: '-0.02em'}}>
          · rhmt ofc
        </div>
        <div style={{fontFamily: NEON_FONT.mono, fontSize: 22, color: T.inkMuted, marginTop: 10}}>
          Portfolio: rhmt.biz.id · Full-Stack & AI Systems
        </div>

        {/* Tech Stack Pills */}
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800, marginTop: 42}}>
          {STACKS.map((s) => (
            <span
              key={s}
              style={{
                padding: '12px 24px',
                borderRadius: 16,
                backgroundColor: T.surface,
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                fontFamily: NEON_FONT.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 48,
            padding: '22px 54px',
            borderRadius: 999,
            backgroundColor: T.neon,
            boxShadow: T.neonGlow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{fontFamily: NEON_FONT.sans, fontSize: 32, fontWeight: 800, color: '#FFFFFF'}}>
            Kunjungi rhmt.biz.id
          </span>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
