import React from 'react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import {IconArrowUpRight, IconDatabase, IconExcel, IconPrinter, IconSearch, IconShield, IconSliders} from '../scenes/ERekapScenes';
import {clamp, Reveal, Shine, Sparks, Tap, useProg, WordReveal} from './fx';
import {bump, Ctx, IconLock, mono, sans, Shell, T} from './common';
import {StudioBrowser} from './StudioFrames';

/* ═════════════ SCENE 3 — REKAP & ADMIN (AUTHENTIC PRODUCT SHOWCASE) ═════════════ */
const QUERY = 'Ahmad';

export const PremiumAdminScene: React.FC = () => {
  const {now, prog, spr, frame} = useProg();
  const typed = now < 2.4 ? 0 : clamp(Math.floor((now - 2.4) / 0.14) + 1, 0, QUERY.length);
  const found = typed >= 2 ? 2 : 4;
  const pwLen = now < 7.5 ? 0 : clamp(Math.floor((now - 7.5) / 0.14) + 1, 0, 6);
  const unlocked = now >= 9.5;
  const adminMix = unlocked ? 1 : 0;
  const dbPulse = bump(now, 12.25, 0.7);
  const toast = prog(11.15, 0.4);
  const toastOut = prog(12.4, 0.4);

  // Transition between Public Rekap Ledger and Authenticated Admin Panel
  const showAdmin = now >= 4.5;
  const flip = prog(4.5, 0.5, Easing.inOut(Easing.cubic));

  return (
    <Shell
      mode="light"
      from="dashboard"
      moves={[{t: 0.35, tab: 'rekap'}, {t: 4.5, tab: 'admin'}]}
      accessLabel="Mode Review"
      adminLabel="Mode Admin Aktif"
      adminMix={adminMix}
    >
      <Ctx
        step="02 / Pencarian & Proteksi"
        title="Cari Cepat & Edit Aman Admin"
        route={showAdmin ? '/admin' : '/rekap'}
        mode="light"
      />

      {/* Main Studio Viewport: Switching from Authentic Rekap to Authentic Admin Panel */}
      <Reveal at={0.5} y={34} blur={8}>
        <div style={{position: 'relative'}}>
          {!showAdmin ? (
            /* Phase 1: Authentic Student Attendance Ledger (/rekap) */
            <StudioBrowser
              src="assets/erekap/real_desktop_rekap.png"
              url="localhost:3005/xiiclass/rekap"
              badge="Tabel Rekap • Terverifikasi"
              height={580}
              zoom={1.12}
              panY={-30}
            >
              {/* Live Interactive Search Box Overlay matching the Voiceover */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 20,
                  right: 20,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: 18,
                  padding: '12px 18px',
                  border: `2px solid ${typed > 0 ? T.canopy : T.borderStrong}`,
                  boxShadow: '0 14px 34px rgba(7,41,25,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(8px)',
                  zIndex: 25,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <IconSearch size={22} color={T.canopy} />
                  <span style={{fontSize: 18, fontWeight: 700, color: typed ? T.ink : T.inkMuted}}>
                    {typed ? QUERY.slice(0, typed) : 'Ketik nama siswa atau No. Absen...'}
                    <span
                      style={{
                        display: 'inline-block',
                        width: 3,
                        height: 20,
                        backgroundColor: T.canopy,
                        marginLeft: 4,
                        verticalAlign: 'middle',
                        opacity: frame % 24 < 12 ? 1 : 0,
                      }}
                    />
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 14,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 999,
                    backgroundColor: T.surfaceMint,
                    color: T.canopy,
                    border: `1px solid ${T.borderStrong}`,
                  }}
                >
                  {found} Data Ditemukan
                </span>
              </div>
            </StudioBrowser>
          ) : (
            /* Phase 2: Authentic Authenticated Admin Workbench (/admin) */
            <StudioBrowser
              src="assets/erekap/real_admin_panel.png"
              url="localhost:3005/xiiclass/admin"
              badge={unlocked ? 'Admin Terotentikasi' : 'Otorisasi Pengelola'}
              height={580}
              zoom={1.14}
              panY={-45}
            >
              {/* Authenticated Admin Pill Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 20,
                  backgroundColor: unlocked ? '#052E16' : '#1E293B',
                  color: '#FFFFFF',
                  borderRadius: 16,
                  padding: '10px 18px',
                  border: `1.5px solid ${unlocked ? T.lime : '#475569'}`,
                  boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  zIndex: 25,
                }}
              >
                <div style={{width: 10, height: 10, borderRadius: 5, backgroundColor: unlocked ? T.lime : '#94A3B8', boxShadow: unlocked ? `0 0 12px ${T.lime}` : 'none'}} />
                <div>
                  <div style={{fontSize: 11, fontWeight: 700, color: unlocked ? '#D9F99D' : '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.06em'}}>
                    {unlocked ? 'AKSES PENGELOLA AKTIF' : 'LOGIN DIPERLUKAN'}
                  </div>
                  <div style={{fontFamily: mono, fontSize: 16, fontWeight: 800}}>Administrator Rekap</div>
                </div>
                {unlocked && <Sparks at={9.55} radius={60} count={8} color={T.lime} />}
              </div>
            </StudioBrowser>
          )}
        </div>
      </Reveal>

      {/* Admin Protection & SQLite Persistence Card */}
      <Reveal at={4.5} y={40} blur={10}>
        <div
          style={{
            position: 'relative',
            borderRadius: 26,
            background: `linear-gradient(135deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`,
            padding: '22px 26px',
            color: '#FFFFFF',
            border: '1px solid rgba(163,230,53,0.25)',
            boxShadow: T.shadowSheet,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <Shine at={9.5} dur={1.0} radius={26} alpha={0.3} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: unlocked ? 'rgba(163,230,53,0.22)' : 'rgba(255,255,255,0.12)',
                  border: `1px solid ${unlocked ? T.lime : 'rgba(255,255,255,0.22)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconShield size={24} color={unlocked ? T.lime : '#D1FAE5'} />
              </div>
              <div>
                <div style={{fontSize: 13, fontWeight: 800, color: '#D9F99D', letterSpacing: '0.08em', textTransform: 'uppercase'}}>Proteksi & Keamanan</div>
                <div style={{fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 1}}>HMAC-Signed Session Cookie</div>
              </div>
            </div>
            <div
              style={{
                fontFamily: mono,
                fontSize: 14,
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: unlocked ? T.lime : 'rgba(255,255,255,0.14)',
                color: unlocked ? T.limeInk : '#FFFFFF',
              }}
            >
              {unlocked ? 'TEROTORISASI' : 'TERKUNCI'}
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
            {/* Database Persistence */}
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.25)',
                border: `1px solid ${dbPulse > 0.3 ? T.lime : 'rgba(255,255,255,0.14)'}`,
                borderRadius: 18,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transform: `scale(${1 + dbPulse * 0.04})`,
              }}
            >
              <div style={{width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(163,230,53,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconDatabase size={20} color={T.lime} />
              </div>
              <div>
                <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#D1FAE5'}}>DATABASE PERSISTEN</div>
                <div style={{fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 2}}>Turso Cloud & SQLite</div>
              </div>
            </div>

            {/* Quick Action */}
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 18,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(163,230,53,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconSliders size={20} color={T.lime} />
              </div>
              <div>
                <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#D1FAE5'}}>AKSI PENGELOLA</div>
                <div style={{fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginTop: 2}}>Edit Presensi Inline</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Success Notification Pill */}
      {toast > 0 && toastOut < 1 && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 52,
            right: 52,
            backgroundColor: '#052E16',
            color: '#FFFFFF',
            border: `2px solid ${T.lime}`,
            borderRadius: 20,
            padding: '16px 22px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 60,
            opacity: toast * (1 - toastOut),
            transform: `translateY(${(1 - toast) * -20}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 32, height: 32, borderRadius: 16, backgroundColor: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.limeInk, fontWeight: 900}}>✓</div>
            <div>
              <div style={{fontSize: 18, fontWeight: 800}}>Perubahan Presensi Tersimpan</div>
              <div style={{fontSize: 14, color: '#D1FAE5', marginTop: 2}}>Tersimpan persisten ke database lokal & cloud</div>
            </div>
          </div>
          <Sparks at={11.15} radius={90} count={12} color={T.lime} />
        </div>
      )}
    </Shell>
  );
};

/* ═════════════ SCENE 4 — EKSPOR & CETAK (AUTHENTIC PRODUCT SHOWCASE) ═════════════ */
export const PremiumExportScene: React.FC = () => {
  const {now, prog, spr} = useProg();
  const exp = prog(3.55, 0.8, Easing.inOut(Easing.cubic));
  const chip = prog(4.5, 0.45);
  const chipOut = prog(7.2, 0.4);
  const printP = interpolate(now, [6.6, 8.0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const kop = bump(now, 8.8, 0.9);
  const stampS = spr(9.5, 230, 11);
  const shake = now > 9.5 && now < 9.85 ? Math.sin((now - 9.5) * 110) * 6 * (1 - (now - 9.5) / 0.35) : 0;
  const pct = printP * 100;

  return (
    <Shell mode="light" from="admin" moves={[{t: 0.35, tab: 'rekap'}]} accessLabel="Siap Ekspor & Cetak">
      <Ctx step="03 / Arsip & Laporan Resmi" title="Ekspor Excel & Cetak A4 Landscape" route="/rekap" mode="light" />

      {/* Studio Action Bar with Real Interactive Export Buttons */}
      <Reveal at={0.5} y={34} blur={8} style={{position: 'relative', zIndex: 30}}>
        <div style={{position: 'relative'}}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
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
            <Shine at={1.4} dur={1.0} radius={26} alpha={0.22} />
            <div>
              <div style={{fontSize: 14, fontWeight: 800, color: '#D9F99D', letterSpacing: '0.08em', textTransform: 'uppercase'}}>Data Resmi Terverifikasi</div>
              <div style={{fontSize: 26, fontWeight: 800, marginTop: 2}}>Rekapitulasi Kehadiran</div>
            </div>
            <div style={{display: 'flex', gap: 10}}>
              <div style={{position: 'relative'}}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 18px',
                    borderRadius: 999,
                    backgroundColor: now >= 3.5 && now < 4.6 ? 'rgba(163,230,53,0.28)' : 'rgba(255,255,255,0.14)',
                    border: `1px solid ${now >= 3.5 && now < 4.6 ? T.lime : 'rgba(255,255,255,0.25)'}`,
                    fontSize: 17,
                    fontWeight: 700,
                    transform: `scale(${1 - bump(now, 3.5, 0.3) * 0.07})`,
                  }}
                >
                  <IconExcel size={19} color={T.lime} />
                  <span>Ekspor .xlsx</span>
                </div>
                <Tap at={3.5} from={{x: 110, y: 110}} approach={0.8} />
              </div>
              <div style={{position: 'relative'}}>
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
                    boxShadow: `0 8px ${20 + bump(now, 6.5, 0.5) * 20}px rgba(163,230,53,0.45)`,
                    transform: `scale(${1 - bump(now, 6.5, 0.3) * 0.07})`,
                  }}
                >
                  <IconPrinter size={19} color={T.limeInk} />
                  <span>Cetak A4</span>
                </div>
                <Tap at={6.5} from={{x: -120, y: 120}} approach={0.8} ripple="#FFFFFF" />
              </div>
            </div>
            <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${exp * 100}%`, background: T.lime, boxShadow: '0 0 14px rgba(163,230,53,0.9)', opacity: now > 4.4 ? 0 : 1}} />
          </div>

          {/* Downloaded XLSX Chip */}
          {chip > 0 && chipOut < 1 && (
            <div
              style={{
                position: 'absolute',
                right: 6,
                top: '100%',
                marginTop: 12,
                zIndex: 50,
                opacity: chip * (1 - chipOut),
                transform: `translateY(${(1 - chip) * -20}px) scale(${0.9 + 0.1 * spr(4.5, 200, 13)})`,
                backgroundColor: '#FFFFFF',
                border: `1px solid ${T.borderStrong}`,
                boxShadow: T.shadowSheet,
                borderRadius: 18,
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{width: 42, height: 42, borderRadius: 12, backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconExcel size={22} color="#14532D" />
              </div>
              <div>
                <div style={{fontFamily: mono, fontSize: 16, fontWeight: 800, color: T.ink}}>rekap-kehadiran.xlsx</div>
                <div style={{fontSize: 13, fontWeight: 600, color: T.inkMuted}}>18 siswa • 3 kelas • siap arsip</div>
              </div>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 12 10 18 20 6" />
              </svg>
              <Sparks at={4.5} radius={90} count={10} />
            </div>
          )}
        </div>
      </Reveal>

      {/* Printable A4 Report Showcase with Authentic Letterhead */}
      <Reveal at={1.0} y={30} blur={8}>
        <div
          style={{
            position: 'relative',
            background: `linear-gradient(to bottom, #FFFFFF ${pct}%, #F1F5F9 ${pct}%)`,
            borderRadius: 26,
            padding: '24px 28px',
            border: `2px ${printP >= 1 ? 'solid' : 'dashed'} ${printP >= 1 ? '#CBD5E1' : '#94A3B8'}`,
            boxShadow: '0 24px 52px -12px rgba(15,23,42,0.16)',
            color: '#0F172A',
            transform: `translateX(${shake}px)`,
          }}
        >
          {printP > 0 && printP < 1 && (
            <div style={{position: 'absolute', left: -6, right: -6, top: `${pct}%`, height: 6, borderRadius: 6, background: T.lime, boxShadow: '0 0 26px 6px rgba(163,230,53,0.75)', zIndex: 10}} />
          )}
          <Shine at={8.8} dur={0.9} radius={26} alpha={0.5} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
            <span style={{fontFamily: mono, fontSize: 14, fontWeight: 800, padding: '5px 12px', borderRadius: 8, backgroundColor: T.surfaceMint, color: T.canopy, border: `1px solid ${T.borderStrong}`}}>FORMAT CETAK: A4 LANDSCAPE</span>
            <span style={{fontFamily: mono, fontSize: 14, fontWeight: 700, color: T.inkMuted}}>{now >= 7.0 ? '297 × 210 mm • Landscape' : '@media print Standard'}</span>
          </div>

          {/* Authentic Letterhead */}
          <div style={{textAlign: 'center', borderBottom: '3px solid #0F172A', paddingBottom: 12, marginBottom: 14, position: 'relative'}}>
            <div style={{fontSize: 21, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', backgroundImage: 'linear-gradient(rgba(163,230,53,0.65), rgba(163,230,53,0.65))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: `${kop * 100}% 42%`, display: 'inline-block'}}>MA NU ISLAMIYAH ASEMBAGUS</div>
            <div style={{fontSize: 14, fontWeight: 600, color: '#334155', marginTop: 2}}>NPSN: 20584645 • Jl. Raya No. 170 Asembagus, Kab. Situbondo</div>
            <div style={{fontSize: 15, fontWeight: 800, textTransform: 'uppercase', marginTop: 8, color: T.canopy}}>REKAPITULASI KEHADIRAN SISWA — NOVEMBER 2026</div>
          </div>

          {/* Ledger Table Excerpt */}
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: mono, marginBottom: 16}}>
            <thead>
              <tr style={{backgroundColor: '#F8FAFC', borderBottom: '2px solid #0F172A', textAlign: 'left'}}>
                <th style={{padding: '6px 8px'}}>NO</th>
                <th style={{padding: '6px 8px'}}>NAMA SISWA</th>
                <th style={{padding: '6px 8px'}}>KELAS</th>
                <th style={{padding: '6px 8px'}}>H</th>
                <th style={{padding: '6px 8px'}}>S</th>
                <th style={{padding: '6px 8px'}}>I</th>
                <th style={{padding: '6px 8px'}}>A</th>
                <th style={{padding: '6px 8px'}}>%</th>
              </tr>
            </thead>
            <tbody>
              {[
                {no: '01', n: 'Ahmad Rifqi Maulana', c: 'X IPA 1', h: 20, s: 1, i: 0, a: 0, p: '95.2%'},
                {no: '02', n: 'Aisyah Nur Hidayah', c: 'X IPA 1', h: 21, s: 0, i: 0, a: 0, p: '100%'},
                {no: '03', n: 'Bagus Pratama Putra', c: 'X IPA 1', h: 19, s: 1, i: 1, a: 0, p: '90.5%'},
              ].map((row) => (
                <tr key={row.no} style={{borderBottom: '1px solid #E2E8F0'}}>
                  <td style={{padding: '6px 8px'}}>{row.no}</td>
                  <td style={{padding: '6px 8px', fontWeight: 700}}>{row.n}</td>
                  <td style={{padding: '6px 8px'}}>{row.c}</td>
                  <td style={{padding: '6px 8px', color: '#15803D', fontWeight: 800}}>{row.h}</td>
                  <td style={{padding: '6px 8px'}}>{row.s}</td>
                  <td style={{padding: '6px 8px'}}>{row.i}</td>
                  <td style={{padding: '6px 8px'}}>{row.a}</td>
                  <td style={{padding: '6px 8px', fontWeight: 800}}>{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Official Signature Section */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14}}>
            <div style={{fontSize: 13, color: '#64748B'}}>
              <div>Mengetahui,</div>
              <div style={{fontWeight: 800, color: '#0F172A', marginTop: 36}}>Abdul Holik, S.Ag.</div>
              <div>Kepala Madrasah</div>
            </div>
            {stampS > 0.05 && (
              <div
                style={{
                  padding: '7px 18px',
                  border: '3px solid #DC2626',
                  borderRadius: 10,
                  color: '#DC2626',
                  fontFamily: mono,
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  transform: `scale(${clamp(stampS)}) rotate(-7deg)`,
                  boxShadow: '0 0 18px rgba(220,38,38,0.3)',
                }}
              >
                SAH • TERVERIFIKASI
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Shell>
  );
};

/* ═════════════ SCENE 5 — OUTRO & BRANDING (RHMT OFC) ═════════════ */
export const PremiumBrandScene: React.FC = () => {
  const {now, prog} = useProg();
  const hl = prog(3.4, 0.45);
  const angle = (now * 50) % 360;
  const ctaGlow = bump(now, 9.6, 0.5);

  return (
    <Shell mode="dark" from="info" accessLabel="E-Rekap by R_HMT OFC">
      <div style={{textAlign: 'center', padding: '0 8px'}}>
        <Reveal at={0.6} y={16} blur={4}>
          <div style={{fontSize: 17, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 12}}>
            <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{width: 34, height: 34, borderRadius: 9, objectFit: 'contain'}} />
            E-REKAP • VERSI 1.0.0
          </div>
        </Reveal>
        <WordReveal
          style={{fontSize: 50, fontWeight: 800, lineHeight: 1.13, letterSpacing: '-0.025em'}}
          words={[
            {t: 'Solusi', at: 1.7},
            {t: 'Absensi', at: 2.3},
            {t: 'Modern', at: 2.9},
            {t: 'Berstandar', at: 3.4, accent: true},
            {t: 'Sekolah', at: 4.7, accent: true},
          ]}
        />
      </div>

      <Reveal at={5.65} y={60} blur={12}>
        <div style={{position: 'relative', backgroundColor: T.surface, color: T.ink, borderRadius: 32, padding: '32px', border: `1px solid ${T.border}`, boxShadow: '0 28px 60px -14px rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', gap: 22}}>
          <Shine at={7.0} dur={1.1} radius={32} alpha={0.6} />
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <div style={{width: 114, height: 114, borderRadius: 26, padding: 4, background: `conic-gradient(from ${angle}deg, ${T.lime}, ${T.canopyMid}, ${T.canopyDeep}, ${T.lime})`, boxShadow: '0 14px 30px rgba(7,41,25,0.3)', flexShrink: 0}}>
              <Img src={staticFile('assets/erekap/pp-dev.webp')} style={{width: '100%', height: '100%', borderRadius: 22, objectFit: 'cover'}} />
            </div>
            <div style={{flex: 1}}>
              <span style={{display: 'inline-block', padding: '6px 14px', borderRadius: 999, backgroundColor: T.surfaceMint, color: T.canopy, fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase'}}>Pelajar MA • Web & Agentic Dev</span>
              <div style={{fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 8}}>
                Rohmatulloh{' '}
                <span style={{color: T.canopy, backgroundImage: 'linear-gradient(rgba(163,230,53,0.6), rgba(163,230,53,0.6))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 90%', backgroundSize: `${hl * 100}% 40%`}}>(R_HMT OFC)</span>
              </div>
              <div style={{fontSize: 18, fontWeight: 600, color: T.inkMuted, marginTop: 4}}>Personal Branding: <strong style={{color: T.ink}}>rhmt ofc</strong> • Indonesia</div>
            </div>
          </div>
          <div style={{borderTop: `1px solid ${T.borderStrong}`, paddingTop: 18, fontSize: 20, lineHeight: 1.5, color: T.inkMuted}}>
            Dibangun dengan arsitektur <strong style={{color: T.ink}}>Next.js + SQLite WAL</strong> untuk menghadirkan aplikasi rekapitulasi kehadiran yang cepat, rapi, dan siap cetak.
          </div>
          <Reveal at={8.4} y={16} blur={4}>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
              <div style={{position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 999, backgroundColor: T.lime, color: T.limeInk, fontSize: 19, fontWeight: 800, boxShadow: `0 8px ${20 + ctaGlow * 18}px -4px rgba(163,230,53,${0.45 + ctaGlow * 0.25})`, transform: `scale(${1 - bump(now, 9.6, 0.3) * 0.07})`}}>
                <span>rhmt.biz.id</span>
                <IconArrowUpRight size={18} color={T.limeInk} />
                <Shine at={9.0} dur={0.8} radius={999} alpha={0.7} />
                <Tap at={9.6} from={{x: 130, y: 130}} approach={0.9} ripple={T.canopy} />
                <Sparks at={9.65} radius={130} count={18} />
              </div>
              <div style={{display: 'inline-flex', alignItems: 'center', padding: '13px 20px', borderRadius: 999, backgroundColor: '#0B1410', color: '#FFFFFF', fontSize: 18, fontWeight: 700}}>github.com/rhmt-ofc</div>
              <div style={{display: 'inline-flex', alignItems: 'center', padding: '13px 20px', borderRadius: 999, backgroundColor: T.surfaceMint, color: T.canopy, fontSize: 18, fontWeight: 700}}>@rhmtofc</div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
        {[{k: 'STACK', v: 'Next.js + SQLite'}, {k: 'AKSES', v: 'Review & Admin'}, {k: 'OUTPUT', v: 'XLSX & Cetak A4'}].map((item, i) => (
          <Reveal key={item.k} at={6.2 + i * 0.2} y={26} blur={6}>
            <div style={{backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(163,230,53,0.22)', borderRadius: 20, padding: '16px 18px', textAlign: 'center'}}>
              <div style={{fontFamily: mono, fontSize: 13, fontWeight: 700, color: T.lime}}>{item.k}</div>
              <div style={{fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>{item.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
};
