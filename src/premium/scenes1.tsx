import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, staticFile} from 'remotion';
import {IconArrowUpRight, IconBuildings, IconDatabase, IconExcel, IconPrinter, IconShield} from '../scenes/ERekapScenes';
import {Ambient, clamp, Reveal, Shine, Sparks, Tap, useProg, WordReveal} from './fx';
import {bump, Ctx, mono, sans, Shell, T} from './common';
import {StudioBrowser, StudioMobile} from './StudioFrames';

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
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 36px', borderRadius: 999, backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: 30, fontWeight: 800, letterSpacing: '0.04em', boxShadow: '0 20px 45px rgba(239,68,68,0.6)'}}>
          <span style={{fontSize: 34}}>⚠</span>
          REKAP MANUAL BERANTAKAN!
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SPECS = [
  {title: 'Dashboard Publik', desc: 'Review persentase tanpa login', icon: <IconArrowUpRight size={22} color={T.lime} />, at: 7.6},
  {title: 'Pencarian Cepat', desc: 'Cari nama atau No. Absen instan', icon: <IconShield size={22} color={T.lime} />, at: 8.6},
  {title: 'Ekspor Excel & Print', desc: 'Backup .xlsx dan format cetak A4', icon: <IconExcel size={22} color={T.lime} />, at: 9.4},
  {title: 'Panel Admin Aman', desc: 'Edit presensi via SQLite / Turso', icon: <IconDatabase size={22} color={T.lime} />, at: 10.4},
];

const HookApp: React.FC = () => {
  const {now, spr, prog} = useProg();
  const npsn = '20584645'.slice(0, Math.floor(interpolate(now, [5.5, 6.3], [0, 8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
  const iconS = spr(4.4, 120, 12);
  const chipsP = prog(4.9, 0.5);
  const dot = 0.6 + 0.4 * Math.sin(now * 5);
  const phoneS = spr(5.8, 140, 12);

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

      {/* Main App Hero Card with Authentic App Preview */}
      <Reveal at={4.3} y={40} blur={12}>
        <div style={{position: 'relative'}}>
          <div style={{position: 'relative', overflow: 'hidden', borderRadius: 32, background: `linear-gradient(135deg, ${T.canopy} 0%, #093521 55%, #062215 100%)`, padding: '30px 32px 34px', border: '1px solid rgba(163,230,53,0.28)', boxShadow: '0 26px 56px -14px rgba(0,0,0,0.55)'}}>
            <div style={{position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(to right, rgba(163,230,53,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(163,230,53,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
            <Shine at={5.0} dur={1.1} radius={32} alpha={0.28} />
            <div style={{position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 92, height: 92, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(163,230,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 14px 28px rgba(0,0,0,0.4)'}}>
                <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{width: 68, height: 68, objectFit: 'contain', transform: `rotate(${(1 - clamp(iconS)) * -80}deg) scale(${0.4 + 0.6 * iconS})`}} />
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 15, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, marginBottom: 4}}>Aplikasi Web Resmi</div>
                <div style={{fontSize: 29, fontWeight: 800, lineHeight: 1.18, color: '#FFFFFF'}}>E-Rekap — Rekapitulasi Presensi</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12, opacity: chipsP, transform: `translateY(${(1 - chipsP) * 10}px)`}}>
                  <span style={{fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '4px 12px', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)'}}>v1.0.0</span>
                  <span style={{fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '4px 12px', borderRadius: 999, backgroundColor: 'rgba(163,230,53,0.16)', border: '1px solid rgba(163,230,53,0.35)', color: '#BEF264', display: 'inline-flex', alignItems: 'center', gap: 8}}>
                    <span style={{width: 8, height: 8, borderRadius: 999, backgroundColor: T.lime, boxShadow: `0 0 ${6 + dot * 10}px ${T.lime}`}} />
                    Live Next.js 16
                  </span>
                  <span style={{fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '4px 12px', borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#D1FAE5', display: 'inline-flex', alignItems: 'center', gap: 8}}>
                    <IconDatabase size={14} color={T.lime} />
                    Turso / SQLite
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Sparks at={4.4} radius={300} count={22} style={{top: '40%'}} />

          {/* School Identity Header */}
          <Reveal at={5.2} y={26} blur={6} style={{position: 'relative', zIndex: 4, marginTop: -20, marginLeft: 16, marginRight: 16}}>
            <div style={{position: 'relative', backgroundColor: T.surface, color: T.ink, borderRadius: 24, padding: '20px 24px', border: `1px solid ${T.border}`, boxShadow: T.shadowSheet, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
              <Shine at={5.9} dur={0.9} radius={24} alpha={0.55} />
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 52, height: 52, borderRadius: 16, backgroundColor: T.surfaceMint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${T.borderStrong}`}}>
                  <IconBuildings size={28} color={T.canopy} />
                </div>
                <div>
                  <div style={{fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.inkMuted}}>Lembaga Terdaftar</div>
                  <div style={{fontSize: 22, fontWeight: 800, color: T.ink, marginTop: 1}}>MA NU Islamiyah Asembagus</div>
                  <div style={{fontSize: 15, fontWeight: 600, color: T.inkMuted, marginTop: 1}}>Kab. Situbondo • TA 2026/2027 (Ganjil)</div>
                </div>
              </div>
              <div style={{fontFamily: mono, fontSize: 15, fontWeight: 800, padding: '8px 12px', borderRadius: 12, backgroundColor: T.surfaceMint, color: T.canopy, border: `1px solid ${T.borderStrong}`, flexShrink: 0, minWidth: 175, textAlign: 'center'}}>
                NPSN {npsn}
                <span style={{opacity: 0}}>{'20584645'.slice(npsn.length)}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* 4 Feature Specification Badges */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
        {SPECS.map((sp, i) => (
          <Reveal key={sp.title} at={sp.at} y={34} blur={8}>
            <div style={{position: 'relative', backgroundColor: T.surfaceRaised, color: T.ink, borderRadius: 24, padding: '18px 20px', border: `1px solid ${T.borderStrong}`, boxShadow: T.shadowCard, display: 'flex', alignItems: 'flex-start', gap: 14}}>
              <Shine at={sp.at + 0.25} dur={0.8} radius={24} alpha={0.6} />
              <div style={{width: 44, height: 44, borderRadius: 14, backgroundColor: T.surfaceMint, border: `1px solid ${T.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{sp.icon}</div>
              <div>
                <div style={{fontSize: 19, fontWeight: 800, color: T.ink}}>{sp.title}</div>
                <div style={{fontSize: 14, fontWeight: 500, color: T.inkMuted, marginTop: 3, lineHeight: 1.35}}>{sp.desc}</div>
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

/* ═════════════ SCENE 2 — DASHBOARD (AUTHENTIC PRODUCT SHOWCASE) ═════════════ */
const CLASSES = ['Semua Kelas', 'X IPA 1', 'XI IPA 1', 'XII IPS 1'];
const STATS = [
  {label: 'Hadir', count: 296, at: 9.2, fg: '#15803D', bg: '#DCFCE7', border: '#86EFAC'},
  {label: 'Sakit', count: 8, at: 10.1, fg: '#B45309', bg: '#FEF3C7', border: '#FCD34D'},
  {label: 'Izin', count: 6, at: 11.1, fg: '#1D4ED8', bg: '#DBEAFE', border: '#93C5FD'},
  {label: 'Alpha', count: 2, at: 12.1, fg: '#B91C1C', bg: '#FEE2E2', border: '#FCA5A5'},
];

export const PremiumDashboardScene: React.FC = () => {
  const {now, prog, spr} = useProg();

  // Dynamic Camera Zoom/Pan over the authentic desktop screenshot
  const camZoom = interpolate(now, [0.5, 4.0, 7.5, 12.0], [1.0, 1.15, 1.28, 1.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const camPanY = interpolate(now, [0.5, 4.0, 7.5, 12.0], [0, -30, -75, -50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const activeIdx = now >= 7.4 ? 0 : now >= 6.5 ? 3 : now >= 5.7 ? 2 : now >= 4.9 ? 1 : 0;
  const tapAt = [7.4, 4.9, 5.7, 6.5];
  const mobSlide = spr(5.2, 130, 12);

  return (
    <Shell mode="light" from="info" moves={[{t: 0.35, tab: 'dashboard'}]} accessLabel="Mode Review Publik">
      <Ctx step="01 / Dashboard Utama" title="Pantau Kehadiran Per Kelas" route="/dashboard" mode="light" />

      {/* Studio Workbench — Authentic Desktop Screenshot with Kinetic Pan/Zoom */}
      <Reveal at={0.5} y={40} blur={10}>
        <div style={{position: 'relative'}}>
          <StudioBrowser
            src="assets/erekap/real_desktop_dashboard.png"
            url="localhost:3005/xiiclass/dashboard"
            badge="Review Publik • Aktif"
            height={620}
            zoom={camZoom}
            panY={camPanY}
          >
            {/* Real-time Indicator Overlay in Browser */}
            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(7, 41, 25, 0.92)',
                color: '#FFFFFF',
                borderRadius: 18,
                padding: '10px 18px',
                border: '1px solid rgba(163,230,53,0.4)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{width: 10, height: 10, borderRadius: 5, backgroundColor: T.lime, boxShadow: `0 0 10px ${T.lime}`}} />
              <div>
                <div style={{fontSize: 12, fontWeight: 700, color: '#D9F99D', textTransform: 'uppercase', letterSpacing: '0.06em'}}>Tingkat Presensi</div>
                <div style={{fontFamily: mono, fontSize: 22, fontWeight: 800}}>95.2% Terhitung</div>
              </div>
            </div>

            {/* Interactive Tap & Click Animations */}
            {activeIdx > 0 && <Tap at={tapAt[activeIdx]} from={{x: 40, y: 40}} approach={0.4} />}
          </StudioBrowser>

          {/* Floating Mobile Device Mockup for Mobile-First Evidence */}
          <div
            style={{
              position: 'absolute',
              right: -18,
              bottom: -60,
              zIndex: 35,
              opacity: clamp(mobSlide),
              transform: `translateX(${(1 - mobSlide) * 120}px) translateY(${bump(now, 7.0, 1.0) * -10}px) rotate(-2deg)`,
            }}
          >
            <StudioMobile
              src="assets/erekap/real_mobile_dashboard.png"
              width={260}
              height={500}
            />

            {/* Floating Solution Tag on Mobile */}
            <div
              style={{
                position: 'absolute',
                bottom: 22,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: T.canopyDeep,
                color: '#FFFFFF',
                border: `2px solid ${T.lime}`,
                borderRadius: 999,
                padding: '8px 18px',
                whiteSpace: 'nowrap',
                boxShadow: '0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(163,230,53,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{color: T.lime, fontSize: 16, fontWeight: 900}}>✓</span>
              <span style={{fontFamily: mono, fontSize: 13, fontWeight: 800, letterSpacing: '0.04em'}}>RESPONSIF DI HP</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Floating Tactical Feature Ribbon below the Browser */}
      <Reveal at={1.25} y={30} blur={8} style={{position: 'relative', zIndex: 10, marginTop: 10}}>
        <div style={{position: 'relative', backgroundColor: T.surface, borderRadius: 26, padding: '20px 24px', border: `1px solid ${T.border}`, boxShadow: T.shadowSheet, display: 'flex', flexDirection: 'column', gap: 14}}>
          <Shine at={14.4} dur={1.1} radius={26} alpha={0.6} />

          {/* Class Filter Highlights */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontSize: 18, fontWeight: 800, color: T.ink}}>Filter & Rekap Multi-Kelas</div>
            <div style={{fontFamily: mono, fontSize: 15, fontWeight: 700, color: T.canopy, backgroundColor: T.surfaceMint, padding: '4px 12px', borderRadius: 999, border: `1px solid ${T.borderStrong}`}}>3 Kelas Terdaftar</div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
            {CLASSES.map((cls, idx) => {
              const isActive = idx === activeIdx;
              const b = bump(now, tapAt[idx], 0.35);
              return (
                <div
                  key={cls}
                  style={{
                    textAlign: 'center',
                    padding: '11px 6px',
                    borderRadius: 14,
                    fontSize: 15,
                    fontWeight: 800,
                    backgroundColor: isActive ? T.canopy : T.surfaceMint,
                    color: isActive ? '#FFFFFF' : T.canopy,
                    border: `1px solid ${isActive ? T.canopyDeep : T.borderStrong}`,
                    transform: `scale(${1 + b * 0.07})`,
                    boxShadow: isActive ? '0 10px 22px -8px rgba(10,61,38,0.55)' : 'none',
                  }}
                >
                  {cls}
                </div>
              );
            })}
          </div>

          {/* Live Automatic Status Counts */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
            {STATS.map((st) => {
              const act = prog(st.at, 0.4);
              const s = spr(st.at, 200, 11);
              return (
                <div
                  key={st.label}
                  style={{
                    backgroundColor: act > 0.3 ? st.bg : T.surfaceRaised,
                    border: `1.5px solid ${act > 0.3 ? st.border : T.borderStrong}`,
                    borderRadius: 16,
                    padding: '12px 10px',
                    textAlign: 'center',
                    transform: `scale(${0.96 + 0.04 * s})`,
                    boxShadow: act > 0.3 ? `0 6px 16px ${st.border}` : 'none',
                  }}
                >
                  <div style={{fontSize: 14, fontWeight: 800, color: act > 0.3 ? st.fg : T.inkMuted}}>{st.label}</div>
                  <div style={{fontFamily: mono, fontSize: 24, fontWeight: 800, color: act > 0.3 ? st.fg : T.ink, marginTop: 2}}>
                    {st.label === 'Hadir' ? '20' : st.label === 'Sakit' ? '1' : st.label === 'Izin' ? '0' : '0'}
                  </div>
                  {act > 0.5 && <Sparks at={st.at} radius={50} count={6} color={st.fg} />}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Shell>
  );
};
