import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';
import {useHit, useSince} from './clock';
import {ChipHUD} from './ChipHUD';
import {
  PcbBackground,
  RealNewsPosterCard,
  SecureChipSvg,
  TactileStamp,
  TikTokCommentCard,
  ZineCard,
} from './ChipKit';

/* ============================================================================
   S1: HOOK — POSTER BERITA ASLI PERURI & SKEPTISISME NETIZEN (Editorial Cream)
   Zero Dead Space: 3 Structured Tiers filling Y: 168 to Y: 1720 (1550px)
   ============================================================================ */
export const S1NetizenHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

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
        metricTag="DOKUMEN RESMI"
      />

      <div
        style={{
          position: 'absolute',
          top: 168,
          left: 56,
          right: 56,
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Massive Real News Poster Card (Height ~640px) */}
        <RealNewsPosterCard
          imageSrc={staticFile('news_assets/peruri_chip_merah_putih_official.jpg')}
          portalName="ANTARA NEWS"
          headline="PERURI dan ITB Luncurkan Prototipe Chip Merah Putih untuk e-Paspor"
          captionText="Dokumentasi resmi: ANTARA / HO-PERURI"
          badgeText="KSTI 2026 SURABAYA"
          enter={hRame}
          rotate={-0.4}
        />

        {/* TIER 2: Viral TikTok Skepticism Stream (Height ~440px) */}
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
              rotate={-0.6}
            />
          </div>
        )}

        {/* TIER 3: The Reality Slam & Strategic Dossier (Height ~380px) */}
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 4}}>
          {hAslinya > 0.02 ? (
            <>
              <TactileStamp
                text="NGGAK SEBERCANDA ITU!"
                subText="BUKAN REBRAND STIKER · PROYEK RISET RESMI"
                color={chipTokens.crimson}
                enter={hAslinya}
                tilt={-2.5}
                fontSize={42}
              />
              <ZineCard
                bg={chipTokens.gold}
                enter={hAslinya}
                rotate={0.4}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  border: `4px solid ${chipTokens.ink}`,
                  boxShadow: `8px 8px 0px ${chipTokens.ink}`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div>
                    <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: chipTokens.ink}}>
                      STATUS RESMI KONSORSIUM NASIONAL
                    </div>
                    <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: chipTokens.ink, marginTop: 2}}>
                      Riset Mandiri: PERURI × STEI ITB
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '8px 18px',
                      backgroundColor: chipTokens.ink,
                      color: chipTokens.white,
                      borderRadius: 10,
                      fontFamily: FONT.mono,
                      fontSize: 16,
                      fontWeight: 900,
                    }}
                  >
                    TERVERIFIKASI
                  </div>
                </div>
              </ZineCard>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: `2px dashed ${chipTokens.ink}`,
                textAlign: 'center',
                fontFamily: FONT.mono,
                fontSize: 18,
                fontWeight: 700,
                color: chipTokens.slateMuted,
              }}
            >
              [Verifikasi fakta dokumentasi resmi peluncuran KSTI 2026]
            </div>
          )}
        </div>
      </div>
    </PcbBackground>
  );
};

/* ============================================================================
   S2: EKSPEKTASI VS REALITA — SNAPDRAGON VS E-PASPOR (Dark Cyber Maroon)
   Zero Dead Space: 2 Massive Hardware Workbenches (Height ~1550px)
   ============================================================================ */
export const S2SnapdragonVsPaspor: React.FC = () => {
  const frame = useCurrentFrame();

  const hSnap = useHit('snapdragon');
  const hGame = useHit('game');
  const hBukan = useHit('bukan');
  const hMikro = useHit('mikrokontroler');
  const hNegara = useHit('negara');

  // Motion graphics variables
  const fanSpin1 = (frame * 28) % 360;
  const fanSpin2 = (frame * -36) % 360;
  const nfcWave = (frame % 36) / 36;
  const heatPulse = 0.8 + 0.2 * Math.sin(frame * 0.3);

  const sBukan = useSince('bukan');
  const shakeX = sBukan >= 0 && sBukan < 10 ? Math.sin(sBukan * 2.8) * (12 - sBukan) * 2 : 0;

  return (
    <PcbBackground
      bgColor="#140C18"
      traceColor="rgba(225, 29, 72, 0.18)"
      dotColor="rgba(255, 255, 255, 0.1)"
    >
      <ChipHUD
        index="02/06"
        label="EKSPEKTASI VS REALITA"
        stepIndex={1}
        dark={true}
        metricTag="SECURE IC // 130NM"
      />

      <div
        style={{
          position: 'absolute',
          top: 168,
          left: 56,
          right: 56,
          transform: `translateX(${shakeX}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* ==================================================================
            TIER 1: EXPECTATION — OVERHEATED GAMING SOC (Height ~660px)
            ================================================================== */}
        <ZineCard
          bg={hBukan > 0.1 ? '#271729' : '#1E1B2E'}
          enter={Math.max(0.4, hSnap)}
          rotate={hBukan > 0.1 ? -1.2 : 0}
          borderColor={hBukan > 0.1 ? chipTokens.crimson : chipTokens.gold}
          shadowColor={hBukan > 0.1 ? chipTokens.crimson : '#000000'}
          style={{
            opacity: hBukan > 0.1 ? 0.65 : 1,
            position: 'relative',
            padding: '24px 28px',
          }}
        >
          {/* Header Identifier */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 18,
                fontWeight: 900,
                color: chipTokens.gold,
                backgroundColor: 'rgba(251, 191, 36, 0.15)',
                padding: '4px 14px',
                borderRadius: 8,
                border: `2px solid ${chipTokens.gold}`,
              }}
            >
              ANGGAPAN PUBLIK // MITOS GAMING
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                color: hGame > 0.1 ? chipTokens.crimson : '#94A3B8',
              }}
            >
              STATUS: {hGame > 0.1 ? '98.6°C OVERHEAT' : 'STABLE'}
            </span>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24}}>
            {/* Dual Fan High-Speed Cooling Cooler Graphic */}
            <svg width="180" height="180" viewBox="0 0 180 180" style={{flexShrink: 0}}>
              <rect x="10" y="10" width="160" height="160" rx="24" fill="#0F172A" stroke={chipTokens.gold} strokeWidth="4.5" />
              <rect x="20" y="20" width="140" height="140" rx="16" fill="#1E293B" />

              {/* Fan 1 */}
              <g transform={`translate(60, 90) rotate(${fanSpin1})`}>
                <circle cx="0" cy="0" r="32" fill="none" stroke={chipTokens.crimson} strokeWidth="3" opacity={heatPulse} />
                <path d="M0,-26 C12,-16 12,-6 0,0 C-12,6 -12,16 0,26" fill={chipTokens.crimson} />
                <path d="M-26,0 C-16,-12 -6,-12 0,0 C6,12 16,12 26,0" fill={chipTokens.gold} />
              </g>

              {/* Fan 2 */}
              <g transform={`translate(120, 90) rotate(${fanSpin2})`}>
                <circle cx="0" cy="0" r="32" fill="none" stroke={chipTokens.crimson} strokeWidth="3" opacity={heatPulse} />
                <path d="M0,-26 C12,-16 12,-6 0,0 C-12,6 -12,16 0,26" fill={chipTokens.crimson} />
                <path d="M-26,0 C-16,-12 -6,-12 0,0 C6,12 16,12 26,0" fill={chipTokens.gold} />
              </g>

              <circle cx="60" cy="90" r="8" fill={chipTokens.white} />
              <circle cx="120" cy="90" r="8" fill={chipTokens.white} />
            </svg>

            {/* Spec readout */}
            <div style={{flex: 1}}>
              <div style={{fontFamily: FONT.space, fontSize: 44, fontWeight: 900, color: chipTokens.white, lineHeight: 1.1}}>
                Chipset Snapdragon
              </div>
              <div style={{fontFamily: FONT.mono, fontSize: 18, color: chipTokens.gold, marginTop: 6}}>
                3nm Octa-Core Flagship Architecture
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 18px',
                  borderRadius: 10,
                  backgroundColor: hGame > 0.1 ? chipTokens.crimson : '#334155',
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 900,
                  color: chipTokens.white,
                  boxShadow: `4px 4px 0px ${chipTokens.ink}`,
                }}
              >
                <span>🎮</span> MAEN GAME 120 FPS RATA KANAN
              </div>
            </div>
          </div>

          {/* Stamp Slamming over Snapdragon */}
          {hBukan > 0.02 && (
            <div
              style={{
                position: 'absolute',
                right: 28,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <TactileStamp
                text="BUKAN, BRO! ❌"
                subText="SALAH PAHAM TOTAL"
                color={chipTokens.crimson}
                enter={hBukan}
                tilt={-12}
                fontSize={44}
              />
            </div>
          )}
        </ZineCard>

        {/* ==================================================================
            TIER 2: REALITY — SECURE ELEMENT IC & E-PASPOR RI (Height ~780px)
            ================================================================== */}
        {hMikro > 0.02 && (
          <ZineCard
            bg={chipTokens.cream}
            enter={hMikro}
            rotate={0.4}
            borderColor={chipTokens.emerald}
            shadowColor={chipTokens.emerald}
            style={{padding: '26px 28px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  fontWeight: 900,
                  backgroundColor: chipTokens.emerald,
                  color: chipTokens.ink,
                  padding: '6px 18px',
                  borderRadius: 10,
                  border: `3px solid ${chipTokens.ink}`,
                }}
              >
                FAKTA SEBENARNYA
              </span>
              <span style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: chipTokens.ink}}>
                SECURE ELEMENT IC (130nm 32-bit)
              </span>
            </div>

            {/* Hardware Interactive Arena */}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 16, padding: '12px 0'}}>
              <div style={{transform: 'scale(1.08)'}}>
                <SecureChipSvg pulseFrame={frame} size={200} />
              </div>

              {/* NFC Wireless Transmission Pulse */}
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6}}>
                <svg width="84" height="42" viewBox="0 0 84 42">
                  <path d="M6 21 H66" stroke={chipTokens.ink} strokeWidth="6" strokeDasharray="10 8" />
                  <path d="M58 9 L76 21 L58 33" fill="none" stroke={chipTokens.crimson} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 15,
                    fontWeight: 900,
                    color: chipTokens.crimson,
                    backgroundColor: chipTokens.gold,
                    padding: '2px 10px',
                    borderRadius: 6,
                    border: `2px solid ${chipTokens.ink}`,
                  }}
                >
                  NFC FIELD
                </span>
              </div>

              {/* 3D-styled Indonesian e-Passport Booklet */}
              <div style={{position: 'relative'}}>
                <svg width="200" height="256" viewBox="0 0 166 214">
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
                    width="110"
                    height="110"
                    viewBox="0 0 80 80"
                    style={{position: 'absolute', top: -24, right: -24, pointerEvents: 'none'}}
                  >
                    {[0.25, 0.6, 0.95].map((r, i) => {
                      const p = (nfcWave + i * 0.33) % 1;
                      return (
                        <circle
                          key={r}
                          cx="40"
                          cy="40"
                          r={10 + p * 30}
                          fill="none"
                          stroke={chipTokens.emerald}
                          strokeWidth="4.5"
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
                fontSize: 34,
                fontWeight: 900,
                color: chipTokens.ink,
                textAlign: 'center',
              }}
            >
              Chip Mikrokontroler Enkripsi Negara
            </div>

            {/* Bottom Target Tag */}
            <div
              style={{
                marginTop: 16,
                padding: '14px 20px',
                backgroundColor: '#0F172A',
                borderRadius: 14,
                border: `3px solid ${chipTokens.gold}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: chipTokens.gold, fontWeight: 800}}>
                  TUJUAN PRODUKSI
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 24, color: chipTokens.white, fontWeight: 900, marginTop: 2}}>
                  Proteksi Identitas Nasional &amp; e-Paspor WNI
                </div>
              </div>
              <div
                style={{
                  padding: '6px 14px',
                  backgroundColor: chipTokens.emerald,
                  color: chipTokens.ink,
                  borderRadius: 8,
                  fontFamily: FONT.mono,
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                ANTI-TAMPER
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
   Zero Dead Space: 3 Structured Pipeline Tiers (Height ~1550px)
   ============================================================================ */
export const S3FablessTruth: React.FC = () => {
  const frame = useCurrentFrame();

  const hPabrik = useHit('pabriknya');
  const hApple = useHit('apple');
  const hFabless = useHit('fabless');
  const hPeruri = useHit('peruri');
  const hKripto = useHit('kripto');

  const dashOffset = -(frame * 4.5) % 36;
  const pulseWave = 0.5 + 0.5 * Math.sin(frame * 0.25);

  return (
    <PcbBackground
      bgColor={chipTokens.cobalt}
      traceColor="rgba(59, 130, 246, 0.26)"
      dotColor="rgba(147, 197, 253, 0.18)"
    >
      <ChipHUD
        index="03/06"
        label="SISTEM FABLESS"
        stepIndex={2}
        dark={true}
        metricTag="SUPPLY CHAIN GLOBAL"
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
            TIER 1: SKEPTICAL BUBBLE & GLOBAL TECH REALITY (Height ~560px)
            ================================================================== */}
        <div
          style={{
            alignSelf: 'center',
            padding: '14px 34px',
            backgroundColor: '#1E293B',
            border: `4px solid ${chipTokens.white}`,
            borderRadius: 999,
            boxShadow: `8px 8px 0px ${chipTokens.ink}`,
            transform: `scale(${0.9 + 0.1 * Math.max(0.3, hPabrik)})`,
          }}
        >
          <span style={{fontFamily: FONT.space, fontSize: 34, fontWeight: 900, color: chipTokens.gold}}>
            "Pabriknya di mana nih?! Halu!"
          </span>
        </div>

        {/* 3 Semiconductor Giants Card */}
        {hApple > 0.02 && (
          <ZineCard bg={chipTokens.cream} enter={hApple} rotate={-0.6} style={{padding: '24px 26px'}}>
            <div style={{fontFamily: FONT.mono, fontSize: 18, fontWeight: 900, color: chipTokens.crimson, marginBottom: 14}}>
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
                    borderRadius: 18,
                    padding: '16px 10px',
                    textAlign: 'center',
                    border: `3px solid ${chipTokens.ink}`,
                    boxShadow: `5px 5px 0px ${chipTokens.cobaltLight}`,
                  }}
                >
                  <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 900, color: chipTokens.white}}>
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
                padding: '12px 18px',
                backgroundColor: chipTokens.gold,
                border: `3.5px solid ${chipTokens.ink}`,
                borderRadius: 12,
                textAlign: 'center',
                fontFamily: FONT.space,
                fontSize: 28,
                fontWeight: 900,
                color: chipTokens.ink,
              }}
            >
              SEMUANYA 0 PABRIK WAFER SENDIRI!
            </div>
          </ZineCard>
        )}

        {/* ==================================================================
            TIER 2: THE FABLESS SUPPLY CHAIN PIPELINE (Height ~520px)
            ================================================================== */}
        {hFabless > 0.02 && (
          <ZineCard
            bg="#0B1224"
            enter={hFabless}
            rotate={0.5}
            borderColor={chipTokens.gold}
            shadowColor={chipTokens.gold}
            style={{padding: '26px 26px'}}
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
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: chipTokens.white, opacity: 0.95, marginTop: 6}}>
                  {hKripto > 0.1 ? 'Sirkuit + Kripto Enclave' : 'Desain Logika Sirkuit IC'}
                </div>
              </div>

              {/* Data conduit / stream */}
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
                <svg width="78" height="42" viewBox="0 0 78 42" style={{flexShrink: 0}}>
                  <line
                    x1="4"
                    y1="21"
                    x2="60"
                    y2="21"
                    stroke={chipTokens.gold}
                    strokeWidth="6"
                    strokeDasharray="10 8"
                    strokeDashoffset={dashOffset}
                  />
                  <polygon points="56,10 74,21 56,32" fill={chipTokens.gold} />
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
                <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#CBD5E1', marginTop: 6}}>
                  Cetak Silikon Murni
                </div>
              </div>
            </div>
          </ZineCard>
        )}

        {/* ==================================================================
            TIER 3: REAL EVIDENCE CARD — PERURI SANDBOX (Height ~400px)
            ================================================================== */}
        {hKripto > 0.05 && (
          <ZineCard
            bg="#0B1224"
            enter={hKripto}
            rotate={-0.6}
            borderColor={chipTokens.emerald}
            shadowColor={chipTokens.emerald}
            style={{padding: '18px 24px'}}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <Img
                src={staticFile('news_assets/peruri_sandbox_chip_official.jpg')}
                style={{
                  width: 170,
                  height: 110,
                  objectFit: 'cover',
                  borderRadius: 12,
                  border: `3px solid ${chipTokens.emerald}`,
                  flexShrink: 0,
                }}
              />
              <div style={{flex: 1}}>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: chipTokens.emerald, fontWeight: 800}}>
                  BUKTI NYATA EKOSISTEM NASIONAL
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 24, color: chipTokens.white, fontWeight: 900, marginTop: 2}}>
                  Sandbox Desain Chip Merah Putih PERURI
                </div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#94A3B8', marginTop: 6}}>
                  Desain sirkuit &amp; algoritma enkripsi 100% dikendalikan talenta dalam negeri!
                </div>
              </div>
            </div>
          </ZineCard>
        )}
      </div>
    </PcbBackground>
  );
};
