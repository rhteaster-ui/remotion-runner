import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {
  PcbBackground,
  SecureChipSvg,
  SiliconWaferHero,
  StampBadge,
  TikTokCommentCard,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S1: HOOK — VIRAL MEDSOS & KOMENTAR SKEPTIS (Light Editorial Cream)
   ============================================================================ */
export const S1NetizenHook: React.FC = () => {
  const frame = useCurrentFrame();

  const hRame = useHit('rame');
  const hChip = useHit('chip1');
  const hNetizen = useHit('netizen');
  const hStiker = useHit('stiker');
  const hEsemka = useHit('esemka');
  const hAslinya = useHit('aslinya');

  const zoom = 1 + Math.min(0.02, frame * 0.00006);

  return (
    <PcbBackground
      bgColor={chipTokens.cream}
      traceColor="rgba(17, 16, 29, 0.08)"
      dotColor="rgba(17, 16, 29, 0.14)"
    >
      <ChipHUD
        index="01/06"
        label="VIRAL MEDSOS"
        stepIndex={0}
        dark={false}
        metricTag="TIKTOK DEBATE"
      />

      <div
        style={{
          position: 'absolute',
          top: 172,
          left: 56,
          right: 56,
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
        }}
      >
        {/* Breaking Headline Banner */}
        <ZineCard
          bg={chipTokens.white}
          enter={hRame}
          rotate={-0.6}
          style={{width: '100%', padding: '24px 28px'}}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 800,
                backgroundColor: chipTokens.crimson,
                color: chipTokens.white,
                padding: '4px 16px',
                borderRadius: 10,
                border: `3px solid ${chipTokens.ink}`,
              }}
            >
              TRENDING TIKTOK
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                fontWeight: 800,
                color: chipTokens.slateMuted,
              }}
            >
              KONSORSIUM PERURI × ITB
            </span>
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 54,
              fontWeight: 900,
              color: chipTokens.ink,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            INDONESIA BIKIN{' '}
            <span
              style={{
                backgroundColor: chipTokens.gold,
                padding: '2px 14px',
                borderRadius: 14,
                border: `3.5px solid ${chipTokens.ink}`,
                display: 'inline-block',
                marginTop: 6,
                transform: `scale(${0.92 + 0.08 * hChip})`,
                boxShadow: `4px 4px 0px ${chipTokens.ink}`,
              }}
            >
              CHIP SENDIRI?!
            </span>
          </div>
        </ZineCard>

        {/* Centerpiece Hero: Silicon Wafer + Prototipe RI-01 Blueprint */}
        <div style={{margin: '6px 0', position: 'relative'}}>
          <SiliconWaferHero pulseFrame={frame} size={420} activeLabel="SILICON WAFER // RI-01" />
        </div>

        {/* Skeptical Netizen Comments (Popping dynamically across width) */}
        {hNetizen > 0.02 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <TikTokCommentCard
              handle="@warga_skeptis"
              comment="Halah, paling rebrand stiker China doang!"
              likes="16.4K"
              avatarColor="#EF4444"
              enter={hStiker > 0.02 ? hStiker : hNetizen}
              rotate={0.6}
              tag="TOP KOMEN"
              peelEffect={true}
            />
            <TikTokCommentCard
              handle="@pengamat_kopi"
              comment="Esemka jilid 2 nih bos, pabriknya mana?!"
              likes="11.2K"
              avatarColor="#F59E0B"
              enter={hEsemka}
              rotate={-0.8}
            />
          </div>
        )}

        {/* Climactic Stamp / Reality Callout */}
        <div style={{marginTop: 6, textAlign: 'center'}}>
          {hAslinya > 0.02 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
              <StampBadge
                text="NGGAK SEBERCANDA ITU!"
                color={chipTokens.crimson}
                enter={hAslinya}
                rotate={-2.5}
                fontSize={42}
              />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 800,
                  color: chipTokens.ink,
                  backgroundColor: chipTokens.gold,
                  padding: '6px 20px',
                  borderRadius: 10,
                  border: `3px solid ${chipTokens.ink}`,
                  boxShadow: `4px 4px 0px ${chipTokens.ink}`,
                }}
              >
                PROYEK RESMI CHIP ENKRIPSI DOKUMEN NEGARA
              </div>
            </div>
          ) : (
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 18,
                fontWeight: 700,
                color: chipTokens.slateMuted,
              }}
            >
              [Menunggu verifikasi fakta hardware...]
            </div>
          )}
        </div>
      </div>
    </PcbBackground>
  );
};

/* ============================================================================
   S2: EKSPEKTASI VS REALITA — SNAPDRAGON VS E-PASPOR (Dark Cyber Maroon)
   ============================================================================ */
export const S2SnapdragonVsPaspor: React.FC = () => {
  const frame = useCurrentFrame();

  const hSnap = useHit('snapdragon');
  const hGame = useHit('game');
  const hBukan = useHit('bukan');
  const hMikro = useHit('mikrokontroler');
  const hNegara = useHit('negara');

  const fanSpin = (frame * 24) % 360;
  const nfcWave = (frame % 36) / 36;
  const chipSlide = interpolate(hMikro, [0, 1], [-60, 0]);

  const sBukan = useSince('bukan');
  const shakeX = sBukan >= 0 && sBukan < 8 ? Math.sin(sBukan * 2.6) * (10 - sBukan) * 2 : 0;

  return (
    <PcbBackground
      bgColor="#140C18"
      traceColor="rgba(225, 29, 72, 0.16)"
      dotColor="rgba(255, 255, 255, 0.1)"
    >
      <ChipHUD
        index="02/06"
        label="EKSPEKTASI VS REALITA"
        stepIndex={1}
        dark={true}
        metricTag="SECURE IC // 90NM"
      />

      <div
        style={{
          position: 'absolute',
          top: 172,
          left: 56,
          right: 56,
          transform: `translateX(${shakeX}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Top Card: Expectation (Gaming Snapdragon Phone) */}
        <ZineCard
          bg={hBukan > 0.1 ? '#271729' : '#1E1B2E'}
          enter={Math.max(0.4, hSnap)}
          rotate={hBukan > 0.1 ? -1.2 : 0}
          style={{
            opacity: hBukan > 0.1 ? 0.6 : 1,
            position: 'relative',
            padding: '22px 28px',
            border: `4px solid ${hBukan > 0.1 ? chipTokens.crimson : chipTokens.gold}`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
            <svg width="130" height="130" viewBox="0 0 140 140" style={{flexShrink: 0}}>
              <rect x="14" y="24" width="112" height="92" rx="16" fill="#0F172A" stroke={chipTokens.gold} strokeWidth="4" />
              <rect x="24" y="34" width="92" height="72" rx="8" fill="#1E293B" />
              <g transform={`translate(70, 70) rotate(${fanSpin})`}>
                <circle cx="0" cy="0" r="24" fill="none" stroke={chipTokens.crimson} strokeWidth="3" />
                <path d="M0,-20 C10,-12 10,-4 0,0 C-10,4 -10,12 0,20" fill={chipTokens.crimson} />
                <path d="M-20,0 C-12,-10 -4,-10 0,0 C4,10 12,10 20,0" fill={chipTokens.gold} />
              </g>
              <circle cx="70" cy="70" r="6" fill={chipTokens.white} />
            </svg>

            <div style={{flex: 1}}>
              <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, color: chipTokens.gold}}>
                ANGGAPAN NETIZEN
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 38, fontWeight: 900, color: chipTokens.white, lineHeight: 1.15}}>
                Chipset Snapdragon
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: 8,
                  backgroundColor: hGame > 0.1 ? chipTokens.crimson : '#334155',
                  fontFamily: FONT.mono,
                  fontSize: 18,
                  fontWeight: 800,
                  color: chipTokens.white,
                }}
              >
                MAEN GAME 120 FPS RATA KANAN
              </div>
            </div>
          </div>

          {hBukan > 0.02 && (
            <div
              style={{
                position: 'absolute',
                right: 32,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <StampBadge text="BUKAN, BRO! ❌" color={chipTokens.crimson} enter={hBukan} rotate={-10} fontSize={42} />
            </div>
          )}
        </ZineCard>

        {/* Bottom Card: Reality (Secure Chip + e-Paspor RI) */}
        {hMikro > 0.02 && (
          <ZineCard
            bg={chipTokens.cream}
            enter={hMikro}
            rotate={0.5}
            style={{padding: '26px 28px', border: `4px solid ${chipTokens.emerald}`}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
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
                FAKTA SEBENARNYA
              </span>
              <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 800, color: chipTokens.ink}}>
                SECURE ELEMENT IC (90nm)
              </span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 14, padding: '10px 0'}}>
              <div style={{transform: `translateX(${chipSlide}px)`}}>
                <SecureChipSvg pulseFrame={frame} size={190} />
              </div>

              {/* NFC Wireless Transmission Arrow */}
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
                <svg width="68" height="38" viewBox="0 0 64 36">
                  <path d="M4 18 H50" stroke={chipTokens.ink} strokeWidth="5" strokeDasharray="8 6" />
                  <path d="M44 8 L58 18 L44 28" fill="none" stroke={chipTokens.crimson} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{fontFamily: FONT.mono, fontSize: 14, fontWeight: 800, color: chipTokens.crimson}}>
                  NFC FIELD
                </span>
              </div>

              {/* 3D-styled Indonesian e-Passport Booklet */}
              <div style={{position: 'relative'}}>
                <svg width="180" height="232" viewBox="0 0 166 214">
                  <rect x="6" y="6" width="154" height="202" rx="16" fill="#0B3B2E" stroke={chipTokens.ink} strokeWidth="5" />
                  <rect x="18" y="18" width="130" height="178" rx="10" fill="none" stroke={chipTokens.gold} strokeWidth="2.5" strokeOpacity="0.65" />
                  <text x="83" y="46" textAnchor="middle" fill={chipTokens.gold} fontFamily="sans-serif" fontWeight="900" fontSize="13">
                    REPUBLIK INDONESIA
                  </text>
                  <polygon points="83,68 95,92 120,96 101,114 106,138 83,126 60,138 65,114 46,96 71,92" fill={chipTokens.gold} />
                  <text x="83" y="164" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="900" fontSize="18">
                    e-PASPOR
                  </text>
                  <rect x="65" y="174" width="36" height="18" rx="4" fill="none" stroke={chipTokens.gold} strokeWidth="2.5" />
                  <circle cx="83" cy="183" r="4" fill={chipTokens.gold} />
                </svg>

                {hNegara > 0.05 && (
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 80 80"
                    style={{position: 'absolute', top: -20, right: -20, pointerEvents: 'none'}}
                  >
                    {[0.25, 0.6, 0.95].map((r, i) => {
                      const p = (nfcWave + i * 0.33) % 1;
                      return (
                        <circle
                          key={r}
                          cx="40"
                          cy="40"
                          r={10 + p * 28}
                          fill="none"
                          stroke={chipTokens.emerald}
                          strokeWidth="4"
                          opacity={1 - p}
                        />
                      );
                    })}
                  </svg>
                )}
              </div>
            </div>

            <div
              style={{
                marginTop: 12,
                fontFamily: FONT.space,
                fontSize: 32,
                fontWeight: 900,
                color: chipTokens.ink,
                textAlign: 'center',
              }}
            >
              Chip Mikrokontroler Enkripsi Negara
            </div>
          </ZineCard>
        )}

        {/* Detailed Hardware Spec Pill Bar */}
        {hNegara > 0.05 && (
          <ZineCard
            bg="#1E1B2E"
            enter={hNegara}
            rotate={-0.6}
            style={{border: `3.5px solid ${chipTokens.gold}`, padding: '18px 24px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: chipTokens.gold, fontWeight: 800}}>
                  TARGET PENGGUNAAN
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, color: chipTokens.white, fontWeight: 900, marginTop: 4}}>
                  Keamanan Dokumen Negara &amp; e-Paspor
                </div>
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  backgroundColor: chipTokens.emerald,
                  color: chipTokens.ink,
                  borderRadius: 10,
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                ANTI-TAMPER IC
              </div>
            </div>
          </ZineCard>
        )}
      </div>
    </PcbBackground>
  );
};

/* ============================================================================
   S3: BEDAH FAKTA "FABLESS" — APPLE & NVIDIA JUGA 0 PABRIK (Cobalt Blueprint)
   ============================================================================ */
export const S3FablessTruth: React.FC = () => {
  const frame = useCurrentFrame();

  const hPabrik = useHit('pabriknya');
  const hApple = useHit('apple');
  const hFabless = useHit('fabless');
  const hPeruri = useHit('peruri');
  const hKripto = useHit('kripto');

  const dashOffset = -(frame * 4) % 36;

  return (
    <PcbBackground
      bgColor={chipTokens.cobalt}
      traceColor="rgba(59, 130, 246, 0.24)"
      dotColor="rgba(147, 197, 253, 0.16)"
    >
      <ChipHUD
        index="03/06"
        label="SISTEM FABLESS"
        stepIndex={2}
        dark={true}
        metricTag="GLOBAL SUPPLY CHAIN"
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
        {/* Skeptical Quote Bubble */}
        <div
          style={{
            alignSelf: 'center',
            padding: '12px 30px',
            backgroundColor: '#1E293B',
            border: `3.5px solid ${chipTokens.white}`,
            borderRadius: 999,
            boxShadow: `6px 6px 0px ${chipTokens.ink}`,
            transform: `scale(${0.88 + 0.12 * Math.max(0.3, hPabrik)})`,
          }}
        >
          <span style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 900, color: chipTokens.gold}}>
            "Pabriknya di mana nih?! Halu!"
          </span>
        </div>

        {/* The 3 Global Giants: Apple, Nvidia, Qualcomm */}
        {hApple > 0.02 && (
          <ZineCard bg={chipTokens.cream} enter={hApple} rotate={-0.6} style={{padding: '24px 26px'}}>
            <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: chipTokens.crimson, marginBottom: 12}}>
              FAKTA INDUSTRI SEMIKONDUKTOR GLOBAL
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: 14}}>
              {[
                {name: 'APPLE', sub: 'M-Series / A17'},
                {name: 'NVIDIA', sub: 'H100 / RTX 50'},
                {name: 'QUALCOMM', sub: 'Snapdragon 8'},
              ].map((b) => (
                <div
                  key={b.name}
                  style={{
                    flex: 1,
                    backgroundColor: chipTokens.ink,
                    borderRadius: 16,
                    padding: '16px 10px',
                    textAlign: 'center',
                    border: `3px solid ${chipTokens.ink}`,
                    boxShadow: `5px 5px 0px ${chipTokens.cobaltLight}`,
                  }}
                >
                  <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: chipTokens.white}}>
                    {b.name}
                  </div>
                  <div style={{fontFamily: FONT.mono, fontSize: 15, color: chipTokens.gold, marginTop: 4}}>
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                padding: '10px 16px',
                backgroundColor: chipTokens.gold,
                border: `3px solid ${chipTokens.ink}`,
                borderRadius: 12,
                textAlign: 'center',
                fontFamily: FONT.space,
                fontSize: 26,
                fontWeight: 900,
                color: chipTokens.ink,
              }}
            >
              SEMUANYA 0 PABRIK WAFER SENDIRI!
            </div>
          </ZineCard>
        )}

        {/* Hero Semiconductor Architecture Diagram (Fabless Supply Chain) */}
        {hFabless > 0.02 && (
          <ZineCard
            bg="#0B1224"
            enter={hFabless}
            rotate={0.5}
            style={{border: `4px solid ${chipTokens.gold}`, padding: '26px 26px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 900,
                  backgroundColor: chipTokens.gold,
                  color: chipTokens.ink,
                  padding: '5px 16px',
                  borderRadius: 8,
                }}
              >
                MODEL FABLESS RESMI
              </span>
              <span style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.emerald, fontWeight: 800}}>
                ARSITEKTUR &amp; IP LOKAL
              </span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14}}>
              {/* Brain / Architecture */}
              <div
                style={{
                  flex: 1.3,
                  padding: '20px 16px',
                  borderRadius: 18,
                  backgroundColor: chipTokens.crimson,
                  border: `3px solid ${chipTokens.white}`,
                  transform: `scale(${1 + 0.04 * hPeruri})`,
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: chipTokens.gold}}>
                  OTAK &amp; ARSITEKTUR
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 900, color: chipTokens.white, marginTop: 4}}>
                  ITB × PERURI
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: chipTokens.white, opacity: 0.95, marginTop: 6}}>
                  {hKripto > 0.1 ? 'Sirkuit + Kripto Enclave' : 'Desain Logika Sirkuit IC'}
                </div>
              </div>

              {/* Data conduit / stream */}
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
                <svg width="74" height="40" viewBox="0 0 68 40" style={{flexShrink: 0}}>
                  <line
                    x1="4"
                    y1="20"
                    x2="54"
                    y2="20"
                    stroke={chipTokens.gold}
                    strokeWidth="5"
                    strokeDasharray="10 8"
                    strokeDashoffset={dashOffset}
                  />
                  <polygon points="50,10 66,20 50,30" fill={chipTokens.gold} />
                </svg>
                <span style={{fontFamily: FONT.mono, fontSize: 13, color: chipTokens.gold, fontWeight: 800}}>
                  GDSII DATA
                </span>
              </div>

              {/* Foundry Fab */}
              <div
                style={{
                  flex: 1,
                  padding: '20px 16px',
                  borderRadius: 18,
                  backgroundColor: '#1E293B',
                  border: `3px solid ${chipTokens.cobaltLight}`,
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: chipTokens.cobaltLight}}>
                  MANUFAKTUR
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 900, color: chipTokens.white, marginTop: 4}}>
                  FOUNDRY
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#CBD5E1', marginTop: 6}}>
                  Cetak Silikon Murni
                </div>
              </div>
            </div>
          </ZineCard>
        )}

        {/* Takeaway Insight Badge */}
        {hKripto > 0.05 && (
          <ZineCard
            bg="#0B1224"
            enter={hKripto}
            rotate={-0.6}
            style={{border: `3.5px solid ${chipTokens.emerald}`, padding: '18px 24px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: chipTokens.emerald, fontWeight: 800}}>
                  INTELLECTUAL PROPERTY (IP)
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, color: chipTokens.white, fontWeight: 900, marginTop: 4}}>
                  Logika Enkripsi &amp; Algoritma 100% Karya Dalam Negeri
                </div>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  backgroundColor: chipTokens.emerald,
                  color: chipTokens.ink,
                  borderRadius: 8,
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                RESMI
              </div>
            </div>
          </ZineCard>
        )}
      </div>
    </PcbBackground>
  );
};
