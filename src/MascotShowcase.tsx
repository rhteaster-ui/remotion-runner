import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgencyPresenterAnchor, MascotGesture} from './components/AgencyPresenterAnchor';
import {FONT} from './theme-tokens';

export const MascotShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 5 Stages, 75 frames (2.5 seconds) each = 375 frames total (12.5s)
  // 1. 0 - 75: Idle & Natural Blinking (Melayang halus & kedip natural)
  // 2. 75 - 150: Ide Baru & Lampu Menyala (Lampu neon kuning terintegrasi & pancaran energi)
  // 3. 150 - 225: Perspektif 3D Bolak-balik (Menoleh kiri-kanan dengan yaw 3D & paralaks mata)
  // 4. 225 - 300: 360° Jump & Spin (Lompat kinetik akrobatik tinggi + putaran 360°)
  // 5. 300 - 375: Buoyant Smile & Victory (^^) (Pantulan gembira & mata bulan sabit)
  let gesture: MascotGesture = 'idle';
  let stateTitle = '1. IDLE & NATURAL BLINKING';
  let stateDesc = 'Melayang halus dengan pernapasan multi-harmonic & kedip mata natural.';
  let stateColor = '#a3e635';

  const gestureFrame = frame % 75;

  if (frame >= 75 && frame < 150) {
    gesture = 'idea';
    stateTitle = '2. IDE BARU & LAMPU MENYALA';
    stateDesc = 'Anticipation tersentak AHA! dengan lampu neon keemasan terintegrasi & pendaran cahaya alami.';
    stateColor = '#facc15';
  } else if (frame >= 150 && frame < 225) {
    gesture = 'peek_3d';
    stateTitle = '3. PERSPEKTIF 3D BOLAK-BALIK';
    stateDesc = 'Menoleh ke kiri dan kanan dengan yaw 3D halus, paralaks mata di dalam visor, & kilap cahaya cembung.';
    stateColor = '#06b6d4';
  } else if (frame >= 225 && frame < 300) {
    gesture = 'jump_spin';
    stateTitle = '4. LOMPAT & BERPUTAR 360°';
    stateDesc = 'Lompatan akrobatik berbobot: ancang-ancang menekan, melesat berputar 360°, & pendaratan empuk.';
    stateColor = '#ec4899';
  } else if (frame >= 300) {
    gesture = 'thumbs_up';
    stateTitle = '5. BUOYANT SMILE (^^)';
    stateDesc = 'Pantulan riang gembira dengan mata tersenyum bulan sabit glowing & kilau bintang halus.';
    stateColor = '#84cc16';
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0b0b0d',
        fontFamily: FONT.sans,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 40px',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Grid & Dynamic Reactive Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 50% 48%, ${stateColor}15 0%, transparent 65%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          pointerEvents: 'none',
          transition: 'background-image 0.4s ease',
        }}
      />

      {/* Top Header Anchor */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 20px',
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: stateColor,
              boxShadow: `0 0 14px ${stateColor}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#f8fafc',
            }}
          >
            RHMT OFC · MASCOT 3D MOTION ENGINE V2
          </span>
        </div>

        {/* Dynamic State Title */}
        <div
          style={{
            fontFamily: FONT.space,
            fontSize: 28,
            fontWeight: 800,
            color: stateColor,
            textShadow: `0 0 24px ${stateColor}88`,
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}
        >
          {stateTitle}
        </div>
      </div>

      {/* Main Mascot Stage (Centered Prominently) */}
      <div
        style={{
          zIndex: 10,
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <AgencyPresenterAnchor
          gesture={gesture}
          gestureFrame={gestureFrame}
          size={500}
          positionMode="centered"
          theme="dark"
        />
      </div>

      {/* Bottom Forensic Description Card */}
      <div
        style={{
          zIndex: 10,
          backgroundColor: 'rgba(18, 18, 22, 0.88)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          borderRadius: 22,
          padding: '22px 32px',
          maxWidth: 760,
          width: '92%',
          textAlign: 'center',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.65)',
          marginBottom: 30,
        }}
      >
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            lineHeight: 1.5,
            color: '#f1f5f9',
            margin: 0,
            fontWeight: 600,
          }}
        >
          {stateDesc}
        </p>
      </div>
    </AbsoluteFill>
  );
};
