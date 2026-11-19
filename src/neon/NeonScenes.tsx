import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {
  ClaudeOfficialLogo,
  DeepMindOfficialLogo,
  GeminiOfficialLogo,
  GoogleAIStudioBadge,
  NeonSparkle,
  OpenAIOfficialLogo,
} from './Logos';
import {E, focusCam, p, shake} from './motion';
import {NeonHeaderHUD, SpecPillStrip, TelemetryCard} from './NeonPrimitives';
import {NEON_FONT, NEON_TOKENS as T} from './neonTokens';

const CW = 960;
const LEFT_M = 60;

/* ══════════════════════════════════════════════════════════════════════════
   DYNAMIC BACKGROUND (Noise-Inspired Fluid Obsidian Matrix)
   ══════════════════════════════════════════════════════════════════════════ */
export const NeonBg: React.FC = () => {
  const f = useCurrentFrame();

  const orb = (
    x: number,
    y: number,
    size: number,
    color: string,
    speed: number,
    offset: number
  ) => {
    const ox = Math.sin(f * speed + offset) * 70;
    const oy = Math.cos(f * speed * 0.8 + offset) * 50;
    return (
      <div
        style={{
          position: 'absolute',
          left: x + ox - size / 2,
          top: y + oy - size / 2,
          width: size,
          height: size,
          borderRadius: 999,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
    );
  };

  return (
    <AbsoluteFill style={{backgroundColor: T.bg, overflow: 'hidden'}}>
      {orb(220, 360, 680, 'rgba(255, 94, 30, 0.22)', 0.015, 0)}
      {orb(860, 920, 720, 'rgba(0, 229, 255, 0.16)', 0.012, 2.4)}
      {orb(540, 1500, 600, 'rgba(59, 130, 246, 0.14)', 0.018, 4.2)}

      {/* Dynamic Grid Matrix */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
          backgroundPosition: `${(f * 0.3) % 36}px ${(f * 0.2) % 36}px`,
          opacity: 0.7,
        }}
      />

      {/* Corner Tech Brackets */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 20,
          height: 20,
          borderTop: '2px solid rgba(255, 94, 30, 0.5)',
          borderLeft: '2px solid rgba(255, 94, 30, 0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 20,
          height: 20,
          borderTop: '2px solid rgba(255, 94, 30, 0.5)',
          borderRight: '2px solid rgba(255, 94, 30, 0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          width: 20,
          height: 20,
          borderBottom: '2px solid rgba(255, 94, 30, 0.5)',
          borderLeft: '2px solid rgba(255, 94, 30, 0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 20,
          height: 20,
          borderBottom: '2px solid rgba(255, 94, 30, 0.5)',
          borderRight: '2px solid rgba(255, 94, 30, 0.5)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1: HOOK & REVEAL (DeepMind Dispatch -> Quantum Spark Core)
   ══════════════════════════════════════════════════════════════════════════ */
export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.94, rx: 3, ry: -2, px: 0, py: 0},
    {f: 24, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.04, rx: -1, ry: 1, px: 0, py: -8, ease: E.inOut},
  ]);

  const enter = p(f, 4, 24, E.out);
  const ring = p(f, 18, 52, E.out);
  const blast = p(f, 46, 68, E.back);
  const sh = shake(f, 50, 12, 10);

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />
      <NeonHeaderHUD activeStep={0} />

      <AbsoluteFill
        style={{
          transform: `${cam.css} translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)`,
          transformOrigin: '50% 45%',
        }}
      >
        {/* Title Header */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: LEFT_M,
            width: CW,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.24em',
            }}
          >
            ─ DEEPMIND ANNOUNCEMENT 01 / 05 ─
          </div>

          <h1
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 66,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.035em',
              margin: '18px 0 10px',
              lineHeight: 1.12,
            }}
          >
            Keluarga Gemini 4 <br />
            <span style={{color: T.neon, textShadow: T.neonGlow}}>
              Resmi Rilis Varian Baru
            </span>
          </h1>

          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 20,
              color: T.inkMuted,
              fontWeight: 600,
            }}
          >
            Bukan sekadar rumor · Mid-Tier Reasoning Resmi November 2026
          </div>
        </div>

        {/* Hero Core Card */}
        <div
          style={{
            position: 'absolute',
            top: 410,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 580,
            height: 540,
            borderRadius: 44,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: `2.5px solid ${T.neon}`,
            boxShadow: `${T.neonGlow}, inset 0 0 50px rgba(255, 94, 30, 0.25)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: '50% 50%',
            transform: `translateX(-50%) scale(${0.86 + 0.14 * blast})`,
            padding: 34,
            backdropFilter: 'blur(20px)',
            zIndex: 30,
          }}
        >
          {/* Orbital Rings */}
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              style={{
                position: 'absolute',
                top: 270,
                left: 290,
                width: 320 + r * 140 * ring,
                height: 320 + r * 140 * ring,
                marginLeft: -(160 + r * 70 * ring),
                marginTop: -(160 + r * 70 * ring),
                borderRadius: 999,
                border: `2px solid rgba(255, 94, 30, ${0.7 - r * 0.2})`,
                opacity: (1 - ring) * 0.85,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Core Sparkle */}
          <div
            style={{
              position: 'relative',
              width: 150,
              height: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: 999,
                background:
                  'radial-gradient(circle, rgba(255, 94, 30, 0.5) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />
            <GeminiOfficialLogo size={130} />
          </div>

          <div
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 56,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            Gemini 4 <span style={{color: T.neon}}>Neon</span>
          </div>

          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.inkMuted,
              letterSpacing: '0.24em',
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            THE BALANCED WORKHORSE
          </div>
        </div>

        {/* Left & Right Telemetry Widgets (Filling Side Whitespace) */}
        <TelemetryCard
          side="left"
          top={520}
          delay={24}
          label="LATENCY"
          value="142ms"
          sub="REALTIME RESPONSE"
          accent="#FF5E1E"
        />
        <TelemetryCard
          side="right"
          top={520}
          delay={32}
          label="CONTEXT"
          value="1,000,000"
          sub="FULL NATIVE TOKENS"
          accent="#00E5FF"
        />

        {/* Lower Stage: 3 Key Metrics Cards (Filling y: 990 - 1500) */}
        <div
          style={{
            position: 'absolute',
            top: 1000,
            left: LEFT_M,
            width: CW,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            zIndex: 40,
          }}
        >
          {[
            {
              n: '01',
              title: 'Cost-Effective',
              val: '8.5x Lebih Hemat',
              desc: 'Dibanding model heavy Carbon',
              col: '#FF5E1E',
            },
            {
              n: '02',
              title: 'Dynamic Reason',
              val: 'Scalable Thinking',
              desc: 'Token budget adaptif per tugas',
              col: '#00E5FF',
            },
            {
              n: '03',
              title: 'Throughput',
              val: '185 Tok/Detik',
              desc: 'Super responsif di produksi',
              col: '#10B981',
            },
          ].map((item, i) => {
            const q = p(f, 34 + i * 8, 54 + i * 8, E.back);
            return (
              <div
                key={item.n}
                style={{
                  padding: '26px 20px',
                  borderRadius: 24,
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: `1.5px solid rgba(255, 255, 255, 0.12)`,
                  boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(16px)',
                  opacity: q,
                  transform: `translateY(${(1 - q) * 40}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontFamily: NEON_FONT.mono,
                    fontSize: 12,
                    fontWeight: 800,
                    color: item.col,
                    letterSpacing: '0.14em',
                  }}
                >
                  FEATURE {item.n}
                </div>
                <div
                  style={{
                    fontFamily: NEON_FONT.sans,
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginTop: 8,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.val}
                </div>
                <div
                  style={{
                    fontFamily: NEON_FONT.sans,
                    fontSize: 14,
                    color: T.inkMuted,
                    marginTop: 8,
                    lineHeight: 1.35,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Spec Strip (Filling y: 1540 - 1680) */}
        <SpecPillStrip
          delay={44}
          pills={[
            {label: 'TIER LEVEL', value: 'Frontier Mid-Tier', accent: '#FF5E1E'},
            {label: 'INFRASTRUCTURE', value: 'Google DeepMind', accent: '#00E5FF'},
            {label: 'LAUNCH DATE', value: 'November 2026', accent: '#10B981'},
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: ANATOMI TIGA ARSITEKTUR (Carbon vs Neon vs Hydrogen)
   ══════════════════════════════════════════════════════════════════════════ */
export const S2Posisi: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.95, rx: 3, ry: -2, px: 0, py: 0},
    {f: 28, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.03, rx: -1, ry: 1, px: 0, py: -6, ease: E.inOut},
  ]);

  const enter = p(f, 4, 22, E.out);

  const tiers = [
    {
      id: 'carbon',
      name: 'Gemini 4 Carbon',
      tag: 'HEAVYWEIGHT FRONTIER',
      spec: 'Heavy Multi-Step Reasoning · Ultra Deep Compute',
      badge: 'Tier 1 · Maximum Depth',
      col: '#3B82F6',
      active: false,
    },
    {
      id: 'neon',
      name: 'Gemini 4 Neon',
      tag: 'THE BALANCED WORKHORSE',
      spec: 'Sweet Spot Reasoning · Efisiensi Biaya & Kecepatan Optimal',
      badge: 'Varian Baru November 2026',
      col: '#FF5E1E',
      active: true,
    },
    {
      id: 'hydrogen',
      name: 'Gemini 4 Hydrogen',
      tag: 'FAST DAILY RUNNER',
      spec: 'Low-Latency Lightweight · High-Volume Tasks',
      badge: 'Tier 3 · Ultra Speed',
      col: '#10B981',
      active: false,
    },
  ];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />
      <NeonHeaderHUD activeStep={1} />

      <AbsoluteFill
        style={{transform: cam.css, transformOrigin: '50% 45%'}}
      >
        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: LEFT_M,
            width: CW,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.24em',
            }}
          >
            ─ MODEL HIERARCHY 02 / 05 ─
          </div>
          <h1
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '18px 0 10px',
            }}
          >
            Anatomi Tiga Pilar <span style={{color: T.neon}}>Gemini 4</span>
          </h1>
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 20,
              color: T.inkMuted,
              fontWeight: 600,
            }}
          >
            Neon menutup jurang besar antara Carbon dan Hydrogen
          </div>
        </div>

        {/* 3 Tier Comparative Stack (y: 380 - 1060) */}
        <div
          style={{
            position: 'absolute',
            top: 380,
            left: LEFT_M,
            width: CW,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            zIndex: 40,
          }}
        >
          {tiers.map((tItem, i) => {
            const cardP = p(f, 16 + i * 14, 38 + i * 14, E.back);
            return (
              <div
                key={tItem.id}
                style={{
                  position: 'relative',
                  padding: tItem.active ? '32px 36px' : '26px 36px',
                  borderRadius: 30,
                  backgroundColor: tItem.active
                    ? 'rgba(15, 23, 42, 0.95)'
                    : 'rgba(15, 23, 42, 0.75)',
                  border: tItem.active
                    ? `2.5px solid ${tItem.col}`
                    : `1.5px solid rgba(255, 255, 255, 0.1)`,
                  boxShadow: tItem.active
                    ? `${T.neonGlow}, 0 20px 40px rgba(0,0,0,0.7)`
                    : '0 12px 28px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(18px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 35}px) scale(${
                    tItem.active ? 1.02 : 1
                  })`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 20,
                      backgroundColor: `${tItem.col}22`,
                      border: `2px solid ${tItem.col}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 20px ${tItem.col}44`,
                    }}
                  >
                    <GeminiOfficialLogo size={42} />
                  </div>

                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                      <span
                        style={{
                          fontFamily: NEON_FONT.sans,
                          fontSize: tItem.active ? 34 : 30,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {tItem.name}
                      </span>
                      <span
                        style={{
                          fontFamily: NEON_FONT.mono,
                          fontSize: 12,
                          fontWeight: 800,
                          color: tItem.col,
                          backgroundColor: `${tItem.col}20`,
                          padding: '3px 10px',
                          borderRadius: 8,
                          border: `1px solid ${tItem.col}55`,
                        }}
                      >
                        {tItem.badge}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: NEON_FONT.mono,
                        fontSize: 14,
                        fontWeight: 700,
                        color: tItem.col,
                        letterSpacing: '0.12em',
                        marginTop: 4,
                      }}
                    >
                      {tItem.tag}
                    </div>

                    <div
                      style={{
                        fontFamily: NEON_FONT.sans,
                        fontSize: 16,
                        color: T.inkMuted,
                        marginTop: 6,
                      }}
                    >
                      {tItem.spec}
                    </div>
                  </div>
                </div>

                {tItem.active && (
                  <div
                    style={{
                      padding: '10px 20px',
                      borderRadius: 999,
                      backgroundColor: '#FF5E1E',
                      color: '#FFFFFF',
                      fontFamily: NEON_FONT.sans,
                      fontSize: 14,
                      fontWeight: 800,
                      boxShadow: '0 0 20px rgba(255, 94, 30, 0.7)',
                    }}
                  >
                    FOKUS UTAMA
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Lower Matrix Bar: Compute vs Latency Tradeoff (y: 1100 - 1500) */}
        <div
          style={{
            position: 'absolute',
            top: 1100,
            left: LEFT_M,
            width: CW,
            padding: '30px 36px',
            borderRadius: 28,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(16px)',
            zIndex: 40,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 13,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.16em',
              marginBottom: 14,
            }}
          >
            COMPUTE & LATENCY TRADEOFF MATRIX
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {[
              {name: 'Carbon', cost: '10x Compute', speed: 'Slower', pct: 95, col: '#3B82F6'},
              {name: 'Neon (Optimal)', cost: '1.2x Compute', speed: 'Ultra Fast', pct: 40, col: '#FF5E1E'},
              {name: 'Hydrogen', cost: '0.5x Compute', speed: 'Realtime', pct: 20, col: '#10B981'},
            ].map((m) => (
              <div key={m.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: NEON_FONT.sans,
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: 6,
                  }}
                >
                  <span>{m.name}</span>
                  <span style={{color: m.col, fontFamily: NEON_FONT.mono}}>
                    {m.cost} · {m.speed}
                  </span>
                </div>
                <div
                  style={{
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${m.pct}%`,
                      backgroundColor: m.col,
                      borderRadius: 6,
                      boxShadow: `0 0 12px ${m.col}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spec Strip (Filling y: 1540 - 1680) */}
        <SpecPillStrip
          delay={48}
          pills={[
            {label: 'BALANCED WORKHORSE', value: 'High Efficiency', accent: '#FF5E1E'},
            {label: 'API CALL SAVINGS', value: 'Up to 85%', accent: '#10B981'},
            {label: 'ENTERPRISE READY', value: 'Google Cloud Vertex', accent: '#00E5FF'},
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: SCALABLE THINKING LEVELS & 1M CONTEXT
   ══════════════════════════════════════════════════════════════════════════ */
export const S3Thinking: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.95, rx: 3, ry: -2, px: 0, py: 0},
    {f: 28, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.03, rx: -1, ry: 1, px: 0, py: -8, ease: E.inOut},
  ]);

  const enter = p(f, 4, 22, E.out);
  const budgetP = p(f, 24, 75, E.inOut);
  const currentTokens = Math.floor(interpolate(budgetP, [0, 1], [512, 8192]));

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />
      <NeonHeaderHUD activeStep={2} />

      <AbsoluteFill
        style={{transform: cam.css, transformOrigin: '50% 45%'}}
      >
        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: LEFT_M,
            width: CW,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.24em',
            }}
          >
            ─ REASONING ENGINE 03 / 05 ─
          </div>
          <h1
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '18px 0 10px',
            }}
          >
            Scalable Thinking <span style={{color: T.neon}}>Levels</span>
          </h1>
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 20,
              color: T.inkMuted,
              fontWeight: 600,
            }}
          >
            Atur budget kedalaman berpikir dari 0 hingga 8.192 tokens
          </div>
        </div>

        {/* Center Hero: Interactive Thinking Engine Terminal (y: 360 - 950) */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: LEFT_M,
            width: CW,
            padding: '36px 40px',
            borderRadius: 36,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            border: `2px solid ${T.neon}`,
            boxShadow: `${T.neonGlow}, 0 20px 50px rgba(0,0,0,0.8)`,
            backdropFilter: 'blur(20px)',
            zIndex: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: 20,
              marginBottom: 24,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: T.neon,
                  boxShadow: '0 0 12px #FF5E1E',
                }}
              />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.12em',
                }}
              >
                DYNAMIC REASONING BUDGET CONTROLLER
              </span>
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 18,
                fontWeight: 800,
                color: T.neon,
                backgroundColor: 'rgba(255, 94, 30, 0.18)',
                padding: '6px 16px',
                borderRadius: 999,
                border: '1px solid rgba(255, 94, 30, 0.4)',
              }}
            >
              {currentTokens.toLocaleString()} TOKENS
            </div>
          </div>

          {/* Thinking Budget Progress Gauge */}
          <div style={{marginBottom: 26}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: NEON_FONT.mono,
                fontSize: 14,
                fontWeight: 700,
                color: T.inkMuted,
                marginBottom: 8,
              }}
            >
              <span>LEVEL 0 (Off)</span>
              <span>LEVEL 2 (Standard)</span>
              <span style={{color: T.neon}}>LEVEL 5 (Full Deep Logic)</span>
            </div>
            <div
              style={{
                height: 18,
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                padding: 3,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${budgetP * 100}%`,
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, #FF5E1E 0%, #00E5FF 100%)',
                  boxShadow: '0 0 20px rgba(255, 94, 30, 0.8)',
                }}
              />
            </div>
          </div>

          {/* Live Step Verification Output Log */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 20,
              backgroundColor: 'rgba(8, 11, 18, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: NEON_FONT.mono,
              fontSize: 15,
              lineHeight: 1.6,
              color: '#FFFFFF',
            }}
          >
            <div style={{color: T.neon, fontWeight: 800, marginBottom: 6}}>
              [REASONING TRACE // MULTI-STEP TREE EXECUTION]
            </div>
            <div style={{color: '#10B981'}}>
              ✓ Step 01: Deconstruct complex multi-variable constraints
            </div>
            <div style={{color: '#00E5FF'}}>
              ✓ Step 02: Synthesize formal math verification & hypothesis
            </div>
            <div style={{color: T.inkMuted}}>
              ⋯ Step 03: Final theorem proof synthesized without hallucination
            </div>
          </div>
        </div>

        {/* Lower Stage: 1M Native Context Card (y: 990 - 1500) */}
        <div
          style={{
            position: 'absolute',
            top: 990,
            left: LEFT_M,
            width: CW,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            zIndex: 40,
          }}
        >
          <div
            style={{
              padding: '30px 32px',
              borderRadius: 30,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: '1.5px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7), 0 0 25px rgba(0, 229, 255, 0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                color: '#00E5FF',
                letterSpacing: '0.14em',
              }}
            >
              NATIVE MEMORY WINDOW
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 48,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '10px 0 6px',
                letterSpacing: '-0.02em',
              }}
            >
              1.000.000
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 17,
                color: T.inkMuted,
                lineHeight: 1.4,
              }}
            >
              Kapasitas jutaan token sekali prompt: input seluruh codebase atau dokumen buku.
            </div>
          </div>

          <div
            style={{
              padding: '30px 32px',
              borderRadius: 30,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7), 0 0 25px rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                color: '#10B981',
                letterSpacing: '0.14em',
              }}
            >
              ZERO-HALLUCINATION RATIO
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 48,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '10px 0 6px',
                letterSpacing: '-0.02em',
              }}
            >
              99.4%
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 17,
                color: T.inkMuted,
                lineHeight: 1.4,
              }}
            >
              Rasio konsistensi logika tertinggi di kelas mid-tier reasoning saat ini.
            </div>
          </div>
        </div>

        {/* Bottom Spec Strip (Filling y: 1540 - 1680) */}
        <SpecPillStrip
          delay={50}
          pills={[
            {label: 'TOKEN BUDGET', value: 'Dynamic Range 0-8K', accent: '#FF5E1E'},
            {label: 'CONTEXT WINDOW', value: '1 Million Tokens', accent: '#00E5FF'},
            {label: 'ACCURACY SCORE', value: 'Industry Frontier', accent: '#10B981'},
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: BENCHMARK RESMI (Gemini 4 Neon vs Claude 3.5 Sonnet & GPT-4o)
   ══════════════════════════════════════════════════════════════════════════ */
export const S4Benchmark: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.95, rx: 3, ry: -2, px: 0, py: 0},
    {f: 26, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.03, rx: -1, ry: 1, px: 0, py: -6, ease: E.inOut},
  ]);

  const enter = p(f, 4, 22, E.out);

  const benchmarks = [
    {
      title: 'HumanEval (Coding & Python Syntax)',
      neon: 92.4,
      claude: 93.7,
      gpt: 90.2,
      note: 'Setara Claude 3.5 Sonnet dengan sepertiga biaya',
    },
    {
      title: 'MATH-500 (Complex Mathematical Reasoning)',
      neon: 91.8,
      claude: 89.2,
      gpt: 86.4,
      note: 'Mengungguli Claude & GPT berkat thinking level',
    },
    {
      title: 'MMLU-Pro (Multi-discipline Academic QA)',
      neon: 88.6,
      claude: 87.9,
      gpt: 85.2,
      note: 'Akurasi tertinggi di kelas model mid-tier',
    },
  ];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />
      <NeonHeaderHUD activeStep={3} />

      <AbsoluteFill
        style={{transform: cam.css, transformOrigin: '50% 45%'}}
      >
        {/* Title */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: LEFT_M,
            width: CW,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.24em',
            }}
          >
            ─ EMPIRICAL BENCHMARKS 04 / 05 ─
          </div>
          <h1
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '18px 0 10px',
            }}
          >
            Hasil Uji Performa <span style={{color: T.neon}}>Resmi</span>
          </h1>
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 20,
              color: T.inkMuted,
              fontWeight: 600,
            }}
          >
            Berhadapan langsung dengan Claude 3.5 Sonnet & GPT-4o
          </div>
        </div>

        {/* 3 Benchmark Metric Cards (y: 370 - 1100) */}
        <div
          style={{
            position: 'absolute',
            top: 370,
            left: LEFT_M,
            width: CW,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            zIndex: 40,
          }}
        >
          {benchmarks.map((bm, i) => {
            const barP = p(f, 20 + i * 16, 50 + i * 16, E.out);
            return (
              <div
                key={bm.title}
                style={{
                  padding: '24px 32px',
                  borderRadius: 28,
                  backgroundColor: 'rgba(15, 23, 42, 0.94)',
                  border: '1.5px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: NEON_FONT.sans,
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {bm.title}
                  </span>
                  <span
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 13,
                      fontWeight: 700,
                      color: T.neon,
                    }}
                  >
                    {bm.note}
                  </span>
                </div>

                {/* 3 Comparison Bars */}
                <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                  {/* Gemini 4 Neon */}
                  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <div
                      style={{
                        width: 170,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: NEON_FONT.sans,
                        fontSize: 15,
                        fontWeight: 800,
                        color: T.neon,
                      }}
                    >
                      <GeminiOfficialLogo size={20} />
                      Gemini 4 Neon
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${bm.neon * barP}%`,
                          backgroundColor: '#FF5E1E',
                          borderRadius: 7,
                          boxShadow: '0 0 14px #FF5E1E',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 70,
                        textAlign: 'right',
                        fontFamily: NEON_FONT.mono,
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#FFFFFF',
                      }}
                    >
                      {(bm.neon * barP).toFixed(1)}%
                    </div>
                  </div>

                  {/* Claude 3.5 Sonnet */}
                  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <div
                      style={{
                        width: 170,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: NEON_FONT.sans,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#F59E0B',
                      }}
                    >
                      <ClaudeOfficialLogo size={18} />
                      Claude 3.5 Sonnet
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${bm.claude * barP}%`,
                          backgroundColor: '#F59E0B',
                          borderRadius: 6,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 70,
                        textAlign: 'right',
                        fontFamily: NEON_FONT.mono,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#94A3B8',
                      }}
                    >
                      {(bm.claude * barP).toFixed(1)}%
                    </div>
                  </div>

                  {/* GPT-4o */}
                  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <div
                      style={{
                        width: 170,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: NEON_FONT.sans,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#14B8A6',
                      }}
                    >
                      <OpenAIOfficialLogo size={18} />
                      GPT-4o
                    </div>
                    <div
                      style={{
                        flex: 1,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${bm.gpt * barP}%`,
                          backgroundColor: '#14B8A6',
                          borderRadius: 6,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 70,
                        textAlign: 'right',
                        fontFamily: NEON_FONT.mono,
                        fontSize: 15,
                        fontWeight: 700,
                        color: '#94A3B8',
                      }}
                    >
                      {(bm.gpt * barP).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower Stage: Pricing & Efficiency Box (y: 1140 - 1500) */}
        <div
          style={{
            position: 'absolute',
            top: 1140,
            left: LEFT_M,
            width: CW,
            padding: '26px 36px',
            borderRadius: 28,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: '2px solid rgba(255, 94, 30, 0.45)',
            boxShadow: '0 16px 36px -10px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 40,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                color: T.neon,
                letterSpacing: '0.14em',
              }}
            >
              PRICING & EFFICIENCY ADVANTAGE
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 28,
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: 6,
                letterSpacing: '-0.02em',
              }}
            >
              $0.35 / 1 Juta Token Prompt
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 15,
                color: T.inkMuted,
                marginTop: 4,
              }}
            >
              7x hingga 8x lebih hemat dibanding tarif Claude 3.5 Sonnet ($3.00) dan GPT-4o ($2.50)
            </div>
          </div>

          <div
            style={{
              padding: '12px 24px',
              borderRadius: 20,
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid #10B981',
              fontFamily: NEON_FONT.mono,
              fontSize: 18,
              fontWeight: 800,
              color: '#10B981',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
            }}
          >
            -85% BIAYA
          </div>
        </div>

        {/* Bottom Spec Strip (Filling y: 1540 - 1680) */}
        <SpecPillStrip
          delay={52}
          pills={[
            {label: 'MATH-500 WINNER', value: 'Gemini 4 Neon 91.8%', accent: '#FF5E1E'},
            {label: 'PRICE ADVANTAGE', value: '7x - 8x Cheaper', accent: '#10B981'},
            {label: 'CONTEXT CAP', value: '1,000,000 Tok Native', accent: '#00E5FF'},
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: OUTRO PROFIL TUAN RAHMAT (rhmt ofc · rhmt.biz.id)
   ══════════════════════════════════════════════════════════════════════════ */
export const S5Outro: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.95, rx: 3, ry: -2, px: 0, py: 0},
    {f: 30, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.03, rx: -1, ry: 1, px: 0, py: -6, ease: E.inOut},
  ]);

  const photo = p(f, 8, 34, E.back);
  const click = p(f, 150, 154, E.lin) * (1 - p(f, 154, 166, E.lin));
  const stack = [
    'Google AI Studio (Puck)',
    'Gemini 4 Neon Architecture',
    'Remotion 4 Studio Engine',
    'Next.js 16 Fullstack',
  ];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />
      <NeonHeaderHUD activeStep={4} />

      {/* Confetti Celebration Particles */}
      {Array.from({length: 40}).map((_, i) => {
        const t = f - 15 - random(`cd${i}`) * 35;
        if (t < 0) return null;
        const x = random(`cx${i}`) * 1080;
        const y = -60 + t * (4 + random(`cs${i}`) * 6);
        if (y > 1920) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + Math.sin(t * 0.1 + i) * 25,
              top: y,
              width: 10,
              height: 18,
              borderRadius: 3,
              backgroundColor: i % 3 === 0 ? '#FF5E1E' : i % 2 === 0 ? '#00E5FF' : '#FFFFFF',
              transform: `rotate(${t * (4 + (i % 5))}deg)`,
              opacity: 0.85,
              zIndex: 25,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{transform: cam.css, transformOrigin: '50% 45%'}}
      >
        {/* Outro Master Card (y: 130 - 1680) */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: LEFT_M,
            width: CW,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 40,
          }}
        >
          {/* Top Dispatch Tag */}
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: T.neon,
              letterSpacing: '0.24em',
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            ─ PRODUCED & DIRECTED BY 05 / 05 ─
          </div>

          {/* Profile Photo Avatar Frame */}
          <div
            style={{
              position: 'relative',
              width: 380,
              height: 380,
              transform: `scale(${photo})`,
              opacity: Math.min(1, photo * 1.5),
              marginBottom: 32,
            }}
          >
            {/* Dashed Animated Rotating Ring */}
            <div
              style={{
                position: 'absolute',
                inset: -24,
                borderRadius: 999,
                border: '3px dashed #FF5E1E',
                opacity: 0.55,
                transform: `rotate(${f * 0.8}deg)`,
              }}
            />
            {/* Glowing Border */}
            <div
              style={{
                position: 'absolute',
                inset: -10,
                borderRadius: 999,
                border: '4px solid #FFFFFF',
                boxShadow: '0 0 50px rgba(255, 94, 30, 0.6)',
              }}
            />
            {/* Owner Profile Image */}
            <Img
              src={staticFile('assets/neon/pp-dev.webp')}
              style={{
                width: 380,
                height: 380,
                borderRadius: 999,
                objectFit: 'cover',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8)',
              }}
            />
            {/* Verified Badge */}
            <div
              style={{
                position: 'absolute',
                right: 12,
                bottom: 12,
                width: 76,
                height: 76,
                borderRadius: 999,
                backgroundColor: '#FF5E1E',
                border: '5px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 94, 30, 0.6)',
                transform: `scale(${p(f, 30, 44, E.back)})`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="#FFFFFF"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Staggered Animated Creator Name: Rohmatulloh */}
          <div
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 76,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {'Rohmatulloh'.split('').map((ch, i) => {
              const q = p(f, 26 + i * 2, 42 + i * 2, E.out);
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: q,
                    transform: `translateY(${(1 - q) * 60}px)`,
                    filter: `blur(${(1 - q) * 6}px)`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>

          {/* Brand Identity: rhmt ofc */}
          <div
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 42,
              fontWeight: 800,
              color: T.neon,
              marginTop: 10,
              letterSpacing: '-0.02em',
              opacity: p(f, 48, 66),
              transform: `translateX(${(1 - p(f, 48, 70)) * 30}px)`,
            }}
          >
            · rhmt ofc
          </div>

          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 22,
              color: T.inkMuted,
              marginTop: 12,
              fontWeight: 600,
              opacity: p(f, 58, 76),
            }}
          >
            AI Systems Engineer · Creator of rhmt.biz.id
          </div>

          {/* Tech Stack Pills (Filling y: 980 - 1200) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              marginTop: 34,
              justifyContent: 'center',
              maxWidth: 820,
            }}
          >
            {stack.map((s, i) => {
              const q = p(f, 74 + i * 8, 94 + i * 8, E.back);
              return (
                <span
                  key={s}
                  style={{
                    padding: '14px 26px',
                    borderRadius: 18,
                    backgroundColor: i === 0 ? '#FF5E1E' : 'rgba(15, 23, 42, 0.92)',
                    color: i === 0 ? '#FFFFFF' : '#FFFFFF',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
                    fontFamily: NEON_FONT.sans,
                    fontWeight: 800,
                    fontSize: 18,
                    opacity: Math.min(1, q * 1.5),
                    transform: `translateY(${(1 - q) * 24}px) scale(${0.9 + 0.1 * q})`,
                  }}
                >
                  {s}
                </span>
              );
            })}
          </div>

          {/* Tactile CTA Button (Filling y: 1220 - 1340) */}
          <div
            style={{
              marginTop: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              padding: '22px 50px',
              borderRadius: 999,
              backgroundColor: '#FF5E1E',
              color: '#FFFFFF',
              fontFamily: NEON_FONT.sans,
              fontWeight: 800,
              fontSize: 26,
              boxShadow: `0 ${16 + click * 8}px 40px -8px rgba(255, 94, 30, 0.6), 0 0 ${
                click * 40
              }px rgba(255, 94, 30, 0.8)`,
              opacity: p(f, 110, 128),
              transform: `translateY(${(1 - p(f, 110, 132, E.back)) * 30}px) scale(${
                1 - click * 0.05
              })`,
            }}
          >
            <span>Kunjungi rhmt.biz.id</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Spec Strip (Filling y: 1540 - 1680) */}
        <SpecPillStrip
          delay={60}
          pills={[
            {label: 'OFFICIAL PORTFOLIO', value: 'rhmt.biz.id', accent: '#FF5E1E'},
            {label: 'COMMUNITY', value: 'RHMT OFC', accent: '#00E5FF'},
            {label: 'GITHUB', value: 'github.com/rhmt-ofc', accent: '#10B981'},
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
