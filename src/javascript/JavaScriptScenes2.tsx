import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {ElainaGptAnchor, ElainaGptGesture} from '../components/ElainaGptAnchor';
import {FONT} from '../theme-tokens';

/* ============================================================================
   SCENE 3: TYPEOF NAN & ES TEH MANIS (Dark Theme)
   ============================================================================ */
export const JS3NanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isTypeOf = t >= 11.5;
  const isEsTeh = t >= 22.0;
  const isJanggal = t >= 32.0;

  let gesture: ElainaGptGesture = 'chin_rest';
  let gStart = 0;
  if (isJanggal) {
    gesture = 'arms_crossed';
    gStart = Math.round(32.0 * fps);
  } else if (isEsTeh) {
    gesture = 'chin_rest';
    gStart = Math.round(22.0 * fps);
  } else if (isTypeOf) {
    gesture = 'excited';
    gStart = Math.round(11.5 * fps);
  }

  const pulse = 1 + Math.sin(frame / 16) * 0.03;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={5} />

      <BendaHook
        mode="dark"
        lead={isEsTeh ? 'Analogi Pesan Minuman di Warteg:' : 'Not a Number Tapi Tipe Datanya:'}
        anchorText={isEsTeh ? 'BUKAN ES TEH' : 'TYPEOF NAN === NUMBER'}
        accent="#F59E0B"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#F59E0B"
        counterTop={isEsTeh ? 'ES TEH' : '03 / 05'}
        counterSub={isEsTeh ? 'tipenya es teh' : 'paradoks tipe data'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: '1+1=11', done: true},
          {label: 'NaN', active: true},
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
        {/* Terminal REPL */}
        <div
          style={{
            width: 740,
            borderRadius: 24,
            backgroundColor: '#0F172A',
            border: '2px solid rgba(245, 158, 11, 0.55)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.18)',
            padding: '26px 34px',
            fontFamily: FONT.mono,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16}}>
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#EF4444'}} />
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#F59E0B'}} />
            <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10B981'}} />
            <span style={{marginLeft: 12, fontSize: 16, color: '#94A3B8', fontWeight: 600}}>
              ECMA IEEE-754 Paradox
            </span>
          </div>

          <div style={{fontSize: 26, color: '#94A3B8', marginBottom: 12}}>
            &gt; <span style={{color: '#F8FAFC'}}>NaN === NaN</span>
            <span style={{color: '#F87171', marginLeft: 28}}>// false (Gak kenal dirinya sendiri)</span>
          </div>
          <div style={{fontSize: 28, fontWeight: 700, color: '#F8FAFC', marginBottom: 8}}>
            &gt; <span style={{color: '#38BDF8'}}>typeof</span> NaN
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#FBBF24',
              backgroundColor: 'rgba(245, 158, 11, 0.18)',
              padding: '10px 22px',
              borderRadius: 10,
              display: 'inline-block',
              transform: `scale(${isTypeOf ? pulse : 1})`,
            }}
          >
            &lt; 'number' (Bukan angka tapi angka?!)
          </div>
        </div>

        {/* Analogi Es Teh Card */}
        <div
          style={{
            width: 740,
            borderRadius: 22,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            padding: '24px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 18,
              backgroundColor: 'rgba(245, 158, 11, 0.18)',
              border: '2px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 46,
              flexShrink: 0,
            }}
          >
            🍹
          </div>
          <div style={{fontFamily: FONT.sans}}>
            <div style={{fontWeight: 800, fontSize: 24, color: '#F8FAFC', marginBottom: 6}}>
              Warung Es Teh JavaScript:
            </div>
            <div style={{fontSize: 20, color: '#CBD5E1', lineHeight: 1.45}}>
              "Mas, ini bukan es teh ya... Tapi tipenya es teh."
              <span style={{display: 'block', color: '#FBBF24', fontWeight: 700, marginTop: 4}}>
                Bete banget gak tuh? Janggal abis!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elaina Presenter Anchor (Side Right on Dark Theme) */}
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
   SCENE 4: [] + {} VS {} + [] (Light Theme)
   ============================================================================ */
export const JS4ArrayObjekScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isBedaHasil = t >= 6.5;
  const isMartabak = t >= 12.0;
  const isSemen = t >= 18.0;

  let gesture: ElainaGptGesture = 'arms_crossed';
  let gStart = 0;
  if (isSemen) {
    gesture = 'excited'; // shocked / stres programmernya
    gStart = Math.round(18.0 * fps);
  } else if (isMartabak) {
    gesture = 'chin_rest';
    gStart = Math.round(12.0 * fps);
  } else if (isBedaHasil) {
    gesture = 'arms_crossed';
    gStart = Math.round(6.5 * fps);
  }

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={5} />

      <BendaHook
        mode="light"
        lead={isMartabak ? 'Resep Martabak Versi JavaScript:' : 'Bolak-Balik Kok Beda Hasil?!'}
        anchorText={isSemen ? 'JADI SEMEN 3 RODA' : '[] + {} !== {} + []'}
        accent="#DC2626"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#DC2626"
        counterTop={isSemen ? 'STRES' : '04 / 05'}
        counterSub={isSemen ? 'resep rusak' : 'komutatif gagal'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: '1+1=11', done: true},
          {label: 'NaN', done: true},
          {label: '[] + {}', active: true},
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
          gap: 24,
        }}
      >
        {/* Split Comparison Cards */}
        <div style={{display: 'flex', gap: 24, width: 740}}>
          {/* Card A */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '24px 26px',
              border: '2px solid #CBD5E1',
              boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)',
              fontFamily: FONT.mono,
            }}
          >
            <div style={{fontSize: 16, color: '#64748B', fontWeight: 700, marginBottom: 10}}>
              KASUS A (Array + Objek)
            </div>
            <div style={{fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 12}}>
              [] + {}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#2563EB',
                backgroundColor: '#EFF6FF',
                padding: '10px 16px',
                borderRadius: 10,
              }}
            >
              "[object Object]"
            </div>
          </div>

          {/* Card B */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '24px 26px',
              border: '2px solid #FCA5A5',
              boxShadow: '0 12px 28px rgba(220, 38, 38, 0.1)',
              fontFamily: FONT.mono,
            }}
          >
            <div style={{fontSize: 16, color: '#DC2626', fontWeight: 700, marginBottom: 10}}>
              KASUS B (DIBALIK)
            </div>
            <div style={{fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 12}}>
              {} + []
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#DC2626',
                backgroundColor: '#FEF2F2',
                padding: '8px 16px',
                borderRadius: 10,
              }}
            >
              0 (NOL!)
            </div>
          </div>
        </div>

        {/* Resep Martabak Absurd Card */}
        <div
          style={{
            width: 740,
            backgroundColor: '#0F172A',
            borderRadius: 24,
            border: '2px solid #1E293B',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.18)',
            padding: '26px 32px',
            fontFamily: FONT.sans,
            color: '#F8FAFC',
          }}
        >
          <div style={{fontWeight: 800, fontSize: 22, color: '#FACC15', marginBottom: 14}}>
            RESEP MARTABAK versi JAVASCRIPT:
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, marginBottom: 12}}>
            <span>🥚 Telor + 🌾 Terigu</span>
            <span style={{fontWeight: 700, color: '#4ADE80'}}>🥞 Jadi Martabak Manis</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, color: '#F87171', fontWeight: 700}}>
            <span>🌾 Terigu + 🥚 Telor</span>
            <span style={{color: '#F87171'}}>🧱 Jadi Semen 3 Roda 40kg!</span>
          </div>
        </div>
      </div>

      {/* Elaina Presenter Anchor (Side Left on Light Theme) */}
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

/* ============================================================================
   SCENE 5: TOMBOL 1 PIXEL & TYPESCRIPT OUTRO (Dark Theme)
   ============================================================================ */
export const JS5TypescriptOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isButtonChaos = t < 7.5;
  const isTypeScript = t >= 7.5 && t < 15.5;
  const isOutro = t >= 15.5;

  let gesture: ElainaGptGesture = 'excited';
  let gStart = 0;
  if (isOutro) {
    gesture = 'double_peace';
    gStart = Math.round(15.5 * fps);
  } else if (isTypeScript) {
    gesture = 'finger_gun';
    gStart = Math.round(7.5 * fps);
  }

  // Floating navbar going to space
  const navFly = isButtonChaos ? -interpolate(t, [2.5, 6.5], [0, 160], {extrapolateRight: 'clamp'}) : 0;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={5} />

      <BendaHook
        mode="dark"
        lead={isOutro ? 'Kreator & DevOps Resmi:' : isTypeScript ? 'Solusi Programmer Jaman Now:' : 'Geser Tombol 1 Pixel di CSS:'}
        anchorText={isOutro ? 'RHMT OFC · BIZ.ID' : isTypeScript ? 'TYPESCRIPT' : 'NAVBAR TERBANG KE ORBIT'}
        accent={isOutro ? '#F7DF1E' : isTypeScript ? '#3178C6' : '#EF4444'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={isOutro ? '#F7DF1E' : '#3178C6'}
        counterTop={isOutro ? 'RESMI' : '05 / 05'}
        counterSub={isOutro ? 'rhmt.biz.id' : 'dimarahin komputer'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: '1+1=11', done: true},
          {label: 'NaN', done: true},
          {label: '[] + {}', done: true},
          {label: 'TYPESCRIPT', active: true},
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
        {isOutro ? (
          /* Outro Branding Card */
          <div
            style={{
              width: 740,
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 28,
              border: '2px solid rgba(247, 223, 30, 0.55)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(247, 223, 30, 0.22)',
              padding: '40px 36px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(247, 223, 30, 0.15)',
                border: '2.5px solid #F7DF1E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img src={staticFile('assets/gemini.svg')} style={{width: 56, height: 56}} />
            </div>

            <div style={{fontFamily: FONT.sans, fontWeight: 900, fontSize: 40, color: '#FFFFFF', letterSpacing: '-0.02em'}}>
              rhmt ofc
            </div>

            <div
              style={{
                padding: '10px 28px',
                borderRadius: 100,
                backgroundColor: 'rgba(247, 223, 30, 0.15)',
                border: '1.5px solid #F7DF1E',
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 24,
                color: '#FEF08A',
                letterSpacing: '0.04em',
              }}
            >
              rhmt.biz.id
            </div>

            <div style={{fontFamily: FONT.sans, fontSize: 20, color: '#94A3B8'}}>
              Engineering · DevOps · Motion Graphic
            </div>
          </div>
        ) : (
          /* TypeScript Roast Card */
          <div
            style={{
              width: 740,
              backgroundColor: '#0F172A',
              borderRadius: 28,
              border: '2px solid rgba(49, 120, 198, 0.55)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(49, 120, 198, 0.22)',
              padding: '32px 36px',
              fontFamily: FONT.sans,
            }}
          >
            {/* Navbar flying simulation */}
            <div
              style={{
                backgroundColor: '#1E293B',
                borderRadius: 14,
                padding: '14px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
                transform: `translateY(${navFly}px)`,
                transition: 'transform 0.1s linear',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: '#38BDF8'}}>
                &lt;Navbar style="margin-left: 1px" /&gt;
              </span>
              <span style={{fontSize: 16, color: '#F87171', fontWeight: 600}}>
                {isButtonChaos ? '🚀 Meluncur ke luar angkasa!' : 'Hovering'}
              </span>
            </div>

            {/* TypeScript Comic Box */}
            <div
              style={{
                borderLeft: '5px solid #3178C6',
                paddingLeft: 20,
                marginBottom: 20,
              }}
            >
              <div style={{fontWeight: 700, fontSize: 22, color: '#93C5FD', marginBottom: 6}}>
                "Bisa bikin aman gak, Bang?"
              </div>
              <div style={{fontWeight: 800, fontSize: 26, color: '#F8FAFC'}}>
                "Enggak, cuma bikin dimarahin komputer sebelum kodingannya jalan!"
              </div>
            </div>

            {/* Red Squiggly Error Callout */}
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 16,
                color: '#FCA5A5',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1.5px solid rgba(239, 68, 68, 0.35)',
                borderRadius: 10,
                padding: '12px 18px',
              }}
            >
              TS2322: Type 'chaos' is not assignable to type 'sane'. Still weird.
            </div>
          </div>
        )}
      </div>

      {/* Elaina Presenter Anchor (Side Right on Dark Theme) */}
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
