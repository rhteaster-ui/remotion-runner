import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {markerFrame, useGlobalFrame, useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {ChipElaina} from './ChipElaina';
import {
  PcbBackground,
  SecureChipSvg,
  StampBadge,
  TapCursor,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S4: KEDAULATAN DATA — 100% IMPOR VS PRIVATE KEY SENDIRI (Obsidian Dark)
   ============================================================================ */
export const S4SovereignKey: React.FC = () => {
  const frame = useCurrentFrame();
  const globalFrame = useGlobalFrame();

  const hPenting = useHit('penting');
  const hImpor = useHit('impor');
  const hSendiri = useHit('sendiri');
  const hDiintip = useHit('diintip');

  const shieldActive = hSendiri > 0.15;
  const laserDash = -(frame * 4) % 24;

  // Hex cryptographic stream cycling
  const hexTick = Math.floor(frame / 4);
  const hexBytes = ['4F', 'A9', 'E2', '1C', '7B', 'D0'].map(
    (b, i) => ((parseInt(b, 16) + hexTick * (i + 3)) % 255).toString(16).toUpperCase().padStart(2, '0'),
  );

  return (
    <PcbBackground
      bgColor={chipTokens.obsidian}
      traceColor="rgba(16, 185, 129, 0.14)"
      dotColor="rgba(255, 255, 255, 0.08)"
    >
      <ChipHUD index="04/06" label="KEDAULATAN DATA" dark={true} />

      <div
        style={{
          position: 'absolute',
          top: 148,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Top Question Header */}
        <div style={{textAlign: 'center', transform: `scale(${0.88 + 0.12 * Math.max(0.4, hPenting)})`}}>
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 48,
              fontWeight: 900,
              color: chipTokens.white,
              letterSpacing: '-0.02em',
            }}
          >
            KENAPA INI{' '}
            <span style={{color: chipTokens.emerald}}>PENTING?</span>
          </span>
        </div>

        {/* Main Interactive Security Stage */}
        <ZineCard
          bg="#111827"
          enter={Math.max(0.5, hImpor)}
          style={{
            border: `4px solid ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
            boxShadow: `10px 10px 0px ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: 8,
                backgroundColor: shieldActive ? chipTokens.emerald : chipTokens.crimson,
                color: shieldActive ? chipTokens.ink : chipTokens.white,
              }}
            >
              {shieldActive ? 'PRIVATE KEY: MILIK SENDIRI' : 'RISIKO: 100% CHIP IMPOR'}
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 18, color: '#94A3B8'}}>
              {shieldActive ? 'ENCRYPTED' : 'VULNERABLE'}
            </span>
          </div>

          {/* Animated SVG Attack vs Shield Defense */}
          <div style={{display: 'flex', justifyContent: 'center', padding: '10px 0'}}>
            <svg width="780" height="240" viewBox="0 0 780 240">
              {/* Foreign Spy Probe Box */}
              <rect x="20" y="65" width="170" height="110" rx="16" fill="#1F2937" stroke={chipTokens.crimson} strokeWidth="4" />
              {/* Spy Eye Vector */}
              <path d="M55 120 Q105 80 155 120 Q105 160 55 120 Z" fill="none" stroke={chipTokens.crimson} strokeWidth="4" />
              <circle cx="105" cy="120" r="14" fill={chipTokens.crimson} />
              <text x="105" y="198" textAnchor="middle" fill={chipTokens.crimson} fontFamily="monospace" fontWeight="800" fontSize="16">
                PIHAK ASING
              </text>

              {/* Attack Laser Beam */}
              <line
                x1="196"
                y1="120"
                x2={shieldActive ? '445' : '575'}
                y2="120"
                stroke={chipTokens.crimson}
                strokeWidth="6"
                strokeDasharray="14 10"
                strokeDashoffset={laserDash}
              />

              {/* Deflected Sparks when Shield is Active */}
              {shieldActive && (
                <g>
                  <line x1="445" y1="120" x2="395" y2="62" stroke={chipTokens.gold} strokeWidth="5" strokeLinecap="round" />
                  <line x1="445" y1="120" x2="395" y2="178" stroke={chipTokens.gold} strokeWidth="5" strokeLinecap="round" />
                  <circle cx="445" cy="120" r={10 + 4 * Math.sin(frame * 0.4)} fill={chipTokens.gold} />
                </g>
              )}

              {/* Emerald Shield Wall */}
              {shieldActive && (
                <g transform={`translate(455, 42) scale(${0.85 + 0.15 * hSendiri})`}>
                  <path
                    d="M45 0 L90 18 V76 C90 116 45 148 45 148 C45 148 0 116 0 76 V18 Z"
                    fill={chipTokens.emerald}
                    stroke={chipTokens.white}
                    strokeWidth="4"
                  />
                  {/* Keyhole inside Shield */}
                  <circle cx="45" cy="60" r="14" fill={chipTokens.ink} />
                  <rect x="40" y="70" width="10" height="24" rx="4" fill={chipTokens.ink} />
                </g>
              )}

              {/* Target Sovereign Chip */}
              <g transform="translate(590, 48)">
                <rect x="0" y="0" width="144" height="144" rx="22" fill="#0F172A" stroke={shieldActive ? chipTokens.emerald : chipTokens.crimson} strokeWidth="4.5" />
                <rect x="24" y="24" width="96" height="96" rx="12" fill={chipTokens.crimson} />
                <rect x="24" y="72" width="96" height="48" fill={chipTokens.white} />
                <rect x="24" y="24" width="96" height="96" rx="12" fill="none" stroke={chipTokens.ink} strokeWidth="3.5" />
                <text x="72" y="172" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="800" fontSize="16">
                  DATA NEGARA
                </text>
              </g>
            </svg>
          </div>

          {/* Hex Enclave Strip */}
          <div
            style={{
              marginTop: 8,
              padding: '12px 18px',
              backgroundColor: '#090D16',
              borderRadius: 14,
              border: '2px solid rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: chipTokens.gold}}>
              KEY: {hexBytes.join(' ')}
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 19,
                fontWeight: 800,
                color: hDiintip > 0.1 || shieldActive ? chipTokens.emerald : chipTokens.crimson,
              }}
            >
              {shieldActive ? 'ANTI-INTIP & ANTI-KUNCI' : 'TERBUKA'}
            </span>
          </div>
        </ZineCard>
      </div>

      <ChipElaina
        side="left"
        bottom={175}
        width={390}
        track={[
          {pose: 'open_hand', atFrame: 0},
          {at: 'impor', pose: 'chin_rest', reaction: 'sweat'},
          {at: 'sendiri', pose: 'finger_gun', reaction: 'sparkle'},
        ]}
      />
    </PcbBackground>
  );
};

/* ============================================================================
   S5: REALISTIS & CTA INTERAKTIF ("Menurut kalian gimana? Follow akun ini")
   ============================================================================ */
export const S5RealistisCta: React.FC = () => {
  const globalFrame = useGlobalFrame();
  const localFrame = useCurrentFrame();

  const hRealistis = useHit('realistis');
  const hTriliunan = useHit('triliunan');
  const hKalian = useHit('kalian');
  const hFollow = useHit('follow');

  const followGlobal = markerFrame('follow');
  const followLocal = localFrame + (followGlobal - globalFrame);
  const sFollow = useSince('follow');
  const btnPress = sFollow >= 6 && sFollow <= 14 ? 0.92 : 1;
  const isFollowed = sFollow >= 10;

  return (
    <PcbBackground
      bgColor={chipTokens.amberBg}
      traceColor="rgba(17, 16, 29, 0.08)"
      dotColor="rgba(217, 119, 6, 0.22)"
    >
      <ChipHUD index="05/06" label="DISKUSI" dark={false} />

      <div
        style={{
          position: 'absolute',
          top: 148,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Top Comparison Card: Realistic Steps vs 300T Dream */}
        <ZineCard bg={chipTokens.white} enter={Math.max(0.4, hRealistis)} rotate={-0.6}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 800,
                backgroundColor: chipTokens.emerald,
                color: chipTokens.ink,
                padding: '4px 14px',
                borderRadius: 8,
                border: `2.5px solid ${chipTokens.ink}`,
              }}
            >
              LANGKAH REALISTIS
            </span>
            {hTriliunan > 0.05 && (
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 19,
                  fontWeight: 800,
                  color: chipTokens.crimson,
                  textDecoration: 'line-through',
                }}
              >
                PABRIK Rp 300+ T
              </span>
            )}
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            {[
              {step: '01', label: 'DESAIN IC', active: true},
              {step: '02', label: 'EKOSISTEM', active: true},
              {step: '03', label: 'MANDIRI', active: hRealistis > 0.5},
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  flex: 1,
                  padding: '14px 10px',
                  borderRadius: 14,
                  backgroundColor: item.active ? chipTokens.ink : '#E2E8F0',
                  border: `3px solid ${chipTokens.ink}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: chipTokens.gold}}>
                  STEP {item.step}
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: chipTokens.white, marginTop: 4}}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </ZineCard>

        {/* Big Interactive CTA Card: "Nah, menurut kalian gimana? Follow akun ini" */}
        {hKalian > 0.02 && (
          <ZineCard
            bg={chipTokens.ink}
            enter={hKalian}
            rotate={0.6}
            style={{
              border: `4px solid ${chipTokens.ink}`,
              boxShadow: `10px 10px 0px ${chipTokens.crimson}`,
              textAlign: 'center',
              position: 'relative',
              padding: '28px 24px',
            }}
          >
            <div
              style={{
                fontFamily: FONT.space,
                fontSize: 44,
                fontWeight: 900,
                color: chipTokens.white,
                lineHeight: 1.15,
              }}
            >
              NAH, MENURUT KALIAN{' '}
              <span style={{color: chipTokens.gold}}>GIMANA?</span>
            </div>

            {/* Vector Comment Icon + Prompt */}
            <div
              style={{
                marginTop: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 18px',
                backgroundColor: '#1E293B',
                borderRadius: 999,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  fill="none"
                  stroke={chipTokens.gold}
                  strokeWidth="2.5"
                />
              </svg>
              <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: '#E2E8F0'}}>
                TULIS PENDAPAT DI KOMENTAR
              </span>
            </div>

            {/* Interactive + FOLLOW Button */}
            {hFollow > 0.02 && (
              <div style={{marginTop: 22, position: 'relative', display: 'inline-block'}}>
                <div
                  style={{
                    padding: '16px 46px',
                    borderRadius: 999,
                    backgroundColor: isFollowed ? chipTokens.emerald : chipTokens.crimson,
                    border: `4px solid ${chipTokens.white}`,
                    boxShadow: `6px 6px 0px ${chipTokens.gold}`,
                    transform: `scale(${btnPress})`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    {isFollowed ? (
                      <path
                        d="M5 13l4 4L19 7"
                        fill="none"
                        stroke={chipTokens.ink}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M12 5v14M5 12h14"
                        fill="none"
                        stroke={chipTokens.white}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                  <span
                    style={{
                      fontFamily: FONT.space,
                      fontSize: 32,
                      fontWeight: 900,
                      color: isFollowed ? chipTokens.ink : chipTokens.white,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {isFollowed ? 'FOLLOWED!' : 'FOLLOW AKUN INI'}
                  </span>
                </div>

                {/* Animated tap cursor */}
                <TapCursor atFrame={followLocal} x={220} y={40} />
              </div>
            )}
          </ZineCard>
        )}
      </div>

      <ChipElaina
        side="right"
        bottom={175}
        width={395}
        track={[
          {pose: 'open_hand', atFrame: 0},
          {at: 'kalian', pose: 'excited', reaction: 'question'},
          {at: 'follow', pose: 'double_peace', reaction: 'sparkle'},
        ]}
      />
    </PcbBackground>
  );
};

/* ============================================================================
   S6: OUTRO & PERSONAL BRANDING RESMI — rhmt ofc (rhmt.biz.id)
   ============================================================================ */
export const S6OutroBrand: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: {damping: 12, mass: 0.7, stiffness: 150},
  });

  return (
    <PcbBackground
      bgColor="#140A14"
      traceColor="rgba(251, 191, 36, 0.16)"
      dotColor="rgba(255, 255, 255, 0.12)"
    >
      <ChipHUD index="06/06" label="RHMT OFC" dark={true} />

      <div
        style={{
          position: 'absolute',
          top: 210,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          transform: `scale(${0.86 + 0.14 * enter})`,
        }}
      >
        <SecureChipSvg pulseFrame={frame} size={170} />

        {/* Clean Brand Wordmark Card — ZERO Gemini logo */}
        <ZineCard
          bg={chipTokens.cream}
          enter={enter}
          rotate={-1}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '28px 24px',
            boxShadow: `12px 12px 0px ${chipTokens.crimson}`,
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 800, color: chipTokens.crimson}}>
            TECH & CODE SATIRE
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 78,
              fontWeight: 900,
              color: chipTokens.ink,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginTop: 6,
            }}
          >
            rhmt ofc
          </div>
          <div
            style={{
              marginTop: 16,
              display: 'inline-block',
              padding: '10px 28px',
              backgroundColor: chipTokens.gold,
              border: `3.5px solid ${chipTokens.ink}`,
              borderRadius: 999,
              boxShadow: `4px 4px 0px ${chipTokens.ink}`,
              fontFamily: FONT.mono,
              fontSize: 28,
              fontWeight: 800,
              color: chipTokens.ink,
            }}
          >
            rhmt.biz.id
          </div>
        </ZineCard>
      </div>

      <ChipElaina
        side="left"
        bottom={175}
        width={400}
        track={[{pose: 'double_peace', atFrame: 0, reaction: 'sparkle'}]}
      />
    </PcbBackground>
  );
};
