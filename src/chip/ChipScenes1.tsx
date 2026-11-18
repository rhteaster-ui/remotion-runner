import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {ChipElaina} from './ChipElaina';
import {
  PcbBackground,
  SecureChipSvg,
  StampBadge,
  TikTokCommentCard,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S1: HOOK — KOMENTAR NETIZEN TIKTOK (Editorial Cream Paper)
   ============================================================================ */
export const S1NetizenHook: React.FC = () => {
  const frame = useCurrentFrame();

  const hRame = useHit('rame');
  const hChip = useHit('chip1');
  const hNetizen = useHit('netizen');
  const hStiker = useHit('stiker');
  const hEsemka = useHit('esemka');
  const hAslinya = useHit('aslinya');

  const zoom = 1 + Math.min(0.03, frame * 0.00008);

  return (
    <PcbBackground
      bgColor={chipTokens.cream}
      traceColor="rgba(17, 16, 29, 0.08)"
      dotColor="rgba(17, 16, 29, 0.14)"
    >
      <ChipHUD index="01/06" label="VIRAL MEDSOS" dark={false} />

      <div
        style={{
          position: 'absolute',
          top: 152,
          left: 56,
          right: 56,
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Breaking Headline Banner */}
        <ZineCard bg={chipTokens.white} enter={hRame} rotate={-0.8} style={{padding: '26px 28px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 22,
                fontWeight: 800,
                backgroundColor: chipTokens.crimson,
                color: chipTokens.white,
                padding: '5px 16px',
                borderRadius: 10,
                border: `3px solid ${chipTokens.ink}`,
              }}
            >
              TRENDING TIKTOK
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: chipTokens.slateMuted}}>
              PERURI × ITB
            </span>
          </div>
          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 58,
              fontWeight: 800,
              color: chipTokens.ink,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
            }}
          >
            INDONESIA BIKIN{' '}
            <span
              style={{
                backgroundColor: chipTokens.gold,
                padding: '2px 12px',
                borderRadius: 12,
                border: `3.5px solid ${chipTokens.ink}`,
                display: 'inline-block',
                marginTop: 6,
                transform: `scale(${0.92 + 0.08 * hChip})`,
              }}
            >
              CHIP SENDIRI?!
            </span>
          </div>
        </ZineCard>

        {/* Authentic TikTok Skeptical Comments Stack */}
        {hNetizen > 0.02 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 4}}>
            <TikTokCommentCard
              handle="@warga_tiktok"
              comment="Halah, paling rebrand stiker China"
              likes="14.2K"
              avatarColor="#EF4444"
              enter={hStiker > 0.02 ? hStiker : hNetizen}
              rotate={0.6}
              tag="TOP KOMEN"
            />
            <TikTokCommentCard
              handle="@bang_skeptis"
              comment="Esemka jilid 2 nih bos"
              likes="9.8K"
              avatarColor="#F59E0B"
              enter={hEsemka}
              rotate={-0.9}
            />
            <TikTokCommentCard
              handle="@anak_rnd"
              comment="Info loker pabriknya bang"
              likes="3.1K"
              avatarColor="#3B82F6"
              enter={hEsemka}
              rotate={0.5}
            />
          </div>
        )}

        {/* Stamp Punchline & Spec Callout filling lower-left opposite Elaina */}
        <div style={{marginTop: 22, maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 18}}>
          {hAslinya > 0.02 ? (
            <StampBadge
              text="NGGAK SEBERCANDA ITU!"
              color={chipTokens.crimson}
              enter={hAslinya}
              rotate={-3}
              fontSize={36}
            />
          ) : (
            <ZineCard bg={chipTokens.gold} enter={hNetizen} rotate={-1.5} style={{padding: '16px 22px'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, color: chipTokens.ink}}>
                PROTOTIPE RESMI
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 30, fontWeight: 800, color: chipTokens.ink, marginTop: 4}}>
                Chip Merah Putih RI
              </div>
            </ZineCard>
          )}
        </div>
      </div>

      <ChipElaina
        side="right"
        bottom={185}
        width={435}
        track={[
          {pose: 'arms_crossed', atFrame: 0},
          {at: 'stiker', pose: 'chin_rest', reaction: 'sweat'},
          {at: 'aslinya', pose: 'finger_gun', reaction: 'exclamation'},
        ]}
      />
    </PcbBackground>
  );
};

/* ============================================================================
   S2: EKSPEKTASI VS REALITA — SNAPDRAGON VS E-PASPOR (Crimson Dark)
   ============================================================================ */
export const S2SnapdragonVsPaspor: React.FC = () => {
  const frame = useCurrentFrame();

  const hSnap = useHit('snapdragon');
  const hGame = useHit('game');
  const hBukan = useHit('bukan');
  const hMikro = useHit('mikrokontroler');
  const hNegara = useHit('negara');

  const fanSpin = (frame * 18) % 360;
  const nfcWave = (frame % 36) / 36;
  const chipSlide = interpolate(hMikro, [0, 1], [-140, 0]);

  const sBukan = useSince('bukan');
  const shakeX = sBukan >= 0 && sBukan < 8 ? Math.sin(sBukan * 2.6) * (8 - sBukan) * 1.8 : 0;

  return (
    <PcbBackground
      bgColor="#160C18"
      traceColor="rgba(225, 29, 72, 0.14)"
      dotColor="rgba(255, 255, 255, 0.1)"
    >
      <ChipHUD index="02/06" label="EKSPEKTASI VS REALITA" dark={true} />

      <div
        style={{
          position: 'absolute',
          top: 152,
          left: 56,
          right: 56,
          transform: `translateX(${shakeX}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        {/* Top Card: Expectation (Gaming Snapdragon Phone) */}
        <ZineCard
          bg={hBukan > 0.1 ? '#271729' : '#1E1B2E'}
          enter={Math.max(0.4, hSnap)}
          rotate={hBukan > 0.1 ? -1.8 : 0}
          style={{
            opacity: hBukan > 0.1 ? 0.62 : 1,
            position: 'relative',
            padding: '24px 28px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20}}>
            <svg width="144" height="144" viewBox="0 0 140 140" style={{flexShrink: 0}}>
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
              <div style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: chipTokens.gold}}>
                ANGGAPAN NETIZEN
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 40, fontWeight: 800, color: chipTokens.white, lineHeight: 1.15}}>
                Chipset Snapdragon
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: 8,
                  backgroundColor: hGame > 0.1 ? chipTokens.crimson : '#334155',
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: chipTokens.white,
                }}
              >
                GAME 120 FPS RATA KANAN
              </div>
            </div>
          </div>

          {hBukan > 0.02 && (
            <div style={{position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)'}}>
              <StampBadge text="BUKAN, BRO!" color={chipTokens.crimson} enter={hBukan} rotate={-10} fontSize={40} />
            </div>
          )}
        </ZineCard>

        {/* Bottom Card: Reality (Secure Chip + e-Paspor RI) */}
        {hMikro > 0.02 && (
          <ZineCard bg={chipTokens.cream} enter={hMikro} rotate={0.5} style={{padding: '28px 28px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
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
                FAKTA SEBENARNYA
              </span>
              <span style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 700, color: chipTokens.ink}}>
                SECURE ELEMENT IC
              </span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 12, padding: '12px 0'}}>
              <div style={{transform: `translateX(${chipSlide}px)`}}>
                <SecureChipSvg pulseFrame={frame} size={180} />
              </div>

              <svg width="72" height="44" viewBox="0 0 64 40">
                <path d="M4 20 H52" stroke={chipTokens.ink} strokeWidth="5" strokeDasharray="8 6" />
                <path d="M46 10 L58 20 L46 30" fill="none" stroke={chipTokens.crimson} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div style={{position: 'relative'}}>
                <svg width="176" height="226" viewBox="0 0 166 214">
                  <rect x="6" y="6" width="154" height="202" rx="16" fill="#0B3B2E" stroke={chipTokens.ink} strokeWidth="5" />
                  <rect x="18" y="18" width="130" height="178" rx="10" fill="none" stroke={chipTokens.gold} strokeWidth="2.5" strokeOpacity="0.65" />
                  <text x="83" y="48" textAnchor="middle" fill={chipTokens.gold} fontFamily="sans-serif" fontWeight="800" fontSize="14">
                    REPUBLIK INDONESIA
                  </text>
                  <polygon points="83,68 95,92 120,96 101,114 106,138 83,126 60,138 65,114 46,96 71,92" fill={chipTokens.gold} />
                  <text x="83" y="166" textAnchor="middle" fill={chipTokens.white} fontFamily="monospace" fontWeight="800" fontSize="18">
                    e-PASPOR
                  </text>
                  <rect x="65" y="176" width="36" height="18" rx="4" fill="none" stroke={chipTokens.gold} strokeWidth="2.5" />
                  <circle cx="83" cy="185" r="4" fill={chipTokens.gold} />
                </svg>

                {hNegara > 0.05 && (
                  <svg
                    width="88"
                    height="88"
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
                          r={10 + p * 26}
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
                marginTop: 14,
                fontFamily: FONT.space,
                fontSize: 32,
                fontWeight: 800,
                color: chipTokens.ink,
                textAlign: 'center',
              }}
            >
              Chip Mikrokontroler Enkripsi Negara
            </div>
          </ZineCard>
        )}

        {/* Companion Spec Tag opposite Elaina */}
        {hNegara > 0.05 && (
          <div style={{alignSelf: 'flex-end', maxWidth: 500, marginTop: 10}}>
            <ZineCard bg="#1E1B2E" enter={hNegara} rotate={-1} style={{border: `3.5px solid ${chipTokens.gold}`, padding: '18px 24px'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, fontWeight: 800}}>
                FUNGSI UTAMA
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 28, color: chipTokens.white, fontWeight: 800, marginTop: 4}}>
                Keamanan Identitas &amp; e-Paspor
              </div>
            </ZineCard>
          </div>
        )}
      </div>

      <ChipElaina
        side="left"
        bottom={185}
        width={420}
        track={[
          {pose: 'chin_rest', atFrame: 0},
          {at: 'bukan', pose: 'arms_crossed', reaction: 'exclamation'},
          {at: 'mikrokontroler', pose: 'open_hand', reaction: 'sparkle'},
        ]}
      />
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

  const dashOffset = -(frame * 3) % 36;

  return (
    <PcbBackground
      bgColor={chipTokens.cobalt}
      traceColor="rgba(59, 130, 246, 0.22)"
      dotColor="rgba(147, 197, 253, 0.16)"
    >
      <ChipHUD index="03/06" label="SISTEM FABLESS" dark={true} />

      <div
        style={{
          position: 'absolute',
          top: 152,
          left: 56,
          right: 56,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div
          style={{
            alignSelf: 'center',
            padding: '14px 30px',
            backgroundColor: '#1E293B',
            border: `3.5px solid ${chipTokens.white}`,
            borderRadius: 999,
            boxShadow: `6px 6px 0px ${chipTokens.ink}`,
            transform: `scale(${0.86 + 0.14 * Math.max(0.3, hPabrik)})`,
          }}
        >
          <span style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 800, color: chipTokens.gold}}>
            "Pabriknya di mana nih?!"
          </span>
        </div>

        {hApple > 0.02 && (
          <ZineCard bg={chipTokens.cream} enter={hApple} rotate={-0.6} style={{padding: '26px 26px'}}>
            <div style={{fontFamily: FONT.mono, fontSize: 20, fontWeight: 800, color: chipTokens.crimson, marginBottom: 14}}>
              FAKTA INDUSTRI SEMIKONDUKTOR GLOBAL
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: 14}}>
              {[
                {name: 'APPLE', sub: 'M-Series'},
                {name: 'NVIDIA', sub: 'RTX / AI'},
                {name: 'QUALCOMM', sub: 'Snapdragon'},
              ].map((b) => (
                <div
                  key={b.name}
                  style={{
                    flex: 1,
                    backgroundColor: chipTokens.ink,
                    borderRadius: 16,
                    padding: '18px 10px',
                    textAlign: 'center',
                    border: `3px solid ${chipTokens.ink}`,
                    boxShadow: `5px 5px 0px ${chipTokens.cobaltLight}`,
                  }}
                >
                  <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 900, color: chipTokens.white}}>
                    {b.name}
                  </div>
                  <div style={{fontFamily: FONT.mono, fontSize: 17, color: chipTokens.gold, marginTop: 6}}>
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                backgroundColor: chipTokens.gold,
                border: `3px solid ${chipTokens.ink}`,
                borderRadius: 12,
                textAlign: 'center',
                fontFamily: FONT.space,
                fontSize: 28,
                fontWeight: 900,
                color: chipTokens.ink,
              }}
            >
              SEMUANYA 0 PABRIK WAFER SENDIRI
            </div>
          </ZineCard>
        )}

        {hFabless > 0.02 && (
          <ZineCard bg="#0B1224" enter={hFabless} rotate={0.5} style={{border: `4px solid ${chipTokens.gold}`, padding: '26px 26px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 22,
                  fontWeight: 800,
                  backgroundColor: chipTokens.gold,
                  color: chipTokens.ink,
                  padding: '5px 16px',
                  borderRadius: 8,
                }}
              >
                MODEL FABLESS
              </span>
              <span style={{fontFamily: FONT.mono, fontSize: 19, color: chipTokens.emerald}}>
                DESIGN IN INDONESIA
              </span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
              <div
                style={{
                  flex: 1.25,
                  padding: '20px 16px',
                  borderRadius: 18,
                  backgroundColor: chipTokens.crimson,
                  border: `3px solid ${chipTokens.white}`,
                  transform: `scale(${1 + 0.04 * hPeruri})`,
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: chipTokens.gold}}>
                  OTAK &amp; ARSITEKTUR
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 900, color: chipTokens.white, marginTop: 6}}>
                  ITB × PERURI
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 17, color: chipTokens.white, opacity: 0.92, marginTop: 8}}>
                  {hKripto > 0.1 ? 'Sirkuit + Enkripsi Lokal' : 'Desain Sirkuit IC'}
                </div>
              </div>

              <svg width="68" height="44" viewBox="0 0 64 44" style={{flexShrink: 0}}>
                <line
                  x1="4"
                  y1="22"
                  x2="50"
                  y2="22"
                  stroke={chipTokens.gold}
                  strokeWidth="5"
                  strokeDasharray="10 8"
                  strokeDashoffset={dashOffset}
                />
                <polygon points="46,12 62,22 46,32" fill={chipTokens.gold} />
              </svg>

              <div
                style={{
                  flex: 1,
                  padding: '20px 16px',
                  borderRadius: 18,
                  backgroundColor: '#1E293B',
                  border: `3px solid ${chipTokens.cobaltLight}`,
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 700, color: chipTokens.cobaltLight}}>
                  MANUFAKTUR
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 900, color: chipTokens.white, marginTop: 6}}>
                  FOUNDRY
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 17, color: '#CBD5E1', marginTop: 8}}>
                  Cetak Silikon
                </div>
              </div>
            </div>
          </ZineCard>
        )}

        {/* Companion Callout filling left side opposite Elaina */}
        {hKripto > 0.05 && (
          <div style={{alignSelf: 'flex-start', maxWidth: 520, marginTop: 6}}>
            <ZineCard bg="#0B1224" enter={hKripto} rotate={-1} style={{border: `3.5px solid ${chipTokens.emerald}`, padding: '18px 24px'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.emerald, fontWeight: 800}}>
                INTELLECTUAL PROPERTY
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 26, color: chipTokens.white, fontWeight: 800, marginTop: 4}}>
                Arsitektur Logika 100% Lokal
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
          {pose: 'chin_rest', atFrame: 0, reaction: 'question'},
          {at: 'apple', pose: 'excited', reaction: 'exclamation'},
          {at: 'fabless', pose: 'open_hand', reaction: 'sparkle'},
        ]}
      />
    </PcbBackground>
  );
};
