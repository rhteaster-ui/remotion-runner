import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgencyPresenterAnchor} from '../components/AgencyPresenterAnchor';
import {
  AnimatedPointer,
  BatasDivider,
  BendaBackground,
  BendaHook,
  BendaStepper,
  BendaWatermark,
  CleanPoster,
  POSTERS,
} from '../components/PosterStage';
import {kAnchor} from '../lib/kryptonAnchors';
import {CW, FONT, M} from '../lib/theme';
import {pop} from '../lib/anim';

/* ============================================================================
   SCENE 1: HOOK (Dark #0b0b0d — 3 Official Key Arts -> Krypton Blue Plasma)
   ============================================================================ */
export const K1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const aArgon = kAnchor('s1-hook', 'argon', 0, 1.8);
  const aCarbon = kAnchor('s1-hook', 'carbon', 0, 2.8);
  const aHyd = kAnchor('s1-hook', 'hydrogen', 0, 3.8);
  const aKrypton = kAnchor('s1-hook', 'krypton', 0, 6.0);
  const isKrypton = frame >= aKrypton;

  const chipO = pop(frame, aKrypton + 10, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={6} />

      <BendaHook
        mode="dark"
        lead={isKrypton ? 'Muncul rumor model baru:' : 'Setelah resmi merilis:'}
        anchorText={isKrypton ? 'Gemini 4 Krypton' : 'Argon, Carbon, Hydrogen'}
        accent={isKrypton ? '#3b82f6' : '#22c55e'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={isKrypton ? '#3b82f6' : '#22c55e'}
        counterTop={isKrypton ? '3 + 1?' : '3 / 3'}
        counterSub={isKrypton ? 'rumor watch' : 'rilis resmi'}
        nodes={[
          {label: 'ARGON', done: frame >= aArgon, active: !isKrypton && frame >= aArgon && frame < aCarbon},
          {label: 'CARBON', done: frame >= aCarbon, active: !isKrypton && frame >= aCarbon && frame < aHyd},
          {label: 'HYDROGEN', done: frame >= aHyd, active: !isKrypton && frame >= aHyd},
          {label: 'KRYPTON?', active: isKrypton, rumor: true},
        ]}
      />

      {/* Focused Stage (Y: 470..1280) — Clean artwork with zero stacked card chrome */}
      <div style={{position: 'absolute', left: M, top: 475, width: CW, height: 780}}>
        {!isKrypton ? (
          <>
            <CleanPoster
              poster={POSTERS.argon}
              mode="dark"
              enterAt={Math.max(4, aArgon - 6)}
              width={640}
              height={360}
              tiltDeg={-3}
              showCaption={false}
              style={{position: 'absolute', left: 0, top: 10, zIndex: 1}}
            />
            <CleanPoster
              poster={POSTERS.carbon}
              mode="dark"
              enterAt={Math.max(12, aCarbon - 6)}
              width={640}
              height={360}
              tiltDeg={2}
              showCaption={false}
              style={{position: 'absolute', right: 0, top: 135, zIndex: 2}}
            />
            <CleanPoster
              poster={POSTERS.hydrogen}
              mode="dark"
              enterAt={Math.max(20, aHyd - 6)}
              width={640}
              height={360}
              tiltDeg={-1.5}
              showCaption={false}
              style={{position: 'absolute', left: 148, top: 270, zIndex: 3}}
            />
          </>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36}}>
            <CleanPoster
              poster={POSTERS.kryptonHero}
              mode="dark"
              enterAt={aKrypton}
              width={900}
              height={506}
              zoomFrom={1.0}
              zoomTo={1.05}
            />

            {/* Single compact floating signal tag linked cleanly below poster (Bendalogi f_07 style) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                opacity: Math.min(1, chipO),
                transform: `translateY(${(1 - chipO) * 14}px)`,
              }}
            >
              <div
                style={{
                  padding: '12px 22px',
                  borderRadius: 12,
                  backgroundColor: '#14161b',
                  border: '1.5px solid rgba(245, 158, 11, 0.55)',
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 21,
                  color: '#f8fafc',
                }}
              >
                checkpoint: <span style={{color: '#38bdf8'}}>krypton-a</span>
              </div>
              <div
                style={{
                  padding: '10px 20px',
                  borderRadius: 999,
                  border: '1.5px solid rgba(56, 189, 248, 0.45)',
                  fontFamily: FONT.mono,
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#38bdf8',
                }}
              >
                via X & Reddit
              </div>
            </div>
          </div>
        )}
      </div>

      <AgencyPresenterAnchor
        gesture={isKrypton ? 'point_up' : 'idle'}
        size={195}
        bottomOffset={220}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: RECAP (Light #f7f8fa — Single Spotlight Stage synced to VO)
   ============================================================================ */
export const K2Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const aHyd = kAnchor('s2-recap', 'hydrogen', 0, 3.5);
  const aArgon = kAnchor('s2-recap', 'argon', 0, 7.5);
  const aCarbon = kAnchor('s2-recap', 'carbon', 0, 12.0);

  const activeModel = frame >= aCarbon ? 'carbon' : frame >= aArgon ? 'argon' : 'hydrogen';
  const meta = {
    hydrogen: {
      poster: POSTERS.hydrogen,
      enter: 4,
      anchor: 'Hydrogen',
      role: 'Eksekusi cepat · Coding & agentic harian',
      stepIdx: '1 / 3',
      color: '#16a34a',
    },
    argon: {
      poster: POSTERS.argon,
      enter: aArgon,
      anchor: 'Argon',
      role: '1M Token Konteks · Navigasi repo panjang',
      stepIdx: '2 / 3',
      color: '#ea580c',
    },
    carbon: {
      poster: POSTERS.carbon,
      enter: aCarbon,
      anchor: 'Carbon',
      role: 'Frontier Flagship · Riset & keamanan siber',
      stepIdx: '3 / 3',
      color: '#2563eb',
    },
  }[activeModel];

  const noteO = pop(frame, meta.enter + 8, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={6} />

      <BendaHook
        mode="light"
        lead="Peta kasta resmi Google DeepMind:"
        anchorText={`Gemini 4 ${meta.anchor}`}
        accent={meta.color}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent={meta.color}
        counterTop={meta.stepIdx}
        counterSub="lineup resmi"
        nodes={[
          {label: 'HYDROGEN', done: frame >= aArgon, active: activeModel === 'hydrogen'},
          {label: 'ARGON', done: frame >= aCarbon, active: activeModel === 'argon'},
          {label: 'CARBON', active: activeModel === 'carbon'},
          {label: 'KRYPTON?', rumor: true},
        ]}
      />

      {/* Single Clean Spotlight Stage (No 3 stacked cards!) */}
      <div style={{position: 'absolute', left: M, top: 485, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CleanPoster
          key={activeModel}
          poster={meta.poster}
          mode="light"
          enterAt={meta.enter}
          width={900}
          height={506}
          zoomFrom={1.0}
          zoomTo={1.05}
        />

        {/* Curved dotted SVG connector down to floating single annotation pill */}
        <svg width={80} height={68} viewBox="0 0 80 68" style={{marginTop: 6, opacity: Math.min(1, noteO)}}>
          <path
            d="M40 4 C40 28, 40 42, 40 64"
            fill="none"
            stroke={meta.color}
            strokeWidth="2.5"
            strokeDasharray="5 6"
            strokeLinecap="round"
          />
          <circle cx="40" cy="63" r="4" fill={meta.color} />
        </svg>

        <div
          style={{
            padding: '16px 32px',
            borderRadius: 14,
            backgroundColor: '#ffffff',
            border: `2px solid ${meta.color}`,
            boxShadow: '0 14px 32px rgba(15, 23, 42, 0.09)',
            fontFamily: FONT.sans,
            fontWeight: 700,
            fontSize: 28,
            color: '#0f172a',
            textAlign: 'center',
            opacity: Math.min(1, noteO),
            transform: `translateY(${(1 - noteO) * 10}px)`,
          }}
        >
          {meta.role}
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="point_up"
        size={195}
        bottomOffset={220}
        side="center"
        theme="light"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: KRYPTON LEAK (Dark #0b0b0d — Browser Mockup + Curved Node Graph)
   ============================================================================ */
export const K3Krypton: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const aTester = kAnchor('s3-krypton', 'tester', 0, 5.5);

  const winO = pop(frame, 4, fps, 165);
  const nodeO = pop(frame, 18, fps, 165);
  const cursorX = interpolate(frame, [20, 62], [680, 440], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cursorY = interpolate(frame, [20, 62], [460, 390], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={6} />

      <BendaHook
        mode="dark"
        lead="Muncul checkpoint misterius:"
        anchorText="krypton-a"
        accent="#3b82f6"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#3b82f6"
        counterTop="krypton-a"
        counterSub="blind arena"
        nodes={[
          {label: 'ARGON', done: true},
          {label: 'CARBON', done: true},
          {label: 'HYDROGEN', done: true},
          {label: 'KRYPTON-A', active: true, rumor: true},
        ]}
      />

      {/* Interactive Forensic Browser Window (Bendalogi f_02 style) + Neural Wave Poster */}
      <div style={{position: 'absolute', left: M, top: 470, width: CW}}>
        <div
          style={{
            width: '100%',
            borderRadius: 16,
            backgroundColor: '#12151c',
            border: '1.5px solid rgba(148, 163, 184, 0.22)',
            boxShadow: '0 26px 56px rgba(0,0,0,0.68)',
            overflow: 'hidden',
            position: 'relative',
            opacity: Math.min(1, winO),
            transform: `translateY(${(1 - winO) * 20}px)`,
          }}
        >
          {/* Browser Chrome Header */}
          <div
            style={{
              height: 46,
              padding: '0 18px',
              backgroundColor: '#181c26',
              borderBottom: '1px solid rgba(148,163,184,0.14)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{display: 'flex', gap: 8}}>
              <span style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <span style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#f59e0b'}} />
              <span style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#22c55e'}} />
            </div>
            <div
              style={{
                flex: 1,
                height: 28,
                borderRadius: 6,
                backgroundColor: '#0c0e13',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.mono,
                fontSize: 15,
                color: '#94a3b8',
              }}
            >
              x.com / r/GeminiAI · blind-arena-leak
            </div>
          </div>

          {/* Poster Inside Window */}
          <div style={{position: 'relative', width: '100%', height: 420}}>
            <Img
              src={staticFile(POSTERS.kryptonNeural.src)}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            {/* Highlighted selection bar like f_02 */}
            <div
              style={{
                position: 'absolute',
                left: 32,
                right: 32,
                bottom: 24,
                padding: '12px 18px',
                borderRadius: 10,
                backgroundColor: frame >= 62 ? 'rgba(37, 99, 235, 0.34)' : 'rgba(11, 13, 18, 0.85)',
                border: `1.5px solid ${frame >= 62 ? '#3b82f6' : 'rgba(148,163,184,0.28)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: FONT.mono,
                fontSize: 19,
                color: '#f8fafc',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span>checkpoint_id: &quot;krypton-a&quot;</span>
              <span style={{color: '#38bdf8', fontWeight: 700}}>BLIND TEST</span>
            </div>
            <AnimatedPointer x={cursorX} y={cursorY} clickAt={62} />
          </div>
        </div>

        {/* Bendalogi f_01-style Curved Dashed Connectors down to 2 Floating Nodes */}
        <svg width={CW} height={90} viewBox={`0 0 ${CW} 90`} style={{display: 'block', opacity: Math.min(1, nodeO)}}>
          <path
            d={`M${CW * 0.35} 0 C${CW * 0.35} 45, ${CW * 0.24} 45, ${CW * 0.24} 86`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d={`M${CW * 0.65} 0 C${CW * 0.65} 45, ${CW * 0.76} 45, ${CW * 0.76} 86`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
        </svg>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            opacity: Math.min(1, nodeO),
            transform: `translateY(${(1 - nodeO) * 14}px)`,
          }}
        >
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 14,
              backgroundColor: '#13161e',
              border: '1.5px solid rgba(56, 189, 248, 0.45)',
            }}
          >
            <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: '#38bdf8'}}>
              ARENA BLIND TEST
            </div>
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, color: '#f8fafc', marginTop: 6}}>
              Output dibagikan tester
            </div>
          </div>

          <div
            style={{
              padding: '18px 22px',
              borderRadius: 14,
              backgroundColor: '#13161e',
              border: '1.5px solid rgba(245, 158, 11, 0.45)',
            }}
          >
            <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: '#f59e0b'}}>
              POLA UNSUR (Kr)
            </div>
            <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 23, color: '#f8fafc', marginTop: 6}}>
              {frame >= aTester ? 'Lanjutan H · C · Ar' : 'Spekulasi seri ke-4'}
            </div>
          </div>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="point_up"
        size={190}
        bottomOffset={220}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 4: KLAIM PERFORMA (Light #f7f8fa — Star Orbit / Giant 4 + Code Trace)
   ============================================================================ */
export const K4Klaim: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const aSvg = kAnchor('s4-klaim', 'svg', 0, 9.0);
  const aKomp = kAnchor('s4-klaim', 'kompetitor', 0, 15.0);

  const activePoster = frame >= aKomp ? POSTERS.kryptonGiant4 : POSTERS.kryptonStarOrbit;
  const activeStep = frame >= aKomp ? 2 : frame >= aSvg ? 1 : 0;
  const termO = pop(frame, 10, fps, 165);

  const rows = [
    {
      at: 6,
      code: 'thinking_tokens: >20,000',
      tag: 'Heavy Coding',
      color: '#2563eb',
    },
    {
      at: aSvg - 6,
      code: 'single_prompt: pure_svg + 3d_voxel',
      tag: 'Visual Code',
      color: '#16a34a',
    },
    {
      at: aKomp - 6,
      code: 'benchmark: compared_vs_frontier',
      tag: 'Rumor X',
      color: '#ea580c',
    },
  ];

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={6} />

      <BendaHook
        mode="light"
        lead="Klaim yang bikin heboh:"
        anchorText={activeStep === 2 ? 'Saingi Frontier' : activeStep === 1 ? 'SVG & 3D Murni' : 'Heavy Coding'}
        accent={rows[activeStep].color}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent={rows[activeStep].color}
        counterTop={`${activeStep + 1} / 3`}
        counterSub="klaim beredar"
        nodes={[
          {label: 'CODING', done: activeStep > 0, active: activeStep === 0},
          {label: 'SVG / 3D', done: activeStep > 1, active: activeStep === 1},
          {label: 'VS FRONTIER', active: activeStep === 2, rumor: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <CleanPoster
          key={frame >= aKomp ? 'giant4' : 'starorbit'}
          poster={activePoster}
          mode="light"
          enterAt={frame >= aKomp ? aKomp : 4}
          width={860}
          height={484}
          zoomFrom={1.0}
          zoomTo={1.03}
        />

        {/* Single Bendalogi-style Dark Code Inspector Window (NOT 3 cards!) */}
        <div
          style={{
            width: '100%',
            borderRadius: 14,
            backgroundColor: '#0f131b',
            border: '1.5px solid rgba(15, 23, 42, 0.25)',
            boxShadow: '0 20px 44px rgba(15, 23, 42, 0.16)',
            overflow: 'hidden',
            opacity: Math.min(1, termO),
            transform: `translateY(${(1 - termO) * 16}px)`,
          }}
        >
          <div
            style={{
              height: 38,
              padding: '0 16px',
              backgroundColor: '#171c26',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: FONT.mono,
              fontSize: 14,
              color: '#94a3b8',
            }}
          >
            <span>stress_test_claims.log</span>
            <span>[unverified]</span>
          </div>
          <div style={{padding: '12px 0'}}>
            {rows.map((r, idx) => {
              const lit = frame >= r.at;
              const current = idx === activeStep;
              return (
                <div
                  key={r.code}
                  style={{
                    padding: '11px 20px',
                    backgroundColor: current ? `${r.color}26` : 'transparent',
                    borderLeft: `4px solid ${current ? r.color : 'transparent'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: lit ? 1 : 0.3,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 19, color: '#f8fafc'}}>
                    {r.code}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      backgroundColor: `${r.color}30`,
                      fontFamily: FONT.mono,
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#ffffff',
                    }}
                  >
                    {r.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="idle"
        size={185}
        bottomOffset={215}
        side="center"
        theme="light"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: FACT CHECK (Dark #0b0b0d — Black Background Poster + Equation + BATAS)
   ============================================================================ */
export const K5Status: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const eqO = pop(frame, 10, fps, 170);
  const dosO = pop(frame, 20, fps, 165);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={6} />

      <BendaHook
        mode="dark"
        lead="Verifikasi fakta resmi Google:"
        anchorText="Belum Dikonfirmasi"
        accent="#ef4444"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#f59e0b"
        counterTop="0 / 3"
        counterSub="bukti resmi"
        nodes={[
          {label: 'BLOG.GOOGLE', rumor: true},
          {label: 'MODEL CARD', rumor: true},
          {label: 'API DOCS', rumor: true},
          {label: 'RUMOR ONLY', active: true, rumor: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
        {/* Seamless black-background poster kept intact per Tuan Rahmat */}
        <CleanPoster
          poster={POSTERS.kryptonBlack}
          mode="dark"
          enterAt={4}
          width={780}
          height={420}
          zoomFrom={1.0}
          zoomTo={1.03}
          showCaption={false}
        />

        {/* Bendalogi f_05 Bold Equation: [Rumor X] ≠ [Rilis Resmi] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            opacity: Math.min(1, eqO),
            transform: `scale(${0.92 + 0.08 * eqO})`,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              backgroundColor: '#f59e0b',
              fontFamily: FONT.sans,
              fontWeight: 800,
              fontSize: 28,
              color: '#111827',
            }}
          >
            Rumor X
          </div>
          <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 48, color: '#ffffff'}}>≠</span>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 12,
              backgroundColor: '#13161e',
              border: '2px solid rgba(255,255,255,0.4)',
              fontFamily: FONT.sans,
              fontWeight: 800,
              fontSize: 28,
              color: '#f8fafc',
            }}
          >
            Rilis Resmi
          </div>
        </div>

        {/* Bendalogi f_06 BATAS Divider + Compact Forensic Dossier */}
        <BatasDivider label="BATAS FAKTA" enterAt={16} />

        <div
          style={{
            width: '100%',
            borderRadius: 14,
            backgroundColor: '#111319',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
            padding: '16px 22px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            opacity: Math.min(1, dosO),
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 18}}>
            <span style={{color: '#94a3b8'}}>blog.google announcement</span>
            <span style={{color: '#ef4444', fontWeight: 700}}>???</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 18}}>
            <span style={{color: '#94a3b8'}}>API docs &amp; model card</span>
            <span style={{color: '#ef4444', fontWeight: 700}}>TIDAK ADA</span>
          </div>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="warning_stop"
        size={185}
        bottomOffset={215}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 6: OUTRO (Light #f7f8fa — Flow Question + Clean rhmt ofc Signature)
   ============================================================================ */
export const K6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const flowO = pop(frame, 10, fps, 165);
  const sigO = pop(frame, 18, fps, 165);

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={6} total={6} />

      <BendaHook
        mode="light"
        lead="Menurut kalian, Krypton ini:"
        anchorText="Kasta Baru / Eksperimen?"
        accent="#2563eb"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#22c55e"
        counterTop="DISKUSI"
        counterSub="@rhmtofc"
        nodes={[
          {label: 'ARGON', done: true},
          {label: 'CARBON', done: true},
          {label: 'HYDROGEN', done: true},
          {label: 'KRYPTON?', active: true, rumor: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        <CleanPoster
          poster={POSTERS.kryptonHero}
          mode="light"
          enterAt={4}
          width={860}
          height={484}
          zoomFrom={1.0}
          zoomTo={1.04}
        />

        {/* Minimalist Node Comparison (Carbon vs Krypton?) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            opacity: Math.min(1, flowO),
          }}
        >
          <div
            style={{
              padding: '14px 24px',
              borderRadius: 12,
              backgroundColor: '#ffffff',
              border: '1.5px solid #2563eb',
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 24,
              color: '#0f172a',
            }}
          >
            Gemini 4 Carbon
          </div>
          <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: '#2563eb'}}>-- ? --&gt;</span>
          <div
            style={{
              padding: '14px 24px',
              borderRadius: 12,
              backgroundColor: '#0f172a',
              border: '1.5px dashed #38bdf8',
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 24,
              color: '#f8fafc',
            }}
          >
            Krypton-a
          </div>
        </div>

        {/* Sleek Compact Creator Pill (rhmt ofc) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '14px 28px',
            borderRadius: 999,
            backgroundColor: '#0b0b0d',
            boxShadow: '0 16px 36px rgba(15,23,42,0.18)',
            opacity: Math.min(1, sigO),
            transform: `translateY(${(1 - sigO) * 14}px)`,
          }}
        >
          <Img src={staticFile('assets/gemini.svg')} style={{width: 28, height: 28}} />
          <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: '#f8fafc'}}>
            rhmt ofc
          </span>
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 20, color: '#22c55e'}}>
            · @rhmtofc
          </span>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="thumbs_up"
        size={190}
        bottomOffset={220}
        side="center"
        theme="light"
      />
    </AbsoluteFill>
  );
};
