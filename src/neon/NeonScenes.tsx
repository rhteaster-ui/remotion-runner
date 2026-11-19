import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ClaudeOfficialLogo,
  DeepMindOfficialLogo,
  GeminiOfficialLogo,
  GoogleAIStudioBadge,
  NeonSparkle,
  OpenAIOfficialLogo,
} from './Logos';
import {E, focusCam, p, shake} from './motion';
import {NEON_FONT, NEON_TOKENS as T} from './neonTokens';

const CW = 952;
const M = 64;

/* ══════════════════════════════════════════════════════════════════════════
   DYNAMIC BACKGROUND (Noise-Inspired Fluid Obsidian Matrix)
   ══════════════════════════════════════════════════════════════════════════ */
export const NeonBg: React.FC = () => {
  const f = useCurrentFrame();

  // Floating ambient light orbs
  const orb = (x: number, y: number, size: number, color: string, speed: number, offset: number) => {
    const ox = Math.sin(f * speed + offset) * 90;
    const oy = Math.cos(f * speed * 0.8 + offset) * 70;
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
      {/* Dynamic Glow Orbs */}
      {orb(220, 360, 680, 'rgba(255, 94, 30, 0.22)', 0.015, 0)}
      {orb(860, 920, 720, 'rgba(0, 229, 255, 0.16)', 0.012, 2.4)}
      {orb(540, 1500, 600, 'rgba(59, 130, 246, 0.14)', 0.018, 4.2)}

      {/* High-tech Perspective Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
          backgroundPosition: `${(f * 0.3) % 36}px ${(f * 0.2) % 36}px`,
          opacity: 0.7,
        }}
      />
      {/* Vignette Overlay */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8, 11, 18, 0.85) 100%)',
          pointerEvents: 'none',
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
    {f: 0, s: 0.94, rx: 4, ry: -3, px: 0, py: 0},
    {f: 24, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 50, s: 1.05, rx: -2, ry: 1, px: 0, py: -10, ease: E.inOut},
    {f: 120, s: 1.08, rx: 1, ry: -1, px: 0, py: -15, ease: E.out},
  ]);

  const enter = p(f, 4, 24, E.out);
  const ring = p(f, 18, 52, E.out);
  const blast = p(f, 46, 68, E.back);
  const sh = shake(f, 50, 14, 12);

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />

      {/* 3D Camera Rig */}
      <AbsoluteFill
        style={{
          transform: `${cam.css} translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)`,
          transformOrigin: '50% 45%',
        }}
      >
        {/* Top Official Header Badge */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: M,
            right: M,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 24px',
              borderRadius: 999,
              background: 'rgba(255, 94, 30, 0.12)',
              border: '1.5px solid rgba(255, 94, 30, 0.45)',
              boxShadow: '0 0 25px rgba(255, 94, 30, 0.25)',
            }}
          >
            <DeepMindOfficialLogo size={24} />
            <span
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                color: T.neon,
                letterSpacing: '0.16em',
              }}
            >
              GOOGLE DEEPMIND · OFFICIAL ANNOUNCEMENT
            </span>
          </div>

          <h1
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 74,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              margin: '26px 0 10px',
              lineHeight: 1.08,
            }}
          >
            Keluarga Gemini 4 <br />
            <span style={{color: T.neon, textShadow: T.neonGlow}}>
              Resmi Kedatangan Anggota Baru
            </span>
          </h1>

          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 22,
              color: T.inkMuted,
              fontWeight: 600,
            }}
          >
            Bukan sekadar rumor — Varian Mid-Tier Resmi Dirilis November 2026
          </div>
        </div>

        {/* Hero Quantum Spark Core */}
        <div
          style={{
            position: 'absolute',
            top: 590,
            left: '50%',
            transform: 'translateX(-50%)',
            width: CW,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Orbital Expanding Rings */}
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              style={{
                position: 'absolute',
                top: 250,
                left: '50%',
                width: 340 + r * 150 * ring,
                height: 340 + r * 150 * ring,
                marginLeft: -(170 + r * 75 * ring),
                marginTop: -(170 + r * 75 * ring),
                borderRadius: 999,
                border: `2px solid rgba(255, 94, 30, ${0.7 - r * 0.2})`,
                opacity: (1 - ring) * 0.85,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Core Hardware / Crystal Glassmorphic Card */}
          <div
            style={{
              position: 'relative',
              width: 560,
              height: 520,
              borderRadius: 44,
              backgroundColor: 'rgba(15, 23, 42, 0.88)',
              border: `2.5px solid ${T.neon}`,
              boxShadow: `${T.neonGlow}, inset 0 0 50px rgba(255, 94, 30, 0.25)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${0.86 + 0.14 * blast})`,
              padding: 34,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Corner Decorative Tech Markers */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                left: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: T.neon,
                  boxShadow: '0 0 10px #FF5E1E',
                }}
              />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 15,
                  fontWeight: 800,
                  color: T.neon,
                }}
              >
                G4-CORE // STABLE
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 28,
                fontFamily: NEON_FONT.mono,
                fontSize: 15,
                fontWeight: 700,
                color: T.inkMuted,
              }}
            >
              REV 2026.11
            </div>

            {/* Official Google Gemini Multi-Color Spark Vector */}
            <div
              style={{
                position: 'relative',
                width: 150,
                height: 150,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 130,
                  height: 130,
                  borderRadius: 999,
                  background:
                    'radial-gradient(circle, rgba(255, 94, 30, 0.45) 0%, transparent 70%)',
                  filter: 'blur(25px)',
                }}
              />
              <GeminiOfficialLogo size={130} />
            </div>

            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 54,
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
                fontSize: 17,
                fontWeight: 800,
                color: T.inkMuted,
                letterSpacing: '0.22em',
                marginTop: 10,
                textAlign: 'center',
              }}
            >
              THE BALANCED WORKHORSE
            </div>
          </div>

          {/* Three Feature Highlight Pills */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 44,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              '1 Juta Token Context',
              'Scalable Thinking Levels',
              'Frontier Mid-Tier Pricing',
            ].map((text, i) => {
              const pillP = p(f, 30 + i * 8, 48 + i * 8, E.back);
              return (
                <div
                  key={text}
                  style={{
                    padding: '12px 26px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    opacity: pillP,
                    transform: `translateY(${(1 - pillP) * 20}px)`,
                  }}
                >
                  <NeonSparkle size={18} color={T.neon} />
                  <span
                    style={{
                      fontFamily: NEON_FONT.sans,
                      fontSize: 19,
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: ANATOMI TIGA ARSITEKTUR (Carbon vs Neon vs Hydrogen)
   - Zero Chemistry Slop: Google AI Tier Nodes with Official Icons & Scores
   ══════════════════════════════════════════════════════════════════════════ */
export const S2Posisi: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.98, rx: 3, ry: -2, px: 0, py: 0},
    {f: 30, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 60, s: 1.04, rx: -2, ry: 1, px: 0, py: -25, ease: E.inOut}, // Zoom into Neon
    {f: 140, s: 1.06, rx: 1, ry: -1, px: 0, py: -30, ease: E.out},
  ]);

  const enter = p(f, 4, 20, E.out);

  const TIERS = [
    {
      tier: 'TIER 1 · FRONTIER',
      name: 'Gemini 4 Carbon',
      role: 'Heavy Research & Deep Reasoning',
      trait: 'Skor tertinggi sains & matematika rumit · Eksekusi berat',
      color: T.carbon,
      glow: 'rgba(59, 130, 246, 0.45)',
      score: '63.5',
      speed: '38 tok/s',
      highlight: false,
    },
    {
      tier: 'TIER 2 · WORKHORSE',
      name: 'Gemini 4 Neon',
      role: 'The Balanced Workhorse',
      trait: 'Sweet Spot: 96% kecerdasan Carbon dengan kecepatan tinggi',
      color: T.neon,
      glow: T.neonGlow,
      score: '61.4',
      speed: '142 tok/s',
      highlight: true,
      badge: '★ NEW SWEET SPOT',
    },
    {
      tier: 'TIER 3 · REALTIME',
      name: 'Gemini 4 Hydrogen',
      role: 'Daily Rapid Execution',
      trait: 'Eksekutor kilat tugas instan, latency ultra rendah & efisien',
      color: T.hydrogen,
      glow: 'rgba(16, 185, 129, 0.45)',
      score: '49.2',
      speed: '210 tok/s',
      highlight: false,
    },
  ];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />

      <AbsoluteFill style={{transform: cam.css, transformOrigin: '50% 45%'}}>
        {/* Scene Header */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: M,
            right: M,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 18,
              color: T.neon,
              letterSpacing: '0.22em',
              fontWeight: 800,
            }}
          >
            STRUKTUR EKOSISTEM GEMINI 4
          </div>
          <h2
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 66,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '14px 0 0',
            }}
          >
            Tiga Spektrum: Riset, Workhorse, & Kilat
          </h2>
        </div>

        {/* 3 Architecture Tier Cards */}
        <div
          style={{
            position: 'absolute',
            top: 380,
            left: M,
            right: M,
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
          }}
        >
          {TIERS.map((tier, idx) => {
            const cardP = p(f, 10 + idx * 12, 28 + idx * 12, E.back);
            return (
              <div
                key={tier.name}
                style={{
                  width: '100%',
                  height: 250,
                  borderRadius: 32,
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  border: tier.highlight
                    ? `2.5px solid ${T.neon}`
                    : '1.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: tier.highlight ? T.neonGlow : T.shadowCard,
                  padding: '24px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: cardP,
                  transform: `translateX(${(1 - cardP) * (idx === 1 ? 0 : idx === 0 ? -50 : 50)}px) scale(${tier.highlight ? 1.04 : 0.98})`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Left Side: Tier Node & Specs */}
                <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
                  {/* Glowing Architecture Node Icon */}
                  <div
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 26,
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: `2px solid ${tier.color}`,
                      boxShadow: `0 0 25px ${tier.glow}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <GeminiOfficialLogo size={64} />
                    <span
                      style={{
                        fontFamily: NEON_FONT.mono,
                        fontSize: 12,
                        fontWeight: 800,
                        color: tier.color,
                        marginTop: 4,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {tier.name.split(' ').pop()?.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                      <span
                        style={{
                          fontFamily: NEON_FONT.sans,
                          fontSize: 36,
                          fontWeight: 800,
                          color: '#FFFFFF',
                        }}
                      >
                        {tier.name}
                      </span>
                      {tier.badge && (
                        <span
                          style={{
                            padding: '6px 14px',
                            borderRadius: 999,
                            backgroundColor: T.neon,
                            color: '#FFFFFF',
                            fontFamily: NEON_FONT.mono,
                            fontSize: 13,
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            boxShadow: '0 0 15px rgba(255, 94, 30, 0.6)',
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontFamily: NEON_FONT.sans,
                        fontSize: 22,
                        fontWeight: 700,
                        color: tier.color,
                        marginTop: 6,
                      }}
                    >
                      {tier.role}
                    </div>

                    <div
                      style={{
                        fontFamily: NEON_FONT.mono,
                        fontSize: 16,
                        color: T.inkMuted,
                        marginTop: 8,
                      }}
                    >
                      {tier.trait}
                    </div>
                  </div>
                </div>

                {/* Right Side: Benchmark Score & Speed */}
                <div style={{textAlign: 'right', minWidth: 200}}>
                  <div
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 14,
                      color: T.inkMuted,
                      letterSpacing: '0.1em',
                    }}
                  >
                    REASONING INDEX
                  </div>
                  <div
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 48,
                      fontWeight: 800,
                      color: tier.color,
                      lineHeight: 1.05,
                    }}
                  >
                    {tier.score}
                  </div>
                  <div
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginTop: 4,
                    }}
                  >
                    ⚡ {tier.speed}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Takeaway Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 240,
            left: M,
            right: M,
            padding: '24px 34px',
            borderRadius: 24,
            backgroundColor: 'rgba(255, 94, 30, 0.12)',
            border: '1.5px solid rgba(255, 94, 30, 0.4)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 24,
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            🎯 <b style={{color: T.neon}}>Kesimpulan:</b> Neon mengambil 96%
            kecerdasan Carbon dengan kecepatan hampir 4x lipat!
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: SCALABLE THINKING LEVELS & 1M CONTEXT
   - Dynamic interactive level slider + 1M Native Multimodal Card
   ══════════════════════════════════════════════════════════════════════════ */
export const S3Thinking: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.98, rx: 3, ry: -2, px: 0, py: 0},
    {f: 30, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 80, s: 1.03, rx: -2, ry: 1, px: 0, py: -20, ease: E.inOut},
    {f: 140, s: 1.06, rx: 1, ry: -1, px: 0, py: -40, ease: E.out},
  ]);

  const enter = p(f, 4, 20, E.out);

  const LEVELS = [
    {name: 'LOW', desc: 'Tugas singkat & triage cepat', tokens: '1k think'},
    {name: 'MEDIUM', desc: 'Refactor kode & perbaikan bug', tokens: '4k think'},
    {name: 'HIGH', desc: 'Default reasoning cerdas', tokens: '16k think'},
    {
      name: 'X-HIGH',
      desc: 'Arsitektur rumit & kalkulasi sains',
      tokens: '64k deep think',
      hero: true,
    },
  ];

  // Animated active level selector
  const activeLevelIdx = Math.min(3, Math.floor(p(f, 30, 160, E.inOut) * 4));

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />

      <AbsoluteFill style={{transform: cam.css, transformOrigin: '50% 45%'}}>
        {/* Scene Title */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: M,
            right: M,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 18,
              color: T.cyan,
              letterSpacing: '0.22em',
              fontWeight: 800,
            }}
          >
            DYNAMIC REASONING CONTROL
          </div>
          <h2
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 66,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '14px 0 0',
            }}
          >
            Scalable Thinking Levels
          </h2>
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 22,
              color: T.inkMuted,
              marginTop: 8,
            }}
          >
            Atur kedalaman berpikir AI sesuai kerumitan masalah & efisiensi token
          </div>
        </div>

        {/* Interactive Thinking Selector Control Panel */}
        <div
          style={{
            position: 'absolute',
            top: 410,
            left: M,
            right: M,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            borderRadius: 36,
            padding: '36px 34px',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            boxShadow: T.shadowCard,
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 26,
            }}
          >
            <span
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 18,
                color: T.inkMuted,
                fontWeight: 700,
              }}
            >
              MODE THINKING AKTIF
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 16px',
                borderRadius: 999,
                backgroundColor: 'rgba(255, 94, 30, 0.15)',
                border: '1px solid rgba(255, 94, 30, 0.4)',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: T.neon,
                  boxShadow: '0 0 10px #FF5E1E',
                }}
              />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 17,
                  fontWeight: 800,
                  color: T.neon,
                }}
              >
                PARAM: --thinking-level={LEVELS[activeLevelIdx].name.toLowerCase()}
              </span>
            </div>
          </div>

          {/* 4 Levels Grid */}
          <div style={{display: 'flex', gap: 18}}>
            {LEVELS.map((lvl, idx) => {
              const isActive = idx === activeLevelIdx;
              return (
                <div
                  key={lvl.name}
                  style={{
                    flex: 1,
                    padding: '28px 18px',
                    borderRadius: 24,
                    backgroundColor: isActive
                      ? 'rgba(255, 94, 30, 0.22)'
                      : T.surfaceElevated,
                    border: isActive
                      ? `2px solid ${T.neon}`
                      : '1.5px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? T.neonGlow : 'none',
                    textAlign: 'center',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      fontFamily: NEON_FONT.sans,
                      fontSize: 32,
                      fontWeight: 800,
                      color: isActive ? T.neon : '#FFFFFF',
                    }}
                  >
                    {lvl.name}
                  </div>
                  <div
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 14,
                      color: isActive ? '#FFFFFF' : T.inkMuted,
                      marginTop: 10,
                      minHeight: 42,
                      lineHeight: 1.35,
                    }}
                  >
                    {lvl.desc}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 14,
                      padding: '5px 14px',
                      borderRadius: 999,
                      backgroundColor: isActive
                        ? T.neon
                        : 'rgba(255,255,255,0.06)',
                      fontFamily: NEON_FONT.mono,
                      fontSize: 13,
                      fontWeight: 800,
                      color: isActive ? '#FFFFFF' : T.inkMuted,
                    }}
                  >
                    {lvl.tokens}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 1 Million Token Context Window Section */}
        <div
          style={{
            position: 'absolute',
            top: 980,
            left: M,
            right: M,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            borderRadius: 36,
            padding: '38px 44px',
            border: '2px solid rgba(0, 229, 255, 0.45)',
            boxShadow: T.cyanGlow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  backgroundColor: T.cyan,
                  boxShadow: '0 0 12px #00E5FF',
                }}
              />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 16,
                  color: T.cyan,
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                }}
              >
                UNIFIED MULTIMODAL CONTEXT
              </span>
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 46,
                fontWeight: 800,
                color: '#FFFFFF',
                marginTop: 10,
              }}
            >
              1 Juta Token Context Window
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 18,
                color: T.inkMuted,
                marginTop: 6,
              }}
            >
              Input repo raksasa, log server berjam-jam, spreadsheet masif, & video HD
            </div>
          </div>

          <div style={{textAlign: 'right'}}>
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 74,
                fontWeight: 800,
                color: T.cyan,
                lineHeight: 1,
              }}
            >
              1,000,000
            </div>
            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 16,
                fontWeight: 700,
                color: '#FFFFFF',
                marginTop: 8,
                letterSpacing: '0.12em',
              }}
            >
              TOKENS NATIVE
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: BENCHMARK RESMI (Neon vs Claude Opus 5.5 vs GPT-6.2 Sol)
   - Official Brand SVGs + Camera Slam Shake + Winner Stamp
   ══════════════════════════════════════════════════════════════════════════ */
export const S4Benchmark: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.98, rx: 2, ry: -2, px: 0, py: 0},
    {f: 28, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 50, s: 1.04, rx: -2, ry: 1, px: 0, py: -25, ease: E.inOut},
    {f: 140, s: 1.06, rx: 1, ry: -1, px: 0, py: -30, ease: E.out},
  ]);

  const enter = p(f, 4, 20, E.out);
  const roll = p(f, 15, 50, E.out);
  const sh = shake(f, 32, 18, 14);

  const BENCHMARKS = [
    {
      name: 'Gemini 4 Neon (xhigh)',
      vendor: 'Google DeepMind',
      Logo: () => <GeminiOfficialLogo size={42} />,
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
      Logo: () => <ClaudeOfficialLogo size={38} />,
      score: (60.2 * roll).toFixed(1),
      maxScore: 60.2,
      widthPct: 85 * roll,
      color: '#D97757',
      barGradient: 'linear-gradient(90deg, #D97757, #F59E0B)',
      glow: 'none',
      speed: '48 tok/s (3x Lebih Lambat)',
      isWinner: false,
    },
    {
      name: 'GPT-6.2 Sol',
      vendor: 'OpenAI',
      Logo: () => <OpenAIOfficialLogo size={38} color="#14B8A6" />,
      score: (59.8 * roll).toFixed(1),
      maxScore: 59.8,
      widthPct: 83 * roll,
      color: '#14B8A6',
      barGradient: 'linear-gradient(90deg, #0D9488, #14B8A6)',
      glow: 'none',
      speed: '54 tok/s (2.6x Lebih Lambat)',
      isWinner: false,
    },
  ];

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />

      <AbsoluteFill
        style={{
          transform: `${cam.css} translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)`,
          transformOrigin: '50% 45%',
        }}
      >
        {/* Benchmark Header */}
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: M,
            right: M,
            textAlign: 'center',
            opacity: enter,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 22px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
            }}
          >
            <span
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 15,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.14em',
              }}
            >
              OFFICIAL FRONTIER REASONING BENCHMARK (NOVEMBER 2026)
            </span>
          </div>

          <h2
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 62,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '14px 0 0',
            }}
          >
            Adu Otak: Neon vs Claude vs GPT
          </h2>
          <div
            style={{
              fontFamily: NEON_FONT.mono,
              fontSize: 20,
              color: T.inkMuted,
              marginTop: 6,
            }}
          >
            Artificial Analysis Intelligence & Coding Index Benchmark
          </div>
        </div>

        {/* Benchmark Comparison Cards */}
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: M,
            right: M,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {BENCHMARKS.map((b) => (
            <div
              key={b.name}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                borderRadius: 30,
                padding: '26px 34px',
                border: b.isWinner
                  ? `2.5px solid ${T.neon}`
                  : '1.5px solid rgba(255, 255, 255, 0.1)',
                boxShadow: b.isWinner ? T.neonGlow : T.shadowCard,
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Top row of card */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 18,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <b.Logo />
                  <div>
                    <div
                      style={{
                        fontFamily: NEON_FONT.sans,
                        fontSize: 30,
                        fontWeight: 800,
                        color: '#FFFFFF',
                      }}
                    >
                      {b.name}
                    </div>
                    <div
                      style={{
                        fontFamily: NEON_FONT.mono,
                        fontSize: 15,
                        color: T.inkMuted,
                        marginTop: 2,
                      }}
                    >
                      {b.vendor} · Kecepatan:{' '}
                      <span style={{color: '#FFFFFF', fontWeight: 700}}>
                        {b.speed}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  {b.isWinner && (
                    <span
                      style={{
                        padding: '6px 16px',
                        borderRadius: 999,
                        backgroundColor: T.neon,
                        color: '#FFFFFF',
                        fontFamily: NEON_FONT.mono,
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        boxShadow: '0 0 15px rgba(255, 94, 30, 0.6)',
                      }}
                    >
                      ★ SWEET SPOT WINNER
                    </span>
                  )}
                  <div
                    style={{
                      fontFamily: NEON_FONT.mono,
                      fontSize: 50,
                      fontWeight: 800,
                      color: b.color,
                      minWidth: 110,
                      textAlign: 'right',
                    }}
                  >
                    {b.score}
                  </div>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div
                style={{
                  width: '100%',
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  overflow: 'hidden',
                  padding: 3,
                }}
              >
                <div
                  style={{
                    width: `${b.widthPct}%`,
                    height: '100%',
                    borderRadius: 11,
                    background: b.barGradient,
                    boxShadow: b.isWinner ? '0 0 20px #FF5E1E' : 'none',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Speed Advantage Summary Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: 230,
            left: M,
            right: M,
            padding: '24px 34px',
            borderRadius: 24,
            backgroundColor: 'rgba(255, 94, 30, 0.12)',
            border: '1.5px solid rgba(255, 94, 30, 0.4)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: NEON_FONT.sans,
              fontSize: 24,
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            ⚡ <b style={{color: T.neon}}>Kemenangan Nyata:</b> Skor setara
            model terberat dunia, tapi kecepatan respon hampir 3x lipat lebih
            ngebut!
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: OUTRO RESMI (rhmt ofc · Developer Dispatch)
   ══════════════════════════════════════════════════════════════════════════ */
export const S5Outro: React.FC = () => {
  const f = useCurrentFrame();

  const cam = focusCam(f, [
    {f: 0, s: 0.96, rx: 3, ry: -2, px: 0, py: 0},
    {f: 30, s: 1.0, rx: 0, ry: 0, px: 0, py: 0, ease: E.out},
    {f: 120, s: 1.04, rx: -1, ry: 1, px: 0, py: -15, ease: E.inOut},
  ]);

  const enter = p(f, 4, 24, E.out);
  const cardEnter = p(f, 16, 36, E.back);

  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <NeonBg />

      <AbsoluteFill style={{transform: cam.css, transformOrigin: '50% 45%'}}>
        {/* Outro Main Card */}
        <div
          style={{
            position: 'absolute',
            top: 380,
            left: '50%',
            transform: 'translateX(-50%)',
            width: CW,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Developer Branding Frame */}
          <div
            style={{
              width: 780,
              padding: '48px 44px',
              borderRadius: 44,
              backgroundColor: 'rgba(15, 23, 42, 0.94)',
              border: `2px solid ${T.neon}`,
              boxShadow: `${T.neonGlow}, 0 25px 60px rgba(0, 0, 0, 0.8)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: cardEnter,
              transform: `scale(${0.88 + 0.12 * cardEnter})`,
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top Brand Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 20px',
                borderRadius: 999,
                backgroundColor: 'rgba(255, 94, 30, 0.15)',
                border: '1.5px solid rgba(255, 94, 30, 0.4)',
                marginBottom: 24,
              }}
            >
              <GeminiOfficialLogo size={22} />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 15,
                  fontWeight: 800,
                  color: T.neon,
                  letterSpacing: '0.15em',
                }}
              >
                PRODUKSI RESMI · RHMT OFC
              </span>
            </div>

            <h2
              style={{
                fontFamily: NEON_FONT.sans,
                fontSize: 60,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              AI Super Cerdas <br />
              <span style={{color: T.neon}}>Tidak Harus Lambat & Boros</span>
            </h2>

            <div
              style={{
                fontFamily: NEON_FONT.mono,
                fontSize: 22,
                color: T.inkMuted,
                marginTop: 18,
                maxWidth: 620,
                lineHeight: 1.45,
              }}
            >
              Eksplorasi teknologi terdepan bersama Rahmat di{' '}
              <b style={{color: '#FFFFFF'}}>rhmt ofc</b>
            </div>

            {/* Official Portfolio Link Badge */}
            <div
              style={{
                marginTop: 34,
                padding: '16px 36px',
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <GoogleAIStudioBadge size={28} />
              <span
                style={{
                  fontFamily: NEON_FONT.mono,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                }}
              >
                rhmt.biz.id
              </span>
            </div>

            {/* Tech Badges Footer */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 36,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                'Google DeepMind',
                'Google AI Studio',
                'Puck Voiceover',
                'Remotion Cloud Engine',
              ].map((badge) => (
                <span
                  key={badge}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    fontFamily: NEON_FONT.mono,
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.inkMuted,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
