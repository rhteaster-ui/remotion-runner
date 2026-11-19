import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {Ambient, Reveal, Shine, Sparks, Tap, Vignette, WordReveal, useProg} from '../premium/fx';
import {BrowserPreview, MobilePreview} from './DevicePreviews';

const sans = EREKAP_FONT.sans;
const mono = EREKAP_FONT.mono;

/* ───────── Vector SVG Icons (Anti-Emoji Standard) ───────── */
const IconERekapBrand: React.FC<{size?: number}> = ({size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="11" fill={T.canopy} stroke="rgba(163,230,53,0.45)" strokeWidth="1.5" />
    <path d="M13 11h9l5 5v13a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M15 18h8M15 22.5h5" stroke="#BEF264" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="27.5" cy="26.5" r="5.5" fill={T.lime} />
    <path d="M25.2 26.5l1.6 1.6 3.2-3.2" stroke={T.canopyDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLockVec: React.FC<{size?: number; color?: string}> = ({size = 28, color = T.canopy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1.2" fill={color} />
  </svg>
);

const IconSheetVec: React.FC<{size?: number; color?: string}> = ({size = 28, color = T.canopy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M9 10v10" />
  </svg>
);

const IconPrintVec: React.FC<{size?: number; color?: string}> = ({size = 28, color = T.canopy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9V3h12v6" />
    <rect x="3" y="9" width="18" height="9" rx="2" />
    <path d="M7 15h10v6H7z" fill="#FFFFFF" />
  </svg>
);

/* ───────── Shared E-Rekap Stage Wrapper ───────── */
const StageWrap: React.FC<{
  mode: 'dark' | 'light';
  step: string;
  route: string;
  children: React.ReactNode;
}> = ({mode, step, route, children}) => {
  const dark = mode === 'dark';
  const frame = useCurrentFrame();
  const zoom = 1 + frame * 0.0001;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? T.canopyDeep : T.bg,
        fontFamily: sans,
        color: dark ? '#F4F8F5' : T.ink,
        overflow: 'hidden',
      }}
    >
      <Ambient dark={dark} />

      {/* Top Web App Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '44px 52px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <IconERekapBrand size={46} />
          <div>
            <div style={{fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1}}>
              E-Rekap
            </div>
            <div
              style={{
                fontFamily: mono,
                fontSize: 13,
                fontWeight: 700,
                color: dark ? T.lime : T.canopy,
                letterSpacing: '0.06em',
                marginTop: 2,
              }}
            >
              {step}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 18px',
            borderRadius: 999,
            backgroundColor: dark ? 'rgba(255,255,255,0.08)' : T.surface,
            border: dark ? '1px solid rgba(163,230,53,0.3)' : `1.5px solid ${T.borderStrong}`,
            boxShadow: dark ? 'none' : T.shadowCard,
            fontFamily: mono,
            fontSize: 15,
            fontWeight: 700,
            color: dark ? '#ECFDF5' : T.canopy,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              backgroundColor: T.lime,
              boxShadow: `0 0 8px ${T.lime}`,
            }}
          />
          {route}
        </div>
      </div>

      {/* Main Content Stage (Safe margin bottom for 42px subtitles) */}
      <div
        style={{
          position: 'relative',
          zIndex: 8,
          flex: 1,
          padding: '8px 52px 240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `scale(${zoom})`,
          transformOrigin: '50% 45%',
        }}
      >
        {children}
      </div>

      <Vignette dark={dark} />
    </AbsoluteFill>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 1 — HOOK & MULTI-DEVICE PREVIEW (Dark Canopy)
═══════════════════════════════════════════════════════════════════════════════ */
export const ShowcaseHookScene: React.FC = () => {
  const {now} = useProg();
  const rollPct = interpolate(now, [1.2, 4.2], [0, 95.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <StageWrap mode="dark" step="01 / WEB SHOWCASE" route="xiiclass.rhmt.biz.id">
      <div style={{marginTop: 8}}>
        <WordReveal
          style={{fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em'}}
          words={[
            {t: 'Rekap', at: 0.2},
            {t: 'Kehadiran', at: 0.45},
            {t: 'Siswa', at: 0.7},
            {t: 'Lebih', at: 1.0, accent: true},
            {t: 'Presisi.', at: 1.25, accent: true},
          ]}
        />
        <Reveal at={1.5} y={16} blur={6}>
          <div style={{fontSize: 25, fontWeight: 500, color: 'rgba(241,245,242,0.78)', marginTop: 14, lineHeight: 1.4}}>
            Ringan di <span style={{color: T.lime, fontWeight: 700}}>Desktop &amp; HP</span> — pantau persentase hadir secara terbuka, cetak laporan dalam satu ketukan.
          </div>
        </Reveal>
      </div>

      {/* Dual Real Video Preview Stage */}
      <Reveal at={1.1} y={36} blur={10} style={{position: 'relative', height: 690, marginTop: 10}}>
        <BrowserPreview
          width={890}
          startFrom={0}
          url="rhmt.biz.id/xiiclass"
          badge="DESKTOP PREVIEW"
          dark
          shineAt={3.3}
        />

        <Reveal
          at={2.4}
          y={48}
          blur={8}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            zIndex: 20,
          }}
        >
          <MobilePreview width={262} startFrom={0} dark shineAt={6.4} />
        </Reveal>
      </Reveal>

      {/* Bottom KPI Strip (Zero Dead Space) */}
      <Reveal at={3.1} y={24} blur={6}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18}}>
          <div
            style={{
              padding: '20px 22px',
              borderRadius: 20,
              backgroundColor: 'rgba(10, 61, 38, 0.85)',
              border: '1.5px solid rgba(163, 230, 53, 0.45)',
            }}
          >
            <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: T.lime, letterSpacing: '0.07em'}}>
              KEHADIRAN LIVE
            </div>
            <div style={{fontFamily: mono, fontSize: 42, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>
              {rollPct.toFixed(1)}%
            </div>
          </div>

          <div
            style={{
              padding: '20px 22px',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#A7F3D0', letterSpacing: '0.07em'}}>
              MULTI-KELAS
            </div>
            <div style={{fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 8}}>
              3 Kelas Aktif
            </div>
          </div>

          <div
            style={{
              padding: '20px 22px',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#A7F3D0', letterSpacing: '0.07em'}}>
              DATABASE
            </div>
            <div style={{fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 8}}>
              SQLite Instan
            </div>
          </div>
        </div>
      </Reveal>
    </StageWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 2 — DASHBOARD, ROLLING COUNTER & DONUT CHART (Crisp Light)
═══════════════════════════════════════════════════════════════════════════════ */
export const ShowcaseDashboardScene: React.FC = () => {
  const {now} = useProg();
  const statNums = [
    {label: 'Hadir', val: 260, st: T.status.hadir, delay: 3.4},
    {label: 'Sakit', val: 6, st: T.status.sakit, delay: 4.5},
    {label: 'Izin', val: 5, st: T.status.izin, delay: 5.6},
    {label: 'Alpha', val: 2, st: T.status.alpha, delay: 6.7},
  ];

  return (
    <StageWrap mode="light" step="02 / DASHBOARD & GRAFIK" route="/xiiclass/dashboard">
      <div style={{marginTop: 8}}>
        <WordReveal
          accentColor={T.canopy}
          style={{fontSize: 60, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: T.ink}}
          words={[
            {t: 'Rolling', at: 0.25, accent: true},
            {t: 'Counter', at: 0.5, accent: true},
            {t: '&', at: 0.75},
            {t: 'Grafik', at: 0.95},
            {t: 'Donat', at: 1.2},
            {t: 'Interaktif', at: 1.5},
          ]}
        />
        <Reveal at={1.6} y={14} blur={5}>
          <div style={{fontSize: 24, fontWeight: 500, color: T.inkMuted, marginTop: 12, lineHeight: 1.4}}>
            Transisi tirai hijau madrasah membuka statistik 60fps — pantau proporsi kelas dalam sekali lirik.
          </div>
        </Reveal>
      </div>

      {/* Real Dashboard Video Synced at 15.5s (Curtain -> Dashboard -> Grafik Tab) */}
      <Reveal at={0.9} y={32} blur={8}>
        <BrowserPreview
          width={976}
          startFrom={15 * 30 + 15}
          url="rhmt.biz.id/xiiclass/dashboard"
          badge="DASHBOARD + GRAFIK"
          dark={false}
          shineAt={8.5}
        />
      </Reveal>

      {/* Live Status Breakdown Strip (Exact E-Rekap Status Tokens) */}
      <Reveal at={2.2} y={24} blur={6}>
        <div
          style={{
            padding: '24px 26px',
            borderRadius: 24,
            backgroundColor: T.surface,
            border: `1.5px solid ${T.borderStrong}`,
            boxShadow: T.shadowSheet,
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <div style={{fontSize: 22, fontWeight: 800, color: T.ink}}>
              Distribusi Status Kehadiran Bulanan
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: T.canopy,
                color: T.lime,
                fontFamily: mono,
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              273 SESI TERCATAT
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14}}>
            {statNums.map((item) => {
              const p = interpolate(now, [item.delay - 1.5, item.delay], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              const curVal = Math.round(item.val * p);
              return (
                <div
                  key={item.label}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 18,
                    backgroundColor: item.st.bg,
                    border: `1.5px solid ${item.st.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <div style={{fontSize: 16, fontWeight: 700, color: item.st.fg}}>
                    {item.label}
                  </div>
                  <div style={{fontFamily: mono, fontSize: 40, fontWeight: 800, color: item.st.fg, lineHeight: 1.1}}>
                    {curVal}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </StageWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 3 — FULL EXCEL & FREEZE COLUMN (Dark Canopy)
═══════════════════════════════════════════════════════════════════════════════ */
export const ShowcaseExcelScene: React.FC = () => {
  return (
    <StageWrap mode="dark" step="03 / MODE FULL EXCEL" route="/xiiclass/rekap">
      <div style={{marginTop: 8}}>
        <WordReveal
          style={{fontSize: 62, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em'}}
          words={[
            {t: 'Satu', at: 0.2},
            {t: 'Klik', at: 0.45},
            {t: 'ke', at: 0.65},
            {t: 'Tampilan', at: 0.85},
            {t: 'Full', at: 1.15, accent: true},
            {t: 'Excel.', at: 1.4, accent: true},
          ]}
        />
        <Reveal at={1.5} y={14} blur={6}>
          <div style={{fontSize: 24, fontWeight: 500, color: 'rgba(241,245,242,0.8)', marginTop: 12, lineHeight: 1.4}}>
            Tabel spreadsheet layar penuh dengan <span style={{color: T.lime, fontWeight: 700}}>Freeze Column</span> — nama siswa tetap terkunci rapi saat digeser.
          </div>
        </Reveal>
      </div>

      {/* Real Video Synced at 32s (Rekap Table -> Clicking Tampilan Full Excel -> Spreadsheet View) */}
      <Reveal at={0.9} y={32} blur={8} style={{position: 'relative'}}>
        <BrowserPreview
          width={976}
          startFrom={32 * 30}
          url="rhmt.biz.id/xiiclass/rekap"
          badge="XLSX FULLSCREEN"
          dark
          shineAt={3.7}
        />

        {/* Animated Cursor Ripple Highlighting Full Excel */}
        <div style={{position: 'absolute', left: '66%', top: '18%'}}>
          <Tap at={3.5} from={{x: -110, y: 120}} />
        </div>
      </Reveal>

      {/* Bottom Feature Cards */}
      <Reveal at={2.5} y={24} blur={6}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16}}>
          {[
            {tag: 'FREEZE PANE', title: 'Kolom Paten Terkunci', desc: 'No, NIS & Nama tetap diam saat scroll horizontal.'},
            {tag: 'FILTER CEPAT', title: 'Cari Nama / Absen', desc: 'Filter instan per kelas X, XI, atau XII.'},
            {tag: 'ZERO SCROLL LAG', title: 'Rapi di Layar Besar', desc: 'Rekap bulanan seluruh siswa terbaca sekali pandang.'},
          ].map((c) => (
            <div
              key={c.tag}
              style={{
                padding: '20px 20px',
                borderRadius: 20,
                backgroundColor: 'rgba(10, 61, 38, 0.78)',
                border: '1.5px solid rgba(163, 230, 53, 0.34)',
              }}
            >
              <div style={{fontFamily: mono, fontSize: 12, fontWeight: 800, color: T.lime, letterSpacing: '0.08em'}}>
                {c.tag}
              </div>
              <div style={{fontSize: 23, fontWeight: 800, color: '#FFFFFF', marginTop: 6}}>
                {c.title}
              </div>
              <div style={{fontSize: 16, color: 'rgba(241,245,242,0.74)', marginTop: 6, lineHeight: 1.35}}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </StageWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 4 — PANEL ADMIN, EKSPOR XLSX & CETAK A4 (Crisp Light)
═══════════════════════════════════════════════════════════════════════════════ */
export const ShowcaseExportScene: React.FC = () => {
  const cards = [
    {
      at: 1.6,
      icon: <IconLockVec size={30} color={T.canopy} />,
      tag: 'KEAMANAN DATA',
      title: 'Panel Admin Terkunci',
      desc: 'Siswa & guru bebas memantau rekap, tapi perubahan data hanya bisa lewat login Admin.',
    },
    {
      at: 3.4,
      icon: <IconSheetVec size={30} color={T.canopy} />,
      tag: 'BACKUP SPREADSHEET',
      title: 'Ekspor & Impor .XLSX',
      desc: 'Unduh file Excel asli siap arsip atau impor ulang spreadsheet kapan saja.',
    },
    {
      at: 5.2,
      icon: <IconPrintVec size={30} color={T.canopy} />,
      tag: 'SIAP CETAK',
      title: 'Cetak A4 Kop Surat',
      desc: 'Format laporan A4 Landscape resmi standar madrasah langsung siap print.',
    },
  ];

  return (
    <StageWrap mode="light" step="04 / ADMIN, EKSPOR & CETAK" route="/xiiclass/kelola">
      <div style={{marginTop: 8}}>
        <WordReveal
          accentColor={T.canopy}
          style={{fontSize: 58, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em', color: T.ink}}
          words={[
            {t: 'Terkunci', at: 0.25},
            {t: 'Aman,', at: 0.55},
            {t: 'Siap', at: 0.85, accent: true},
            {t: 'Ekspor', at: 1.1, accent: true},
            {t: '&', at: 1.35},
            {t: 'Cetak', at: 1.55, accent: true},
            {t: 'A4', at: 1.8, accent: true},
          ]}
        />
      </div>

      {/* Split Layout: Mobile Preview (Full Excel & Download .xlsx) + 3 Stacked Feature Cards */}
      <div style={{display: 'flex', alignItems: 'center', gap: 32, marginTop: 12}}>
        <Reveal at={0.9} y={36} blur={8} style={{flexShrink: 0}}>
          <MobilePreview width={365} startFrom={18 * 30} dark={false} shineAt={5.6} />
        </Reveal>

        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 22}}>
          {cards.map((item) => (
            <Reveal key={item.tag} at={item.at} y={24} blur={6}>
              <div
                style={{
                  position: 'relative',
                  padding: '24px 26px',
                  borderRadius: 24,
                  backgroundColor: T.surface,
                  border: `1.5px solid ${T.borderStrong}`,
                  boxShadow: T.shadowCard,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      backgroundColor: T.surfaceMint,
                      border: `1.5px solid ${T.borderStrong}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{fontFamily: mono, fontSize: 13, fontWeight: 800, color: T.canopyMid, letterSpacing: '0.07em'}}>
                      {item.tag}
                    </div>
                    <div style={{fontSize: 27, fontWeight: 800, color: T.ink, marginTop: 2}}>
                      {item.title}
                    </div>
                  </div>
                </div>
                <div style={{fontSize: 19, color: T.inkMuted, marginTop: 12, lineHeight: 1.45}}>
                  {item.desc}
                </div>
                <Shine at={item.at + 0.4} radius={24} alpha={0.45} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom Seal Strip */}
      <Reveal at={6.2} y={20} blur={5}>
        <div
          style={{
            padding: '18px 26px',
            borderRadius: 20,
            backgroundColor: T.canopy,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{fontSize: 22, fontWeight: 800, color: '#FFFFFF'}}>
            Transparansi Publik · Kontrol Penuh di Admin
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              backgroundColor: T.lime,
              color: T.canopyDeep,
              fontFamily: mono,
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            READY TO PRINT
          </div>
        </div>
      </Reveal>
    </StageWrap>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SCENE 5 — OUTRO & PERSONAL BRANDING RHMT OFC (Dark Canopy)
═══════════════════════════════════════════════════════════════════════════════ */
export const ShowcaseBrandScene: React.FC = () => {
  return (
    <StageWrap mode="dark" step="05 / DEVELOPER & PORTOFOLIO" route="rhmt.biz.id">
      <div style={{marginTop: 10, textAlign: 'center'}}>
        <Reveal at={0.2} y={18} blur={6}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 14}}>
            <IconERekapBrand size={62} />
            <div style={{textAlign: 'left'}}>
              <div style={{fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1}}>
                E-Rekap
              </div>
              <div style={{fontFamily: mono, fontSize: 15, fontWeight: 700, color: T.lime, marginTop: 4}}>
                MA NU ISLAMIYAH ASEMBAGUS
              </div>
            </div>
          </div>
        </Reveal>

        <WordReveal
          style={{fontSize: 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: 28}}
          words={[
            {t: 'Rapi,', at: 0.6},
            {t: 'Cepat,', at: 0.9},
            {t: 'Instan', at: 1.2, accent: true},
            {t: 'di', at: 1.45},
            {t: 'Semua', at: 1.65},
            {t: 'Layar.', at: 1.9, accent: true},
          ]}
        />
      </div>

      {/* Live Side-by-Side Finale Preview */}
      <Reveal at={1.2} y={32} blur={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, position: 'relative'}}>
        <BrowserPreview width={660} startFrom={6 * 30} url="rhmt.biz.id/xiiclass" badge="DESKTOP" dark />
        <MobilePreview width={235} startFrom={1 * 30} dark />
      </Reveal>

      {/* Official Personal Branding Card (Rule 8: rhmt ofc) */}
      <Reveal at={3.4} y={24} blur={6} style={{position: 'relative'}}>
        <div
          style={{
            position: 'relative',
            padding: '28px 32px',
            borderRadius: 26,
            background: `linear-gradient(135deg, ${T.canopy} 0%, #052014 100%)`,
            border: '2px solid rgba(163, 230, 53, 0.55)',
            boxShadow: '0 24px 56px -12px rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <div>
            <div style={{fontFamily: mono, fontSize: 14, fontWeight: 800, color: T.lime, letterSpacing: '0.1em'}}>
              DEVELOPED BY RAHMAT
            </div>
            <div style={{fontSize: 40, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginTop: 4}}>
              rhmt ofc
            </div>
          </div>

          <div
            style={{
              padding: '14px 26px',
              borderRadius: 999,
              backgroundColor: T.lime,
              color: T.canopyDeep,
              fontFamily: mono,
              fontSize: 24,
              fontWeight: 800,
              boxShadow: '0 8px 24px rgba(163, 230, 53, 0.4)',
            }}
          >
            rhmt.biz.id
          </div>

          <Shine at={4.0} radius={26} alpha={0.45} />
          <Sparks at={6.4} count={20} radius={220} />
        </div>
      </Reveal>
    </StageWrap>
  );
};
