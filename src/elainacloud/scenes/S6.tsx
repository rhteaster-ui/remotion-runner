import React from 'react';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {BoltIcon, Check, Confetti, Cursor, KText, QrisIcon, SceneShell, Serif, Sfx, useSF} from '../kit';

const STEPS = [
  {
    no: '01',
    at: 14,
    x: 110,
    title: 'Daftar Akun Gratis',
    desc: 'Buat akun member tanpa biaya pendaftaran dalam hitungan detik.',
    badge: 'GRATIS DAFTAR',
    color: L.blue,
  },
  {
    no: '02',
    at: 78,
    x: 690,
    title: 'Isi Saldo QRIS / BCA',
    desc: 'Otomatis 24/7 via Dana, GoPay, OVO, ShopeePay, atau Transfer BCA.',
    badge: 'OTOMATIS 24 JAM',
    color: L.emerald,
  },
  {
    no: '03',
    at: 148,
    x: 1270,
    title: 'Deploy & Online!',
    desc: 'Pilih paket panel botmu, klik deploy, dan server langsung aktif < 30 detik.',
    badge: 'AKTIF < 30 DETIK',
    color: L.violet,
  },
];

export const S6: React.FC = () => {
  const f = useSF();
  const beam1 = ramp(f, 44, 82);
  const beam2 = ramp(f, 110, 148);
  const deployed = f >= 218;
  const btnPop = pop(f, 218, 11, 190);
  const trav1 = (f * 0.035) % 1;
  const trav2 = (f * 0.035 + 0.4) % 1;

  return (
    <SceneShell variant="doors" accent={L.emerald} tone={{a: 'rgba(16,185,129,0.18)', b: 'rgba(37,99,235,0.15)'}}>
      <Sfx at={-8} file="whoosh" vol={0.48} />
      <Sfx at={16} file="pop" vol={0.35} />
      <Sfx at={80} file="pop" vol={0.35} />
      <Sfx at={150} file="pop" vol={0.35} />
      <Sfx at={218} file="click" vol={0.5} />
      <Sfx at={222} file="success" vol={0.55} />
      <Confetti at={224} x={1540} y={460} count={70} power={22} />

      {/* Header */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 26, textAlign: 'center'}}>
        <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.green, letterSpacing: '0.14em', marginBottom: 8}}>
          PANDUAN PRAKTIS CARA MEMULAI
        </div>
        <KText
          at={4}
          stagger={4}
          words={[
            {t: '3'},
            {t: 'Langkah'},
            {t: 'Langsung'},
            {t: 'Online', style: {...Serif, color: L.green, fontSize: 72}},
          ]}
          style={{fontSize: 60, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', lineHeight: 1.05}}
        />
      </div>

      {/* Traveling SVG Connector Beams between the 3 cards */}
      <svg style={{position: 'absolute', left: 0, top: 340, pointerEvents: 'none'}} width={1920} height={80}>
        <line x1={640} y1={40} x2={690} y2={40} stroke={beam1 > 0 ? L.blue : '#CBD5E1'} strokeWidth={6} strokeLinecap="round" strokeDasharray="3 12" strokeDashoffset={-f * 2} />
        {beam1 > 0.2 && <circle cx={640 + 50 * trav1} cy={40} r={8} fill={L.cyan} />}
        <line x1={1220} y1={40} x2={1270} y2={40} stroke={beam2 > 0 ? L.emerald : '#CBD5E1'} strokeWidth={6} strokeLinecap="round" strokeDasharray="3 12" strokeDashoffset={-f * 2} />
        {beam2 > 0.2 && <circle cx={1220 + 50 * trav2} cy={40} r={8} fill={L.emerald} />}
      </svg>

      {/* 3 Stepper Cards */}
      {STEPS.map((st, idx) => {
        const s = pop(f, st.at, 13, 145);
        return (
          <div
            key={st.no}
            style={{
              position: 'absolute',
              left: st.x,
              top: 196,
              width: 530,
              height: 410,
              background: '#fff',
              borderRadius: 30,
              padding: '30px 32px',
              border: `2px solid ${idx === 2 && deployed ? L.emerald : L.border}`,
              boxShadow: L.shadowLg,
              opacity: clamp(s * 2),
              transform: `translateY(${(1 - s) * 55}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: SANS,
            }}
          >
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{width: 58, height: 58, borderRadius: 18, background: st.color, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: MONO, fontSize: 24, fontWeight: 800}}>
                  {st.no}
                </div>
                <span style={{padding: '7px 14px', borderRadius: 999, background: '#F8FAFC', border: `1px solid ${L.border}`, fontFamily: MONO, fontSize: 13, fontWeight: 800, color: st.color}}>
                  {st.badge}
                </span>
              </div>
              <div style={{fontSize: 34, fontWeight: 800, color: L.text, marginTop: 22, letterSpacing: '-0.02em'}}>{st.title}</div>
              <div style={{fontSize: 21, color: L.sub, marginTop: 12, lineHeight: 1.45}}>{st.desc}</div>
            </div>

            {idx === 1 && (
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                {['QRIS', 'Dana', 'GoPay', 'OVO', 'ShopeePay', 'BCA'].map((pay) => (
                  <span key={pay} style={{padding: '6px 12px', borderRadius: 10, background: '#ECFDF5', color: L.green, fontFamily: MONO, fontSize: 14, fontWeight: 800}}>
                    {pay}
                  </span>
                ))}
              </div>
            )}

            {idx === 0 && (
              <div style={{padding: '12px 16px', borderRadius: 14, background: '#EFF6FF', color: L.blue, fontFamily: MONO, fontSize: 15, fontWeight: 700}}>
                ✓ Langsung dapat akses Trial Free 3 Hari
              </div>
            )}

            {idx === 2 && (
              <div style={{height: 58, borderRadius: 16, background: deployed ? L.emerald : L.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: SANS, fontSize: 20, fontWeight: 800, transform: `scale(${deployed ? 1 + (1 - btnPop) * -0.05 : 1})`}}>
                {deployed ? (<><Check s={22} /> SERVER PANEL AKTIF!</>) : (<><BoltIcon s={20} color="#fff" /> Deploy Server Sekarang</>)}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Payment Trust Strip */}
      <div style={{position: 'absolute', left: 320, right: 320, top: 642, height: 76, background: '#0F172A', borderRadius: 22, padding: '0 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', opacity: ramp(f, 90, 120)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: SANS, fontSize: 20, fontWeight: 700}}>
          <QrisIcon s={26} color="#34D399" />
          Pembayaran Otomatis Masuk Detik Itu Juga — 24 Jam Nonstop
        </div>
        <span style={{fontFamily: MONO, fontSize: 16, color: '#34D399', fontWeight: 800}}>STATUS: INSTANT</span>
      </div>

      <Cursor path={[{f: 170, x: 1620, y: 660}, {f: 215, x: 1535, y: 550}]} clicks={[218]} />
    </SceneShell>
  );
};
