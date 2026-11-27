import React from 'react';
import {Img} from 'remotion';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {Check, Confetti, Cursor, ElainaLogo, KText, SceneShell, Serif, Sfx, img, useSF} from '../kit';

export const S7: React.FC = () => {
  const f = useSF();
  const logoIn = pop(f, 6, 13, 140);
  const phoneIn = pop(f, 22, 14, 125);
  const clicked = f >= 186;
  const btnPop = pop(f, 186, 10, 210);
  const phoneScroll = ramp(f, 70, 260, 0, -40);

  return (
    <SceneShell variant="zoom" accent={L.blue} tone={{a: 'rgba(37,99,235,0.20)', b: 'rgba(16,185,129,0.16)'}}>
      <Sfx at={-8} file="whoosh" vol={0.5} />
      <Sfx at={8} file="pop" vol={0.38} />
      <Sfx at={186} file="click" vol={0.55} />
      <Sfx at={190} file="success" vol={0.6} />
      <Confetti at={192} x={560} y={540} count={85} power={24} />

      {/* Left / Center Hero CTA */}
      <div style={{position: 'absolute', left: 110, top: 88, width: 1020}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, padding: '10px 22px', borderRadius: 999, background: '#fff', border: '1.5px solid rgba(37,99,235,0.24)', boxShadow: L.shadow, fontFamily: MONO, fontSize: 16, fontWeight: 800, color: L.blue, opacity: clamp(logoIn * 2), transform: `translateY(${(1 - logoIn) * 20}px)`}}>
          <ElainaLogo s={30} radius={8} />
          ELAINA CLOUD · PANEL PTERODACTYL
        </div>

        <KText
          at={14}
          stagger={4}
          words={[
            {t: 'Bot'},
            {t: 'Online'},
            {t: '24 Jam'},
            {t: 'Tanpa', style: {...Serif, color: L.blue, fontSize: 104}},
            {t: 'Mahal!', style: {...Serif, color: L.emerald, fontSize: 104}},
          ]}
          style={{fontSize: 88, fontWeight: 800, color: L.text, letterSpacing: '-0.04em', lineHeight: 1.04, marginTop: 22}}
        />

        <div style={{fontFamily: SANS, fontSize: 30, fontWeight: 500, color: L.sub, marginTop: 22, lineHeight: 1.4, opacity: ramp(f, 44, 66)}}>
          Daftar gratis sekarang, klaim <strong style={{color: L.green}}>Trial Panel 3 Hari</strong>, atau lanjut paket <strong style={{color: L.blue}}>Rp 5.000/bulan</strong>.
        </div>

        {/* Glowing URL + CTA Button Row */}
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 44, opacity: ramp(f, 70, 92), transform: `translateY(${(1 - ramp(f, 70, 92)) * 24}px)`}}>
          <div style={{padding: '22px 34px', borderRadius: 24, background: '#0F172A', color: '#fff', fontFamily: MONO, fontSize: 32, fontWeight: 800, boxShadow: L.shadowLg, display: 'flex', alignItems: 'center', gap: 14}}>
            <span style={{width: 12, height: 12, borderRadius: 6, background: '#34D399'}} />
            elainacloud.my.id
          </div>

          <div
            style={{
              padding: '24px 36px',
              borderRadius: 24,
              background: clicked ? L.emerald : `linear-gradient(135deg, ${L.blue}, #1D4ED8)`,
              color: '#fff',
              fontFamily: SANS,
              fontSize: 28,
              fontWeight: 800,
              boxShadow: '0 20px 50px rgba(37,99,235,0.36)',
              transform: `scale(${clicked ? 1 + (1 - btnPop) * -0.05 : 1})`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {clicked ? (<><Check s={28} /> Trial Panel Diklaim!</>) : 'Klaim Trial Gratis 3 Hari →'}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{display: 'flex', gap: 20, marginTop: 34, fontFamily: MONO, fontSize: 16, fontWeight: 700, color: L.muted, opacity: ramp(f, 100, 125)}}>
          <span>✓ Aktivasi &lt; 30 detik</span>
          <span>✓ Anti-DDoS & SFTP</span>
          <span>✓ QRIS & BCA 24/7</span>
        </div>
      </div>

      {/* Right: Floating iPhone Mockup with Mobile Panel Screenshot */}
      <div style={{position: 'absolute', right: 130, top: 28, width: 382, height: 760, opacity: clamp(phoneIn * 2), transform: `translateY(${(1 - phoneIn) * 120 + Math.sin(f / 20) * 6}px) rotate(${3 - (1 - phoneIn) * 8}deg)`}}>
        <div style={{width: 382, height: 760, borderRadius: 58, background: '#0F172A', padding: 12, boxShadow: '0 46px 100px rgba(15,23,42,0.34), inset 0 0 0 3px #334155'}}>
          <div style={{position: 'relative', width: 358, height: 736, borderRadius: 46, overflow: 'hidden', background: '#F8FAFC'}}>
            <Img
              src={img('screenshots/panel_mobile_top.png')}
              style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: `translateY(${phoneScroll}px)`}}
            />
          </div>
        </div>
      </div>

      <Cursor path={[{f: 130, x: 860, y: 690}, {f: 184, x: 750, y: 540}]} clicks={[186]} />
    </SceneShell>
  );
};
