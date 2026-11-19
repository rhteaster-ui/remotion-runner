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
import { EREKAP_FONT, EREKAP_TOKENS as T } from '../lib/erekapTokens';

const sans = EREKAP_FONT.sans;
const mono = EREKAP_FONT.mono;

export const TEASER_TOTAL_FRAMES = 480; // 16s @ 30 FPS

// Micro SFX triggers
const SFX_EVENTS = [
  { frame: 6, sfx: 'whoosh-soft' },
  { frame: 42, sfx: 'pop-soft' },
  { frame: 120, sfx: 'whoosh-wipe' },
  { frame: 135, sfx: 'lock-click' },
  { frame: 165, sfx: 'tick' },
  { frame: 240, sfx: 'whoosh-soft' },
  { frame: 255, sfx: 'stamp' },
  { frame: 280, sfx: 'success-arp' },
  { frame: 360, sfx: 'whoosh-wipe' },
  { frame: 380, sfx: 'ding' },
];

/* ───────── SVG Mouse Cursor ───────── */
const KineticCursor: React.FC<{
  x: number;
  y: number;
  clicking?: boolean;
}> = ({ x, y, clicking = false }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-3px, -3px) scale(${clicking ? 0.88 : 1})`,
      pointerEvents: 'none',
      zIndex: 60,
      filter: 'drop-shadow(0 6px 12px rgba(10, 61, 38, 0.25))',
      transition: 'transform 0.08s ease',
    }}
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 3L11.5 21L14.5 13.5L21.5 10.5L4 3Z"
        fill="#0A3D26"
        stroke="#FFFFFF"
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
          width: 36,
          height: 36,
          borderRadius: 999,
          border: '2px solid #A3E635',
          backgroundColor: 'rgba(163, 230, 53, 0.25)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    )}
  </div>
);

/* ───────── Top Minimalist Stepper Header ───────── */
const TeaserHeader: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const steps = [
    '01 · Multi-Device',
    '02 · Mode Excel',
    '03 · Cetak A4',
    '04 · rhmt ofc',
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 1440,
        padding: '8px 20px',
        borderRadius: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(10, 61, 38, 0.12)',
        boxShadow:
          '0 12px 32px -8px rgba(10, 61, 38, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Img
          src={staticFile('assets/erekap/icon-erekap.png')}
          style={{ width: 26, height: 26, borderRadius: 6 }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span
            style={{
              fontFamily: sans,
              fontSize: 14,
              fontWeight: 800,
              color: '#0A3D26',
              letterSpacing: '-0.02em',
            }}
          >
            E-Rekap
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 700,
              color: '#15803D',
              backgroundColor: '#EAF6EE',
              padding: '2px 6px',
              borderRadius: 6,
            }}
          >
            v1.0
          </span>
        </div>
      </div>

      {/* Stepper Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {steps.map((st, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={st}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 14px',
                borderRadius: 999,
                backgroundColor: isActive ? '#0A3D26' : 'rgba(10, 61, 38, 0.04)',
                color: isActive ? '#FFFFFF' : '#526058',
                fontFamily: mono,
                fontSize: 11,
                fontWeight: isActive ? 700 : 600,
                transition: 'all 0.2s ease',
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: '#A3E635',
                    boxShadow: '0 0 6px #A3E635',
                  }}
                />
              )}
              {st}
            </div>
          );
        })}
      </div>

      {/* Institution Tag */}
      <div
        style={{
          fontFamily: sans,
          fontSize: 11,
          fontWeight: 700,
          color: '#526058',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            backgroundColor: '#10B981',
          }}
        />
        MA NU Islamiyah Asembagus
      </div>
    </div>
  );
};

/* ───────── Light Browser Frame Wrapper ───────── */
const LightBrowserFrame: React.FC<{
  width?: number;
  height?: number;
  url?: string;
  badge?: string;
  children: React.ReactNode;
}> = ({
  width = 1440,
  height = 790,
  url = 'rhmt.biz.id/xiiclass',
  badge = 'LIGHT FAST-START',
  children,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid rgba(10, 61, 38, 0.12)',
        boxShadow:
          '0 32px 70px -18px rgba(10, 61, 38, 0.14), 0 10px 24px -6px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Browser Bar */}
      <div
        style={{
          height: 44,
          padding: '0 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FBF9',
          borderBottom: '1px solid rgba(10, 61, 38, 0.08)',
          flexShrink: 0,
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
            gap: 7,
            padding: '4px 18px',
            borderRadius: 999,
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(10, 61, 38, 0.1)',
            fontFamily: mono,
            fontSize: 12,
            fontWeight: 600,
            color: '#0A3D26',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#15803D" strokeWidth="2.5" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#15803D" strokeWidth="2.5" />
          </svg>
          https://{url}
        </div>

        <div
          style={{
            padding: '3px 10px',
            borderRadius: 999,
            backgroundColor: '#EAF6EE',
            border: '1px solid rgba(15, 81, 50, 0.2)',
            fontFamily: mono,
            fontSize: 10,
            fontWeight: 800,
            color: '#0A3D26',
            letterSpacing: '0.04em',
          }}
        >
          {badge}
        </div>
      </div>

      {/* Frame Screen Content */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ───────── Scene 1: Multi-Device & Quick Filter ───────── */
const KineticScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 85, mass: 1 },
  });

  const phoneSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 15, stiffness: 90, mass: 1 },
  });

  // Animated cursor path to simulate user click
  const cursorProgress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [900, 260]);
  const cursorY = interpolate(cursorProgress, [0, 1], [500, 180]);
  const isClicking = frame >= 44 && frame <= 50;

  // Counter roll
  const liveRate = interpolate(frame, [45, 90], [89.2, 94.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${enterSpring})`,
        opacity: enterSpring,
      }}
    >
      <LightBrowserFrame
        url="rhmt.biz.id/xiiclass/dashboard"
        badge="DESKTOP + MOBILE 60 FPS"
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Main Desktop Screen Video */}
          <OffthreadVideo
            src={staticFile('video/record_laptop.mp4')}
            startFrom={10}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Interactive Floating Phone Device Mockup */}
          <div
            style={{
              position: 'absolute',
              right: 42,
              bottom: 32,
              width: 250,
              height: 520,
              borderRadius: 34,
              padding: 9,
              backgroundColor: '#0A3D26',
              boxShadow:
                '0 28px 60px -12px rgba(7, 41, 25, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.25) inset',
              transform: `translateY(${interpolate(phoneSpring, [0, 1], [60, 0])}px) scale(${interpolate(phoneSpring, [0, 1], [0.92, 1])})`,
              opacity: phoneSpring,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 26,
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                position: 'relative',
              }}
            >
              <OffthreadVideo
                src={staticFile('video/record_mobile.mp4')}
                startFrom={10}
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
                  top: 7,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 44,
                  height: 9,
                  borderRadius: 999,
                  backgroundColor: '#072919',
                }}
              />
            </div>
          </div>

          {/* Floating Metric Callout on Desktop Screen */}
          <div
            style={{
              position: 'absolute',
              top: 36,
              left: 42,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(10, 61, 38, 0.15)',
              borderRadius: 18,
              padding: '12px 20px',
              boxShadow: '0 16px 36px -10px rgba(10, 61, 38, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transform: `scale(${frame >= 45 ? 1.05 : 1})`,
              transition: 'transform 0.15s ease',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#EAF6EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A3D26',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 13.5L8.5 19L21 5" stroke="#0A3D26" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#526058' }}>
                KEHADIRAN REAL-TIME
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#0A3D26',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                }}
              >
                <span>{liveRate.toFixed(1)}%</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>
                  ↑ Aktif
                </span>
              </div>
            </div>
          </div>

          {/* Animated Cursor */}
          {frame < 80 && (
            <KineticCursor x={cursorX} y={cursorY} clicking={isClicking} />
          )}
        </div>
      </LightBrowserFrame>
    </div>
  );
};

/* ───────── Scene 2: Full Excel Spreadsheet Mode ───────── */
const KineticScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  // Dynamic zoom into spreadsheet data
  const zoomScale = interpolate(frame, [0, 110], [1, 1.08], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${enterSpring})`,
        opacity: enterSpring,
      }}
    >
      <LightBrowserFrame
        url="rhmt.biz.id/xiiclass/rekap?view=excel"
        badge="EXCEL MODE · 36 SISWA"
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale(${zoomScale})`,
            transformOrigin: 'top left',
          }}
        >
          <Img
            src={staticFile('assets/erekap/xiiclass_excel_mode.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Floating Feature Pills */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              zIndex: 30,
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(10, 61, 38, 0.15)',
                borderRadius: 14,
                padding: '8px 16px',
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 800,
                color: '#0A3D26',
                boxShadow: '0 12px 28px -8px rgba(10, 61, 38, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: '#10B981',
                }}
              />
              Freeze Kolom No & Nama Siswa
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(10, 61, 38, 0.15)',
                borderRadius: 14,
                padding: '8px 16px',
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 800,
                color: '#0A3D26',
                boxShadow: '0 12px 28px -8px rgba(10, 61, 38, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: '#A3E635',
                }}
              />
              Otomatis Hitung Hadir, Sakit, Izin, Alpha
            </div>
          </div>
        </div>
      </LightBrowserFrame>
    </div>
  );
};

/* ───────── Scene 3: Formal A4 Cetak & SQLite Security ───────── */
const KineticScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 17, stiffness: 85, mass: 1 },
  });

  const stampScale = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        padding: '0 60px',
      }}
    >
      {/* Formal A4 Landscape Sheet Preview */}
      <div
        style={{
          width: 880,
          height: 620,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1.5px solid rgba(10, 61, 38, 0.14)',
          boxShadow:
            '0 28px 60px -16px rgba(10, 61, 38, 0.18), 0 0 0 1px rgba(0,0,0,0.02)',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          position: 'relative',
        }}
      >
        {/* Kop Madrasah Formal */}
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
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 900,
                  color: '#0A3D26',
                  letterSpacing: '0.04em',
                }}
              >
                KEMENTERIAN AGAMA REPUBLIK INDONESIA
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#072919',
                }}
              >
                MADRASAH ALIYAH NU ISLAMIYAH ASEMBAGUS
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  color: '#526058',
                  marginTop: 2,
                }}
              >
                Laporan Resmi Rekapitulasi Presensi Kehadiran Siswa · Tahun Ajaran 2026/2027
              </div>
            </div>
          </div>
          <div
            style={{
              padding: '4px 12px',
              borderRadius: 8,
              border: '1.5px solid #0A3D26',
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 800,
              color: '#0A3D26',
            }}
          >
            A4 LANDSCAPE
          </div>
        </div>

        {/* Mock Attendance Table Rows */}
        <div style={{ flex: 1, padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 180px repeat(6, 1fr) 80px',
              backgroundColor: '#EAF6EE',
              padding: '6px 10px',
              borderRadius: 6,
              fontFamily: mono,
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
            <span>SAB</span>
            <span style={{ textAlign: 'right' }}>% HADIR</span>
          </div>

          {[
            { no: '01', nama: 'Ahmad Fauzi', h: '100%' },
            { no: '02', nama: 'Beni Setiawan', h: '96.2%' },
            { no: '03', nama: 'Citra Dewi', h: '98.5%' },
            { no: '04', nama: 'Dian Pratama', h: '94.0%' },
            { no: '05', nama: 'Eka Lestari', h: '100%' },
          ].map((row, idx) => (
            <div
              key={row.no}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 180px repeat(6, 1fr) 80px',
                padding: '6px 10px',
                borderBottom: '1px solid rgba(10, 61, 38, 0.08)',
                fontFamily: sans,
                fontSize: 11,
                fontWeight: 600,
                color: '#0B1410',
                backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FBF9',
              }}
            >
              <span style={{ fontFamily: mono, color: '#526058' }}>{row.no}</span>
              <span style={{ fontWeight: 700 }}>{row.nama}</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ color: '#15803D' }}>H</span>
              <span style={{ fontFamily: mono, fontWeight: 800, textAlign: 'right', color: '#0A3D26' }}>
                {row.h}
              </span>
            </div>
          ))}
        </div>

        {/* Signature & Official Stamp */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(10, 61, 38, 0.1)',
            paddingTop: 12,
          }}
        >
          <div style={{ fontFamily: mono, fontSize: 10, color: '#526058' }}>
            Dokumen sah terverifikasi otomatis sistem E-Rekap v1.0
          </div>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ fontFamily: sans, fontSize: 10, color: '#526058' }}>
              Asembagus, Kepala Madrasah
            </div>
            <div style={{ height: 40 }} />
            <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 800, color: '#0A3D26' }}>
              ( Kepala MA NU Islamiyah )
            </div>
            {/* Stamp Overlap */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: -20,
                width: 90,
                height: 90,
                borderRadius: 999,
                border: '2.5px solid #0A3D26',
                color: '#0A3D26',
                fontFamily: mono,
                fontSize: 9,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                transform: `scale(${stampScale}) rotate(-12deg)`,
                opacity: 0.85,
                backgroundColor: 'rgba(163, 230, 53, 0.15)',
              }}
            >
              SAH &<br />VERIFIED
            </div>
          </div>
        </div>
      </div>

      {/* Admin Panel Feature Side Card */}
      <div
        style={{
          width: 480,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: '#0A3D26',
            color: '#FFFFFF',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 20px 45px -12px rgba(7, 41, 25, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                backgroundColor: 'rgba(163, 230, 53, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A3E635',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="#A3E635" strokeWidth="2.5" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="#A3E635" strokeWidth="2.5" />
              </svg>
            </div>
            <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 800 }}>
              Panel Admin Terenkripsi
            </div>
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: '#D1FAE5', lineHeight: 1.5, margin: 0 }}>
            Hanya Admin yang berwenang mengubah catatan absensi dan melakukan backup database.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: '22px 26px',
            border: '1.5px solid rgba(10, 61, 38, 0.12)',
            boxShadow: '0 12px 30px -8px rgba(10, 61, 38, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                backgroundColor: '#EAF6EE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A3D26',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17" stroke="#0A3D26" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M12 3V15M12 15L8 11M12 15L16 11" stroke="#0A3D26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 800, color: '#0A3D26' }}>
              Ekspor & Impor XLSX
            </div>
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: '#526058', lineHeight: 1.5, margin: 0 }}>
            Laporan rekap dapat diunduh instan dalam format spreadsheet Excel standar kantor.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ───────── Scene 4: rhmt ofc Outro & Tech Stack ───────── */
const KineticScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 85, mass: 1 },
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${popSpring})`,
        opacity: popSpring,
      }}
    >
      <div
        style={{
          width: 980,
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          border: '2px solid rgba(10, 61, 38, 0.14)',
          boxShadow:
            '0 36px 80px -20px rgba(10, 61, 38, 0.18), 0 12px 30px -8px rgba(0, 0, 0, 0.05)',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        {/* Profile Avatar & Verified Ring */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 999,
              padding: 4,
              background: 'linear-gradient(135deg, #0A3D26 0%, #A3E635 100%)',
              boxShadow: '0 12px 28px -6px rgba(10, 61, 38, 0.3)',
            }}
          >
            <Img
              src={staticFile('assets/erekap/pp-dev.webp')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 999,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 28,
              height: 28,
              borderRadius: 999,
              backgroundColor: '#10B981',
              border: '2.5px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Developer & Brand Identity */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 14px',
              borderRadius: 999,
              backgroundColor: '#EAF6EE',
              color: '#0A3D26',
              fontFamily: mono,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: 10,
            }}
          >
            DEVELOPER & ARCHITECT
          </div>
          <h2
            style={{
              fontFamily: sans,
              fontSize: 34,
              fontWeight: 900,
              color: '#0A3D26',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Rohmatulloh · <span style={{ color: '#15803D' }}>rhmt ofc</span>
          </h2>
          <p
            style={{
              fontFamily: mono,
              fontSize: 15,
              fontWeight: 700,
              color: '#526058',
              margin: 0,
            }}
          >
            Portfolio: rhmt.biz.id · E-Rekap v1.0
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {['Next.js 16 (Turbopack)', 'SQLite Database', 'Remotion 4 Engine', 'Tailwind CSS'].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 999,
                  backgroundColor: '#F8FBF9',
                  border: '1px solid rgba(10, 61, 38, 0.12)',
                  color: '#0A3D26',
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Action Button */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#0A3D26',
            color: '#A3E635',
            padding: '12px 28px',
            borderRadius: 999,
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 800,
            boxShadow: '0 12px 24px -6px rgba(10, 61, 38, 0.4)',
          }}
        >
          <span>Kunjungi rhmt.biz.id/xiiclass</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ───────── Main Kinetic Video Composition ───────── */
export const ERekapKineticTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  // Active scene index: 4 scenes evenly distributed across 480 frames (120 frames each)
  const sceneIdx = Math.min(3, Math.floor(frame / 120));

  const subtitles = [
    'Platform multi-perangkat real-time — pantau kehadiran siswa dari HP maupun desktop.',
    'Mode spreadsheet Excel layar penuh — audit kehadiran 36 siswa cepat dan terstruktur.',
    'Format formal A4 Kop Madrasah — siap cetak dan ekspor backup spreadsheet satu ketukan.',
    'Dirancang dengan dedikasi tinggi oleh rhmt ofc — kunjungi rhmt.biz.id.',
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F1F5F2',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Precision Dot Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(10, 61, 38, 0.08) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient Gentle Glows */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 600,
          height: 600,
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 700,
          height: 700,
          borderRadius: 999,
          background: 'radial-gradient(circle, rgba(10, 61, 38, 0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Upbeat Ambient BGM */}
      <Audio
        src={staticFile('audio/chip-music-bed.mp3')}
        volume={(f) =>
          interpolate(f, [0, 20, 450, 480], [0, 0.45, 0.45, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        }
      />

      {/* Synchronized SFX Cues */}
      {SFX_EVENTS.map((ev, i) => (
        <Sequence key={i} from={ev.frame} durationInFrames={30}>
          <Audio
            src={staticFile(`audio/sfx-erekap/${ev.sfx}.wav`)}
            volume={0.5}
          />
        </Sequence>
      ))}

      {/* Top Header Stepper */}
      <TeaserHeader activeIndex={sceneIdx} />

      {/* Center Stage Sequences */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 0,
          right: 0,
          bottom: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Sequence from={0} durationInFrames={120}>
          <KineticScene1 />
        </Sequence>

        <Sequence from={120} durationInFrames={120}>
          <KineticScene2 />
        </Sequence>

        <Sequence from={240} durationInFrames={120}>
          <KineticScene3 />
        </Sequence>

        <Sequence from={360} durationInFrames={120}>
          <KineticScene4 />
        </Sequence>
      </div>

      {/* Bottom Subtitle Karaoke Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 24px',
          borderRadius: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(14px)',
          border: '1.5px solid rgba(10, 61, 38, 0.12)',
          boxShadow: '0 12px 30px -8px rgba(10, 61, 38, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 960,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: '#A3E635',
            boxShadow: '0 0 8px #A3E635',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 700,
            color: '#0A3D26',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {subtitles[sceneIdx]}
        </span>
      </div>
    </AbsoluteFill>
  );
};
