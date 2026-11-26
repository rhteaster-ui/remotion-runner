import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  TERMIUS as T,
  VaultSafeIcon,
  FolderSolidIcon,
  HostsRackIcon,
  KeychainKeyIcon,
  PortFwdArrowsIcon,
  SnippetsBracesIcon,
  KnownHostsFingerprintIcon,
  LogsClockIcon,
  UbuntuHostIcon,
  TerminalPromptIcon,
} from './TermiusIcons';

export const FONT = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
export const MONO = '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace';

export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

/** Clean Apple/Editorial Top Title (zero generic AI stepper/Figma boxes) */
export const EditorialHeader: React.FC<{
  index: string;
  tag: string;
  title: string;
  accentWord?: string;
}> = ({index, tag, title, accentWord}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 18, stiffness: 130}});

  return (
    <div style={{
      position: 'absolute', top: 76, left: 54, right: 54, fontFamily: FONT,
      opacity: s, transform: `translateY(${(1 - s) * 16}px)`,
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontSize: 19, fontWeight: 700, letterSpacing: '0.08em', color: T.muted,
          fontFamily: MONO,
        }}>
          <span style={{color: T.green}}>{index}</span>
          <span>/</span>
          <span>{tag}</span>
        </div>
        <div style={{fontSize: 19, fontWeight: 600, color: T.dim, fontFamily: MONO}}>@rhmtofc</div>
      </div>

      <div style={{
        fontSize: 54, fontWeight: 800, color: T.text,
        lineHeight: 1.12, letterSpacing: '-0.03em',
      }}>
        {title}{' '}
        {accentWord && <span style={{color: T.green}}>{accentWord}</span>}
      </div>
    </div>
  );
};

export type TermiusNav = 'hosts' | 'keychain' | 'portfwd' | 'snippets' | 'known' | 'logs';

const NAV_LIST: {key: TermiusNav; label: string; Icon: React.FC<{color?: string; size?: number}>}[] = [
  {key: 'hosts', label: 'Hosts', Icon: HostsRackIcon},
  {key: 'keychain', label: 'Keychain', Icon: KeychainKeyIcon},
  {key: 'portfwd', label: 'Port forwarding', Icon: PortFwdArrowsIcon},
  {key: 'snippets', label: 'Snippets', Icon: SnippetsBracesIcon},
  {key: 'known', label: 'Known Hosts', Icon: KnownHostsFingerprintIcon},
  {key: 'logs', label: 'Logs', Icon: LogsClockIcon},
];

export interface TermiusTopTab {
  label: string;
  active?: boolean;
  kind?: 'ssh' | 'split';
}

/** Authentic Termius Desktop Window matching official screenshots */
export const RealTermiusFrame: React.FC<{
  activeNav?: TermiusNav;
  sftpActive?: boolean;
  showSidebar?: boolean;
  tabs?: TermiusTopTab[];
  children: React.ReactNode;
}> = ({activeNav = 'hosts', sftpActive = false, showSidebar = true, tabs = [], children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = interpolate(spring({frame: f, fps, config: {damping: 20, stiffness: 120}}), [0, 1], [0.97, 1]);
  const vaultActive = !sftpActive && !tabs.some((t) => t.active);

  return (
    <div style={{
      position: 'absolute',
      top: 268,
      left: 44,
      right: 44,
      height: 1090,
      borderRadius: 22,
      background: T.chrome,
      border: `1.5px solid ${T.border}`,
      boxShadow: '0 40px 100px rgba(0,0,0,0.72)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      color: T.text,
      transform: `scale(${s})`,
    }}>
      {/* Real Termius Top Bar: macOS dots | Vault v | SFTP | divider | Active Tab | + */}
      <div style={{
        height: 66,
        background: T.chrome,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        gap: 10,
      }}>
        {/* Subtle macOS window dots (muted dark gray-slate like official Termius screenshot) */}
        <div style={{display: 'flex', gap: 8, marginRight: 8}}>
          <div style={{width: 12, height: 12, borderRadius: 6, background: '#2C324A'}} />
          <div style={{width: 12, height: 12, borderRadius: 6, background: '#2C324A'}} />
          <div style={{width: 12, height: 12, borderRadius: 6, background: '#2C324A'}} />
        </div>

        {/* Vault Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 15px', borderRadius: 11,
          background: vaultActive ? '#222740' : T.pill,
          border: `1px solid ${vaultActive ? '#343C5E' : 'transparent'}`,
          color: vaultActive ? T.text : T.muted,
          fontSize: 19, fontWeight: 600,
        }}>
          <VaultSafeIcon color={vaultActive ? T.text : T.muted} size={19} />
          <span>Vault</span>
          <span style={{fontSize: 14, opacity: 0.7, marginLeft: 4}}>⌄</span>
        </div>

        {/* SFTP Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 15px', borderRadius: 11,
          background: sftpActive ? T.activeTabBg : T.pill,
          color: sftpActive ? T.green : T.muted,
          fontSize: 19, fontWeight: 600,
        }}>
          <FolderSolidIcon color={sftpActive ? T.green : T.muted} size={18} />
          <span>SFTP</span>
        </div>

        <div style={{width: 1.5, height: 24, background: T.border, margin: '0 2px'}} />

        {/* SSH / Split View Tabs (Authentic #143B32 green pill when active!) */}
        {tabs.map((tab) => (
          <div key={tab.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 18px', borderRadius: 11,
            background: tab.active ? T.activeTabBg : T.pill,
            color: tab.active ? T.green : T.muted,
            fontSize: 19, fontWeight: 600,
          }}>
            {tab.kind === 'split' ? (
              <TerminalPromptIcon color={tab.active ? T.green : T.muted} size={18} />
            ) : (
              <UbuntuHostIcon size={28} monochrome={tab.active ? T.green : T.muted} />
            )}
            <span>{tab.label}</span>
          </div>
        ))}

        {/* + Button */}
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          display: 'grid', placeItems: 'center', color: T.muted, fontSize: 24, fontWeight: 400,
        }}>
          +
        </div>
      </div>

      {/* Body: Left Sidebar + Workspace */}
      <div style={{flex: 1, display: 'flex', minHeight: 0, background: T.workspace}}>
        {showSidebar && (
          <div style={{
            width: 228,
            background: T.chrome,
            borderRight: `1px solid ${T.border}`,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            {NAV_LIST.map(({key, label, Icon}) => {
              const active = key === activeNav && !sftpActive;
              return (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 13,
                  padding: '13px 14px', borderRadius: 11,
                  background: active ? '#1F243B' : 'transparent',
                  color: active ? T.text : T.muted,
                  fontSize: 19, fontWeight: active ? 600 : 500,
                }}>
                  <Icon color={active ? T.text : T.muted} size={20} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        <div style={{flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

/** Minimalist bottom context bar (replaces generic 3-card AI footer) */
export const ContextCalloutBar: React.FC<{
  leftLabel: string;
  rightContent: React.ReactNode;
}> = ({leftLabel, rightContent}) => (
  <div style={{
    position: 'absolute',
    top: 1396,
    left: 44,
    right: 44,
    height: 86,
    borderRadius: 16,
    background: '#141728',
    border: `1.5px solid ${T.border}`,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: FONT,
  }}>
    <div style={{fontSize: 22, fontWeight: 700, color: T.text}}>{leftLabel}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>{rightContent}</div>
  </div>
);

/** Termius-style dark keycap (matching Broadcast Input Ctrl Alt B in official screenshot) */
export const TermiusKeycap: React.FC<{label: string; active?: boolean}> = ({label, active}) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 42, padding: '7px 14px', borderRadius: 9,
    background: active ? T.activeTabBg : '#1E2338',
    border: `1.5px solid ${active ? T.green : '#313854'}`,
    color: active ? T.green : '#E2E8F0',
    fontFamily: MONO, fontSize: 19, fontWeight: 700,
  }}>
    {label}
  </span>
);

/** Clean word-by-word karaoke subtitle synced to real speech */
export const KaraokeSubtitle: React.FC<{words: WordTiming[]}> = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  if (!words.length) return null;

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
      bottom: 118,
      left: 54,
      right: 54,
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
        return (
          <span
            key={`${chunkIndex}-${i}`}
            style={{
              padding: isCurrent ? '6px 15px' : '6px 6px',
              borderRadius: 12,
              background: isCurrent ? T.green : 'transparent',
              color: isCurrent ? '#071710' : '#E2E8F0',
              fontSize: 33,
              fontWeight: isCurrent ? 800 : 700,
              lineHeight: 1.25,
              textShadow: isCurrent ? 'none' : '0 3px 12px rgba(0,0,0,0.85)',
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
