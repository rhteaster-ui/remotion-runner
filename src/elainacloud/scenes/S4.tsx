import React from 'react';
import {Img} from 'remotion';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {Check, KText, MacWindow, SceneShell, Serif, Sfx, ShieldIcon, TerminalIcon, Typing, img, useSF} from '../kit';

const CONSOLE_LINES = [
  {at: 26, text: '$ container@elainacloud:~ node index.js', color: '#E2E8F0'},
  {at: 52, text: '✓ Runtime: Node.js v20 · Python 3.11 · Java 21 · PHP 8.3', color: '#38BDF8'},
  {at: 86, text: '✓ [Baileys] WhatsApp WebSocket Connected (24/7)', color: '#34D399'},
  {at: 122, text: '✓ [SFTP] File Manager Ready · Port 2022', color: '#A78BFA'},
  {at: 158, text: '✓ [Anti-DDoS] L4/L7 Mitigation Active · Uptime 99.9%', color: '#FBBF24'},
];

const FEATURES = [
  {at: 44, title: 'Bot Baileys & Discord', sub: 'Node.js, Python, Java & PHP', color: L.wa, icon: <Img src={img('tools/whatsapp.svg')} style={{width: 28, height: 28, filter: 'brightness(0) invert(1)'}} />},
  {at: 108, title: 'Web Console & SFTP', sub: 'Kelola bot & file real-time', color: L.blue, icon: <TerminalIcon s={26} color="#fff" />},
  {at: 176, title: 'Proteksi Anti-DDoS', sub: 'Mitigasi otomatis 24 jam', color: L.emerald, icon: <ShieldIcon s={28} color="#fff" />},
  {at: 245, title: 'Garansi Uptime 99,9%', sub: 'Auto-restart & stabil nonstop', color: L.violet, icon: <Check s={26} color="#fff" />},
];

export const S4: React.FC = () => {
  const f = useSF();
  const termIn = pop(f, 8, 14, 130);
  const ramPct = Math.round(ramp(f, 90, 260, 14, 32));
  const cpuPct = Math.round(ramp(f, 90, 260, 4, 12));

  return (
    <SceneShell variant="rise" accent={L.emerald} tone={{a: 'rgba(16,185,129,0.16)', b: 'rgba(37,99,235,0.14)'}}>
      <Sfx at={-8} file="whoosh" vol={0.48} />
      <Typing at={26} count={18} gap={2} />
      <Sfx at={64} file="enter" vol={0.4} />
      <Sfx at={86} file="connect" vol={0.35} />
      <Sfx at={158} file="ding" vol={0.35} />
      {FEATURES.map((ft) => (
        <Sfx key={ft.title} at={ft.at} file="pop" vol={0.36} dur={16} />
      ))}

      {/* Header */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 24}}>
        <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.green, letterSpacing: '0.12em', marginBottom: 6}}>
          FITUR LENGKAP PTERODACTYL PANEL
        </div>
        <KText
          at={4}
          stagger={4}
          words={[
            {t: 'Semua'},
            {t: 'Runtime'},
            {t: 'Siap'},
            {t: 'Jalan', style: {...Serif, color: L.green, fontSize: 70}},
          ]}
          style={{fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', lineHeight: 1.05}}
        />
      </div>

      {/* Left: Pterodactyl Dark Web Console */}
      <div style={{position: 'absolute', left: 80, top: 184, width: 960, height: 550}}>
        <MacWindow
          dark
          title="Pterodactyl Web Console — Bot Production"
          style={{height: '100%', opacity: clamp(termIn * 2), transform: `translateY(${(1 - termIn) * 44}px)`}}
          bodyStyle={{padding: '26px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
        >
          <div>
            <div style={{display: 'flex', gap: 10, marginBottom: 22}}>
              {['Console', 'Files (SFTP)', 'Startup', 'Network'].map((tab, i) => (
                <span key={tab} style={{padding: '7px 16px', borderRadius: 10, fontFamily: MONO, fontSize: 14, fontWeight: 800, background: i === 0 ? L.blue : 'rgba(255,255,255,0.08)', color: i === 0 ? '#fff' : '#94A3B8'}}>
                  {tab}
                </span>
              ))}
            </div>

            {CONSOLE_LINES.map((line) => {
              const vis = ramp(f, line.at, line.at + 8);
              return (
                <div key={line.at} style={{fontFamily: MONO, fontSize: 21, fontWeight: 600, color: line.color, opacity: vis, transform: `translateX(${(1 - vis) * -18}px)`, marginBottom: 16, lineHeight: 1.4}}>
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Live Telemetry Bars inside Console */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.1)', fontFamily: MONO}}>
            <div style={{background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px'}}>
              <div style={{fontSize: 12, color: '#94A3B8'}}>STATUS</div>
              <div style={{fontSize: 22, fontWeight: 800, color: '#34D399', marginTop: 4}}>● RUNNING</div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px'}}>
              <div style={{fontSize: 12, color: '#94A3B8'}}>CPU LOAD</div>
              <div style={{fontSize: 22, fontWeight: 800, color: '#38BDF8', marginTop: 4}}>{cpuPct}% / 60%</div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px'}}>
              <div style={{fontSize: 12, color: '#94A3B8'}}>MEMORY</div>
              <div style={{fontSize: 22, fontWeight: 800, color: '#FBBF24', marginTop: 4}}>{ramPct * 12} MB</div>
            </div>
          </div>
        </MacWindow>
      </div>

      {/* Right: 4 Capability Cards */}
      <div style={{position: 'absolute', right: 80, top: 184, width: 760, display: 'flex', flexDirection: 'column', gap: 18}}>
        {FEATURES.map((ft) => {
          const s = pop(f, ft.at, 13, 150);
          return (
            <div key={ft.title} style={{background: '#fff', borderRadius: 24, padding: '20px 26px', border: `1px solid ${L.border}`, boxShadow: L.shadow, display: 'flex', alignItems: 'center', gap: 20, opacity: clamp(s * 2), transform: `translateX(${(1 - s) * 80}px)`}}>
              <div style={{width: 58, height: 58, borderRadius: 18, background: ft.color, display: 'grid', placeItems: 'center', flexShrink: 0}}>
                {ft.icon}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontFamily: SANS, fontSize: 26, fontWeight: 800, color: L.text}}>{ft.title}</div>
                <div style={{fontFamily: MONO, fontSize: 16, color: L.muted, marginTop: 4}}>{ft.sub}</div>
              </div>
              <Check s={22} color={L.green} />
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
