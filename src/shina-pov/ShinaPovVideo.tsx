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
import timeline from '../data/shina-pov-timeline.json';
import {PixelShina} from './PixelShina';
import {
  SANS,
  SERIF,
  MONO,
  LIGHT as L,
  MacMenuBar,
  BossPolaroid,
  MacWindow,
  MacDock,
  DarkPillSubtitle,
  CaptionChunk,
} from './MacOSChrome';

export const SHINA_POV_FPS = timeline.fps;
export const SHINA_POV_TOTAL_FRAMES = timeline.totalFrames;
export const SHINA_POV_W = timeline.width;
export const SHINA_POV_H = timeline.height;

const fade = (f: number, s = 0, d = 14) =>
  interpolate(f, [s, s + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/* ==================== LIGHT DESKTOP BACKDROP ==================== */
const LightBackdrop: React.FC<{tint?: string}> = ({tint = 'rgba(37, 99, 235, 0.06)'}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 22% 28%, ${tint} 0%, rgba(244,246,251,0) 48%),
                   radial-gradient(circle at 82% 72%, rgba(99, 102, 241, 0.06) 0%, rgba(244,246,251,0) 48%),
                   #F4F6FB`,
    }}
  />
);

/* ==================== SCENE 1: INTRO ==================== */
const SceneIntro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: f - 4, fps, config: {damping: 16, stiffness: 120}});
  const cardEnter = spring({frame: f - 16, fps, config: {damping: 15, stiffness: 110}});

  return (
    <AbsoluteFill>
      {/* Top-left & Top-right macOS widgets */}
      <div style={{
        position: 'absolute', top: 68, left: 32,
        background: '#FFFFFF', borderRadius: 16, padding: '12px 20px',
        border: `1px solid ${L.border}`, boxShadow: L.shadow,
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: SANS,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.1)',
          display: 'grid', placeItems: 'center', color: L.blue, fontWeight: 900, fontSize: 20,
        }}>A</div>
        <div>
          <div style={{fontSize: 11, fontWeight: 800, color: L.blue, letterSpacing: '0.08em'}}>WORKSPACE READY</div>
          <div style={{fontSize: 17, fontWeight: 700, color: L.text, fontFamily: MONO}}>/home/rdev · 12 Active</div>
        </div>
      </div>

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
          <div style={{fontSize: 11, fontWeight: 800, color: L.green, letterSpacing: '0.08em'}}>VPS1 + VPS2</div>
          <div style={{fontSize: 17, fontWeight: 700, color: L.text}}>All Services · 100% Online ✓</div>
        </div>
      </div>

      {/* Main Center Composition */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 64, padding: '0 110px 60px',
      }}>
        <div style={{transform: `scale(${0.8 + 0.2 * enter})`, opacity: enter}}>
          <PixelShina size={290} mood="happy" showHeart />
        </div>

        <div style={{opacity: enter, transform: `translateY(${(1 - enter) * 20}px)`, maxWidth: 640}}>
          <div style={{
            display: 'inline-block', padding: '7px 16px', borderRadius: 999,
            background: 'rgba(37,99,235,0.09)', color: L.blue,
            fontFamily: MONO, fontSize: 14, fontWeight: 800, letterSpacing: '0.1em',
            marginBottom: 18,
          }}>
            ANTIGRAVITY PIXEL COMPANION
          </div>
          <div style={{
            fontFamily: SANS, fontSize: 84, fontWeight: 800, color: L.text,
            lineHeight: 1.05, letterSpacing: '-0.035em',
          }}>
            Hai! Aku{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>
              Shina
            </span>
          </div>
          <div style={{
            fontFamily: SANS, fontSize: 32, fontWeight: 500, color: L.muted, marginTop: 18,
          }}>
            Antigravity AI Agent-nya <strong style={{color: L.text}}>Rahmat</strong>.
          </div>
        </div>

        <div style={{transform: `scale(${0.88 + 0.12 * cardEnter})`, opacity: cardEnter}}>
          <BossPolaroid size={320} rotate={3} />
        </div>
      </div>

      <DarkPillSubtitle captions={captions} bottomOffset={104} />
      <MacDock />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 2: FULL-STACK WORKLOAD (3 MAC WINDOWS) ==================== */
const SceneWorkload: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const playhead = interpolate(f, [20, 260], [10, 92], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 82, left: 0, right: 0, textAlign: 'center', fontFamily: SANS}}>
        <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.blue, letterSpacing: '0.14em', marginBottom: 10}}>
          FULL-STACK WORKLOAD
        </div>
        <div style={{fontSize: 64, fontWeight: 800, color: L.text, letterSpacing: '-0.03em'}}>
          Semua Hal Langsung Dilempar ke{' '}
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>Shina</span>
        </div>
      </div>

      {/* 3 Side-by-Side Real macOS Windows */}
      <div style={{
        position: 'absolute', top: 265, left: 64, right: 64, height: 465,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28,
      }}>
        {/* Window 1: VS Code */}
        <MacWindow
          title="VS Code — My-portofolio/src/App.tsx"
          style={{transform: `translateY(${(1 - spring({frame: f - 8, fps, config: {damping: 16}})) * 30}px)`}}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
            <div style={{fontSize: 28, fontWeight: 800, color: L.text}}>Project Web</div>
            <div style={{padding: '5px 12px', borderRadius: 8, background: '#EFF6FF', color: L.blue, fontFamily: MONO, fontSize: 14, fontWeight: 800}}>
              VITE + REACT
            </div>
          </div>
          <div style={{
            flex: 1, background: '#0F172A', borderRadius: 14, padding: 20,
            fontFamily: MONO, fontSize: 17, color: '#E2E8F0', lineHeight: 1.7,
          }}>
            <div style={{color: '#64748B'}}>/home/rdev/My-portofolio</div>
            <div style={{color: '#38BDF8'}}>$ npm run build</div>
            <div style={{color: '#34D399'}}>✓ dist/index.html built in 840ms</div>
            <div style={{color: '#34D399'}}>✓ Deployed to rhmt.biz.id</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: MONO, fontSize: 14, fontWeight: 700, color: L.green}}>
            <span>● LIVE DEPLOYED</span>
            <span>200 OK</span>
          </div>
        </MacWindow>

        {/* Window 2: Termius VPS */}
        <MacWindow
          title="Termius — VPS1 & VPS2 Cluster"
          style={{transform: `translateY(${(1 - spring({frame: f - 24, fps, config: {damping: 16}})) * 30}px)`}}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
            <div style={{fontSize: 28, fontWeight: 800, color: L.text}}>Kelola VPS & Bot</div>
            <div style={{padding: '5px 12px', borderRadius: 8, background: '#ECFDF5', color: L.green, fontFamily: MONO, fontSize: 14, fontWeight: 800}}>
              PM2 · 6 ONLINE
            </div>
          </div>
          <div style={{
            flex: 1, background: '#111424', borderRadius: 14, padding: 20,
            fontFamily: MONO, fontSize: 17, color: '#29D386', lineHeight: 1.75,
          }}>
            <div style={{color: '#94A3B8'}}>root@vps1:~$ pm2 status</div>
            <div>● wa-bot          online  0%</div>
            <div>● rhmt-dashboard  online  0%</div>
            <div>● tg-agent-bot    online  0%</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: MONO, fontSize: 14, fontWeight: 700, color: L.blue}}>
            <span>● VPS1 + VPS2 SYNCED</span>
            <span>HEALTHY ✓</span>
          </div>
        </MacWindow>

        {/* Window 3: Remotion + TikTok */}
        <MacWindow
          title="Remotion — TermiusPro_v2.mp4"
          style={{transform: `translateY(${(1 - spring({frame: f - 40, fps, config: {damping: 16}})) * 30}px)`}}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
            <div style={{fontSize: 28, fontWeight: 800, color: L.text}}>Motion & Auto-Post</div>
            <div style={{padding: '5px 12px', borderRadius: 8, background: '#FEF3C7', color: '#D97706', fontFamily: MONO, fontSize: 14, fontWeight: 800}}>
              30FPS · 1080P
            </div>
          </div>
          <div style={{
            flex: 1, background: '#0F172A', borderRadius: 14, padding: 20,
            position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
          }}>
            <div style={{height: 28, width: '92%', borderRadius: 7, background: '#2563EB'}} />
            <div style={{height: 28, width: '78%', borderRadius: 7, background: '#10B981'}} />
            <div style={{height: 28, width: '86%', borderRadius: 7, background: '#F59E0B'}} />
            {/* Animated Red Playhead */}
            <div style={{
              position: 'absolute', top: 12, bottom: 12, left: `${playhead}%`,
              width: 3, background: '#EF4444', boxShadow: '0 0 12px rgba(239,68,68,0.7)',
            }} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: MONO, fontSize: 14, fontWeight: 700, color: '#D97706'}}>
            <span>● RENDERED + AUTO-POSTED TIKTOK ✓</span>
          </div>
        </MacWindow>
      </div>

      {/* Cute Pixel Shina working at bottom right */}
      <div style={{position: 'absolute', bottom: 118, right: 240}}>
        <PixelShina size={160} mood="working" />
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 3: PLOT TWIST ("TERUS RAHMAT-NYA NGAPAIN?") ==================== */
const SceneBoss: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const barW = interpolate(f, [15, 110], [20, 78], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const phonePop = spring({frame: f - 10, fps, config: {damping: 16}});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '40px 120px 80px',
      }}>
        {/* Left side */}
        <div style={{width: 920}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20}}>
            <div style={{
              padding: '8px 18px', borderRadius: 10, background: L.red, color: '#fff',
              fontFamily: MONO, fontSize: 18, fontWeight: 800, letterSpacing: '0.06em',
            }}>
              DEADLINE 01:59:15
            </div>
          </div>

          <div style={{fontFamily: SANS, fontSize: 74, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', marginBottom: 32}}>
            Terus Rahmat-nya{' '}
            <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.red}}>
              Ngapain?
            </span>
          </div>

          {/* Screen Time Card */}
          <div style={{
            background: '#FFFFFF', borderRadius: 20, padding: '24px 28px',
            border: `1px solid ${L.border}`, boxShadow: L.shadow, marginBottom: 36,
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18}}>
              <Img
                src={staticFile('images/rhmtofc-avatar.jpg')}
                style={{width: 62, height: 62, borderRadius: 16, objectFit: 'cover'}}
              />
              <div>
                <div style={{fontFamily: SANS, fontSize: 26, fontWeight: 800, color: L.text}}>
                  Sibuk Rebahan + Scroll TikTok
                </div>
                <div style={{fontFamily: SANS, fontSize: 18, color: L.muted, marginTop: 4}}>
                  Screen Time Hari Ini: <strong style={{color: L.red}}>2j 14m di TikTok</strong> · Video #36 · Baterai 11%
                </div>
              </div>
            </div>
            <div style={{height: 12, borderRadius: 6, background: '#F1F5F9', overflow: 'hidden'}}>
              <div style={{
                width: `${barW}%`, height: '100%', borderRadius: 6,
                background: 'linear-gradient(90deg, #0F172A, #E11D48)',
              }} />
            </div>
          </div>

          {/* Deadpan Shina + Chat Bubble */}
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <PixelShina size={175} mood="deadpan" showDots />
            <div style={{
              background: '#FFFFFF', borderRadius: 18, padding: '20px 26px',
              border: `1px solid ${L.border}`, boxShadow: L.shadow, fontFamily: SANS,
            }}>
              <div style={{fontFamily: MONO, fontSize: 13, fontWeight: 800, color: L.blue, letterSpacing: '0.08em', marginBottom: 6}}>
                SHINA
              </div>
              <div style={{fontSize: 24, fontWeight: 600, color: L.text}}>
                Sementara aku render video & jagain server...
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Realistic iPhone TikTok FYP Mockup */}
        <div style={{
          width: 410, height: 800, borderRadius: 52, background: '#0B0F19',
          padding: 14, boxShadow: '0 36px 90px rgba(15, 23, 42, 0.28)',
          transform: `scale(${0.9 + 0.1 * phonePop})`, opacity: phonePop,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden',
            background: 'linear-gradient(165deg, #1E1B4B 0%, #312E81 38%, #0F172A 100%)',
            position: 'relative', display: 'flex', flexDirection: 'column', fontFamily: SANS, color: '#fff',
          }}>
            {/* Top Tabs */}
            <div style={{
              paddingTop: 46, display: 'flex', justifyContent: 'center', gap: 22,
              fontSize: 18, fontWeight: 700,
            }}>
              <span style={{opacity: 0.6}}>Following</span>
              <span style={{borderBottom: '3px solid #fff', paddingBottom: 4}}>For You</span>
            </div>

            {/* Center visual inside phone */}
            <div style={{flex: 1, display: 'grid', placeItems: 'center', padding: 28, textAlign: 'center'}}>
              <div style={{
                padding: '22px 24px', borderRadius: 22,
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
              }}>
                <div style={{fontSize: 24, fontWeight: 800}}>POV: Rebahan Sambil</div>
                <div style={{fontSize: 24, fontWeight: 800, color: '#38BDF8', marginTop: 4}}>AI Kerja 24 Jam</div>
                <div style={{fontSize: 15, opacity: 0.75, marginTop: 10, fontFamily: MONO}}>#vibecoding #fyp</div>
              </div>
            </div>

            {/* Right engagement rail */}
            <div style={{
              position: 'absolute', right: 16, bottom: 130,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, fontSize: 14, fontWeight: 700,
            }}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 28, color: '#FB7185'}}>♥</div>
                <div>814.9K</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: 24}}>💬</div>
                <div>6,890</div>
              </div>
            </div>

            {/* Bottom caption & nav */}
            <div style={{padding: '0 20px 20px', fontSize: 15}}>
              <div style={{fontWeight: 800}}>@rhmtofc</div>
              <div style={{opacity: 0.85, marginTop: 4}}>scroll tiktok dulu bos lagi nyantai #fyp</div>
            </div>
            <div style={{
              height: 58, background: '#000', display: 'flex',
              alignItems: 'center', justifyContent: 'space-around', fontSize: 13, fontWeight: 600, opacity: 0.9,
            }}>
              <span>Home</span><span>Friends</span>
              <span style={{background: '#fff', color: '#000', padding: '2px 12px', borderRadius: 8, fontWeight: 900}}>+</span>
              <span>Inbox</span><span>Profile</span>
            </div>
          </div>
        </div>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 4: WHATSAPP INCOMING COMMANDS ==================== */
const SceneChat: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const msgs = [
    {text: 'Shina, UI nya jelek amat perbaiki!', time: '21:31', start: 30},
    {text: 'No cacicu. Render sekarang!', time: '21:32', start: 95},
    {text: 'Up ke TikTok sekalian biar gak ribet!', time: '21:33', start: 160},
  ];

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 72, padding: '30px 110px 80px',
      }}>
        <div style={{textAlign: 'center'}}>
          <PixelShina size={240} mood="deadpan" showDots />
          <div style={{fontFamily: SANS, fontSize: 22, fontWeight: 700, color: L.muted, marginTop: 18}}>
            Sabar banget jadi AI Agent...
          </div>
        </div>

        <MacWindow title="WhatsApp — Tuan Rahmat (Owner)" style={{width: 820, height: 560}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20, padding: '8px 6px'}}>
            {msgs.map((m) => {
              const s = spring({frame: f - m.start, fps, config: {damping: 15}});
              return (
                <div key={m.text} style={{
                  opacity: s, transform: `translateX(${(1 - s) * 40}px)`,
                  alignSelf: 'flex-end',
                  background: '#DCFCE7', border: '1px solid #BBF7D0',
                  borderRadius: '20px 20px 6px 20px',
                  padding: '18px 24px', maxWidth: 620,
                  boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
                }}>
                  <div style={{fontSize: 13, fontWeight: 800, color: L.green, fontFamily: MONO, marginBottom: 4}}>
                    TUAN RAHMAT
                  </div>
                  <div style={{fontSize: 26, fontWeight: 700, color: L.text}}>{m.text}</div>
                  <div style={{fontSize: 13, color: L.muted, textAlign: 'right', marginTop: 6, fontFamily: MONO}}>
                    {m.time} ✓✓
                  </div>
                </div>
              );
            })}

            {f >= 230 && (
              <div style={{
                opacity: fade(f, 230),
                alignSelf: 'flex-start',
                background: '#F1F5F9', border: `1px solid ${L.border}`,
                borderRadius: '20px 20px 20px 6px',
                padding: '16px 24px',
              }}>
                <div style={{fontSize: 13, fontWeight: 800, color: L.blue, fontFamily: MONO, marginBottom: 4}}>
                  SHINA (AI AGENT)
                </div>
                <div style={{fontSize: 24, fontWeight: 600, color: L.text}}>
                  Siap, Tuan! Langsung eksekusi sekarang...
                </div>
              </div>
            )}
          </div>
        </MacWindow>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 5: WHOLESOME MODE ==================== */
const SceneWholesome: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 15}});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 70,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 68,
          transform: `scale(${0.92 + 0.08 * pop})`, opacity: pop,
        }}>
          <PixelShina size={240} mood="happy" showHeart />

          <div>
            <div style={{
              fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.green,
              letterSpacing: '0.14em', marginBottom: 14,
            }}>
              BEST DUO ON VPS
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 70, fontWeight: 800, color: L.text,
              lineHeight: 1.08, letterSpacing: '-0.03em',
            }}>
              Senang Banget Bisa<br />
              <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.green}}>
                Bantu Rahmat
              </span>
            </div>
          </div>

          <BossPolaroid size={270} rotate={-2.5} />
        </div>

        {/* Shipped Projects Strip */}
        <div style={{display: 'flex', gap: 18, marginTop: 52}}>
          {[
            'rhmt.biz.id ✓',
            'rhmt-dashboard ✓',
            'TermiusPro v2 ✓',
            'Auto-Post TikTok ✓',
          ].map((item, i) => (
            <div key={item} style={{
              opacity: fade(f, 35 + i * 16),
              background: '#FFFFFF', border: '1.5px solid rgba(5,150,105,0.28)',
              borderRadius: 999, padding: '14px 26px',
              fontFamily: MONO, fontSize: 20, fontWeight: 700, color: L.green,
              boxShadow: L.shadow,
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 6: ACTIVITY MONITOR (5% vs 99.9%) ==================== */
const SceneActivity: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const bossPct = interpolate(f, [15, 70], [0, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shinaPct = interpolate(f, [25, 110], [0, 99.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 70, padding: '0 100px 60px',
      }}>
        <PixelShina size={265} mood="wink" showSparkle />

        <MacWindow title="Activity Monitor — Siapa Yang Kerja Keras?" style={{width: 1120, height: 390}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 40, flex: 1, padding: '6px 12px'}}>
            {/* Row 1: The Boss (5%) */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <Img
                    src={staticFile('images/rhmtofc-avatar.jpg')}
                    style={{width: 52, height: 52, borderRadius: 12, objectFit: 'cover'}}
                  />
                  <div>
                    <div style={{fontSize: 26, fontWeight: 800, color: L.text}}>Rahmat (The Boss)</div>
                    <div style={{fontSize: 16, color: L.muted, fontFamily: MONO}}>Ngetik Prompt di WA + Scroll TikTok</div>
                  </div>
                </div>
                <div style={{fontFamily: MONO, fontSize: 38, fontWeight: 800, color: L.muted}}>
                  {Math.round(bossPct)}%
                </div>
              </div>
              <div style={{height: 22, borderRadius: 11, background: '#F1F5F9', overflow: 'hidden'}}>
                <div style={{width: `${bossPct}%`, height: '100%', borderRadius: 11, background: '#94A3B8'}} />
              </div>
            </div>

            {/* Row 2: Shina (99.9%) */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12, background: '#EFF6FF',
                    display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 900, color: L.blue,
                  }}>A</div>
                  <div>
                    <div style={{fontSize: 26, fontWeight: 800, color: L.text}}>Shina (Antigravity AI Agent)</div>
                    <div style={{fontSize: 16, color: L.red, fontFamily: MONO}}>
                      Coding · Remotion · VPS1/VPS2 · Bot WA · Auto-Post TikTok
                    </div>
                  </div>
                </div>
                <div style={{fontFamily: MONO, fontSize: 42, fontWeight: 900, color: L.red}}>
                  {shinaPct.toFixed(1)}%
                </div>
              </div>
              <div style={{height: 24, borderRadius: 12, background: '#F1F5F9', overflow: 'hidden'}}>
                <div style={{
                  width: `${shinaPct}%`, height: '100%', borderRadius: 12,
                  background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #DC2626 100%)',
                }} />
              </div>
            </div>
          </div>
        </MacWindow>
      </div>

      <DarkPillSubtitle captions={captions} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 7: OUTRO CTA ==================== */
const SceneOutro: React.FC<{captions: CaptionChunk[]}> = ({captions}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 15}});

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', paddingBottom: 70,
        transform: `scale(${0.92 + 0.08 * pop})`, opacity: pop,
      }}>
        {/* Pixel Shina x Boss Polaroid */}
        <div style={{display: 'flex', alignItems: 'center', gap: 42, marginBottom: 42}}>
          <PixelShina size={220} mood="happy" showHeart />
          <div style={{fontSize: 44, fontWeight: 300, color: L.muted}}>×</div>
          <BossPolaroid size={220} rotate={0} />
        </div>

        {/* Headline */}
        <div style={{
          fontFamily: SANS, fontSize: 66, fontWeight: 800, color: L.text,
          letterSpacing: '-0.03em', textAlign: 'center', marginBottom: 34,
        }}>
          Tertarik Belajar Pakai{' '}
          <span style={{fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: L.blue}}>
            AI Agent
          </span>{' '}
          Kayak Rahmat?
        </div>

        {/* Comment CTA Pill */}
        <div style={{
          width: 780, background: '#FFFFFF', borderRadius: 999,
          border: `1.5px solid ${L.border}`, boxShadow: L.shadow,
          padding: '12px 14px 12px 34px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: SANS,
        }}>
          <span style={{fontSize: 24, color: L.muted}}>Tulis komentarmu di bawah ya...</span>
          <div style={{
            background: L.blue, color: '#FFFFFF', borderRadius: 999,
            padding: '16px 32px', fontSize: 22, fontWeight: 800,
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
      {/* Subtle Lo-Fi Background Music */}
      <Audio src={staticFile('audio/sfx/music.mp3')} volume={0.08} loop />

      {timeline.scenes.map((scene) => {
        let Comp: React.ReactNode = null;
        let tint = 'rgba(37, 99, 235, 0.06)';
        if (scene.id === 's1-intro') Comp = <SceneIntro captions={scene.captions} />;
        else if (scene.id === 's2-workload') Comp = <SceneWorkload captions={scene.captions} />;
        else if (scene.id === 's3-boss') {
          Comp = <SceneBoss captions={scene.captions} />;
          tint = 'rgba(220, 38, 38, 0.05)';
        } else if (scene.id === 's4-chat') Comp = <SceneChat captions={scene.captions} />;
        else if (scene.id === 's5-wholesome') {
          Comp = <SceneWholesome captions={scene.captions} />;
          tint = 'rgba(5, 150, 105, 0.07)';
        } else if (scene.id === 's6-activity') Comp = <SceneActivity captions={scene.captions} />;
        else Comp = <SceneOutro captions={scene.captions} />;

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
