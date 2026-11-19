import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgencyPresenterAnchor} from '../components/AgencyPresenterAnchor';
import {
  BendaBackground,
  BendaHook,
  BendaStepper,
  BendaWatermark,
  CleanPoster,
} from '../components/PosterStage';
import {pop} from '../lib/anim';
import {CW, FONT, M} from '../lib/theme';

export const REAL_POSTERS = {
  argon: {
    src: 'assets/krypton/argon-official.webp',
    caption: 'blog.google · Gemini 4 Argon (Official Key Art)',
    accent: '#ff9800',
  },
  carbon: {
    src: 'assets/krypton/carbon-official.jpg',
    caption: 'blog.google · Gemini 4 Carbon (Official Key Art)',
    accent: '#4285f4',
  },
  hydrogen: {
    src: 'assets/krypton/hydrogen-official.jpg',
    caption: 'blog.google · Gemini 4 Hydrogen (Official Key Art)',
    accent: '#00e676',
  },
  neonHero: {
    src: 'assets/krypton/krypton-hero-plasma.jpg',
    caption: 'blog.google · Gemini 4 Neon Official Announcement',
    accent: '#ff5e1e',
  },
  neonNeural: {
    src: 'assets/krypton/krypton-neural-wave.jpg',
    caption: 'Google DeepMind · Scalable Thinking Architecture',
    accent: '#38bdf8',
  },
  benchmarkSheet: {
    src: 'assets/krypton/krypton-leak-2.png',
    caption: 'Artificial Analysis & DeepMind Empirical Evaluation',
    accent: '#ff5e1e',
    blendDark: true,
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1: HOOK & REVEAL (Dark #0b0b0d — Bendalogi 4-Zone Clean Stage)
   ══════════════════════════════════════════════════════════════════════════ */
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const isNeon = frame >= 80;
  const chipO = pop(frame, 90, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={5} />

      <BendaHook
        mode="dark"
        lead={isNeon ? 'Rilis resmi varian baru:' : 'Setelah merilis model berat:'}
        anchorText={isNeon ? 'Gemini 4 Neon' : 'Argon, Carbon, Hydrogen'}
        accent={isNeon ? '#ff5e1e' : '#22c55e'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={isNeon ? '#ff5e1e' : '#22c55e'}
        counterTop={isNeon ? 'NEON' : '3 / 3'}
        counterSub={isNeon ? 'workhorse baru' : 'lineup resmi'}
        nodes={[
          {label: 'ARGON', done: true},
          {label: 'CARBON', done: true},
          {label: 'HYDROGEN', done: true},
          {label: 'NEON', active: isNeon, rumor: false},
        ]}
      />

      {/* 1 Focused Stage (Y: 475..1280) — Zero Stacked Card Chrome */}
      <div style={{position: 'absolute', left: M, top: 475, width: CW, height: 780}}>
        {!isNeon ? (
          <>
            <CleanPoster
              poster={REAL_POSTERS.argon}
              mode="dark"
              enterAt={4}
              width={640}
              height={360}
              tiltDeg={-3}
              showCaption={false}
              style={{position: 'absolute', left: 0, top: 10, zIndex: 1}}
            />
            <CleanPoster
              poster={REAL_POSTERS.carbon}
              mode="dark"
              enterAt={18}
              width={640}
              height={360}
              tiltDeg={2}
              showCaption={false}
              style={{position: 'absolute', right: 0, top: 135, zIndex: 2}}
            />
            <CleanPoster
              poster={REAL_POSTERS.hydrogen}
              mode="dark"
              enterAt={32}
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
              poster={REAL_POSTERS.neonHero}
              mode="dark"
              enterAt={80}
              width={900}
              height={506}
              zoomFrom={1.0}
              zoomTo={1.05}
            />

            {/* Single Compact Floating Signal Tag (Bendalogi Style) */}
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
                  padding: '12px 24px',
                  borderRadius: 12,
                  backgroundColor: '#14161b',
                  border: '1.5px solid rgba(255, 94, 30, 0.65)',
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 21,
                  color: '#f8fafc',
                }}
              >
                model: <span style={{color: '#ff5e1e'}}>gemini-4-neon</span>
              </div>
              <div
                style={{
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: '1.5px solid rgba(255, 94, 30, 0.45)',
                  fontFamily: FONT.mono,
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#ff5e1e',
                }}
              >
                The Balanced Workhorse
              </div>
            </div>
          </div>
        )}
      </div>

      <AgencyPresenterAnchor
        gesture={isNeon ? 'point_up' : 'idle'}
        size={195}
        bottomOffset={220}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: ANATOMI TIGA ARSITEKTUR (Light #f7f8fa — Single Spotlight Stage)
   ══════════════════════════════════════════════════════════════════════════ */
export const S2Posisi: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // VO timings: Carbon (0..120), Neon (120..260), Hydrogen (260..)
  const activeModel = frame >= 240 ? 'hydrogen' : frame >= 110 ? 'neon' : 'carbon';
  const meta = {
    carbon: {
      poster: REAL_POSTERS.carbon,
      enter: 4,
      anchor: 'Carbon',
      role: 'Heavyweight Frontier · Riset Mendalam & Komputasi Berat',
      stepIdx: '1 / 3',
      color: '#2563eb',
    },
    neon: {
      poster: REAL_POSTERS.neonHero,
      enter: 110,
      anchor: 'Neon',
      role: 'The Balanced Workhorse · Menutup Jurang Antara Carbon & Hydrogen',
      stepIdx: '2 / 3',
      color: '#ea580c',
    },
    hydrogen: {
      poster: REAL_POSTERS.hydrogen,
      enter: 240,
      anchor: 'Hydrogen',
      role: 'High-Speed Daily Assistant · Latensi Rendah & Respon Kilat',
      stepIdx: '3 / 3',
      color: '#16a34a',
    },
  }[activeModel];

  const noteO = pop(frame, meta.enter + 8, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={5} />

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
        counterSub="pilar arsitektur"
        nodes={[
          {label: 'CARBON', done: frame >= 110, active: activeModel === 'carbon'},
          {label: 'NEON', done: frame >= 240, active: activeModel === 'neon'},
          {label: 'HYDROGEN', active: activeModel === 'hydrogen'},
        ]}
      />

      {/* Single Clean Spotlight Stage (Zero Stacked CSS Cards!) */}
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

        {/* Curved Dotted SVG Connector down to single annotation pill */}
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
            fontSize: 26,
            color: '#0f172a',
            textAlign: 'center',
            maxWidth: 820,
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

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: THINKING LEVELS (Dark #0b0b0d — Neural Wave Poster + Parameter Trace)
   ══════════════════════════════════════════════════════════════════════════ */
export const S3Thinking: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const termO = pop(frame, 12, fps, 165);
  const activeStep = frame >= 200 ? 2 : frame >= 90 ? 1 : 0;

  const rows = [
    {at: 6, code: 'thinking_budget: scalable (0..8192 tokens)', tag: 'Adaptive', color: '#38bdf8'},
    {at: 90, code: 'context_window: 1,000,000 native tokens', tag: 'Full Repo', color: '#10b981'},
    {at: 200, code: 'reasoning_mode: multi_step_tree_verification', tag: 'High Logic', color: '#ff5e1e'},
  ];

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={5} />

      <BendaHook
        mode="dark"
        lead="Kemampuan berpikir adaptif:"
        anchorText="Scalable Thinking & 1M Context"
        accent="#38bdf8"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop="1M TOKENS"
        counterSub="reasoning engine"
        nodes={[
          {label: 'ADAPTIVE', done: activeStep > 0, active: activeStep === 0},
          {label: '1M CONTEXT', done: activeStep > 1, active: activeStep === 1},
          {label: 'DEEP LOGIC', active: activeStep === 2},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <CleanPoster
          poster={REAL_POSTERS.neonNeural}
          mode="dark"
          enterAt={4}
          width={880}
          height={495}
          zoomFrom={1.0}
          zoomTo={1.04}
        />

        {/* Bendalogi Dark Inspector Window */}
        <div
          style={{
            width: '100%',
            borderRadius: 14,
            backgroundColor: '#0f131b',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 44px rgba(0, 0, 0, 0.6)',
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
            <span>aistudio.google.com · parameter_control.log</span>
            <span style={{color: '#10b981'}}>[active]</span>
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
                    opacity: lit ? 1 : 0.35,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 18, color: '#f8fafc'}}>
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
        gesture="thinking"
        size={190}
        bottomOffset={220}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: BENCHMARK RESMI (Light #f7f8fa — Real Sheet Poster + Cost Box)
   ══════════════════════════════════════════════════════════════════════════ */
export const S4Benchmark: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const sheetO = pop(frame, 10, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={5} />

      <BendaHook
        mode="light"
        lead="Hasil Uji Performa Empiris:"
        anchorText="Tandingi Claude 3.5 & GPT-4o"
        accent="#ff5e1e"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#ff5e1e"
        counterTop="MATH-500"
        counterSub="91.8% WINNER"
        nodes={[
          {label: 'HUMANEVAL', done: true},
          {label: 'MATH-500', active: true},
          {label: 'MMLU-PRO', done: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        {/* Real Benchmark Sheet Image */}
        <CleanPoster
          poster={REAL_POSTERS.benchmarkSheet}
          mode="light"
          enterAt={4}
          width={880}
          height={495}
          zoomFrom={1.0}
          zoomTo={1.03}
        />

        {/* Single Clean Efficiency Highlight Box */}
        <div
          style={{
            width: '100%',
            borderRadius: 14,
            backgroundColor: '#ffffff',
            border: '2px solid #ff5e1e',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
            padding: '20px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: Math.min(1, sheetO),
            transform: `translateY(${(1 - sheetO) * 14}px)`,
          }}
        >
          <div>
            <div style={{fontFamily: FONT.mono, fontSize: 13, fontWeight: 700, color: '#ff5e1e', letterSpacing: '0.12em'}}>
              HARGA &amp; EFISIENSI OPERASIONAL
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 26, fontWeight: 800, color: '#0f172a', marginTop: 4}}>
              $0.35 per 1 Juta Token
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 15, color: '#64748b', marginTop: 2}}>
              7x–8x lebih hemat dibanding Claude 3.5 Sonnet ($3.00) dan GPT-4o ($2.50)
            </div>
          </div>

          <div
            style={{
              padding: '10px 20px',
              borderRadius: 999,
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            -85% BIAYA
          </div>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="point_up"
        size={185}
        bottomOffset={220}
        side="center"
        theme="light"
      />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: OUTRO PROFIL TUAN RAHMAT (Dark #0b0b0d — Clean Signature Stage)
   ══════════════════════════════════════════════════════════════════════════ */
export const S5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const photoO = pop(frame, 8, fps, 170);
  const sigO = pop(frame, 22, fps, 165);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={5} />

      <BendaHook
        mode="dark"
        lead="Riset & Produksi Sistem:"
        anchorText="Rohmatulloh · rhmt ofc"
        accent="#ff5e1e"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#ff5e1e"
        counterTop="KREATOR"
        counterSub="rhmt.biz.id"
        nodes={[
          {label: 'GEMINI 4', done: true},
          {label: 'AI STUDIO', done: true},
          {label: 'RHMT OFC', active: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 480, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32}}>
        {/* Creator Profile Picture Frame */}
        <div
          style={{
            position: 'relative',
            width: 320,
            height: 320,
            opacity: Math.min(1, photoO),
            transform: `scale(${0.9 + 0.1 * photoO})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -12,
              borderRadius: 999,
              border: '3px solid #ff5e1e',
              boxShadow: '0 0 35px rgba(255, 94, 30, 0.45)',
            }}
          />
          <Img
            src={staticFile('assets/neon/pp-dev.webp')}
            style={{
              width: 320,
              height: 320,
              borderRadius: 999,
              objectFit: 'cover',
              boxShadow: '0 24px 50px rgba(0, 0, 0, 0.7)',
            }}
          />
          {/* Verified Badge */}
          <div
            style={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              width: 60,
              height: 60,
              borderRadius: 999,
              backgroundColor: '#ff5e1e',
              border: '4px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M5 13L9 17L19 7" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Creator Name & Handle */}
        <div style={{textAlign: 'center', opacity: Math.min(1, sigO)}}>
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 56, color: '#ffffff', letterSpacing: '-0.03em'}}>
            Rohmatulloh
          </div>
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: '#ff5e1e', marginTop: 4}}>
            · rhmt ofc
          </div>
          <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 20, color: '#94a3b8', marginTop: 8}}>
            AI Systems Engineer · rhmt.biz.id
          </div>
        </div>

        {/* Clean Signature CTA Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 40px',
            borderRadius: 999,
            backgroundColor: '#ff5e1e',
            boxShadow: '0 16px 36px rgba(255, 94, 30, 0.4)',
            opacity: Math.min(1, sigO),
            transform: `translateY(${(1 - sigO) * 12}px)`,
          }}
        >
          <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 24, color: '#ffffff'}}>
            Kunjungi rhmt.biz.id
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <AgencyPresenterAnchor
        gesture="thumbs_up"
        size={190}
        bottomOffset={220}
        side="center"
        theme="dark"
      />
    </AbsoluteFill>
  );
};
