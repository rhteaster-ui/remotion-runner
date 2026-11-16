import React from 'react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import {IconArrowUpRight, IconDatabase, IconExcel, IconPrinter, IconSearch, IconShield, IconSliders} from '../scenes/ERekapScenes';
import {clamp, Reveal, Shine, Sparks, Tap, useProg, WordReveal} from './fx';
import {bump, Ctx, IconLock, mono, sans, Shell, T} from './common';

/* ═════════════ SCENE 3 — REKAP & ADMIN ═════════════ */
const ROWS = [
  {no: '01', name: 'Ahmad Fauzi', cls: 'XII IPS 1', h: 22, s: 0, i: 0, pct: '100%', status: 'hadir' as const, match: true},
  {no: '02', name: 'Ahmad Hidayat', cls: 'XI IPA 1', h: 20, s: 1, i: 1, pct: '91%', status: 'izin' as const, match: true},
  {no: '03', name: 'Siti Aminah', cls: 'X IPA 1', h: 21, s: 1, i: 0, pct: '95%', status: 'sakit' as const, match: false},
  {no: '04', name: 'M. Rizky Pratama', cls: 'XII IPS 1', h: 21, s: 0, i: 1, pct: '95%', status: 'hadir' as const, match: false},
];
const QUERY = 'Ahmad';

export const PremiumAdminScene: React.FC = () => {
  const {now, prog, spr, frame} = useProg();
  const typed = now < 2.4 ? 0 : clamp(Math.floor((now - 2.4) / 0.14) + 1, 0, QUERY.length);
  const col = prog(2.85, 0.45, Easing.inOut(Easing.cubic));
  const found = typed >= 2 ? 2 : 4;
  const pwLen = now < 7.5 ? 0 : clamp(Math.floor((now - 7.5) / 0.14) + 1, 0, 6);
  const unlocked = now >= 9.5;
  const flip = prog(9.5, 0.45);
  const adminMix = unlocked ? 1 : 0;
  const dbPulse = bump(now, 12.25, 0.7);
  const write = now >= 10.5 && now < 11.4;
  const toast = prog(11.15, 0.4);
  const toastOut = prog(12.4, 0.4);

  return (
    <Shell mode="light" from="dashboard" moves={[{t: 0.35, tab: 'rekap'}, {t: 4.5, tab: 'admin'}]} accessLabel="Mode Review" adminLabel="Mode Admin Aktif" adminMix={adminMix}>
      <Ctx step="02 / Pencarian & Proteksi" title="Cari Cepat & Edit Aman Admin" route="/rekap • /admin" mode="light" />

      <Reveal at={0.5} y={34} blur={8}>
        <div style={{backgroundColor: T.surface, borderRadius: 28, padding: '24px 26px', border: `1px solid ${T.border}`, boxShadow: T.shadowSheet}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
            <div style={{fontSize: 21, fontWeight: 800, color: T.ink}}>Pencarian Siswa & No. Absen</div>
            <span style={{fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '5px 13px', borderRadius: 999, backgroundColor: T.surfaceMint, color: T.canopy, transform: `scale(${1 + bump(now, 2.85, 0.35) * 0.15})`}}>{found} Ditemukan</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, backgroundColor: T.bg, borderRadius: 18, padding: '14px 18px', border: `1.5px solid ${typed > 0 ? T.canopy : T.borderStrong}`, boxShadow: typed > 0 ? '0 0 0 5px rgba(10,61,38,0.08)' : 'none', marginBottom: 16}}>
            <IconSearch size={22} color={T.inkMuted} />
            <span style={{fontSize: 20, fontWeight: 600, color: typed ? T.ink : T.inkMuted}}>
              {typed ? QUERY.slice(0, typed) : 'Cari nama siswa atau No. Absen...'}
              <span style={{display: 'inline-block', width: 3, height: 22, backgroundColor: T.canopy, marginLeft: 3, verticalAlign: 'middle', opacity: frame % 24 < 12 ? 1 : 0}} />
            </span>
          </div>
          <div>
            {ROWS.map((row, idx) => {
              const st = T.status[row.status];
              const rowIn = prog(1.0 + idx * 0.12, 0.5);
              const collapse = row.match ? 0 : col;
              const k = row.match ? typed : 0;
              return (
                <div key={row.no} style={{height: 74 * (1 - collapse), overflow: 'hidden', opacity: (1 - collapse) * clamp(rowIn * 1.5), transform: `translateX(${(1 - rowIn) * 40 + collapse * 80}px)`}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderRadius: 16, backgroundColor: row.match && typed >= 2 ? T.surfaceMint : T.surfaceRaised, border: `1px solid ${row.match && typed >= 2 ? T.canopyMid : T.borderStrong}`, height: 64}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                      <span style={{fontFamily: mono, fontSize: 18, fontWeight: 800, width: 44, height: 44, borderRadius: 12, backgroundColor: T.surfaceMint, color: T.canopy, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{row.no}</span>
                      <div>
                        <div style={{fontSize: 20, fontWeight: 800, color: T.ink}}>
                          {k > 0 ? <span style={{backgroundColor: 'rgba(163,230,53,0.55)', borderRadius: 5}}>{row.name.slice(0, k)}</span> : null}
                          {row.name.slice(k)}
                        </div>
                        <div style={{fontSize: 15, fontWeight: 600, color: T.inkMuted}}>{row.cls}</div>
                      </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                      <span style={{fontFamily: mono, fontSize: 15, fontWeight: 700, color: T.inkMuted}}>H:{row.h} S:{row.s} I:{row.i}</span>
                      <span style={{fontFamily: mono, fontSize: 16, fontWeight: 800, padding: '5px 13px', borderRadius: 999, backgroundColor: st.bg, color: st.fg, border: `1px solid ${st.border}`}}>{row.pct}</span>
                    </div>
                  </div>
                  <div style={{height: 10}} />
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal at={4.5} y={50} blur={12}>
        <div style={{position: 'relative', borderRadius: 28, background: `linear-gradient(135deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`, padding: '26px 28px', color: '#FFFFFF', border: '1px solid rgba(163,230,53,0.25)', boxShadow: T.shadowSheet, display: 'flex', flexDirection: 'column', gap: 16}}>
          <Shine at={9.55} dur={1.0} radius={28} alpha={0.3} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{width: 52, height: 52, borderRadius: 16, backgroundColor: unlocked ? T.lime : 'rgba(255,255,255,0.1)', border: `1px solid ${unlocked ? T.lime : 'rgba(255,255,255,0.22)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + bump(now, 9.5, 0.5) * 0.25})`, boxShadow: unlocked ? '0 0 30px rgba(163,230,53,0.6)' : 'none'}}>
                {unlocked ? <IconShield size={28} color={T.canopyDeep} /> : <IconLock size={28} color="#FFFFFF" />}
              </div>
              <div>
                <div style={{fontSize: 23, fontWeight: 800}}>Panel Admin Terproteksi</div>
                <div style={{fontSize: 16, fontWeight: 600, color: '#D1FAE5'}}>Perubahan data wajib login Admin & tersimpan aman</div>
              </div>
            </div>
            <span style={{fontFamily: mono, fontSize: 15, fontWeight: 800, padding: '7px 14px', borderRadius: 999, backgroundColor: T.lime, color: T.limeInk, transform: `rotateX(${flip < 0.5 ? flip * 180 : 0}deg)`, minWidth: 128, textAlign: 'center'}}>{unlocked ? 'ADMIN AKTIF' : 'AUTH GUARD'}</span>
          </div>

          <div style={{position: 'relative', height: 64, opacity: prog(7.0, 0.5)}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: 1 - flip}}>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 16, padding: '0 18px', height: 56}}>
                <IconLock size={22} color={T.lime} />
                <span style={{fontFamily: mono, fontSize: 24, letterSpacing: '0.35em', fontWeight: 800}}>{'•'.repeat(pwLen)}</span>
                {pwLen === 0 && <span style={{fontSize: 17, color: 'rgba(209,250,229,0.6)', fontWeight: 600}}>Kata sandi Admin</span>}
              </div>
              <div style={{position: 'relative', padding: '15px 26px', borderRadius: 16, backgroundColor: T.lime, color: T.limeInk, fontSize: 18, fontWeight: 800}}>
                Masuk
                <Tap at={9.3} from={{x: 110, y: 100}} approach={0.7} ripple="#FFFFFF" />
              </div>
            </div>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: flip, padding: '0 18px', backgroundColor: 'rgba(163,230,53,0.14)', border: '1px solid rgba(163,230,53,0.5)', borderRadius: 16, fontSize: 19, fontWeight: 800, color: '#D9F99D'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={T.lime} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6" /></svg>
              Login berhasil — mode edit aktif
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            <div style={{position: 'relative', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '15px 18px', border: `1px solid ${dbPulse > 0 ? T.lime : 'rgba(255,255,255,0.12)'}`, boxShadow: `0 0 ${dbPulse * 30}px rgba(163,230,53,0.5)`, display: 'flex', alignItems: 'center', gap: 12}}>
              <IconDatabase size={24} color={T.lime} />
              <div>
                <div style={{fontFamily: mono, fontSize: 17, fontWeight: 800}}>SQLite WAL</div>
                <div style={{fontSize: 14, color: '#D1FAE5'}}>{write ? 'Menulis perubahan…' : 'Persisten di Server'}</div>
              </div>
              {write && (
                <div style={{marginLeft: 'auto', display: 'flex', gap: 5}}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{width: 8, height: 8, borderRadius: 999, backgroundColor: T.lime, opacity: 0.3 + 0.7 * Math.max(0, Math.sin(now * 16 - i * 1.3))}} />
                  ))}
                </div>
              )}
              {toast > 0 && toastOut < 1 && (
                <div style={{position: 'absolute', right: 10, top: -20 - toast * 18, opacity: toast * (1 - toastOut), backgroundColor: T.lime, color: T.limeInk, fontWeight: 800, fontSize: 16, padding: '7px 14px', borderRadius: 999, boxShadow: '0 10px 24px rgba(163,230,53,0.45)', transform: `scale(${0.8 + 0.2 * spr(11.15, 220, 12)})`}}>Tersimpan ✓</div>
              )}
              <Shine at={12.25} dur={0.8} radius={18} alpha={0.45} />
            </div>
            <div style={{backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 18, padding: '15px 18px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 12}}>
              <IconSliders size={24} color={T.lime} />
              <div>
                <div style={{fontFamily: mono, fontSize: 17, fontWeight: 800}}>{unlocked ? 'Mode Admin' : 'Mode Review'}</div>
                <div style={{fontSize: 14, color: '#D1FAE5'}}>{unlocked ? 'Edit & simpan data aktif' : 'Read-only untuk Publik'}</div>
              </div>
            </div>
          </div>
          <Sparks at={9.55} radius={140} count={18} style={{top: '30%', left: '12%'}} />
        </div>
      </Reveal>
    </Shell>
  );
};

/* ═════════════ SCENE 4 — EKSPOR & CETAK ═════════════ */
const PRINT_ROWS = [
  {no: '01', nis: '2026001', nama: 'Ahmad Fauzi', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
  {no: '02', nis: '2026002', nama: 'Dewi Lestari', h: 21, s: 1, i: 0, a: 0, pct: '95%'},
  {no: '03', nis: '2026003', nama: 'M. Rizky Pratama', h: 20, s: 0, i: 2, a: 0, pct: '91%'},
  {no: '04', nis: '2026004', nama: 'Siti Nurhaliza', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
  {no: '05', nis: '2026005', nama: 'Budi Santoso', h: 21, s: 0, i: 1, a: 0, pct: '95%'},
  {no: '06', nis: '2026006', nama: 'Nadia Kusuma', h: 22, s: 0, i: 0, a: 0, pct: '100%'},
];
const GRID = '52px 104px 1fr 52px 52px 52px 52px 82px';

export const PremiumExportScene: React.FC = () => {
  const {now, prog, spr} = useProg();
  const exp = prog(3.55, 0.8, Easing.inOut(Easing.cubic));
  const chip = prog(4.5, 0.45);
  const chipOut = prog(7.2, 0.4);
  const importGlow = bump(now, 3.9, 1.4);
  const printP = interpolate(now, [6.6, 8.0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const kop = bump(now, 8.8, 0.9);
  const stampS = spr(9.5, 230, 11);
  const shake = now > 9.5 && now < 9.85 ? Math.sin((now - 9.5) * 110) * 6 * (1 - (now - 9.5) / 0.35) : 0;
  const pct = printP * 100;

  return (
    <Shell mode="light" from="admin" moves={[{t: 0.35, tab: 'rekap'}]} accessLabel="Siap Ekspor & Cetak">
      <Ctx step="03 / Arsip & Laporan Resmi" title="Ekspor Excel & Cetak A4 Landscape" route="/rekap" mode="light" />

      <Reveal at={0.5} y={34} blur={8} style={{position: 'relative', zIndex: 30}}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'relative', overflow: 'hidden', borderRadius: 26, background: `linear-gradient(135deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`, padding: '22px 26px', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, boxShadow: T.shadowSheet}}>
            <Shine at={1.4} dur={1.0} radius={26} alpha={0.22} />
            <div>
              <div style={{fontSize: 14, fontWeight: 800, color: '#D9F99D', letterSpacing: '0.08em', textTransform: 'uppercase'}}>Data Resmi Terverifikasi</div>
              <div style={{fontSize: 26, fontWeight: 800, marginTop: 2}}>Rekapitulasi Kehadiran</div>
            </div>
            <div style={{display: 'flex', gap: 10}}>
              <div style={{position: 'relative'}}>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 999, backgroundColor: now >= 3.5 && now < 4.6 ? 'rgba(163,230,53,0.28)' : 'rgba(255,255,255,0.14)', border: `1px solid ${now >= 3.5 && now < 4.6 ? T.lime : 'rgba(255,255,255,0.25)'}`, fontSize: 17, fontWeight: 700, transform: `scale(${1 - bump(now, 3.5, 0.3) * 0.07})`}}>
                  <IconExcel size={19} color={T.lime} />
                  <span>Ekspor .xlsx</span>
                </div>
                <Tap at={3.5} from={{x: 110, y: 110}} approach={0.8} />
              </div>
              <div style={{position: 'relative'}}>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 999, backgroundColor: T.lime, color: T.limeInk, fontSize: 17, fontWeight: 800, boxShadow: `0 8px ${20 + bump(now, 6.5, 0.5) * 20}px rgba(163,230,53,0.45)`, transform: `scale(${1 - bump(now, 6.5, 0.3) * 0.07})`}}>
                  <IconPrinter size={19} color={T.limeInk} />
                  <span>Cetak A4</span>
                </div>
                <Tap at={6.5} from={{x: -120, y: 120}} approach={0.8} ripple="#FFFFFF" />
              </div>
            </div>
            <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: `${exp * 100}%`, background: T.lime, boxShadow: '0 0 14px rgba(163,230,53,0.9)', opacity: now > 4.4 ? 0 : 1}} />
          </div>
          {chip > 0 && chipOut < 1 && (
            <div style={{position: 'absolute', right: 6, top: '100%', marginTop: 12, zIndex: 50, opacity: chip * (1 - chipOut), transform: `translateY(${(1 - chip) * -20}px) scale(${0.9 + 0.1 * spr(4.5, 200, 13)})`, backgroundColor: '#FFFFFF', border: `1px solid ${T.borderStrong}`, boxShadow: T.shadowSheet, borderRadius: 18, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 42, height: 42, borderRadius: 12, backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><IconExcel size={22} color="#14532D" /></div>
              <div>
                <div style={{fontFamily: mono, fontSize: 16, fontWeight: 800, color: T.ink}}>rekap-kehadiran.xlsx</div>
                <div style={{fontSize: 13, fontWeight: 600, color: T.inkMuted}}>18 siswa • 3 kelas • selesai</div>
              </div>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6" /></svg>
              <Sparks at={4.5} radius={90} count={10} />
            </div>
          )}
        </div>
      </Reveal>

      <Reveal at={1.0} y={30} blur={8}>
        <div style={{position: 'relative', background: `linear-gradient(to bottom, #FFFFFF ${pct}%, #F1F5F9 ${pct}%)`, borderRadius: 26, padding: '24px 28px', border: `2px ${printP >= 1 ? 'solid' : 'dashed'} ${printP >= 1 ? '#CBD5E1' : '#94A3B8'}`, boxShadow: '0 24px 52px -12px rgba(15,23,42,0.16)', color: '#0F172A', transform: `translateX(${shake}px)`}}>
          {printP > 0 && printP < 1 && (
            <div style={{position: 'absolute', left: -6, right: -6, top: `${pct}%`, height: 6, borderRadius: 6, background: T.lime, boxShadow: '0 0 26px 6px rgba(163,230,53,0.75)', zIndex: 10}} />
          )}
          <Shine at={8.8} dur={0.9} radius={26} alpha={0.5} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
            <span style={{fontFamily: mono, fontSize: 14, fontWeight: 800, padding: '5px 12px', borderRadius: 8, backgroundColor: T.surfaceMint, color: T.canopy, border: `1px solid ${T.borderStrong}`}}>FORMAT CETAK: A4 LANDSCAPE</span>
            <span style={{fontFamily: mono, fontSize: 14, fontWeight: 700, color: T.inkMuted}}>{now >= 7.0 ? '297 × 210 mm • Landscape' : '@media print Standard'}</span>
          </div>
          <div style={{textAlign: 'center', borderBottom: '3px solid #0F172A', paddingBottom: 12, marginBottom: 14, position: 'relative'}}>
            <div style={{fontSize: 21, fontWeight: 800, letterSpacing: '0.03em', textTransform: 'uppercase', backgroundImage: 'linear-gradient(rgba(163,230,53,0.65), rgba(163,230,53,0.65))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: `${kop * 100}% 42%`, display: 'inline-block'}}>MA NU ISLAMIYAH ASEMBAGUS</div>
            <div style={{fontSize: 14, fontWeight: 600, color: '#334155', marginTop: 2}}>NPSN: 20584645 • Jl. Raya No. 170 Asembagus, Kab. Situbondo</div>
            <div style={{fontSize: 15, fontWeight: 800, textTransform: 'uppercase', marginTop: 8, color: T.canopy}}>REKAPITULASI KEHADIRAN SISWA (XII IPS 1) — NOVEMBER 2026</div>
          </div>
          <div style={{border: '1.5px solid #334155', borderRadius: 10, overflow: 'hidden'}}>
            <div style={{display: 'grid', gridTemplateColumns: GRID, backgroundColor: '#F1F5F9', borderBottom: '1.5px solid #334155', fontFamily: mono, fontSize: 14, fontWeight: 800, padding: '9px 12px', textAlign: 'center'}}>
              <span>NO</span><span>NIS</span><span style={{textAlign: 'left', fontFamily: sans}}>NAMA SISWA</span><span>H</span><span>S</span><span>I</span><span>A</span><span>RATE</span>
            </div>
            {PRINT_ROWS.map((r, idx) => {
              const p = prog(1.5 + idx * 0.12, 0.45);
              return (
                <div key={r.no} style={{opacity: p, transform: `translateX(${(1 - p) * 30}px)`, display: 'grid', gridTemplateColumns: GRID, borderBottom: idx < PRINT_ROWS.length - 1 ? '1px solid #CBD5E1' : 'none', fontFamily: mono, fontSize: 14, fontWeight: 600, padding: '9px 12px', textAlign: 'center', alignItems: 'center', backgroundColor: idx % 2 === 1 ? '#F8FAFC' : '#FFFFFF'}}>
                  <span>{r.no}</span><span style={{color: '#475569'}}>{r.nis}</span><span style={{textAlign: 'left', fontFamily: sans, fontWeight: 700}}>{r.nama}</span>
                  <span style={{color: T.canopy, fontWeight: 800}}>{r.h}</span><span>{r.s}</span><span>{r.i}</span><span>{r.a}</span>
                  <span style={{fontWeight: 800, color: T.canopy}}>{r.pct}</span>
                </div>
              );
            })}
          </div>
          {stampS > 0.02 && (
            <div style={{position: 'absolute', right: 34, bottom: 22, width: 150, height: 150, borderRadius: 999, border: `5px double ${T.canopy}`, color: T.canopy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800, letterSpacing: '0.08em', opacity: clamp(stampS * 1.6) * 0.92, transform: `rotate(-14deg) scale(${2.3 - 1.3 * stampS})`, filter: `blur(${(1 - clamp(stampS)) * 6}px)`, backgroundColor: 'rgba(255,255,255,0.55)'}}>
              <div style={{fontSize: 13, fontFamily: mono}}>E-REKAP</div>
              <div style={{fontSize: 22, margin: '2px 0'}}>RESMI</div>
              <div style={{fontSize: 11, fontFamily: mono}}>TERVERIFIKASI</div>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal at={2.2} y={24} blur={6}>
        <div style={{position: 'relative', backgroundColor: T.surface, borderRadius: 22, padding: '16px 22px', border: `1px solid ${importGlow > 0 ? T.lime : T.borderStrong}`, boxShadow: `${T.shadowCard}, 0 0 ${importGlow * 34}px rgba(163,230,53,0.55)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 44, height: 44, borderRadius: 12, backgroundColor: T.surfaceMint, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
              <div style={{transform: `translateY(${importGlow > 0 ? -((now * 40) % 30) + 15 : 0}px)`}}>
                {importGlow > 0 ? <IconArrowUpRight size={22} color={T.canopy} /> : <IconExcel size={22} color={T.canopy} />}
              </div>
            </div>
            <div>
              <div style={{fontSize: 18, fontWeight: 800, color: T.ink}}>Backup & Restore Spreadsheet .xlsx</div>
              <div style={{fontSize: 14, fontWeight: 600, color: T.inkMuted}}>Impor massal data siswa & ekspor arsip rekap per kelas</div>
            </div>
          </div>
          <span style={{fontFamily: mono, fontSize: 14, fontWeight: 800, padding: '6px 12px', borderRadius: 10, backgroundColor: importGlow > 0 ? T.lime : T.surfaceMint, color: importGlow > 0 ? T.limeInk : T.canopy}}>.XLSX READY</span>
        </div>
      </Reveal>
    </Shell>
  );
};

/* ═════════════ SCENE 5 — OUTRO / BRAND ═════════════ */
export const PremiumBrandScene: React.FC = () => {
  const {now, prog, spr} = useProg();
  const angle = now * 90;
  const hl = prog(7.0, 0.6);
  const ctaGlow = 0.5 + 0.5 * Math.sin(now * 4);

  return (
    <Shell mode="dark" from="rekap" moves={[{t: 0.35, tab: 'info'}]} accessLabel="rhmt.biz.id">
      <div style={{textAlign: 'center'}}>
        <Reveal at={0.7} y={20} blur={6}>
          <div style={{fontFamily: mono, fontSize: 16, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.lime, marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 12}}>
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
