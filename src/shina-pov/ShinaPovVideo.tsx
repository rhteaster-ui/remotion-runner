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

const fade = (f: number, s = 0, d = 14) =>
  interpolate(f, [s, s + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const LightBackdrop: React.FC<{tint?: string}> = ({tint = 'rgba(37, 99, 235, 0.07)'}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 20% 22%, ${tint} 0%, rgba(244,246,251,0) 48%),
                   radial-gradient(circle at 82% 76%, rgba(99, 102, 241, 0.07) 0%, rgba(244,246,251,0) 48%),
                   #F4F6FB`,
    }}
  />
);

/* ==================== SCENE 1: MEET SHINA (HIYORI SHIINA x ANTIGRAVITY) ==================== */
const SceneIntro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: f - 4, fps, config: {damping: 16, stiffness: 120}});
  const rightEnter = spring({frame: f - 16, fps, config: {damping: 15, stiffness: 110}});

  return (
    <AbsoluteFill>
      {/* Top-left Antigravity Engine Widget */}
      <div style={{
        position: 'absolute', top: 68, left: 32,
        background: '#FFFFFF', borderRadius: 16, padding: '12px 20px',
        border: `1px solid ${L.border}`, boxShadow: L.shadow,
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: SANS,
      }}>
        <AntigravityLogo size={36} />
        <div>
          <div style={{fontSize: 11, fontWeight: 800, color: L.blue, letterSpacing: '0.08em'}}>ENGINE ACTIVE</div>
          <div style={{fontSize: 17, fontWeight: 700, color: L.text, fontFamily: MONO}}>Google Antigravity OS</div>
        </div>
      </div>

      {/* Top-right Dual-VPS Cluster Widget */}
      <div style={{
        position: 'absolute', top: 68, right: 32,
        background: '#FFFFFF', borderRadius: 16, padding: '12px 20px',
        border: `1px solid ${L.border}`, boxShadow: L.shadow,
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: SANS,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'rgba(5,150,105,0.12)',
          display: 'grid', placeItems: 'center', color: L.green, fontWeight: 900, fontSize: 18,
        }}>✓</div>
        <div>
          <div style={{fontSize: 11, fontWeight: 800, color: L.green, letterSpacing: '0.08em'}}>VPS1 + VPS2 · 24/7</div>
          <div style={{fontSize: 17, fontWeight: 700, color: L.text}}>WA Super-Admin · Online</div>
        </div>
      </div>

      {/* Hero Center: Shina Portrait + Editorial Intro + Boss Polaroid */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 56, padding: '0 90px 64px',
      }}>
        <div style={{transform: `scale(${0.86 + 0.14 * enter})`, opacity: enter}}>
          <ShinaPortraitCard size={330} rotate={-2.5} statusText="HIYORI SHIINA" />
        </div>

        <div style={{opacity: enter, transform: `translateY(${(1 - enter) * 18}px)`, maxWidth: 650}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 18px', borderRadius: 999,
            background: '#FFFFFF', border: `1px solid rgba(37,99,235,0.22)`,
            boxShadow: '0 8px 24px rgba(37,99,235,0.10)',
            fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue, letterSpacing: '0.08em',
            marginBottom: 20,
          }}>
            <AntigravityLogo size={20} />
            <span>POWERED BY ANTIGRAVITY ENGINE</span>
          </div>

          <div style={{
            fontFamily: SANS, fontSize: 82, fontWeight: 800, color: L.text,
            lineHeight: 1.04, letterSpacing: '-0.035em',
          }}>
            Hai! Aku{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>
              Shina
            </span>
          </div>

          <div style={{fontFamily: SANS, fontSize: 30, fontWeight: 500, color: L.muted, marginTop: 16, lineHeight: 1.35}}>
            AI Agent pribadinya <strong style={{color: L.text}}>Rahmat</strong> — aktif 24 jam di VPS, WhatsApp & Cloud Render.
          </div>

          <div style={{display: 'flex', gap: 12, marginTop: 26}}>
            {['Web Portfolio', 'Dual-VPS Ops', 'Remotion', 'Push TikTok WA'].map((tag) => (
              <span key={tag} style={{
                padding: '8px 15px', borderRadius: 10, background: '#FFFFFF',
                border: `1px solid ${L.border}`, fontFamily: MONO, fontSize: 14, fontWeight: 700, color: L.text,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{transform: `scale(${0.88 + 0.12 * rightEnter})`, opacity: rightEnter}}>
          <BossPolaroid size={310} rotate={2.5} />
        </div>
      </div>

      <DarkPillSubtitle captions={captions} bottomOffset={104} />
      <RichMacDock />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 2: REAL VPS ECOSYSTEM (LIVE SCREENSHOTS!) ==================== */
const SceneEcosystem: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const w1 = spring({frame: f - 6, fps, config: {damping: 16}});
  const w2 = spring({frame: f - 20, fps, config: {damping: 16}});

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 72, left: 68, right: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue, letterSpacing: '0.14em', marginBottom: 8}}>
            REAL VPS & PORTFOLIO ECOSYSTEM
          </div>
          <div style={{fontFamily: SANS, fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Semua Project Nyata di{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>VPS Rahmat</span>
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#FFFFFF', padding: '10px 18px', borderRadius: 14, border: `1px solid ${L.border}`, boxShadow: L.shadow}}>
          <ShinaMiniAvatar size={42} />
          <div style={{fontFamily: MONO, fontSize: 14}}>
            <div style={{fontWeight: 800, color: L.text}}>VPS1 Gateway ⇄ VPS2 Worker</div>
            <div style={{color: L.green, fontWeight: 700}}>● GitHub Actions Cloud Render</div>
          </div>
        </div>
      </div>

      {/* Two HUGE Crisp Real Screenshot macOS Windows */}
      <div style={{
        position: 'absolute', top: 220, left: 64, right: 64, height: 690,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
      }}>
        {/* Real Screenshot 1: rhmt.biz.id (My-portofolio) */}
        <MacWindow
          title="Safari — https://rhmt.biz.id (My-portofolio)"
          style={{transform: `translateY(${(1 - w1) * 32}px)`, opacity: w1}}
        >
          <div style={{flex: 1, borderRadius: 12, overflow: 'hidden', border: `1px solid ${L.border}`, background: '#0B0F19'}}>
            <Img
              src={staticFile('images/shina-pov/portofolio.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontFamily: MONO, fontSize: 15}}>
            <span style={{fontWeight: 800, color: L.text}}>Web Portofolio Resmi · rhmt.biz.id</span>
            <span style={{color: L.green, fontWeight: 800}}>● LIVE 200 OK</span>
          </div>
        </MacWindow>

        {/* Real Screenshot 2: rhmt-dashboard (Ops Deck, IPs masked) */}
        <MacWindow
          title="RHMT Ops Deck — Dual-VPS Telemetry & Task Map"
          style={{transform: `translateY(${(1 - w2) * 32}px)`, opacity: w2}}
        >
          <div style={{flex: 1, borderRadius: 12, overflow: 'hidden', border: `1px solid ${L.border}`, background: '#0B0F19'}}>
            <Img
              src={staticFile('images/shina-pov/dashboard.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontFamily: MONO, fontSize: 15}}>
            <span style={{fontWeight: 800, color: L.text}}>Monitoring VPS1 + VPS2 + Quota + Actions</span>
            <span style={{color: L.blue, fontWeight: 800}}>● SSE LIVE</span>
          </div>
        </MacWindow>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 3: SIGNATURE SCENE — PUSH TIKTOK LEWAT WHATSAPP! ==================== */
const SceneWaToTiktok: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const stepDone = f < 90 ? 0 : f < 170 ? 1 : f < 250 ? 2 : 3;
  const phonePop = spring({frame: f - 14, fps, config: {damping: 15}});

  const steps = [
    {t: '1. Perintah di WA', s: 'Reply video / ketik instruksi', c: '#22C55E'},
    {t: '2. Antigravity Render', s: 'GitHub Actions 1080p + TTS', c: '#2563EB'},
    {t: '3. Cek Pola Akun', s: 'Racik caption & tag @rhmtofc', c: '#7C3AED'},
    {t: '4. Auto-Publish TikTok', s: 'GetLate API → Live Publik ✓', c: '#059669'},
  ];

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 68, left: 64, right: 64}}>
        <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.green, letterSpacing: '0.14em', marginBottom: 6}}>
          SIGNATURE WORKFLOW · ZERO MANUAL UPLOAD
        </div>
        <div style={{fontFamily: SANS, fontSize: 56, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
          Push Video ke TikTok Langsung dari{' '}
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.green}}>WhatsApp</span>
        </div>
      </div>

      {/* 3-Column Live Pipeline Stage: WhatsApp Chat -> Automated Engine -> Live TikTok Phone */}
      <div style={{
        position: 'absolute', top: 218, left: 60, right: 60, height: 700,
        display: 'grid', gridTemplateColumns: '1.15fr 0.9fr 0.85fr', gap: 28, alignItems: 'center',
      }}>
        {/* Col 1: Authentic WhatsApp Command Chat */}
        <MacWindow title="WhatsApp — Shina Super-Admin Bot" style={{height: 670}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 6}}>
            <div style={{
              alignSelf: 'flex-end', background: '#DCFCE7', border: '1px solid #BBF7D0',
              borderRadius: '18px 18px 4px 18px', padding: '14px 18px', maxWidth: '88%',
            }}>
              <div style={{fontSize: 12, fontWeight: 800, color: L.green, fontFamily: MONO}}>TUAN RAHMAT</div>
              <div style={{fontSize: 21, fontWeight: 700, color: L.text, marginTop: 4}}>
                Bikinin remotion Termius + render sekarang
              </div>
            </div>

            <div style={{
              opacity: fade(f, 55), alignSelf: 'flex-end', background: '#DCFCE7', border: '1px solid #BBF7D0',
              borderRadius: '18px 18px 4px 18px', padding: '14px 18px', maxWidth: '88%',
            }}>
              <div style={{fontSize: 12, fontWeight: 800, color: L.green, fontFamily: MONO}}>TUAN RAHMAT</div>
              <div style={{fontSize: 21, fontWeight: 700, color: L.text, marginTop: 4}}>
                Up ke TikTok sekalian, males buka tt mulu 🗿
              </div>
            </div>

            <div style={{
              opacity: fade(f, 150), alignSelf: 'flex-start', background: '#F1F5F9', border: `1px solid ${L.border}`,
              borderRadius: '18px 18px 18px 4px', padding: '16px 20px', maxWidth: '94%',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <ShinaMiniAvatar size={44} />
              <div>
                <div style={{fontSize: 12, fontWeight: 800, color: L.blue, fontFamily: MONO}}>SHINA · ANTIGRAVITY</div>
                <div style={{fontSize: 19, fontWeight: 700, color: L.text, marginTop: 4, lineHeight: 1.4}}>
                  Berhasil PUBLISHED ke <span style={{color: L.blue}}>@rhmtofc</span>!
                </div>
                <div style={{fontSize: 14, color: L.green, fontFamily: MONO, fontWeight: 700, marginTop: 6}}>
                  ✓ Status: PUBLIC_TO_EVERYONE
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* Col 2: Live 4-Step Pipeline */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'center',
            background: '#FFFFFF', borderRadius: 999, padding: '8px 18px',
            border: `1px solid ${L.border}`, boxShadow: L.shadow,
            fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue,
          }}>
            <AntigravityLogo size={20} />
            <span>AUTONOMOUS PIPELINE</span>
          </div>

          {steps.map((st, idx) => {
            const active = idx <= stepDone;
            return (
              <div key={st.t} style={{
                background: active ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                border: `2px solid ${active ? st.c : L.border}`,
                borderRadius: 18, padding: '18px 20px',
                boxShadow: active ? L.shadow : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transform: idx === stepDone ? 'scale(1.03)' : 'scale(1)',
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
          boxShadow: '0 32px 80px rgba(15, 23, 42, 0.25)',
          transform: `scale(${0.92 + 0.08 * phonePop})`, opacity: phonePop,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
            position: 'relative', background: '#090C16',
          }}>
            <Img
              src={staticFile('images/shina-pov/termius-preview.jpg')}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />
            {/* Top Published Badge */}
            <div style={{
              position: 'absolute', top: 18, left: 16, right: 16,
              background: 'rgba(5, 150, 105, 0.94)', color: '#fff',
              borderRadius: 999, padding: '8px 14px', textAlign: 'center',
              fontFamily: MONO, fontSize: 13, fontWeight: 800,
              boxShadow: '0 8px 24px rgba(5,150,105,0.45)',
            }}>
              ● PUBLISHED VIA WA BOT ✓
            </div>
            {/* Bottom TikTok Overlay */}
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

/* ==================== SCENE 4: BOSS vs SHINA (ACTIVITY MONITOR + REVISIONS) ==================== */
const SceneBoss: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const bossPct = interpolate(f, [20, 80], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shinaPct = interpolate(f, [30, 120], [0, 99.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 70, left: 68, right: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 8, background: L.red, color: '#fff',
            fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', marginBottom: 10,
          }}>
            REALITA DI BALIK LAYAR
          </div>
          <div style={{fontFamily: SANS, fontSize: 60, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Terus Bosnya{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.red}}>Ngapain?</span>
          </div>
        </div>

        {/* Screen Time Pill */}
        <div style={{
          background: '#FFFFFF', borderRadius: 18, padding: '16px 24px',
          border: `1px solid ${L.border}`, boxShadow: L.shadow,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <Img src={staticFile('images/rhmtofc-avatar.jpg')} style={{width: 54, height: 54, borderRadius: 14, objectFit: 'cover'}} />
          <div>
            <div style={{fontFamily: SANS, fontSize: 20, fontWeight: 800, color: L.text}}>Rebahan + Scroll FYP</div>
            <div style={{fontFamily: MONO, fontSize: 14, color: L.red, fontWeight: 700}}>Screen Time: 2j 14m · Baterai 11%</div>
          </div>
        </div>
      </div>

      {/* Main Content: Shina Portrait + Activity Monitor + Floating Revision Chats */}
      <div style={{
        position: 'absolute', top: 250, left: 68, right: 68,
        display: 'flex', alignItems: 'center', gap: 52,
      }}>
        <ShinaPortraitCard size={310} rotate={-1.5} statusText="CPU 99.9%" />

        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 22}}>
          {/* Floating Boss Chat Pills */}
          <div style={{display: 'flex', gap: 14}}>
            {[
              '"Shina, UI-nya perbaiki!"',
              '"No cacicu, render sekarang!"',
              '"Up ke TikTok sekalian!"',
            ].map((q, i) => (
              <div key={q} style={{
                opacity: fade(f, 35 + i * 28),
                background: '#DCFCE7', border: '1px solid #BBF7D0',
                borderRadius: 14, padding: '12px 18px',
                fontFamily: SANS, fontSize: 18, fontWeight: 700, color: L.text,
              }}>
                {q}
              </div>
            ))}
          </div>

          {/* macOS Activity Monitor */}
          <MacWindow title="Activity Monitor — Pembagian Kerja Nyata" style={{height: 365}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36, flex: 1, padding: '4px 10px'}}>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                    <Img src={staticFile('images/rhmtofc-avatar.jpg')} style={{width: 48, height: 48, borderRadius: 12, objectFit: 'cover'}} />
                    <div>
                      <div style={{fontSize: 24, fontWeight: 800, color: L.text}}>Rahmat (The Boss)</div>
                      <div style={{fontSize: 15, color: L.muted, fontFamily: MONO}}>Ngetik Prompt di WA + Scroll TikTok</div>
                    </div>
                  </div>
                  <div style={{fontFamily: MONO, fontSize: 36, fontWeight: 800, color: L.muted}}>{Math.round(bossPct)}%</div>
                </div>
                <div style={{height: 20, borderRadius: 10, background: '#F1F5F9', overflow: 'hidden'}}>
                  <div style={{width: `${bossPct}%`, height: '100%', borderRadius: 10, background: '#94A3B8'}} />
                </div>
              </div>

              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                    <AntigravityLogo size={46} />
                    <div>
                      <div style={{fontSize: 24, fontWeight: 800, color: L.text}}>Shina × Antigravity Engine</div>
                      <div style={{fontSize: 15, color: L.red, fontFamily: MONO}}>
                        Coding · VPS1/VPS2 · Ops Deck · Remotion · Auto-Post TikTok
                      </div>
                    </div>
                  </div>
                  <div style={{fontFamily: MONO, fontSize: 40, fontWeight: 900, color: L.red}}>{shinaPct.toFixed(1)}%</div>
                </div>
                <div style={{height: 22, borderRadius: 11, background: '#F1F5F9', overflow: 'hidden'}}>
                  <div style={{
                    width: `${shinaPct}%`, height: '100%', borderRadius: 11,
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

/* ==================== SCENE 5: SHIPPED PROJECTS BENTO SHOWCASE ==================== */
const SceneShowcase: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const cards = [
    {title: 'rhmt.biz.id', sub: 'Portfolio & Personal Archive', img: 'images/shina-pov/portofolio.jpg', badge: 'LIVE WEB'},
    {title: 'RHMT Ops Deck', sub: 'Dual-VPS Telemetry & Task Map', img: 'images/shina-pov/dashboard.jpg', badge: 'VPS1 + VPS2'},
    {title: 'Remotion Cloud Studio', sub: 'Auto-Render Video via GH Actions', img: 'images/shina-pov/termius-preview.jpg', badge: '1080P 30FPS'},
  ];

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 70, left: 68, right: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.green, letterSpacing: '0.14em', marginBottom: 8}}>
            SEMUA WACANA AKHIRNYA JADI NYATA
          </div>
          <div style={{fontFamily: SANS, fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
            Senang Banget Bisa{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.green}}>Bantu Rahmat</span>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <ShinaMiniAvatar size={56} />
          <div style={{fontFamily: SANS, fontSize: 20, fontWeight: 700, color: L.text}}>
            4+ Sistem Jalan 24 Jam
            <div style={{fontFamily: MONO, fontSize: 14, color: L.green}}>Otonom via Antigravity</div>
          </div>
        </div>
      </div>

      {/* 3 Real Visual Project Cards */}
      <div style={{
        position: 'absolute', top: 245, left: 64, right: 64, height: 640,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26,
      }}>
        {cards.map((c, idx) => (
          <div key={c.title} style={{
            opacity: fade(f, 10 + idx * 18),
            background: '#FFFFFF', borderRadius: 22, padding: 16,
            border: `1px solid ${L.border}`, boxShadow: L.shadow,
            display: 'flex', flexDirection: 'column', fontFamily: SANS,
          }}>
            <div style={{
              flex: 1, borderRadius: 14, overflow: 'hidden', background: '#0B0F19',
              border: `1px solid ${L.border}`, position: 'relative',
            }}>
              <Img src={staticFile(c.img)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top'}} />
              <span style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(15,23,42,0.85)', color: '#fff',
                padding: '5px 12px', borderRadius: 999, fontFamily: MONO, fontSize: 12, fontWeight: 800,
              }}>
                {c.badge}
              </span>
            </div>
            <div style={{padding: '16px 6px 4px'}}>
              <div style={{fontSize: 24, fontWeight: 800, color: L.text}}>{c.title}</div>
              <div style={{fontSize: 16, color: L.muted, marginTop: 4}}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 6: OUTRO CTA ==================== */
const SceneOutro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 15}});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 68,
        transform: `scale(${0.92 + 0.08 * pop})`, opacity: pop,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40}}>
          <ShinaPortraitCard size={240} rotate={-2} statusText="SHINA" showEngine={false} />
          <div style={{
            width: 84, height: 84, borderRadius: 24, background: '#FFFFFF',
            border: `1.5px solid rgba(37,99,235,0.22)`, boxShadow: L.shadow,
            display: 'grid', placeItems: 'center',
          }}>
            <AntigravityLogo size={52} />
          </div>
          <BossPolaroid size={240} rotate={2} />
        </div>

        <div style={{
          fontFamily: SANS, fontSize: 60, fontWeight: 800, color: L.text,
          letterSpacing: '-0.03em', textAlign: 'center', maxWidth: 1320, lineHeight: 1.15, marginBottom: 34,
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
        let tint = 'rgba(37, 99, 235, 0.07)';
        if (scene.id === 's1-intro') Comp = <SceneIntro captions={scene.captions} />;
        else if (scene.id === 's2-ecosystem') Comp = <SceneEcosystem captions={scene.captions} />;
        else if (scene.id === 's3-wa-tiktok') {
          Comp = <SceneWaToTiktok captions={scene.captions} />;
          tint = 'rgba(5, 150, 105, 0.07)';
        } else if (scene.id === 's4-boss') {
          Comp = <SceneBoss captions={scene.captions} />;
          tint = 'rgba(220, 38, 38, 0.06)';
        } else if (scene.id === 's5-showcase') {
          Comp = <SceneShowcase captions={scene.captions} />;
          tint = 'rgba(5, 150, 105, 0.07)';
        } else Comp = <SceneOutro captions={scene.captions} />;

        return (
          <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
            <LightBackdrop tint={tint} />
            <MacMenuBar appTitle={scene.menu} rightStatus={scene.status} progress={totalProgress} />
            <Audio src={staticFile(scene.audio)} volume={1.0} />
            <Audio src={staticFile('audio/sfx/whoosh_short.mp3')} volume={0.22} />
            {Comp}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
