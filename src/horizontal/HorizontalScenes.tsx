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
import { EREKAP_FONT, EREKAP_TOKENS as T } from '../lib/erekapTokens';

const sans = EREKAP_FONT.sans;
const mono = EREKAP_FONT.mono;

/* ───────── Horizontal Laptop Mockup ───────── */
export const HorizontalLaptopMockup: React.FC<{
  width?: number;
  videoSrc?: string;
  imgSrc?: string;
  startFrom?: number;
  url?: string;
  badge?: string;
  style?: React.CSSProperties;
}> = ({
  width = 1120,
  videoSrc = 'video/record_laptop.mp4',
  imgSrc,
  startFrom = 0,
  url = 'rhmt.biz.id/xiiclass',
  badge = 'DESKTOP LIVE',
  style,
}) => {
  const chromeH = 46;
  const videoH = Math.round(width * (900 / 1440));

  return (
    <div
      style={{
        position: 'relative',
        width,
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: '#072919',
        border: '2px solid rgba(163, 230, 53, 0.4)',
        boxShadow:
          '0 36px 80px -16px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
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
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 600,
            color: '#E7F5EC',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: '#A3E635',
              boxShadow: '0 0 6px #A3E635',
            }}
          />
          {url}
        </div>

        <div
          style={{
            padding: '3px 10px',
            borderRadius: 999,
            backgroundColor: 'rgba(163, 230, 53, 0.18)',
            border: '1px solid rgba(163, 230, 53, 0.45)',
            fontFamily: mono,
            fontSize: 11,
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
      </div>
    </div>
  );
};

/* ───────── Horizontal Phone Mockup ───────── */
export const HorizontalPhoneMockup: React.FC<{
  width?: number;
  startFrom?: number;
  style?: React.CSSProperties;
}> = ({ width = 290, startFrom = 0, style }) => {
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
        borderRadius: 38,
        background: 'linear-gradient(155deg, #134E33 0%, #072919 60%, #04190F 100%)',
        border: '2px solid rgba(163, 230, 53, 0.45)',
        boxShadow:
          '0 32px 70px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: innerW,
          height: innerH,
          borderRadius: 28,
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
        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 50,
            height: 10,
            borderRadius: 999,
            backgroundColor: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    </div>
  );
};

/* ───────── Scene 1: Hook & Dual Multi-Perangkat ───────── */
export const HorizontalScene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const laptopSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 75, mass: 1 },
  });

  const phoneSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  const laptopX = interpolate(laptopSpring, [0, 1], [-180, 0]);
  const phoneX = interpolate(phoneSpring, [0, 1], [180, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          width: '100%',
          maxWidth: 1600,
          margin: '0 auto',
        }}
      >
        {/* Laptop Preview (Left Stage) */}
        <div
          style={{
            transform: `translate3d(${laptopX}px, 0, 0) scale(${interpolate(laptopSpring, [0, 1], [0.92, 1])})`,
            opacity: laptopSpring,
            willChange: 'transform, opacity',
          }}
        >
          <HorizontalLaptopMockup width={1020} startFrom={0} badge="DESKTOP APP" />
        </div>

        {/* Mobile Phone Preview (Right Stage) */}
        <div
          style={{
            transform: `translate3d(${phoneX}px, 0, 0) scale(${interpolate(phoneSpring, [0, 1], [0.9, 1])})`,
            opacity: phoneSpring,
            willChange: 'transform, opacity',
          }}
        >
          <HorizontalPhoneMockup width={270} startFrom={0} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Scene 2: Dashboard & Rolling Counter ───────── */
export const HorizontalScene2Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 85, mass: 1 },
  });

  const zoomScale = interpolate(frame, [0, 120], [1, 1.05], {
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
      }}
    >
      <div
        style={{
          transform: `scale(${popSpring * zoomScale})`,
          opacity: popSpring,
          willChange: 'transform, opacity',
        }}
      >
        <HorizontalLaptopMockup
          width={1240}
          startFrom={120}
          url="rhmt.biz.id/xiiclass/dashboard"
          badge="DASHBOARD REAL-TIME"
        />
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Scene 3: Mode Full Excel & Spreadsheet ───────── */
export const HorizontalScene3Excel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 75, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          transform: `scale(${enterSpring})`,
          opacity: enterSpring,
          willChange: 'transform, opacity',
        }}
      >
        <HorizontalLaptopMockup
          width={1280}
          imgSrc="assets/erekap/xiiclass_excel_mode.png"
          url="rhmt.biz.id/xiiclass/rekap?view=excel"
          badge="EXCEL SPREADSHEET FULL-SCREEN"
        />
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Scene 4: Panel Admin & Cetak A4 Landscape ───────── */
export const HorizontalScene4Export: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSpring = spring({
    frame,
    fps,
    config: { damping: 17, stiffness: 80, mass: 1 },
  });

  const rightSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 17, stiffness: 80, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 60,
      }}
    >
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
        {/* Left: Admin Authentication & Management */}
        <div
          style={{
            transform: `translate3d(${interpolate(leftSpring, [0, 1], [-120, 0])}px, 0, 0)`,
            opacity: leftSpring,
            willChange: 'transform, opacity',
          }}
        >
          <HorizontalLaptopMockup
            width={740}
            imgSrc="assets/erekap/real_admin_panel.png"
            url="rhmt.biz.id/xiiclass/admin"
            badge="PANEL ADMIN TERPROTEKSI"
          />
        </div>

        {/* Right: Formal A4 Landscape Print View */}
        <div
          style={{
            transform: `translate3d(${interpolate(rightSpring, [0, 1], [120, 0])}px, 0, 0)`,
            opacity: rightSpring,
            willChange: 'transform, opacity',
          }}
        >
          <HorizontalLaptopMockup
            width={740}
            imgSrc="assets/erekap/real_desktop_rekap.png"
            url="rhmt.biz.id/xiiclass/rekap?print=true"
            badge="FORMAT FORMAL A4 SIAP CETAK"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Scene 5: Outro & Personal Branding RHMT OFC ───────── */
export const HorizontalScene5Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 70,
      }}
    >
      <div
        style={{
          transform: `scale(${cardSpring})`,
          opacity: cardSpring,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '44px 64px',
          borderRadius: 32,
          backgroundColor: 'rgba(7, 41, 25, 0.88)',
          border: '2px solid rgba(163, 230, 53, 0.45)',
          boxShadow:
            '0 32px 80px -16px rgba(0, 0, 0, 0.75), 0 0 40px rgba(163, 230, 53, 0.15)',
          backdropFilter: 'blur(20px)',
          textAlign: 'center',
          maxWidth: 880,
        }}
      >
        {/* Profile Picture with glowing halo */}
        <div
          style={{
            width: 104,
            height: 104,
            borderRadius: 24,
            padding: 3,
            background: 'linear-gradient(135deg, #A3E635, #115737, #072919)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 24px rgba(163, 230, 53, 0.35)',
            marginBottom: 20,
          }}
        >
          <Img
            src={staticFile('assets/erekap/pp-dev.webp')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 21,
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Developer Tagline */}
        <span
          style={{
            fontFamily: mono,
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#A3E635',
            backgroundColor: 'rgba(163, 230, 53, 0.14)',
            padding: '4px 14px',
            borderRadius: 999,
            border: '1px solid rgba(163, 230, 53, 0.35)',
            marginBottom: 12,
          }}
        >
          Pelajar MA • Web & Agentic Developer
        </span>

        <h2
          style={{
            fontFamily: sans,
            fontSize: 34,
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '0 0 6px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Rohmatulloh <span style={{ color: '#A3E635' }}>(R_HMT OFC)</span>
        </h2>

        <p
          style={{
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(231, 245, 236, 0.75)',
            margin: '0 0 24px 0',
          }}
        >
          Personal Branding Resmi: <strong style={{ color: '#FFFFFF' }}>rhmt ofc</strong> •
          Indonesia
        </p>

        {/* Links / Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: '#A3E635',
              color: '#072919',
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 800,
              boxShadow: '0 8px 20px rgba(163, 230, 53, 0.4)',
            }}
          >
            rhmt.biz.id
          </div>

          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            github.com/rhmt-ofc
          </div>

          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(163, 230, 53, 0.15)',
              color: '#BEF264',
              border: '1px solid rgba(163, 230, 53, 0.35)',
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            TikTok @rhmtofc
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
