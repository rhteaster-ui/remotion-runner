import React from 'react';
import {
  AbsoluteFill,
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

// Typography Definitions matching Badar-Style High-Contrast Pairing
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

/* ───────── Fluid SVG Cursor with Click Ring ───────── */
export const FluidCursor: React.FC<{
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
      filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.55))',
      transition: 'transform 0.08s ease',
    }}
  >
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 3L11.5 21L14.5 13.5L21.5 10.5L4 3Z"
        fill="#072919"
        stroke="#A3E635"
        strokeWidth="2.4"
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
          border: `2px solid ${HC.limeBright}`,
          backgroundColor: 'rgba(163, 230, 53, 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )}
  </div>
);

/* ───────── Diagonal Kinetic Background Ribbons ───────── */
export const DiagonalConveyor: React.FC<{ frame: number; text1?: string; text2?: string }> = ({
  frame,
  text1 = 'REKAPITULASI OTOMATIS · REAL-TIME SYNC · MA NU ISLAMIYAH · ',
  text2 = 'EXCEL FULL-SCREEN · CETAK FORMAL A4 · RHMT OFC · ',
}) => {
  const offset1 = (frame * 2.8) % 900;
  const offset2 = (frame * 2.2) % 900;

  return (
    <div
      style={{
        position: 'absolute',
        top: '28%',
        left: '-20%',
        width: '140%',
        transform: 'rotate(-10deg)',
        pointerEvents: 'none',
        opacity: 0.12,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          transform: `translateX(-${offset1}px)`,
          fontFamily: FONT_DISPLAY,
          fontSize: 64,
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: `1.5px ${HC.inkLight}`,
          letterSpacing: '0.04em',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ marginRight: 48 }}>
            {text1}
          </span>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          transform: `translateX(-${900 - offset2}px)`,
          fontFamily: FONT_DISPLAY,
          fontSize: 64,
          fontWeight: 800,
          color: HC.lime,
          letterSpacing: '0.04em',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ marginRight: 48 }}>
            {text2}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────── Upgraded Laptop Mockup ───────── */
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
  width = 1120,
  videoSrc = 'video/record_laptop.mp4',
  imgSrc,
  startFrom = 0,
  url = 'rhmt.biz.id/xiiclass',
  badge = 'DESKTOP LIVE',
  style,
  children,
}) => {
  const chromeH = 44;
  const videoH = Math.round(width * (900 / 1440));

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: '#072919',
        border: '2px solid rgba(163, 230, 53, 0.45)',
        boxShadow:
          '0 36px 80px -16px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        ...style,
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          height: chromeH,
          padding: '0 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#041B11',
          borderBottom: '1px solid rgba(163, 230, 53, 0.22)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 11, height: 11, borderRadius: 999, backgroundColor: '#EF4444' }} />
          <div style={{ width: 11, height: 11, borderRadius: 999, backgroundColor: '#F59E0B' }} />
          <div style={{ width: 11, height: 11, borderRadius: 999, backgroundColor: '#10B981' }} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: FONT_MONO,
            fontSize: 12,
            fontWeight: 600,
            color: '#E7F5EC',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: HC.lime,
              boxShadow: `0 0 6px ${HC.lime}`,
            }}
          />
          https://{url}
        </div>

        <div
          style={{
            padding: '3px 10px',
            borderRadius: 999,
            backgroundColor: 'rgba(163, 230, 53, 0.18)',
            border: '1px solid rgba(163, 230, 53, 0.45)',
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

/* ───────── Upgraded Phone Mockup ───────── */
export const UpgradedPhoneMockup: React.FC<{
  width?: number;
  startFrom?: number;
  style?: React.CSSProperties;
}> = ({ width = 270, startFrom = 0, style }) => {
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
        border: '2px solid rgba(163, 230, 53, 0.45)',
        boxShadow:
          '0 32px 70px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
            width: 48,
            height: 9,
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
   SCENE 1: Hook & Dual Multi-Perangkat (364 frames · 12.14s)
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Kinetic Typography Hook (0 to 110 frames · 0-3.6s)
  const hookSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // Bouncing Ball Physics over letters
  const ballPhase = Math.min(1, frame / 50);
  const ballX = interpolate(ballPhase, [0, 0.25, 0.5, 0.75, 1], [340, 520, 700, 880, 1060]);
  const bounceY = Math.abs(Math.sin(frame * 0.22)) * 60;
  const isBallSquash = bounceY < 12 && frame < 65;

  // Phase 2: Dual Devices Spring Entrance (from frame 90)
  const devicesSpring = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  // Fluid Cursor trajectory inside laptop screen
  const cursorProgress = interpolate(frame, [150, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const curX = interpolate(cursorProgress, [0, 0.5, 1], [680, 480, 320]);
  const curY = interpolate(cursorProgress, [0, 0.5, 1], [380, 260, 210]);
  const isClicking = frame >= 238 && frame <= 248;

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
      <DiagonalConveyor frame={frame} />

      {/* PHASE 1: KINETIC TYPOGRAPHY INTRO (Frames 0-110) */}
      {frame < 115 && (
        <div
          style={{
            position: 'absolute',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: `scale(${hookSpring})`,
            opacity: interpolate(frame, [85, 110], [1, 0], { extrapolateRight: 'clamp' }),
          }}
        >
          {/* Top Tagline */}
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              fontWeight: 800,
              color: HC.lime,
              letterSpacing: '0.12em',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: HC.lime }} />
            MASALAH ABSENSI MANUAL?
          </div>

          {/* Big Bold Headline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 110,
                fontWeight: 900,
                color: HC.inkLight,
                margin: 0,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              REKAP ABSEN
            </h1>
          </div>

          {/* Bounding Pill Mask & Serif Italic */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginTop: 18,
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
                  fontSize: 72,
                  fontWeight: 900,
                  color: HC.lime,
                  lineHeight: 1,
                }}
              >
                MANUAL?
              </span>
              <span
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: HC.orange,
                  marginLeft: 12,
                  borderRadius: 3,
                  opacity: frame % 16 < 10 ? 1 : 0,
                }}
              />
            </div>

            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 54,
                fontStyle: 'italic',
                fontWeight: 600,
                color: HC.inkLight,
              }}
            >
              rawan selisih angka.
            </span>
          </div>

          {/* Bouncing Kinetic Ball */}
          {frame < 70 && (
            <div
              style={{
                position: 'absolute',
                left: ballX,
                top: 150 - bounceY,
                width: 32,
                height: 32,
                borderRadius: 999,
                backgroundColor: HC.limeBright,
                boxShadow: `0 0 20px ${HC.limeBright}`,
                transform: `translate(-50%, -50%) scale(${isBallSquash ? 1.35 : 0.85}, ${isBallSquash ? 0.7 : 1.25})`,
                zIndex: 40,
              }}
            />
          )}
        </div>
      )}

      {/* PHASE 2: DUAL DEVICES STAGE (Frames 90-364) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          width: '100%',
          maxWidth: 1600,
          margin: '0 auto',
          transform: `scale(${devicesSpring})`,
          opacity: devicesSpring,
          zIndex: 20,
        }}
      >
        {/* Laptop Mockup */}
        <div style={{ position: 'relative' }}>
          <UpgradedLaptopMockup width={1000} startFrom={0} badge="DESKTOP APP 60 FPS">
            {/* Live Interactive Fluid Cursor */}
            {frame >= 140 && (
              <FluidCursor x={curX} y={curY} clicking={isClicking} />
            )}

            {/* Click Tooltip Callout */}
            {frame >= 244 && (
              <div
                style={{
                  position: 'absolute',
                  top: 170,
                  left: 280,
                  backgroundColor: 'rgba(7, 41, 25, 0.95)',
                  border: `1.5px solid ${HC.lime}`,
                  color: HC.lime,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  zIndex: 80,
                }}
              >
                ✓ Kelas XI-IPA 1 Aktif
              </div>
            )}
          </UpgradedLaptopMockup>

          {/* Floating Kinetic Headline Over Laptop */}
          <div
            style={{
              position: 'absolute',
              top: -36,
              left: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              zIndex: 35,
            }}
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 24,
                fontWeight: 900,
                color: HC.inkLight,
                letterSpacing: '-0.02em',
              }}
            >
              MULTI-PERANGKAT
            </span>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 22,
                fontStyle: 'italic',
                color: HC.lime,
              }}
            >
              tampil mulus di HP maupun laptop.
            </span>
          </div>
        </div>

        {/* Mobile Phone Mockup */}
        <div style={{ position: 'relative' }}>
          <UpgradedPhoneMockup width={270} startFrom={0} />
          {/* Mobile Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(7, 41, 25, 0.9)',
              border: `1px solid ${HC.lime}`,
              color: HC.lime,
              padding: '4px 12px',
              borderRadius: 999,
              fontFamily: FONT_MONO,
              fontSize: 10,
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            RESPONSIF MOBILE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 2: Rolling Counter & Grafik Donat (376 frames · 12.52s)
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene2Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 85, mass: 1 },
  });

  // Dynamic Camera Zoom towards dashboard metric metrics
  const cameraZoom = interpolate(frame, [0, 200, 360], [1, 1.08, 1.04], {
    extrapolateRight: 'clamp',
  });

  // Rolling Counter for Kehadiran (0 to 94.7%)
  const rollAttendance = interpolate(frame, [25, 120], [0, 94.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Donut chart stroke dashoffset animation
  const donutProgress = interpolate(frame, [30, 130], [0, 0.947], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const circumference = 2 * Math.PI * 40; // r = 40
  const strokeDashoffset = circumference * (1 - donutProgress);

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
      <DiagonalConveyor frame={frame} text1="ROLLING COUNTER · GRAFIK DONAT INTERAKTIF · " />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${enterSpring * cameraZoom})`,
          opacity: enterSpring,
          zIndex: 20,
        }}
      >
        {/* Kinetic Header Headline */}
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
            TELEMETRI PRESENSI
          </h2>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 32,
              fontStyle: 'italic',
              color: HC.lime,
            }}
          >
            rolling counter berputar naik 60 FPS.
          </span>
        </div>

        {/* Laptop Stage showing Real Dashboard Video */}
        <div style={{ position: 'relative' }}>
          <UpgradedLaptopMockup
            width={1200}
            startFrom={120}
            url="rhmt.biz.id/xiiclass/dashboard"
            badge="DASHBOARD REAL-TIME"
          >
            {/* Live Interactive Telemetry Overlay Card */}
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 48,
                backgroundColor: 'rgba(7, 41, 25, 0.94)',
                border: `2px solid ${HC.lime}`,
                borderRadius: 20,
                padding: '18px 28px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                zIndex: 60,
              }}
            >
              {/* Animated SVG Donut Chart */}
              <div style={{ position: 'relative', width: 90, height: 90 }}>
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={HC.lime}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
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
                    fontWeight: 800,
                    color: HC.lime,
                  }}
                >
                  {Math.round(donutProgress * 100)}%
                </div>
              </div>

              {/* Number Telemetry */}
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: HC.inkMuted }}>
                  PERSENTASE KEHADIRAN KELAS
                </div>
                <div
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 44,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    lineHeight: 1,
                    marginTop: 4,
                  }}
                >
                  {rollAttendance.toFixed(1)}%
                </div>
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#4ADE80',
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: '#4ADE80' }} />
                  Grafik Donat & Rolling Counter Aktif
                </div>
              </div>
            </div>

            {/* Checklist Chips Floating Bottom Right */}
            <div
              style={{
                position: 'absolute',
                bottom: 28,
                right: 36,
                display: 'flex',
                gap: 12,
                zIndex: 60,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(7, 41, 25, 0.9)',
                  border: `1px solid ${HC.lime}`,
                  color: HC.lime,
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                ✓ Rolling Counter 60 FPS
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(7, 41, 25, 0.9)',
                  border: `1px solid ${HC.lime}`,
                  color: HC.lime,
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                ✓ Donat Interaktif Per Kelas
              </div>
            </div>
          </UpgradedLaptopMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 3: Mode Full Excel & Freeze Column (309 frames · 10.31s)
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene3Excel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 85, mass: 1 },
  });

  // Laser scanner effect across the Excel spreadsheet
  const scanX = interpolate(frame, [20, 160], [0, 1280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fluid cursor trajectory auditing the cells
  const cursorProgress = interpolate(frame, [80, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const curX = interpolate(cursorProgress, [0, 0.45, 1], [1050, 720, 480]);
  const curY = interpolate(cursorProgress, [0, 0.45, 1], [620, 480, 360]);
  const isClicking = frame >= 185 && frame <= 198;

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
      <DiagonalConveyor frame={frame} text1="FREEZE COLUMN · NO & NAMA SISWA TERKUNCI BEKU · " />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          transform: `scale(${enterSpring})`,
          opacity: enterSpring,
          zIndex: 20,
        }}
      >
        {/* Kinetic Typographic Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              padding: '6px 20px',
              borderRadius: 999,
              backgroundColor: HC.lime,
              color: '#072919',
              fontFamily: FONT_DISPLAY,
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            MODE FULL EXCEL
          </div>
          <span
            style={{
              fontFamily: FONT_SERIF,
              fontSize: 32,
              fontStyle: 'italic',
              color: HC.inkLight,
            }}
          >
            kolom nama siswa & nomor absen otomatis terkunci beku.
          </span>
        </div>

        {/* 3D Tilted Spreadsheet Container */}
        <div
          style={{
            position: 'relative',
            transform: 'perspective(1400px) rotateX(8deg)',
          }}
        >
          <UpgradedLaptopMockup
            width={1280}
            imgSrc="assets/erekap/xiiclass_excel_mode.png"
            url="rhmt.biz.id/xiiclass/rekap?view=excel"
            badge="EXCEL SPREADSHEET 36 SISWA"
          >
            {/* Laser Scanning Line */}
            {frame >= 20 && frame <= 180 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: scanX,
                  width: 3,
                  backgroundColor: HC.limeBright,
                  boxShadow: `0 0 16px ${HC.limeBright}`,
                  zIndex: 40,
                }}
              />
            )}

            {/* Frozen Column Pill Overlay on the Left */}
            <div
              style={{
                position: 'absolute',
                top: 48,
                left: 32,
                backgroundColor: 'rgba(7, 41, 25, 0.94)',
                border: `1.5px solid ${HC.lime}`,
                borderRadius: 14,
                padding: '8px 18px',
                fontFamily: FONT_MONO,
                fontSize: 12,
                fontWeight: 800,
                color: HC.lime,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                zIndex: 60,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: HC.lime }} />
              FREEZE COLUMN: NO & NAMA SISWA TERKUNCI
            </div>

            {/* Fluid Cursor */}
            {frame >= 70 && (
              <FluidCursor x={curX} y={curY} clicking={isClicking} />
            )}

            {/* Click Tooltip Callout */}
            {frame >= 190 && (
              <div
                style={{
                  position: 'absolute',
                  top: 310,
                  left: 450,
                  backgroundColor: '#121411',
                  border: `2px solid ${HC.lime}`,
                  color: HC.lime,
                  padding: '8px 18px',
                  borderRadius: 10,
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  fontWeight: 800,
                  boxShadow: '0 16px 36px rgba(0,0,0,0.7)',
                  zIndex: 80,
                }}
              >
                ✓ Ahmad Fauzi · 100% Hadir Terverifikasi
              </div>
            )}
          </UpgradedLaptopMockup>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 4: Panel Admin, Ekspor XLSX & Cetak A4 (394 frames · 13.12s)
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene4Export: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 85, mass: 1 },
  });

  const rightSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 16, stiffness: 85, mass: 1 },
  });

  // Stamped Seal Slam Impact (frame 140)
  const stampSpring = spring({
    frame: Math.max(0, frame - 140),
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.7 },
  });

  // Micro Camera Shake on Stamp Impact
  const shake = frame >= 140 && frame <= 155 ? Math.sin((frame - 140) * 3) * 6 : 0;

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
        transform: `translateY(${shake}px)`,
      }}
    >
      <DiagonalConveyor frame={frame} text1="FORMAT RESMI KOP MADRASAH · EKSPOR XLSX 1-KLIK · " />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          zIndex: 20,
        }}
      >
        {/* Kinetic Headline */}
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
            cetak A4 landscape Kop Madrasah & ekspor backup XLSX.
          </span>
        </div>

        {/* Dual Split Stage: Admin Protected vs A4 Landscape Print Sheet */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
            width: '100%',
            maxWidth: 1600,
          }}
        >
          {/* Left: Admin Authentication & Protected Security */}
          <div
            style={{
              transform: `translate3d(${interpolate(leftSpring, [0, 1], [-100, 0])}px, 0, 0)`,
              opacity: leftSpring,
              position: 'relative',
            }}
          >
            <UpgradedLaptopMockup
              width={720}
              imgSrc="assets/erekap/real_admin_panel.png"
              url="rhmt.biz.id/xiiclass/admin"
              badge="PANEL ADMIN TERPROTEKSI"
            />
            {/* Security Lock Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                backgroundColor: 'rgba(7, 41, 25, 0.95)',
                border: `1.5px solid ${HC.lime}`,
                borderRadius: 14,
                padding: '8px 18px',
                fontFamily: FONT_MONO,
                fontSize: 11,
                fontWeight: 800,
                color: HC.lime,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              🔒 TERENKRIPSI & PERSISTEN SQLITE
            </div>
          </div>

          {/* Right: Formal A4 Landscape Print View */}
          <div
            style={{
              transform: `translate3d(${interpolate(rightSpring, [0, 1], [100, 0])}px, 0, 0)`,
              opacity: rightSpring,
              position: 'relative',
            }}
          >
            <UpgradedLaptopMockup
              width={720}
              imgSrc="assets/erekap/real_desktop_rekap.png"
              url="rhmt.biz.id/xiiclass/rekap?print=true"
              badge="SIAP CETAK A4 LANDSCAPE"
            >
              {/* Heavy Stamp Slam Seal */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 36,
                  right: 48,
                  width: 104,
                  height: 104,
                  borderRadius: 999,
                  border: `3.5px solid #072919`,
                  backgroundColor: 'rgba(163, 230, 53, 0.35)',
                  color: '#072919',
                  fontFamily: FONT_MONO,
                  fontSize: 10,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transform: `scale(${stampSpring}) rotate(-14deg)`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  zIndex: 80,
                }}
              >
                KOP RESMI<br />SAH & VERIFIED
              </div>
            </UpgradedLaptopMockup>

            {/* Action Buttons Floating Below */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                display: 'flex',
                gap: 10,
                zIndex: 70,
              }}
            >
              <div
                style={{
                  backgroundColor: HC.lime,
                  color: '#072919',
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                ⤓ Ekspor XLSX
              </div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#072919',
                  padding: '6px 16px',
                  borderRadius: 999,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                ⎙ Cetak A4 PDF
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════════════════════════════════════════════════════════════
   SCENE 5: Bento Climax & Personal Branding (357 frames · 11.88s)
═════════════════════════════════════════════════════════════════ */
export const HorizontalScene5Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bentoSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 95, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 70,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DiagonalConveyor frame={frame} text1="ENGINEERED BY ROHMATULLOH · RHMT OFC · RHMT.BIZ.ID · " />

      {/* Upgraded 3-Column Bento Grid ala Badar's Frame 26 */}
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
        {/* Kolom 1: Neon Pill Card & Prompt Specification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Card Lime Bold */}
          <div
            style={{
              backgroundColor: HC.lime,
              borderRadius: 24,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 230,
              boxShadow: '0 20px 45px rgba(163, 230, 53, 0.3)',
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
                  padding: '3px 10px',
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
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#072919',
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
                  color: '#072919',
                  margin: '8px 0 0 0',
                }}
              >
                Intelligence Presensi Sekolah
              </p>
            </div>
          </div>

          {/* Card Terminal Specification */}
          <div
            style={{
              backgroundColor: 'rgba(7, 41, 25, 0.92)',
              borderRadius: 24,
              padding: '24px',
              border: `1.5px solid ${HC.border}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 230,
            }}
          >
            <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: HC.inkMuted }}>
              SYSTEM ARCHITECTURE · STACK
            </div>

            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 14,
                color: HC.inkLight,
                lineHeight: 1.5,
              }}
            >
              "Next.js 16 (Turbopack) · SQLite Persistent · Remotion 4 Engine · Tailwind CSS|"
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: HC.lime }}>
                STATUS: DEPLOYED & TESTED
              </span>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  backgroundColor: HC.lime,
                  color: '#072919',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 2: Live Code Component View (Syntax Highlight) */}
        <div
          style={{
            backgroundColor: '#051E13',
            borderRadius: 24,
            border: `1.5px solid ${HC.border}`,
            padding: '28px 32px',
            fontFamily: FONT_MONO,
            fontSize: 13,
            lineHeight: 1.8,
            boxShadow: '0 28px 60px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: HC.inkMuted, marginBottom: 8 }}>
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
            &lt;<span style={{ color: HC.lime, fontWeight: 700 }}>AttendanceEngine</span>
          </div>
          <div style={{ paddingLeft: 60 }}>
            <span style={{ color: '#FBBF24' }}>institution</span>=
            <span style={{ color: '#A7F3D0' }}>"MA NU Islamiyah"</span>
          </div>
          <div
            style={{
              paddingLeft: 60,
              backgroundColor: 'rgba(163, 230, 53, 0.12)',
              borderLeft: `3px solid ${HC.lime}`,
            }}
          >
            <span style={{ color: '#FBBF24' }}>attendanceRate</span>=
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
            <span style={{ color: '#FBBF24' }}>craftedBy</span>=
            <span style={{ color: HC.lime, fontWeight: 800 }}>"rhmt ofc"</span>
          </div>
          <div style={{ paddingLeft: 40 }}>/&gt;</div>
          <div style={{ paddingLeft: 20 }}>);</div>
          <div>&#125;</div>
        </div>

        {/* Kolom 3: Official Developer Card & rhmt ofc Identity */}
        <div
          style={{
            backgroundColor: '#072919',
            borderRadius: 24,
            border: `2px solid rgba(163, 230, 53, 0.5)`,
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 999,
                  padding: 3,
                  background: `linear-gradient(135deg, ${HC.lime} 0%, #04140D 100%)`,
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
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: HC.lime, fontWeight: 700 }}>
                  SYSTEMS ARCHITECT & DEV
                </div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 18, fontWeight: 900, color: HC.inkLight }}>
                  Rohmatulloh
                </div>
              </div>
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

            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 18,
                fontStyle: 'italic',
                color: HC.lime,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Crafted with engineering precision for modern schools.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: HC.inkMuted }}>
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
