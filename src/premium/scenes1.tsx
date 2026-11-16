import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, staticFile} from 'remotion';
import {IconArrowUpRight, IconBuildings, IconDatabase, IconExcel, IconPrinter, IconShield} from '../scenes/ERekapScenes';
import {Ambient, clamp, Reveal, Shine, Sparks, Tap, useProg, WordReveal} from './fx';
import {bump, Ctx, mono, sans, Shell, T} from './common';

/* ═════════════ SCENE 1 — HOOK ═════════════ */
const PainSheet: React.FC<{at: number; x: number; y: number; rot: number; title: string; seed: number}> = ({at, x, y, rot, title, seed}) => {
  const {spr, prog, now} = useProg();
  const s = spr(at, 140, 13);
  const out = prog(3.35, 0.3, Easing.in(Easing.cubic));
  const dir = x < 0 ? -1 : x > 0 ? 1 : 0.3;
  const bad = now >= 2.7;
  return (
    <div
      style={{
        position: 'absolute',
        left: 540 + x - 220,
        top: y,
        width: 440,
        height: 500,
        padding: '22px 22px',
        background: '#FFFDF5',
        borderRadius: 14,
        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)',
        opacity: clamp(s * 1.4) * (1 - out),
        transform: `translate(${dir * out * 900}px, ${-out * 500}px) translateY(${(1 - s) * 90}px) rotate(${rot + out * 40 * dir}deg) scale(${0.85 + 0.15 * s})`,
        filter: `blur(${out * 10}px)`,
      }}
    >
      <div style={{fontFamily: mono, fontSize: 15, fontWeight: 800, color: '#7C6F57', letterSpacing: '0.08em'}}>{title}</div>
      <div style={{height: 2, background: '#E6DCC3', margin: '10px 0 14px'}} />
      {Array.from({length: 6}).map((_, r) => (
        <div key={r} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11}}>
          <div style={{width: 110 + random(`pn${seed}${r}`) * 70, height: 12, borderRadius: 6, background: '#E7E1D0'}} />
          <div style={{flex: 1}} />
          {[0, 1, 2, 3].map((c) => {
            const flag = bad && (r + c + seed) % 5 === 2;
            return (
              <div
                key={c}
                style={{
                  width: 34,
                  height: 30,
                  borderRadius: 7,
                  border: `2px solid ${flag ? '#EF4444' : '#D9D2BD'}`,
                  background: flag ? '#FEE2E2' : 'transparent',
                  color: flag ? '#B91C1C' : '#8B8266',
                  fontFamily: mono,
                  fontSize: 15,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {flag ? '?' : (r * 3 + c + seed) % 4 === 0 ? 'S' : 'H'}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const PainOpen: React.FC = () => {
  const {now, prog, spr} = useProg();
  if (now > 3.95) return null;
  const out = prog(3.3, 0.35, Easing.in(Easing.cubic));
  const tagS = spr(2.7, 200, 9);
  const shake = now > 2.7 && now < 3.3 ? Math.sin((now - 2.7) * 70) * 7 * (1 - (now - 2.7) / 0.6) : 0;
  const strike = prog(1.95, 0.35, Easing.out(Easing.cubic));
  const flicker = now > 2.7 && now < 3.3 ? 0.07 * (0.5 + 0.5 * Math.sin(now * 90)) : 0;
  return (
    <AbsoluteFill style={{opacity: 1 - out, fontFamily: sans}}>
      <AbsoluteFill style={{background: `rgba(239,68,68,${flicker})`}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center'}}>
        <Reveal at={0.85}>
          <div style={{position: 'relative', display: 'inline-block', fontSize: 66, fontWeight: 800, letterSpacing: '-0.03em', color: '#F4F8F5'}}>
            Rekap absen manual
            <div style={{position: 'absolute', left: 0, top: '54%', height: 8, borderRadius: 4, background: '#EF4444', width: `${strike * 100}%`, boxShadow: '0 0 18px rgba(239,68,68,0.8)'}} />
          </div>
        </Reveal>
        <Reveal at={2.35}>
          <div style={{fontSize: 76, fontWeight: 800, color: '#FCA5A5', marginTop: 10, letterSpacing: '-0.03em', transform: `translateX(${shake}px)`}}>Rawan selisih data?</div>
        </Reveal>
      </div>
      <PainSheet at={0.9} x={-170} y={640} rot={-9} title="ABSEN X IPA 1" seed={1} />
      <PainSheet at={1.3} x={150} y={600} rot={7} title="ABSEN XI IPA 1" seed={2} />
      <PainSheet at={1.7} x={-10} y={720} rot={-2} title="REKAP BULAN INI" seed={3} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1010,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          opacity: clamp(tagS),
          transform: `translateX(${shake}px) scale(${0.6 + 0.4 * tagS}) rotate(-4deg)`,
        }}
      >
        <div style={{background: '#DC2626', color: '#FFFFFF', fontWeight: 800, fontSize: 44, padding: '16px 34px', borderRadius: 18, boxShadow: '0 0 60px rgba(239,68,68,0.65), 0 18px 40px rgba(0,0,0,0.5)', display: 'flex', gap: 14, alignItems: 'center'}}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 L22 20 H2 Z" />
            <line x1="12" y1="10" x2="12" y2="14.5" />
            <circle cx="12" cy="17.2" r="0.6" fill="#fff" />
          </svg>
          SELISIH DATA!
        </div>
        <div style={{fontFamily: mono, fontSize: 30, fontWeight: 800, color: '#FECACA', background: 'rgba(127,29,29,0.85)', padding: '8px 20px', borderRadius: 12}}>22 ≠ 21 hadir</div>
      </div>
    </AbsoluteFill>
  );
};

const SPECS = [
  {icon: <IconShield size={24} color={T.canopy} />, title: 'Review & Admin', desc: 'Tinjau bebas; ubah data via login Admin.', at: 7.6},
  {icon: <IconDatabase size={24} color={T.canopy} />, title: 'SQLite Persisten', desc: 'Data siswa & rekap tersimpan aman.', at: 8.6},
  {icon: <IconExcel size={24} color={T.canopy} />, title: 'Backup Excel (.xlsx)', desc: 'Ekspor laporan & restore spreadsheet.', at: 9.4},
  {icon: <IconPrinter size={24} color={T.canopy} />, title: 'Cetak A4 Landscape', desc: 'Format formal lengkap Kop Surat resmi.', at: 10.4},
];

const HookApp: React.FC = () => {
  const {now, spr, prog} = useProg();
  const npsn = '20584645'.slice(0, Math.floor(interpolate(now, [5.5, 6.3], [0, 8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
  const iconS = spr(4.4, 120, 12);
  const chipsP = prog(4.9, 0.5);
  const dot = 0.6 + 0.4 * Math.sin(now * 5);
  return (
    <Shell mode="dark" from="info" accessLabel="E-Rekap v1.0.0">
      <div style={{textAlign: 'center', padding: '0 8px'}}>
        <Reveal at={4.0} y={16} blur={4}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 999, backgroundColor: 'rgba(163,230,53,0.16)', border: '1px solid rgba(163,230,53,0.42)', color: T.lime, fontSize: 17, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 14}}>
            STOP REKAP ABSEN MANUAL
          </div>
        </Reveal>
        <WordReveal
          style={{fontSize: 54, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', color: '#FFFFFF', margin: 0}}
          words={[
            {t: 'Rekap', at: 6.0},
            {t: 'Kehadiran', at: 6.8},
            {t: 'Siswa', at: 7.4},
            {t: 'Rapi,', at: 8.6, accent: true},
            {t: 'Cepat', at: 9.1, accent: true},
            {t: '&', at: 9.9, accent: true},
            {t: 'Siap', at: 9.9, accent: true},
            {t: 'Cetak', at: 10.6, accent: true},
          ]}
        />
      </div>

      <Reveal at={4.3} y={40} blur={12}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'relative', overflow: 'hidden', borderRadius: 32, background: `linear-gradient(135deg, ${T.canopy} 0%, #093521 55%, #062215 100%)`, padding: '32px 32px 62px', border: '1px solid rgba(163,230,53,0.28)', boxShadow: '0 26px 56px -14px rgba(0,0,0,0.55)'}}>
            <div style={{position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(to right, rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(163,230,53,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
            <Shine at={5.0} dur={1.1} radius={32} alpha={0.28} />
            <div style={{position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 98, height: 98, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(163,230,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 14px 28px rgba(0,0,0,0.4)'}}>
                <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{width: 72, height: 72, objectFit: 'contain', transform: `rotate(${(1 - clamp(iconS)) * -80}deg) scale(${0.4 + 0.6 * iconS})`}} />
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 16, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, marginBottom: 4}}>Detail Aplikasi Web</div>
                <div style={{fontSize: 31, fontWeight: 800, lineHeight: 1.18, color: '#FFFFFF'}}>E-Rekap — Sistem Rekapitulasi Kehadiran</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14, opacity: chipsP, transform: `translateY(${(1 - chipsP) * 10}px)`}}>
                  <span style={{fontFamily: mono, fontSize: 16, fontWeight: 700, padding: '5px 13px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)'}}>v1.0.0</span>
                  <span style={{fontFamily: mono, fontSize: 16, fontWeight: 700, padding: '5px 13px', borderRadius: 999, backgroundColor: 'rgba(163,230,53,0.16)', border: '1px solid rgba(163,230,53,0.35)', color: '#BEF264', display: 'inline-flex', alignItems: 'center', gap: 8}}>
                    <span style={{width: 8, height: 8, borderRadius: 999, backgroundColor: T.lime, boxShadow: `0 0 ${6 + dot * 10}px ${T.lime}`}} />
                    Status: Aktif
                  </span>
                  <span style={{fontFamily: mono, fontSize: 16, fontWeight: 700, padding: '5px 13px', borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#D1FAE5', display: 'inline-flex', alignItems: 'center', gap: 8}}>
                    <IconDatabase size={15} color={T.lime} />
                    DB: SQLite
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Sparks at={4.4} radius={300} count={22} style={{top: '40%'}} />

          <Reveal at={5.2} y={26} blur={6} style={{position: 'relative', zIndex: 4, marginTop: -36, marginLeft: 16, marginRight: 16}}>
            <div style={{position: 'relative', backgroundColor: T.surface, color: T.ink, borderRadius: 28, padding: '24px 26px', border: `1px solid ${T.border}`, boxShadow: T.shadowSheet, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
              <Shine at={5.9} dur={0.9} radius={28} alpha={0.55} />
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <div style={{width: 58, height: 58, borderRadius: 18, backgroundColor: T.surfaceMint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${T.borderStrong}`}}>
                  <IconBuildings size={30} color={T.canopy} />
                </div>
                <div>
                  <div style={{fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted}}>Lembaga Terdaftar</div>
                  <div style={{fontSize: 24, fontWeight: 800, color: T.ink, marginTop: 2}}>MA NU Islamiyah Asembagus</div>
                  <div style={{fontSize: 16, fontWeight: 600, color: T.inkMuted, marginTop: 2}}>Kab. Situbondo • TA 2026/2027 (Ganjil)</div>
                </div>
              </div>
              <div style={{fontFamily: mono, fontSize: 16, fontWeight: 800, padding: '9px 14px', borderRadius: 14, backgroundColor: T.surfaceMint, color: T.canopy, border: `1px solid ${T.borderStrong}`, flexShrink: 0, minWidth: 190, textAlign: 'center'}}>
                NPSN {npsn}
                <span style={{opacity: 0}}>{'20584645'.slice(npsn.length)}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
        {SPECS.map((sp, i) => (
          <Reveal key={sp.title} at={sp.at} y={34} blur={8}>
            <div style={{position: 'relative', backgroundColor: T.surfaceRaised, color: T.ink, borderRadius: 24, padding: '20px 22px', border: `1px solid ${T.borderStrong}`, boxShadow: T.shadowCard, display: 'flex', alignItems: 'flex-start', gap: 14}}>
              <Shine at={sp.at + 0.25} dur={0.8} radius={24} alpha={0.6} />
              <div style={{width: 46, height: 46, borderRadius: 14, backgroundColor: T.surfaceMint, border: `1px solid ${T.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{sp.icon}</div>
              <div>
                <div style={{fontSize: 20, fontWeight: 800, color: T.ink}}>{sp.title}</div>
                <div style={{fontSize: 15, fontWeight: 500, color: T.inkMuted, marginTop: 3, lineHeight: 1.35}}>{sp.desc}</div>
              </div>
              {i === 3 && <Sparks at={10.55} radius={120} count={14} />}
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
};

export const PremiumHookScene: React.FC = () => {
  const {prog} = useProg();
  const open = prog(3.55, 0.75, Easing.inOut(Easing.cubic));
  const r = open * 1900;
  const ringOp = 1 - prog(3.55, 0.8);
  return (
    <AbsoluteFill style={{backgroundColor: T.canopyDeep, backgroundImage: `linear-gradient(165deg, ${T.canopy} 0%, ${T.canopyDeep} 100%)`}}>
      <Ambient dark />
      <PainOpen />
      {r > 0 && (
        <AbsoluteFill style={{clipPath: `circle(${r}px at 50% 46%)`}}>
          <HookApp />
        </AbsoluteFill>
      )}
      {r > 0 && ringOp > 0 && (
        <div style={{position: 'absolute', left: 540 - r, top: 1920 * 0.46 - r, width: 2 * r, height: 2 * r, borderRadius: 999, border: `5px solid ${T.lime}`, boxShadow: '0 0 70px rgba(163,230,53,0.75)', opacity: ringOp, pointerEvents: 'none'}} />
      )}
    </AbsoluteFill>
  );
};

/* ═════════════ SCENE 2 — DASHBOARD ═════════════ */
const CLASSES = ['Semua Kelas', 'X IPA 1', 'XI IPA 1', 'XII IPS 1'];
const SUMMARY = [
  {name: 'X IPA 1', students: '6 Siswa', rate: 96.2},
  {name: 'XI IPA 1', students: '6 Siswa', rate: 93.8},
  {name: 'XII IPS 1', students: '6 Siswa', rate: 94.5},
];
const STATS = [
  {label: 'Hadir', count: 296, at: 9.2, ...T.status.hadir},
  {label: 'Sakit', count: 8, at: 10.1, ...T.status.sakit},
  {label: 'Izin', count: 6, at: 11.1, ...T.status.izin},
  {label: 'Alpha', count: 2, at: 12.1, ...T.status.alpha},
];

export const PremiumDashboardScene: React.FC = () => {
  const {now, prog, spr} = useProg();
  const rate = interpolate(now, [0.8, 3.0], [0, 94.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const ringR = 52;
  const circ = 2 * Math.PI * ringR;
  const activeIdx = now >= 7.4 ? 0 : now >= 6.5 ? 3 : now >= 5.7 ? 2 : now >= 4.9 ? 1 : 0;
  const tapAt = [7.4, 4.9, 5.7, 6.5];
  const hover = bump(now, 2.4, 0.8);

  return (
    <Shell mode="light" from="info" moves={[{t: 0.35, tab: 'dashboard'}]} accessLabel="Mode Review Publik">
      <Ctx step="01 / Dashboard Utama" title="Pantau Kehadiran Per Kelas" route="/dashboard" mode="light" />

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Reveal at={0.5} y={40} blur={10}>
          <div style={{position: 'relative', borderRadius: 32, background: `linear-gradient(140deg, ${T.canopyDeep} 0%, ${T.canopy} 60%, ${T.canopyMid} 100%)`, padding: '30px 32px 62px', color: '#FFFFFF', boxShadow: '0 24px 50px -14px rgba(7,41,25,0.45)'}}>
            <Shine at={3.2} dur={1.1} radius={32} alpha={0.22} />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <div style={{fontSize: 16, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D9F99D'}}>TA 2026/2027 • Semester Ganjil</div>
              <div style={{fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '6px 14px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)'}}>November 2026</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22}}>
              <div>
                <div style={{fontSize: 19, fontWeight: 600, color: 'rgba(209,250,229,0.85)'}}>Total Persentase Kehadiran</div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6}}>
                  <span style={{fontFamily: mono, fontSize: 74, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1}}>{rate.toFixed(1)}%</span>
                  <span style={{fontFamily: mono, fontSize: 17, fontWeight: 700, padding: '6px 13px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.16)', color: '#D1FAE5'}}>18 Siswa</span>
                </div>
                <div style={{display: 'flex', gap: 12, marginTop: 18}}>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 999, backgroundColor: T.lime, color: T.limeInk, fontSize: 18, fontWeight: 800, boxShadow: `0 10px ${24 + hover * 18}px -6px rgba(163,230,53,${0.5 + hover * 0.4})`, transform: `scale(${1 + hover * 0.05})`}}>
                    <span>Buka Rekap</span>
                    <IconArrowUpRight size={18} color={T.limeInk} />
                  </div>
                  <div style={{display: 'inline-flex', alignItems: 'center', padding: '12px 20px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', fontSize: 17, fontWeight: 700}}>Info Sekolah</div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.16)'}}>
                <svg width="132" height="132" viewBox="0 0 132 132">
                  <circle cx="66" cy="66" r={ringR} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="13" />
                  <circle cx="66" cy="66" r={ringR} fill="none" stroke={T.lime} strokeWidth="13" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ - (rate / 100) * circ} transform="rotate(-90 66 66)" style={{filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.7))'}} />
                  <text x="66" y="73" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="800" fontFamily={mono}>{Math.round(rate)}%</text>
                </svg>
                <span style={{fontSize: 14, fontWeight: 700, color: '#D1FAE5', marginTop: 4}}>Kehadiran Aktif</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal at={1.25} y={30} blur={8} style={{position: 'relative', zIndex: 5, marginTop: -34, marginLeft: 14, marginRight: 14}}>
          <div style={{position: 'relative', backgroundColor: T.surface, borderRadius: 28, padding: '24px 26px', border: `1px solid ${T.border}`, boxShadow: T.shadowSheet, display: 'flex', flexDirection: 'column', gap: 20}}>
            <Shine at={14.4} dur={1.1} radius={28} alpha={0.6} />
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <span style={{fontSize: 21, fontWeight: 800, color: T.ink}}>Filter Kelas</span>
                <span style={{fontFamily: mono, fontSize: 16, fontWeight: 700, color: T.inkMuted}}>3 Kelas Aktif</span>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
                {CLASSES.map((cls, idx) => {
                  const isActive = idx === activeIdx;
                  const b = bump(now, tapAt[idx], 0.35);
                  return (
                    <div key={cls} style={{position: 'relative'}}>
                      <div style={{textAlign: 'center', padding: '13px 8px', borderRadius: 16, fontSize: 17, fontWeight: 800, backgroundColor: isActive ? T.canopy : T.surfaceMint, color: isActive ? '#FFFFFF' : T.canopy, border: `1px solid ${isActive ? T.canopyDeep : T.borderStrong}`, transform: `scale(${1 + b * 0.07})`, boxShadow: isActive ? '0 10px 22px -8px rgba(10,61,38,0.55)' : 'none'}}>{cls}</div>
                      {idx === 0 ? <Tap at={7.4} from={{x: 690, y: 6}} approach={0.7} /> : <Tap at={tapAt[idx]} from={{x: idx === 1 ? -120 : -190, y: idx === 1 ? 90 : 14}} approach={idx === 1 ? 0.9 : 0.5} />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12}}>
              {STATS.map((st) => {
                const act = prog(st.at, 0.5);
                const s = spr(st.at, 200, 11);
                const cnt = Math.round(interpolate(now, [st.at, st.at + 0.9], [0, st.count], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}));
                return (
                  <div key={st.label} style={{position: 'relative', opacity: 0.45 + 0.55 * act, transform: `scale(${0.96 + 0.04 * s})`, backgroundColor: T.surfaceRaised, border: `1px solid ${act > 0.3 ? st.border : T.borderStrong}`, borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 0 ${act * 26}px ${st.border}`}}>
                    <div>
                      <span style={{display: 'inline-block', padding: '4px 13px', borderRadius: 999, backgroundColor: st.bg, color: st.fg, border: `1px solid ${st.border}`, fontSize: 16, fontWeight: 800}}>{st.label}</span>
                      <div style={{fontSize: 14, fontWeight: 600, color: T.inkMuted, marginTop: 6}}>Terhitung Otomatis</div>
                    </div>
                    <div style={{fontFamily: mono, fontSize: 40, fontWeight: 800, color: st.fg}}>{cnt}</div>
                    <Sparks at={st.at} radius={70} count={8} color={st.fg} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{backgroundColor: T.surface, borderRadius: 24, padding: '18px 22px', border: `1px solid ${T.border}`, boxShadow: T.shadowCard, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
        {SUMMARY.map((cs, idx) => {
          const on = activeIdx === idx + 1;
          return (
            <Reveal key={cs.name} at={1.8 + idx * 0.12} y={20} blur={4}>
              <div style={{backgroundColor: on ? T.surfaceMint : T.surfaceRaised, border: `1px solid ${on ? T.canopy : T.borderStrong}`, borderRadius: 16, padding: '12px 14px', transform: `scale(${on ? 1.05 : 1})`, boxShadow: on ? '0 12px 24px -10px rgba(10,61,38,0.4)' : 'none'}}>
                <div style={{fontSize: 18, fontWeight: 800, color: T.ink}}>{cs.name}</div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4}}>
                  <span style={{fontSize: 14, fontWeight: 600, color: T.inkMuted}}>{cs.students}</span>
                  <span style={{fontFamily: mono, fontSize: 19, fontWeight: 800, color: T.canopy}}>{cs.rate.toFixed(1)}%</span>
                </div>
                <div style={{height: 6, borderRadius: 6, backgroundColor: 'rgba(10,61,38,0.1)', marginTop: 8, overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${interpolate(now, [2.2 + idx * 0.15, 3.2 + idx * 0.15], [0, cs.rate], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)})}%`, background: `linear-gradient(90deg, ${T.canopyMid}, ${T.lime})`, borderRadius: 6}} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Shell>
  );
};
