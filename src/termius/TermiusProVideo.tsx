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
  TERMIUS as T,
  TermiusAppIcon,
  GroupBadgeIcon,
  UbuntuHostIcon,
  DebianHostIcon,
  CloudHostIcon,
  HostsRackIcon,
  TerminalPromptIcon,
  KeychainKeyIcon,
  BroadcastNodesIcon,
  PlayTriangleIcon,
  FolderSolidIcon,
} from './TermiusIcons';
import {
  FONT,
  MONO,
  EditorialHeader,
  RealTermiusFrame,
  ContextCalloutBar,
  TermiusKeycap,
  KaraokeSubtitle,
  WordTiming,
} from './TermiusUI';

export const TERMIUS_PRO_FPS = timeline.fps;
export const TERMIUS_PRO_TOTAL_FRAMES = timeline.totalFrames;

const typed = (text: string, f: number, start: number, speed = 0.5) =>
  text.slice(0, Math.max(0, Math.floor((f - start) * speed)));

const fadeIn = (f: number, start: number, dur = 12) =>
  interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/* ==================== SCENE 1: HOOK (REAL TERMIUS HOSTS VAULT + OFFICIAL ICON) ==================== */
const SceneHook: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const iconPop = spring({frame: f - 6, fps, config: {damping: 14, stiffness: 120}});

  return (
    <AbsoluteFill>
      <EditorialHeader index="01" tag="TERMIUS" title="Kelola Semua VPS" accentWord="Tanpa Ribet." />

      <RealTermiusFrame activeNav="hosts" tabs={[{label: 'Split view', kind: 'split'}]}>
        <div style={{padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18, height: '100%'}}>
          {/* Real Termius Search / Quick-Connect Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#161A2D', border: `1.5px solid ${T.border}`, borderRadius: 12,
            padding: '12px 14px 12px 18px',
          }}>
            <span style={{fontSize: 19, color: T.dim}}>Find a host or ssh user@hostname...</span>
            <span style={{
              padding: '7px 14px', borderRadius: 8, background: '#222740',
              fontSize: 14, fontWeight: 700, color: T.muted, letterSpacing: '0.06em',
            }}>CONNECT</span>
          </div>

          {/* Real Termius Action Toolbar: NEW HOST | TERMINAL | SERIAL */}
          <div style={{display: 'flex', gap: 10}}>
            {[
              {label: 'NEW HOST ⌄', icon: <HostsRackIcon size={16} color="#D1D5DB" />},
              {label: 'TERMINAL', icon: <TerminalPromptIcon size={16} color="#D1D5DB" />},
              {label: 'SERIAL', icon: null},
            ].map((b) => (
              <div key={b.label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '9px 14px', borderRadius: 9, background: T.pill,
                border: `1px solid ${T.border}`, fontSize: 14, fontWeight: 700,
                color: '#E5E7EB', letterSpacing: '0.04em',
              }}>
                {b.icon}
                <span>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Official Termius App Hero Banner overlay inside workspace */}
          <div style={{
            transform: `scale(${0.92 + 0.08 * iconPop})`, opacity: iconPop,
            display: 'flex', alignItems: 'center', gap: 22,
            background: 'linear-gradient(135deg, #181D34 0%, #121629 100%)',
            border: `1.5px solid #2D3554`, borderRadius: 16, padding: '20px 22px',
          }}>
            <TermiusAppIcon size={86} />
            <div>
              <div style={{fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em'}}>Termius</div>
              <div style={{fontSize: 19, color: T.green, fontWeight: 600, marginTop: 3}}>
                SSH · SFTP · Snippets · Keychain
              </div>
              <div style={{fontSize: 16, color: T.muted, marginTop: 5}}>
                Windows · macOS · Linux · iOS · Android
              </div>
            </div>
          </div>

          {/* Groups Section (Exact Termius Layout) */}
          <div>
            <div style={{fontSize: 17, fontWeight: 600, color: T.muted, marginBottom: 10}}>Groups</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              {[
                {name: 'Production', count: '4 Hosts'},
                {name: 'Staging', count: '3 Hosts'},
              ].map((g) => (
                <div key={g.name} style={{
                  background: T.card, border: `1px solid ${T.border}`, borderRadius: 13,
                  padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <GroupBadgeIcon size={40} />
                  <div>
                    <div style={{fontSize: 19, fontWeight: 700}}>{g.name}</div>
                    <div style={{fontSize: 15, color: T.muted}}>{g.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hosts Grid (Exact Termius Ubuntu/Debian/Cloud Cards) */}
          <div>
            <div style={{fontSize: 17, fontWeight: 600, color: T.muted, marginBottom: 10}}>Hosts</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              {[
                {name: 'vps-prod-sg', sub: 'ssh, root, ubuntu', icon: <UbuntuHostIcon size={42} />},
                {name: 'api-worker-01', sub: 'ssh, deploy, api', icon: <UbuntuHostIcon size={42} />},
                {name: 'db-primary-sg', sub: 'ssh, postgres', icon: <CloudHostIcon size={42} />},
                {name: 'staging-node', sub: 'ssh, debian', icon: <DebianHostIcon size={42} />},
              ].map((h, i) => (
                <div key={h.name} style={{
                  opacity: fadeIn(f, 22 + i * 8),
                  background: T.card, border: `1px solid ${T.border}`, borderRadius: 13,
                  padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 13,
                }}>
                  {h.icon}
                  <div style={{minWidth: 0}}>
                    <div style={{fontSize: 18, fontWeight: 700}}>{h.name}</div>
                    <div style={{fontSize: 15, color: T.muted}}>{h.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RealTermiusFrame>

      <ContextCalloutBar
        leftLabel="1 Klik Masuk Server"
        rightContent={
          <>
            <TermiusKeycap label="SSH" active />
            <TermiusKeycap label="SFTP" />
            <TermiusKeycap label="SYNC" />
          </>
        }
      />

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 2: HOSTS & KEYCHAIN (REAL RIGHT-SIDE DRAWER) ==================== */
const SceneHosts: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drawerX = interpolate(spring({frame: f - 10, fps, config: {damping: 18}}), [0, 1], [460, 0]);
  const connected = f >= 275;

  return (
    <AbsoluteFill>
      <EditorialHeader index="02" tag="HOSTS & KEYCHAIN" title="Simpan Server" accentWord="Sekali Saja." />

      <RealTermiusFrame activeNav="hosts" tabs={connected ? [{label: 'vps-prod-sg', active: true, kind: 'ssh'}] : []}>
        <div style={{position: 'relative', flex: 1, display: 'flex'}}>
          {/* Dimmed Hosts Background List on Left */}
          <div style={{flex: 1, padding: '22px 20px', opacity: 0.45}}>
            <div style={{fontSize: 17, fontWeight: 600, color: T.muted, marginBottom: 12}}>Hosts</div>
            {['vps-prod-sg', 'api-worker-01', 'db-primary-sg', 'staging-node'].map((h, i) => (
              <div key={h} style={{
                background: T.card, border: `1px solid ${T.border}`, borderRadius: 12,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
              }}>
                {i < 2 ? <UbuntuHostIcon size={38} /> : i === 2 ? <CloudHostIcon size={38} /> : <DebianHostIcon size={38} />}
                <div>
                  <div style={{fontSize: 17, fontWeight: 700}}>{h}</div>
                  <div style={{fontSize: 14, color: T.muted}}>ssh, root</div>
                </div>
              </div>
            ))}
          </div>

          {/* Authentic Termius Right-Hand Inspector Drawer (New Host) */}
          <div style={{
            width: 470,
            background: '#161A2E',
            borderLeft: `1.5px solid ${T.border}`,
            padding: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transform: `translateX(${drawerX}px)`,
            boxShadow: '-24px 0 60px rgba(0,0,0,0.55)',
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <UbuntuHostIcon size={38} />
                <div>
                  <div style={{fontSize: 22, fontWeight: 800}}>New Host</div>
                  <div style={{fontSize: 14, color: T.muted}}>General · SSH on Port 22</div>
                </div>
              </div>
              <div style={{
                padding: '9px 18px', borderRadius: 9,
                background: f >= 235 ? T.green : T.activeTabBg,
                color: f >= 235 ? '#06150E' : T.green,
                fontSize: 16, fontWeight: 800,
              }}>
                {connected ? 'Connected ✓' : 'Connect'}
              </div>
            </div>

            <div style={{height: 1, background: T.border}} />

            {/* Real Termius Input Fields */}
            {[
              {label: 'Address', val: '143.198.198.82', start: 40},
              {label: 'Label', val: 'vps-prod-sg', start: 95},
              {label: 'Username', val: 'root', start: 145},
            ].map((fld) => {
              const txt = typed(fld.val, f, fld.start, 0.45);
              const typing = f >= fld.start && f < fld.start + fld.val.length / 0.45 + 14;
              return (
                <div key={fld.label}>
                  <div style={{fontSize: 15, fontWeight: 600, color: T.muted, marginBottom: 6}}>{fld.label}</div>
                  <div style={{
                    background: '#101324', border: `1.5px solid ${typing ? T.green : T.border}`,
                    borderRadius: 10, padding: '13px 15px', fontFamily: MONO, fontSize: 20, minHeight: 52,
                  }}>
                    {txt}
                    {typing && <span style={{color: T.green}}>▌</span>}
                  </div>
                </div>
              );
            })}

            {/* Keychain Attachment */}
            <div style={{opacity: fadeIn(f, 185)}}>
              <div style={{fontSize: 15, fontWeight: 600, color: T.muted, marginBottom: 6}}>SSH Key (Keychain)</div>
              <div style={{
                background: T.activeTabBg, border: `1.5px solid ${T.green}`,
                borderRadius: 11, padding: '14px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: 11}}>
                  <KeychainKeyIcon color={T.green} size={20} />
                  <div>
                    <div style={{fontFamily: MONO, fontSize: 18, fontWeight: 700, color: T.text}}>id_ed25519_prod</div>
                    <div style={{fontSize: 14, color: T.green}}>Encrypted in Vault</div>
                  </div>
                </div>
                <span style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: T.green}}>KEY</span>
              </div>
            </div>

            <div style={{marginTop: 'auto', fontSize: 15, color: T.muted, lineHeight: 1.5}}>
              Setelah disimpan, klik 2x kartu host untuk langsung masuk tanpa ketik password lagi.
            </div>
          </div>
        </div>
      </RealTermiusFrame>

      <ContextCalloutBar
        leftLabel="Address → Username → Keychain"
        rightContent={<TermiusKeycap label="2x Click Connect" active={connected} />}
      />

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 3: REAL TERMIUS TERMINAL & 4 COMMANDS ==================== */
const SceneCommands: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const stage = f < 175 ? 0 : f < 310 ? 1 : f < 460 ? 2 : 3;

  return (
    <AbsoluteFill>
      <EditorialHeader index="03" tag="DAILY COMMANDS" title="4 Command Wajib" accentWord="Pantau VPS." />

      <RealTermiusFrame
        showSidebar={false}
        tabs={[
          {label: 'vps-prod-sg', active: true, kind: 'ssh'},
          {label: 'api-worker-01', kind: 'ssh'},
        ]}
      >
        {/* Exact Real Termius Terminal Colors: #111424 bg, #3B82F6 labels, #29D386 green, #E11D74 magenta IP */}
        <div style={{
          flex: 1, background: T.terminal, padding: '24px 28px',
          fontFamily: MONO, fontSize: 20, lineHeight: 1.5,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {/* Authentic Ubuntu MOTD matching Termius official screenshot */}
          <div style={{fontSize: 18, lineHeight: 1.48}}>
            <div><span style={{color: T.blue}}>Logged as:      </span><span style={{color: T.green}}>root@vps-prod-sg</span></div>
            <div><span style={{color: T.blue}}>OS:             </span><span style={{color: T.green}}>Ubuntu 22.04.4 LTS (Jammy Jellyfish)</span></div>
            <div><span style={{color: T.blue}}>Public IP:      </span><span style={{color: T.magenta}}>143.198.198.82</span></div>
            <div><span style={{color: T.blue}}>Services:       </span><span style={{color: T.green}}>▲ UFW,  ▲ Nginx,  ▲ SSH</span></div>
          </div>

          <div style={{height: 1, background: '#1E2338'}} />

          {/* 1. htop */}
          <div>
            <div style={{color: T.green, fontWeight: 700}}>
              root@vps-prod-sg:~$ <span style={{color: '#E5E7EB'}}>{typed('htop', f, 25, 0.35)}</span>
            </div>
            {f >= 50 && (
              <div style={{marginTop: 6, fontSize: 18, color: T.green}}>
                <div>
                  <span style={{color: T.blue}}>Memory: </span>RAM - 1.4G used, 6.6G available / 8.0G
                </div>
                <div>
                  [<span style={{color: T.red}}>========</span><span style={{color: T.green}}>================================</span>]
                </div>
              </div>
            )}
          </div>

          {/* 2. df -h */}
          {f >= 175 && (
            <div>
              <div style={{color: T.green, fontWeight: 700}}>
                root@vps-prod-sg:~$ <span style={{color: '#E5E7EB'}}>{typed('df -h /', f, 180, 0.45)}</span>
              </div>
              {f >= 210 && (
                <div style={{marginTop: 6, fontSize: 18, color: T.green}}>
                  <div style={{color: T.muted}}>Filesystem      Size  Used Avail Use% Mounted on</div>
                  <div>/dev/vda1       154G  9.2G  145G   6% /</div>
                </div>
              )}
            </div>
          )}

          {/* 3. pm2 status */}
          {f >= 310 && (
            <div>
              <div style={{color: T.green, fontWeight: 700}}>
                root@vps-prod-sg:~$ <span style={{color: '#E5E7EB'}}>{typed('pm2 status', f, 315, 0.45)}</span>
              </div>
              {f >= 350 && (
                <div style={{marginTop: 6, fontSize: 18, color: T.green}}>
                  <div>│ 0 │ api-prod       │ online │ 0%  │  94mb │</div>
                  <div>│ 1 │ wa-agent-bot   │ online │ 0%  │ 142mb │</div>
                </div>
              )}
            </div>
          )}

          {/* 4. tmux */}
          {f >= 460 && (
            <div style={{marginTop: 'auto'}}>
              <div style={{color: T.green, fontWeight: 700}}>
                root@vps-prod-sg:~$ <span style={{color: '#E5E7EB'}}>{typed('tmux attach -t dev', f, 465, 0.55)}</span>
                <span style={{
                  display: 'inline-block', width: 12, height: 22, background: T.green,
                  verticalAlign: 'middle', marginLeft: 4, opacity: Math.floor(f / 12) % 2 === 0 ? 1 : 0,
                }} />
              </div>
              {f >= 505 && (
                <div style={{
                  marginTop: 10, padding: '7px 14px', borderRadius: 6,
                  background: T.green, color: '#071710', fontSize: 17, fontWeight: 800,
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  <span>[dev] 0:zsh*  1:logs-  2:worker</span>
                  <span>ANTI-PUTUS ✓</span>
                </div>
              )}
            </div>
          )}
        </div>
      </RealTermiusFrame>

      <ContextCalloutBar
        leftLabel="Command Aktif"
        rightContent={
          <>
            {['htop', 'df -h', 'pm2 status', 'tmux'].map((c, idx) => (
              <TermiusKeycap key={c} label={c} active={idx === stage} />
            ))}
          </>
        }
      />

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 4: SNIPPETS ({}) & SFTP DUAL PANE ==================== */
const SceneSnippetsSftp: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const isSftp = f >= 285;
  const pct = Math.round(interpolate(f, [340, 460], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  return (
    <AbsoluteFill>
      <EditorialHeader
        index="04"
        tag={isSftp ? 'BUILT-IN SFTP' : 'SNIPPETS VAULT'}
        title={isSftp ? 'Drag & Drop File' : 'Command Panjang'}
        accentWord={isSftp ? 'di SFTP.' : 'Jadi 1 Klik.'}
      />

      <RealTermiusFrame
        activeNav="snippets"
        sftpActive={isSftp}
        showSidebar={!isSftp}
        tabs={isSftp ? [] : [{label: 'vps-prod-sg', kind: 'ssh'}]}
      >
        {!isSftp ? (
          <div style={{padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: 26, fontWeight: 800}}>Snippets</div>
              <div style={{
                padding: '9px 16px', borderRadius: 9, background: T.pill,
                border: `1px solid ${T.border}`, fontSize: 15, fontWeight: 700,
              }}>+ NEW SNIPPET</div>
            </div>

            {[
              {name: 'Deploy Production', cmd: 'git pull && npm run build && pm2 reload all', run: f >= 140},
              {name: 'Reload Nginx', cmd: 'sudo nginx -t && sudo systemctl reload nginx', run: false},
              {name: 'Clean Docker', cmd: 'docker system prune -af', run: false},
              {name: 'Tail Error Logs', cmd: 'pm2 logs --err --lines 50', run: false},
            ].map((s) => (
              <div key={s.name} style={{
                background: s.run ? T.activeTabBg : T.card,
                border: `1.5px solid ${s.run ? T.green : T.border}`,
                borderRadius: 13, padding: '18px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
              }}>
                <div>
                  <div style={{fontSize: 21, fontWeight: 700, color: s.run ? T.green : T.text}}>{s.name}</div>
                  <div style={{fontFamily: MONO, fontSize: 16, color: T.muted, marginTop: 6}}>{s.cmd}</div>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: s.run ? T.green : '#252B45',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <PlayTriangleIcon color={s.run ? '#071710' : T.green} size={17} />
                </div>
              </div>
            ))}

            {f >= 155 && (
              <div style={{
                marginTop: 8, padding: '13px 18px', borderRadius: 11,
                background: '#111424', border: `1.5px solid ${T.green}`,
                fontFamily: MONO, fontSize: 18, color: T.green,
              }}>
                ✓ Executed "Deploy Production" on vps-prod-sg
              </div>
            )}
          </div>
        ) : (
          /* Real Termius Dual-Pane SFTP */
          <div style={{padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1}}>
              {/* Local */}
              <div style={{
                background: T.terminal, borderRadius: 14, border: `1.5px solid ${T.border}`,
                padding: 18, display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{fontFamily: MONO, fontSize: 16, fontWeight: 700, color: T.blue, marginBottom: 8}}>
                  LOCAL · ~/projects/app
                </div>
                {['src/', 'public/', 'build.zip (4.2 MB)', '.env.prod'].map((item, idx) => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10,
                    background: idx === 2 ? '#1E2942' : 'transparent',
                    border: idx === 2 ? `1px solid ${T.blue}` : '1px solid transparent',
                    fontFamily: MONO, fontSize: 18,
                  }}>
                    <FolderSolidIcon color={item.endsWith('/') ? T.amber : idx === 2 ? T.blue : T.muted} size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Remote */}
              <div style={{
                background: T.terminal, borderRadius: 14, border: `1.5px solid ${T.green}`,
                padding: 18, display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{fontFamily: MONO, fontSize: 16, fontWeight: 700, color: T.green, marginBottom: 8}}>
                  vps-prod-sg · /var/www/app
                </div>
                {['nginx.conf', 'server.js', 'package.json', ...(pct >= 100 ? ['build.zip ✓'] : [])].map((item) => (
                  <div key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10,
                    background: item.includes('✓') ? T.activeTabBg : 'transparent',
                    color: item.includes('✓') ? T.green : T.text,
                    fontFamily: MONO, fontSize: 18, fontWeight: item.includes('✓') ? 700 : 400,
                  }}>
                    <FolderSolidIcon color={item.includes('✓') ? T.green : T.muted} size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 13, padding: '16px 20px',
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 18, marginBottom: 10}}>
                <span>Transferring build.zip → /var/www/app</span>
                <span style={{color: T.green, fontWeight: 800}}>{pct}%</span>
              </div>
              <div style={{height: 10, borderRadius: 5, background: '#111424', overflow: 'hidden'}}>
                <div style={{width: `${pct}%`, height: '100%', background: T.green}} />
              </div>
            </div>
          </div>
        )}
      </RealTermiusFrame>

      <ContextCalloutBar
        leftLabel={isSftp ? 'Built-in SFTP (Tanpa FileZilla)' : 'Snippets Vault (1-Klik Eksekusi)'}
        rightContent={<TermiusKeycap label={isSftp ? 'Drag & Drop' : '{ } Snippets'} active />}
      />

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 5: REAL TERMIUS SPLIT VIEW + BROADCAST + SHORTCUTS ==================== */
const SHORTCUTS = [
  {keys: ['Ctrl', 'J'], title: 'Quick Connect / Cari Host'},
  {keys: ['Ctrl', 'T'], title: 'Buka Tab Baru'},
  {keys: ['Ctrl', 'Shift', 'D'], title: 'Split View (2 Server Sekaligus)'},
  {keys: ['Ctrl', 'Tab'], title: 'Pindah Antar Tab Server'},
];

const SceneShortcuts: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const activeIdx = f < 165 ? 0 : f < 265 ? 1 : f < 395 ? 2 : 3;

  return (
    <AbsoluteFill>
      <EditorialHeader index="05" tag="HOTKEYS & SPLIT VIEW" title="Shortcut Wajib" accentWord="Termius." />

      <RealTermiusFrame
        showSidebar={false}
        tabs={[{label: 'Split view', active: true, kind: 'split'}]}
      >
        <div style={{padding: 18, flex: 1, display: 'flex', flexDirection: 'column', gap: 18}}>
          {/* REAL TERMIUS SPLIT VIEW CLONED FROM OFFICIAL SCREENSHOT! */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, height: 390, position: 'relative'}}>
            {/* Left Pane */}
            <div style={{
              background: T.terminal, borderRadius: 16,
              border: `2px solid ${activeIdx !== 3 ? T.border : T.green}`,
              padding: '16px 18px', fontFamily: MONO, fontSize: 16, lineHeight: 1.5,
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, color: T.green, fontWeight: 700, marginBottom: 12}}>
                <UbuntuHostIcon size={24} monochrome={T.green} />
                <span>vps-prod-sg</span>
              </div>
              <div style={{color: T.green}}>root@vps-prod:~$ df -h</div>
              <div style={{color: T.muted, marginTop: 4}}>Filesystem   Size Used Avail</div>
              <div style={{color: T.green}}>/dev/vda1    154G 9.2G  145G</div>
              <div style={{color: T.green, marginTop: 12}}>
                root@vps-prod:~$ <span style={{display: 'inline-block', width: 10, height: 18, border: `1.5px solid ${T.green}`, verticalAlign: 'middle'}} />
              </div>
            </div>

            {/* Right Focused Pane (Authentic #29D386 glowing border!) */}
            <div style={{
              background: T.terminal, borderRadius: 16,
              border: `2px solid ${T.green}`,
              padding: '16px 18px', fontFamily: MONO, fontSize: 16, lineHeight: 1.5,
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, color: T.green, fontWeight: 700, marginBottom: 12}}>
                <span>✕</span>
                <span>api-worker-01</span>
              </div>
              <div style={{color: T.green}}>System load:  0.16</div>
              <div style={{color: T.green}}>Memory usage: 34%</div>
              <div><span style={{color: T.green}}>IPv4 eth0: </span><span style={{color: T.magenta}}>43.133.155.156</span></div>
              <div style={{color: T.green, marginTop: 12}}>
                root@api-worker:~$ <span style={{display: 'inline-block', width: 10, height: 18, background: T.green, verticalAlign: 'middle'}} />
              </div>
            </div>

            {/* Authentic Floating Broadcast Input Pill from Termius Screenshot */}
            <div style={{
              position: 'absolute', top: -6, right: 10,
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#1E2338', border: `1.5px solid #323956`,
              borderRadius: 12, padding: '8px 14px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.55)',
            }}>
              <span style={{color: T.green, fontSize: 16, fontWeight: 700}}>Broadcast input</span>
              <span style={{background: T.activeTabBg, color: T.green, padding: '3px 8px', borderRadius: 6, fontFamily: MONO, fontSize: 14, fontWeight: 700}}>Ctrl</span>
              <span style={{background: T.activeTabBg, color: T.green, padding: '3px 8px', borderRadius: 6, fontFamily: MONO, fontSize: 14, fontWeight: 700}}>Alt</span>
              <span style={{background: T.activeTabBg, color: T.green, padding: '3px 8px', borderRadius: 6, fontFamily: MONO, fontSize: 14, fontWeight: 700}}>B</span>
              <BroadcastNodesIcon size={18} color={T.green} />
            </div>
          </div>

          {/* 4 Shortcut Rows */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {SHORTCUTS.map((sc, i) => {
              const active = i === activeIdx;
              return (
                <div key={sc.title} style={{
                  background: active ? T.activeTabBg : T.card,
                  border: `1.5px solid ${active ? T.green : T.border}`,
                  borderRadius: 13, padding: '18px 22px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{fontSize: 22, fontWeight: 700, color: active ? T.green : T.text}}>{sc.title}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    {sc.keys.map((k, ki) => (
                      <React.Fragment key={k}>
                        <TermiusKeycap label={k} active={active} />
                        {ki < sc.keys.length - 1 && <span style={{color: T.dim, fontWeight: 700}}>+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RealTermiusFrame>

      <ContextCalloutBar
        leftLabel="Pengguna Mac? Ganti Ctrl → ⌘ Cmd"
        rightContent={<TermiusKeycap label="⌘ Cmd" active />}
      />

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== SCENE 6: OUTRO ==================== */
const SceneOutro: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: f - 5, fps, config: {damping: 14}});

  return (
    <AbsoluteFill>
      <EditorialHeader index="06" tag="CHEAT SHEET" title="Save Biar Nggak" accentWord="Lupa." />

      <div style={{
        position: 'absolute', top: 310, left: 48, right: 48,
        background: T.chrome, border: `1.5px solid ${T.border}`, borderRadius: 24,
        padding: '44px 36px', fontFamily: FONT,
        transform: `scale(${0.94 + 0.06 * pop})`, opacity: pop,
        boxShadow: '0 36px 90px rgba(0,0,0,0.65)',
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 34}}>
          <TermiusAppIcon size={92} />
          <div>
            <div style={{fontSize: 38, fontWeight: 800, color: T.text}}>Termius Workflow</div>
            <div style={{fontSize: 21, color: T.green, fontWeight: 600}}>Ringkasan Command & Shortcut</div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 34}}>
          {[
            'Hosts & SSH Keychain',
            'htop · df -h · pm2 · tmux',
            'Snippets & SFTP Dual-Pane',
            'Ctrl+J · T · Shift+D · Tab',
          ].map((item) => (
            <div key={item} style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderRadius: 14, padding: '20px 20px',
              fontFamily: MONO, fontSize: 20, fontWeight: 700, color: T.text,
            }}>
              <span style={{color: T.green, marginRight: 10}}>✓</span>
              {item}
            </div>
          ))}
        </div>

        <div style={{
          background: T.green, color: '#06150E',
          borderRadius: 15, padding: '22px 28px', textAlign: 'center',
          fontSize: 28, fontWeight: 900, letterSpacing: '-0.01em',
        }}>
          SAVE & FOLLOW @rhmtofc
        </div>
      </div>

      <KaraokeSubtitle words={words} />
    </AbsoluteFill>
  );
};

/* ==================== MAIN COMPOSITION ==================== */
export const TermiusProVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: T.outerBg}}>
    {timeline.scenes.map((scene) => {
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
