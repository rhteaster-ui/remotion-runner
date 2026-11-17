import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ElainaGesture} from '../components/ElainaPresenterAnchor';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {Reveal, Shine, Sparks, Tap} from '../premium/fx';
import {pop} from '../lib/anim';
import {CW, FONT, M} from '../lib/theme';
import {
  ElainaStageAnchor,
  IconAlertTriangle,
  IconBioSearch,
  IconCheckBadge,
  IconDroplet,
  PhotoFrame,
} from './PlatypusKit';

/* ============================================================================
   SCENE 1: HOOK (Dark — Real Swimming Platypus + Scanner Reticle)
   ============================================================================ */
export const P1HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isReveal = t >= 4.25;
  const isSpare = t >= 7.4;

  let gesture: ElainaGesture = 'idle';
  let gStart = 0;
  if (isReveal) {
    gesture = 'wink_point';
    gStart = Math.round(4.25 * fps);
  }

  const scanX = interpolate(Math.sin(t * 1.4), [-1, 1], [120, 740]);
  const scanY = interpolate(Math.cos(t * 1.1), [-1, 1], [110, 380]);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={6} />

      <BendaHook
        mode="dark"
        lead={isReveal ? 'Hewan paling janggal sedunia:' : 'Bukan buaya atau komodo...'}
        anchorText={isReveal ? 'PLATYPUS' : 'HEWAN TERJANGGAL'}
        accent={isReveal ? '#38bdf8' : '#f59e0b'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop={isSpare ? '404 SPEC' : '01 / 06'}
        counterSub={isSpare ? 'sisa sparepart' : 'anomali alam'}
        nodes={[
          {label: 'HOOK', active: true},
          {label: 'SPAREPART'},
          {label: 'TELUR'},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* Zona 3: Focused Stage (Y: 472..1232) */}
      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        <div style={{position: 'relative', width: 900, margin: '0 auto'}}>
          <PhotoFrame
            src="assets/platypus/platypus-swim.jpg"
            mode="dark"
            width={900}
            height={506}
            enterAt={4}
            zoomFrom={1.0}
            zoomTo={1.08}
            tag="Ornithorhynchus anatinus · Australia"
            accent="#38bdf8"
          />

          {/* Live Biometric Scanner Reticle */}
          <svg
            width={900}
            height={506}
            viewBox="0 0 900 506"
            style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}
          >
            <g transform={`translate(${scanX}, ${scanY})`} opacity={t > 0.6 ? 0.92 : 0}>
              <circle cx="0" cy="0" r="46" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="8 6" />
              <circle cx="0" cy="0" r="14" fill="none" stroke="#facc15" strokeWidth="2" />
              <line x1="-60" y1="0" x2="-22" y2="0" stroke="#38bdf8" strokeWidth="2" />
              <line x1="22" y1="0" x2="60" y2="0" stroke="#38bdf8" strokeWidth="2" />
              <line x1="0" y1="-60" x2="0" y2="-22" stroke="#38bdf8" strokeWidth="2" />
              <line x1="0" y1="22" x2="0" y2="60" stroke="#38bdf8" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Two crisp floating telemetry chips below photo */}
        <div style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 28}}>
          <Reveal at={4.35} y={18}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 14,
                backgroundColor: '#111827',
                border: '1.5px solid rgba(56, 189, 248, 0.5)',
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 20,
                color: '#f8fafc',
              }}
            >
              <IconBioSearch size={22} color="#38bdf8" />
              <span>status: mamalia?</span>
            </div>
          </Reveal>

          {isSpare && (
            <Reveal at={7.5} y={18}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 22px',
                  borderRadius: 14,
                  backgroundColor: '#1f162a',
                  border: '1.5px solid rgba(250, 204, 21, 0.65)',
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 20,
                  color: '#fde047',
                }}
              >
                <IconAlertTriangle size={22} color="#facc15" />
                <span>sparepart: campur</span>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <ElainaStageAnchor
        sceneId="p1-hook"
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="right"
        theme="dark"
        glowColor="rgba(56, 189, 248, 0.35)"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: SPAREPART & 1799 HOAX TEST (Light — Authentic Parts + 1799 Art)
   ============================================================================ */
export const P2SparepartScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isPhaseB = t >= 9.3;
  const isPull = t >= 16.5;
  const isAsli = t >= 17.95;

  let gesture: ElainaGesture = 'point_up';
  let gStart = 0;
  if (isAsli) {
    gesture = 'alert';
    gStart = Math.round(17.95 * fps);
  } else if (isPhaseB) {
    gesture = 'wink_point';
    gStart = Math.round(9.3 * fps);
  }

  // Elastic horizontal bill tug animation when "Ditarik paruhnya"
  const tugX =
    t >= 16.5 && t < 18.0
      ? Math.sin(((t - 16.5) / 1.5) * Math.PI * 2.5) * 18
      : 0;

  const parts = [
    {
      label: 'MONCONG BEBEK',
      sub: 'Anas platyrhynchos',
      img: 'assets/platypus/duck-bill.jpg',
      at: 4.55,
      color: '#d97706',
    },
    {
      label: 'EKOR BERANG',
      sub: 'Castor canadensis',
      img: 'assets/platypus/beaver.jpg',
      at: 5.95,
      color: '#0284c7',
    },
    {
      label: 'KAKI KATAK',
      sub: 'Litoria caerulea',
      img: 'assets/platypus/frog.jpg',
      at: 8.05,
      color: '#16a34a',
    },
  ];

  const countParts = parts.filter((p) => t >= p.at).length;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={6} />

      <BendaHook
        mode="light"
        lead={
          isAsli
            ? 'Pas ditarik paruhnya, ternyata:'
            : isPhaseB
              ? 'Ilmuwan 1799 mengira ini:'
              : 'Kombinasi 3 hewan berbeda:'
        }
        anchorText={isAsli ? 'ASLI! BUKAN BONEKA' : isPhaseB ? 'BONEKA ANAK SD?' : 'SISA SPAREPART'}
        accent={isAsli ? '#16a34a' : isPhaseB ? '#9333ea' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop={isPhaseB ? '1799' : `${countParts} / 3`}
        counterSub={isPhaseB ? 'bukti ilmiah' : 'sparepart'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', active: true},
          {label: 'TELUR'},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      {/* Zona 3 Stage */}
      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        {!isPhaseB ? (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
            {/* Mammal base pill */}
            <Reveal at={1.5} y={14}>
              <div
                style={{
                  padding: '10px 26px',
                  borderRadius: 999,
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '0.04em',
                }}
              >
                BASE BODY: MAMALIA BERBULU
              </div>
            </Reveal>

            {/* 3 Real Animal Photo Cards */}
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', gap: 18}}>
              {parts.map((p, idx) => {
                const visible = t >= p.at - 0.15;
                const sc = pop(frame, Math.round(p.at * fps), fps, 175);
                return (
                  <div
                    key={p.label}
                    style={{
                      flex: 1,
                      opacity: visible ? Math.min(1, sc) : 0.12,
                      transform: `translateY(${visible ? (1 - sc) * 20 : 12}px) scale(${visible ? 0.94 + 0.06 * sc : 0.95})`,
                      backgroundColor: '#ffffff',
                      borderRadius: 18,
                      border: `2px solid ${visible ? p.color : 'rgba(15,23,42,0.1)'}`,
                      overflow: 'hidden',
                      boxShadow: visible ? '0 18px 36px rgba(15,23,42,0.12)' : 'none',
                    }}
                  >
                    <div style={{height: 280, position: 'relative'}}>
                      <Img
                        src={staticFile(p.img)}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: p.color,
                          color: '#ffffff',
                          fontFamily: FONT.mono,
                          fontWeight: 800,
                          fontSize: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {idx + 1}
                      </div>
                    </div>
                    <div style={{padding: '14px 12px', textAlign: 'center'}}>
                      <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 20, color: '#0f172a'}}>
                        {p.label}
                      </div>
                      <div style={{fontFamily: FONT.mono, fontSize: 13, color: '#64748b', marginTop: 4}}>
                        {p.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connector SVG merging into ? */}
            <svg width={760} height={110} viewBox="0 0 760 110">
              <path d="M125 6 L125 46 L380 46 L380 90" fill="none" stroke={t >= 4.55 ? '#d97706' : '#cbd5e1'} strokeWidth="3.5" strokeDasharray="8 6" />
              <path d="M380 6 L380 90" fill="none" stroke={t >= 5.95 ? '#0284c7' : '#cbd5e1'} strokeWidth="3.5" strokeDasharray="8 6" />
              <path d="M635 6 L635 46 L380 46" fill="none" stroke={t >= 8.05 ? '#16a34a' : '#cbd5e1'} strokeWidth="3.5" strokeDasharray="8 6" />
              <circle cx="380" cy="92" r="14" fill="#0f172a" />
            </svg>
          </div>
        ) : (
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{transform: `translateX(${tugX}px)`}}>
              <PhotoFrame
                src="assets/platypus/platypus-1799.jpg"
                mode="light"
                width={900}
                height={475}
                enterAt={Math.round(9.35 * fps)}
                zoomFrom={1.0}
                zoomTo={1.05}
                tag="Arsip 1799 · Shaw & Nodder (Naturalist's Miscellany)"
                accent="#9333ea"
              />
            </div>

            {/* Cursor pulling the duck bill at right side of 1799 drawing */}
            {isPull && !isAsli && (
              <div style={{position: 'absolute', right: 85, top: 245, width: 40, height: 40}}>
                <Tap at={16.65} from={{x: 90, y: 110}} approach={0.45} stay={1.05} ripple="#9333ea" />
              </div>
            )}

            {/* Stamp ASLI! */}
            {isAsli && (
              <div style={{position: 'relative', marginTop: 28}}>
                <Sparks at={18.0} count={18} radius={160} color="#16a34a" />
                <Reveal at={18.0} y={10}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 30px',
                      borderRadius: 16,
                      backgroundColor: '#052e16',
                      border: '2.5px solid #22c55e',
                      color: '#86efac',
                      fontFamily: FONT.mono,
                      fontWeight: 800,
                      fontSize: 26,
                      boxShadow: '0 16px 36px rgba(22, 163, 74, 0.25)',
                    }}
                  >
                    <IconCheckBadge size={30} color="#4ade80" />
                    <span>HASIL TARIK PARUH: 100% ASLI!</span>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        )}
      </div>

      <ElainaStageAnchor
        sceneId="p2-sparepart"
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
   SCENE 3: BERTELUR & SUSU KERINGAT (Dark — Real Egg + Sweat Pore Simulation)
   ============================================================================ */
export const P3TelurKeringatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isEggCrack = t >= 4.9;
  const isSweatMode = t >= 8.9;
  const isSweatFlow = t >= 12.5;
  const isHumanJoke = t >= 19.3;

  let gesture: ElainaGesture = 'idle';
  let gStart = 0;
  if (isHumanJoke) {
    gesture = 'alert';
    gStart = Math.round(19.3 * fps);
  } else if (isSweatMode) {
    gesture = 'point_up';
    gStart = Math.round(8.9 * fps);
  } else if (isEggCrack) {
    gesture = 'alert';
    gStart = Math.round(4.9 * fps);
  }

  const poreX = [175, 345, 515, 685];

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={6} />

      <BendaHook
        mode="dark"
        lead={isSweatMode ? 'Tanpa puting susu, keluar lewat:' : 'Mamalia lain melahirkan, dia:'}
        anchorText={isSweatMode ? 'PORI KERINGAT!' : 'BERTELUR?!'}
        accent={isSweatMode ? '#38bdf8' : '#facc15'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#facc15"
        counterTop={isSweatMode ? '0 PUTING' : 'OVIPAR'}
        counterSub={isSweatMode ? 'kelenjar perut' : 'mamalia nelor'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', active: true},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 472, width: CW, height: 740}}>
        {!isSweatMode ? (
          <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <PhotoFrame
              src="assets/platypus/platypus-egg.jpg"
              mode="dark"
              width={860}
              height={460}
              enterAt={4}
              zoomFrom={1.0}
              zoomTo={1.07}
              tag="Platypus & Echidna · Telur Monotremata"
              accent="#facc15"
            />

            {/* Animated SVG Shell Crack Overlay when "Platypus bertelur!" */}
            {isEggCrack && (
              <svg
                width={860}
                height={460}
                viewBox="0 0 860 460"
                style={{position: 'absolute', top: 0, left: 38, pointerEvents: 'none'}}
              >
                <path
                  d="M250 110 L278 165 L245 205 L288 265 L252 325"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="280"
                  strokeDashoffset={interpolate(t, [4.9, 5.5], [280, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
              </svg>
            )}

            {isEggCrack && (
              <Reveal at={5.0} y={14}>
                <div
                  style={{
                    marginTop: 26,
                    padding: '12px 28px',
                    borderRadius: 14,
                    backgroundColor: '#271e09',
                    border: '2px solid #facc15',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 24,
                    color: '#fde047',
                  }}
                >
                  ANOMALI #1: MAMALIA TAPI BERTELUR
                </div>
              </Reveal>
            )}
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
            {/* Bespoke Animated SVG Sweat-Gland Milk Simulation */}
            <div
              style={{
                position: 'relative',
                width: 880,
                height: 455,
                borderRadius: 22,
                backgroundColor: '#111622',
                border: '1.5px solid rgba(56, 189, 248, 0.32)',
                overflow: 'hidden',
                boxShadow: '0 24px 54px rgba(0,0,0,0.75)',
              }}
            >
              <Shine at={9.1} dur={0.85} alpha={0.22} />
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 22,
                  right: 22,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#94a3b8',
                }}
              >
                <span>SIMULASI KELENJAR SUSU PERUT</span>
                <span style={{color: '#38bdf8'}}>PUTING: 0 · PORI: AKTIF</span>
              </div>

              <svg width={880} height={455} viewBox="0 0 880 455">
                {/* Epidermis / Skin surface band */}
                <rect x="40" y="95" width="800" height="44" rx="12" fill="#334155" stroke="#64748b" strokeWidth="2" />
                <text x="64" y="123" fill="#e2e8f0" fontSize="16" fontFamily="monospace" fontWeight="700">
                  LAPISAN KULIT PERUT PLATYPUS
                </text>

                {/* Sweat pores & animated milk droplets */}
                {poreX.map((px, idx) => {
                  const cycle = isSweatFlow ? ((t - 12.5 + idx * 0.35) % 1.4) / 1.4 : 0;
                  const dropY = 148 + cycle * 195;
                  const dropOp = isSweatFlow
                    ? interpolate(cycle, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
                    : 0;
                  return (
                    <g key={px}>
                      <ellipse cx={px} cy={138} rx={18} ry={8} fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      {/* Gland duct */}
                      <path
                        d={`M${px} 95 Q${px + (idx % 2 === 0 ? -12 : 12)} 65 ${px} 52`}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeOpacity="0.45"
                      />
                      {isSweatFlow && (
                        <g transform={`translate(${px}, ${dropY})`} opacity={dropOp}>
                          <path
                            d="M0 -16 C10 -2 12 10 0 16 C-12 10 -10 -2 0 -16 Z"
                            fill="#f8fafc"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Collection pool at bottom */}
                <rect x="110" y="348" width="660" height="62" rx="14" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="2" />
                <text x="440" y="386" textAnchor="middle" fill="#e0f2fe" fontSize="21" fontFamily="sans-serif" fontWeight="800">
                  {isSweatFlow ? 'SUSU KELUAR LEWAT KERINGAT PERUT' : 'MENUNGGU SEKRESI PORI...'}
                </text>
              </svg>
            </div>

            {isHumanJoke && (
              <Reveal at={19.35} y={14}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 26px',
                    borderRadius: 16,
                    backgroundColor: '#2a1215',
                    border: '2px solid #f87171',
                    fontFamily: FONT.sans,
                    fontWeight: 800,
                    fontSize: 23,
                    color: '#fecaca',
                  }}
                >
                  <IconDroplet size={24} color="#f87171" />
                  <span>&ldquo;Eh Dek, haus ya? Sini jilat ketek Mama.&rdquo;</span>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>

      <ElainaStageAnchor
        sceneId="p3-telur-keringat"
        gesture={gesture}
        gestureFrame={Math.max(0, frame - gStart)}
        side="right"
        theme="dark"
        glowColor={isSweatMode ? 'rgba(56, 189, 248, 0.35)' : 'rgba(250, 204, 21, 0.35)'}
      />
    </AbsoluteFill>
  );
};
