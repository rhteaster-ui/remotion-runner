import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {ElainaGptAnchor, ElainaGptGesture} from '../components/ElainaGptAnchor';
import {FONT} from '../theme-tokens';

/* ============================================================================
   SCENE 1: HOOK (Dark — JavaScript: The Most Absurd Language)
   ============================================================================ */
export const JS1HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isIntro = t >= 0;
  const isNinetyPercent = t >= 4.0;
  const isAbsurd = t >= 7.8;

  let gesture: ElainaGptGesture = 'finger_gun';
  let gStart = 0;
  if (isAbsurd) {
    gesture = 'chin_rest';
    gStart = Math.round(7.8 * fps);
  } else if (isNinetyPercent) {
    gesture = 'excited';
    gStart = Math.round(4.0 * fps);
  }

  const logoFloat = Math.sin(frame / 22) * 8;
  const logoRot = Math.sin(frame / 36) * 2;

  const pulse = spring({
    frame,
    fps,
    config: {damping: 15, mass: 0.8},
  });

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={5} />

      <BendaHook
        mode="dark"
        lead={isNinetyPercent ? 'Dipakai 90% Website di Dunia:' : 'Bahasa Pemrograman Paling Janggal:'}
        anchorText={isNinetyPercent ? '90% WEB DI BUMI' : 'JAVASCRIPT'}
        accent="#F7DF1E"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#F7DF1E"
        counterTop={isAbsurd ? 'ABSURD' : '01 / 05'}
        counterSub={isAbsurd ? 'logika nyeleneh' : 'misteri browser'}
        nodes={[
          {label: 'HOOK', active: true},
          {label: '1+1=11'},
          {label: 'NaN'},
          {label: '[] + {}'},
          {label: 'TYPESCRIPT'},
        ]}
      />

      {/* Center Stage (Y: 460..1280) */}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 480,
          height: 720,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Glowing JS Brand Core Card */}
        <div
          style={{
            position: 'relative',
            width: 320,
            height: 320,
            borderRadius: 44,
            background: 'linear-gradient(145deg, #18181b, #09090b)',
            border: '2px solid rgba(247, 223, 30, 0.45)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 60px rgba(247, 223, 30, 0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(${logoFloat}px) rotate(${logoRot}deg) scale(${pulse})`,
          }}
        >
          <Img
            src={staticFile('assets/javascript.svg')}
            style={{width: 200, height: 200, borderRadius: 24}}
          />
        </div>

        {/* Spec Pill */}
        <div
          style={{
            padding: '12px 28px',
            borderRadius: 100,
            backgroundColor: 'rgba(247, 223, 30, 0.12)',
            border: '1.5px solid rgba(247, 223, 30, 0.65)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 20,
              color: '#FEF08A',
              letterSpacing: '0.04em',
            }}
          >
            ECMA-262 · DIBIKIN CUMA 10 HARI (1995)
          </span>
        </div>

        {/* Dynamic Roast Callout */}
        <div
          style={{
            width: 740,
            padding: '24px 32px',
            borderRadius: 22,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 28,
              color: '#E2E8F0',
              lineHeight: 1.45,
            }}
          >
            {isAbsurd
              ? 'Lebih aneh dari yang kita bayangkan... Setiap aturan normal dibikin kebalik!'
              : 'Bahasa tulang punggung seluruh internet, tapi kelakuannya paling bikin heran.'}
          </p>
        </div>
      </div>

      {/* Elaina Presenter Anchor (Side Right, Anchored above Subtitles, No Shake) */}
      <ElainaGptAnchor
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="right"
        theme="dark"
        size={380}
        bottomOffset={250}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: 1 + '1' = 11 & STRUK MINIMARKET (Light Theme)
   ============================================================================ */
export const JS2AngkaTeksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isEleven = t >= 4.0;
  const isKasir = t >= 7.8;
  const isRugiBandar = t >= 15.5;

  let gesture: ElainaGptGesture = 'finger_gun';
  let gStart = 0;
  if (isRugiBandar) {
    gesture = 'excited'; // shocked / fists clenched "Rugi bandar lu!"
    gStart = Math.round(15.5 * fps);
  } else if (isKasir) {
    gesture = 'chin_rest';
    gStart = Math.round(7.8 * fps);
  } else if (isEleven) {
    gesture = 'arms_crossed';
    gStart = Math.round(4.0 * fps);
  }

  const stampScale = spring({
    frame: Math.max(0, frame - Math.round(15.5 * fps)),
    fps,
    config: {damping: 12, stiffness: 220, mass: 0.7},
  });

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={5} />

      <BendaHook
        mode="light"
        lead={isKasir ? 'Kasir Minimarket Pakai JavaScript:' : 'Tipe Data Angka Ditambah Teks:'}
        anchorText={isEleven ? "1 + '1' = '11'" : '1 + 1 BUKAN 2?!'}
        accent="#0284c7"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop={isRugiBandar ? 'RUGI' : '02 / 05'}
        counterSub={isRugiBandar ? 'sejuta seribu' : 'string coercion'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: '1+1=11', active: true},
          {label: 'NaN'},
          {label: '[] + {}'},
          {label: 'TYPESCRIPT'},
        ]}
      />

      {/* Center Stage (Y: 460..1280) */}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 470,
          height: 740,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 26,
        }}
      >
        {/* Comparison Code Pill */}
        <div
          style={{
            width: 740,
            borderRadius: 24,
            backgroundColor: '#0F172A',
            border: '2px solid #1E293B',
            boxShadow: '0 20px 48px rgba(15, 23, 42, 0.16)',
            padding: '24px 32px',
            fontFamily: FONT.mono,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16}}>
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#EF4444'}} />
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#F59E0B'}} />
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10B981'}} />
            <span style={{marginLeft: 12, fontSize: 16, color: '#94A3B8', fontWeight: 600}}>
              node:repl — Type Coercion Anomaly
            </span>
          </div>
          <div style={{fontSize: 26, color: '#94A3B8', marginBottom: 12}}>
            &gt; <span style={{color: '#F8FAFC'}}>1 + 1</span>
            <span style={{color: '#10B981', marginLeft: 28}}>// 2 (Bahasa waras)</span>
          </div>
          <div style={{fontSize: 28, fontWeight: 700, color: '#F8FAFC'}}>
            &gt; 1 + <span style={{color: '#FEF08A'}}>'1'</span>
            <span style={{color: '#F87171', marginLeft: 28}}>// '11' (JavaScript)</span>
          </div>
        </div>

        {/* Receipt Simulation Card */}
        <div
          style={{
            position: 'relative',
            width: 740,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            border: '2px dashed #94A3B8',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            padding: '26px 36px',
            fontFamily: FONT.mono,
          }}
        >
          <div style={{textAlign: 'center', borderBottom: '2px dashed #E2E8F0', paddingBottom: 14, marginBottom: 16}}>
            <div style={{fontWeight: 800, fontSize: 24, color: '#0F172A'}}>MINIMARKET JAVASCRIPT</div>
            <div style={{fontSize: 15, color: '#64748B'}}>Jl. Coercion No. 11 · Kasir: Puck (AI)</div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#334155', marginBottom: 10}}>
            <span>Total Belanjaan (Number)</span>
            <span>Rp 1.000</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#334155', marginBottom: 16}}>
            <span>Karcis Parkir (String '1.000')</span>
            <span style={{color: '#2563EB'}}>+ '1.000'</span>
          </div>

          <div
            style={{
              borderTop: '2.5px solid #0F172A',
              paddingTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 800,
              fontSize: 28,
              color: '#0F172A',
            }}
          >
            <span>TOTAL TAGIHAN</span>
            <span style={{color: '#DC2626'}}>Rp 1.000.1000</span>
          </div>

          {/* Stamp Rugi Bandar */}
          {isRugiBandar && (
            <div
              style={{
                position: 'absolute',
                top: 50,
                right: 36,
                padding: '10px 26px',
                border: '4.5px solid #DC2626',
                borderRadius: 12,
                color: '#DC2626',
                fontFamily: FONT.sans,
                fontWeight: 900,
                fontSize: 32,
                letterSpacing: '0.08em',
                transform: `rotate(-14deg) scale(${stampScale})`,
                boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
                backgroundColor: 'rgba(254, 226, 226, 0.98)',
              }}
            >
              RUGI BANDAR!
            </div>
          )}
        </div>
      </div>

      {/* Elaina Presenter Anchor (Side Left, Anchored above Subtitles) */}
      <ElainaGptAnchor
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="left"
        theme="light"
        size={380}
        bottomOffset={250}
      />
    </AbsoluteFill>
  );
};
