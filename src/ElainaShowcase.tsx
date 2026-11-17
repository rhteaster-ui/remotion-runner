import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ElainaPresenterAnchor, ElainaGesture} from './components/ElainaPresenterAnchor';
import {FONT} from './theme-tokens';

export const ElainaShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // 6 Stages, 75 frames (2.5 seconds) each = 450 frames total (15s)
  // 1. 0 - 75: Idle & Natural Wind Physics
  // 2. 75 - 150: Smug / Proud (Khas Elaina)
  // 3. 150 - 225: Thinking / Curious
  // 4. 225 - 300: AHA! Idea / Magic Burst
  // 5. 300 - 375: Point Up (Menunjuk kode/terminal)
  // 6. 375 - 450: Alert / Warning (Deteksi bug/celah)
  let gesture: ElainaGesture = 'idle';
  let stateTitle = '1. IDLE & NATURAL WIND PHYSICS';
  let stateDesc = 'Napas organik multi-layer, osilasi vertikal lembut, kedip mata prosedural, dan lambaian angin pada rambut & jubah.';
  let stateColor = '#c084fc';
  let speech = 'Halo, Tuan Rahmat! Saya Elaina, asisten presenter video Remotion Tuan.';

  const gestureFrame = frame % 75;

  if (frame >= 75 && frame < 150) {
    gesture = 'smug';
    stateTitle = '2. SMUG & CONFIDENT POSE';
    stateDesc = 'Dagu sedikit terangkat bangga, senyum percaya diri khas Sang Penyihir Pengelana. Gambar berganti otomatis.';
    stateColor = '#facc15';
    speech = 'Siap membedah arsitektur kode atau fitur baru dengan sempurna!';
  } else if (frame >= 150 && frame < 225) {
    gesture = 'thinking';
    stateTitle = '3. THINKING & CURIOUS TILT';
    stateDesc = 'Kemiringan kepala rasa ingin tahu (-5.5°) dan partikel pemikiran magis.';
    stateColor = '#38bdf8';
    speech = 'Hmm, mari kita bedah logika sistem ini secara mendalam...';
  } else if (frame >= 225 && frame < 300) {
    gesture = 'idea';
    stateTitle = '4. AHA! IDEA & MAGIC BURST';
    stateDesc = 'Anticipation squat diikuti lonjakan pegas antusiasme dan semburan stardust.';
    stateColor = '#a855f7';
    speech = 'AHA! Solusi optimalnya sudah ditemukan!';
  } else if (frame >= 300 && frame < 375) {
    gesture = 'point_up';
    stateTitle = '5. POINTING — DIRECTING ATTENTION';
    stateDesc = 'Elaina menunjuk ke arah terminal/kode di atasnya. Pose mengarahkan fokus audiens.';
    stateColor = '#34d399';
    speech = 'Perhatikan bagian ini — kunci utama arsitekturnya ada di sini.';
  } else if (frame >= 375) {
    gesture = 'alert';
    stateTitle = '6. ALERT — BUG DETECTED!';
    stateDesc = 'Getaran seismik kaget, topi sedikit terangkat, ring peringatan merah berdenyut.';
    stateColor = '#ef4444';
    speech = 'BAHAYA! Celah keamanan terdeteksi di endpoint ini!';
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
        padding: '80px 48px',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background Magic Grid & Dynamic Reactive Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 75% 70%, ${stateColor}22 0%, transparent 60%), radial-gradient(circle at 25% 30%, rgba(168, 85, 247, 0.12) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Card: Professional Technical Header */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 18px',
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: stateColor,
              boxShadow: `0 0 10px ${stateColor}`,
            }}
          />
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: 'uppercase' as const,
              color: '#e2e8f0',
              fontWeight: 700,
            }}
          >
            REMOTION PRESENTER — ELAINA ENGINE V2
          </span>
        </div>

        <h1
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -1.5,
            textAlign: 'center',
            margin: 0,
            color: '#f8fafc',
          }}
        >
          {stateTitle}
        </h1>

        <p
          style={{
            fontSize: 20,
            color: '#cbd5e1',
            maxWidth: 820,
            textAlign: 'center',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {stateDesc}
        </p>
      </div>

      {/* Center Anchor & Character */}
      <ElainaPresenterAnchor
        gesture={gesture}
        gestureFrame={gestureFrame}
        speechText={speech}
        size={360}
        side="center"
        positionMode="centered"
        mode="bust"
        showMagicParticles={true}
        enableBlink={true}
      />

      {/* Bottom Timeline Indicator */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: FONT.mono,
            fontSize: 14,
            color: '#64748b',
          }}
        >
          <span>PROGRESS: FRAME {frame} / 450</span>
          <span>FPS: {fps} — BLINK + PHYSICS + GESTURE ASSETS</span>
        </div>
        <div
          style={{
            width: '100%',
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(frame / 450) * 100}%`,
              height: '100%',
              backgroundColor: stateColor,
              boxShadow: `0 0 12px ${stateColor}`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
