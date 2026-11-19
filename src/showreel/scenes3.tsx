import React from 'react';
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from 'remotion';
import { E, p, shake } from './motion';
import { Icon, IconName, mono, sans, T } from './primitives';

/* ═════════ S8 · Montase cepat (cut 25 frame) ═════════ */
const CUTS: { n: string; icon: IconName; title: string; sub: string; bg: string; fg: string; accent: string }[] = [
  { n: '01', icon: 'grid', title: 'Multi-Kelas Terpadu', sub: 'Ringkasan per kelas dalam satu layar', bg: T.lime, fg: T.canopyDeep, accent: T.canopy },
  { n: '02', icon: 'shield', title: 'Review & Admin', sub: 'Siswa & guru bebas memantau, edit data aman untuk Admin', bg: T.canopy, fg: '#FFFFFF', accent: T.lime },
  { n: '03', icon: 'printer', title: 'Cetak A4 Formal', sub: 'Landscape lengkap dengan Kop Surat resmi', bg: '#FFFFFF', fg: T.canopy, accent: '#65A30D' },
  { n: '04', icon: 'file', title: 'Backup & Ekspor XLSX', sub: 'Satu ketukan, langsung dari HP atau desktop', bg: T.canopyDeep, fg: '#FFFFFF', accent: T.lime },
  { n: '05', icon: 'devices', title: 'Responsif', sub: 'Desktop dan HP, tampilan selaras', bg: T.surfaceMint, fg: T.canopy, accent: '#15803D' },
  { n: '06', icon: 'db', title: 'SQLite Persisten', sub: 'Data rapi, tersimpan lokal', bg: T.lime, fg: T.canopyDeep, accent: T.canopy },
];

export const SceneMontage: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(5, Math.floor(f / 25));
  const c = CUTS[i];
  const l = f - i * 25;
  const whip = p(l, 0, 7, E.out);
  const sh = shake(l, 0, 8, 4);
  const zoom = 1.07 - 0.07 * p(l, 0, 25, E.out);

  return (
    <AbsoluteFill style={{ background: c.bg, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${(1 - whip) * 1500 + sh.x}px, ${sh.y}px) scale(${zoom})`,
          filter: whip < 1 ? `blur(${(1 - whip) * 22}px)` : undefined,
        }}
      >
        <div style={{ position: 'absolute', right: 40, top: -40, fontFamily: sans, fontWeight: 800, fontSize: 700, letterSpacing: '-0.06em', color: c.fg, opacity: 0.07, lineHeight: 1 }}>{c.n}</div>
        <div style={{ position: 'absolute', left: 120, top: 120, fontFamily: mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.32em', color: c.fg }}>
          FITUR {c.n} / 06
        </div>
        <div style={{ position: 'absolute', left: 120, top: 330, display: 'flex', alignItems: 'center', gap: 56 }}>
          <div style={{ width: 230, height: 230, borderRadius: 60, background: c.fg === '#FFFFFF' ? 'rgba(255,255,255,0.12)' : 'rgba(10,61,38,0.1)', border: `3px solid ${c.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${(1 - p(l, 0, 12, E.back)) * -18}deg) scale(${0.6 + 0.4 * p(l, 0, 12, E.back)})` }}>
            <Icon name={c.icon} size={130} color={c.fg === '#FFFFFF' ? T.lime : c.accent === T.lime ? T.lime : T.canopy} stroke={1.8} />
          </div>
          <div>
            <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 124, letterSpacing: '-0.05em', color: c.fg, lineHeight: 1.02, maxWidth: 1200 }}>{c.title}</div>
            <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 36, color: c.fg, opacity: 0.78 * p(l, 6, 16), marginTop: 18 }}>{c.sub}</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 120, bottom: 150, display: 'flex', gap: 14 }}>
          {CUTS.map((_, k) => (
            <div key={k} style={{ width: k === i ? 90 : 22, height: 14, borderRadius: 7, background: k <= i ? c.fg : 'transparent', border: `2px solid ${c.fg}`, opacity: k <= i ? 1 : 0.4 }} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ═════════ S9 · Outro rhmt ofc ═════════ */
export const SceneOutro: React.FC = () => {
  const f = useCurrentFrame();
  const photo = p(f, 8, 34, E.back);
  const click = p(f, 150, 154, E.lin) * (1 - p(f, 154, 166, E.lin));
  const stack = ['Next.js 16 (Turbopack)', 'SQLite Database', 'Remotion 4 Engine', 'Tailwind CSS'];

  return (
    <AbsoluteFill style={{ background: T.bg }}>
      <AbsoluteFill style={{ backgroundImage: 'radial-gradient(rgba(10,61,38,0.09) 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} />
      <div style={{ position: 'absolute', left: 560, top: -200, width: 900, height: 900, borderRadius: 999, background: 'radial-gradient(circle, rgba(163,230,53,0.22), transparent 70%)', filter: 'blur(70px)' }} />

      {Array.from({ length: 36 }).map((_, i) => {
        const t = f - 20 - random(`d${i}`) * 40;
        if (t < 0) return null;
        const x = random(`cx${i}`) * 1920;
        const y = -60 + t * (3 + random(`cs${i}`) * 5);
        if (y > 1140) return null;
        return <div key={i} style={{ position: 'absolute', left: x + Math.sin(t * 0.1 + i) * 30, top: y, width: 12, height: 22, borderRadius: 3, background: i % 3 === 0 ? T.canopy : T.lime, transform: `rotate(${t * (4 + i % 5)}deg)`, opacity: 0.85 }} />;
      })}

      <div style={{ position: 'absolute', left: 250, top: 270, width: 480, height: 480, transform: `scale(${photo})`, opacity: Math.min(1, photo * 1.5) }}>
        <div style={{ position: 'absolute', inset: -26, borderRadius: 999, border: `3px dashed ${T.canopy}`, opacity: 0.35, transform: `rotate(${f * 0.8}deg)` }} />
        <div style={{ position: 'absolute', inset: -12, borderRadius: 999, border: `4px solid ${T.lime}` }} />
        <Img src={staticFile('assets/erekap/pp-dev.webp')} style={{ width: 480, height: 480, borderRadius: 999, objectFit: 'cover', boxShadow: '0 40px 80px -20px rgba(10,61,38,0.4)' }} />
        <div style={{ position: 'absolute', right: 6, bottom: 20, width: 84, height: 84, borderRadius: 999, background: T.lime, border: '6px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p(f, 30, 44, E.back)})` }}>
          <Icon name="check" size={46} color={T.canopyDeep} stroke={3.4} />
        </div>
      </div>

      <div style={{ position: 'absolute', left: 860, top: 230 }}>
        <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 18, letterSpacing: '0.34em', color: T.inkMuted, opacity: p(f, 20, 34) }}>DIKEMBANGKAN OLEH</div>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 118, letterSpacing: '-0.05em', color: T.canopy, lineHeight: 1.02, marginTop: 10 }}>
          {'Rohmatulloh'.split('').map((ch, i) => {
            const q = p(f, 26 + i * 1.6, 42 + i * 1.6, E.out);
            return <span key={i} style={{ display: 'inline-block', opacity: q, transform: `translateY(${(1 - q) * 70}px)`, filter: `blur(${(1 - q) * 8}px)` }}>{ch}</span>;
          })}
        </div>
        <div style={{ fontFamily: sans, fontWeight: 800, fontSize: 52, letterSpacing: '-0.03em', color: '#15803D', marginTop: 4, opacity: p(f, 50, 66), transform: `translateX(${(1 - p(f, 50, 70)) * 40}px)` }}>
          · rhmt ofc
        </div>
        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 26, color: T.inkMuted, marginTop: 14, opacity: p(f, 62, 78) }}>Portfolio: rhmt.biz.id · E-Rekap v1.0</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 38, width: 900 }}>
          {stack.map((s, i) => {
            const q = p(f, 80 + i * 8, 100 + i * 8, E.back);
            return (
              <span key={s} style={{ padding: '12px 22px', borderRadius: 16, background: i === 0 ? T.canopy : '#fff', color: i === 0 ? T.lime : T.canopy, border: '1.5px solid rgba(10,61,38,0.14)', boxShadow: T.shadowCard, fontFamily: sans, fontWeight: 800, fontSize: 22, opacity: Math.min(1, q * 1.5), transform: `translateY(${(1 - q) * 30}px) scale(${0.9 + 0.1 * q})` }}>
                {s}
              </span>
            );
          })}
        </div>

        <div style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 14, padding: '20px 44px', borderRadius: 999, background: T.canopy, color: T.lime, fontFamily: sans, fontWeight: 800, fontSize: 30, boxShadow: `0 ${16 + click * 8}px 36px -8px rgba(10,61,38,0.5), 0 0 ${click * 40}px rgba(163,230,53,0.7)`, opacity: p(f, 118, 136), transform: `translateY(${(1 - p(f, 118, 140, E.back)) * 30}px) scale(${1 - click * 0.05})` }}>
          Kunjungi rhmt.biz.id/xiiclass
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={T.lime} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
