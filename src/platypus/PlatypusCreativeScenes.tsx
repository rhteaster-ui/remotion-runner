import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BendaBackground, BendaHook, BendaStepper, BendaWatermark} from '../components/PosterStage';
import {Reveal, Shine, Sparks, Tap} from '../premium/fx';
import {pop} from '../lib/anim';
import {CW, FONT, M} from '../lib/theme';
import {
  IconAlertTriangle,
  IconBioSearch,
  IconCheckBadge,
  IconDroplet,
  PhotoFrame,
} from './PlatypusKit';

/* ============================================================================
   SCENE 1: HOOK (Dark Mode — Giant Hero Photo + Biometric Target Reticle)
   ============================================================================ */
export const P1HookCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isReveal = t >= 4.25;
  const isSpare = t >= 7.4;

  const scanX = interpolate(Math.sin(t * 1.4), [-1, 1], [140, 820]);
  const scanY = interpolate(Math.cos(t * 1.1), [-1, 1], [120, 520]);

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

      {/* Zona Hero Stage: Luas, Bold, Tanpa Karakter */}
      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Giant Hero Frame (960 x 640) */}
        <div style={{position: 'relative', width: 960}}>
          <PhotoFrame
            src="assets/platypus/platypus-swim.jpg"
            mode="dark"
            width={960}
            height={640}
            enterAt={3}
            zoomFrom={1.0}
            zoomTo={1.08}
            tag="Ornithorhynchus anatinus · Australia Timur"
            accent="#38bdf8"
          />

          {/* Biometric Laser Reticle */}
          <svg
            width={960}
            height={640}
            viewBox="0 0 960 640"
            style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}
          >
            <g transform={`translate(${scanX}, ${scanY})`} opacity={t > 0.5 ? 0.95 : 0}>
              <circle cx="0" cy="0" r="54" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="10 6" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#facc15" strokeWidth="2" />
              <line x1="-70" y1="0" x2="-26" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="26" y1="0" x2="70" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="0" y1="-70" x2="0" y2="-26" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="0" y1="26" x2="0" y2="70" stroke="#38bdf8" strokeWidth="2.5" />
            </g>
          </svg>
        </div>

        {/* Dual Large Dossier Cards */}
        <div style={{display: 'flex', gap: 24, marginTop: 32, width: 960}}>
          <Reveal at={4.3} y={20}>
            <div
              style={{
                flex: 1,
                padding: '20px 28px',
                borderRadius: 20,
                backgroundColor: 'rgba(15, 23, 42, 0.88)',
                border: '2px solid rgba(56, 189, 248, 0.45)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconBioSearch size={32} color="#38bdf8" />
              </div>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#94a3b8', letterSpacing: '0.08em'}}>
                  STATUS TAKSONOMI
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 800, color: '#f8fafc', marginTop: 4}}>
                  100% MAMALIA
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal at={5.2} y={20}>
            <div
              style={{
                flex: 1,
                padding: '20px 28px',
                borderRadius: 20,
                backgroundColor: 'rgba(31, 22, 42, 0.88)',
                border: '2px solid rgba(250, 204, 21, 0.45)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: 'rgba(250, 204, 21, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconAlertTriangle size={32} color="#facc15" />
              </div>
              <div>
                <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#fde047', letterSpacing: '0.08em'}}>
                  HASIL DIAGNOSA
                </div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 800, color: '#f8fafc', marginTop: 4}}>
                  SPESIES MONOTREMATA
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Giant Stamp Slam when "sisaan sparepart binatang lain" */}
        {isSpare && (
          <Reveal at={7.45} y={-15}>
            <div
              style={{
                marginTop: 32,
                padding: '16px 36px',
                borderRadius: 16,
                backgroundColor: '#dc2626',
                border: '3px solid #fecaca',
                boxShadow: '0 20px 50px rgba(220, 38, 38, 0.65)',
                transform: 'rotate(-2deg)',
                textAlign: 'center',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 28, color: '#ffffff', letterSpacing: '0.12em'}}>
                ⚠️ 404 SPEC: SISA SPAREPART GAK KEPAKE!
              </span>
            </div>
          </Reveal>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: SPAREPART & UJI 1799 (Light Mode — 3-Panel Dissection & Historic Beak Pull)
   ============================================================================ */
export const P2SparepartCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isPhaseB = t >= 9.3;
  const isPull = t >= 16.5;
  const isAsli = t >= 17.95;

  const parts = [
    {
      label: 'MONCONG BEBEK',
      sub: 'Paruh Bebek Pipih',
      img: 'assets/platypus/duck-bill.jpg',
      at: 4.55,
      color: '#d97706',
    },
    {
      label: 'EKOR BERANG',
      sub: 'Ekor Dayung Pipih',
      img: 'assets/platypus/beaver.jpg',
      at: 5.95,
      color: '#0284c7',
    },
    {
      label: 'KAKI KATAK',
      sub: 'Selaput Renang Katak',
      img: 'assets/platypus/frog.jpg',
      at: 8.05,
      color: '#16a34a',
    },
  ];

  const tugX =
    t >= 16.5 && t < 18.0
      ? Math.sin(((t - 16.5) / 1.5) * Math.PI * 3) * 22
      : 0;

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
        counterTop={isPhaseB ? '1799' : '3-IN-1'}
        counterSub={isPhaseB ? 'arsip ilmiah' : 'donor organ'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', active: true},
          {label: 'TELUR'},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {!isPhaseB ? (
          /* Phase A: 3 Massive Animal Cards Side by Side */
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 960}}>
            <div style={{display: 'flex', gap: 24, width: '100%', justifyContent: 'center'}}>
              {parts.map((p, i) => (
                <Reveal key={i} at={p.at} y={24}>
                  <div
                    style={{
                      width: 300,
                      backgroundColor: '#ffffff',
                      borderRadius: 22,
                      overflow: 'hidden',
                      border: `2.5px solid ${p.color}`,
                      boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12)',
                    }}
                  >
                    <div style={{width: 300, height: 420, overflow: 'hidden'}}>
                      <Img
                        src={staticFile(p.img)}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    </div>
                    <div style={{padding: '18px 20px', textAlign: 'center'}}>
                      <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 22, color: '#0f172a'}}>
                        {p.label}
                      </div>
                      <div style={{fontFamily: FONT.sans, fontSize: 16, color: '#64748b', marginTop: 4, fontWeight: 600}}>
                        {p.sub}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal at={8.2} y={16}>
              <div
                style={{
                  marginTop: 36,
                  padding: '16px 36px',
                  borderRadius: 999,
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 22,
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.25)',
                }}
              >
                MAMALIA BERBULU + PARUH BEBEK + KAKI KATAK = PLATYPUS!
              </div>
            </Reveal>
          </div>
        ) : (
          /* Phase B: Historic 1799 Naturalist Document with Beak Tug */
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 960}}>
            <div style={{position: 'relative', width: 960, transform: `translateX(${tugX}px)`}}>
              <PhotoFrame
                src="assets/platypus/platypus-1799.jpg"
                mode="light"
                width={960}
                height={580}
                enterAt={3}
                zoomFrom={1.0}
                zoomTo={1.06}
                tag="George Shaw (1799) · Naturalist's Miscellany"
                accent="#9333ea"
              />

              {/* Scissors Stitching Indicator during pull */}
              {isPull && (
                <div
                  style={{
                    position: 'absolute',
                    top: '40%',
                    right: 80,
                    padding: '14px 26px',
                    borderRadius: 16,
                    backgroundColor: 'rgba(220, 38, 38, 0.95)',
                    color: '#ffffff',
                    fontFamily: FONT.mono,
                    fontWeight: 800,
                    fontSize: 22,
                    boxShadow: '0 12px 30px rgba(220, 38, 38, 0.5)',
                  }}
                >
                  ✂️ UJI JAHITAN PARUH...
                </div>
              )}
            </div>

            {/* Verification Result Stamp */}
            {isAsli && (
              <Reveal at={18.0} y={-10}>
                <div
                  style={{
                    marginTop: 32,
                    padding: '18px 42px',
                    borderRadius: 20,
                    backgroundColor: '#16a34a',
                    border: '3px solid #bbf7d0',
                    boxShadow: '0 24px 50px rgba(22, 163, 74, 0.5)',
                    textAlign: 'center',
                  }}
                >
                  <span style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 32, color: '#ffffff', letterSpacing: '0.04em'}}>
                    ✅ HASIL UJI: 100% ASLI! BUKAN BONEKA!
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: BERTELUR & SUSU PERUT (Dark Mode — Giant Egg Crack & Gland Blueprint)
   ============================================================================ */
export const P3TelurKeringatCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isEggCrack = t >= 4.9;
  const isGlandMode = t >= 8.9;
  const isHumor = t >= 19.3;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={6} />

      <BendaHook
        mode="dark"
        lead={isGlandMode ? 'Tanpa puting susu, keluar lewat:' : 'Mamalia lain melahirkan, dia:'}
        anchorText={isGlandMode ? 'PORI KERINGAT!' : 'BERTELUR?!'}
        accent={isGlandMode ? '#38bdf8' : '#facc15'}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#facc15"
        counterTop={isGlandMode ? '0 PUTING' : 'OVIPAR'}
        counterSub={isGlandMode ? 'kelenjar perut' : 'mamalia nelor'}
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', active: true},
          {label: 'USUS'},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {!isGlandMode ? (
          /* Egg Stage: Giant Photo & Crack */
          <div style={{position: 'relative', width: 960, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <PhotoFrame
              src="assets/platypus/platypus-egg.jpg"
              mode="dark"
              width={960}
              height={560}
              enterAt={3}
              zoomFrom={1.0}
              zoomTo={1.07}
              tag="Telur Monotremata · Spesies Bertelur & Menyusui"
              accent="#facc15"
            />

            {/* Split Comparison Cards */}
            <div style={{display: 'flex', gap: 24, marginTop: 32, width: 960}}>
              <div
                style={{
                  flex: 1,
                  padding: '22px 28px',
                  borderRadius: 20,
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '2px solid rgba(148, 163, 184, 0.3)',
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: '#94a3b8'}}>MAMALIA UMUM</div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 800, color: '#f8fafc', marginTop: 6}}>
                  MELAHIRKAN (VIVIPAR)
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '22px 28px',
                  borderRadius: 20,
                  backgroundColor: 'rgba(250, 204, 21, 0.12)',
                  border: '2.5px solid #facc15',
                  textAlign: 'center',
                }}
              >
                <div style={{fontFamily: FONT.mono, fontSize: 16, color: '#fde047'}}>PLATYPUS</div>
                <div style={{fontFamily: FONT.space, fontSize: 26, fontWeight: 900, color: '#fef08a', marginTop: 6}}>
                  BERTELUR (OVIPAR)! 🥚
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Gland Simulation & Humor Card */
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 960}}>
            {/* Diagram Pori Keringat / Kelenjar Susu */}
            <div
              style={{
                width: 960,
                padding: '36px 40px',
                borderRadius: 24,
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: '2.5px solid rgba(56, 189, 248, 0.55)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
                textAlign: 'center',
              }}
            >
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 24px', borderRadius: 999, backgroundColor: '#0284c7', color: '#ffffff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 18}}>
                <IconDroplet size={22} color="#ffffff" />
                ANATOMI KELENJAR SUSU PERUT
              </div>

              <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 40}}>
                {[1, 2, 3, 4].map((idx) => {
                  const dropY = (frame * 3 + idx * 25) % 80;
                  return (
                    <div key={idx} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                      <div style={{width: 72, height: 72, borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '2px dashed #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span style={{fontFamily: FONT.mono, fontSize: 14, color: '#38bdf8', fontWeight: 800}}>PORI {idx}</span>
                      </div>
                      <div style={{height: 90, position: 'relative', width: 14}}>
                        <div
                          style={{
                            position: 'absolute',
                            top: dropY,
                            width: 14,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 0 16px #38bdf8',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{marginTop: 20, fontFamily: FONT.space, fontSize: 26, fontWeight: 800, color: '#f8fafc'}}>
                Tanpa Puting Susu: Susu Dikeluarkan Lewat Pori-Pori Kulit Perut
              </div>
            </div>

            {/* Dialog Humor Box */}
            {isHumor && (
              <Reveal at={19.4} y={20}>
                <div
                  style={{
                    marginTop: 32,
                    width: 960,
                    padding: '24px 36px',
                    borderRadius: 22,
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '2px solid #ef4444',
                    textAlign: 'center',
                  }}
                >
                  <p style={{fontFamily: FONT.sans, fontSize: 24, fontWeight: 700, color: '#fca5a5', margin: 0, lineHeight: 1.5}}>
                    "Bayangkan kalau manusia begini: Anak haus disuruh jilat keringat perut... Pasti bikin bingung dari bayi! 😂"
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};


/* ============================================================================
   SCENE 4: GAK PUNYA LAMBUNG (Light Mode — Direct Gut Blueprint & Chat Rejection)
   ============================================================================ */
export const P4TanpaLambungCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isChat = t >= 11.5;
  const isReject = t >= 16.2;

  // Particle position through digestive tract
  const foodProgress = (frame * 6) % 360;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={6} />

      <BendaHook
        mode="light"
        lead={isChat ? 'Jadi gak bisa alasan kerja:' : 'Sistem pencernaan paling simpel:'}
        anchorText={isChat ? 'GERD KAMBUH?!' : 'GAK PUNYA LAMBUNG'}
        accent={isChat ? '#dc2626' : '#0284c7'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#0284c7"
        counterTop="ZERO GERD"
        counterSub="langsung usus"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', active: true},
          {label: 'RACUN'},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Anatomical Tube Blueprint Card */}
        <div
          style={{
            width: 960,
            padding: '32px 36px',
            borderRadius: 24,
            backgroundColor: '#ffffff',
            border: '2.5px solid #0284c7',
            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: '#0284c7'}}>
              SKEMA DIGESTIF ORNITHORHYNCHUS
            </span>
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, padding: '4px 14px', borderRadius: 999, backgroundColor: '#fee2e2', color: '#dc2626'}}>
              404: STOMACH NOT FOUND
            </span>
          </div>

          {/* Direct Pipe Graphic */}
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 28, width: '100%', justifyContent: 'center'}}>
            <div style={{padding: '16px 24px', borderRadius: 16, backgroundColor: '#f1f5f9', border: '1.5px solid #cbd5e1', textAlign: 'center'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#64748b'}}>INPUT</div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 22, color: '#0f172a'}}>TENGGOROKAN</div>
            </div>

            <div style={{width: 140, height: 16, backgroundColor: '#e2e8f0', borderRadius: 999, position: 'relative', overflow: 'hidden'}}>
              <div
                style={{
                  position: 'absolute',
                  left: foodProgress % 140,
                  width: 32,
                  height: '100%',
                  borderRadius: 999,
                  backgroundColor: '#0284c7',
                }}
              />
            </div>

            <div style={{padding: '16px 24px', borderRadius: 16, backgroundColor: '#fef2f2', border: '2px dashed #ef4444', textAlign: 'center', opacity: 0.6}}>
              <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#ef4444'}}>KOSONG</div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 22, color: '#dc2626', textDecoration: 'line-through'}}>LAMBUNG</div>
            </div>

            <div style={{width: 140, height: 16, backgroundColor: '#e2e8f0', borderRadius: 999, position: 'relative', overflow: 'hidden'}}>
              <div
                style={{
                  position: 'absolute',
                  left: foodProgress % 140,
                  width: 32,
                  height: '100%',
                  borderRadius: 999,
                  backgroundColor: '#16a34a',
                }}
              />
            </div>

            <div style={{padding: '16px 24px', borderRadius: 16, backgroundColor: '#f0fdf4', border: '1.5px solid #86efac', textAlign: 'center'}}>
              <div style={{fontFamily: FONT.mono, fontSize: 14, color: '#16a34a'}}>PROSES</div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 22, color: '#15803d'}}>LANGSUNG USUS</div>
            </div>
          </div>

          <div style={{marginTop: 24, fontFamily: FONT.sans, fontSize: 20, color: '#475569', fontWeight: 600}}>
            Makanan langsung masuk usus tanpa diproses kantong asam lambung.
          </div>
        </div>

        {/* WhatsApp GERD Leave Rejection Card */}
        {isChat && (
          <Reveal at={11.6} y={24}>
            <div
              style={{
                marginTop: 32,
                width: 960,
                borderRadius: 22,
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12)',
                padding: '24px 32px',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid #f1f5f9', paddingBottom: 14}}>
                <div style={{width: 44, height: 44, borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800}}>
                  WA
                </div>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 20, color: '#0f172a'}}>Karyawan Platypus</div>
                  <div style={{fontFamily: FONT.sans, fontSize: 14, color: '#22c55e', fontWeight: 600}}>Online</div>
                </div>
              </div>

              <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14}}>
                <div style={{alignSelf: 'flex-start', padding: '14px 22px', borderRadius: 18, backgroundColor: '#f1f5f9', maxWidth: 640}}>
                  <div style={{fontFamily: FONT.sans, fontSize: 22, color: '#0f172a', fontWeight: 600}}>
                    "Bos, izin ya... asam lambung / GERD saya lagi kambuh 🤢"
                  </div>
                </div>

                {isReject && (
                  <Reveal at={16.3} y={10}>
                    <div style={{alignSelf: 'flex-end', padding: '16px 26px', borderRadius: 18, backgroundColor: '#dc2626', color: '#ffffff', maxWidth: 640, boxShadow: '0 10px 26px rgba(220, 38, 38, 0.4)'}}>
                      <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900}}>
                        ❌ BOHONG LU! ORANG LAMBUNG AJA GAK PUNYA!
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: TAJI BERACUN (Dark Mode — Giant Macro Spur & Danger Dossier)
   ============================================================================ */
export const P5TajiBeracunCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isDossier = t >= 6.2;
  const pulseAlert = Math.sin(frame * 0.25) * 0.4 + 0.6;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={6} />

      <BendaHook
        mode="dark"
        lead="Senjata rahasia di kaki belakang:"
        anchorText="TAJI BERACUN!"
        accent="#ef4444"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#ef4444"
        counterTop="LETHAL"
        counterSub="pejantan"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', active: true},
          {label: 'SEBLAK'},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Giant Macro Frame of Spur */}
        <div style={{position: 'relative', width: 960}}>
          <PhotoFrame
            src="assets/platypus/platypus-spur-crisp.jpg"
            mode="dark"
            width={960}
            height={580}
            enterAt={3}
            zoomFrom={1.0}
            zoomTo={1.07}
            tag="Calcaneal Spur (Taji Tulang Kaki Pejantan)"
            accent="#ef4444"
          />

          {/* Biohazard Alert Reticle */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              padding: '10px 20px',
              borderRadius: 999,
              backgroundColor: `rgba(220, 38, 38, ${pulseAlert})`,
              color: '#ffffff',
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 18,
              boxShadow: '0 0 24px rgba(239, 68, 68, 0.8)',
            }}
          >
            ⚠️ BIOHAZARD: RACUN DEFENSIN
          </div>
        </div>

        {/* Danger Telemetry Spec Grid */}
        <div style={{display: 'flex', gap: 24, marginTop: 32, width: 960}}>
          <div
            style={{
              flex: 1,
              padding: '24px 28px',
              borderRadius: 20,
              backgroundColor: 'rgba(30, 10, 10, 0.9)',
              border: '2px solid rgba(239, 68, 68, 0.55)',
            }}
          >
            <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#fca5a5'}}>EFEK RACUN</div>
            <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: '#ffffff', marginTop: 4}}>
              Rasa Sakit Berbulan-bulan
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 16, color: '#f87171', marginTop: 4}}>
              Kebal terhadap obat penahan rasa sakit biasa
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '24px 28px',
              borderRadius: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid rgba(56, 189, 248, 0.45)',
            }}
          >
            <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#94a3b8'}}>PARADOKS ALAM</div>
            <div style={{fontFamily: FONT.space, fontSize: 24, fontWeight: 900, color: '#38bdf8', marginTop: 4}}>
              Muka Kartun Lucu
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 16, color: '#cbd5e1', marginTop: 4}}>
              Badan empuk gemoy tapi bersenjata taji mematikan!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 6: OUTRO AUSTRALIA & SEBLAK (Light Mode — Continental Map & Brand Card)
   ============================================================================ */
export const P6OutroSeblakCreativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  const isSeblak = t >= 4.5;
  const isBrand = t >= 7.8;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={6} total={6} />

      <BendaHook
        mode="light"
        lead={isSeblak ? 'Kecuali kalau lu apes ketemu dia:' : 'Takut ketemu dia? Tenang aja:'}
        anchorText={isSeblak ? 'JAJAN SEBLAK?!' : 'CUMA DI AUSTRALIA!'}
        accent={isSeblak ? '#dc2626' : '#16a34a'}
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#16a34a"
        counterTop="ENDEMIK"
        counterSub="habitat alami"
        nodes={[
          {label: 'HOOK', done: true},
          {label: 'SPAREPART', done: true},
          {label: 'TELUR', done: true},
          {label: 'USUS', done: true},
          {label: 'RACUN', done: true},
          {label: 'SEBLAK', active: true},
        ]}
      />

      <div style={{position: 'absolute', left: M, top: 460, width: CW, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {!isSeblak ? (
          /* Australia Map & Safe Habitat Banner */
          <div style={{width: 960, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div
              style={{
                width: 960,
                height: 540,
                borderRadius: 24,
                backgroundColor: '#ffffff',
                border: '2.5px solid #16a34a',
                boxShadow: '0 20px 48px rgba(22, 163, 74, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: '#16a34a'}}>
                🌏 CONTINENTAL HABITAT
              </div>
              <div style={{fontFamily: FONT.space, fontSize: 44, fontWeight: 900, color: '#0f172a', marginTop: 12}}>
                AUSTRALIA TIMUR & TASMANIA
              </div>
              <div style={{marginTop: 18, padding: '12px 28px', borderRadius: 999, backgroundColor: '#f0fdf4', color: '#15803d', fontFamily: FONT.mono, fontSize: 18, fontWeight: 700}}>
                Aman 100% dari lingkungan sehari-hari!
              </div>
            </div>
          </div>
        ) : (
          /* Seblak Comedy Pop-in & Official Creator Card */
          <div style={{width: 960, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {/* Seblak Photo Hero (960 x 480) */}
            <div style={{position: 'relative', width: 960}}>
              <PhotoFrame
                src="assets/platypus/seblak.jpg"
                mode="light"
                width={960}
                height={480}
                enterAt={3}
                zoomFrom={1.0}
                zoomTo={1.08}
                tag="Warung Seblak Pengkolan · Indonesia"
                accent="#dc2626"
              />

              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  left: 24,
                  padding: '12px 24px',
                  borderRadius: 14,
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontFamily: FONT.space,
                  fontWeight: 900,
                  fontSize: 22,
                  boxShadow: '0 12px 30px rgba(220, 38, 38, 0.5)',
                }}
              >
                🍜 SEBLAK LEVEL 5 PENGKOLAN
              </div>
            </div>

            {/* Official Creator Card (rhmt ofc) */}
            {isBrand && (
              <Reveal at={7.9} y={20}>
                <div
                  style={{
                    marginTop: 28,
                    width: 960,
                    padding: '24px 36px',
                    borderRadius: 24,
                    backgroundColor: '#0f172a',
                    border: '2px solid #38bdf8',
                    boxShadow: '0 20px 50px rgba(15, 23, 42, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                    <Img
                      src={staticFile('assets/portfolio/rhmt-mark.svg')}
                      style={{width: 72, height: 72}}
                    />
                    <div>
                      <div style={{fontFamily: FONT.space, fontWeight: 900, fontSize: 32, color: '#f8fafc'}}>
                        rhmt ofc
                      </div>
                      <div style={{fontFamily: FONT.mono, fontSize: 18, color: '#38bdf8', fontWeight: 700}}>
                        rhmt.biz.id · github.com/rhmt-ofc
                      </div>
                    </div>
                  </div>

                  <div style={{padding: '12px 24px', borderRadius: 999, backgroundColor: 'rgba(56, 189, 248, 0.15)', border: '1.5px solid #38bdf8', color: '#7dd3fc', fontFamily: FONT.mono, fontWeight: 800, fontSize: 16}}>
                    Fakta Sains & Edukasi Berbobot
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
