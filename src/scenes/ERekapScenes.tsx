import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {pop} from '../lib/anim';

type NavTab = 'dashboard' | 'rekap' | 'admin' | 'info';

/* ── Crisp Vector Icons matching Phosphor style used in E-Rekap ── */
const IconSquares: React.FC<{size?: number; color?: string}> = ({size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <rect x="40" y="40" width="76" height="76" rx="14" />
    <rect x="140" y="40" width="76" height="76" rx="14" />
    <rect x="40" y="140" width="76" height="76" rx="14" />
    <rect x="140" y="140" width="76" height="76" rx="14" />
  </svg>
);

const IconTable: React.FC<{size?: number; color?: string}> = ({size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <rect x="32" y="48" width="192" height="160" rx="14" />
    <line x1="32" y1="104" x2="224" y2="104" />
    <line x1="32" y1="156" x2="224" y2="156" />
    <line x1="96" y1="104" x2="96" y2="208" />
  </svg>
);

const IconSliders: React.FC<{size?: number; color?: string}> = ({size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <line x1="40" y1="84" x2="216" y2="84" />
    <circle cx="156" cy="84" r="20" fill={color} />
    <line x1="40" y1="172" x2="216" y2="172" />
    <circle cx="100" cy="172" r="20" fill={color} />
  </svg>
);

const IconInfo: React.FC<{size?: number; color?: string}> = ({size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="128" cy="128" r="96" />
    <line x1="128" y1="120" x2="128" y2="176" />
    <circle cx="128" cy="84" r="8" fill={color} stroke="none" />
  </svg>
);

const IconShield: React.FC<{size?: number; color?: string}> = ({size = 22, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm-34.34,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const IconDatabase: React.FC<{size?: number; color?: string}> = ({size = 22, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <ellipse cx="128" cy="64" rx="88" ry="32" />
    <path d="M40,86v38c0,17.67,39.4,32,88,32s88-14.33,88-32V86c-17.6,15.32-50.37,24-88,24S57.6,101.32,40,86Z" />
    <path d="M40,146v38c0,17.67,39.4,32,88,32s88-14.33,88-32V146c-17.6,15.32-50.37,24-88,24S57.6,161.32,40,146Z" />
  </svg>
);

const IconExcel: React.FC<{size?: number; color?: string}> = ({size = 22, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" />
    <polyline points="152 32 152 88 208 88" />
    <line x1="92" y1="136" x2="140" y2="188" />
    <line x1="140" y1="136" x2="92" y2="188" />
  </svg>
);

const IconPrinter: React.FC<{size?: number; color?: string}> = ({size = 22, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="64 80 64 40 192 40 192 80" />
    <rect x="64" y="152" width="128" height="64" />
    <path d="M64,176H40a16,16,0,0,1-16-16V96A16,16,0,0,1,40,80H216a16,16,0,0,1,16,16v64a16,16,0,0,1-16,16H192" />
  </svg>
);

const IconSearch: React.FC<{size?: number; color?: string}> = ({size = 22, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="112" cy="112" r="76" />
    <line x1="166" y1="166" x2="220" y2="220" />
  </svg>
);

const IconBuildings: React.FC<{size?: number; color?: string}> = ({size = 24, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-16-16H48A16,16,0,0,0,32,32V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM80,144H64a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm0-48H64a8,8,0,0,1,0-16H80a8,8,0,0,1,0,16Zm48,48H112a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm0-48H112a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm64,48H176a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Z" />
  </svg>
);

const IconArrowUpRight: React.FC<{size?: number; color?: string}> = ({size = 20, color = 'currentColor'}) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="none" stroke={color} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
    <line x1="64" y1="192" x2="192" y2="64" />
    <polyline points="88 64 192 64 192 168" />
  </svg>
);

/* ── Shared App Shell Components (Matching E-Rekap 1:1) ── */
const ERekapShellFrame: React.FC<{
  mode: 'dark' | 'light';
  activeTab: NavTab;
  accessLabel?: string;
  isAdminMode?: boolean;
  children: React.ReactNode;
}> = ({mode, activeTab, accessLabel = 'Mode Review', isAdminMode = false, children}) => {
  const isDark = mode === 'dark';
  const navItems: {id: NavTab; label: string; icon: React.ReactNode}[] = [
    {id: 'dashboard', label: 'Dashboard', icon: <IconSquares size={24} />},
    {id: 'rekap', label: 'Rekap', icon: <IconTable size={24} />},
    {id: 'admin', label: 'Kelola', icon: <IconSliders size={24} />},
    {id: 'info', label: 'Info', icon: <IconInfo size={24} />},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isDark ? T.canopyDeep : T.bg,
        backgroundImage: isDark
          ? `radial-gradient(circle at 80% 10%, rgba(163, 230, 53, 0.14), transparent 48%), linear-gradient(165deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`
          : `radial-gradient(circle at 85% 0%, rgba(163, 230, 53, 0.12), transparent 42%), radial-gradient(circle at 10% 70%, rgba(17, 87, 55, 0.06), transparent 45%)`,
        fontFamily: EREKAP_FONT.sans,
        color: isDark ? '#FFFFFF' : T.ink,
        padding: '62px 52px 246px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top App Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderRadius: 24,
          backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.92)',
          border: isDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid ${T.border}`,
          boxShadow: isDark ? 'none' : T.shadowCard,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Img
            src={staticFile('assets/erekap/icon-erekap.png')}
            style={{width: 44, height: 44, borderRadius: 12, objectFit: 'contain'}}
          />
          <div>
            <div style={{fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1}}>
              E-Rekap
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: isDark ? 'rgba(220,252,231,0.78)' : T.inkMuted,
              }}
            >
              Sistem Rekapitulasi Kehadiran
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            backgroundColor: isAdminMode
              ? T.lime
              : isDark
              ? 'rgba(255,255,255,0.12)'
              : T.surfaceMint,
            color: isAdminMode ? T.limeInk : isDark ? '#FFFFFF' : T.canopy,
            fontSize: 16,
            fontWeight: 800,
            border: isDark ? '1px solid rgba(255,255,255,0.14)' : `1px solid ${T.borderStrong}`,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              backgroundColor: isAdminMode ? T.canopyDeep : T.lime,
            }}
          />
          <span>{accessLabel}</span>
        </div>
      </div>

      {/* Main Content Stage (vertically balanced fill) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {children}
      </div>

      {/* Floating Bottom Navigation Dock (E-Rekap Mobile Shell) */}
      <div
        style={{
          alignSelf: 'center',
          width: '100%',
          maxWidth: 760,
          backgroundColor: isDark ? 'rgba(6, 28, 17, 0.94)' : 'rgba(11, 20, 16, 0.94)',
          borderRadius: 30,
          padding: '10px 14px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: T.shadowDock,
        }}
      >
        {navItems.map((item) => {
          const active = item.id === activeTab;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 9,
                padding: '12px 10px',
                borderRadius: 22,
                backgroundColor: active ? T.canopy : 'transparent',
                color: active ? T.lime : 'rgba(255,255,255,0.62)',
                fontWeight: active ? 800 : 600,
                fontSize: 17,
                border: active ? '1px solid rgba(163,230,53,0.35)' : '1px solid transparent',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Section Eyebrow & Heading (Consistent UI Context) ── */
const SceneContextBar: React.FC<{
  step: string;
  title: string;
  route: string;
  mode: 'dark' | 'light';
}> = ({step, title, route, mode}) => {
  const isDark = mode === 'dark';
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
      <div>
        <div
          style={{
            fontFamily: EREKAP_FONT.mono,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: isDark ? T.lime : T.canopy,
            textTransform: 'uppercase',
          }}
        >
          {step}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: isDark ? '#FFFFFF' : T.ink,
            marginTop: 2,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontFamily: EREKAP_FONT.mono,
          fontSize: 16,
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: 14,
          backgroundColor: isDark ? 'rgba(255,255,255,0.09)' : T.surface,
          color: isDark ? '#D1FAE5' : T.canopy,
          border: isDark ? '1px solid rgba(255,255,255,0.14)' : `1px solid ${T.borderStrong}`,
          flexShrink: 0,
        }}
      >
        {route}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 1 — Hook & Identitas Canopy (Dark Canopy Theme)
   ═══════════════════════════════════════════════════════════════ */
export const ERekapHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headP = pop(frame, 4, fps, 160);
  const canopyP = pop(frame, 14, fps, 150);
  const sheetP = pop(frame, 26, fps, 155);
  const chipsP = pop(frame, 36, fps, 165);

  const specs = [
    {icon: <IconShield size={24} color={T.canopy} />, title: 'Review & Admin', desc: 'Tinjau bebas; ubah data via login Admin.'},
    {icon: <IconDatabase size={24} color={T.canopy} />, title: 'SQLite Persisten', desc: 'Data siswa & rekap tersimpan aman.'},
    {icon: <IconExcel size={24} color={T.canopy} />, title: 'Backup Excel (.xlsx)', desc: 'Ekspor laporan & restore spreadsheet.'},
    {icon: <IconPrinter size={24} color={T.canopy} />, title: 'Cetak A4 Landscape', desc: 'Format formal lengkap Kop Surat resmi.'},
  ];

  return (
    <ERekapShellFrame mode="dark" activeTab="info" accessLabel="E-Rekap v1.0.0">
      {/* Top Hook Headline */}
      <div
        style={{
          opacity: headP,
          transform: `translateY(${(1 - headP) * 20}px)`,
          textAlign: 'center',
          padding: '0 8px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(163, 230, 53, 0.16)',
            border: '1px solid rgba(163, 230, 53, 0.42)',
            color: T.lime,
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          STOP REKAP ABSEN MANUAL
        </div>
        <h1
          style={{
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          Rekap Kehadiran Siswa{' '}
          <span style={{color: T.lime}}>Rapi, Cepat & Siap Cetak</span>
        </h1>
      </div>

      {/* Authentic E-Rekap Canopy Header + Overlapping Sheet */}
      <div
        style={{
          opacity: canopyP,
          transform: `translateY(${(1 - canopyP) * 26}px) scale(${0.96 + 0.04 * canopyP})`,
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 32,
            background: `linear-gradient(135deg, ${T.canopy} 0%, #093521 55%, #062215 100%)`,
            padding: '32px 32px 62px',
            border: '1px solid rgba(163, 230, 53, 0.28)',
            boxShadow: '0 26px 56px -14px rgba(0, 0, 0, 0.55)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage:
                'linear-gradient(to right, rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(163,230,53,0.5) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div style={{position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 22}}>
            <div
              style={{
                width: 98,
                height: 98,
                borderRadius: 26,
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(163,230,53,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 14px 28px rgba(0,0,0,0.4)',
              }}
            >
              <Img
                src={staticFile('assets/erekap/icon-erekap.png')}
                style={{width: 72, height: 72, objectFit: 'contain'}}
              />
            </div>

            <div style={{flex: 1}}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: T.lime,
                  marginBottom: 4,
                }}
              >
                Detail Aplikasi Web
              </div>
              <div style={{fontSize: 31, fontWeight: 800, lineHeight: 1.18, color: '#FFFFFF'}}>
                E-Rekap — Sistem Rekapitulasi Kehadiran
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginTop: 14,
                  opacity: chipsP,
                }}
              >
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    padding: '5px 13px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                >
                  v1.0.0
                </span>
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    padding: '5px 13px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(163, 230, 53, 0.16)',
                    border: '1px solid rgba(163, 230, 53, 0.35)',
                    color: '#BEF264',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: T.lime,
                      boxShadow: `0 0 10px ${T.lime}`,
                    }}
                  />
                  Status: Aktif
                </span>
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    padding: '5px 13px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#D1FAE5',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <IconDatabase size={15} color={T.lime} />
                  DB: SQLite
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping White Sheet: Lembaga Terdaftar */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            marginTop: -36,
            marginLeft: 16,
            marginRight: 16,
            backgroundColor: T.surface,
            color: T.ink,
            borderRadius: 28,
            padding: '24px 26px',
            border: `1px solid ${T.border}`,
            boxShadow: T.shadowSheet,
            opacity: sheetP,
            transform: `translateY(${(1 - sheetP) * 18}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                backgroundColor: T.surfaceMint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${T.borderStrong}`,
              }}
            >
              <IconBuildings size={30} color={T.canopy} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: T.inkMuted,
                }}
              >
                Lembaga Terdaftar
              </div>
              <div style={{fontSize: 24, fontWeight: 800, color: T.ink, marginTop: 2}}>
                MA NU Islamiyah Asembagus
              </div>
              <div style={{fontSize: 16, fontWeight: 600, color: T.inkMuted, marginTop: 2}}>
                Kab. Situbondo • TA 2026/2027 (Ganjil)
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: EREKAP_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              padding: '9px 14px',
              borderRadius: 14,
              backgroundColor: T.surfaceMint,
              color: T.canopy,
              border: `1px solid ${T.borderStrong}`,
              flexShrink: 0,
            }}
          >
            NPSN 20584645
          </div>
        </div>
      </div>

      {/* 4 Core Spec Cards (matches /info 4-card grid, fills lower space cleanly) */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
        {specs.map((sp, i) => {
          const p = pop(frame, 44 + i * 8, fps, 165);
          return (
            <div
              key={sp.title}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 16}px)`,
                backgroundColor: T.surfaceRaised,
                color: T.ink,
                borderRadius: 24,
                padding: '20px 22px',
                border: `1px solid ${T.borderStrong}`,
                boxShadow: T.shadowCard,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  backgroundColor: T.surfaceMint,
                  border: `1px solid ${T.borderStrong}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {sp.icon}
              </div>
              <div>
                <div style={{fontSize: 20, fontWeight: 800, color: T.ink}}>{sp.title}</div>
                <div style={{fontSize: 15, fontWeight: 500, color: T.inkMuted, marginTop: 3, lineHeight: 1.35}}>
                  {sp.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ERekapShellFrame>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 2 — Dashboard & Review Publik (Light #F1F5F2 Theme)
   ═══════════════════════════════════════════════════════════════ */
export const ERekapDashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ctxP = pop(frame, 2, fps, 160);
  const cardP = pop(frame, 8, fps, 155);
  const sheetP = pop(frame, 20, fps, 150);
  const rateVal = interpolate(frame, [12, 68], [0, 94.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeClassIdx = Math.floor(
    interpolate(frame, [40, 260], [0, 3.6], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const ringRadius = 52;
  const ringCirc = 2 * Math.PI * ringRadius;
  const ringOffset = ringCirc - (rateVal / 100) * ringCirc;

  const stats = [
    {label: 'Hadir', count: Math.round(rateVal * 3.12), ...T.status.hadir},
    {label: 'Sakit', count: 8, ...T.status.sakit},
    {label: 'Izin', count: 6, ...T.status.izin},
    {label: 'Alpha', count: 2, ...T.status.alpha},
  ];

  const classes = ['Semua Kelas', 'X IPA 1', 'XI IPA 1', 'XII IPS 1'];
  const classSummaries = [
    {name: 'X IPA 1', students: '6 Siswa', rate: '96.2%'},
    {name: 'XI IPA 1', students: '6 Siswa', rate: '93.8%'},
    {name: 'XII IPS 1', students: '6 Siswa', rate: '94.5%'},
  ];

  return (
    <ERekapShellFrame mode="light" activeTab="dashboard" accessLabel="Mode Review Publik">
      <div style={{opacity: ctxP, transform: `translateY(${(1 - ctxP) * 14}px)`}}>
        <SceneContextBar
          step="01 / Dashboard Utama"
          title="Pantau Kehadiran Per Kelas"
          route="/dashboard"
          mode="light"
        />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
        {/* Dashboard Canopy Card */}
        <div
          style={{
            opacity: cardP,
            transform: `translateY(${(1 - cardP) * 22}px)`,
            borderRadius: 32,
            background: `linear-gradient(140deg, ${T.canopyDeep} 0%, ${T.canopy} 60%, ${T.canopyMid} 100%)`,
            padding: '30px 32px 62px',
            color: '#FFFFFF',
            boxShadow: '0 24px 50px -14px rgba(7, 41, 25, 0.45)',
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <div style={{fontSize: 16, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D9F99D'}}>
              TA 2026/2027 • Semester Ganjil
            </div>
            <div
              style={{
                fontFamily: EREKAP_FONT.mono,
                fontSize: 15,
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              November 2026
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22}}>
            <div>
              <div style={{fontSize: 19, fontWeight: 600, color: 'rgba(209, 250, 229, 0.85)'}}>
                Total Persentase Kehadiran
              </div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6}}>
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 74,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {rateVal.toFixed(1)}%
                </span>
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 17,
                    fontWeight: 700,
                    padding: '6px 13px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.16)',
                    color: '#D1FAE5',
                  }}
                >
                  18 Siswa
                </span>
              </div>

              <div style={{display: 'flex', gap: 12, marginTop: 18}}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 22px',
                    borderRadius: 999,
                    backgroundColor: T.lime,
                    color: T.limeInk,
                    fontSize: 18,
                    fontWeight: 800,
                    boxShadow: '0 10px 24px -6px rgba(163, 230, 53, 0.5)',
                  }}
                >
                  <span>Buka Rekap</span>
                  <IconArrowUpRight size={18} color={T.limeInk} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    borderRadius: 999,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    fontSize: 17,
                    fontWeight: 700,
                  }}
                >
                  Info Sekolah
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 18,
                borderRadius: 24,
                backgroundColor: 'rgba(0,0,0,0.22)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              <svg width="132" height="132" viewBox="0 0 132 132">
                <circle cx="66" cy="66" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="13" />
                <circle
                  cx="66"
                  cy="66"
                  r={ringRadius}
                  fill="none"
                  stroke={T.lime}
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray={ringCirc}
                  strokeDashoffset={ringOffset}
                  transform="rotate(-90 66 66)"
                />
                <text
                  x="66"
                  y="73"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="24"
                  fontWeight="800"
                  fontFamily={EREKAP_FONT.mono}
                >
                  {Math.round(rateVal)}%
                </text>
              </svg>
              <span style={{fontSize: 14, fontWeight: 700, color: '#D1FAE5', marginTop: 4}}>
                Kehadiran Aktif
              </span>
            </div>
          </div>
        </div>

        {/* Overlapping White Filter & 4 Status Sheet */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            marginTop: -34,
            marginLeft: 14,
            marginRight: 14,
            backgroundColor: T.surface,
            borderRadius: 28,
            padding: '24px 26px',
            border: `1px solid ${T.border}`,
            boxShadow: T.shadowSheet,
            opacity: sheetP,
            transform: `translateY(${(1 - sheetP) * 20}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
              <span style={{fontSize: 21, fontWeight: 800, color: T.ink}}>Filter Kelas</span>
              <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 16, fontWeight: 700, color: T.inkMuted}}>
                3 Kelas Aktif
              </span>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
              {classes.map((cls, idx) => {
                const isActive = idx === activeClassIdx;
                return (
                  <div
                    key={cls}
                    style={{
                      textAlign: 'center',
                      padding: '13px 8px',
                      borderRadius: 16,
                      fontSize: 17,
                      fontWeight: 800,
                      backgroundColor: isActive ? T.canopy : T.surfaceMint,
                      color: isActive ? '#FFFFFF' : T.canopy,
                      border: `1px solid ${isActive ? T.canopyDeep : T.borderStrong}`,
                    }}
                  >
                    {cls}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
            {stats.map((st, idx) => {
              const p = pop(frame, 36 + idx * 9, fps, 165);
              return (
                <div
                  key={st.label}
                  style={{
                    opacity: p,
                    transform: `scale(${0.92 + 0.08 * p})`,
                    backgroundColor: T.surfaceRaised,
                    border: `1px solid ${T.borderStrong}`,
                    borderRadius: 20,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 13px',
                        borderRadius: 999,
                        backgroundColor: st.bg,
                        color: st.fg,
                        border: `1px solid ${st.border}`,
                        fontSize: 16,
                        fontWeight: 800,
                      }}
                    >
                      {st.label}
                    </span>
                    <div style={{fontSize: 14, fontWeight: 600, color: T.inkMuted, marginTop: 6}}>
                      Terhitung Otomatis
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: EREKAP_FONT.mono,
                      fontSize: 40,
                      fontWeight: 800,
                      color: st.fg,
                    }}
                  >
                    {st.count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ringkasan Kelas Card (matches /dashboard class breakdown) */}
      <div
        style={{
          backgroundColor: T.surface,
          borderRadius: 24,
          padding: '18px 22px',
          border: `1px solid ${T.border}`,
          boxShadow: T.shadowCard,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        {classSummaries.map((cs, idx) => {
          const p = pop(frame, 60 + idx * 8, fps, 165);
          return (
            <div
              key={cs.name}
              style={{
                opacity: p,
                backgroundColor: T.surfaceRaised,
                border: `1px solid ${T.borderStrong}`,
                borderRadius: 16,
                padding: '12px 14px',
              }}
            >
              <div style={{fontSize: 18, fontWeight: 800, color: T.ink}}>{cs.name}</div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4}}>
                <span style={{fontSize: 14, fontWeight: 600, color: T.inkMuted}}>{cs.students}</span>
                <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 19, fontWeight: 800, color: T.canopy}}>
                  {cs.rate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ERekapShellFrame>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — Pencarian Cepat & Panel Admin SQLite (Light Theme)
   ═══════════════════════════════════════════════════════════════ */
export const ERekapAdminScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ctxP = pop(frame, 2, fps, 160);
  const searchP = pop(frame, 8, fps, 155);
  const adminP = pop(frame, 48, fps, 150);

  const queryFull = 'Ahmad';
  const typedLen = Math.floor(
    interpolate(frame, [16, 46], [0, queryFull.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const queryText = queryFull.slice(0, typedLen);

  const rows = [
    {no: '01', name: 'Ahmad Fauzi', cls: 'XII IPS 1', h: 22, s: 0, i: 0, a: 0, pct: '100%', status: 'hadir' as const},
    {no: '02', name: 'Ahmad Hidayat', cls: 'XI IPA 1', h: 20, s: 1, i: 1, a: 0, pct: '91%', status: 'izin' as const},
    {no: '03', name: 'Siti Aminah', cls: 'X IPA 1', h: 21, s: 1, i: 0, a: 0, pct: '95%', status: 'sakit' as const},
    {no: '04', name: 'M. Rizky Pratama', cls: 'XII IPS 1', h: 21, s: 0, i: 1, a: 0, pct: '95%', status: 'hadir' as const},
  ];
  const visibleRows = typedLen >= 3 ? rows.slice(0, 2) : rows.slice(0, 3);

  return (
    <ERekapShellFrame mode="light" activeTab="admin" accessLabel="Mode Admin Aktif" isAdminMode>
      <div style={{opacity: ctxP, transform: `translateY(${(1 - ctxP) * 14}px)`}}>
        <SceneContextBar
          step="02 / Pencarian & Proteksi"
          title="Cari Cepat & Edit Aman Admin"
          route="/rekap • /admin"
          mode="light"
        />
      </div>

      {/* Top Card: /rekap Quick Search & Table */}
      <div
        style={{
          opacity: searchP,
          transform: `translateY(${(1 - searchP) * 20}px)`,
          backgroundColor: T.surface,
          borderRadius: 28,
          padding: '24px 26px',
          border: `1px solid ${T.border}`,
          boxShadow: T.shadowSheet,
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
          <div style={{fontSize: 21, fontWeight: 800, color: T.ink}}>
            Pencarian Siswa & No. Absen
          </div>
          <span
            style={{
              fontFamily: EREKAP_FONT.mono,
              fontSize: 15,
              fontWeight: 700,
              padding: '5px 13px',
              borderRadius: 999,
              backgroundColor: T.surfaceMint,
              color: T.canopy,
            }}
          >
            {visibleRows.length} Ditemukan
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: T.bg,
            borderRadius: 18,
            padding: '14px 18px',
            border: `1.5px solid ${typedLen > 0 ? T.canopy : T.borderStrong}`,
            marginBottom: 16,
          }}
        >
          <IconSearch size={22} color={T.inkMuted} />
          <span style={{fontSize: 20, fontWeight: 600, color: queryText ? T.ink : T.inkMuted}}>
            {queryText || 'Cari nama siswa atau No. Absen...'}
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 22,
                backgroundColor: T.canopy,
                marginLeft: 3,
                verticalAlign: 'middle',
                opacity: frame % 24 < 12 ? 1 : 0,
              }}
            />
          </span>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {visibleRows.map((row) => {
            const st = T.status[row.status];
            return (
              <div
                key={row.no}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 16px',
                  borderRadius: 16,
                  backgroundColor: T.surfaceRaised,
                  border: `1px solid ${T.borderStrong}`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <span
                    style={{
                      fontFamily: EREKAP_FONT.mono,
                      fontSize: 18,
                      fontWeight: 800,
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: T.surfaceMint,
                      color: T.canopy,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {row.no}
                  </span>
                  <div>
                    <div style={{fontSize: 20, fontWeight: 800, color: T.ink}}>{row.name}</div>
                    <div style={{fontSize: 15, fontWeight: 600, color: T.inkMuted}}>{row.cls}</div>
                  </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 15, fontWeight: 700, color: T.inkMuted}}>
                    H:{row.h} S:{row.s} I:{row.i}
                  </span>
                  <span
                    style={{
                      fontFamily: EREKAP_FONT.mono,
                      fontSize: 16,
                      fontWeight: 800,
                      padding: '5px 13px',
                      borderRadius: 999,
                      backgroundColor: st.bg,
                      color: st.fg,
                      border: `1px solid ${st.border}`,
                    }}
                  >
                    {row.pct}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Card: Protected Admin Panel + SQLite Persisten */}
      <div
        style={{
          opacity: adminP,
          transform: `translateY(${(1 - adminP) * 22}px)`,
          borderRadius: 28,
          background: `linear-gradient(135deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`,
          padding: '26px 28px',
          color: '#FFFFFF',
          border: '1px solid rgba(163, 230, 53, 0.25)',
          boxShadow: T.shadowSheet,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                backgroundColor: 'rgba(163,230,53,0.16)',
                border: '1px solid rgba(163,230,53,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconShield size={28} color={T.lime} />
            </div>
            <div>
              <div style={{fontSize: 23, fontWeight: 800}}>Panel Admin Terproteksi</div>
              <div style={{fontSize: 16, fontWeight: 600, color: '#D1FAE5'}}>
                Perubahan data wajib login Admin & tersimpan aman
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: EREKAP_FONT.mono,
              fontSize: 15,
              fontWeight: 800,
              padding: '7px 14px',
              borderRadius: 999,
              backgroundColor: T.lime,
              color: T.limeInk,
            }}
          >
            AUTH GUARD
          </span>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 18,
              padding: '15px 18px',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <IconDatabase size={24} color={T.lime} />
            <div>
              <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 17, fontWeight: 800}}>SQLite WAL</div>
              <div style={{fontSize: 14, color: '#D1FAE5'}}>Persisten di Server</div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 18,
              padding: '15px 18px',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <IconSliders size={24} color={T.lime} />
            <div>
              <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 17, fontWeight: 800}}>Mode Review</div>
              <div style={{fontSize: 14, color: '#D1FAE5'}}>Read-only untuk Publik</div>
            </div>
          </div>
        </div>
      </div>
    </ERekapShellFrame>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — Ekspor Excel & Cetak A4 Landscape (Light Theme)
   ═══════════════════════════════════════════════════════════════ */
export const ERekapExportPrintScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ctxP = pop(frame, 2, fps, 160);
  const barP = pop(frame, 8, fps, 155);
  const sheetP = pop(frame, 20, fps, 145);
  const footP = pop(frame, 44, fps, 160);

  const printTableRows = [
    {no: '01', nis: '2026001', nama: 'Ahmad Fauzi', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
    {no: '02', nis: '2026002', nama: 'Dewi Lestari', h: 21, s: 1, i: 0, a: 0, pct: '95%'},
    {no: '03', nis: '2026003', nama: 'M. Rizky Pratama', h: 20, s: 0, i: 2, a: 0, pct: '91%'},
    {no: '04', nis: '2026004', nama: 'Siti Nurhaliza', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
    {no: '05', nis: '2026005', nama: 'Budi Santoso', h: 21, s: 0, i: 1, a: 0, pct: '95%'},
    {no: '06', nis: '2026006', nama: 'Nadia Kusuma', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
  ];

  return (
    <ERekapShellFrame mode="light" activeTab="rekap" accessLabel="Siap Ekspor & Cetak">
      <div style={{opacity: ctxP, transform: `translateY(${(1 - ctxP) * 14}px)`}}>
        <SceneContextBar
          step="03 / Arsip & Laporan Resmi"
          title="Ekspor Excel & Cetak A4 Landscape"
          route="/rekap"
          mode="light"
        />
      </div>

      {/* Action Header Bar mimicking /rekap Canopy Actions */}
      <div
        style={{
          opacity: barP,
          transform: `translateY(${(1 - barP) * 18}px)`,
          borderRadius: 26,
          background: `linear-gradient(135deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`,
          padding: '22px 26px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 14,
          boxShadow: T.shadowSheet,
        }}
      >
        <div>
          <div style={{fontSize: 14, fontWeight: 800, color: '#D9F99D', letterSpacing: '0.08em', textTransform: 'uppercase'}}>
            Data Resmi Terverifikasi
          </div>
          <div style={{fontSize: 26, fontWeight: 800, marginTop: 2}}>
            Rekapitulasi Kehadiran
          </div>
        </div>

        <div style={{display: 'flex', gap: 10}}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 18px',
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.25)',
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            <IconExcel size={19} color={T.lime} />
            <span>Ekspor .xlsx</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 999,
              backgroundColor: T.lime,
              color: T.limeInk,
              fontSize: 17,
              fontWeight: 800,
              boxShadow: '0 8px 20px rgba(163, 230, 53, 0.45)',
            }}
          >
            <IconPrinter size={19} color={T.limeInk} />
            <span>Cetak A4</span>
          </div>
        </div>
      </div>

      {/* Official A4 Landscape Print Preview Card (with Kop Surat) */}
      <div
        style={{
          opacity: sheetP,
          transform: `translateY(${(1 - sheetP) * 22}px) scale(${0.96 + 0.04 * sheetP})`,
          backgroundColor: '#FFFFFF',
          borderRadius: 26,
          padding: '24px 28px',
          border: '2px solid #CBD5E1',
          boxShadow: '0 24px 52px -12px rgba(15, 23, 42, 0.16)',
          color: '#0F172A',
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <span
            style={{
              fontFamily: EREKAP_FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              padding: '5px 12px',
              borderRadius: 8,
              backgroundColor: T.surfaceMint,
              color: T.canopy,
              border: `1px solid ${T.borderStrong}`,
            }}
          >
            FORMAT CETAK: A4 LANDSCAPE
          </span>
          <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 700, color: T.inkMuted}}>
            @media print Standard
          </span>
        </div>

        <div
          style={{
            textAlign: 'center',
            borderBottom: '3px solid #0F172A',
            paddingBottom: 12,
            marginBottom: 14,
          }}
        >
          <div style={{fontSize: 21, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase'}}>
            MA NU ISLAMIYAH ASEMBAGUS
          </div>
          <div style={{fontSize: 14, fontWeight: 600, color: '#334155', marginTop: 2}}>
            NPSN: 20584645 • Jl. Raya No. 170 Asembagus, Kab. Situbondo
          </div>
          <div style={{fontSize: 15, fontWeight: 800, textTransform: 'uppercase', marginTop: 8, color: T.canopy}}>
            REKAPITULASI KEHADIRAN SISWA (XII IPS 1) — NOVEMBER 2026
          </div>
        </div>

        <div style={{border: '1.5px solid #334155', borderRadius: 10, overflow: 'hidden'}}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 104px 1fr 52px 52px 52px 52px 82px',
              backgroundColor: '#F1F5F9',
              borderBottom: '1.5px solid #334155',
              fontFamily: EREKAP_FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              padding: '9px 12px',
              textAlign: 'center',
            }}
          >
            <span>NO</span>
            <span>NIS</span>
            <span style={{textAlign: 'left', fontFamily: EREKAP_FONT.sans}}>NAMA SISWA</span>
            <span>H</span>
            <span>S</span>
            <span>I</span>
            <span>A</span>
            <span>RATE</span>
          </div>

          {printTableRows.map((r, idx) => {
            const rowP = pop(frame, 28 + idx * 6, fps, 175);
            return (
              <div
                key={r.no}
                style={{
                  opacity: rowP,
                  display: 'grid',
                  gridTemplateColumns: '52px 104px 1fr 52px 52px 52px 52px 82px',
                  borderBottom: idx < printTableRows.length - 1 ? '1px solid #CBD5E1' : 'none',
                  fontFamily: EREKAP_FONT.mono,
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '9px 12px',
                  textAlign: 'center',
                  alignItems: 'center',
                  backgroundColor: idx % 2 === 1 ? '#F8FAFC' : '#FFFFFF',
                }}
              >
                <span>{r.no}</span>
                <span style={{color: '#475569'}}>{r.nis}</span>
                <span style={{textAlign: 'left', fontFamily: EREKAP_FONT.sans, fontWeight: 700}}>{r.nama}</span>
                <span style={{color: T.canopy, fontWeight: 800}}>{r.h}</span>
                <span>{r.s}</span>
                <span>{r.i}</span>
                <span>{r.a}</span>
                <span style={{fontWeight: 800, color: T.canopy}}>{r.pct}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup XLSX Info Strip */}
      <div
        style={{
          opacity: footP,
          backgroundColor: T.surface,
          borderRadius: 22,
          padding: '16px 22px',
          border: `1px solid ${T.borderStrong}`,
          boxShadow: T.shadowCard,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: T.surfaceMint,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconExcel size={22} color={T.canopy} />
          </div>
          <div>
            <div style={{fontSize: 18, fontWeight: 800, color: T.ink}}>
              Backup & Restore Spreadsheet .xlsx
            </div>
            <div style={{fontSize: 14, fontWeight: 600, color: T.inkMuted}}>
              Impor massal data siswa & ekspor arsip rekap per kelas
            </div>
          </div>
        </div>
        <span
          style={{
            fontFamily: EREKAP_FONT.mono,
            fontSize: 14,
            fontWeight: 800,
            padding: '6px 12px',
            borderRadius: 10,
            backgroundColor: T.surfaceMint,
            color: T.canopy,
          }}
        >
          .XLSX READY
        </span>
      </div>
    </ERekapShellFrame>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 — Outro & Profil Pengembang RHMT OFC (Canopy Deep)
   ═══════════════════════════════════════════════════════════════ */
export const ERekapBrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headP = pop(frame, 4, fps, 155);
  const cardP = pop(frame, 14, fps, 150);
  const ctaP = pop(frame, 28, fps, 160);
  const specP = pop(frame, 40, fps, 160);

  return (
    <ERekapShellFrame mode="dark" activeTab="info" accessLabel="rhmt.biz.id">
      <div
        style={{
          opacity: headP,
          transform: `translateY(${(1 - headP) * 18}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: EREKAP_FONT.mono,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: T.lime,
            marginBottom: 10,
          }}
        >
          E-REKAP • VERSI 1.0.0
        </div>
        <div style={{fontSize: 50, fontWeight: 800, lineHeight: 1.13, letterSpacing: '-0.025em'}}>
          Solusi Absensi Modern{' '}
          <span style={{color: T.lime}}>Berstandar Sekolah</span>
        </div>
      </div>

      {/* Authentic Developer Profile Card from /info (card-pro) */}
      <div
        style={{
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 24}px) scale(${0.96 + 0.04 * cardP})`,
          backgroundColor: T.surface,
          color: T.ink,
          borderRadius: 32,
          padding: '32px 32px',
          border: `1px solid ${T.border}`,
          boxShadow: '0 28px 60px -14px rgba(0, 0, 0, 0.55)',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <div
            style={{
              width: 114,
              height: 114,
              borderRadius: 26,
              padding: 4,
              background: `linear-gradient(135deg, ${T.lime} 0%, ${T.canopyMid} 55%, ${T.canopyDeep} 100%)`,
              boxShadow: '0 14px 30px rgba(7, 41, 25, 0.3)',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('assets/erekap/pp-dev.webp')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 22,
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{flex: 1}}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: T.surfaceMint,
                color: T.canopy,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Pelajar MA • Web & Agentic Dev
            </span>
            <div style={{fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 8}}>
              Rohmatulloh <span style={{color: T.canopy}}>(R_HMT OFC)</span>
            </div>
            <div style={{fontSize: 18, fontWeight: 600, color: T.inkMuted, marginTop: 4}}>
              Personal Branding: <strong style={{color: T.ink}}>rhmt ofc</strong> • Indonesia
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${T.borderStrong}`,
            paddingTop: 18,
            fontSize: 20,
            lineHeight: 1.5,
            color: T.inkMuted,
          }}
        >
          Dibangun dengan arsitektur <strong style={{color: T.ink}}>Next.js + SQLite WAL</strong> untuk menghadirkan aplikasi rekapitulasi kehadiran yang cepat, presisi, dan siap pakai di lingkungan sekolah.
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            opacity: ctaP,
            transform: `translateY(${(1 - ctaP) * 10}px)`,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '13px 22px',
              borderRadius: 999,
              backgroundColor: T.lime,
              color: T.limeInk,
              fontSize: 19,
              fontWeight: 800,
              boxShadow: '0 8px 20px -4px rgba(163, 230, 53, 0.5)',
            }}
          >
            <span>rhmt.biz.id</span>
            <IconArrowUpRight size={18} color={T.limeInk} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '13px 20px',
              borderRadius: 999,
              backgroundColor: '#0B1410',
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            github.com/rhmt-ofc
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '13px 20px',
              borderRadius: 999,
              backgroundColor: T.surfaceMint,
              color: T.canopy,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            @rhmtofc
          </div>
        </div>
      </div>

      {/* Bottom Institutional Architecture Strip */}
      <div
        style={{
          opacity: specP,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        {[
          {k: 'STACK', v: 'Next.js + SQLite'},
          {k: 'AKSES', v: 'Review & Admin'},
          {k: 'OUTPUT', v: 'XLSX & Cetak A4'},
        ].map((item) => (
          <div
            key={item.k}
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(163,230,53,0.22)',
              borderRadius: 20,
              padding: '16px 18px',
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 13, fontWeight: 700, color: T.lime}}>
              {item.k}
            </div>
            <div style={{fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>
              {item.v}
            </div>
          </div>
        ))}
      </div>
    </ERekapShellFrame>
  );
};
