import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {FONT} from '../lib/theme';

/* ============================================================================
   REUSABLE TACTILE NEBRUTALIST ATOMS (Zero Dead Space Building Blocks)
   ============================================================================ */

/** Neobrutalist Tactile Stamp yang menghantam dengan spring & rotasi */
export const TactileStamp: React.FC<{
  text: string;
  bg?: string;
  textColor?: string;
  borderColor?: string;
  tilt?: number;
  scale?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  bg = '#dc2626',
  textColor = '#ffffff',
  borderColor = '#ffffff',
  tilt = -5,
  scale = 1,
  style = {},
}) => {
  if (scale <= 0.02) return null;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bg,
        color: textColor,
        border: `5px solid ${borderColor}`,
        borderRadius: 18,
        padding: '14px 28px',
        fontFamily: FONT.space,
        fontWeight: 900,
        fontSize: 32,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        transform: `scale(${scale}) rotate(${tilt}deg)`,
        transformOrigin: 'center center',
        boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.75)',
        zIndex: 50,
        userSelect: 'none',
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/* ============================================================================
   SCENE 1: HOOK (Dark Tactical Mode — Giant Hero Photo + Dual Dossier + Stamp)
   ============================================================================ */
export const P1HookCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isPlatypus = t >= 4.25;
  const isSparepart = t >= 6.8;

  // Spring animation for stamp
  const stampSpring = spring({
    frame: Math.max(0, frame - Math.round(6.8 * fps)),
    fps,
    config: {damping: 11, stiffness: 210, mass: 0.7},
  });

  // Reticle scanner translation
  const scanX = interpolate(Math.sin(t * 1.6), [-1, 1], [180, 780]);
  const scanY = interpolate(Math.cos(t * 1.3), [-1, 1], [140, 440]);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={6} />

      <BendaHook
        mode="dark"
        lead={isPlatypus ? 'Binatang paling janggal sedunia:' : 'Bukan buaya atau komodo...'}
        anchorText={isPlatypus ? 'PLATYPUS' : 'HEWAN PALING JANGGAL'}
        accent={isPlatypus ? '#38bdf8' : '#f59e0b'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop={isSparepart ? '404 SPEC' : '01 / 06'}
        counterSub={isSparepart ? 'sisa sparepart' : 'anomali alam'}
        nodes={[
          {label: 'HOOK', active: true},
          {label: 'SPAREPART'},
          {label: 'TELUR'},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700, Height 1270px) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Massive Hero Specimen Frame (Width 968, Height 570) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 570,
            borderRadius: 26,
            overflow: 'hidden',
            backgroundColor: '#0c1220',
            border: '4px solid #38bdf8',
            boxShadow: '10px 10px 0px #0284c7',
          }}
        >
          <Img
            src={staticFile('assets/platypus/platypus-swim.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${1.0 + (t * 0.012)})`,
            }}
          />

          {/* Top Identifier Ribbon */}
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: 20,
              padding: '8px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(11, 15, 25, 0.92)',
              border: '2px solid #38bdf8',
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 16,
              color: '#38bdf8',
              letterSpacing: '0.06em',
            }}
          >
            ORNITHORHYNCHUS ANATINUS · AUSTRALIA TIMUR
          </div>

          {/* Biometric Laser Reticle */}
          <svg
            width={968}
            height={570}
            viewBox="0 0 968 570"
            style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
          >
            <g transform={`translate(${scanX}, ${scanY})`}>
              <circle cx="0" cy="0" r="54" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="10 6" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#facc15" strokeWidth="2.5" />
              <line x1="-75" y1="0" x2="-26" y2="0" stroke="#38bdf8" strokeWidth="3" />
              <line x1="26" y1="0" x2="75" y2="0" stroke="#38bdf8" strokeWidth="3" />
              <line x1="0" y1="-75" x2="0" y2="-26" stroke="#38bdf8" strokeWidth="3" />
              <line x1="0" y1="26" x2="0" y2="75" stroke="#38bdf8" strokeWidth="3" />
            </g>
          </svg>

          {/* 3 Callout Target Badges */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 14,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '2px solid #facc15',
                textAlign: 'center',
              }}
            >
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#facc15', fontWeight: 800}}>ORGAN #1</div>
              <div style={{fontFamily: FONT.space, fontSize: 17, color: '#f8fafc', fontWeight: 800}}>Paruh Sensor Elektrik</div>
            </div>
            <div
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 14,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '2px solid #38bdf8',
                textAlign: 'center',
              }}
            >
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#38bdf8', fontWeight: 800}}>ORGAN #2</div>
              <div style={{fontFamily: FONT.space, fontSize: 17, color: '#f8fafc', fontWeight: 800}}>Bulu Kedap Air Dingin</div>
            </div>
            <div
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 14,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '2px solid #4ade80',
                textAlign: 'center',
              }}
            >
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#4ade80', fontWeight: 800}}>ORGAN #3</div>
              <div style={{fontFamily: FONT.space, fontSize: 17, color: '#f8fafc', fontWeight: 800}}>Ekor Dayung Pipih</div>
            </div>
          </div>
        </div>

        {/* TIER 2: Dual Tactical Dossier Cards (Height 175) */}
        <div style={{display: 'flex', gap: 20, width: 968}}>
          {/* Card A: Taksonomi */}
          <div
            style={{
              flex: 1,
              padding: '22px 28px',
              borderRadius: 22,
              backgroundColor: '#0f172a',
              border: '3.5px solid #22c55e',
              boxShadow: '8px 8px 0px #14532d',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontSize: 14, color: '#4ade80', fontWeight: 800, letterSpacing: '0.08em'}}>
                STATUS TAKSONOMI
              </span>
              <span style={{padding: '3px 10px', borderRadius: 999, backgroundColor: '#22c55e', color: '#0f172a', fontFamily: FONT.mono, fontSize: 13, fontWeight: 900}}>
                OFFICIAL
              </span>
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 900, color: '#f8fafc', marginTop: 8}}>
              100% MAMALIA
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 18, color: '#94a3b8', marginTop: 4, fontWeight: 600}}>
              Berdarah panas &amp; menyusui anak secara biologis
            </div>
          </div>

          {/* Card B: Anomali Alam */}
          <div
            style={{
              flex: 1,
              padding: '22px 28px',
              borderRadius: 22,
              backgroundColor: '#1e1b4b',
              border: '3.5px solid #f59e0b',
              boxShadow: '8px 8px 0px #78350f',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontSize: 14, color: '#fbbf24', fontWeight: 800, letterSpacing: '0.08em'}}>
                INDEX ANOMALI
              </span>
              <span style={{padding: '3px 10px', borderRadius: 999, backgroundColor: '#f59e0b', color: '#1e1b4b', fontFamily: FONT.mono, fontSize: 13, fontWeight: 900}}>
                WARNING
              </span>
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 32, fontWeight: 900, color: '#fef08a', marginTop: 8}}>
              LEVEL MAKSIMAL
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 18, color: '#cbd5e1', marginTop: 4, fontWeight: 600}}>
              Kombinasi organ donor mamalia, unggas &amp; amfibi
            </div>
          </div>
        </div>

        {/* TIER 3: Absurdity Impact Slab & Slamming Stamp (Height 440) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 440,
            borderRadius: 24,
            backgroundColor: '#131126',
            border: '4px solid #818cf8',
            boxShadow: '10px 10px 0px #312e81',
            padding: '32px 36px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          {/* Header & Anomaly Meter */}
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#a5b4fc'}}>
                DIAGNOSA MORFOLOGI ALAM
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: '#f87171'}}>
                ANOMALY CODE: ERR_HYBRID_404
              </span>
            </div>

            {/* Overload Meter */}
            <div style={{marginTop: 18}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 16, color: '#e0e7ff', marginBottom: 8}}>
                <span>Tingkat Kelogisan Biologi:</span>
                <span style={{color: '#f43f5e', fontWeight: 900}}>OVERFLOW (0%)</span>
              </div>
              <div style={{width: '100%', height: 20, borderRadius: 999, backgroundColor: '#1e1b4b', border: '2px solid #6366f1', overflow: 'hidden'}}>
                <div
                  style={{
                    width: `${Math.min(100, t * 14)}%`,
                    height: '100%',
                    backgroundColor: '#ef4444',
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>
            </div>

            <div style={{marginTop: 24, fontFamily: FONT.sans, fontSize: 26, fontWeight: 700, color: '#f8fafc', lineHeight: 1.4}}>
              "Dibikin pakai sisaan sparepart binatang lain yang gak kepake!"
            </div>
          </div>

          {/* Stamp Slam */}
          {isSparepart && (
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 12}}>
              <TactileStamp
                text="⚠️ 404 SPEC: SISA SPAREPART GAK KEPAKE!"
                bg="#dc2626"
                textColor="#ffffff"
                borderColor="#ffffff"
                tilt={-3}
                scale={stampSpring}
                style={{fontSize: 28, padding: '16px 32px'}}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: SPAREPART & UJI 1799 (Light Warm Mode — 3 Organ Cards & 1799 Audit)
   ============================================================================ */
export const P2SparepartCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isPhaseB = t >= 9.5;
  const isPull = t >= 15.5;
  const isAsli = t >= 17.5;

  const asliSpring = spring({
    frame: Math.max(0, frame - Math.round(17.5 * fps)),
    fps,
    config: {damping: 10, stiffness: 220, mass: 0.7},
  });

  // Elastic pull on beak in phase B
  const tugX = isPull && t < 18.2
    ? Math.sin(((t - 15.5) / 1.5) * Math.PI * 4) * 24
    : 0;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={6} />

      <BendaHook
        mode="light"
        lead={
          isAsli
            ? 'Pas ditarik paruhnya, ternyata:'
            : isPhaseB
              ? 'Ilmuwan 1799 mengira ini:'
              : 'Kombinasi 3 donor hewan:'
        }
        anchorText={isAsli ? '100% ASLI ALAMI!' : isPhaseB ? 'BONEKA ANAK SD?' : '3 SPAREPART CAMPURAN'}
        accent={isAsli ? '#16a34a' : isPhaseB ? '#9333ea' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop={isPhaseB ? '1799' : '3-IN-1'}
        counterSub={isPhaseB ? 'arsip ilmiah' : 'donor organ'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', active: true},
          {label: 'TELUR'},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {!isPhaseB ? (
          /* ==============================================================
             FASE A: 3 DONOR ORGAN CARDS + MATHEMATICAL EQUATION SLAB
             ============================================================== */
          <>
            {/* Top: 3 Organ Cards Side by Side (Height 620) */}
            <div style={{display: 'flex', gap: 16, width: 968, height: 620}}>
              {/* Organ 1: Paruh Bebek */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 24,
                  backgroundColor: '#ffffff',
                  border: '4px solid #14102b',
                  boxShadow: '8px 8px 0px #d97706',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{height: 420, width: '100%', overflow: 'hidden', backgroundColor: '#fef3c7'}}>
                  <Img
                    src={staticFile('assets/platypus/duck-bill.jpg')}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <div style={{padding: '18px 16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#b45309', fontWeight: 800}}>DONOR #1</div>
                  <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: '#14102b', marginTop: 2}}>
                    MONCONG BEBEK
                  </div>
                  <div style={{fontFamily: FONT.sans, fontSize: 15, color: '#64748b', fontWeight: 600, marginTop: 4}}>
                    Paruh karet pipih elektrosensori
                  </div>
                </div>
              </div>

              {/* Organ 2: Ekor Berang-berang */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 24,
                  backgroundColor: '#ffffff',
                  border: '4px solid #14102b',
                  boxShadow: '8px 8px 0px #0284c7',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{height: 420, width: '100%', overflow: 'hidden', backgroundColor: '#e0f2fe'}}>
                  <Img
                    src={staticFile('assets/platypus/beaver.jpg')}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <div style={{padding: '18px 16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#0369a1', fontWeight: 800}}>DONOR #2</div>
                  <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: '#14102b', marginTop: 2}}>
                    EKOR BERANG
                  </div>
                  <div style={{fontFamily: FONT.sans, fontSize: 15, color: '#64748b', fontWeight: 600, marginTop: 4}}>
                    Dayung renang &amp; kantong lemak
                  </div>
                </div>
              </div>

              {/* Organ 3: Kaki Katak */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 24,
                  backgroundColor: '#ffffff',
                  border: '4px solid #14102b',
                  boxShadow: '8px 8px 0px #16a34a',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{height: 420, width: '100%', overflow: 'hidden', backgroundColor: '#dcfce7'}}>
                  <Img
                    src={staticFile('assets/platypus/frog.jpg')}
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <div style={{padding: '18px 16px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#15803d', fontWeight: 800}}>DONOR #3</div>
                  <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: '#14102b', marginTop: 2}}>
                    KAKI KATAK
                  </div>
                  <div style={{fontFamily: FONT.sans, fontSize: 15, color: '#64748b', fontWeight: 600, marginTop: 4}}>
                    Selaput renang amfibi fleksibel
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Mathematical Fusion Equation Card (Height 600) */}
            <div
              style={{
                width: 968,
                height: 600,
                borderRadius: 26,
                backgroundColor: '#ffffff',
                border: '4px solid #14102b',
                boxShadow: '10px 10px 0px #14102b',
                padding: '36px 40px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#0284c7'}}>
                    RUMUS GABUNGAN ANATOMI
                  </span>
                  <span style={{padding: '4px 14px', borderRadius: 999, backgroundColor: '#fef3c7', color: '#b45309', fontFamily: FONT.mono, fontWeight: 800, fontSize: 16}}>
                    3 HEWAN DALAM 1 TUBUH
                  </span>
                </div>

                {/* Equation Row */}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: 32}}>
                  <div style={{padding: '16px 20px', borderRadius: 16, backgroundColor: '#fef3c7', border: '3px solid #14102b', textAlign: 'center'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 900, color: '#14102b'}}>PARUH BEBEK</span>
                  </div>
                  <span style={{fontFamily: FONT.space, fontSize: 36, fontWeight: 900, color: '#0284c7'}}>+</span>
                  <div style={{padding: '16px 20px', borderRadius: 16, backgroundColor: '#e0f2fe', border: '3px solid #14102b', textAlign: 'center'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 900, color: '#14102b'}}>EKOR BERANG</span>
                  </div>
                  <span style={{fontFamily: FONT.space, fontSize: 36, fontWeight: 900, color: '#0284c7'}}>+</span>
                  <div style={{padding: '16px 20px', borderRadius: 16, backgroundColor: '#dcfce7', border: '3px solid #14102b', textAlign: 'center'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 900, color: '#14102b'}}>KAKI KATAK</span>
                  </div>
                </div>

                <div style={{marginTop: 36, textAlign: 'center'}}>
                  <div style={{fontFamily: FONT.mono, fontSize: 16, color: '#64748b', fontWeight: 800}}>HASIL AKHIR ALAM LIAR:</div>
                  <div style={{fontFamily: FONT.space, fontSize: 44, fontWeight: 900, color: '#0f172a', marginTop: 8}}>
                    = PLATYPUS!
                  </div>
                </div>
              </div>

              {/* Tag Footer */}
              <div
                style={{
                  padding: '18px 24px',
                  borderRadius: 16,
                  backgroundColor: '#f1f5f9',
                  border: '2px dashed #94a3b8',
                  textAlign: 'center',
                  fontFamily: FONT.sans,
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#334155',
                }}
              >
                "Mamalia berbulu yang meminjam cetak biru anatomi 3 spesies lain."
              </div>
            </div>
          </>
        ) : (
          /* ==============================================================
             FASE B: HISTORIC 1799 ARSIP + FORENSIK JAHITAN BONEKA
             ============================================================== */
          <>
            {/* Top: 1799 Naturalist Document Frame (Height 580) */}
            <div
              style={{
                position: 'relative',
                width: 968,
                height: 580,
                borderRadius: 26,
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '4px solid #14102b',
                boxShadow: '10px 10px 0px #9333ea',
                transform: `translateX(${tugX}px)`,
              }}
            >
              <Img
                src={staticFile('assets/platypus/platypus-1799.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.03)',
                }}
              />

              {/* Document Header Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 20,
                  padding: '8px 18px',
                  borderRadius: 999,
                  backgroundColor: '#ffffff',
                  border: '2.5px solid #14102b',
                  fontFamily: FONT.mono,
                  fontWeight: 900,
                  fontSize: 16,
                  color: '#9333ea',
                  boxShadow: '4px 4px 0px #14102b',
                }}
              >
                GEORGE SHAW (1799) · NATURALIST'S MISCELLANY
              </div>

              {/* Beak Pull Scissors Indicator */}
              {isPull && (
                <div
                  style={{
                    position: 'absolute',
                    top: '36%',
                    right: 60,
                    padding: '14px 26px',
                    borderRadius: 18,
                    backgroundColor: '#dc2626',
                    border: '3px solid #14102b',
                    boxShadow: '6px 6px 0px #14102b',
                    color: '#ffffff',
                    fontFamily: FONT.space,
                    fontWeight: 900,
                    fontSize: 22,
                  }}
                >
                  ✂️ UJI TARIKAN PARUH DENGAN GUNTING
                </div>
              )}
            </div>

            {/* Bottom: Forensic Audit Report Slab (Height 640) */}
            <div
              style={{
                width: 968,
                height: 640,
                borderRadius: 26,
                backgroundColor: '#fef2f2',
                border: '4px solid #14102b',
                boxShadow: '10px 10px 0px #14102b',
                padding: '36px 40px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#dc2626'}}>
                    AUDIT FORENSIK LABORATORIUM 1799
                  </span>
                  <span style={{padding: '4px 14px', borderRadius: 999, backgroundColor: '#dc2626', color: '#ffffff', fontFamily: FONT.mono, fontWeight: 900, fontSize: 16}}>
                    BRITISH MUSEUM INSPECTION
                  </span>
                </div>

                {/* 3 Inspection Checklists */}
                <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18}}>
                  <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#ffffff', border: '2.5px solid #14102b', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 800, color: '#14102b'}}>
                      1. Uji Bekas Jahitan Benang Paruh
                    </span>
                    <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#16a34a'}}>
                      [ 0 BEKAS BENANG ]
                    </span>
                  </div>

                  <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#ffffff', border: '2.5px solid #14102b', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 800, color: '#14102b'}}>
                      2. Struktur Sambungan Tulang Tengkorak
                    </span>
                    <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#16a34a'}}>
                      [ ASLI TERSAMBUNG ]
                    </span>
                  </div>

                  <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#ffffff', border: '2.5px solid #14102b', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span style={{fontFamily: FONT.space, fontSize: 22, fontWeight: 800, color: '#14102b'}}>
                      3. Hipotesis Prank / Boneka Anak SD
                    </span>
                    <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#dc2626'}}>
                      [ DIBANTAH OLEH SAINS ]
                    </span>
                  </div>
                </div>
              </div>

              {/* Giant Stamp Slam */}
              {isAsli && (
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 8}}>
                  <TactileStamp
                    text="100% ASLI! BUKAN BONEKA MAINAN!"
                    bg="#22c55e"
                    textColor="#ffffff"
                    borderColor="#14102b"
                    tilt={-4}
                    scale={asliSpring}
                    style={{fontSize: 32, padding: '18px 36px'}}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: BERTELUR & SUSU KERINGAT (Dark Bio Mode — Arena + Belly Gland Simulator)
   ============================================================================ */
export const P3TelurKeringatCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isNippleAbsurd = t >= 6.5;
  const isSweatGland = t >= 12.0;
  const isHumor = t >= 19.0;

  const humorSpring = spring({
    frame: Math.max(0, frame - Math.round(19.0 * fps)),
    fps,
    config: {damping: 12, stiffness: 200, mass: 0.8},
  });

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={6} />

      <BendaHook
        mode="dark"
        lead={isSweatGland ? 'Susunya gak keluar lewat puting, tapi:' : 'Mamalia lain melahirkan, dia:'}
        anchorText={isSweatGland ? 'PORI KERINGAT PERUT!' : 'BERTELUR (OVIPAR)?!'}
        accent={isSweatGland ? '#38bdf8' : '#facc15'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#facc15"
        counterTop={isSweatGland ? 'SUSU PERUT' : 'OVIPAR'}
        counterSub={isSweatGland ? 'pori keringat' : 'mamalia bertelur'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', active: true},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Ovipar vs Vivipar Battle Arena (Height 580) */}
        <div
          style={{
            width: 968,
            height: 580,
            borderRadius: 26,
            backgroundColor: '#0f172a',
            border: '4px solid #38bdf8',
            boxShadow: '10px 10px 0px #0284c7',
            padding: '28px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#38bdf8'}}>
              KOMPARASI METODE REPRODUKSI
            </span>
            <span style={{padding: '4px 14px', borderRadius: 999, backgroundColor: '#facc15', color: '#0f172a', fontFamily: FONT.mono, fontWeight: 900, fontSize: 16}}>
              MONOTREMATA RARITY
            </span>
          </div>

          {/* Center Arena Content */}
          <div style={{display: 'flex', gap: 24, alignItems: 'center', marginTop: 12}}>
            {/* Left: Specimen Egg Image */}
            <div
              style={{
                width: 380,
                height: 380,
                borderRadius: 20,
                overflow: 'hidden',
                border: '3px solid #facc15',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
              }}
            >
              <Img
                src={staticFile('assets/platypus/platypus-egg.jpg')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>

            {/* Right: Comparative Boxes */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{padding: '18px 22px', borderRadius: 18, backgroundColor: '#1e293b', border: '2px solid #475569'}}>
                <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#94a3b8', fontWeight: 800}}>99.9% MAMALIA LAIN</div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: '#f8fafc', marginTop: 4}}>
                  MELAHIRKAN (VIVIPAR)
                </div>
              </div>

              <div style={{padding: '18px 22px', borderRadius: 18, backgroundColor: 'rgba(250, 204, 21, 0.12)', border: '3px solid #facc15'}}>
                <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#facc15', fontWeight: 800}}>PLATYPUS (ORDO MONOTREMATA)</div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: '#fef08a', marginTop: 4}}>
                  BERTELUR (OVIPAR)! 🥚
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div style={{fontFamily: FONT.sans, fontSize: 20, color: '#94a3b8', fontWeight: 600, textAlign: 'center'}}>
            Hanya ada 2 mamalia bertelur di bumi: <strong style={{color: '#facc15'}}>Platypus</strong> &amp; <strong style={{color: '#38bdf8'}}>Echidna</strong>.
          </div>
        </div>

        {/* TIER 2: Belly Milk Gland Simulator (Height 400) */}
        <div
          style={{
            width: 968,
            height: 400,
            borderRadius: 24,
            backgroundColor: '#0c1322',
            border: '4px solid #38bdf8',
            boxShadow: '10px 10px 0px #0284c7',
            padding: '24px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#38bdf8'}}>
              SIMULASI PORI KELENJAR SUSU PERUT
            </span>
            <span style={{padding: '4px 14px', borderRadius: 999, backgroundColor: '#ef4444', color: '#ffffff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 15}}>
              GAK PUNYA PUTING SUSU
            </span>
          </div>

          {/* 4 Animated Milk Pores with dripping droplets */}
          <div style={{display: 'flex', justifyContent: 'space-around', margin: '14px 0'}}>
            {[1, 2, 3, 4].map((idx) => {
              const dropY = (frame * 3.5 + idx * 30) % 75;
              return (
                <div key={idx} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(56, 189, 248, 0.25)',
                      border: '2.5px dashed #38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{fontFamily: FONT.mono, fontSize: 13, color: '#38bdf8', fontWeight: 900}}>PORI {idx}</span>
                  </div>

                  {/* Drop Track */}
                  <div style={{height: 75, position: 'relative', width: 14}}>
                    <div
                      style={{
                        position: 'absolute',
                        top: dropY,
                        width: 14,
                        height: 22,
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 16px #38bdf8',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{textAlign: 'center', fontFamily: FONT.space, fontSize: 22, fontWeight: 800, color: '#f8fafc'}}>
            Susu keluar lewat pori-pori kulit perut seperti keringat!
          </div>
        </div>

        {/* TIER 3: Humor Pop-up Dialogue (Always Visible, transforms at t >= 19s) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 230,
            borderRadius: 22,
            backgroundColor: isHumor ? '#ffe4e6' : '#1e293b',
            border: isHumor ? '4px solid #14102b' : '3.5px solid #38bdf8',
            boxShadow: isHumor ? '8px 8px 0px #14102b' : '8px 8px 0px #0284c7',
            padding: '24px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: isHumor ? `scale(${0.96 + 0.04 * humorSpring}) rotate(-1.5deg)` : 'none',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isHumor ? (
            <>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#e11d48', fontWeight: 900}}>
                  ANALOGI PADA MANUSIA:
                </div>
                <div style={{fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: '#14102b', marginTop: 4}}>
                  "Dek, haus ya? Sini jilat keringat Mama..."
                </div>
              </div>

              <TactileStamp
                text="STRES DARI BAYI! 👶🤯"
                bg="#e11d48"
                textColor="#ffffff"
                borderColor="#14102b"
                tilt={4}
                scale={1}
                style={{fontSize: 22, padding: '12px 24px'}}
              />
            </>
          ) : (
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#38bdf8', fontWeight: 800}}>
                  FAKTA ANATOMI KELENJAR MAMAE:
                </div>
                <div style={{fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: '#f8fafc', marginTop: 4}}>
                  Anak Platypus menjilati susu yang menetes di alur bulu perut induknya.
                </div>
              </div>
              <div style={{padding: '8px 18px', borderRadius: 999, backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1.5px solid #38bdf8', color: '#38bdf8', fontFamily: FONT.mono, fontSize: 14, fontWeight: 800}}>
                ALUR BULU PERUT
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 4: GAK PUNYA LAMBUNG & CHAT GERD (Light Mode — Blueprint + WhatsApp)
   ============================================================================ */
export const P4TanpaLambungCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isBubble1 = t >= 12.0;
  const isBubble2 = t >= 15.5;
  const isRejectStamp = t >= 17.5;

  const rejectSpring = spring({
    frame: Math.max(0, frame - Math.round(17.5 * fps)),
    fps,
    config: {damping: 10, stiffness: 220, mass: 0.7},
  });

  // Food progress flowing through tract
  const foodProgress = (frame * 7) % 320;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={6} />

      <BendaHook
        mode="light"
        lead={isBubble1 ? 'Gak bakal bisa alasan kerja:' : 'Sistem pencernaan paling simpel:'}
        anchorText={isBubble1 ? 'GERD SAYA KAMBUH?!' : 'GAK PUNYA LAMBUNG'}
        accent={isBubble1 ? '#dc2626' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop="ZERO GERD"
        counterSub="langsung usus"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', active: true},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Anatomical Digestive Tube Blueprint (Height 580) */}
        <div
          style={{
            width: 968,
            height: 580,
            borderRadius: 26,
            backgroundColor: '#ffffff',
            border: '4px solid #14102b',
            boxShadow: '10px 10px 0px #0284c7',
            padding: '32px 36px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#0284c7'}}>
              SKEMA DIGESTIF ORNITHORHYNCHUS
            </span>
            <span style={{padding: '5px 16px', borderRadius: 999, backgroundColor: '#fee2e2', color: '#dc2626', fontFamily: FONT.mono, fontWeight: 900, fontSize: 16}}>
              404: STOMACH NOT FOUND
            </span>
          </div>

          {/* Animated Pipeline Graphic */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '24px 0'}}>
            <div style={{padding: '18px 24px', borderRadius: 18, backgroundColor: '#f1f5f9', border: '3px solid #14102b', textAlign: 'center'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#64748b', fontWeight: 800}}>INPUT</div>
              <div style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 24, color: '#0f172a'}}>TENGGOROKAN</div>
            </div>

            {/* Pipe 1 */}
            <div style={{width: 110, height: 20, backgroundColor: '#e2e8f0', borderRadius: 999, position: 'relative', overflow: 'hidden', border: '2px solid #cbd5e1'}}>
              <div
                style={{
                  position: 'absolute',
                  left: foodProgress % 110,
                  width: 28,
                  height: '100%',
                  borderRadius: 999,
                  backgroundColor: '#0284c7',
                }}
              />
            </div>

            {/* Deleted Stomach Box */}
            <div style={{padding: '18px 24px', borderRadius: 18, backgroundColor: '#fef2f2', border: '3px dashed #ef4444', textAlign: 'center'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#ef4444', fontWeight: 800}}>KOSONG (404)</div>
              <div style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 24, color: '#dc2626', textDecoration: 'line-through'}}>LAMBUNG</div>
            </div>

            {/* Pipe 2 */}
            <div style={{width: 110, height: 20, backgroundColor: '#e2e8f0', borderRadius: 999, position: 'relative', overflow: 'hidden', border: '2px solid #cbd5e1'}}>
              <div
                style={{
                  position: 'absolute',
                  left: foodProgress % 110,
                  width: 28,
                  height: '100%',
                  borderRadius: 999,
                  backgroundColor: '#16a34a',
                }}
              />
            </div>

            <div style={{padding: '18px 24px', borderRadius: 18, backgroundColor: '#f0fdf4', border: '3px solid #16a34a', textAlign: 'center'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#16a34a', fontWeight: 800}}>PENYERAPAN</div>
              <div style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 24, color: '#15803d'}}>LANGSUNG USUS</div>
            </div>
          </div>

          <div
            style={{
              padding: '18px 24px',
              borderRadius: 16,
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
              fontFamily: FONT.sans,
              fontSize: 22,
              fontWeight: 700,
              color: '#334155',
            }}
          >
            Makanan langsung meluncur dari tenggorokan ke usus tanpa kantong asam lambung.
          </div>
        </div>

        {/* TIER 2: Smartphone WhatsApp Mockup Chat (Height 660) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 660,
            borderRadius: 26,
            backgroundColor: '#efeae2',
            border: '4px solid #14102b',
            boxShadow: '10px 10px 0px #14102b',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* WhatsApp Header Bar */}
          <div
            style={{
              height: 74,
              backgroundColor: '#075e54',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                backgroundColor: '#25d366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: FONT.space,
                fontSize: 22,
              }}
            >
              P
            </div>
            <div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 22, color: '#ffffff'}}>
                Platypus Jr. (Karyawan)
              </div>
              <div style={{fontFamily: FONT.sans, fontSize: 14, color: '#dcf8c6', fontWeight: 600}}>Online</div>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{flex: 1, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 20}}>
            {/* Pre-chat Notification Banner if bubbles not yet loaded */}
            {!isBubble1 && (
              <div
                style={{
                  alignSelf: 'center',
                  marginTop: 40,
                  padding: '16px 28px',
                  borderRadius: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  border: '2px dashed #94a3b8',
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#075e54', fontWeight: 800}}>
                  STATUS KARYAWAN PLATYPUS
                </div>
                <div style={{fontFamily: FONT.sans, fontSize: 22, fontWeight: 700, color: '#1e293b', marginTop: 4}}>
                  Sedang mengetik pengajuan izin sakit...
                </div>
              </div>
            )}

            {/* Bubble 1: Incoming from Platypus */}
            {isBubble1 && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: 620,
                  padding: '16px 22px',
                  borderRadius: 18,
                  backgroundColor: '#ffffff',
                  border: '2px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{fontFamily: FONT.sans, fontSize: 22, color: '#1e293b', fontWeight: 600, lineHeight: 1.4}}>
                  "Pagi Bos, mohon maaf hari ini saya izin gak masuk kantor... Asam lambung (GERD) saya lagi kambuh parah banget (mohon izin)"
                </div>
                <div style={{textAlign: 'right', fontFamily: FONT.mono, fontSize: 13, color: '#94a3b8', marginTop: 6}}>
                  08:45 WIB
                </div>
              </div>
            )}

            {/* Bubble 2: Outgoing from Boss */}
            {isBubble2 && (
              <div
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: 620,
                  padding: '16px 22px',
                  borderRadius: 18,
                  backgroundColor: '#dcf8c6',
                  border: '2px solid #86efac',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{fontFamily: FONT.sans, fontSize: 22, color: '#064e3b', fontWeight: 700, lineHeight: 1.4}}>
                  "Ente Platypus kan? Lambung aja lu kagak punya dari lahir! Gak usah bikin-bikin alasan, MASUK SEKARANG JUGA!"
                </div>
                <div style={{textAlign: 'right', fontFamily: FONT.mono, fontSize: 13, color: '#15803d', marginTop: 6}}>
                  08:46 WIB · ✓✓
                </div>
              </div>
            )}
          </div>

          {/* Stamp Slam: Cuti Ditolak */}
          {isRejectStamp && (
            <div style={{position: 'absolute', bottom: 30, right: 40}}>
              <TactileStamp
                text="CUTI DITOLAK: 100% BOHONG!"
                bg="#dc2626"
                textColor="#ffffff"
                borderColor="#14102b"
                tilt={-5}
                scale={rejectSpring}
                style={{fontSize: 28, padding: '16px 32px'}}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: MUKA LUCU TAJI BERACUN (Dark Hazard Mode — Macro Spur + Weapon Dossier)
   ============================================================================ */
export const P5TajiBeracunCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isDossierAlert = t >= 3.8;
  const isTrapStamp = t >= 10.5;

  const trapSpring = spring({
    frame: Math.max(0, frame - Math.round(10.5 * fps)),
    fps,
    config: {damping: 10, stiffness: 220, mass: 0.7},
  });

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={6} />

      <BendaHook
        mode="dark"
        lead="Muka lucu kayak kartun bebek, tapi:"
        anchorText="TAJI BERACUN DI TUMIT!"
        accent="#ef4444"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#ef4444"
        counterTop="TOXIC"
        counterSub="peptida defensin"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', active: true},
          {label: 'SEBLAK'},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Macro Spur Photo with Hazard Reticle (Height 580) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 580,
            borderRadius: 26,
            overflow: 'hidden',
            backgroundColor: '#1c0a0d',
            border: '4px solid #ef4444',
            boxShadow: '10px 10px 0px #7f1d1d',
          }}
        >
          <Img
            src={staticFile('assets/platypus/platypus-spur-crisp.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${1.0 + (t * 0.01)})`,
            }}
          />

          {/* Warning Banner Header */}
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: 20,
              padding: '8px 20px',
              borderRadius: 999,
              backgroundColor: 'rgba(239, 68, 68, 0.95)',
              border: '2px solid #ffffff',
              color: '#ffffff',
              fontFamily: FONT.mono,
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '0.08em',
            }}
          >
            ⚠️ BIOHAZARD: CALCANEAL SPUR (TAJI TUMIT PEJANTAN)
          </div>

          {/* Hazard Reticle Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              padding: '14px 22px',
              borderRadius: 16,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid #ef4444',
              color: '#f87171',
              fontFamily: FONT.mono,
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            LOKASI: KAKI BELAKANG PEJANTAN
          </div>
        </div>

        {/* TIER 2: Military/Toxic Chemical Weapon Dossier (Height 660) */}
        <div
          style={{
            position: 'relative',
            width: 968,
            height: 660,
            borderRadius: 26,
            backgroundColor: '#1a0c10',
            border: '4px solid #ef4444',
            boxShadow: '10px 10px 0px #000000',
            padding: '36px 40px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#f87171'}}>
                DOSSIER RACUN BIO-KIMIA
              </span>
              <span style={{padding: '5px 16px', borderRadius: 999, backgroundColor: '#ef4444', color: '#ffffff', fontFamily: FONT.mono, fontWeight: 900, fontSize: 16}}>
                DEFENSIN-LIKE PEPTIDES (DLP)
              </span>
            </div>

            {/* Pain Scale Meter */}
            <div style={{marginTop: 28}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 17, color: '#fca5a5', marginBottom: 10}}>
                <span>SKALA RASA SAKIT:</span>
                <span style={{color: '#f87171', fontWeight: 900}}>10 / 10 (KEBAL MORFIN!)</span>
              </div>
              <div style={{width: '100%', height: 26, borderRadius: 999, backgroundColor: '#450a0a', border: '2.5px solid #ef4444', overflow: 'hidden'}}>
                <div style={{width: '100%', height: '100%', backgroundColor: '#dc2626'}} />
              </div>
            </div>

            {/* Threat Matrix Rows */}
            <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
              <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#2a1117', border: '2px solid #ef4444', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: FONT.space, fontSize: 20, fontWeight: 800, color: '#ffffff'}}>
                  Dampak ke Manusia:
                </span>
                <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 900, color: '#fca5a5'}}>
                  NYERI EKSTREM BERBULAN-BULAN
                </span>
              </div>

              <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#2a1117', border: '2px solid #ef4444', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: FONT.space, fontSize: 20, fontWeight: 800, color: '#ffffff'}}>
                  Dampak ke Anjing/Hewan Kecil:
                </span>
                <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 900, color: '#f87171'}}>
                  MEMATIKAN (LETHAL DOSE)
                </span>
              </div>

              <div style={{padding: '16px 22px', borderRadius: 16, backgroundColor: '#2a1117', border: '2px solid #f97316', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: FONT.space, fontSize: 20, fontWeight: 800, color: '#ffffff'}}>
                  Penawar / Antidot Resmi:
                </span>
                <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 900, color: '#fdba74'}}>
                  BELUM ADA (HANYA BLOK SARAF)
                </span>
              </div>
            </div>
          </div>

          {/* Stamp Slam */}
          {isTrapStamp && (
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10}}>
              <TactileStamp
                text="⚠️ MUKA LUCU BEBEK, SENJATA MEMATIKAN!"
                bg="#f97316"
                textColor="#ffffff"
                borderColor="#14102b"
                tilt={-3}
                scale={trapSpring}
                style={{fontSize: 26, padding: '16px 32px'}}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 6: OUTRO SEBLAK & KARTU KREATOR (Creator Mode — Australia vs Seblak + rhmt ofc)
   ============================================================================ */
export const P6OutroSeblakCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isSeblak = t >= 5.5;
  const isCta = t >= 10.0;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={6} total={6} />

      <BendaHook
        mode="dark"
        lead={isSeblak ? 'Aman... Kecuali ketemu dia lagi:' : 'Tenang, habitat aslinya cuma di:'}
        anchorText={isSeblak ? 'JAJAN SEBLAK PENGKOLAN?!' : 'BENUA AUSTRALIA'}
        accent={isSeblak ? '#f97316' : '#38bdf8'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop="SEBLAK"
        counterSub="outro final"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', done: true},
          {label: 'SEBLAK', active: true},
        ]}
      />

      {/* ================================================================
          MAIN STAGE (Y: 430 - 1700) — ZERO DEAD SPACE
          ================================================================ */}
      <div
        style={{
          position: 'absolute',
          top: 430,
          left: 56,
          width: 968,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* TIER 1: Australia vs Seblak Comic Clash (Height 580) */}
        <div
          style={{
            width: 968,
            height: 580,
            borderRadius: 26,
            backgroundColor: '#0f172a',
            border: '4px solid #38bdf8',
            boxShadow: '10px 10px 0px #0284c7',
            padding: '28px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 18, color: '#38bdf8'}}>
              PETA DISTRIBUSI HABITAT
            </span>
            <span style={{padding: '5px 16px', borderRadius: 999, backgroundColor: '#f97316', color: '#ffffff', fontFamily: FONT.mono, fontWeight: 900, fontSize: 16}}>
              100% ENDEMIK AUSTRALIA
            </span>
          </div>

          {/* Split Habitat vs Seblak Visual */}
          <div style={{display: 'flex', gap: 20, alignItems: 'center', margin: '14px 0'}}>
            {/* Left: Australia Habitat Photo Frame */}
            <div
              style={{
                flex: 1,
                height: 340,
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: '#1e293b',
                border: '3px solid #38bdf8',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                position: 'relative',
              }}
            >
              <Img
                src={staticFile('assets/platypus/platypus-river.png')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  padding: '6px 14px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(11, 15, 25, 0.9)',
                  border: '1.5px solid #38bdf8',
                  color: '#38bdf8',
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                SUNGAI AUSTRALIA TIMUR
              </div>
            </div>

            {/* Right: Seblak Photo */}
            <div
              style={{
                flex: 1,
                height: 340,
                borderRadius: 20,
                overflow: 'hidden',
                border: '3px solid #f97316',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                position: 'relative',
              }}
            >
              <Img
                src={staticFile('assets/platypus/seblak.jpg')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                  padding: '6px 14px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(11, 15, 25, 0.9)',
                  border: '1.5px solid #f97316',
                  color: '#f97316',
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                SEBLAK PEDAS PENGKOLAN
              </div>
            </div>
          </div>

          <div style={{textAlign: 'center', fontFamily: FONT.space, fontSize: 24, fontWeight: 800, color: '#fde047'}}>
            Aman dari Platypus... Kecuali lu apes ketemu dia lagi jajan seblak! 🍜
          </div>
        </div>

        {/* TIER 2: Official Developer Creator Card (Height 660) */}
        <div
          style={{
            width: 968,
            height: 660,
            borderRadius: 28,
            backgroundColor: '#0f172a',
            border: '4px solid #38bdf8',
            boxShadow: '12px 12px 0px #0284c7',
            padding: '36px 44px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Creator Profile Header */}
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '3px solid #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(56, 189, 248, 0.35)',
              }}
            >
              <Img src={staticFile('assets/portfolio/rhmt-mark.svg')} style={{width: 60, height: 60}} />
            </div>

            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <span style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 44, color: '#f8fafc'}}>
                  rhmt ofc
                </span>
                <span style={{padding: '4px 12px', borderRadius: 999, backgroundColor: '#0284c7', color: '#ffffff', fontFamily: FONT.mono, fontSize: 14, fontWeight: 900}}>
                  VERIFIED
                </span>
              </div>
              <div style={{fontFamily: FONT.sans, fontSize: 22, color: '#38bdf8', fontWeight: 700, marginTop: 4}}>
                Software Engineer &amp; Creative Tech Developer
              </div>
            </div>
          </div>

          {/* Links & Ecosystem */}
          <div style={{display: 'flex', gap: 18}}>
            <div style={{flex: 1, padding: '18px 22px', borderRadius: 18, backgroundColor: '#1e293b', border: '2.5px solid #334155'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#94a3b8', fontWeight: 800}}>PORTFOLIO RESMI</div>
              <div style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: '#38bdf8', marginTop: 4}}>
                rhmt.biz.id
              </div>
            </div>
            <div style={{flex: 1, padding: '18px 22px', borderRadius: 18, backgroundColor: '#1e293b', border: '2.5px solid #334155'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#94a3b8', fontWeight: 800}}>GITHUB PROFILE</div>
              <div style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: '#4ade80', marginTop: 4}}>
                github.com/rhmt-ofc
              </div>
            </div>
          </div>

          {/* Technology Badges */}
          <div style={{display: 'flex', gap: 12, justifyContent: 'center'}}>
            {['REMOTION 1080x1920', 'GOOGLE AI STUDIO', 'FULL-STAGE CRAFT'].map((badge) => (
              <span
                key={badge}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1.5px solid #38bdf8',
                  color: '#e0f2fe',
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              padding: '18px 24px',
              borderRadius: 18,
              backgroundColor: '#0284c7',
              textAlign: 'center',
              fontFamily: FONT.space,
              fontSize: 24,
              fontWeight: 900,
              color: '#ffffff',
              boxShadow: '0 10px 28px rgba(2, 132, 199, 0.45)',
            }}
          >
            Fakta Absurd Teknologi &amp; Alam Lainnya — Follow @rhmt ofc
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
