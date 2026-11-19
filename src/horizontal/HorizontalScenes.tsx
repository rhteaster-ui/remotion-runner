import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadSyne } from '@remotion/google-fonts/Syne';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadMono } from '@remotion/google-fonts/JetBrainsMono';
import { loadFont as loadJakarta } from '@remotion/google-fonts/PlusJakartaSans';

// Typography Definitions matching High-Contrast Pairing
export const FONT_DISPLAY = loadSyne('normal', {
  weights: ['700', '800'],
  subsets: ['latin'],
}).fontFamily;

export const FONT_SERIF = loadPlayfair('italic', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

export const FONT_MONO = loadMono('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
}).fontFamily;

export const FONT_SANS = loadJakarta('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
}).fontFamily;

// Color Palette
export const HC = {
  bg: '#04140D',
  surfaceDark: '#072919',
  surfaceCard: '#0B3A23',
  inkLight: '#F4F8F5',
  inkMuted: '#8BA698',
  lime: '#A3E635',
  limeBright: '#D4FF00',
  limeHover: '#BEF264',
  border: 'rgba(163, 230, 53, 0.28)',
  borderStrong: 'rgba(163, 230, 53, 0.45)',
  orange: '#FF4A22',
};

/* ───────── Sleek Architectural Laptop Mockup ───────── */
export const UpgradedLaptopMockup: React.FC<{
  width?: number;
  videoSrc?: string;
  imgSrc?: string;
  startFrom?: number;
  url?: string;
  badge?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  width = 1100,
  videoSrc = 'video/record_laptop.mp4',
  imgSrc,
  startFrom = 0,
  url = 'rhmt.biz.id/xiiclass',
  badge = 'VERIFIED PRODUCTION',
  style,
  children,
}) => {
  const videoH = Math.round(width * (10 / 16) * 0.76);
  const headerH = 34;

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow:
          '0 36px 80px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(163, 230, 53, 0.25)',
        backgroundColor: '#072416',
        ...style,
      }}
    >
      {/* Top Browser Header */}
      <div
        style={{
          height: headerH,
          backgroundColor: '#0A2D1C',
          borderBottom: '1px solid rgba(163, 230, 53, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#FF5F56' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#27C93F' }} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(4, 20, 13, 0.8)',
            padding: '3px 18px',
            borderRadius: 999,
            border: '1px solid rgba(163, 230, 53, 0.2)',
            fontFamily: FONT_MONO,
            fontSize: 11,
            fontWeight: 600,
            color: '#E7F5EC',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: HC.lime,
              boxShadow: `0 0 6px ${HC.lime}`,
            }}
          />
          https://{url}
        </div>

        <div
          style={{
            padding: '2px 10px',
            borderRadius: 999,
            backgroundColor: 'rgba(163, 230, 53, 0.16)',
            border: '1px solid rgba(163, 230, 53, 0.4)',
            fontFamily: FONT_MONO,
            fontSize: 10,
            fontWeight: 800,
            color: '#BEF264',
          }}
        >
          {badge}
        </div>
      </div>

      {/* Screen Viewport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: videoH,
          backgroundColor: '#0B1410',
          overflow: 'hidden',
        }}
      >
        {imgSrc ? (
          <Img
            src={staticFile(imgSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <OffthreadVideo
            src={staticFile(videoSrc)}
            startFrom={startFrom}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
};

/* ───────── Sleek Architectural Smartphone Mockup ───────── */
export const UpgradedPhoneMockup: React.FC<{
  width?: number;
  startFrom?: number;
  style?: React.CSSProperties;
}> = ({ width = 260, startFrom = 0, style }) => {
  const bezel = 10;
  const innerW = width - bezel * 2;
  const innerH = Math.round(innerW * (892 / 412));

  return (
    <div
      style={{
        position: 'relative',
        width,
        height: innerH + bezel * 2,
        padding: bezel,
        borderRadius: 36,
        background: 'linear-gradient(155deg, #134E33 0%, #072919 60%, #04190F 100%)',
        border: '2px solid rgba(163, 230, 53, 0.4)',
        boxShadow:
          '0 32px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: innerW,
          height: innerH,
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: '#0B1410',
        }}
      >
        <OffthreadVideo
          src={staticFile('video/record_mobile.mp4')}
          startFrom={startFrom}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Dynamic Island */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 44,
            height: 8,
            borderRadius: 999,
            backgroundColor: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    </div>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 1: Hook & Dual Multi-Perangkat (Fenrir TTS · ~12.0s)
   Speed Ramping: Fast Kinetic Whip -> Slow-Mo Dual Devices Reveal
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Kinetic Typography Hook (0 to 65 frames)
  const hookWhip = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 140, mass: 0.8 },
  });
  const hookOpacity = interpolate(frame, [55, 70], [1, 0], { extrapolateRight: 'clamp' });

  // Phase 2: Dual Devices Speed Ramp (Frames 60 to 360)
  const deviceWhip = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 15, stiffness: 95, mass: 0.9 },
  });
  // Slow-motion cinematic drift
  const slowFloat = interpolate(frame, [70, 360], [1.0, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Radial Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, rgba(11, 58, 35, 0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* PHASE 1: KINETIC TYPOGRAPHY HOOK (Frames 0-70) */}
      {frame < 75 && (
        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: `scale(${hookWhip})`,
            opacity: hookOpacity,
          }}
        >
          {/* Institutional Tag */}
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              fontWeight: 800,
              color: HC.lime,
              letterSpacing: '0.12em',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(163, 230, 53, 0.1)',
              padding: '6px 18px',
              borderRadius: 999,
              border: `1px solid ${HC.border}`,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: HC.lime }} />
            MASALAH ABSENSI MANUAL?
          </div>

          {/* Heavy Display Headline */}
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 104,
              fontWeight: 900,
              color: HC.inkLight,
              margin: 0,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            REKAP KELAS
          </h1>

          {/* Pill Outline Mask + Serif Italic */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 28px',
                borderRadius: 999,
                border: `3px solid ${HC.lime}`,
                backgroundColor: 'rgba(163, 230, 53, 0.12)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 64,
                  fontWeight: 900,
                  color: HC.lime,
                  lineHeight: 1,
                }}
              >
                RAWAN SALAH
              </span>
            </div>

            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 52,
                fontStyle: 'italic',
                fontWeight: 600,
                color: HC.inkLight,
              }}
            >
              hitung & selisih angka.
            </span>
          </div>
        </div>
      )}

      {/* PHASE 2: DUAL DEVICES HERO STAGE (Frames 60+) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          transform: `scale(${deviceWhip * slowFloat})`,
          opacity: deviceWhip,
          zIndex: 20,
        }}
      >
        {/* Kinetic Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '6px 18px',
              borderRadius: 999,
              backgroundColor: HC.lime,
              color: '#072919',
              fontFamily: FONT_DISPLAY,
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: '0.04em',
            }}
          >
            E-REKAP PLATFORM
          </div>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 32,
              fontStyle: 'italic',
              color: HC.inkLight,
            }}
          >
            ringan, transparan, dan responsif di laptop & smartphone.
          </span>
        </div>

        {/* Dual Mockup Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            width: '100%',
            maxWidth: 1500,
          }}
        >
          {/* Laptop 16:10 */}
          <UpgradedLaptopMockup width={980} startFrom={0} badge="DESKTOP NEXT.JS 16" />

          {/* Smartphone 9:16 */}
          <div style={{ position: 'relative' }}>
            <UpgradedPhoneMockup width={255} startFrom={0} />
            <div
              style={{
                position: 'absolute',
                bottom: 22,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(7, 41, 25, 0.95)',
                border: `1px solid ${HC.lime}`,
                color: HC.lime,
                padding: '4px 14px',
                borderRadius: 999,
                fontFamily: FONT_MONO,
                fontSize: 10,
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
              }}
            >
              RESPONSIF MOBILE
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 2: Rolling Counter & Grafik Donat (Fenrir TTS · ~13.0s)
   Dynamic Keyframing: Fast Entry -> Deep Camera Zoom on Counter
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene2Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Speed-ramp entrance
  const enterWhip = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.9 },
  });

  // Dynamic Camera Keyframing:
  // Frames 0-40: Overview entry
  // Frames 40-100: Smooth slow-motion zoom-in directly into the attendance counter & donut
  // Frames 100-240: Hold at 1.16x scale while counter spins
  // Frames 240-340: Smoothly glide back to 1.02x overview
  const cameraScale = interpolate(frame, [0, 40, 100, 240, 340], [1.0, 1.0, 1.16, 1.16, 1.02], {
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });
  const cameraTranslateX = interpolate(frame, [40, 100, 240, 340], [0, -120, -120, 0], {
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });
  const cameraTranslateY = interpolate(frame, [40, 100, 240, 340], [0, 45, 45, 0], {
    easing: Easing.bezier(0.2, 0.9, 0.3, 1),
  });

  // Rolling Counter for Kehadiran (0 to 94.7%)
  const rollAttendance = interpolate(frame, [35, 130], [0, 94.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Donut chart stroke dashoffset animation
  const donutProgress = interpolate(frame, [35, 140], [0, 0.947], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference * (1 - donutProgress);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 36,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${enterWhip * cameraScale}) translate3d(${cameraTranslateX}px, ${cameraTranslateY}px, 0)`,
          opacity: enterWhip,
          zIndex: 20,
        }}
      >
        {/* Top Kinetic Headline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 38,
              fontWeight: 900,
              color: HC.inkLight,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            TELEMETRI PRESENSI REAL-TIME
          </h2>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 30,
              fontStyle: 'italic',
              color: HC.lime,
            }}
          >
            rolling counter 60 FPS & grafik donat per kelas.
          </span>
        </div>

        {/* Laptop Stage */}
        <div style={{ position: 'relative' }}>
          <UpgradedLaptopMockup
            width={1220}
            startFrom={120}
            url="rhmt.biz.id/xiiclass/dashboard"
            badge="DASHBOARD 60 FPS"
          >
            {/* Elegant Floating HUD Card (Positioned precisely in top right, not blocking content) */}
            <div
              style={{
                position: 'absolute',
                top: 24,
                right: 32,
                backgroundColor: 'rgba(7, 41, 25, 0.95)',
                border: `1.5px solid ${HC.lime}`,
                borderRadius: 16,
                padding: '16px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
                zIndex: 40,
              }}
            >
              {/* Circular SVG Donut */}
              <div style={{ position: 'relative', width: 72, height: 72 }}>
                <svg width="72" height="72" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="rgba(163, 230, 53, 0.15)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={HC.lime}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                    fontWeight: 900,
                    color: HC.inkLight,
                  }}
                >
                  {Math.round(donutProgress * 100)}%
                </div>
              </div>

              {/* Attendance Metric */}
              <div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    fontWeight: 800,
                    color: HC.lime,
                    letterSpacing: '0.08em',
                    marginBottom: 4,
                  }}
                >
                  LIVE PERSENTASE KEHADIRAN
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 34,
                    fontWeight: 900,
                    color: HC.inkLight,
                    lineHeight: 1,
                  }}
                >
                  {rollAttendance.toFixed(1)}%
                </div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 11,
                    color: HC.inkMuted,
                    marginTop: 4,
                  }}
                >
                  36 Siswa · 3 Rombel Terverifikasi
                </div>
              </div>
            </div>
          </UpgradedLaptopMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 3: Mode Full Excel & Freeze Column (Fenrir TTS · ~12.0s)
   Clean High-Def Stage: Smooth Horizontal Pan with Pinned Columns
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene3Excel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Speed-ramp entrance
  const enterWhip = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.9 },
  });

  // Slow-motion horizontal pan demonstrating frozen column
  // Columns No & Nama stay fixed while the dates scroll
  const scrollX = interpolate(frame, [30, 260], [0, -280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const students = [
    { no: '01', name: 'ACHMAD DANY MAULANA', p: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '02', name: 'ADINDA LESTARI', p: ['H', 'H', 'S', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '03', name: 'AHMAD FAUZI', p: ['H', 'H', 'H', 'H', 'I', 'H', 'H', 'H', 'H', 'H'] },
    { no: '04', name: 'ALYA NUR AZIZAH', p: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '05', name: 'BAGAS PRATAMA', p: ['H', 'S', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '06', name: 'CITRA WULANDARI', p: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '07', name: 'DIMAS ARYA', p: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
    { no: '08', name: 'EVA SALSABILA', p: ['H', 'H', 'H', 'H', 'H', 'H', 'I', 'H', 'H', 'H'] },
  ];

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 36,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          transform: `scale(${enterWhip})`,
          opacity: enterWhip,
          zIndex: 20,
        }}
      >
        {/* Header Headline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 999,
              backgroundColor: HC.lime,
              color: '#072919',
              fontFamily: FONT_DISPLAY,
              fontSize: 26,
              fontWeight: 900,
            }}
          >
            MODE FULL EXCEL
          </div>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 30,
              fontStyle: 'italic',
              color: HC.inkLight,
            }}
          >
            kolom nomor absen & nama siswa otomatis terkunci beku.
          </span>
        </div>

        {/* Clean Architectural Spreadsheet Mockup */}
        <div
          style={{
            width: 1320,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#072416',
            border: `1.5px solid ${HC.border}`,
            boxShadow: '0 32px 70px -15px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Top Bar with Freeze Indicator */}
          <div
            style={{
              height: 40,
              backgroundColor: '#0A2D1C',
              borderBottom: '1px solid rgba(163, 230, 53, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                  color: HC.lime,
                  backgroundColor: 'rgba(163, 230, 53, 0.15)',
                  padding: '3px 12px',
                  borderRadius: 999,
                  border: `1px solid ${HC.border}`,
                }}
              >
                ❄️ FREEZE COLUMN AKTIF
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: HC.inkMuted }}>
                Kelas: XI IPA 1 · Semester Ganjil 2026/2027
              </span>
            </div>

            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: HC.lime, fontWeight: 700 }}>
              GESER HORIZONTAL AKTIF ↔
            </div>
          </div>

          {/* Spreadsheet Table with Locked Left Columns */}
          <div style={{ position: 'relative', display: 'flex', width: '100%', overflow: 'hidden' }}>
            {/* LOCKED / FROZEN COLUMNS (NO & NAMA SISWA) */}
            <div
              style={{
                zIndex: 30,
                backgroundColor: '#082D1C',
                borderRight: `2px solid ${HC.lime}`,
                boxShadow: '8px 0 20px rgba(0, 0, 0, 0.5)',
                flexShrink: 0,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#0E3B25',
                  borderBottom: '1px solid rgba(163, 230, 53, 0.25)',
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                  color: HC.lime,
                }}
              >
                <div style={{ width: 60, padding: '10px 8px', textAlign: 'center' }}>NO</div>
                <div style={{ width: 340, padding: '10px 16px' }}>NAMA SISWA (TERKUNCI BEKU)</div>
              </div>
              {/* Rows */}
              {students.map((s, idx) => (
                <div
                  key={s.no}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(163, 230, 53, 0.12)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(7, 41, 25, 0.6)' : 'rgba(11, 58, 35, 0.4)',
                    fontFamily: FONT_MONO,
                    fontSize: 12,
                    fontWeight: 700,
                    color: HC.inkLight,
                    height: 38,
                  }}
                >
                  <div style={{ width: 60, textAlign: 'center', color: HC.inkMuted }}>{s.no}</div>
                  <div style={{ width: 340, padding: '0 16px', color: HC.inkLight, whiteSpace: 'nowrap' }}>
                    {s.name}
                  </div>
                </div>
              ))}
            </div>

            {/* SCROLLING DATE COLUMNS (Pans horizontally) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                transform: `translateX(${scrollX}px)`,
                flexGrow: 1,
              }}
            >
              {/* Header Dates */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#0B3320',
                  borderBottom: '1px solid rgba(163, 230, 53, 0.25)',
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 700,
                  color: HC.inkMuted,
                }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 58,
                      padding: '10px 4px',
                      textAlign: 'center',
                      borderRight: '1px solid rgba(163, 230, 53, 0.1)',
                      color: i % 7 === 6 ? HC.orange : HC.inkLight,
                    }}
                  >
                    Tgl {i + 1}
                  </div>
                ))}
              </div>

              {/* Rows Data */}
              {students.map((s, idx) => (
                <div
                  key={s.no}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(163, 230, 53, 0.12)',
                    backgroundColor: idx % 2 === 0 ? 'rgba(4, 20, 13, 0.5)' : 'transparent',
                    height: 38,
                  }}
                >
                  {Array.from({ length: 24 }).map((_, i) => {
                    const status = i < s.p.length ? s.p[i] : 'H';
                    const isS = status === 'S';
                    const isI = status === 'I';
                    const color = isS ? '#38BDF8' : isI ? '#FBBF24' : '#4ADE80';
                    return (
                      <div
                        key={i}
                        style={{
                          width: 58,
                          textAlign: 'center',
                          fontFamily: FONT_MONO,
                          fontSize: 11,
                          fontWeight: 800,
                          color,
                          borderRight: '1px solid rgba(163, 230, 53, 0.08)',
                        }}
                      >
                        {status}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 4: Panel Admin & Cetak A4 Landscape (Fenrir TTS · ~10.5s)
   Sequential Reveal -> Stamped Slam Impact & Physical Camera Shake
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene4Export: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Speed-ramp entrance for Left (Admin) & Right (A4 Print)
  const leftSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.9 },
  });
  const rightSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.9 },
  });

  // Stamped Slam Impact at frame 130
  const hitFrame = 130;
  const stampProgress = spring({
    frame: Math.max(0, frame - hitFrame),
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [3.2, 1.0], {
    extrapolateRight: 'clamp',
  });
  const stampOpacity = interpolate(stampProgress, [0, 0.2], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Camera Shake on Impact (Frames 130 to 144)
  const isShaking = frame >= hitFrame && frame < hitFrame + 14;
  const shakeIntensity = isShaking ? (1 - (frame - hitFrame) / 14) * 8 : 0;
  const shakeX = isShaking ? Math.sin((frame - hitFrame) * 2.2) * shakeIntensity : 0;
  const shakeY = isShaking ? Math.cos((frame - hitFrame) * 2.6) * (shakeIntensity * 0.7) : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 36,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
        transform: `translate3d(${shakeX}px, ${shakeY}px, 0)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          zIndex: 20,
        }}
      >
        {/* Headline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 36,
              fontWeight: 900,
              color: HC.inkLight,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            STANDAR RESMI LEMBAGA
          </h2>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 30,
              fontStyle: 'italic',
              color: HC.lime,
            }}
          >
            panel admin terenkripsi & cetak format A4 Kop Madrasah.
          </span>
        </div>

        {/* Dual Split Stage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            width: '100%',
            maxWidth: 1560,
          }}
        >
          {/* Left: Admin Authentication Mockup */}
          <div
            style={{
              transform: `translate3d(${interpolate(leftSpring, [0, 1], [-80, 0])}px, 0, 0)`,
              opacity: leftSpring,
              position: 'relative',
            }}
          >
            <UpgradedLaptopMockup
              width={700}
              imgSrc="assets/erekap/real_admin_panel.png"
              url="rhmt.biz.id/xiiclass/admin"
              badge="PANEL ADMIN TERPROTEKSI"
            />
            {/* Status Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                backgroundColor: 'rgba(7, 41, 25, 0.95)',
                border: `1.5px solid ${HC.lime}`,
                borderRadius: 12,
                padding: '8px 18px',
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: HC.lime,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              🔒 TERENKRIPSI & PERSISTEN SQLITE
            </div>
          </div>

          {/* Right: Formal A4 Print Mockup with Heavy Stamp */}
          <div
            style={{
              transform: `translate3d(${interpolate(rightSpring, [0, 1], [80, 0])}px, 0, 0)`,
              opacity: rightSpring,
              position: 'relative',
            }}
          >
            <UpgradedLaptopMockup
              width={700}
              imgSrc="assets/erekap/real_desktop_rekap.png"
              url="rhmt.biz.id/xiiclass/rekap?print=true"
              badge="SIAP CETAK A4 LANDSCAPE"
            >
              {/* Heavy Official Madrasah Rubber Stamp */}
              {frame >= hitFrame && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 44,
                    width: 104,
                    height: 104,
                    borderRadius: 999,
                    border: `3px dashed ${HC.orange}`,
                    backgroundColor: 'rgba(255, 74, 34, 0.18)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    transform: `scale(${stampScale}) rotate(-14deg)`,
                    opacity: stampOpacity,
                    boxShadow: '0 0 25px rgba(255, 74, 34, 0.45)',
                    zIndex: 50,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 8,
                      fontWeight: 900,
                      color: HC.orange,
                      letterSpacing: '0.1em',
                    }}
                  >
                    MA NU ISLAMIYAH
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: 15,
                      fontWeight: 900,
                      color: HC.orange,
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      margin: '2px 0',
                    }}
                  >
                    VERIFIKASI
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 8,
                      fontWeight: 800,
                      color: HC.orange,
                    }}
                  >
                    RESMI 2026
                  </span>
                </div>
              )}
            </UpgradedLaptopMockup>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 5: Bento Climax & Official RHMT OFC Branding (~13.0s)
   Architectural 3-Column Bento: Brand + Tech Architecture + Creator
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene5Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bentoWhip = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.9 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 36,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3-Column Clean Architectural Bento Grid */}
      <div
        style={{
          width: 1500,
          display: 'grid',
          gridTemplateColumns: '400px 1fr 460px',
          gap: 24,
          zIndex: 20,
          transform: `scale(${bentoWhip})`,
          opacity: bentoWhip,
        }}
      >
        {/* Kolom 1: Hero Accent Lime Card */}
        <div
          style={{
            backgroundColor: HC.lime,
            borderRadius: 24,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 24px 50px rgba(163, 230, 53, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: '#072919',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                padding: '3px 12px',
                borderRadius: 999,
              }}
            >
              v1.0.0 PRODUCTION
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: '#072919' }}>
              MA NU ISLAMIYAH
            </span>
          </div>

          <div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 54,
                fontWeight: 900,
                color: '#072919',
                margin: '0 0 8px 0',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              E-REKAP.
            </h2>
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 20,
                fontStyle: 'italic',
                color: '#134E33',
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              Sistem rekapitulasi kehadiran madrasah modern, transparan, dan presisi.
            </p>
          </div>

          <div
            style={{
              padding: '12px 18px',
              backgroundColor: '#072919',
              borderRadius: 14,
              color: HC.lime,
              fontFamily: FONT_MONO,
              fontSize: 12,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>STATUS SISTEM</span>
            <span style={{ color: '#4ADE80' }}>● ONLINE & STABIL</span>
          </div>
        </div>

        {/* Kolom 2: Engineering & Architectural Specs */}
        <div
          style={{
            backgroundColor: '#072919',
            borderRadius: 24,
            border: `1.5px solid ${HC.border}`,
            padding: '32px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: HC.lime,
                letterSpacing: '0.08em',
                marginBottom: 10,
              }}
            >
              ARSITEKTUR & FITUR UNGGULAN
            </div>
            <h3
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 26,
                fontWeight: 900,
                color: HC.inkLight,
                margin: '0 0 20px 0',
              }}
            >
              Dibangun untuk Kecepatan & Ketahanan Data
            </h3>
          </div>

          {/* 4 Feature Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div
              style={{
                backgroundColor: 'rgba(11, 58, 35, 0.6)',
                border: '1px solid rgba(163, 230, 53, 0.2)',
                borderRadius: 14,
                padding: '14px',
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 800, color: HC.lime }}>
                ⚡ Next.js 16
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: HC.inkMuted, marginTop: 4 }}>
                Turbopack & React 19 Server Components
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(11, 58, 35, 0.6)',
                border: '1px solid rgba(163, 230, 53, 0.2)',
                borderRadius: 14,
                padding: '14px',
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 800, color: HC.lime }}>
                🛡️ SQLite Persisten
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: HC.inkMuted, marginTop: 4 }}>
                Database lokal terproteksi & bebas cloud-lag
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(11, 58, 35, 0.6)',
                border: '1px solid rgba(163, 230, 53, 0.2)',
                borderRadius: 14,
                padding: '14px',
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 800, color: HC.lime }}>
                📊 Full Excel Mode
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: HC.inkMuted, marginTop: 4 }}>
                Freeze column paten & ekspor instan .xlsx
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(11, 58, 35, 0.6)',
                border: '1px solid rgba(163, 230, 53, 0.2)',
                borderRadius: 14,
                padding: '14px',
              }}
            >
              <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 800, color: HC.lime }}>
                ⎙ Standar Cetak A4
              </div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: HC.inkMuted, marginTop: 4 }}>
                Format landscape Kop Madrasah siap tandatangan
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: HC.inkMuted,
              paddingTop: 12,
              borderTop: '1px solid rgba(163, 230, 53, 0.15)',
            }}
          >
            BUILD: PRODUCTION · REPO: xiiclass · HOST: VPS INDONESIA
          </div>
        </div>

        {/* Kolom 3: Official Creator & Personal Branding rhmt ofc */}
        <div
          style={{
            backgroundColor: '#072919',
            borderRadius: 24,
            border: `1.5px solid ${HC.border}`,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(163, 230, 53, 0.12)',
                border: `1px solid ${HC.border}`,
                padding: '4px 14px',
                borderRadius: 999,
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: HC.lime,
                marginBottom: 16,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: HC.lime }} />
              KARYA ORISINAL DEVELOPER
            </div>

            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 52,
                fontWeight: 900,
                color: HC.inkLight,
                margin: '0 0 6px 0',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              rhmt ofc.
            </h2>

            <div
              style={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                fontWeight: 700,
                color: HC.lime,
                marginBottom: 4,
              }}
            >
              Rohmatulloh
            </div>

            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 17,
                fontStyle: 'italic',
                color: HC.inkMuted,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Engineering & UI/UX Craftsmanship for Modern Education.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: HC.inkLight }}>
              rhmt.biz.id · rhmt.biz.id/xiiclass
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                backgroundColor: HC.lime,
                color: '#072919',
                padding: '14px',
                borderRadius: 999,
                fontFamily: FONT_DISPLAY,
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: '0.04em',
                boxShadow: `0 12px 28px rgba(163, 230, 53, 0.4)`,
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
