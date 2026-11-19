import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { E, focusCam, p, remap, shake } from './motion';
import { BrowserFrame, Cursor, FloatTag, Icon, mono, sans, T } from './primitives';

const card: React.CSSProperties = {
  background: '#fff',
  border: '1.5px solid rgba(10,61,38,0.12)',
  boxShadow: T.shadowCard,
  borderRadius: 26,
};

/* ═════════ S4 · Dashboard live (count-up cepat → slow-mo) ═════════ */
const STATUS = [
  { k: 'Hadir', v: 260, st: T.status.hadir },
  { k: 'Sakit', v: 6, st: T.status.sakit },
  { k: 'Izin', v: 5, st: T.status.izin },
  { k: 'Alpha', v: 2, st: T.status.alpha },
];
const CLASSES = [
  { n: 'X IPA 1', w: 'Siti Aminah, S.Pd', s: 5, pct: 94.3 },
  { n: 'XI IPA 1', w: "M. Syafi'i, S.Ag", s: 4, pct: 96.4 },
  { n: 'XII IPS 1', w: 'Nurul Huda, M.Pd', s: 4, pct: 95.2 },
];
const DONUT_COL = ['#22C55E', '#F59E0B', '#0EA5E9', '#E11D48'];

export const SceneDashboard: React.FC = () => {
  const f = useCurrentFrame();
  const tm = remap(f, [
    { until: 50, rate: 2.4 },
    { until: 130, rate: 0.4 },
  ]);
  const P = E.out(Math.min(1, tm / 200));
  const cam = focusCam(f, [
    { f: 0, s: 1 },
    { f: 130, s: 1.05, px: 60, py: 20 },
    { f: 210, s: 1.02, px: 0, py: 0 },
  ]);
  const r = 150;
  const circ = 2 * Math.PI * r;
  let acc = 0;

  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', inset: 0, transform: cam.css, transformOrigin: '50% 50%' }}>
        {/* headline */}
        <div style={{ position: 'absolute', left: 110, top: 140, opacity: p(f, 0, 14) }}>
          <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, letterSpacing: '0.3em', color: T.inkMuted }}>DASHBOARD · NOVEMBER 2026</div>
          <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 130, letterSpacing: '-0.05em', color: T.canopy, lineHeight: 1.0, marginTop: 10 }}>
            {(95.2 * P).toFixed(1)}<span style={{ fontSize: 66, color: '#65A30D' }}>%</span>
          </div>
          <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 24, color: T.inkMuted, marginTop: 6 }}>kehadiran seluruh kelas</div>
        </div>

        {/* kartu status */}
        {STATUS.map((s, i) => {
          const q = p(f, 8 + i * 6, 30 + i * 6, E.back);
          const col = i % 2;
          const row = Math.floor(i / 2);
          return (
            <div
              key={s.k}
              style={{
                ...card,
                position: 'absolute',
                left: 110 + col * 330,
                top: 430 + row * 210,
                width: 310,
                height: 190,
                padding: '22px 26px',
                opacity: Math.min(1, q * 1.6),
                transform: `translateY(${(1 - q) * 60}px) scale(${0.9 + 0.1 * q})`,
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: s.st.bg, color: s.st.fg, border: `1px solid ${s.st.border}`, fontFamily: mono, fontWeight: 800, fontSize: 14, letterSpacing: '0.1em' }}>
                {s.k.toUpperCase()}
              </div>
              <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 78, color: T.ink, letterSpacing: '-0.05em', marginTop: 12 }}>
                {Math.round(s.v * P)}
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(10,61,38,0.08)', marginTop: 4, overflow: 'hidden' }}>
                <div style={{ width: `${Math.max(3, (s.v / 273) * 100 * (i === 0 ? 1 : 5) * P)}%`, height: '100%', background: DONUT_COL[i] }} />
              </div>
            </div>
          );
        })}

        {/* donut */}
        <div style={{ position: 'absolute', left: 800, top: 270, width: 440, height: 440, opacity: p(f, 10, 28) }}>
          <svg width={440} height={440} viewBox="0 0 440 440" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={220} cy={220} r={r} fill="none" stroke="rgba(10,61,38,0.08)" strokeWidth={56} />
            {STATUS.map((s, i) => {
              const seg = (s.v / 273) * circ;
              const vis = Math.max(0, Math.min(seg, P * circ - acc));
              const el = <circle key={s.k} cx={220} cy={220} r={r} fill="none" stroke={DONUT_COL[i]} strokeWidth={56} strokeDasharray={`${vis} ${circ - vis}`} strokeDashoffset={-acc} />;
              acc += seg;
              return el;
            })}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 92, color: T.canopy, letterSpacing: '-0.05em' }}>{Math.round(273 * P)}</div>
            <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 14, letterSpacing: '0.28em', color: T.inkMuted }}>TOTAL SESI</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 800, top: 740, width: 440, display: 'flex', justifyContent: 'center', gap: 22, opacity: p(f, 40, 60) }}>
          {STATUS.map((s, i) => (
            <span key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: sans, fontWeight: 700, fontSize: 16, color: T.canopy }}>
              <span style={{ width: 11, height: 11, borderRadius: 999, background: DONUT_COL[i] }} />
              {s.k}
            </span>
          ))}
        </div>

        {/* bar per kelas */}
        {CLASSES.map((c, i) => {
          const q = p(f, 18 + i * 8, 42 + i * 8, E.back);
          return (
            <div key={c.n} style={{ ...card, position: 'absolute', left: 1300, top: 250 + i * 190, width: 510, height: 170, padding: '22px 28px', opacity: Math.min(1, q * 1.6), transform: `translateX(${(1 - q) * 120}px)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 30, color: T.ink, letterSpacing: '-0.02em' }}>{c.n}</div>
                  <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 15, color: T.inkMuted }}>{c.s} siswa · {c.w}</div>
                </div>
                <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, padding: '6px 14px', borderRadius: 999, background: T.canopy, color: T.lime }}>
                  {(c.pct * P).toFixed(1)}%
                </div>
              </div>
              <div style={{ height: 16, borderRadius: 8, background: 'rgba(10,61,38,0.08)', marginTop: 26, overflow: 'hidden' }}>
                <div style={{ width: `${c.pct * P}%`, height: '100%', background: `linear-gradient(90deg, ${T.canopy}, #65A30D ${70}%, ${T.lime})`, borderRadius: 8 }} />
              </div>
            </div>
          );
        })}
      </div>

      {f >= 50 && f <= 134 && (
        <div style={{ position: 'absolute', right: 70, top: 132, fontFamily: mono, fontWeight: 800, fontSize: 14, letterSpacing: '0.16em', padding: '8px 16px', borderRadius: 999, background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', opacity: p(f, 50, 60) * (1 - p(f, 124, 134)) }}>
          ◐ SLOW-MO 0.4×
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ═════════ S5 · Mode Excel (kamera keyframe + highlight) ═════════ */
const SX = 1240 / 1440;
const px = (ix: number) => ix * SX - 620;
const py = (iy: number) => 44 + iy * SX - 409.5;
const COLS = [
  { k: 'Hadir', x0: 731, x1: 817, c: '#16A34A', v: 260 },
  { k: 'Sakit', x0: 817, x1: 900, c: '#F59E0B', v: 6 },
  { k: 'Izin', x0: 900, x1: 966, c: '#0EA5E9', v: 5 },
  { k: 'Alpha', x0: 966, x1: 1054, c: '#E11D48', v: 2 },
];
const ROW_TOP = 85;
const ROW_H = 29;

export const SceneExcel: React.FC = () => {
  const f = useCurrentFrame();
  const cam = focusCam(f, [
    { f: 0, s: 1.0 },
    { f: 30, s: 1.0 },
    { f: 64, s: 1.85, px: px(940), py: py(60) },
    { f: 110, s: 1.85, px: px(940), py: py(60) },
    { f: 150, s: 1.5, px: px(760), py: py(300) },
    { f: 182, s: 2.3, px: px(1090), py: py(215) },
    { f: 212, s: 2.3, px: px(1090), py: py(215) },
    { f: 236, s: 1.0, px: 0, py: 0 },
  ]);
  // pemindaian baris cepat → balik ke baris 5 (slow-mo pulse)
  const scanIn = p(f, 64, 112, E.inOut);
  const back = p(f, 112, 146, E.out);
  const rowIdx = f < 112 ? scanIn * 12 : 12 + (4 - 12) * back;
  const bandY = ROW_TOP + rowIdx * ROW_H;
  const tm = remap(f, [{ until: 150, rate: 1 }, { until: 214, rate: 0.35 }]);
  const pulse = 0.5 + 0.5 * Math.sin(tm * 0.35);
  const clickK = p(f, 226, 232, E.lin) * (1 - p(f, 232, 242, E.lin));
  const curP = p(f, 196, 226, E.inOut);
  const curX = 1000 + (1300 - 1000) * curP;
  const curY = 300 + (28 - 300) * curP;

  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 340, top: 531 - 409.5, transform: cam.css, transformOrigin: '50% 50%', opacity: p(f, 0, 14) }}>
        <BrowserFrame width={1240} contentHeight={775} url="rhmt.biz.id/xiiclass/rekap?view=excel" badge="EXCEL MODE · 13 SISWA">
          <div style={{ width: 1440, height: 900, transform: `scale(${SX})`, transformOrigin: '0 0', position: 'relative' }}>
            <Img src={staticFile('assets/erekap/xiiclass_excel_mode.png')} style={{ width: 1440, height: 900, display: 'block' }} />

            {/* freeze kolom */}
            <div style={{ position: 'absolute', left: 376, top: 50, width: 4, height: 412, background: T.lime, boxShadow: `0 0 18px ${T.lime}`, opacity: p(f, 20, 34) * (1 - p(f, 100, 116)), transformOrigin: 'top', transform: `scaleY(${p(f, 20, 40)})` }} />

            {/* outline kolom status */}
            {COLS.map((c, i) => {
              const q = p(f, 34 + i * 6, 56 + i * 6);
              return (
                <React.Fragment key={c.k}>
                  <div style={{ position: 'absolute', left: c.x0, top: 50, width: c.x1 - c.x0, height: 412 * q, border: `3px solid ${c.c}`, borderRadius: 8, background: `${c.c}14`, opacity: 1 - p(f, 128, 146) * 0.7 }} />
                  <div style={{ position: 'absolute', left: c.x0 - 6, top: 482, width: c.x1 - c.x0 + 12, textAlign: 'center', padding: '8px 0', borderRadius: 14, background: c.c, color: '#fff', fontFamily: mono, fontWeight: 800, fontSize: 24, opacity: p(f, 54 + i * 6, 70 + i * 6), transform: `translateY(${(1 - p(f, 54 + i * 6, 72 + i * 6, E.back)) * 24}px)` }}>
                    Σ {Math.round(c.v * p(f, 58 + i * 6, 96, E.out))}
                  </div>
                </React.Fragment>
              );
            })}

            {/* band pemindai */}
            <div style={{ position: 'absolute', left: 0, top: bandY, width: 1440, height: ROW_H, background: 'rgba(163,230,53,0.38)', borderTop: `2px solid ${T.lime}`, borderBottom: `2px solid ${T.lime}`, opacity: p(f, 62, 70) * (f > 214 ? 1 - p(f, 214, 224) : 1), boxShadow: '0 0 30px rgba(163,230,53,0.55)' }} />

            {/* sorotan baris 5 */}
            {f >= 130 && (
              <>
                <div style={{ position: 'absolute', left: 966 - 6 - pulse * 6, top: ROW_TOP + 4 * ROW_H - 4 - pulse * 4, width: 88 + 12 + pulse * 12, height: ROW_H + 8 + pulse * 8, border: '4px solid #E11D48', borderRadius: 12, background: 'rgba(225,29,72,0.14)', opacity: p(f, 130, 142) }} />
                <div style={{ position: 'absolute', left: 1229, top: ROW_TOP + 4 * ROW_H - 2, width: 211, height: ROW_H + 4, border: '3px solid #F59E0B', borderRadius: 10, background: 'rgba(245,158,11,0.18)', opacity: p(f, 138, 150) }} />
              </>
            )}

            {/* badge area kosong bawah tabel */}
            <div style={{ position: 'absolute', left: 60, top: 560, display: 'flex', gap: 16, opacity: p(f, 22, 40) * (1 - p(f, 120, 134)) }}>
              <span style={{ padding: '12px 22px', borderRadius: 16, background: '#fff', border: '2px solid rgba(10,61,38,0.2)', boxShadow: T.shadowCard, fontFamily: sans, fontWeight: 800, fontSize: 24, color: T.canopy }}>
                ❄ Freeze kolom No & Nama Siswa
              </span>
            </div>
            <div style={{ position: 'absolute', left: 60, top: 640, opacity: p(f, 44, 62) * (1 - p(f, 120, 134)), transform: `translateY(${(1 - p(f, 44, 64)) * 24}px)` }}>
              <span style={{ padding: '12px 22px', borderRadius: 16, background: T.canopy, color: T.lime, fontFamily: mono, fontWeight: 800, fontSize: 22 }}>
                =COUNTIF(status,"H") → otomatis
              </span>
            </div>
            <div style={{ position: 'absolute', left: 60, top: 560, padding: '14px 26px', borderRadius: 18, background: '#fff', border: '2px solid #FECACA', boxShadow: T.shadowCard, fontFamily: sans, fontWeight: 800, fontSize: 28, color: '#991B1B', opacity: p(f, 150, 166), transform: `translateY(${(1 - p(f, 150, 170, E.back)) * 30}px)` }}>
              ⚠ Dimas Wahyu Saputra · Alpha 2 · 85.7% · Perlu pembinaan
            </div>

            {f >= 196 && <Cursor x={curX} y={curY} click={clickK} />}
            {f >= 232 && (
              <div style={{ position: 'absolute', left: 1020, top: 64, padding: '12px 22px', borderRadius: 14, background: T.canopy, color: T.lime, fontFamily: mono, fontWeight: 800, fontSize: 20, opacity: p(f, 232, 238) }}>
                ✓ rekap-2026-11.xlsx
              </div>
            )}
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════ S6 · Cetak A4 + stamp slow-mo ═════════ */
const ROWS = [
  ['Ahmad Rifqi Maulana', 'X IPA 1', 20, 1, 0, 0, '95.2%'],
  ['Aisyah Nur Hidayah', 'X IPA 1', 21, 0, 0, 0, '100%'],
  ['Bagus Pratama Putra', 'X IPA 1', 19, 1, 1, 0, '90.5%'],
  ['Citra Dewi Lestari', 'X IPA 1', 21, 0, 0, 0, '100%'],
  ['Dimas Wahyu Saputra', 'X IPA 1', 18, 0, 1, 2, '85.7%'],
  ['Fajar Kurniawan', 'XI IPA 1', 21, 0, 0, 0, '100%'],
  ['Hana Maulida', 'XI IPA 1', 19, 2, 0, 0, '90.5%'],
  ['Ilham Akbar Wijaya', 'XI IPA 1', 20, 0, 1, 0, '95.2%'],
];
const GRID = '46px 1fr 110px 54px 54px 54px 54px 100px';

export const ScenePrint: React.FC = () => {
  const f = useCurrentFrame();
  const tm = remap(f, [{ until: 60, rate: 1 }, { until: 120, rate: 0.3 }]);
  const sh = shake(f, 120, 18, 9);
  const feed = p(f, 6, 46, E.out);
  const descent = p(tm, 56, 78, E.in);
  const stampS = f < 120 ? 3.4 - 2.4 * descent : 1 + 0.1 * Math.exp(-(f - 120) / 5) * Math.cos((f - 120) * 0.9);
  const stampO = f < 120 ? p(tm, 54, 66) : 1;
  const ring = p(f, 120, 150, E.out);
  const slow = f >= 60 && f < 124;
  const curP = p(f, 156, 184, E.inOut);
  const click = p(f, 186, 190, E.lin) * (1 - p(f, 190, 200, E.lin));

  return (
    <AbsoluteFill style={{ transform: `translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg)` }}>
      {slow && (
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(10,61,38,0.22) 100%)', opacity: p(f, 60, 72) * (1 - p(f, 114, 124)) }} />
      )}

      {/* slot printer */}
      <div style={{ position: 'absolute', left: 400, top: 140, width: 1120, height: 36, borderRadius: 18, background: T.canopy, boxShadow: '0 16px 30px -8px rgba(7,41,25,0.5)', zIndex: 5, opacity: p(f, 0, 10) }}>
        <div style={{ position: 'absolute', left: 30, right: 30, top: 14, height: 8, borderRadius: 4, background: '#04170E' }} />
        <div style={{ position: 'absolute', right: 26, top: -6, width: 12, height: 12, borderRadius: 999, background: f < 50 ? T.lime : '#10B981', boxShadow: `0 0 12px ${T.lime}` }} />
      </div>

      {/* kertas */}
      <div style={{ position: 'absolute', left: 400, top: 165, width: 1120, height: 800, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 0,
            width: 1000,
            height: 707,
            transform: `translateY(${-(707 + 10) * (1 - feed)}px)`,
            background: '#fff',
            borderRadius: 6,
            boxShadow: '0 30px 60px -16px rgba(10,61,38,0.28), 0 0 0 1px rgba(0,0,0,0.04)',
            padding: '28px 40px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `3px double ${T.canopy}`, paddingBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{ width: 54, height: 54, borderRadius: 12 }} />
              <div>
                <div style={{ fontFamily: sans, fontWeight: 900, fontSize: 14, letterSpacing: '0.05em', color: T.canopy }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
                <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 20, color: T.canopyDeep }}>MADRASAH ALIYAH NU ISLAMIYAH ASEMBAGUS</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: T.inkMuted, marginTop: 2 }}>Laporan Resmi Rekapitulasi Presensi Kehadiran Siswa · TA 2026/2027</div>
              </div>
            </div>
            <div style={{ padding: '5px 14px', border: `2px solid ${T.canopy}`, borderRadius: 8, fontFamily: mono, fontWeight: 800, fontSize: 13, color: T.canopy }}>A4 LANDSCAPE</div>
          </div>

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: GRID, background: T.surfaceMint, padding: '8px 12px', borderRadius: 6, fontFamily: mono, fontWeight: 800, fontSize: 12, color: T.canopy }}>
            <span>NO</span><span>NAMA SISWA</span><span>KELAS</span><span>H</span><span>S</span><span>I</span><span>A</span><span style={{ textAlign: 'right' }}>% HADIR</span>
          </div>
          {ROWS.map((r, i) => {
            const q = p(f, 40 + i * 3, 52 + i * 3, E.out);
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: GRID, padding: '9px 12px', borderBottom: '1px solid rgba(10,61,38,0.08)', background: i % 2 ? T.surfaceRaised : '#fff', fontFamily: sans, fontWeight: 600, fontSize: 15, color: T.ink, opacity: q, transform: `translateX(${(1 - q) * -50}px)` }}>
                <span style={{ fontFamily: mono, color: T.inkMuted }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontWeight: 800 }}>{r[0]}</span>
                <span>{r[1]}</span>
                <span style={{ fontFamily: mono, color: '#15803D', fontWeight: 800 }}>{r[2]}</span>
                <span style={{ fontFamily: mono, color: '#B45309', fontWeight: 800 }}>{r[3]}</span>
                <span style={{ fontFamily: mono, color: '#0369A1', fontWeight: 800 }}>{r[4]}</span>
                <span style={{ fontFamily: mono, color: '#BE123C', fontWeight: 800 }}>{r[5]}</span>
                <span style={{ textAlign: 'right', fontFamily: mono, fontWeight: 800 }}>{r[6]}</span>
              </div>
            );
          })}

          <div style={{ position: 'absolute', right: 70, bottom: 36, textAlign: 'center', fontFamily: sans, fontSize: 15, color: T.ink, opacity: p(f, 80, 100) }}>
            <div>Asembagus, 19 November 2026</div>
            <div style={{ fontWeight: 800 }}>Kepala Madrasah</div>
            <div style={{ height: 96 }} />
            <div style={{ borderTop: `1.5px solid ${T.ink}`, paddingTop: 4, fontWeight: 700 }}>(................................)</div>
          </div>

          {/* stempel */}
          <div
            style={{
              position: 'absolute',
              right: 28,
              bottom: 70,
              width: 330,
              padding: '12px 18px',
              textAlign: 'center',
              border: `6px double ${T.canopy}`,
              borderRadius: 16,
              color: T.canopy,
              fontFamily: sans,
              fontWeight: 900,
              fontSize: 40,
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              opacity: stampO * 0.9,
              transform: `rotate(-12deg) scale(${stampS})`,
              mixBlendMode: 'multiply',
            }}
          >
            VERIFIKASI RESMI
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 12, letterSpacing: '0.18em', marginTop: 6 }}>E-REKAP · MA NU ISLAMIYAH ASEMBAGUS</div>
          </div>
        </div>
      </div>

      {/* efek benturan */}
      {f >= 120 && (
        <>
          <div style={{ position: 'absolute', left: 1280 - 40, top: 760 - 40, width: 80 + ring * 700, height: 80 + ring * 700, marginLeft: -ring * 350, marginTop: -ring * 350, borderRadius: 999, border: `4px solid ${T.lime}`, opacity: (1 - ring) * 0.9 }} />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const d = ring * (120 + (i % 3) * 70);
            return <div key={i} style={{ position: 'absolute', left: 1280 + Math.cos(a) * d, top: 760 + Math.sin(a) * d, width: 10 - ring * 6, height: 10 - ring * 6, borderRadius: 999, background: i % 2 ? T.lime : T.canopy, opacity: 1 - ring }} />;
          })}
        </>
      )}

      {slow && (
        <div style={{ position: 'absolute', left: 80, top: 300, fontFamily: mono, fontWeight: 800, fontSize: 18, letterSpacing: '0.16em', padding: '10px 18px', borderRadius: 999, background: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', opacity: p(f, 60, 70) * (1 - p(f, 114, 124)) }}>
          ◐ SLOW-MO 0.3×
        </div>
      )}

      <FloatTag left={80} top={420} delay={132} label="Kop Surat resmi" sub="MADRASAH" />
      <FloatTag left={80} top={520} delay={142} label="A4 Landscape" sub="SIAP CETAK" color="#10B981" />
      <FloatTag right={60} top={420} delay={152} label="Terverifikasi" sub="STEMPEL DIGITAL" color="#F59E0B" />

      <div style={{ position: 'absolute', left: 960 - 150, top: 902, width: 300, textAlign: 'center', padding: '14px 0', borderRadius: 999, background: T.lime, color: T.canopyDeep, fontFamily: sans, fontWeight: 800, fontSize: 22, boxShadow: `0 0 ${20 + click * 40}px rgba(163,230,53,0.6)`, opacity: p(f, 150, 166), transform: `scale(${1 - click * 0.05})` }}>
        {f >= 190 ? '✓ Tercetak' : 'Cetak A4 ↗'}
      </div>
      {f >= 156 && <Cursor x={1500 + (960 - 1500) * curP} y={640 + (930 - 640) * curP} click={click} />}
    </AbsoluteFill>
  );
};

/* ═════════ S7 · Backup XLSX + SQLite ═════════ */
export const SceneBackup: React.FC = () => {
  const f = useCurrentFrame();
  const curP = p(f, 6, 40, E.inOut);
  const click = p(f, 42, 46, E.lin) * (1 - p(f, 46, 56, E.lin));
  const prog = p(f, 48, 104, E.inOut);
  const lock = p(f, 104, 114, E.back);
  const done = prog >= 1;

  return (
    <AbsoluteFill>
      {/* file xlsx */}
      <div style={{ ...card, position: 'absolute', left: 150, top: 260, width: 600, height: 330, padding: 34, opacity: p(f, 0, 14), transform: `translateX(${(1 - p(f, 0, 20)) * -120}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 92, height: 92, borderRadius: 24, background: T.surfaceMint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="file" size={54} stroke={2} />
          </div>
          <div>
            <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 30, color: T.canopy, letterSpacing: '-0.02em' }}>Rekap Kehadiran</div>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 15, color: T.inkMuted, marginTop: 4 }}>Semua Kelas · 2026-11 · .xlsx</div>
          </div>
        </div>
        <div style={{ height: 14, borderRadius: 7, background: 'rgba(10,61,38,0.08)', marginTop: 40, overflow: 'hidden' }}>
          <div style={{ width: `${prog * 100}%`, height: '100%', background: `linear-gradient(90deg, ${T.canopy}, ${T.lime})`, borderRadius: 7 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: mono, fontWeight: 800, fontSize: 18, color: T.canopy }}>
          <span>{done ? '✓ Tersimpan' : 'Mengekspor…'}</span>
          <span>{Math.round(prog * 100)}%</span>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 290, top: 650, width: 320, textAlign: 'center', padding: '16px 0', borderRadius: 999, background: T.lime, color: T.canopyDeep, fontFamily: sans, fontWeight: 800, fontSize: 24, boxShadow: `0 ${10 + click * 10}px 30px -8px rgba(163,230,53,0.7)`, opacity: p(f, 4, 18), transform: `scale(${1 - click * 0.06})` }}>
        Download .xlsx
      </div>
      {f >= 6 && f < 70 && <Cursor x={900 + (500 - 900) * curP} y={820 + (690 - 820) * curP} click={click} />}

      {/* jalur data */}
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M 750 425 C 900 300, 1020 550, 1170 425" fill="none" stroke="rgba(10,61,38,0.18)" strokeWidth={3} strokeDasharray="8 10" />
        {Array.from({ length: 9 }).map((_, i) => {
          const q = ((f - 56 - i * 7) / 60) % 1;
          if (f < 56 + i * 7 || q < 0) return null;
          const t = q;
          const x = (1 - t) ** 3 * 750 + 3 * (1 - t) ** 2 * t * 900 + 3 * (1 - t) * t * t * 1020 + t ** 3 * 1170;
          const y = (1 - t) ** 3 * 425 + 3 * (1 - t) ** 2 * t * 300 + 3 * (1 - t) * t * t * 550 + t ** 3 * 425;
          return <circle key={i} cx={x} cy={y} r={9} fill={i % 2 ? T.lime : T.canopy} opacity={Math.sin(t * Math.PI)} />;
        })}
      </svg>

      {/* SQLite */}
      <div style={{ ...card, position: 'absolute', left: 1170, top: 260, width: 600, height: 330, padding: 34, opacity: p(f, 10, 26), transform: `translateX(${(1 - p(f, 10, 30)) * 120}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative', width: 92, height: 92, borderRadius: 24, background: T.canopy, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="db" size={54} color={T.lime} stroke={2} />
            <div style={{ position: 'absolute', right: -14, bottom: -14, width: 44, height: 44, borderRadius: 14, background: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.4 + 0.6 * lock}) rotate(${(1 - lock) * -20}deg)`, border: '3px solid #fff' }}>
              <Icon name="lock" size={24} color={T.canopyDeep} stroke={2.6} />
            </div>
          </div>
          <div>
            <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 30, color: T.canopy, letterSpacing: '-0.02em' }}>Database SQLite</div>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 15, color: T.inkMuted, marginTop: 4 }}>lokal · persisten · aman</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 40, flexWrap: 'wrap' }}>
          {['273 sesi tercatat', 'Backup satu ketukan', 'Ekspor otomatis'].map((t, i) => (
            <span key={t} style={{ padding: '9px 16px', borderRadius: 999, background: T.surfaceMint, border: '1px solid rgba(15,81,50,0.18)', fontFamily: sans, fontWeight: 700, fontSize: 16, color: T.canopy, opacity: p(f, 70 + i * 8, 86 + i * 8), transform: `translateY(${(1 - p(f, 70 + i * 8, 90 + i * 8, E.back)) * 16}px)` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: sans, fontWeight: 800, fontSize: 64, letterSpacing: '-0.04em', color: T.canopy, opacity: p(f, 112, 132), transform: `translateY(${(1 - p(f, 112, 136)) * 30}px)` }}>
        Data aman. <span style={{ color: '#65A30D' }}>Backup tinggal ketuk.</span>
      </div>
    </AbsoluteFill>
  );
};
