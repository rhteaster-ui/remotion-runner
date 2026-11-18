import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {markerFrame, useGlobalFrame, useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {
  PcbBackground,
  SecureChipSvg,
  TapCursor,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S4: KEDAULATAN DATA — 100% IMPOR VS PRIVATE KEY SENDIRI (Obsidian Dark)
   ============================================================================ */
export const S4SovereignKey: React.FC = () => {
  const frame = useCurrentFrame();

  const hPenting = useHit('penting');
  const hImpor = useHit('impor');
  const hSendiri = useHit('sendiri');
  const hDiintip = useHit('diintip');

  const shieldActive = hSendiri > 0.15;
  const laserDash = -(frame * 4) % 24;

  const hexTick = Math.floor(frame / 4);
  const hexBytes = ['4F', 'A9', 'E2', '1C', '7B', 'D0', '8E', '3A'].map(
    (b, i) =>
      ((parseInt(b, 16) + hexTick * (i + 3)) % 255)
        .toString(16)
        .toUpperCase()
        .padStart(2, '0'),
  );

  return (
    <PcbBackground
      bgColor={chipTokens.obsidian}
      traceColor="rgba(16, 185, 129, 0.16)"
      dotColor="rgba(255, 255, 255, 0.08)"
    >
      <ChipHUD
        index="04/06"
        label="KEDAULATAN DATA"
        stepIndex={3}
        dark={true}
        metricTag="AES-256 SOVEREIGN"
      />

      <div
        style={{
          position: 'absolute',
          top: 172,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <div style={{textAlign: 'center', transform: `scale(${0.9 + 0.1 * Math.max(0.4, hPenting)})`}}>
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 52,
              fontWeight: 900,
              color: chipTokens.white,
              letterSpacing: '-0.02em',
            }}
          >
            KENAPA INI <span style={{color: chipTokens.emerald}}>PENTING?</span>
          </span>
        </div>

        {/* Main Interactive Cybersecurity Stage */}
        <ZineCard
          bg="#111827"
          enter={Math.max(0.5, hImpor)}
          style={{
            padding: '26px 28px',
            border: `4px solid ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
            boxShadow: `10px 10px 0px ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 900,
                padding: '6px 18px',
                borderRadius: 10,
                backgroundColor: shieldActive ? chipTokens.emerald : chipTokens.crimson,
                color: shieldActive ? chipTokens.ink : chipTokens.white,
              }}
            >
              {shieldActive ? 'PRIVATE KEY: MILIK SENDIRI' : 'RISIKO: 100% CHIP IMPOR'}
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, color: '#94A3B8'}}>
              {shieldActive ? 'PROTECTED // ENCLAVE' : 'VULNERABLE // RAWAN BACKDOOR'}
            </span>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', padding: '12px 0'}}>
            <svg width="860" height="270" viewBox="0 0 780 250">
              {/* Left Attacker Node */}
              <rect x="20" y="65" width="175" height="120" rx="18" fill="#1F2937" stroke={chipTokens.crimson} strokeWidth="4.5" />
              <path d="M55 125 Q108 80 160 125 Q108 170 55 125 Z" fill="none" stroke={chipTokens.crimson} strokeWidth="4.5" />
              <circle cx="108" cy="125" r="15" fill={chipTokens.crimson} />
              <text x="108" y="212" textAnchor="middle" fill={chipTokens.crimson} fontFamily="monospace" fontWeight="900" fontSize="18">
                PIHAK ASING
              </text>

              {/* Scanning Laser Beam */}
              <line
                x1="202"
                y1="125"
                x2={shieldActive ? '445' : '575'}
                y2="125"
                stroke={chipTokens.crimson}
                strokeWidth="7"
                strokeDasharray="14 10"
                strokeDashoffset={laserDash}
              />

              {/* Deflection Sparks when Shield is Active */}
              {shieldActive && (
                <g>
                  <line x1="445" y1="125" x2="390" y2="58" stroke={chipTokens.gold} strokeWidth="6" strokeLinecap="round" />
                  <line x1="445" y1="125" x2="390" y2="192" stroke={chipTokens.gold} strokeWidth="6" strokeLinecap="round" />
                  <circle cx="445" cy="125" r={11 + 4 * Math.sin(frame * 0.4)} fill={chipTokens.gold} />
                </g>
              )}

              {/* Center Cryptographic Shield (Aegis RI) */}
              {shieldActive && (
                <g transform={`translate(455, 45) scale(${0.86 + 0.14 * hSendiri})`}>
                  <path
                    d="M48 0 L96 20 V82 C96 126 48 160 48 160 C48 160 0 126 0 82 V20 Z"
                    fill={chipTokens.emerald}
                    stroke={chipTokens.white}
                    strokeWidth="4.5"
                  />
                  <circle cx="48" cy="64" r="15" fill={chipTokens.ink} />
                  <rect x="42" y="75" width="12" height="26" rx="4" fill={chipTokens.ink} />
                  <circle cx="48" cy="88" r="3" fill={chipTokens.gold} />
                </g>
              )}

              {/* Right Sovereign Vault Node */}
              <g transform="translate(592, 50)">
                <rect x="0" y="0" width="150" height="150" rx="24" fill="#0F172A" stroke={shieldActive ? chipTokens.emerald : chipTokens.crimson} strokeWidth="5" />
                <rect x="26" y="26" width="98" height="98" rx="14" fill={chipTokens.crimson} />
                <rect x="26" y="75" width="98" height="49" fill={chipTokens.white} />
                <rect x="26" y="26" width="98" height="98" rx="14" fill="none" stroke={chipTokens.ink} strokeWidth="3.5" />
                <text x="75" y="180" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="900" fontSize="18">
                  DATA NEGARA
                </text>
              </g>
            </svg>
          </div>

          {/* Dynamic Cipher Key Readout */}
          <div
            style={{
              marginTop: 10,
              padding: '14px 22px',
              backgroundColor: '#090D16',
              borderRadius: 16,
              border: '2.5px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: chipTokens.gold}}>
              KEY STREAM: {hexBytes.join(' ')}
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 18,
                fontWeight: 900,
                color: hDiintip > 0.1 || shieldActive ? chipTokens.emerald : chipTokens.crimson,
              }}
            >
              {shieldActive ? 'ANTI-INTIP & ZERO-BACKDOOR' : 'TERBUKA BAGI ASING'}
            </span>
          </div>
        </ZineCard>

        {/* Bottom Detailed Insight Card */}
        <ZineCard
          bg={shieldActive ? '#064E3B' : '#3B0D16'}
          enter={Math.max(0.5, hImpor)}
          rotate={0.4}
          style={{
            border: `3.5px solid ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
            padding: '20px 28px',
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, fontWeight: 800}}>
            {shieldActive ? 'KEDAULATAN KRIPTOGRAFI LOKAL' : 'KETIDAKPASTIAN SUPLAY CHIP IMPOR'}
          </div>
          <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.white, fontWeight: 900, marginTop: 4}}>
            {shieldActive
              ? 'Kunci enkripsi & private key sepenuhnya dipegang Indonesia'
              : 'Risiko disusupi celah keamanan backdoor pihak luar'}
          </div>
        </ZineCard>
      </div>
    </PcbBackground>
  );
};

/* ============================================================================
   S5: REALISTIS & CTA INTERAKTIF (Warm Light Studio)
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
      <ChipHUD
        index="05/06"
        label="DISKUSI & ROADMAP"
        stepIndex={4}
        dark={false}
        metricTag="COMMUNITY POLL"
      />

      <div
        style={{
          position: 'absolute',
          top: 172,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Step-by-Step Realistic Strategy Card */}
        <ZineCard bg={chipTokens.white} enter={Math.max(0.4, hRealistis)} rotate={-0.6} style={{padding: '24px 28px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 900,
                backgroundColor: chipTokens.emerald,
                color: chipTokens.ink,
                padding: '5px 16px',
                borderRadius: 10,
                border: `3px solid ${chipTokens.ink}`,
              }}
            >
              LANGKAH REALISTIS
            </span>
            {hTriliunan > 0.05 && (
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 18,
                  fontWeight: 900,
                  color: chipTokens.crimson,
                  textDecoration: 'line-through',
                }}
              >
                MIMPI FAB Rp 300+ T
              </span>
            )}
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            {[
              {step: '01', label: 'DESAIN IC', desc: 'Rancang sirkuit', active: true},
              {step: '02', label: 'EKOSISTEM', desc: 'SDM & riset ITB', active: true},
              {step: '03', label: 'MANDIRI', desc: 'Keamanan data', active: hRealistis > 0.5},
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  flex: 1,
                  padding: '18px 12px',
                  borderRadius: 16,
                  backgroundColor: item.active ? chipTokens.ink : '#E2E8F0',
                  border: `3.5px solid ${chipTokens.ink}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: chipTokens.gold}}>
                  STEP {item.step}
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: chipTokens.white, marginTop: 4}}>
                  {item.label}
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#CBD5E1', marginTop: 4}}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </ZineCard>

        {/* Community Polling & CTA Interactive Arena */}
        {hKalian > 0.02 && (
          <ZineCard
            bg={chipTokens.ink}
            enter={hKalian}
            rotate={0.6}
            style={{
              border: `4px solid ${chipTokens.ink}`,
              boxShadow: `12px 12px 0px ${chipTokens.crimson}`,
              textAlign: 'center',
              position: 'relative',
              padding: '30px 26px',
            }}
          >
            <div
              style={{
                fontFamily: FONT.space,
                fontSize: 46,
                fontWeight: 900,
                color: chipTokens.white,
                lineHeight: 1.15,
              }}
            >
              NAH, MENURUT KALIAN{' '}
              <span style={{color: chipTokens.gold}}>GIMANA?</span>
            </div>

            {/* Interactive Poll Bars */}
            <div
              style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                  <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, color: chipTokens.emerald}}>
                    Kubu Realistis (Dukung Desain Fabless)
                  </span>
                  <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: chipTokens.emerald}}>
                    84%
                  </span>
                </div>
                <div style={{height: 12, borderRadius: 999, backgroundColor: '#334155', overflow: 'hidden'}}>
                  <div style={{width: '84%', height: '100%', backgroundColor: chipTokens.emerald, borderRadius: 999}} />
                </div>
              </div>

              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                  <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, color: chipTokens.crimson}}>
                    Kubu Skeptis (Mau Langsung Pabrik Fisik)
                  </span>
                  <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: chipTokens.crimson}}>
                    16%
                  </span>
                </div>
                <div style={{height: 12, borderRadius: 999, backgroundColor: '#334155', overflow: 'hidden'}}>
                  <div style={{width: '16%', height: '100%', backgroundColor: chipTokens.crimson, borderRadius: 999}} />
                </div>
              </div>
            </div>

            {/* Tactile Follow Button with TapCursor */}
            {hFollow > 0.02 && (
              <div style={{marginTop: 24, position: 'relative', display: 'inline-block'}}>
                <div
                  style={{
                    padding: '16px 48px',
                    borderRadius: 999,
                    backgroundColor: isFollowed ? chipTokens.emerald : chipTokens.crimson,
                    border: `4px solid ${chipTokens.white}`,
                    boxShadow: `6px 6px 0px ${chipTokens.gold}`,
                    transform: `scale(${btnPress})`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
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

                <TapCursor atFrame={followLocal} x={270} y={52} />
              </div>
            )}
          </ZineCard>
        )}
      </div>
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
      bgColor="#0B0C10"
      traceColor="rgba(251, 191, 36, 0.18)"
      dotColor="rgba(255, 255, 255, 0.12)"
    >
      <ChipHUD
        index="06/06"
        label="RHMT OFC"
        stepIndex={5}
        dark={true}
        metricTag="RHMT.BIZ.ID // ONLINE"
      />

      <div
        style={{
          position: 'absolute',
          top: 172,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          transform: `scale(${0.88 + 0.12 * enter})`,
        }}
      >
        <SecureChipSvg pulseFrame={frame} size={210} />

        {/* Clean Personal Brand Wordmark Card (Zero Gemini Logo, Zero Anime Character) */}
        <ZineCard
          bg={chipTokens.cream}
          enter={enter}
          rotate={-0.6}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '32px 26px',
            boxShadow: `12px 12px 0px ${chipTokens.crimson}`,
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 900, color: chipTokens.crimson}}>
            TECH &amp; HARDWARE SATIRE
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 84,
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
              marginTop: 18,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 36px',
              backgroundColor: chipTokens.gold,
              border: `3.5px solid ${chipTokens.ink}`,
              borderRadius: 999,
              boxShadow: `5px 5px 0px ${chipTokens.ink}`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: chipTokens.emerald,
                boxShadow: `0 0 8px ${chipTokens.emerald}`,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 28,
                fontWeight: 900,
                color: chipTokens.ink,
              }}
            >
              rhmt.biz.id
            </span>
          </div>
        </ZineCard>

        {/* Topic Highlights Chips */}
        <div style={{width: '100%'}}>
          <ZineCard
            bg="#1E1B2E"
            enter={enter}
            rotate={0.8}
            style={{border: `3.5px solid ${chipTokens.gold}`, padding: '18px 24px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: chipTokens.gold, fontWeight: 800}}>
                  KONTEN &amp; RISET SELANJUTNYA
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, color: chipTokens.white, fontWeight: 900, marginTop: 4}}>
                  Bedah Arsitektur Chip &amp; DevOps Indonesia
                </div>
              </div>
              <div
                style={{
                  padding: '6px 16px',
                  backgroundColor: chipTokens.gold,
                  color: chipTokens.ink,
                  borderRadius: 10,
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                STAY TUNED
              </div>
            </div>
          </ZineCard>
        </div>
      </div>
    </PcbBackground>
  );
};
