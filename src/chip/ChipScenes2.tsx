import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {markerFrame, useGlobalFrame, useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {
  PcbBackground,
  SecureChipSvg,
  TactileStamp,
  TapCursor,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S4: KEDAULATAN DATA — 100% IMPOR VS PRIVATE KEY SENDIRI (Obsidian Dark)
   Zero Dead Space: 3 Tactical Cyber Defense Tiers (Height ~1550px)
   ============================================================================ */
export const S4SovereignKey: React.FC = () => {
  const frame = useCurrentFrame();

  const hPenting = useHit('penting');
  const hImpor = useHit('impor');
  const hSendiri = useHit('sendiri');
  const hDiintip = useHit('diintip');

  const shieldActive = hSendiri > 0.15;
  const laserDash = -(frame * 5) % 24;

  const hexTick = Math.floor(frame / 3);
  const hexBytes = ['4F', 'A9', 'E2', '1C', '7B', 'D0', '8E', '3A', '9C', 'F1'].map(
    (b, i) =>
      ((parseInt(b, 16) + hexTick * (i + 3)) % 255)
        .toString(16)
        .toUpperCase()
        .padStart(2, '0'),
  );

  return (
    <PcbBackground
      bgColor={chipTokens.obsidian}
      traceColor="rgba(16, 185, 129, 0.18)"
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
          top: 168,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* ==================================================================
            TIER 1: STRATEGIC HEADLINE (Height ~180px)
            ================================================================== */}
        <div style={{textAlign: 'center', transform: `scale(${0.92 + 0.08 * Math.max(0.4, hPenting)})`}}>
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 54,
              fontWeight: 900,
              color: chipTokens.white,
              letterSpacing: '-0.02em',
            }}
          >
            KENAPA INI <span style={{color: chipTokens.emerald}}>PENTING?</span>
          </span>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 18,
              fontWeight: 800,
              color: chipTokens.gold,
              marginTop: 6,
              letterSpacing: '0.04em',
            }}
          >
            KEDAULATAN KRIPTOGRAFI DOKUMEN NEGARA
          </div>
        </div>

        {/* ==================================================================
            TIER 2: CYBER DEFENSE BATTLEFIELD STAGE (Height ~780px)
            ================================================================== */}
        <ZineCard
          bg="#111827"
          enter={Math.max(0.5, hImpor)}
          borderColor={shieldActive ? chipTokens.emerald : chipTokens.crimson}
          shadowColor={shieldActive ? chipTokens.emerald : chipTokens.crimson}
          style={{padding: '24px 28px'}}
        >
          {/* Top Identifier */}
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
            <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: '#94A3B8'}}>
              {shieldActive ? 'ENCLAVE ACTIVE' : 'RAWAN BACKDOOR'}
            </span>
          </div>

          {/* Defense Grid SVG */}
          <div style={{display: 'flex', justifyContent: 'center', padding: '10px 0'}}>
            <svg width="860" height="320" viewBox="0 0 780 290">
              {/* Left Attacker Node */}
              <rect x="20" y="80" width="180" height="130" rx="20" fill="#1F2937" stroke={chipTokens.crimson} strokeWidth="5" />
              <path d="M55 145 Q110 95 165 145 Q110 195 55 145 Z" fill="none" stroke={chipTokens.crimson} strokeWidth="4.5" />
              <circle cx="110" cy="145" r="16" fill={chipTokens.crimson} />
              <text x="110" y="240" textAnchor="middle" fill={chipTokens.crimson} fontFamily="monospace" fontWeight="900" fontSize="19">
                PIHAK ASING
              </text>

              {/* Laser Attack Conduit */}
              <line
                x1="206"
                y1="145"
                x2={shieldActive ? '440' : '575'}
                y2="145"
                stroke={chipTokens.crimson}
                strokeWidth="8"
                strokeDasharray="14 10"
                strokeDashoffset={laserDash}
              />

              {/* Deflection Sparks when Shield is Active */}
              {shieldActive && (
                <g>
                  <line x1="440" y1="145" x2="380" y2="70" stroke={chipTokens.gold} strokeWidth="7" strokeLinecap="round" />
                  <line x1="440" y1="145" x2="380" y2="220" stroke={chipTokens.gold} strokeWidth="7" strokeLinecap="round" />
                  <circle cx="440" cy="145" r={12 + 5 * Math.sin(frame * 0.4)} fill={chipTokens.gold} />
                </g>
              )}

              {/* Center Cryptographic Shield (Aegis Merah Putih) */}
              {shieldActive && (
                <g transform={`translate(450, 55) scale(${0.88 + 0.12 * hSendiri})`}>
                  <path
                    d="M52 0 L104 22 V90 C104 138 52 176 52 176 C52 176 0 138 0 90 V22 Z"
                    fill={chipTokens.emerald}
                    stroke={chipTokens.white}
                    strokeWidth="5"
                  />
                  <circle cx="52" cy="70" r="16" fill={chipTokens.ink} />
                  <rect x="45" y="82" width="14" height="28" rx="4" fill={chipTokens.ink} />
                  <circle cx="52" cy="96" r="3" fill={chipTokens.gold} />
                </g>
              )}

              {/* Right Sovereign Vault Node */}
              <g transform="translate(590, 65)">
                <rect x="0" y="0" width="160" height="160" rx="26" fill="#0F172A" stroke={shieldActive ? chipTokens.emerald : chipTokens.crimson} strokeWidth="5.5" />
                <rect x="28" y="28" width="104" height="104" rx="16" fill={chipTokens.crimson} />
                <rect x="28" y="80" width="104" height="52" fill={chipTokens.white} />
                <rect x="28" y="28" width="104" height="104" rx="16" fill="none" stroke={chipTokens.ink} strokeWidth="4" />
                <text x="80" y="196" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="900" fontSize="19">
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
            <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 700, color: chipTokens.gold}}>
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

        {/* ==================================================================
            TIER 3: STRATEGIC COMPARISON DOSSIER (Height ~440px)
            ================================================================== */}
        <ZineCard
          bg={shieldActive ? '#064E3B' : '#3B0D16'}
          enter={Math.max(0.5, hImpor)}
          rotate={0.4}
          borderColor={shieldActive ? chipTokens.emerald : chipTokens.crimson}
          shadowColor={shieldActive ? chipTokens.emerald : chipTokens.crimson}
          style={{padding: '22px 28px'}}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, fontWeight: 800}}>
            {shieldActive ? 'KEDAULATAN KRIPTOGRAFI LOKAL' : 'KETIDAKPASTIAN SUPLAY CHIP IMPOR'}
          </div>
          <div style={{fontFamily: FONT.space, fontSize: 30, color: chipTokens.white, fontWeight: 900, marginTop: 4, lineHeight: 1.2}}>
            {shieldActive
              ? 'Kunci privat & arsitektur enkripsi sepenuhnya dipegang Indonesia'
              : 'Risiko celah keamanan backdoor pihak luar pada dokumen penting negara'}
          </div>
        </ZineCard>
      </div>
    </PcbBackground>
  );
};

/* ============================================================================
   S5: REALISTIS & CTA INTERAKTIF (Warm Slate & Light Studio)
   Zero Dead Space: 2 Dense Roadmap & Debate Tiers (Height ~1550px)
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
          top: 168,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* ==================================================================
            TIER 1: STEP-BY-STEP REALISTIC STRATEGY (Height ~540px)
            ================================================================== */}
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
              {step: '01', label: 'DESAIN IC', desc: 'Rancang sirkuit & enkripsi', active: true},
              {step: '02', label: 'EKOSISTEM', desc: 'Riset ITB & talenta', active: true},
              {step: '03', label: 'MANDIRI', desc: 'Bebas celah asing', active: hRealistis > 0.5},
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  flex: 1,
                  padding: '20px 14px',
                  borderRadius: 18,
                  backgroundColor: item.active ? chipTokens.ink : '#E2E8F0',
                  border: `3.5px solid ${chipTokens.ink}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: chipTokens.gold}}>
                  STEP {item.step}
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: chipTokens.white, marginTop: 4}}>
                  {item.label}
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#CBD5E1', marginTop: 4}}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </ZineCard>

        {/* ==================================================================
            TIER 2: COMMUNITY POLLING & CTA ARENA (Height ~920px)
            ================================================================== */}
        {hKalian > 0.02 && (
          <ZineCard
            bg={chipTokens.ink}
            enter={hKalian}
            rotate={0.6}
            borderColor={chipTokens.ink}
            shadowColor={chipTokens.crimson}
            style={{
              textAlign: 'center',
              position: 'relative',
              padding: '34px 28px',
            }}
          >
            <div
              style={{
                fontFamily: FONT.space,
                fontSize: 48,
                fontWeight: 900,
                color: chipTokens.white,
                lineHeight: 1.15,
              }}
            >
              NAH, MENURUT KALIAN{' '}
              <span style={{color: chipTokens.gold}}>GIMANA?</span>
            </div>

            {/* Interactive Polling Bars */}
            <div
              style={{
                marginTop: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                textAlign: 'left',
              }}
            >
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, color: chipTokens.emerald}}>
                    Kubu Realistis (Dukung Desain Fabless Dulu)
                  </span>
                  <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 900, color: chipTokens.emerald}}>
                    84%
                  </span>
                </div>
                <div style={{height: 16, borderRadius: 999, backgroundColor: '#334155', overflow: 'hidden'}}>
                  <div style={{width: '84%', height: '100%', backgroundColor: chipTokens.emerald, borderRadius: 999}} />
                </div>
              </div>

              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                  <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, color: chipTokens.crimson}}>
                    Kubu Skeptis (Mau Langsung Pabrik Fisik)
                  </span>
                  <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 900, color: chipTokens.crimson}}>
                    16%
                  </span>
                </div>
                <div style={{height: 16, borderRadius: 999, backgroundColor: '#334155', overflow: 'hidden'}}>
                  <div style={{width: '16%', height: '100%', backgroundColor: chipTokens.crimson, borderRadius: 999}} />
                </div>
              </div>
            </div>

            {/* Tactile Follow Button with TapCursor */}
            {hFollow > 0.02 && (
              <div style={{marginTop: 28, position: 'relative', display: 'inline-block'}}>
                <div
                  style={{
                    padding: '18px 52px',
                    borderRadius: 999,
                    backgroundColor: isFollowed ? chipTokens.emerald : chipTokens.crimson,
                    border: `4.5px solid ${chipTokens.white}`,
                    boxShadow: `7px 7px 0px ${chipTokens.gold}`,
                    transform: `scale(${btnPress})`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24">
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
                      fontSize: 34,
                      fontWeight: 900,
                      color: isFollowed ? chipTokens.ink : chipTokens.white,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {isFollowed ? 'FOLLOWED!' : 'FOLLOW AKUN INI'}
                  </span>
                </div>

                <TapCursor atFrame={followLocal} x={280} y={54} />
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
   Zero Dead Space: 3 Majestic Brand & Topic Tiers (Height ~1550px)
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
      traceColor="rgba(251, 191, 36, 0.2)"
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
          top: 168,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          transform: `scale(${0.9 + 0.1 * enter})`,
        }}
      >
        {/* TIER 1: Chip Die Hero (Height ~440px) */}
        <SecureChipSvg pulseFrame={frame} size={230} />

        {/* TIER 2: Grand Brand Showcase Card (Height ~600px) */}
        <ZineCard
          bg={chipTokens.cream}
          enter={enter}
          rotate={-0.6}
          borderColor={chipTokens.ink}
          shadowColor={chipTokens.crimson}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '34px 26px',
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 900, color: chipTokens.crimson}}>
            TECH &amp; HARDWARE SATIRE
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 88,
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
              marginTop: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 40px',
              backgroundColor: chipTokens.gold,
              border: `3.5px solid ${chipTokens.ink}`,
              borderRadius: 999,
              boxShadow: `6px 6px 0px ${chipTokens.ink}`,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: chipTokens.emerald,
                boxShadow: `0 0 10px ${chipTokens.emerald}`,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 30,
                fontWeight: 900,
                color: chipTokens.ink,
              }}
            >
              rhmt.biz.id
            </span>
          </div>
        </ZineCard>

        {/* TIER 3: Research Roadmap Badges (Height ~400px) */}
        <div style={{width: '100%'}}>
          <ZineCard
            bg="#1E1B2E"
            enter={enter}
            rotate={0.8}
            borderColor={chipTokens.gold}
            shadowColor={chipTokens.gold}
            style={{padding: '20px 24px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: chipTokens.gold, fontWeight: 800}}>
                  KONTEN &amp; RISET SELANJUTNYA
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.white, fontWeight: 900, marginTop: 4}}>
                  Bedah Arsitektur Chip &amp; DevOps Indonesia
                </div>
              </div>
              <div
                style={{
                  padding: '8px 18px',
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
