import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadSyne } from '@remotion/google-fonts/Syne';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';

// Font Definitions matching badarxaii's high-contrast pairing
const FONT_DISPLAY = loadSyne('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
}).fontFamily;

const FONT_SERIF = loadPlayfair('italic', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

const FONT_MONO = loadMono('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

const FONT_SANS = loadJakarta('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
}).fontFamily;

export const KINETIC_TOTAL_FRAMES = 600; // 20.0s @ 30 FPS

// Color Palette
const C = {
  bg: '#121411', // Deep Warm Slate
  bgPaper: '#EBE8DF', // Warm Paper
  inkLight: '#F4F2EB', // Cream White
  inkMuted: '#8E9486', // Muted Olive
  inkDark: '#121411', // Dark Ink
  lime: '#D4FF00', // Neon Lime
  limeDark: '#15803D', // Deep Emerald
  forest: '#0A3D26', // Forest Accent
  borderLight: 'rgba(255, 255, 255, 0.08)',
  borderDark: 'rgba(18, 20, 17, 0.12)',
  orange: '#FF4A22', // Vermilion Accent
};

/* ───────── Top Minimalist HUD Header ───────── */
const KineticHUD: React.FC<{
  sceneNum: string;
  leftTag: string;
  rightTag: string;
  timecode: string;
}> = ({ sceneNum, leftTag, rightTag, timecode }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: 56,
        right: 56,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16,
        borderBottom: `1px solid ${C.borderLight}`,
        fontFamily: FONT_MONO,
        fontSize: 12,
        fontWeight: 600,
        color: C.inkMuted,
        letterSpacing: '0.08em',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: C.lime, fontWeight: 700 }}>{sceneNum}</span>
        <span style={{ color: C.inkLight }}>{leftTag}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span>{rightTag}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: C.lime,
              boxShadow: `0 0 8px ${C.lime}`,
            }}
          />
          <span style={{ color: C.lime, fontWeight: 700 }}>{timecode}</span>
        </div>
      </div>
    </div>
  );
};

/* ───────── Diagonal Kinetic Conveyor Ribbons ───────── */
const DiagonalRibbons: React.FC<{ frame: number }> = ({ frame }) => {
  const offset1 = (frame * 3.5) % 800;
  const offset2 = (frame * 2.8) % 800;

  return (
    <div
      style={{
        position: 'absolute',
        top: '35%',
        left: '-20%',
        width: '140%',
        transform: 'rotate(-11deg)',
        pointerEvents: 'none',
        opacity: 0.18,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Ribbon 1: Outlined Text */}
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          transform: `translateX(-${offset1}px)`,
          fontFamily: FONT_DISPLAY,
          fontSize: 68,
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${C.inkLight}`,
          letterSpacing: '0.04em',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ marginRight: 48 }}>
            REKAPITULASI OTOMATIS · REAL-TIME SYNC · MA NU ISLAMIYAH ·
          </span>
        ))}
      </div>

      {/* Ribbon 2: Lime Solid Text */}
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          transform: `translateX(-${800 - offset2}px)`,
          fontFamily: FONT_DISPLAY,
          fontSize: 68,
          fontWeight: 800,
          color: C.lime,
          letterSpacing: '0.04em',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ marginRight: 48 }}>
            EXCEL FULL-SCREEN · CETAK FORMAL A4 · RHMT OFC ·
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────── Fluid SVG Cursor with Click Ring ───────── */
const FluidCursor: React.FC<{
  x: number;
  y: number;
  clicking?: boolean;
}> = ({ x, y, clicking = false }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-3px, -3px) scale(${clicking ? 0.86 : 1})`,
      pointerEvents: 'none',
      zIndex: 100,
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45))',
      transition: 'transform 0.08s ease',
    }}
  >
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 3L11.5 21L14.5 13.5L21.5 10.5L4 3Z"
        fill="#121411"
        stroke="#D4FF00"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
    {clicking && (
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: `2px solid ${C.lime}`,
          backgroundColor: 'rgba(212, 255, 0, 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )}
  </div>
);

/* ───────── SCENE 1: REKAP PRESENSI (Bouncing Ball & Pill Mask) ───────── */
const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bouncing Ball Physics (frame 0 to 60)
  // Bounces on letter R (f:12), E (f:24), K (f:36), A (f:48), P (f:60)
  const ballX = interpolate(frame, [0, 14, 28, 42, 56, 70], [280, 460, 640, 820, 1000, 1180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Parabolic bounce curve
  const phase = (frame % 14) / 14;
  const bounceHeight = Math.sin(phase * Math.PI) * 75;
  const ballY = 460 - (frame < 70 ? bounceHeight : 0);

  // Squash & Stretch at bottom of bounce
  const isSquash = frame < 70 && (phase < 0.15 || phase > 0.85);
  const ballScaleX = isSquash ? 1.35 : 0.85;
  const ballScaleY = isSquash ? 0.7 : 1.25;

  // Staggered letters for "REKAP"
  const letters = ['R', 'E', 'K', 'A', 'P'];

  // Lower Pill container expand spring
  const pillSpring = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 13, stiffness: 110, mass: 0.9 },
  });

  // Rolling counter for live percentage
  const rollRate = interpolate(frame, [60, 110], [0, 94.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <DiagonalRibbons frame={frame} />

      <KineticHUD
        sceneNum="(01)"
        leftTag="RHMT OFC · E-REKAP v1.0"
        rightTag="SHOWREEL / 2026"
        timecode="00:01:24"
      />

      {/* Main Typography Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 20,
          marginTop: -20,
        }}
      >
        {/* Word 1: REKAP with Staggered Entrance */}
        <div style={{ display: 'flex', gap: 6 }}>
          {letters.map((char, i) => {
            const charSpring = spring({
              frame: Math.max(0, frame - i * 4),
              fps,
              config: { damping: 14, stiffness: 140 },
            });
            const yOffset = interpolate(charSpring, [0, 1], [60, 0]);
            return (
              <span
                key={char}
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 165,
                  fontWeight: 800,
                  color: C.inkLight,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  display: 'inline-block',
                  transform: `translateY(${yOffset}px)`,
                  opacity: charSpring,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Bouncing Kinetic Ball (Badar Style) */}
        <div
          style={{
            position: 'absolute',
            left: ballX,
            top: ballY,
            width: 38,
            height: 38,
            borderRadius: 999,
            backgroundColor: C.lime,
            boxShadow: `0 0 24px ${C.lime}, 0 4px 10px rgba(0,0,0,0.4)`,
            transform: `translate(-50%, -50%) scale(${ballScaleX}, ${ballScaleY})`,
            zIndex: 30,
            transition: 'transform 0.05s ease',
          }}
        />

        {/* Word 2: Pill Box "PRESENSI." + Serif Italic "lebih presisi." */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            marginTop: 18,
            transform: `scale(${pillSpring})`,
            opacity: pillSpring,
            transformOrigin: 'left center',
          }}
        >
          {/* Bounding Pill Container */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 34px',
              borderRadius: 999,
              border: `3px solid ${C.lime}`,
              backgroundColor: 'rgba(212, 255, 0, 0.08)',
              boxShadow: `0 0 35px rgba(212, 255, 0, 0.15)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 104,
                fontWeight: 800,
                color: C.inkLight,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              PRESENSI
            </span>
            {/* Blinking Square Cursor */}
            <span
              style={{
                display: 'inline-block',
                width: 22,
                height: 22,
                backgroundColor: C.orange,
                marginLeft: 14,
                borderRadius: 4,
                opacity: frame % 20 < 12 ? 1 : 0,
              }}
            />
          </div>

          {/* High-Contrast Serif Italic Accent */}
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 64,
              fontStyle: 'italic',
              fontWeight: 600,
              color: C.lime,
              letterSpacing: '-0.01em',
            }}
          >
            lebih presisi.
          </span>
        </div>

        {/* Rolling Stat Metric Pill */}
        <div
          style={{
            marginTop: 36,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '8px 24px',
            borderRadius: 999,
            backgroundColor: '#1E221C',
            border: `1px solid ${C.borderLight}`,
            fontFamily: FONT_MONO,
            fontSize: 14,
            fontWeight: 700,
            color: C.inkLight,
            boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: C.lime,
              boxShadow: `0 0 8px ${C.lime}`,
            }}
          />
          <span style={{ color: C.inkMuted }}>KEHADIRAN REAL-TIME:</span>
          <span style={{ color: C.lime, fontSize: 18, fontWeight: 800 }}>
            {rollRate.toFixed(1)}%
          </span>
          <span style={{ color: '#4ADE80', fontSize: 12 }}>↑ AKTIF</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── SCENE 2: 36 SISWA (Spreadsheet Morph & Fluid Cursor) ───────── */
const Scene2Spreadsheet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 1 },
  });

  // Fluid cursor trajectory (smooth curved path with overshoot)
  const cursorProgress = interpolate(frame, [15, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorX = interpolate(cursorProgress, [0, 0.45, 1], [1180, 840, 720]);
  const cursorY = interpolate(cursorProgress, [0, 0.45, 1], [720, 560, 485]);
  const isClicking = frame >= 64 && frame <= 74;

  const tableRows = [
    { no: '01', nama: 'Ahmad Fauzi', h: 'H', s: 'H', i: 'H', total: '100%' },
    { no: '02', nama: 'Beni Setiawan', h: 'H', s: 'S', i: 'H', total: '96.2%' },
    { no: '03', nama: 'Citra Dewi', h: 'H', s: 'H', i: 'H', total: '98.5%' },
    { no: '04', nama: 'Dian Pratama', h: 'H', s: 'H', i: 'I', total: '94.0%' },
    { no: '05', nama: 'Eka Lestari', h: 'H', s: 'H', i: 'H', total: '100%' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <KineticHUD
        sceneNum="(02)"
        leftTag="DATA SPREADSHEET"
        rightTag="INPUT → REKAP → AUDIT"
        timecode="00:06:18"
      />

      <div
        style={{
          width: 1480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
          zIndex: 20,
          transform: `scale(${enterSpring})`,
          opacity: enterSpring,
        }}
      >
        {/* Left Typographic Column */}
        <div style={{ flex: '0 0 520px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 48,
              fontStyle: 'italic',
              color: C.lime,
              lineHeight: 1.1,
            }}
          >
            Satu klik, pantau
          </span>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 28px',
              borderRadius: 20,
              backgroundColor: C.lime,
              color: C.inkDark,
              width: 'fit-content',
              boxShadow: `0 16px 36px rgba(212, 255, 0, 0.25)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              36 SISWA.
            </span>
          </div>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              color: C.inkMuted,
              lineHeight: 1.6,
              margin: '8px 0 0 0',
            }}
          >
            Mode spreadsheet Excel layar penuh. Freeze header kolom nama siswa,
            audit catatan kehadiran tanpa hambatan horizontal scroll.
          </p>

          {/* Checklist Feature Chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {['Freeze Kolom No & Nama Siswa', 'Otomatis Rekap H / S / I / A', 'Sinkronisasi SQLite Instan'].map(
              (feat) => (
                <div
                  key={feat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.inkLight,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      backgroundColor: 'rgba(212, 255, 0, 0.15)',
                      color: C.lime,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                    }}
                  >
                    ✓
                  </span>
                  {feat}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right 3D Isometric Spreadsheet Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 40px 90px -20px rgba(0, 0, 0, 0.75)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Table Header Bar */}
          <div
            style={{
              height: 48,
              backgroundColor: '#F4F2EB',
              borderBottom: '1.5px solid rgba(18, 20, 17, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              fontFamily: FONT_MONO,
              fontSize: 11,
              fontWeight: 800,
              color: C.inkDark,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: '#10B981',
                }}
              />
              SPREADSHEET LIVE · KELAS XI-IPA 1
            </div>
            <div
              style={{
                backgroundColor: '#EAF6EE',
                color: '#0A3D26',
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: 10,
              }}
            >
              36 SISWA AKTIF
            </div>
          </div>

          {/* Spreadsheet Rows */}
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Column Titles */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 210px repeat(3, 1fr) 90px',
                padding: '8px 12px',
                backgroundColor: '#EAF6EE',
                borderRadius: 8,
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: '#0A3D26',
              }}
            >
              <span>NO</span>
              <span>NAMA SISWA</span>
              <span style={{ textAlign: 'center' }}>SEN</span>
              <span style={{ textAlign: 'center' }}>SEL</span>
              <span style={{ textAlign: 'center' }}>RAB</span>
              <span style={{ textAlign: 'right' }}>% REKAP</span>
            </div>

            {tableRows.map((r, idx) => {
              const isTargetRow = idx === 0;
              return (
                <div
                  key={r.no}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 210px repeat(3, 1fr) 90px',
                    padding: '10px 12px',
                    borderRadius: 8,
                    borderBottom: '1px solid rgba(18, 20, 17, 0.06)',
                    backgroundColor: isTargetRow && isClicking ? 'rgba(212, 255, 0, 0.18)' : '#FFFFFF',
                    fontFamily: FONT_SANS,
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.inkDark,
                    alignItems: 'center',
                    transition: 'background-color 0.12s ease',
                  }}
                >
                  <span style={{ fontFamily: FONT_MONO, color: C.inkMuted }}>{r.no}</span>
                  <span style={{ color: '#0A3D26', fontWeight: 800 }}>{r.nama}</span>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: 6,
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {r.h}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: 6,
                        backgroundColor: r.s === 'S' ? '#FEF3C7' : '#DCFCE7',
                        color: r.s === 'S' ? '#B45309' : '#15803D',
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {r.s}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span
                      style={{
                        padding: '2px 10px',
                        borderRadius: 6,
                        backgroundColor: r.i === 'I' ? '#E0F2FE' : '#DCFCE7',
                        color: r.i === 'I' ? '#0369A1' : '#15803D',
                        fontFamily: FONT_MONO,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {r.i}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontWeight: 900,
                      textAlign: 'right',
                      color: '#0A3D26',
                    }}
                  >
                    {r.total}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Tooltip on Click */}
          {frame >= 68 && (
            <div
              style={{
                position: 'absolute',
                top: 90,
                left: 310,
                backgroundColor: '#121411',
                color: C.lime,
                padding: '6px 14px',
                borderRadius: 8,
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 700,
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                border: `1px solid ${C.lime}`,
                animation: 'pop 0.2s ease',
              }}
            >
              ✓ 100% Hadir Terverifikasi
            </div>
          )}

          {/* Fluid Cursor */}
          <FluidCursor x={cursorX} y={cursorY} clicking={isClicking} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── SCENE 3: SIAP CETAK (Paper Drop & Heavy Stamp Slam) ───────── */
const Scene3FormalPrint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const paperSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 85, mass: 1 },
  });

  // Slam Stamp with heavy impact & camera shake
  const stampSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 10, stiffness: 160, mass: 0.7 },
  });

  // Screen shake decay after stamp lands at frame 35
  const shake = frame >= 35 && frame <= 46 ? Math.sin((frame - 35) * 3) * 6 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: `translateY(${shake}px)`,
      }}
    >
      <KineticHUD
        sceneNum="(03)"
        leftTag="DOKUMEN RESMI MADRASAH"
        rightTag="KEMENTERIAN AGAMA RI"
        timecode="00:11:05"
      />

      <div
        style={{
          width: 1480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
          zIndex: 20,
        }}
      >
        {/* Left Column: Bold Statement */}
        <div style={{ flex: '0 0 540px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 50,
              fontStyle: 'italic',
              color: C.lime,
              lineHeight: 1.1,
            }}
          >
            Standar administrasi resmi
          </span>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 32px',
              borderRadius: 999,
              border: `3px solid ${C.lime}`,
              backgroundColor: 'rgba(212, 255, 0, 0.08)',
              width: 'fit-content',
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 82,
                fontWeight: 900,
                color: C.inkLight,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              SIAP CETAK.
            </span>
          </div>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: 16,
              color: C.inkMuted,
              lineHeight: 1.6,
              margin: '8px 0 0 0',
            }}
          >
            Format A4 Landscape ber-Kop Madrasah resmi Kementerian Agama.
            Dilengkapi stempel verifikasi sah dan opsi ekspor XLSX satu ketukan.
          </p>

          {/* Action Export Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <div
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                backgroundColor: C.inkLight,
                color: C.inkDark,
                fontFamily: FONT_MONO,
                fontSize: 12,
                fontWeight: 800,
                boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
              }}
            >
              ⎙ CETAK A4 LANDSCAPE
            </div>

            <div
              style={{
                padding: '12px 24px',
                borderRadius: 999,
                backgroundColor: C.lime,
                color: C.inkDark,
                fontFamily: FONT_MONO,
                fontSize: 12,
                fontWeight: 800,
                boxShadow: '0 12px 24px rgba(212, 255, 0, 0.25)',
              }}
            >
              ⤓ EKSPOR XLSX
            </div>
          </div>
        </div>

        {/* Right Column: Physical A4 Paper Sheet Preview */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: '28px 36px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 45px 100px -20px rgba(0,0,0,0.85)',
            transform: `scale(${paperSpring})`,
            opacity: paperSpring,
            position: 'relative',
          }}
        >
          {/* Official Kop Madrasah */}
          <div
            style={{
              borderBottom: '2.5px double #0A3D26',
              paddingBottom: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Img
                src={staticFile('assets/erekap/icon-erekap.png')}
                style={{ width: 44, height: 44, objectFit: 'contain' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 13,
                    fontWeight: 900,
                    color: '#0A3D26',
                    letterSpacing: '0.04em',
                  }}
                >
                  KEMENTERIAN AGAMA REPUBLIK INDONESIA
                </div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#072919',
                  }}
                >
                  MA NU ISLAMIYAH ASEMBAGUS
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    color: '#526058',
                    marginTop: 2,
                  }}
                >
                  Laporan Rekapitulasi Presensi Kehadiran Siswa · Tahun Ajaran 2026/2027
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 10,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 6,
                border: '1.5px solid #0A3D26',
                color: '#0A3D26',
              }}
            >
              A4 LANDSCAPE
            </div>
          </div>

          {/* Table Preview Minimalist */}
          <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 180px repeat(5, 1fr) 70px',
                backgroundColor: '#EAF6EE',
                padding: '6px 10px',
                borderRadius: 6,
                fontFamily: FONT_MONO,
                fontSize: 10,
                fontWeight: 800,
                color: '#0A3D26',
              }}
            >
              <span>NO</span>
              <span>NAMA SISWA</span>
              <span>SEN</span>
              <span>SEL</span>
              <span>RAB</span>
              <span>KAM</span>
              <span>JUM</span>
              <span style={{ textAlign: 'right' }}>% HADIR</span>
            </div>

            {[
              { no: '01', nama: 'Ahmad Fauzi', h: '100%' },
              { no: '02', nama: 'Beni Setiawan', h: '96.2%' },
              { no: '03', nama: 'Citra Dewi', h: '98.5%' },
            ].map((row, idx) => (
              <div
                key={row.no}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 180px repeat(5, 1fr) 70px',
                  padding: '6px 10px',
                  borderBottom: '1px solid rgba(10, 61, 38, 0.08)',
                  fontFamily: FONT_SANS,
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#0B1410',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FBF9',
                }}
              >
                <span style={{ fontFamily: FONT_MONO, color: '#526058' }}>{row.no}</span>
                <span style={{ fontWeight: 700 }}>{row.nama}</span>
                <span style={{ color: '#15803D' }}>H</span>
                <span style={{ color: '#15803D' }}>H</span>
                <span style={{ color: '#15803D' }}>H</span>
                <span style={{ color: '#15803D' }}>H</span>
                <span style={{ color: '#15803D' }}>H</span>
                <span style={{ fontFamily: FONT_MONO, fontWeight: 800, textAlign: 'right', color: '#0A3D26' }}>
                  {row.h}
                </span>
              </div>
            ))}
          </div>

          {/* Signature & Heavy Stamp Slam */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(10, 61, 38, 0.1)',
              paddingTop: 12,
            }}
          >
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: '#526058' }}>
              Terverifikasi digital E-Rekap v1.0
            </div>

            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: '#526058' }}>
                Kepala Madrasah
              </div>
              <div style={{ height: 36 }} />
              <div style={{ fontFamily: FONT_SANS, fontSize: 12, fontWeight: 800, color: '#0A3D26' }}>
                ( Kepala MA NU Islamiyah )
              </div>

              {/* Stamped Slam Seal */}
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: -44,
                  width: 95,
                  height: 95,
                  borderRadius: 999,
                  border: '3px solid #0A3D26',
                  color: '#0A3D26',
                  fontFamily: FONT_MONO,
                  fontSize: 9,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transform: `scale(${stampSpring}) rotate(-13deg)`,
                  backgroundColor: 'rgba(212, 255, 0, 0.22)',
                  opacity: 0.92,
                }}
              >
                SAH &<br />VERIFIED
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── SCENE 4: BENTO CLIMAX (Badar's Frame 26 Sync & rhmt ofc Outro) ───────── */
const Scene4BentoOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bentoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <KineticHUD
        sceneNum="(04)"
        leftTag="ARSITEKTUR & CRAFTSMANSHIP"
        rightTag="NEXT.JS 16 · TURBOPACK · SQLITE"
        timecode="00:16:20"
      />

      {/* Bento Grid 3 Kolom ala Frame 26 Badar! */}
      <div
        style={{
          width: 1540,
          display: 'grid',
          gridTemplateColumns: '380px 1fr 480px',
          gap: 24,
          zIndex: 20,
          transform: `scale(${bentoSpring})`,
          opacity: bentoSpring,
        }}
      >
        {/* Kolom 1: Neon Pill Card & Prompt Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Card Lime Bold */}
          <div
            style={{
              backgroundColor: C.lime,
              borderRadius: 24,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 230,
              boxShadow: '0 20px 45px rgba(212, 255, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.inkDark,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  padding: '3px 10px',
                  borderRadius: 999,
                }}
              >
                v1.0.0 PRODUCTION
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: C.inkDark }}>
                2026
              </span>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 46,
                  fontWeight: 900,
                  color: C.inkDark,
                  margin: 0,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                E-REKAP.
              </h2>
              <p
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: C.inkDark,
                  margin: '8px 0 0 0',
                }}
              >
                Intelligence Presensi Sekolah
              </p>
            </div>
          </div>

          {/* Card Terminal Chat Prompt Input */}
          <div
            style={{
              backgroundColor: '#181A16',
              borderRadius: 24,
              padding: '24px',
              border: `1.5px solid ${C.borderLight}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 230,
            }}
          >
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: C.inkMuted }}>
              SYSTEM PROMPT · SPECIFICATION
            </div>

            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 14,
                color: C.inkLight,
                lineHeight: 1.5,
              }}
            >
              "Bangun sistem absensi multi-kelas modern, mode Excel spreadsheet, dan cetak A4 Kop Madrasah|"
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.lime }}>
                STATUS: READY TO DEPLOY
              </span>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  backgroundColor: C.lime,
                  color: C.inkDark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                ↑
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2: Live Code Component View (Syntax Highlight) */}
        <div
          style={{
            backgroundColor: '#151713',
            borderRadius: 24,
            border: `1.5px solid ${C.borderLight}`,
            padding: '28px 32px',
            fontFamily: FONT_MONO,
            fontSize: 13,
            lineHeight: 1.8,
            boxShadow: '0 28px 60px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: C.inkMuted, marginBottom: 8 }}>
            // src/app/dashboard/rekap.tsx
          </div>
          <div>
            <span style={{ color: '#F43F5E' }}>export default function </span>
            <span style={{ color: '#38BDF8' }}>ERekapSystem</span>() &#123;
          </div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: '#F43F5E' }}>return </span>(
          </div>
          <div style={{ paddingLeft: 40 }}>
            &lt;<span style={{ color: C.lime, fontWeight: 700 }}>AttendanceEngine</span>
          </div>
          <div style={{ paddingLeft: 60 }}>
            <span style={{ color: '#FBBF24' }}>institution</span>=
            <span style={{ color: '#A7F3D0' }}>"MA NU Islamiyah"</span>
          </div>
          <div
            style={{
              paddingLeft: 60,
              backgroundColor: 'rgba(212, 255, 0, 0.1)',
              borderLeft: `3px solid ${C.lime}`,
            }}
          >
            <span style={{ color: '#FBBF24' }}>realtimeRate</span>=
            <span style={{ color: '#A7F3D0' }}>"94.7%"</span>
          </div>
          <div style={{ paddingLeft: 60 }}>
            <span style={{ color: '#FBBF24' }}>spreadsheetMode</span>=
            <span style={{ color: '#A7F3D0' }}>"Excel-Full"</span>
          </div>
          <div style={{ paddingLeft: 60 }}>
            <span style={{ color: '#FBBF24' }}>printFormat</span>=
            <span style={{ color: '#A7F3D0' }}>"A4-Landscape"</span>
          </div>
          <div style={{ paddingLeft: 60 }}>
            <span style={{ color: '#FBBF24' }}>engineeredBy</span>=
            <span style={{ color: C.lime, fontWeight: 800 }}>"rhmt ofc"</span>
          </div>
          <div style={{ paddingLeft: 40 }}>/&gt;</div>
          <div style={{ paddingLeft: 20 }}>);</div>
          <div>&#125;</div>
        </div>

        {/* Kolom 3: rhmt ofc Identity & Portfolio Card */}
        <div
          style={{
            backgroundColor: '#1E221C',
            borderRadius: 24,
            border: `2px solid rgba(212, 255, 0, 0.35)`,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
          }}
        >
          {/* Avatar & Title */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 999,
                  padding: 3,
                  background: `linear-gradient(135deg, ${C.lime} 0%, #0A3D26 100%)`,
                }}
              >
                <Img
                  src={staticFile('assets/erekap/pp-dev.webp')}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 999,
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: C.lime, fontWeight: 700 }}>
                  SYSTEMS ARCHITECT & DEV
                </div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 900, color: C.inkLight }}>
                  Rohmatulloh
                </div>
              </div>
            </div>

            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 54,
                fontWeight: 900,
                color: C.inkLight,
                margin: '0 0 6px 0',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              rhmt ofc.
            </h2>

            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 18,
                fontStyle: 'italic',
                color: C.lime,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Crafted with high engineering precision for modern schools.
            </p>
          </div>

          {/* Links & CTA Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: C.inkMuted }}>
              rhmt.biz.id · rhmt.biz.id/xiiclass
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                backgroundColor: C.lime,
                color: C.inkDark,
                padding: '14px',
                borderRadius: 999,
                fontFamily: FONT_DISPLAY,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: '0.04em',
                boxShadow: `0 12px 28px rgba(212, 255, 0, 0.35)`,
              }}
            >
              <span>BUKA DASHBOARD E-REKAP →</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── MAIN COMPOSITION ───────── */
export const ERekapKineticTypography: React.FC = () => {
  const frame = useCurrentFrame();

  // Synchronized SFX Cue Points
  const SFX = [
    { frame: 12, sound: 'pop-soft' },
    { frame: 24, sound: 'pop-soft' },
    { frame: 36, sound: 'pop-soft' },
    { frame: 48, sound: 'pop-soft' },
    { frame: 60, sound: 'lock-click' },
    { frame: 150, sound: 'whoosh-wipe' },
    { frame: 214, sound: 'tick' },
    { frame: 300, sound: 'whoosh-soft' },
    { frame: 335, sound: 'stamp' },
    { frame: 450, sound: 'whoosh-wipe' },
    { frame: 480, sound: 'success-arp' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: 'hidden' }}>
      {/* Upbeat Modern Electronic BGM */}
      <Audio
        src={staticFile('audio/chip-music-bed.mp3')}
        volume={(f) =>
          interpolate(f, [0, 20, 570, 600], [0, 0.55, 0.55, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* Synchronized SFX */}
      {SFX.map((cue, idx) => (
        <Sequence key={idx} from={cue.sound === 'stamp' ? cue.frame - 200 : cue.frame} durationInFrames={30}>
          <Audio
            src={staticFile(`audio/sfx-erekap/${cue.sound}.wav`)}
            volume={0.65}
          />
        </Sequence>
      ))}

      {/* 4 Kinetic Scenes (150 frames / 5.0s each) */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={150} durationInFrames={150}>
        <Scene2Spreadsheet />
      </Sequence>

      <Sequence from={300} durationInFrames={150}>
        <Scene3FormalPrint />
      </Sequence>

      <Sequence from={450} durationInFrames={150}>
        <Scene4BentoOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
