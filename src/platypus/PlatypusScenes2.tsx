import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ElainaGesture} from '../components/ElainaPresenterAnchor';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {Reveal, Shine, Sparks} from '../premium/fx';
import {CW, FONT, M} from '../lib/theme';
import {
  ElainaStageAnchor,
  IconMapPin,
  IconSyringe,
  PhotoFrame,
} from './PlatypusKit';

/* ============================================================================
   SCENE 4: TANPA LAMBUNG & GERD (Light — Side-by-Side SVG Digestive Sim)
   ============================================================================ */
export const P4TanpaLambungScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isZip = t >= 6.5;
  const isGerd = t >= 15.8;
  const isBohong = t >= 18.6;

  let gesture: ElainaGesture = 'point_up';
  let gStart = 0;
  if (isGerd) {
    gesture = 'wink_point';
    gStart = Math.round(15.8 * fps);
  }

  // Animated food bolus zipping down Platypus esophagus straight into intestine!
  const bolusCycle = isZip ? ((t - 6.5) % 1.45) / 1.45 : 0;
  const bolusY = interpolate(bolusCycle, [0, 0.75, 1], [85, 365, 365], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bolusOp = isZip ? interpolate(bolusCycle, [0, 0.1, 0.85, 1], [0, 1, 1, 0]) : 0;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={6} />

      <BendaHook
        mode="light"
        lead={isBohong ? 'Izin kerja alasan sakit maag?' : 'Anatomi pencernaan paling aneh:'}
        anchorText={isBohong ? 'PASTI BOHONG!' : 'TANPA LAMBUNG!'}
        accent={isBohong ? '#dc2626' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop="0 LAMBUNG"
        counterSub="bypass usus"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', active: true},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        <div style={{display: 'flex', gap: 22, width: '100%', height: 500}}>
          {/* LEFT: HUMAN */}
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              backgroundColor: '#ffffff',
              border: `2px solid ${isGerd ? '#f59e0b' : 'rgba(15,23,42,0.12)'}`,
              padding: 20,
              boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#0f172a'}}>
                MANUSIA
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '4px 10px',
                  borderRadius: 999,
                  backgroundColor: isGerd ? '#fef3c7' : '#f1f5f9',
                  color: isGerd ? '#b45309' : '#475569',
                }}
              >
                {isGerd ? 'GERD KAMBUH' : 'ADA LAMBUNG'}
              </span>
            </div>

            <svg width="100%" height="410" viewBox="0 0 380 410">
              {/* Esophagus */}
              <rect x="174" y="34" width="32" height="90" rx="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
              {/* Stomach J-pouch */}
              <path
                d="M174 120 C120 130 112 230 175 248 C235 262 252 210 218 175 C204 160 206 130 206 120 Z"
                fill={isGerd ? '#fde68a' : '#fed7aa'}
                stroke={isGerd ? '#d97706' : '#ea580c'}
                strokeWidth="3.5"
              />
              {/* Acid bubbles inside stomach */}
              <circle cx="165" cy="195" r={6 + Math.sin(t * 6) * 2} fill="#f97316" opacity="0.65" />
              <circle cx="195" cy="215" r={5 + Math.cos(t * 5) * 2} fill="#ef4444" opacity="0.65" />
              {/* Intestine */}
              <path
                d="M196 250 L196 310 C196 340 140 340 140 365 L240 365"
                fill="none"
                stroke="#64748b"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <text x="190" y="290" textAnchor="middle" fontSize="15" fontFamily="monospace" fontWeight="700" fill="#b45309">
                ASAM pH 1.5
              </text>
            </svg>
          </div>

          {/* RIGHT: PLATYPUS */}
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              backgroundColor: '#0f172a',
              border: `2px solid ${isBohong ? '#ef4444' : '#38bdf8'}`,
              padding: 20,
              boxShadow: '0 22px 46px rgba(15,23,42,0.22)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Shine at={6.6} dur={0.75} alpha={0.22} />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#f8fafc'}}>
                PLATYPUS
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '4px 10px',
                  borderRadius: 999,
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  color: '#7dd3fc',
                }}
              >
                0 LAMBUNG
              </span>
            </div>

            <svg width="100%" height="410" viewBox="0 0 380 410">
              {/* Direct straight bypass tube */}
              <rect x="172" y="34" width="36" height="275" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              {/* Dotted missing stomach outline */}
              <ellipse
                cx="190"
                cy="185"
                rx="62"
                ry="48"
                fill="none"
                stroke="#f87171"
                strokeWidth="2.5"
                strokeDasharray="7 6"
              />
              <text x="190" y="191" textAnchor="middle" fontSize="14" fontFamily="monospace" fontWeight="800" fill="#f87171">
                404 LAMBUNG
              </text>

              {/* Intestine directly connected */}
              <path
                d="M190 308 L190 355 C190 370 135 370 135 380 L245 380"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="22"
                strokeLinecap="round"
                strokeOpacity="0.45"
              />

              {/* Zipping food bolus */}
              {isZip && (
                <g transform={`translate(190, ${bolusY})`} opacity={bolusOp}>
                  <circle cx="0" cy="0" r="14" fill="#a3e635" stroke="#ffffff" strokeWidth="2.5" />
                  <line x1="-10" y1="-26" x2="-10" y2="-16" stroke="#bef264" strokeWidth="3" strokeLinecap="round" />
                  <line x1="10" y1="-28" x2="10" y2="-18" stroke="#bef264" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}
            </svg>

            {isBohong && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <Sparks at={18.85} count={14} radius={130} color="#ef4444" />
                <div
                  style={{
                    transform: 'rotate(-8deg)',
                    padding: '12px 22px',
                    borderRadius: 12,
                    backgroundColor: 'rgba(127, 29, 29, 0.94)',
                    border: '3px solid #f87171',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 22,
                    color: '#ffffff',
                    boxShadow: '0 14px 30px rgba(0,0,0,0.45)',
                  }}
                >
                  IZIN GERD DITOLAK!
                </div>
              </div>
            )}
          </div>
        </div>

        {isGerd && (
          <Reveal at={15.85} y={12}>
            <div
              style={{
                marginTop: 22,
                textAlign: 'center',
                fontFamily: FONT.sans,
                fontWeight: 700,
                fontSize: 23,
                color: '#0f172a',
              }}
            >
              &ldquo;Bos, izin ya, GERD saya lagi kambuh.&rdquo; — <span style={{color: '#dc2626'}}>Auto ketahuan bohong!</span>
            </div>
          </Reveal>
        )}
      </div>

      <ElainaStageAnchor
        sceneId="p4-tanpa-lambung"
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="left"
        theme="light"
        glowColor="rgba(2, 132, 199, 0.28)"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: TAJI BERACUN (Dark — Real Spur Photo + Venom Meter)
   ============================================================================ */
export const P5TajiBeracunScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isSpur = t >= 3.6;
  const isCute = t >= 8.3;
  const isFinalNeedle = t >= 11.6;

  let gesture: ElainaGesture = 'alert';
  let gStart = 0;
  if (isFinalNeedle) {
    gesture = 'alert';
    gStart = Math.round(11.6 * fps);
  } else if (isCute) {
    gesture = 'wink_point';
    gStart = Math.round(8.3 * fps);
  }

  const painProgress = interpolate(t, [3.8, 6.8], [0, 0.92], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const painDays = Math.round(painProgress * 90);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={6} />

      <BendaHook
        mode="dark"
        lead={isCute ? 'Tampang imut, tapi aslinya:' : 'Senjata rahasia di kaki belakang:'}
        anchorText="TAJI BERACUN!"
        accent="#ef4444"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#ef4444"
        counterTop={isSpur ? `${painDays} HARI` : 'RACUN'}
        counterSub={isSpur ? 'durasi nyeri' : 'kaki jantan'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', active: true},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        <div style={{position: 'relative', width: 880, margin: '0 auto'}}>
          <PhotoFrame
            src="assets/platypus/platypus-spur.jpg"
            mode="dark"
            width={880}
            height={440}
            enterAt={4}
            zoomFrom={1.0}
            zoomTo={1.12}
            tag="Foto Asli · Calcaneal Spur (Pejantan)"
            accent="#ef4444"
          />

          {/* Pulsing Target Reticle on actual spur center */}
          {isSpur && (
            <div
              style={{
                position: 'absolute',
                left: 412,
                top: 132,
                width: 96,
                height: 96,
                borderRadius: '50%',
                border: '3px solid #ef4444',
                boxShadow: '0 0 24px rgba(239, 68, 68, 0.75)',
                transform: `scale(${1 + Math.sin(t * 9) * 0.1})`,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Cute contrast inset when "mukanya lucu kayak kartun bebek" */}
          {isCute && (
            <div
              style={{
                position: 'absolute',
                right: 18,
                bottom: 18,
                width: 210,
                height: 140,
                borderRadius: 16,
                overflow: 'hidden',
                border: '2.5px solid #facc15',
                boxShadow: '0 14px 30px rgba(0,0,0,0.8)',
              }}
            >
              <Img
                src={staticFile('assets/platypus/platypus-surface.jpg')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '4px 8px',
                  backgroundColor: 'rgba(0,0,0,0.78)',
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#fde047',
                  textAlign: 'center',
                }}
              >
                MUKA LUCU = JEBAKAN
              </div>
            </div>
          )}
        </div>

        {/* Toxicity / Pain Meter Bar */}
        <div
          style={{
            width: 880,
            margin: '26px auto 0',
            padding: '18px 24px',
            borderRadius: 18,
            backgroundColor: '#141118',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <IconSyringe size={24} color="#f87171" />
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 19, color: '#f8fafc'}}>
                EFEK RACUN DEFENSIN
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: '#f87171'}}>
              {isSpur ? 'BISA PINGSAN BERBULAN-BULAN' : 'STANDBY'}
            </span>
          </div>
          <div style={{height: 16, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden'}}>
            <div
              style={{
                width: `${painProgress * 100}%`,
                height: '100%',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)',
                boxShadow: '0 0 16px rgba(239,68,68,0.65)',
              }}
            />
          </div>
        </div>
      </div>

      <ElainaStageAnchor
        sceneId="p5-taji-beracun"
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="right"
        theme="dark"
        glowColor="rgba(239, 68, 68, 0.4)"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 6: OUTRO AUSTRALIA & SEBLAK + RHMT OFC (Light)
   ============================================================================ */
export const P6OutroSeblakScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isSeblak = t >= 6.9;
  const isBrand = t >= 10.6;

  let gesture: ElainaGesture = 'wink_point';
  let gStart = 0;
  if (isBrand) {
    gesture = 'wink_point';
    gStart = Math.round(10.6 * fps);
  } else if (isSeblak) {
    gesture = 'alert';
    gStart = Math.round(6.9 * fps);
  }

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={6} total={6} />

      <BendaHook
        mode="light"
        lead={isSeblak ? 'Aman... asal gak ketemu lagi:' : 'Tenang, habitatnya cuma di:'}
        anchorText={isSeblak ? 'JAJAN SEBLAK!' : 'AUSTRALIA KOK!'}
        accent={isSeblak ? '#dc2626' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent={isSeblak ? '#dc2626' : '#16a34a'}
        counterTop={isSeblak ? 'AWAS!' : 'AU ONLY'}
        counterSub={isSeblak ? 'pengkolan' : 'sungai timur'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', done: true},
          {label: 'SEBLAK', active: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        {!isSeblak ? (
          <div
            style={{
              width: 880,
              height: 480,
              margin: '0 auto',
              borderRadius: 24,
              backgroundColor: '#ffffff',
              border: '1.5px solid rgba(15,23,42,0.12)',
              boxShadow: '0 20px 44px rgba(15,23,42,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Clean Vector Silhouette Map of Australia + Glowing Eastern Habitat Pin */}
            <svg width={560} height={360} viewBox="0 0 560 360">
              <path
                d="M115 165 L145 105 L205 90 L255 60 L295 85 L340 50 L375 95 L425 145 L445 215 L410 275 L345 290 L290 250 L215 245 L145 270 L105 225 Z"
                fill="#e2e8f0"
                stroke="#0f172a"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Eastern river belt highlight */}
              <path
                d="M385 120 Q428 190 392 265"
                fill="none"
                stroke="#0284c7"
                strokeWidth="12"
                strokeLinecap="round"
                strokeOpacity="0.45"
              />
              {/* Pulse ring */}
              <circle
                cx="402"
                cy="195"
                r={14 + ((t * 18) % 24)}
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                opacity={1 - (((t * 18) % 24) / 24)}
              />
              <circle cx="402" cy="195" r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
              <text x="275" y="188" textAnchor="middle" fontFamily="monospace" fontWeight="800" fontSize="22" fill="#0f172a">
                AUSTRALIA TIMUR
              </text>
            </svg>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 18,
                color: '#0284c7',
              }}
            >
              <IconMapPin size={22} color="#0284c7" />
              <span>HABITAT ASLI · AMAN DARI INDONESIA</span>
            </div>
          </div>
        ) : (
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <PhotoFrame
              src="assets/platypus/seblak.jpg"
              mode="light"
              width={860}
              height={460}
              enterAt={Math.round(6.9 * fps)}
              zoomFrom={1.0}
              zoomTo={1.08}
              tag="Seblak Komplit · Pengkolan Lokal"
              accent="#dc2626"
            />

            {/* Animated Rising Steam Curls SVG */}
            <svg
              width={860}
              height={460}
              viewBox="0 0 860 460"
              style={{position: 'absolute', top: 0, left: 38, pointerEvents: 'none'}}
            >
              {[280, 420, 560].map((sx, idx) => {
                const drift = Math.sin(t * 3 + idx * 1.4) * 14;
                return (
                  <path
                    key={sx}
                    d={`M${sx} 170 Q${sx + drift} 115 ${sx - drift} 60`}
                    fill="none"
                    stroke="rgba(255,255,255,0.68)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Cheeky Platypus peeking in top-right */}
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: -22,
                width: 190,
                height: 190,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: '0 14px 32px rgba(0,0,0,0.3)',
                transform: `scale(${spring({frame: Math.max(0, frame - Math.round(7.4 * fps)), fps, config: {damping: 12, stiffness: 180}})})`,
              }}
            >
              <Img
                src={staticFile('assets/platypus/platypus-surface.jpg')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>

            {isBrand && (
              <Reveal at={10.6} y={14}>
                <div
                  style={{
                    marginTop: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 28px',
                    borderRadius: 999,
                    backgroundColor: '#0f172a',
                    border: '2px solid #38bdf8',
                    boxShadow: '0 16px 36px rgba(15, 23, 42, 0.22)',
                  }}
                >
                  <Img src={staticFile('assets/gemini.svg')} style={{width: 28, height: 28}} />
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: '#f8fafc'}}>
                    rhmt ofc
                  </span>
                  <span style={{fontFamily: FONT.mono, fontSize: 18, color: '#38bdf8', fontWeight: 700}}>
                    · rhmt.biz.id
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>

      <ElainaStageAnchor
        sceneId="p6-outro-seblak"
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="left"
        theme="light"
        glowColor={isSeblak ? 'rgba(220, 38, 38, 0.28)' : 'rgba(2, 132, 199, 0.28)'}
      />
    </AbsoluteFill>
  );
};
