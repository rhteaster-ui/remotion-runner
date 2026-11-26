import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  TERMIUS_COLORS as C,
  TermiusLogo,
  HostsIcon,
  SftpIcon,
  PortFwdIcon,
  SnippetsIcon,
  KeychainIcon,
  SettingsIcon,
  SplitPaneIcon,
} from './TermiusIcons';

export const FONT = 'Inter, "Segoe UI", system-ui, -apple-system, sans-serif';
export const MONO = '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace';

export const STEPS = ['INTRO', 'HOSTS', 'COMMAND', 'FITUR', 'SHORTCUT', 'SELESAI'] as const;

export const TopHeader: React.FC<{
  activeStep: number;
  headline: string;
  highlight: string;
}> = ({activeStep, headline, highlight}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: f, fps, config: {damping: 16, stiffness: 140}});

  return (
    <div style={{position: 'absolute', top: 64, left: 52, right: 52, fontFamily: FONT}}>
      {/* Top Brand Bar */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <TermiusLogo size={42} />
          <div>
            <div style={{fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: '-0.02em'}}>TERMIUS GUIDE</div>
            <div style={{fontSize: 15, fontWeight: 600, color: C.green, letterSpacing: '0.06em'}}>REAL UI · COMMANDS · SHORTCUTS</div>
          </div>
        </div>
        <div style={{
          padding: '8px 18px', borderRadius: 999,
          background: 'rgba(15,23,42,0.85)', border: `1.5px solid ${C.border}`,
          fontSize: 18, fontWeight: 700, color: C.muted,
        }}>
          @rhmtofc
        </div>
      </div>

      {/* Stepper Breadcrumb */}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22}}>
        {STEPS.map((st, idx) => {
          const done = idx < activeStep;
          const active = idx === activeStep;
          return (
            <React.Fragment key={st}>
              <div style={{
                padding: '6px 13px', borderRadius: 999, fontSize: 15, fontWeight: 800,
                letterSpacing: '0.04em',
                background: active ? C.green : done ? 'rgba(0,198,137,0.18)' : 'rgba(30,41,59,0.7)',
                color: active ? '#04120D' : done ? C.green : C.dim,
                border: `1.5px solid ${active ? C.green : done ? 'rgba(0,198,137,0.4)' : C.border}`,
              }}>
                {st}
              </div>
              {idx < STEPS.length - 1 && (
                <div style={{flex: 1, height: 2, background: done ? C.green : 'rgba(148,163,184,0.18)'}} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Headline with Figma Anchor Badge */}
      <div style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 18}px)`,
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14,
        fontSize: 44, fontWeight: 900, color: C.text, lineHeight: 1.16, letterSpacing: '-0.025em',
      }}>
        <span>{headline}</span>
        <span style={{
          position: 'relative', display: 'inline-block',
          padding: '4px 16px',
          background: 'rgba(0, 198, 137, 0.14)',
          border: `2px solid ${C.green}`,
          color: C.green,
          borderRadius: 6,
        }}>
          {highlight}
          {/* Figma corner anchor handles */}
          {[
            {top: -5, left: -5},
            {top: -5, right: -5},
            {bottom: -5, left: -5},
            {bottom: -5, right: -5},
          ].map((pos, i) => (
            <span
              key={i}
              style={{
                position: 'absolute', ...pos,
                width: 9, height: 9, background: '#fff',
                border: `2px solid ${C.green}`, borderRadius: 2,
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export type SidebarKey = 'hosts' | 'sftp' | 'portfwd' | 'snippets' | 'keychain' | 'settings';

const SIDEBAR_ITEMS: {key: SidebarKey; label: string; Icon: React.FC<{color?: string; size?: number}>}[] = [
  {key: 'hosts', label: 'Hosts', Icon: HostsIcon},
  {key: 'sftp', label: 'SFTP', Icon: SftpIcon},
  {key: 'portfwd', label: 'Port Fwd', Icon: PortFwdIcon},
  {key: 'snippets', label: 'Snippets', Icon: SnippetsIcon},
  {key: 'keychain', label: 'Keychain', Icon: KeychainIcon},
  {key: 'settings', label: 'Settings', Icon: SettingsIcon},
];

export const TermiusWindow: React.FC<{
  activeNav: SidebarKey;
  tabs?: {label: string; active?: boolean; connected?: boolean}[];
  showSidebar?: boolean;
  topRightBadge?: string;
  children: React.ReactNode;
}> = ({activeNav, tabs = [], showSidebar = true, topRightBadge, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = interpolate(spring({frame: f, fps, config: {damping: 18, stiffness: 120}}), [0, 1], [0.96, 1]);

  return (
    <div style={{
      position: 'absolute',
      top: 325,
      left: 48,
      right: 48,
      height: 925,
      borderRadius: 24,
      background: C.chrome,
      border: `1.5px solid rgba(148,163,184,0.22)`,
      boxShadow: '0 32px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,198,137,0.08)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      color: C.text,
      transform: `scale(${scale})`,
    }}>
      {/* Real Termius Top Tab Bar */}
      <div style={{
        height: 58,
        background: '#0F1322',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        gap: 10,
      }}>
        {/* Window controls */}
        <div style={{display: 'flex', gap: 8, marginRight: 10}}>
          <div style={{width: 13, height: 13, borderRadius: 7, background: '#FF5F57'}} />
          <div style={{width: 13, height: 13, borderRadius: 7, background: '#FEBC2E'}} />
          <div style={{width: 13, height: 13, borderRadius: 7, background: '#28C840'}} />
        </div>

        {/* Vaults Home Tab */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 10,
          background: tabs.some((t) => t.active) ? 'transparent' : C.surface,
          color: tabs.some((t) => t.active) ? C.muted : C.text,
          fontSize: 19, fontWeight: 700,
        }}>
          <TermiusLogo size={22} />
          <span>Vaults</span>
        </div>

        {/* Open SSH / SFTP Tabs */}
        {tabs.map((tab) => (
          <div key={tab.label} style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '8px 16px', borderRadius: 10,
            background: tab.active ? C.surface : 'rgba(255,255,255,0.03)',
            borderBottom: tab.active ? `2.5px solid ${C.green}` : '2.5px solid transparent',
            color: tab.active ? C.text : C.muted,
            fontSize: 18, fontWeight: 700,
          }}>
            {tab.connected && (
              <span style={{width: 9, height: 9, borderRadius: 5, background: C.green, boxShadow: `0 0 8px ${C.green}`}} />
            )}
            <span>{tab.label}</span>
          </div>
        ))}

        {/* + New Tab button */}
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.05)',
          display: 'grid', placeItems: 'center', color: C.muted, fontSize: 22, fontWeight: 700,
        }}>+</div>

        <div style={{flex: 1}} />

        {/* Split & Status */}
        {topRightBadge && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 12px', borderRadius: 8,
            background: C.greenSoft, border: `1px solid ${C.borderActive}`,
            color: C.green, fontSize: 15, fontWeight: 800, fontFamily: MONO,
          }}>
            <SplitPaneIcon color={C.green} size={16} />
            <span>{topRightBadge}</span>
          </div>
        )}
      </div>

      {/* Main App Body */}
      <div style={{flex: 1, display: 'flex', minHeight: 0}}>
        {showSidebar && (
          <div style={{
            width: 215,
            background: C.sidebar,
            borderRight: `1px solid ${C.border}`,
            padding: '18px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}>
            <div style={{fontSize: 13, fontWeight: 800, color: C.dim, letterSpacing: '0.09em', padding: '4px 12px 10px'}}>
              PERSONAL VAULT
            </div>
            {SIDEBAR_ITEMS.map(({key, label, Icon}) => {
              const isAct = key === activeNav;
              return (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 14px', borderRadius: 12,
                  background: isAct ? C.greenSoft : 'transparent',
                  border: `1px solid ${isAct ? C.borderActive : 'transparent'}`,
                  color: isAct ? C.green : C.muted,
                  fontSize: 20, fontWeight: isAct ? 800 : 600,
                }}>
                  <Icon color={isAct ? C.green : C.muted} size={21} />
                  <span>{label}</span>
                </div>
              );
            })}

            <div style={{flex: 1}} />
            {/* Sync indicator at sidebar bottom */}
            <div style={{
              padding: '12px 14px', borderRadius: 12,
              background: 'rgba(0,198,137,0.08)', border: `1px solid rgba(0,198,137,0.22)`,
              fontSize: 14, color: C.muted, display: 'flex', alignItems: 'center', gap: 9,
            }}>
              <span style={{width: 8, height: 8, borderRadius: 4, background: C.green}} />
              <span style={{fontWeight: 700, color: C.text}}>Cloud Sync</span>
              <span style={{marginLeft: 'auto', color: C.green, fontWeight: 700}}>ON</span>
            </div>
          </div>
        )}

        <div style={{flex: 1, padding: 24, position: 'relative', overflow: 'hidden'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

/** Word-by-word dynamic pill karaoke subtitle (anti-drift, synced to real speech) */
export const KaraokeSubtitle: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;

  if (!words.length) return null;

  // Group into chunks of 6 words so it fits cleanly on 1-2 lines
  const CHUNK_SIZE = 6;
  let activeIdx = words.findIndex((w) => t >= w.start && t <= w.end + 0.12);
  if (activeIdx === -1) {
    activeIdx = words.reduce((acc, w, idx) => (t >= w.start ? idx : acc), 0);
  }
  const chunkIndex = Math.floor(activeIdx / CHUNK_SIZE);
  const chunk = words.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);

  return (
    <div style={{
      position: 'absolute',
      bottom: 112,
      left: 56,
      right: 56,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px 10px',
      fontFamily: FONT,
    }}>
      {chunk.map((w, i) => {
        const globalIdx = chunkIndex * CHUNK_SIZE + i;
        const isCurrent = globalIdx === activeIdx;
        const isPast = globalIdx < activeIdx;
        return (
          <span
            key={`${chunkIndex}-${i}`}
            style={{
              padding: isCurrent ? '6px 16px' : '6px 8px',
              borderRadius: 14,
              background: isCurrent ? C.green : 'rgba(9, 13, 24, 0.72)',
              color: isCurrent ? '#04120D' : isPast ? '#E2E8F0' : '#CBD5E1',
              fontSize: 33,
              fontWeight: isCurrent ? 900 : 700,
              letterSpacing: '0.01em',
              lineHeight: 1.25,
              boxShadow: isCurrent ? '0 8px 24px rgba(0, 198, 137, 0.45)' : '0 4px 14px rgba(0,0,0,0.45)',
              transform: isCurrent ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};

export const BottomWatermark: React.FC = () => (
  <div style={{
    position: 'absolute',
    bottom: 42,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    fontFamily: MONO,
    fontSize: 18,
    fontWeight: 700,
    color: 'rgba(148, 163, 184, 0.55)',
    letterSpacing: '0.12em',
  }}>
    <span style={{width: 7, height: 7, borderRadius: 4, background: C.green}} />
    <span>RHMT OFC</span>
    <span>·</span>
    <span>TERMIUS WORKFLOW</span>
  </div>
);

export const Keycap: React.FC<{label: string; pressed?: boolean}> = ({label, pressed}) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    padding: '8px 14px',
    borderRadius: 10,
    background: pressed ? C.green : '#222A42',
    color: pressed ? '#04120D' : '#F8FAFC',
    border: `1.5px solid ${pressed ? C.green : 'rgba(148,163,184,0.35)'}`,
    borderBottom: `4px solid ${pressed ? '#047857' : '#0F1424'}`,
    fontFamily: MONO,
    fontSize: 21,
    fontWeight: 800,
    transform: pressed ? 'translateY(2px)' : 'none',
    boxShadow: pressed ? '0 0 18px rgba(0,198,137,0.45)' : '0 4px 10px rgba(0,0,0,0.35)',
  }}>
    {label}
  </span>
);
