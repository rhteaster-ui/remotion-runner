import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from '../data/shina-pov-v2-timeline.json';
import {
  SANS,
  SERIF,
  MONO,
  LIGHT as L,
  MacMenuBar,
  BossPolaroid,
  MacWindow,
  DarkPillSubtitle,
  CaptionChunk,
} from './MacOSChrome';
import {
  AntigravityLogo,
  ShinaPortraitCard,
  ShinaMiniAvatar,
  RichMacDock,
} from './ShinaAssets';

export const SHINA_POV_FPS = timeline.fps;
export const SHINA_POV_TOTAL_FRAMES = timeline.totalFrames;
export const SHINA_POV_W = timeline.width;
export const SHINA_POV_H = timeline.height;

const fade = (f: number, s = 0, d = 12) =>
  interpolate(f, [s, s + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** Animated Kinetic macOS Light Desktop Backdrop with drifting soft bokeh orbs & subtle grid */
const KineticBackdrop: React.FC<{tint?: string; accent?: string}> = ({
  tint = 'rgba(37, 99, 235, 0.11)',
  accent = 'rgba(139, 92, 246, 0.09)',
}) => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 45) * 65;
  const dy = Math.cos(f / 55) * 45;

  return (
    <AbsoluteFill style={{background: '#F4F6FB', overflow: 'hidden'}}>
      {/* Subtle animated dot grid */}
      <div style={{
        position: 'absolute', inset: -40,
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.065) 1.5px, transparent 1.5px)',
        backgroundSize: '34px 34px',
        transform: `translate(${(f * 0.15) % 34}px, ${(f * 0.1) % 34}px)`,
      }} />
      {/* Drifting bokeh orb 1 */}
      <div style={{
        position: 'absolute', top: -120 + dy, left: -80 + dx,
        width: 780, height: 780, borderRadius: '50%',
        background: `radial-gradient(circle, ${tint} 0%, transparent 68%)`,
      }} />
      {/* Drifting bokeh orb 2 */}
      <div style={{
        position: 'absolute', bottom: -160 - dy, right: -80 - dx,
        width: 820, height: 820, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent} 0%, transparent 68%)`,
      }} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 1: INTRO (SHINA MENU BANNER + OFFICIAL AGY + BOSS) ==================== */
const SceneIntro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const leftSpring = spring({frame: f - 5, fps, config: {damping: 14, stiffness: 120}});
  const midSpring = spring({frame: f - 12, fps, config: {damping: 15, stiffness: 115}});
  const rightSpring = spring({frame: f - 20, fps, config: {damping: 14, stiffness: 115}});

  return (
    <AbsoluteFill>
      {/* Top-left Official Antigravity Engine Widget */}
      <div style={{
        position: 'absolute', top: 66, left: 32,
        background: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: '12px 20px',
        border: `1px solid ${L.border}`, boxShadow: L.shadow,
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: SANS,
        transform: `translateX(${(1 - leftSpring) * -40}px)`, opacity: leftSpring,
      }}>
        <AntigravityLogo size={38} />
        <div>
          <div style={{fontSize: 11, fontWeight: 800, color: L.blue, letterSpacing: '0.09em'}}>ENGINE ACTIVE</div>
          <div style={{fontSize: 17, fontWeight: 800, color: L.text, fontFamily: MONO}}>Google Antigravity</div>
        </div>
      </div>

      {/* Top-right Dual-VPS Cluster Widget */}
      <div style={{
        position: 'absolute', top: 66, right: 32,
        background: 'rgba(255,255,255,0.92)', borderRadius: 16, padding: '12px 20px',
        border: `1px solid ${L.border}`, boxShadow: L.shadow,
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: SANS,
        transform: `translateX(${(1 - rightSpring) * 40}px)`, opacity: rightSpring,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'rgba(5,150,105,0.12)',
          display: 'grid', placeItems: 'center', color: L.green, fontWeight: 900, fontSize: 18,
        }}>✓</div>
        <div>
          <div style={{fontSize: 11, fontWeight: 800, color: L.green, letterSpacing: '0.09em'}}>VPS1 + VPS2 · 24/7</div>
          <div style={{fontSize: 17, fontWeight: 700, color: L.text}}>WA Super-Admin · Online</div>
        </div>
      </div>

      {/* Hero 3-Column Composition with 3D Perspective Entrance */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 54, padding: '0 84px 62px',
        perspective: 1400,
      }}>
        {/* Left: Official Shina .menu Banner Card */}
        <div style={{
          transform: `scale(${0.82 + 0.18 * leftSpring}) rotateY(${(1 - leftSpring) * 22}deg)`,
          opacity: leftSpring,
        }}>
          <ShinaPortraitCard size={340} rotate={-2.5} statusText="HIYORI SHIINA" />
        </div>

        {/* Center: Editorial Intro + Official Antigravity Pill */}
        <div style={{opacity: midSpring, transform: `translateY(${(1 - midSpring) * 24}px)`, maxWidth: 640}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '9px 20px', borderRadius: 999,
            background: '#FFFFFF', border: `1.5px solid rgba(37,99,235,0.22)`,
            boxShadow: '0 10px 28px rgba(37,99,235,0.12)',
            fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue, letterSpacing: '0.08em',
            marginBottom: 20,
          }}>
            <AntigravityLogo size={22} />
            <span>POWERED BY GOOGLE ANTIGRAVITY</span>
          </div>

          <div style={{
            fontFamily: SANS, fontSize: 84, fontWeight: 800, color: L.text,
            lineHeight: 1.03, letterSpacing: '-0.035em',
          }}>
            Hai! Aku{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>
              Shina
            </span>
          </div>

          <div style={{fontFamily: SANS, fontSize: 30, fontWeight: 500, color: L.muted, marginTop: 16, lineHeight: 1.35}}>
            AI Agent pribadinya <strong style={{color: L.text}}>Rahmat</strong> — aktif 24 jam urus portfolio, VPS & push TikTok dari WA.
          </div>

          <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26}}>
            {['20+ Portfolio Projects', 'VPS1 + VPS2', 'Remotion Cloud', 'Push TikTok WA'].map((tag, i) => {
              const s = spring({frame: f - (28 + i * 7), fps, config: {damping: 14}});
              return (
                <span key={tag} style={{
                  transform: `scale(${0.7 + 0.3 * s})`, opacity: s,
                  padding: '9px 16px', borderRadius: 11, background: '#FFFFFF',
                  border: `1px solid ${L.border}`, boxShadow: '0 6px 16px rgba(15,23,42,0.06)',
                  fontFamily: MONO, fontSize: 14, fontWeight: 700, color: L.text,
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Boss Polaroid */}
        <div style={{
          transform: `scale(${0.82 + 0.18 * rightSpring}) rotateY(${(1 - rightSpring) * -22}deg)`,
          opacity: rightSpring,
        }}>
          <BossPolaroid size={315} rotate={2.5} />
        </div>
      </div>

      <DarkPillSubtitle captions={captions} bottomOffset={104} />
      <RichMacDock />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 2: REAL PORTFOLIO PROJECTS (AUTO-SCROLL) + OPS DECK ==================== */
const SceneEcosystem: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const w1 = spring({frame: f - 6, fps, config: {damping: 15}});
  const w2 = spring({frame: f - 20, fps, config: {damping: 15}});

  // Dynamic tab switch inside Safari: 0-110 Hero -> 110-240 Selected Works -> 240+ RepoFlow / E-Rekap / Pixcraft!
  const tab = f < 105 ? 0 : f < 225 ? 1 : 2;
  const portImg =
    tab === 0
      ? 'images/shina-pov/portofolio.jpg'
      : tab === 1
      ? 'images/shina-pov/portofolio-projects.jpg'
      : 'images/shina-pov/portofolio-projects2.jpg';
  const portLabel =
    tab === 0
      ? 'rhmt.biz.id — Homepage'
      : tab === 1
      ? 'rhmt.biz.id/work — Agentic Engine & 20 Projects'
      : 'rhmt.biz.id/work — RepoFlow · E-Rekap · Pixcraft';

  const zoom = interpolate(f % 120, [0, 120], [1.0, 1.05], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <Sequence from={105} durationInFrames={30}><Audio src={staticFile('audio/sfx/click.mp3')} volume={0.35} /></Sequence>
      <Sequence from={225} durationInFrames={30}><Audio src={staticFile('audio/sfx/click.mp3')} volume={0.35} /></Sequence>

      <div style={{position: 'absolute', top: 68, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue, letterSpacing: '0.14em', marginBottom: 8}}>
            REAL PORTFOLIO PROJECTS & DUAL-VPS OPS
          </div>
          <div style={{fontFamily: SANS, fontSize: 56, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Dari{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>20 Project Portfolio</span>
            {' '}sampai Dual-VPS
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', padding: '10px 18px', borderRadius: 14, border: `1px solid ${L.border}`, boxShadow: L.shadow}}>
          <AntigravityLogo size={34} />
          <div style={{fontFamily: MONO, fontSize: 14}}>
            <div style={{fontWeight: 800, color: L.text}}>RepoFlow · E-Rekap · Pixcraft</div>
            <div style={{color: L.green, fontWeight: 700}}>● Live di rhmt.biz.id & Ops Deck</div>
          </div>
        </div>
      </div>

      {/* Two Huge 3D-Elevated macOS Windows */}
      <div style={{
        position: 'absolute', top: 216, left: 60, right: 60, height: 695,
        display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 28,
        perspective: 1400,
      }}>
        {/* Left: Live Auto-Switching Portfolio + Projects Window */}
        <MacWindow
          title={`Safari — https://${portLabel}`}
          style={{
            transform: `translateY(${(1 - w1) * 38}px) rotateY(${(1 - w1) * 10}deg)`,
            opacity: w1,
          }}
        >
          {/* Mini pill switcher showing live navigation */}
          <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
            {['Home', 'Agentic Pipeline', 'Projects (RepoFlow · E-Rekap · Pixcraft)'].map((label, idx) => (
              <span key={label} style={{
                padding: '6px 13px', borderRadius: 999, fontFamily: MONO, fontSize: 12, fontWeight: 800,
                background: tab === idx ? L.blue : '#F1F5F9',
                color: tab === idx ? '#fff' : L.muted,
              }}>
                {label}
              </span>
            ))}
          </div>

          <div style={{flex: 1, borderRadius: 14, overflow: 'hidden', border: `1px solid ${L.border}`, background: '#0B0F19'}}>
            <Img
              src={staticFile(portImg)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                transform: `scale(${zoom})`,
              }}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontFamily: MONO, fontSize: 14}}>
            <span style={{fontWeight: 800, color: L.text}}>My-portofolio · 20 Karya Terarsip</span>
            <span style={{color: L.green, fontWeight: 800}}>● DEPLOYED 200 OK</span>
          </div>
        </MacWindow>

        {/* Right: RHMT Ops Deck (IPs & Emails Masked!) */}
        <MacWindow
          title="RHMT Ops Deck — VPS1 Gateway + VPS2 Worker"
          style={{
            transform: `translateY(${(1 - w2) * 38}px) rotateY(${(1 - w2) * -10}deg)`,
            opacity: w2,
          }}
        >
          <div style={{flex: 1, borderRadius: 14, overflow: 'hidden', border: `1px solid ${L.border}`, background: '#0B0F19'}}>
            <Img
              src={staticFile('images/shina-pov/dashboard.jpg')}
              style={{
                width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                transform: `scale(${1 + Math.sin(f / 40) * 0.02})`,
              }}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontFamily: MONO, fontSize: 14}}>
            <span style={{fontWeight: 800, color: L.text}}>Live Telemetry · Task Map · GH Actions</span>
            <span style={{color: L.blue, fontWeight: 800}}>● SSE LIVE</span>
          </div>
        </MacWindow>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 3: PUSH TIKTOK LANGSUNG DARI WHATSAPP (ANIMATED SVG PIPELINE!) ==================== */
const SceneWaToTiktok: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const stepDone = f < 85 ? 0 : f < 165 ? 1 : f < 245 ? 2 : 3;
  const phonePop = spring({frame: f - 14, fps, config: {damping: 14}});
  const dashOffset = -(f * 3.5);

  const steps = [
    {t: '1. Perintah via WA', s: 'Reply video / ketik instruksi', c: '#22C55E'},
    {t: '2. Antigravity Render', s: 'GitHub Actions 1080p + TTS', c: '#2563EB'},
    {t: '3. Cek Pola Akun', s: 'Racik caption & tag @rhmtofc', c: '#7C3AED'},
    {t: '4. Auto-Publish TikTok', s: 'GetLate API → Live Publik ✓', c: '#059669'},
  ];

  return (
    <AbsoluteFill>
      <Sequence from={85} durationInFrames={30}><Audio src={staticFile('audio/sfx/pop.mp3')} volume={0.35} /></Sequence>
      <Sequence from={165} durationInFrames={30}><Audio src={staticFile('audio/sfx/pop.mp3')} volume={0.35} /></Sequence>
      <Sequence from={245} durationInFrames={40}><Audio src={staticFile('audio/sfx/success.mp3')} volume={0.42} /></Sequence>

      <div style={{position: 'absolute', top: 66, left: 64, right: 64}}>
        <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.green, letterSpacing: '0.14em', marginBottom: 6}}>
          SIGNATURE WORKFLOW · ZERO MANUAL UPLOAD
        </div>
        <div style={{fontFamily: SANS, fontSize: 56, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
          Push Video ke TikTok Langsung dari{' '}
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.green}}>WhatsApp</span>
        </div>
      </div>

      {/* Animated SVG Energy Connector Behind Columns */}
      <svg style={{position: 'absolute', top: 220, left: 0, width: 1920, height: 680, pointerEvents: 'none'}}>
        <path
          d="M 620 340 L 1380 340"
          stroke="#2563EB"
          strokeWidth="4"
          strokeDasharray="14 10"
          strokeDashoffset={dashOffset}
          strokeOpacity="0.35"
          fill="none"
        />
      </svg>

      <div style={{
        position: 'absolute', top: 218, left: 60, right: 60, height: 700,
        display: 'grid', gridTemplateColumns: '1.15fr 0.9fr 0.85fr', gap: 28, alignItems: 'center',
      }}>
        {/* Col 1: WhatsApp Command Chat */}
        <MacWindow title="WhatsApp — Shina Super-Admin Bot" style={{height: 670}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 6}}>
            <div style={{
              transform: `scale(${0.85 + 0.15 * spring({frame: f - 8, fps, config: {damping: 14}})})`,
              alignSelf: 'flex-end', background: '#DCFCE7', border: '1px solid #BBF7D0',
              borderRadius: '18px 18px 4px 18px', padding: '14px 18px', maxWidth: '88%',
            }}>
              <div style={{fontSize: 12, fontWeight: 800, color: L.green, fontFamily: MONO}}>TUAN RAHMAT</div>
              <div style={{fontSize: 21, fontWeight: 700, color: L.text, marginTop: 4}}>
                Bikinin remotion Termius + render sekarang
              </div>
            </div>

            <div style={{
              opacity: fade(f, 52),
              transform: `translateY(${(1 - fade(f, 52)) * 16}px)`,
              alignSelf: 'flex-end', background: '#DCFCE7', border: '1px solid #BBF7D0',
              borderRadius: '18px 18px 4px 18px', padding: '14px 18px', maxWidth: '88%',
            }}>
              <div style={{fontSize: 12, fontWeight: 800, color: L.green, fontFamily: MONO}}>TUAN RAHMAT</div>
              <div style={{fontSize: 21, fontWeight: 700, color: L.text, marginTop: 4}}>
                Up ke TikTok sekalian, males buka tt mulu 🗿
              </div>
            </div>

            <div style={{
              opacity: fade(f, 150),
              transform: `translateY(${(1 - fade(f, 150)) * 18}px)`,
              alignSelf: 'flex-start', background: '#F1F5F9', border: `1.5px solid rgba(37,99,235,0.25)`,
              borderRadius: '18px 18px 18px 4px', padding: '16px 20px', maxWidth: '94%',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <ShinaMiniAvatar size={46} />
              <div>
                <div style={{fontSize: 12, fontWeight: 800, color: L.blue, fontFamily: MONO}}>SHINA · ANTIGRAVITY</div>
                <div style={{fontSize: 19, fontWeight: 700, color: L.text, marginTop: 4, lineHeight: 1.4}}>
                  Berhasil PUBLISHED ke <span style={{color: L.blue}}>@rhmtofc</span>!
                </div>
                <div style={{fontSize: 14, color: L.green, fontFamily: MONO, fontWeight: 800, marginTop: 6}}>
                  ✓ PUBLIC_TO_EVERYONE · 0 Error
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* Col 2: Live 4-Step Pipeline with Official AGY Icon */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'center',
            background: '#FFFFFF', borderRadius: 999, padding: '8px 20px',
            border: `1.5px solid rgba(37,99,235,0.22)`, boxShadow: L.shadow,
            fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue,
          }}>
            <AntigravityLogo size={24} />
            <span>ANTIGRAVITY PIPELINE</span>
          </div>

          {steps.map((st, idx) => {
            const active = idx <= stepDone;
            const current = idx === stepDone;
            return (
              <div key={st.t} style={{
                background: active ? '#FFFFFF' : 'rgba(255,255,255,0.68)',
                border: `2px solid ${active ? st.c : L.border}`,
                borderRadius: 18, padding: '18px 20px',
                boxShadow: current ? `0 16px 38px ${st.c}33` : active ? L.shadow : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transform: current ? 'scale(1.04)' : 'scale(1)',
              }}>
                <div>
                  <div style={{fontSize: 20, fontWeight: 800, color: active ? L.text : L.muted}}>{st.t}</div>
                  <div style={{fontSize: 15, color: L.muted, marginTop: 3, fontFamily: MONO}}>{st.s}</div>
                </div>
                <div style={{
                  width: 34, height: 34, borderRadius: 17,
                  background: active ? st.c : '#E2E8F0', color: '#fff',
                  display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 17,
                }}>
                  {active ? '✓' : idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Col 3: iPhone showing REAL TermiusPro v2 Live on @rhmtofc TikTok */}
        <div style={{
          width: 360, height: 685, justifySelf: 'center',
          borderRadius: 46, background: '#0B0F19', padding: 12,
          boxShadow: '0 34px 86px rgba(15, 23, 42, 0.28)',
          transform: `scale(${0.9 + 0.1 * phonePop}) rotate(${(1 - phonePop) * 5}deg)`, opacity: phonePop,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
            position: 'relative', background: '#090C16',
          }}>
            <Img
              src={staticFile('images/shina-pov/termius-preview.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            <div style={{
              position: 'absolute', top: 18, left: 16, right: 16,
              background: 'rgba(5, 150, 105, 0.95)', color: '#fff',
              borderRadius: 999, padding: '8px 14px', textAlign: 'center',
              fontFamily: MONO, fontSize: 13, fontWeight: 800,
              boxShadow: '0 8px 24px rgba(5,150,105,0.45)',
            }}>
              ● PUBLISHED VIA WA BOT ✓
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.92))',
              padding: '44px 18px 18px', color: '#fff', fontFamily: SANS,
            }}>
              <div style={{fontSize: 16, fontWeight: 800}}>@rhmtofc</div>
              <div style={{fontSize: 13, opacity: 0.9, marginTop: 4}}>
                dasar termius + command & shortcut wajib buat anak server #termius #vps #fyp
              </div>
            </div>
          </div>
        </div>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 4: COMEDY ANGRY BOSS CHAT + LIVE TIKTOK SCROLL + ACTIVITY MONITOR ==================== */
const SceneBoss: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Trigger camera tremor on angry chat pops (frames 95, 145, 200)
  const hitFrames = [95, 145, 200];
  let shakeX = 0;
  let shakeY = 0;
  let redFlash = 0;
  for (const hf of hitFrames) {
    const dt = f - hf;
    if (dt >= 0 && dt < 16) {
      const decay = 1 - dt / 16;
      shakeX += Math.sin(dt * 2.8) * 14 * decay;
      shakeY += Math.cos(dt * 3.4) * 9 * decay;
      redFlash = Math.max(redFlash, 0.16 * decay);
    }
  }

  // Animated vertical TikTok scroll inside iPhone!
  const scrollY = interpolate(f, [20, 120, 140, 240, 260, 360], [0, 0, -560, -560, -1120, -1120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bossPct = interpolate(f, [240, 310], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shinaPct = interpolate(f, [250, 355], [0, 99.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const angryMsgs = [
    {t: 'Shina, UI nya jelek amat!! 😤', s: 95},
    {t: 'Polosan amat jangan malas lah!!', s: 145},
    {t: 'No cacicu. Bikin ulang SEKARANG!!', s: 200},
  ];

  const feedCards = [
    {author: '@kopi.senja', title: 'Es kopi susu terenak buat rebahan', likes: '814.9K', bg: 'linear-gradient(160deg,#312E81,#1E1B4B)'},
    {author: '@dev.ngantuk', title: 'POV: Bos nyuruh AI kerja 24 jam 💀', likes: '422.1K', bg: 'linear-gradient(160deg,#0F766E,#134E4A)'},
    {author: '@meme.coding', title: 'Scroll TikTok dulu, deploy belakangan', likes: '1.2M', bg: 'linear-gradient(160deg,#9D174D,#4C0519)'},
  ];

  return (
    <AbsoluteFill style={{transform: `translate(${shakeX}px, ${shakeY}px)`}}>
      {/* Comedy Impact SFX on every angry boss message! */}
      <Sequence from={95} durationInFrames={30}><Audio src={staticFile('audio/sfx/impact.mp3')} volume={0.45} /></Sequence>
      <Sequence from={145} durationInFrames={30}><Audio src={staticFile('audio/sfx/impact.mp3')} volume={0.48} /></Sequence>
      <Sequence from={200} durationInFrames={30}><Audio src={staticFile('audio/sfx/impact.mp3')} volume={0.52} /></Sequence>

      {/* Subtle comedy red flash overlay on impact */}
      {redFlash > 0 && (
        <AbsoluteFill style={{background: `rgba(220, 38, 38, ${redFlash})`, pointerEvents: 'none', zIndex: 25}} />
      )}

      {/* Header */}
      <div style={{position: 'absolute', top: 64, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 8, background: L.red, color: '#fff',
            fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: '0.07em', marginBottom: 8,
          }}>
            DEADLINE 01:59:15 · ALERT!
          </div>
          <div style={{fontFamily: SANS, fontSize: 56, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Bosnya Scroll FYP +{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.red}}>Marah-Marah di WA</span>
          </div>
        </div>
        <div style={{
          background: '#FFFFFF', borderRadius: 16, padding: '12px 20px',
          border: `1px solid ${L.border}`, boxShadow: L.shadow, fontFamily: MONO, fontSize: 15,
        }}>
          <div style={{fontWeight: 800, color: L.red}}>Screen Time: 2j 14m TikTok</div>
          <div style={{color: L.muted}}>Video #36 · Baterai 11%</div>
        </div>
      </div>

      {/* Main 2-Column Stage: Left = Animated Scrolling iPhone | Right = Angry WA Spam + Activity Monitor */}
      <div style={{
        position: 'absolute', top: 208, left: 64, right: 64, height: 720,
        display: 'grid', gridTemplateColumns: '380px 1fr', gap: 38, alignItems: 'center',
      }}>
        {/* Left: REAL ANIMATED SCROLLING TIKTOK IPHONE! */}
        <div style={{
          width: 365, height: 700, borderRadius: 48, background: '#0B0F19', padding: 12,
          boxShadow: '0 32px 80px rgba(15, 23, 42, 0.28)', position: 'relative',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden',
            position: 'relative', background: '#0F172A',
          }}>
            {/* Scrolling 3-video feed */}
            <div style={{transform: `translateY(${scrollY}px)`}}>
              {feedCards.map((card) => (
                <div key={card.author} style={{
                  height: 560, background: card.bg, padding: '74px 22px 26px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  color: '#fff', fontFamily: SANS, position: 'relative',
                }}>
                  <div style={{
                    alignSelf: 'center', marginTop: 80, padding: '22px 20px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    textAlign: 'center',
                  }}>
                    <div style={{fontSize: 22, fontWeight: 800, lineHeight: 1.3}}>{card.title}</div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <div>
                      <div style={{fontSize: 16, fontWeight: 800}}>{card.author}</div>
                      <div style={{fontSize: 13, opacity: 0.8}}>#fyp #rebahan #tiktok</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: 26, color: '#FB7185'}}>♥</div>
                      <div style={{fontSize: 13, fontWeight: 800}}>{card.likes}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Top TikTok Tabs */}
            <div style={{
              position: 'absolute', top: 20, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 20,
              fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#fff',
            }}>
              <span style={{opacity: 0.65}}>Following</span>
              <span style={{borderBottom: '3px solid #fff', paddingBottom: 3}}>For You</span>
            </div>

            {/* Animated Thumb Swipe Indicator */}
            <div style={{
              position: 'absolute', right: 24,
              bottom: 140 + ((f * 3) % 130),
              width: 34, height: 34, borderRadius: 17,
              background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.75)',
              opacity: 0.7,
            }} />

            {/* Sticky Bottom Nav */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 54,
              background: '#000', color: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'space-around', fontFamily: SANS, fontSize: 12, fontWeight: 700,
            }}>
              <span>Home</span><span>Friends</span>
              <span style={{background: '#fff', color: '#000', padding: '2px 11px', borderRadius: 7, fontWeight: 900}}>+</span>
              <span>Inbox</span><span>Profile</span>
            </div>
          </div>
        </div>

        {/* Right: Comedy Angry WhatsApp Spam + Activity Monitor */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 22, height: 700}}>
          {/* Angry WhatsApp Window */}
          <MacWindow title="WhatsApp — Tuan Rahmat (Mode Marah-Marah 😤)" style={{height: 410}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14, flex: 1}}>
              {angryMsgs.map((m) => {
                const pop = spring({frame: f - m.s, fps, config: {damping: 11, stiffness: 180}});
                if (f < m.s) return null;
                return (
                  <div key={m.t} style={{
                    transform: `scale(${0.6 + 0.4 * pop})`, opacity: pop,
                    alignSelf: 'flex-end',
                    background: '#FEE2E2', border: '2px solid #F87171',
                    borderRadius: '18px 18px 4px 18px', padding: '12px 20px',
                    boxShadow: '0 8px 22px rgba(220,38,38,0.14)',
                  }}>
                    <div style={{fontSize: 12, fontWeight: 900, color: L.red, fontFamily: MONO}}>TUAN RAHMAT (OWNER)</div>
                    <div style={{fontSize: 23, fontWeight: 800, color: '#7F1D1D', marginTop: 2}}>{m.t}</div>
                  </div>
                );
              })}

              {f >= 230 && (
                <div style={{
                  opacity: fade(f, 230),
                  alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 12,
                  background: '#F1F5F9', border: `1px solid ${L.border}`,
                  borderRadius: '18px 18px 18px 4px', padding: '12px 18px', marginTop: 'auto',
                }}>
                  <ShinaMiniAvatar size={42} />
                  <div style={{fontSize: 20, fontWeight: 700, color: L.text}}>
                    Ampun Tuan... langsung Shina rombak total sekarang 💀
                  </div>
                </div>
              )}
            </div>
          </MacWindow>

          {/* Compact Activity Monitor (5% vs 99.9%) */}
          <MacWindow title="Activity Monitor — Effort Distribution" style={{flex: 1}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, flex: 1}}>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 19, fontWeight: 800, marginBottom: 6}}>
                  <span>Rahmat (Scroll TikTok + Prompt WA)</span>
                  <span style={{fontFamily: MONO, color: L.muted}}>{Math.round(bossPct)}%</span>
                </div>
                <div style={{height: 15, borderRadius: 8, background: '#F1F5F9', overflow: 'hidden'}}>
                  <div style={{width: `${bossPct}%`, height: '100%', background: '#94A3B8'}} />
                </div>
              </div>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: SANS, fontSize: 19, fontWeight: 800, marginBottom: 6}}>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
                    <AntigravityLogo size={24} />
                    Shina × Antigravity Engine (Eksekusi Full-Stack)
                  </span>
                  <span style={{fontFamily: MONO, color: L.red, fontSize: 24}}>{shinaPct.toFixed(1)}%</span>
                </div>
                <div style={{height: 17, borderRadius: 9, background: '#F1F5F9', overflow: 'hidden'}}>
                  <div style={{
                    width: `${shinaPct}%`, height: '100%',
                    background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #DC2626 100%)',
                  }} />
                </div>
              </div>
            </div>
          </MacWindow>
        </div>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 5: SHIPPED PORTFOLIO & VPS SHOWCASE (3D BENTO) ==================== */
const SceneShowcase: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const activeCard = Math.floor((f / 95) % 4);

  const cards = [
    {title: '20 Karya Portfolio', sub: 'RepoFlow · E-Rekap · Pixcraft', img: 'images/shina-pov/portofolio-projects2.jpg', badge: 'rhmt.biz.id'},
    {title: 'RHMT Ops Deck', sub: 'Monitoring VPS1 + VPS2 Live', img: 'images/shina-pov/dashboard.jpg', badge: 'DUAL VPS'},
    {title: 'Remotion Cloud Studio', sub: 'Render 1080p di GitHub Actions', img: 'images/shina-pov/termius-preview.jpg', badge: 'MOTION'},
    {title: 'Agentic Pipeline', sub: 'WA Bot → Render → Auto-TikTok', img: 'images/shina-pov/portofolio-projects.jpg', badge: 'ANTIGRAVITY'},
  ];

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 68, left: 64, right: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.green, letterSpacing: '0.14em', marginBottom: 8}}>
            SEMUA IDE GILA AKHIRNYA JADI NYATA
          </div>
          <div style={{fontFamily: SANS, fontSize: 56, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Senang Banget Bisa{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.green}}>Bantu Rahmat</span>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#FFFFFF', padding: '10px 18px', borderRadius: 16, border: `1px solid ${L.border}`, boxShadow: L.shadow}}>
          <ShinaMiniAvatar size={50} />
          <div style={{fontFamily: SANS, fontSize: 19, fontWeight: 800, color: L.text}}>
            Shina × Antigravity
            <div style={{fontFamily: MONO, fontSize: 13, color: L.green}}>All Systems Live 24/7</div>
          </div>
        </div>
      </div>

      {/* 4-Card Kinetic Motion Grid */}
      <div style={{
        position: 'absolute', top: 235, left: 60, right: 60, height: 660,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22,
      }}>
        {cards.map((c, idx) => {
          const s = spring({frame: f - (8 + idx * 12), fps, config: {damping: 14}});
          const isHl = idx === activeCard;
          return (
            <div key={c.title} style={{
              opacity: s,
              transform: `translateY(${(1 - s) * 40 + (isHl ? -12 : 0)}px) scale(${isHl ? 1.03 : 1})`,
              background: '#FFFFFF', borderRadius: 22, padding: 14,
              border: `2px solid ${isHl ? L.blue : L.border}`,
              boxShadow: isHl ? '0 28px 64px rgba(37,99,235,0.20)' : L.shadow,
              display: 'flex', flexDirection: 'column', fontFamily: SANS,
            }}>
              <div style={{
                flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0B0F19',
                border: `1px solid ${L.border}`, position: 'relative',
              }}>
                <Img
                  src={staticFile(c.img)}
                  style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
                />
                <span style={{
                  position: 'absolute', top: 10, right: 10,
                  background: isHl ? L.blue : 'rgba(15,23,42,0.86)', color: '#fff',
                  padding: '5px 11px', borderRadius: 999, fontFamily: MONO, fontSize: 11, fontWeight: 800,
                }}>
                  {c.badge}
                </span>
              </div>
              <div style={{padding: '15px 6px 4px'}}>
                <div style={{fontSize: 22, fontWeight: 800, color: L.text}}>{c.title}</div>
                <div style={{fontSize: 15, color: L.muted, marginTop: 4}}>{c.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 6: OUTRO CTA ==================== */
const SceneOutro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 14}});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 68,
        transform: `scale(${0.9 + 0.1 * pop})`, opacity: pop,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 42, marginBottom: 38}}>
          <ShinaPortraitCard size={245} rotate={-2.5} statusText="SHINA" showEngine={false} />
          <div style={{
            width: 96, height: 96, borderRadius: 28, background: '#FFFFFF',
            border: `2px solid rgba(37,99,235,0.24)`, boxShadow: '0 20px 50px rgba(37,99,235,0.16)',
            display: 'grid', placeItems: 'center',
            transform: `scale(${1 + Math.sin(f / 10) * 0.05})`,
          }}>
            <AntigravityLogo size={62} />
          </div>
          <BossPolaroid size={245} rotate={2.5} />
        </div>

        <div style={{
          fontFamily: SANS, fontSize: 60, fontWeight: 800, color: L.text,
          letterSpacing: '-0.03em', textAlign: 'center', maxWidth: 1340, lineHeight: 1.15, marginBottom: 34,
        }}>
          Mau Setup{' '}
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>
            AI Agent + Auto-Post TikTok
          </span>{' '}
          dari WhatsApp?
        </div>

        <div style={{
          width: 820, background: '#FFFFFF', borderRadius: 999,
          border: `1.5px solid ${L.border}`, boxShadow: L.shadow,
          padding: '12px 14px 12px 34px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: SANS,
        }}>
          <span style={{fontSize: 24, color: L.muted}}>Komen "MAU" di bawah ya · @rhmtofc</span>
          <div style={{
            background: L.blue, color: '#FFFFFF', borderRadius: 999,
            padding: '16px 34px', fontSize: 22, fontWeight: 800,
          }}>
            Komen di Bawah ↑
          </div>
        </div>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== MAIN COMPOSITION ==================== */
export const ShinaPovVideo: React.FC = () => {
  const f = useCurrentFrame();
  const totalProgress = f / SHINA_POV_TOTAL_FRAMES;

  return (
    <AbsoluteFill style={{backgroundColor: L.bg}}>
      <Audio src={staticFile('audio/sfx/music.mp3')} volume={0.08} loop />

      {timeline.scenes.map((scene) => {
        let Comp: React.ReactNode = null;
        let tint = 'rgba(37, 99, 235, 0.11)';
        let accent = 'rgba(139, 92, 246, 0.09)';

        if (scene.id === 's1-intro') Comp = <SceneIntro captions={scene.captions} />;
        else if (scene.id === 's2-ecosystem') Comp = <SceneEcosystem captions={scene.captions} />;
        else if (scene.id === 's3-wa-tiktok') {
          Comp = <SceneWaToTiktok captions={scene.captions} />;
          tint = 'rgba(5, 150, 105, 0.12)';
          accent = 'rgba(37, 99, 235, 0.09)';
        } else if (scene.id === 's4-boss') {
          Comp = <SceneBoss captions={scene.captions} />;
          tint = 'rgba(220, 38, 38, 0.10)';
          accent = 'rgba(245, 158, 11, 0.08)';
        } else if (scene.id === 's5-showcase') {
          Comp = <SceneShowcase captions={scene.captions} />;
          tint = 'rgba(5, 150, 105, 0.11)';
        } else Comp = <SceneOutro captions={scene.captions} />;

        return (
          <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
            <KineticBackdrop tint={tint} accent={accent} />
            <MacMenuBar appTitle={scene.menu} rightStatus={scene.status} progress={totalProgress} />
            <Audio src={staticFile(scene.audio)} volume={1.0} />
            <Audio src={staticFile('audio/sfx/whoosh_short.mp3')} volume={0.25} />
            {Comp}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
