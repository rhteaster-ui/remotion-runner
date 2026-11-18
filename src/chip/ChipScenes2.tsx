import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {markerFrame, useGlobalFrame, useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {ChipElaina} from './ChipElaina';
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
          top: 156,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div style={{textAlign: 'center', transform: `scale(${0.88 + 0.12 * Math.max(0.4, hPenting)})`}}>
          <span
            style={{
              fontFamily: FONT.space,
              fontSize: 54,
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
            padding: '28px 28px',
            border: `4px solid ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
            boxShadow: `10px 10px 0px ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 22,
                fontWeight: 800,
                padding: '6px 16px',
                borderRadius: 10,
                backgroundColor: shieldActive ? chipTokens.emerald : chipTokens.crimson,
                color: shieldActive ? chipTokens.ink : chipTokens.white,
              }}
            >
              {shieldActive ? 'PRIVATE KEY: MILIK SENDIRI' : 'RISIKO: 100% CHIP IMPOR'}
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: '#94A3B8'}}>
              {shieldActive ? 'ENCRYPTED' : 'VULNERABLE'}
            </span>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', padding: '18px 0'}}>
            <svg width="820" height="290" viewBox="0 0 780 260">
              <rect x="20" y="70" width="175" height="120" rx="18" fill="#1F2937" stroke={chipTokens.crimson} strokeWidth="4.5" />
              <path d="M55 130 Q108 85 160 130 Q108 175 55 130 Z" fill="none" stroke={chipTokens.crimson} strokeWidth="4.5" />
              <circle cx="108" cy="130" r="15" fill={chipTokens.crimson} />
              <text x="108" y="218" textAnchor="middle" fill={chipTokens.crimson} fontFamily="monospace" fontWeight="800" fontSize="18">
                PIHAK ASING
              </text>

              <line
                x1="202"
                y1="130"
                x2={shieldActive ? '445' : '575'}
                y2="130"
                stroke={chipTokens.crimson}
                strokeWidth="7"
                strokeDasharray="14 10"
                strokeDashoffset={laserDash}
              />

              {shieldActive && (
                <g>
                  <line x1="445" y1="130" x2="390" y2="62" stroke={chipTokens.gold} strokeWidth="6" strokeLinecap="round" />
                  <line x1="445" y1="130" x2="390" y2="198" stroke={chipTokens.gold} strokeWidth="6" strokeLinecap="round" />
                  <circle cx="445" cy="130" r={11 + 4 * Math.sin(frame * 0.4)} fill={chipTokens.gold} />
                </g>
              )}

              {shieldActive && (
                <g transform={`translate(455, 48) scale(${0.86 + 0.14 * hSendiri})`}>
                  <path
                    d="M48 0 L96 20 V82 C96 126 48 160 48 160 C48 160 0 126 0 82 V20 Z"
                    fill={chipTokens.emerald}
                    stroke={chipTokens.white}
                    strokeWidth="4.5"
                  />
                  <circle cx="48" cy="64" r="15" fill={chipTokens.ink} />
                  <rect x="42" y="75" width="12" height="26" rx="4" fill={chipTokens.ink} />
                </g>
              )}

              <g transform="translate(592, 54)">
                <rect x="0" y="0" width="150" height="150" rx="24" fill="#0F172A" stroke={shieldActive ? chipTokens.emerald : chipTokens.crimson} strokeWidth="5" />
                <rect x="26" y="26" width="98" height="98" rx="14" fill={chipTokens.crimson} />
                <rect x="26" y="75" width="98" height="49" fill={chipTokens.white} />
                <rect x="26" y="26" width="98" height="98" rx="14" fill="none" stroke={chipTokens.ink} strokeWidth="3.5" />
                <text x="75" y="182" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="800" fontSize="18">
                  DATA NEGARA
                </text>
              </g>
            </svg>
          </div>

          <div
            style={{
              marginTop: 10,
              padding: '14px 20px',
              backgroundColor: '#090D16',
              borderRadius: 16,
              border: '2.5px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: chipTokens.gold}}>
              KEY: {hexBytes.join(' ')}
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 800,
                color: hDiintip > 0.1 || shieldActive ? chipTokens.emerald : chipTokens.crimson,
              }}
            >
              {shieldActive ? 'ANTI-INTIP & ANTI-KUNCI' : 'TERBUKA'}
            </span>
          </div>
        </ZineCard>

        {/* Bottom-Right Comparison Strip opposite Elaina */}
        <div style={{alignSelf: 'flex-end', maxWidth: 500, marginTop: 14}}>
          <ZineCard
            bg={shieldActive ? '#064E3B' : '#3B0D16'}
            enter={Math.max(0.5, hImpor)}
            rotate={1}
            style={{border: `3.5px solid ${shieldActive ? chipTokens.emerald : chipTokens.crimson}`, padding: '20px 26px'}}
          >
            <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, fontWeight: 800}}>
              {shieldActive ? 'KEDAULATAN KRIPTOGRAFI' : 'KETIDAKPASTIAN IMPOR'}
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.white, fontWeight: 800, marginTop: 6}}>
              {shieldActive ? 'Kendali Enkripsi di Tangan RI' : 'Rawan Backdoor Supply Chain'}
            </div>
          </ZineCard>
        </div>
      </div>

      <ChipElaina
        side="left"
        bottom={185}
        width={420}
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
          top: 152,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <ZineCard bg={chipTokens.white} enter={Math.max(0.4, hRealistis)} rotate={-0.6} style={{padding: '26px 28px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 22,
                fontWeight: 800,
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
                  fontSize: 20,
                  fontWeight: 800,
                  color: chipTokens.crimson,
                  textDecoration: 'line-through',
                }}
              >
                PABRIK Rp 300+ T
              </span>
            )}
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            {[
              {step: '01', label: 'DESAIN IC', active: true},
              {step: '02', label: 'EKOSISTEM', active: true},
              {step: '03', label: 'MANDIRI', active: hRealistis > 0.5},
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  flex: 1,
                  padding: '18px 10px',
                  borderRadius: 16,
                  backgroundColor: item.active ? chipTokens.ink : '#E2E8F0',
                  border: `3.5px solid ${chipTokens.ink}`,
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 700, color: chipTokens.gold}}>
                  STEP {item.step}
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: chipTokens.white, marginTop: 6}}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </ZineCard>

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
              padding: '34px 26px',
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

            <div
              style={{
                marginTop: 18,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 22px',
                backgroundColor: '#1E293B',
                borderRadius: 999,
                border: '2.5px solid rgba(255,255,255,0.22)',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  fill="none"
                  stroke={chipTokens.gold}
                  strokeWidth="2.5"
                />
              </svg>
              <span style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: '#E2E8F0'}}>
                DROP KOMENTAR DI BAWAH
              </span>
            </div>

            {hFollow > 0.02 && (
              <div style={{marginTop: 26, position: 'relative', display: 'inline-block'}}>
                <div
                  style={{
                    padding: '18px 50px',
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

                {/* Cursor lands cleanly on lower-right edge of pill without covering text */}
                <TapCursor atFrame={followLocal} x={286} y={56} />
              </div>
            )}
          </ZineCard>
        )}

        {/* Companion Poll Tag opposite Elaina */}
        {hKalian > 0.05 && (
          <div style={{alignSelf: 'flex-start', maxWidth: 490, marginTop: 8}}>
            <ZineCard bg={chipTokens.white} enter={hKalian} rotate={-1.5} style={{padding: '18px 24px'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.crimson, fontWeight: 800}}>
                TIM OPTIMIS VS TIM SKEPTIS
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.ink, fontWeight: 800, marginTop: 4}}>
                Kalian Masuk Kubu Mana?
              </div>
            </ZineCard>
          </div>
        )}
      </div>

      <ChipElaina
        side="right"
        bottom={185}
        width={420}
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
          top: 190,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          transform: `scale(${0.86 + 0.14 * enter})`,
        }}
      >
        <SecureChipSvg pulseFrame={frame} size={190} />

        {/* Clean Brand Wordmark Card — ZERO Gemini logo */}
        <ZineCard
          bg={chipTokens.cream}
          enter={enter}
          rotate={-1}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '34px 26px',
            boxShadow: `12px 12px 0px ${chipTokens.crimson}`,
          }}
        >
          <div style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 800, color: chipTokens.crimson}}>
            TECH &amp; CODE SATIRE
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 82,
              fontWeight: 900,
              color: chipTokens.ink,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginTop: 8,
            }}
          >
            rhmt ofc
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: chipTokens.gold,
              border: `3.5px solid ${chipTokens.ink}`,
              borderRadius: 999,
              boxShadow: `5px 5px 0px ${chipTokens.ink}`,
              fontFamily: FONT.mono,
              fontSize: 30,
              fontWeight: 800,
              color: chipTokens.ink,
            }}
          >
            rhmt.biz.id
          </div>
        </ZineCard>

        {/* Companion Topic Chips opposite Elaina */}
        <div style={{alignSelf: 'flex-end', maxWidth: 490, marginTop: 12}}>
          <ZineCard bg="#1E1B2E" enter={enter} rotate={1.2} style={{border: `3.5px solid ${chipTokens.gold}`, padding: '18px 24px'}}>
            <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, fontWeight: 800}}>
              KONTEN SELANJUTNYA
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.white, fontWeight: 800, marginTop: 4}}>
              Bedah Hardware &amp; Dev Indo
            </div>
          </ZineCard>
        </div>
      </div>

      <ChipElaina
        side="left"
        bottom={185}
        width={420}
        track={[{pose: 'double_peace', atFrame: 0, reaction: 'sparkle'}]}
      />
    </PcbBackground>
  );
};
