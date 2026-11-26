import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import timeline from '../data/termius-pro-timeline.json';
import {
  TERMIUS_COLORS as C,
  TermiusLogo,
  UbuntuBadge,
  LinuxBadge,
  KeychainIcon,
  PlayIcon,
  FolderIcon,
  FileIcon,
  SearchIcon,
  SplitPaneIcon,
} from './TermiusIcons';
import {
  FONT,
  MONO,
  TopHeader,
  TermiusWindow,
  KaraokeSubtitle,
  BottomWatermark,
  Keycap,
  WordTiming,
} from './TermiusUI';

export const TERMIUS_PRO_FPS = timeline.fps;
export const TERMIUS_PRO_TOTAL_FRAMES = timeline.totalFrames;

const typed = (text: string, f: number, start: number, speed = 1.6) =>
  text.slice(0, Math.max(0, Math.floor((f - start) * speed)));

const fadeIn = (f: number, start: number, dur = 12) =>
  interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/* ==================== BACKGROUND ==================== */
const Backdrop: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(circle at 50% 18%, rgba(0,198,137,0.14) 0%, rgba(9,13,24,0) 48%),
                   radial-gradient(circle at 85% 78%, rgba(59,130,246,0.10) 0%, rgba(9,13,24,0) 45%),
                   linear-gradient(180deg, ${C.canvas} 0%, ${C.canvasAlt} 50%, ${C.canvas} 100%)`,
    }}
  >
    {/* Subtle technical dot grid */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(148,163,184,0.11) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        opacity: 0.55,
      }}
    />
  </AbsoluteFill>
);

/* ==================== SCENE 1: HOOK ==================== */
const SceneHook: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoPop = spring({frame: f - 5, fps, config: {damping: 13, stiffness: 120}});
  const cardPop = spring({frame: f - 38, fps, config: {damping: 14, stiffness: 110}});

  return (
    <AbsoluteFill>
      <TopHeader activeStep={0} headline="Kelola VPS Tanpa Ribet?" highlight="Pakai Termius" />

      <TermiusWindow activeNav="hosts" tabs={[{label: 'VPS-Prod-SG', connected: true}]} topRightBadge="SSH · SFTP">
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: 28, padding: '0 8px'}}>
          {/* Old way crossed out */}
          <div style={{
            opacity: fadeIn(f, 8),
            background: 'rgba(239,68,68,0.08)',
            border: '1.5px solid rgba(239,68,68,0.32)',
            borderRadius: 16,
            padding: '20px 24px',
          }}>
            <div style={{fontSize: 16, fontWeight: 800, color: '#F87171', marginBottom: 10, letterSpacing: '0.06em'}}>
              CARA LAMA (MANUAL & RIBET)
            </div>
            <div style={{
              fontFamily: MONO, fontSize: 22, color: '#FCA5A5',
              textDecoration: f > 32 ? 'line-through' : 'none',
              opacity: f > 32 ? 0.55 : 1,
            }}>
              $ ssh -i ~/.ssh/prod.pem root@143.198.198.82 -p 22
            </div>
          </div>

          {/* Center Termius Logo Hero */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            transform: `scale(${0.85 + 0.15 * logoPop})`, opacity: logoPop,
            background: 'linear-gradient(135deg, rgba(0,198,137,0.16), rgba(27,34,56,0.9))',
            border: `2px solid ${C.borderActive}`,
            borderRadius: 22, padding: '26px 28px',
            boxShadow: '0 18px 45px rgba(0,198,137,0.18)',
          }}>
            <TermiusLogo size={96} />
            <div>
              <div style={{fontSize: 40, fontWeight: 900, color: C.text, letterSpacing: '-0.02em'}}>Termius</div>
              <div style={{fontSize: 22, color: C.green, fontWeight: 700, marginTop: 4}}>Modern SSH & SFTP Client</div>
              <div style={{fontSize: 18, color: C.muted, marginTop: 6}}>1 klik masuk server, sync di semua device</div>
            </div>
          </div>

          {/* Quick Host Preview */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
            opacity: cardPop, transform: `translateY(${(1 - cardPop) * 20}px)`,
          }}>
            {[
              {name: 'VPS-Prod-SG', ip: '143.198.198.82', badge: <UbuntuBadge size={40} />},
              {name: 'API-Worker', ip: '43.133.155.156', badge: <LinuxBadge label="DB" bg="#3B82F6" size={40} />},
            ].map((h) => (
              <div key={h.name} style={{
                background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 16,
                padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
              }}>
                {h.badge}
                <div>
                  <div style={{fontSize: 21, fontWeight: 800}}>{h.name}</div>
                  <div style={{fontSize: 16, color: C.muted, fontFamily: MONO}}>{h.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TermiusWindow>

      {/* Zone 3: 3 Key Benefit Pills */}
      <div style={{
        position: 'absolute', top: 1295, left: 48, right: 48,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontFamily: FONT,
      }}>
        {[
          {t: 'Cross-Platform', s: 'Win · Mac · Linux · HP', c: C.green},
          {t: 'SSH Key Vault', s: 'Terenkripsi aman', c: C.blue},
          {t: 'SFTP & Snippets', s: 'All-in-one DevOps', c: C.amber},
        ].map((b, i) => (
          <div key={b.t} style={{
            opacity: fadeIn(f, 45 + i * 12),
            background: 'rgba(21,27,46,0.9)', border: `1.5px solid ${C.border}`,
            borderTop: `3px solid ${b.c}`, borderRadius: 16, padding: '18px 16px', textAlign: 'center',
          }}>
            <div style={{fontSize: 22, fontWeight: 800, color: C.text}}>{b.t}</div>
            <div style={{fontSize: 17, color: C.muted, marginTop: 6}}>{b.s}</div>
          </div>
        ))}
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 2: HOSTS & KEYCHAIN ==================== */
const SceneHosts: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const savePulse = f > 245 ? 1 + 0.04 * Math.sin((f - 245) / 3.5) : 1;
  const connectedToast = f > 285;

  const fields = [
    {label: 'Label', val: 'VPS-Prod-SG', start: 35},
    {label: 'Address (IP / Hostname)', val: '143.198.198.82', start: 90},
    {label: 'Username', val: 'root', start: 150},
  ];

  return (
    <AbsoluteFill>
      <TopHeader activeStep={1} headline="Simpan Server di" highlight="Hosts & Keychain" />

      <TermiusWindow activeNav="hosts" topRightBadge="VAULT">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
          <div>
            <div style={{fontSize: 28, fontWeight: 900}}>New Host</div>
            <div style={{fontSize: 17, color: C.muted}}>Konfigurasi sekali, connect selamanya</div>
          </div>
          <div style={{
            padding: '10px 18px', borderRadius: 12, background: C.greenSoft,
            border: `1px solid ${C.borderActive}`, color: C.green, fontSize: 17, fontWeight: 800,
          }}>
            SSH · Port 22
          </div>
        </div>

        {/* Form Fields */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {fields.map((fld, idx) => {
            const txt = typed(fld.val, f, fld.start, 0.45);
            const active = f >= fld.start && f < fld.start + fld.val.length / 0.45 + 15;
            return (
              <div key={fld.label} style={{opacity: fadeIn(f, fld.start - 15)}}>
                <div style={{fontSize: 17, color: C.muted, fontWeight: 700, marginBottom: 6}}>
                  {idx + 1}. {fld.label}
                </div>
                <div style={{
                  background: C.terminalBg,
                  border: `2px solid ${active ? C.green : C.border}`,
                  borderRadius: 12, padding: '14px 18px',
                  fontFamily: MONO, fontSize: 24, color: C.text, minHeight: 58,
                }}>
                  {txt}
                  {active && <span style={{color: C.green}}>▌</span>}
                </div>
              </div>
            );
          })}

          {/* Keychain Selector */}
          <div style={{opacity: fadeIn(f, 185)}}>
            <div style={{fontSize: 17, color: C.muted, fontWeight: 700, marginBottom: 6}}>
              4. Authentication (Keychain)
            </div>
            <div style={{
              background: 'rgba(0,198,137,0.10)',
              border: `2px solid ${C.borderActive}`,
              borderRadius: 12, padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <KeychainIcon color={C.green} size={22} />
                <div>
                  <div style={{fontFamily: MONO, fontSize: 22, fontWeight: 800, color: C.text}}>id_ed25519_prod</div>
                  <div style={{fontSize: 15, color: C.green}}>Tersimpan aman di Termius Keychain</div>
                </div>
              </div>
              <div style={{
                padding: '6px 12px', borderRadius: 8, background: C.green, color: '#04120D',
                fontSize: 15, fontWeight: 900,
              }}>
                ED25519
              </div>
            </div>
          </div>
        </div>

        {/* Save & Connect CTA inside Termius */}
        <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 16}}>
          <div style={{
            opacity: fadeIn(f, 235),
            transform: `scale(${savePulse})`,
            background: C.green, color: '#04120D',
            padding: '15px 32px', borderRadius: 14,
            fontSize: 23, fontWeight: 900,
            boxShadow: '0 10px 30px rgba(0,198,137,0.35)',
          }}>
            ✓ Save & Connect
          </div>
          {connectedToast && (
            <div style={{
              opacity: spring({frame: f - 285, fps, config: {damping: 14}}),
              padding: '12px 20px', borderRadius: 12,
              background: 'rgba(16,185,129,0.16)', border: `1px solid ${C.green}`,
              color: C.green, fontSize: 20, fontWeight: 800, fontFamily: MONO,
            }}>
              ● Connected (42ms)
            </div>
          )}
        </div>
      </TermiusWindow>

      {/* Zone 3: 3-Step Flow */}
      <div style={{
        position: 'absolute', top: 1295, left: 48, right: 48,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, fontFamily: FONT,
      }}>
        {[
          {n: '01', t: 'Isi Host', s: 'Label, IP & User', on: f >= 35},
          {n: '02', t: 'Pilih SSH Key', s: 'Tanpa password', on: f >= 185},
          {n: '03', t: 'Klik 2x Host', s: 'Langsung masuk', on: f >= 250},
        ].map((st) => (
          <div key={st.n} style={{
            background: st.on ? 'rgba(0,198,137,0.12)' : 'rgba(21,27,46,0.85)',
            border: `1.5px solid ${st.on ? C.borderActive : C.border}`,
            borderRadius: 16, padding: '16px 18px',
          }}>
            <div style={{fontFamily: MONO, fontSize: 16, fontWeight: 900, color: st.on ? C.green : C.dim}}>STEP {st.n}</div>
            <div style={{fontSize: 22, fontWeight: 800, color: C.text, marginTop: 4}}>{st.t}</div>
            <div style={{fontSize: 17, color: C.muted, marginTop: 2}}>{st.s}</div>
          </div>
        ))}
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 3: DAILY COMMANDS ==================== */
const SceneCommands: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  // Spread 4 commands nicely across ~22 seconds (~660 frames)
  const stage = f < 170 ? 0 : f < 310 ? 1 : f < 460 ? 2 : 3;

  return (
    <AbsoluteFill>
      <TopHeader activeStep={2} headline="4 Command Wajib di" highlight="Terminal VPS" />

      <TermiusWindow
        activeNav="hosts"
        showSidebar={false}
        tabs={[
          {label: 'VPS-Prod-SG', active: true, connected: true},
          {label: 'API-Worker', connected: true},
        ]}
        topRightBadge="ZSH · UTF-8"
      >
        <div style={{
          background: C.terminalBg, borderRadius: 16, border: `1px solid ${C.border}`,
          height: '100%', padding: 26, fontFamily: MONO, fontSize: 22, lineHeight: 1.55,
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {/* 1. htop */}
          <div>
            <div>
              <span style={{color: C.green}}>root@vps-prod</span>
              <span style={{color: C.muted}}>:~# </span>
              <span style={{color: '#fff', fontWeight: 700}}>{typed('htop', f, 25, 0.35)}</span>
            </div>
            {f >= 55 && (
              <div style={{
                marginTop: 10, padding: '14px 18px', borderRadius: 12,
                background: 'rgba(15,23,42,0.9)', border: `1px solid ${stage === 0 ? C.borderActive : C.border}`,
                fontSize: 19,
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
                  <span style={{color: '#38BDF8', width: 58}}>CPU</span>
                  <div style={{flex: 1, height: 14, background: '#1E293B', borderRadius: 7, overflow: 'hidden'}}>
                    <div style={{width: `${18 + Math.sin(f / 6) * 4}%`, height: '100%', background: C.green}} />
                  </div>
                  <span style={{color: C.green, width: 65, textAlign: 'right'}}>18.4%</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{color: '#A78BFA', width: 58}}>MEM</span>
                  <div style={{flex: 1, height: 14, background: '#1E293B', borderRadius: 7, overflow: 'hidden'}}>
                    <div style={{width: '34%', height: '100%', background: C.blue}} />
                  </div>
                  <span style={{color: '#93C5FD', width: 120, textAlign: 'right'}}>2.7G / 8.0G</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. df -h */}
          {f >= 170 && (
            <div>
              <div>
                <span style={{color: C.green}}>root@vps-prod</span>
                <span style={{color: C.muted}}>:~# </span>
                <span style={{color: '#fff', fontWeight: 700}}>{typed('df -h /', f, 175, 0.45)}</span>
              </div>
              {f >= 205 && (
                <div style={{
                  marginTop: 8, padding: '12px 16px', borderRadius: 10,
                  background: 'rgba(15,23,42,0.85)', border: `1px solid ${stage === 1 ? C.borderActive : C.border}`,
                  fontSize: 18, color: '#CBD5E1',
                }}>
                  <div style={{color: C.dim}}>Filesystem     Size  Used Avail Use%</div>
                  <div style={{color: C.green}}>/dev/vda1      154G  9.2G  145G   6%</div>
                </div>
              )}
            </div>
          )}

          {/* 3. pm2 status */}
          {f >= 310 && (
            <div>
              <div>
                <span style={{color: C.green}}>root@vps-prod</span>
                <span style={{color: C.muted}}>:~# </span>
                <span style={{color: '#fff', fontWeight: 700}}>{typed('pm2 status', f, 315, 0.45)}</span>
              </div>
              {f >= 348 && (
                <div style={{
                  marginTop: 8, padding: '12px 16px', borderRadius: 10,
                  background: 'rgba(15,23,42,0.85)', border: `1px solid ${stage === 2 ? C.borderActive : C.border}`,
                  fontSize: 18,
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', color: C.green}}>
                    <span>│ 0 │ api-prod       │ online │ 0%  │ 94mb  │</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', color: C.green}}>
                    <span>│ 1 │ wa-agent-bot   │ online │ 0%  │ 142mb │</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. tmux */}
          {f >= 460 && (
            <div style={{marginTop: 'auto'}}>
              <div>
                <span style={{color: C.green}}>root@vps-prod</span>
                <span style={{color: C.muted}}>:~# </span>
                <span style={{color: '#fff', fontWeight: 700}}>{typed('tmux attach -t dev', f, 465, 0.55)}</span>
                <span style={{color: C.green}}>{Math.floor(f / 10) % 2 === 0 ? '▌' : ''}</span>
              </div>
              {f >= 505 && (
                <div style={{
                  marginTop: 12, padding: '8px 16px', borderRadius: 8,
                  background: C.green, color: '#04120D', fontSize: 17, fontWeight: 900,
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>[dev] 0:zsh*  1:logs-  2:deploy</span>
                  <span>SESSION SAFE ✓</span>
                </div>
              )}
            </div>
          )}
        </div>
      </TermiusWindow>

      {/* Zone 3: 4 Command Cheat Cards synced to active stage */}
      <div style={{
        position: 'absolute', top: 1295, left: 48, right: 48,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, fontFamily: FONT,
      }}>
        {[
          {cmd: 'htop', desc: 'Cek CPU & RAM'},
          {cmd: 'df -h', desc: 'Cek Disk VPS'},
          {cmd: 'pm2 status', desc: 'Cek App Live'},
          {cmd: 'tmux', desc: 'Sesi Anti-Putus'},
        ].map((item, i) => {
          const active = i === stage;
          return (
            <div key={item.cmd} style={{
              background: active ? C.greenSoft : 'rgba(21,27,46,0.88)',
              border: `2px solid ${active ? C.green : C.border}`,
              borderRadius: 16, padding: '16px 12px', textAlign: 'center',
              transform: active ? 'translateY(-4px)' : 'none',
            }}>
              <div style={{fontFamily: MONO, fontSize: 20, fontWeight: 900, color: active ? C.green : C.text}}>
                {item.cmd}
              </div>
              <div style={{fontSize: 16, color: C.muted, marginTop: 6}}>{item.desc}</div>
            </div>
          );
        })}
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 4: SNIPPETS & SFTP ==================== */
const SceneSnippetsSftp: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const showSftp = f >= 285;
  const uploadPct = Math.round(interpolate(f, [340, 460], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const snippetRun = f >= 145;

  return (
    <AbsoluteFill>
      <TopHeader
        activeStep={3}
        headline={showSftp ? 'Transfer File via' : '1-Klik Command di'}
        highlight={showSftp ? 'SFTP Termius' : 'Snippets'}
      />

      <TermiusWindow
        activeNav={showSftp ? 'sftp' : 'snippets'}
        tabs={
          showSftp
            ? [{label: 'SFTP · VPS-Prod-SG', active: true, connected: true}]
            : [{label: 'Snippets Vault', active: true}]
        }
        topRightBadge={showSftp ? 'DUAL PANE' : '1-CLICK RUN'}
      >
        {!showSftp ? (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <div style={{fontSize: 28, fontWeight: 900}}>Saved Snippets</div>
              <div style={{
                padding: '9px 18px', borderRadius: 10, background: C.green, color: '#04120D',
                fontSize: 18, fontWeight: 900,
              }}>
                + New Snippet
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              {[
                {name: 'Deploy Production', cmd: 'git pull && npm run build && pm2 reload all', hl: true},
                {name: 'Reload Nginx Safe', cmd: 'sudo nginx -t && sudo systemctl reload nginx', hl: false},
                {name: 'Clean Docker Cache', cmd: 'docker system prune -af --volumes', hl: false},
                {name: 'Live Error Logs', cmd: 'pm2 logs --err --lines 50', hl: false},
              ].map((sn) => (
                <div key={sn.name} style={{
                  background: sn.hl && snippetRun ? 'rgba(0,198,137,0.14)' : C.surface,
                  border: `2px solid ${sn.hl && snippetRun ? C.green : C.border}`,
                  borderRadius: 16, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                }}>
                  <div style={{minWidth: 0}}>
                    <div style={{fontSize: 22, fontWeight: 800, color: C.text}}>{sn.name}</div>
                    <div style={{fontFamily: MONO, fontSize: 17, color: C.muted, marginTop: 6}}>{sn.cmd}</div>
                  </div>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: sn.hl && snippetRun ? C.green : 'rgba(0,198,137,0.16)',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <PlayIcon color={sn.hl && snippetRun ? '#04120D' : C.green} size={20} />
                  </div>
                </div>
              ))}
            </div>

            {snippetRun && (
              <div style={{
                marginTop: 22, padding: '14px 20px', borderRadius: 12,
                background: 'rgba(0,198,137,0.16)', border: `1.5px solid ${C.green}`,
                fontFamily: MONO, fontSize: 19, color: C.green, fontWeight: 800,
              }}>
                ✓ Running "Deploy Production" on VPS-Prod-SG... Done!
              </div>
            )}
          </div>
        ) : (
          /* Real Termius Dual-Pane SFTP */
          <div style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 16}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1}}>
              {/* Local Pane */}
              <div style={{background: C.terminalBg, borderRadius: 14, border: `1px solid ${C.border}`, padding: 16}}>
                <div style={{fontSize: 15, fontWeight: 800, color: C.blue, marginBottom: 10, fontFamily: MONO}}>
                  LOCAL · ~/projects/app
                </div>
                {['src/', 'public/', 'dist.zip (4.2 MB)', '.env.production'].map((item, idx) => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 10,
                    background: idx === 2 ? 'rgba(59,130,246,0.22)' : 'transparent',
                    border: idx === 2 ? `1px solid ${C.blue}` : '1px solid transparent',
                    fontSize: 18, fontFamily: MONO, marginBottom: 6,
                  }}>
                    {item.endsWith('/') ? <FolderIcon size={18} /> : <FileIcon color={idx === 2 ? '#60A5FA' : C.muted} size={18} />}
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Remote Pane */}
              <div style={{background: C.terminalBg, borderRadius: 14, border: `1px solid ${C.borderActive}`, padding: 16}}>
                <div style={{fontSize: 15, fontWeight: 800, color: C.green, marginBottom: 10, fontFamily: MONO}}>
                  REMOTE · /var/www/app
                </div>
                {['nginx.conf', 'server.js', 'package.json', ...(uploadPct >= 100 ? ['dist.zip ✓'] : [])].map((item) => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 10,
                    background: item.includes('✓') ? C.greenSoft : 'transparent',
                    color: item.includes('✓') ? C.green : C.text,
                    fontSize: 18, fontFamily: MONO, marginBottom: 6, fontWeight: item.includes('✓') ? 800 : 500,
                  }}>
                    <FileIcon color={item.includes('✓') ? C.green : C.muted} size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Progress Bar */}
            <div style={{
              background: C.surface, border: `1.5px solid ${C.borderActive}`,
              borderRadius: 14, padding: '16px 20px',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, marginBottom: 10}}>
                <span>Uploading dist.zip → /var/www/app</span>
                <span style={{color: C.green, fontFamily: MONO}}>{uploadPct}%</span>
              </div>
              <div style={{height: 12, borderRadius: 6, background: '#0F172A', overflow: 'hidden'}}>
                <div style={{width: `${uploadPct}%`, height: '100%', background: `linear-gradient(90deg, ${C.blue}, ${C.green})`}} />
              </div>
            </div>
          </div>
        )}
      </TermiusWindow>

      {/* Zone 3: Feature Summary */}
      <div style={{
        position: 'absolute', top: 1295, left: 48, right: 48,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontFamily: FONT,
      }}>
        <div style={{
          background: !showSftp ? C.greenSoft : 'rgba(21,27,46,0.88)',
          border: `2px solid ${!showSftp ? C.green : C.border}`,
          borderRadius: 16, padding: '18px 20px',
        }}>
          <div style={{fontSize: 22, fontWeight: 900, color: !showSftp ? C.green : C.text}}>Snippets</div>
          <div style={{fontSize: 17, color: C.muted, marginTop: 4}}>Simpan script panjang, eksekusi 1 klik</div>
        </div>
        <div style={{
          background: showSftp ? C.greenSoft : 'rgba(21,27,46,0.88)',
          border: `2px solid ${showSftp ? C.green : C.border}`,
          borderRadius: 16, padding: '18px 20px',
        }}>
          <div style={{fontSize: 22, fontWeight: 900, color: showSftp ? C.green : C.text}}>Built-in SFTP</div>
          <div style={{fontSize: 17, color: C.muted, marginTop: 4}}>Drag & drop file tanpa FileZilla</div>
        </div>
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 5: SHORTCUTS & SPLIT PANE ==================== */
const SHORTCUT_LIST = [
  {keys: ['Ctrl', 'J'], title: 'Quick Connect / Cari Host', sub: 'Langsung loncat ke server mana saja'},
  {keys: ['Ctrl', 'T'], title: 'Buka Tab Baru', sub: 'Buka sesi terminal tambahan instan'},
  {keys: ['Ctrl', 'Shift', 'D'], title: 'Split Screen Terminal', sub: 'Pantau 2 server / log sekaligus'},
  {keys: ['Ctrl', 'Tab'], title: 'Pindah Antar Tab', sub: 'Ganti server secepat kilat'},
];

const SceneShortcuts: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  // Highlight each shortcut in sync across ~18s (~540 frames)
  const activeIdx = f < 165 ? 0 : f < 265 ? 1 : f < 395 ? 2 : 3;
  const isSplit = activeIdx >= 2;

  return (
    <AbsoluteFill>
      <TopHeader activeStep={4} headline="Shortcut Wajib di" highlight="Termius Pro" />

      <TermiusWindow
        activeNav="settings"
        showSidebar={false}
        tabs={[
          {label: 'VPS-Prod-SG', active: activeIdx !== 3, connected: true},
          {label: 'Staging-API', active: activeIdx === 3, connected: true},
        ]}
        topRightBadge={isSplit ? 'SPLIT ACTIVE' : 'HOTKEYS'}
      >
        {/* Live Mini Interactive Preview at top of Window */}
        <div style={{
          height: 225, marginBottom: 20, borderRadius: 16,
          background: C.terminalBg, border: `1.5px solid ${C.borderActive}`,
          padding: 16, display: 'flex', gap: 12, fontFamily: MONO,
        }}>
          {activeIdx === 0 ? (
            /* Quick Connect Modal Preview */
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px'}}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: C.surface, border: `2px solid ${C.green}`, borderRadius: 12, padding: '12px 18px',
              }}>
                <SearchIcon color={C.green} size={22} />
                <span style={{fontSize: 22, color: C.text}}>{typed('vps-prod', f, 30, 0.35)}</span>
                <span style={{marginLeft: 'auto', fontSize: 16, color: C.green}}>ENTER ↵</span>
              </div>
              <div style={{marginTop: 12, fontSize: 18, color: C.muted}}>
                ▸ <span style={{color: C.green}}>VPS-Prod-SG</span> (143.198.198.82) · Ready
              </div>
            </div>
          ) : (
            /* Split Screen Preview */
            <>
              <div style={{
                flex: 1, background: 'rgba(15,23,42,0.85)', borderRadius: 12,
                border: `1px solid ${C.border}`, padding: 14, fontSize: 16,
              }}>
                <div style={{color: C.green, fontWeight: 800, marginBottom: 8}}>● PANE 1 · pm2 logs</div>
                <div style={{color: '#CBD5E1'}}>[INFO] API listening :3000</div>
                <div style={{color: C.green}}>[200] GET /api/health 12ms</div>
                <div style={{color: '#93C5FD'}}>[SYNC] Worker ready ✓</div>
              </div>
              {isSplit && (
                <div style={{
                  flex: 1, background: 'rgba(0,198,137,0.08)', borderRadius: 12,
                  border: `1.5px solid ${C.green}`, padding: 14, fontSize: 16,
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, color: C.green, fontWeight: 800, marginBottom: 8}}>
                    <SplitPaneIcon color={C.green} size={16} />
                    <span>PANE 2 · htop</span>
                  </div>
                  <div style={{color: '#CBD5E1'}}>CPU: 14.2%  |  RAM: 2.1G</div>
                  <div style={{color: C.amber}}>LOAD: 0.42, 0.38, 0.31</div>
                  <div style={{color: C.green}}>UPTIME: 24d 11h 08m</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Shortcut List with Tactile Keycaps */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {SHORTCUT_LIST.map((sc, idx) => {
            const active = idx === activeIdx;
            return (
              <div key={sc.title} style={{
                background: active ? C.greenSoft : C.surface,
                border: `2px solid ${active ? C.green : C.border}`,
                borderRadius: 16, padding: '18px 22px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              }}>
                <div>
                  <div style={{fontSize: 24, fontWeight: 800, color: active ? C.green : C.text}}>{sc.title}</div>
                  <div style={{fontSize: 17, color: C.muted, marginTop: 4}}>{sc.sub}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0}}>
                  {sc.keys.map((k, ki) => (
                    <React.Fragment key={k}>
                      <Keycap label={k} pressed={active} />
                      {ki < sc.keys.length - 1 && <span style={{color: C.dim, fontWeight: 900, fontSize: 20}}>+</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </TermiusWindow>

      {/* Zone 3: Mac & Custom Hotkeys Tip */}
      <div style={{
        position: 'absolute', top: 1295, left: 48, right: 48,
        background: 'rgba(21,27,46,0.92)', border: `1.5px solid ${C.border}`,
        borderRadius: 18, padding: '20px 26px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT,
      }}>
        <div>
          <div style={{fontSize: 22, fontWeight: 800, color: C.text}}>Pengguna MacBook?</div>
          <div style={{fontSize: 18, color: C.muted, marginTop: 4}}>Ganti tombol Ctrl menjadi ⌘ Cmd · Custom di Settings → Hotkeys</div>
        </div>
        <Keycap label="⌘ Cmd" pressed />
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 6: OUTRO ==================== */
const SceneOutro: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 13}});

  return (
    <AbsoluteFill>
      <TopHeader activeStep={5} headline="Siap Kerja Lebih" highlight="Sat-Set?" />

      <div style={{
        position: 'absolute', top: 345, left: 56, right: 56,
        background: 'linear-gradient(160deg, rgba(21,27,46,0.95), rgba(11,15,26,0.98))',
        border: `2px solid ${C.borderActive}`, borderRadius: 28,
        padding: '44px 36px', fontFamily: FONT,
        boxShadow: '0 30px 90px rgba(0,198,137,0.18)',
        transform: `scale(${0.92 + 0.08 * pop})`, opacity: pop,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 34}}>
          <TermiusLogo size={90} />
          <div>
            <div style={{fontSize: 38, fontWeight: 900, color: C.text}}>Termius Cheat Sheet</div>
            <div style={{fontSize: 21, color: C.green, fontWeight: 700}}>Save video ini buat contekan!</div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 34}}>
          {[
            '✓ Hosts & SSH Keychain',
            '✓ htop · df -h · pm2 · tmux',
            '✓ Snippets & SFTP Drag-Drop',
            '✓ Ctrl+J · T · Shift+D · Tab',
          ].map((item) => (
            <div key={item} style={{
              background: C.surface, border: `1.5px solid ${C.border}`,
              borderRadius: 16, padding: '20px 22px',
              fontSize: 22, fontWeight: 800, color: C.text, fontFamily: MONO,
            }}>
              {item}
            </div>
          ))}
        </div>

        <div style={{
          background: C.green, color: '#04120D',
          borderRadius: 18, padding: '24px 32px', textAlign: 'center',
          fontSize: 30, fontWeight: 900, letterSpacing: '-0.01em',
          boxShadow: '0 14px 40px rgba(0,198,137,0.4)',
        }}>
          SAVE · LIKE · FOLLOW @rhmtofc
        </div>
      </div>

      <KaraokeSubtitle words={words} />
      <BottomWatermark />
    </AbsoluteFill>
  );
};

/* ==================== MAIN COMPOSITION ==================== */
export const TermiusProVideo: React.FC = () => {
  const scenes = timeline.scenes;
  return (
    <AbsoluteFill style={{backgroundColor: C.canvas}}>
      <Backdrop />
      {scenes.map((scene) => {
        let Comp: React.ReactNode = null;
        if (scene.id === 's1-hook') Comp = <SceneHook words={scene.words} />;
        else if (scene.id === 's2-hosts') Comp = <SceneHosts words={scene.words} />;
        else if (scene.id === 's3-commands') Comp = <SceneCommands words={scene.words} />;
        else if (scene.id === 's4-snippets-sftp') Comp = <SceneSnippetsSftp words={scene.words} />;
        else if (scene.id === 's5-shortcuts') Comp = <SceneShortcuts words={scene.words} />;
        else Comp = <SceneOutro words={scene.words} />;

        return (
          <Sequence key={scene.id} from={scene.startFrame} durationInFrames={scene.durationInFrames}>
            <Audio src={staticFile(scene.audio)} />
            {Comp}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
