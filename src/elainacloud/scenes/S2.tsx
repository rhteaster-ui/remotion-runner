import React from 'react';
import {Img} from 'remotion';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {BoltIcon, Check, ElainaLogo, KText, MacWindow, SceneShell, Serif, Sfx, img, useSF} from '../kit';

export const S2: React.FC = () => {
  const f = useSF();
  const users = Math.round(ramp(f, 16, 75, 0, 1099));
  const servers = Math.round(ramp(f, 40, 100, 0, 63));
  const deployPct = Math.round(ramp(f, 110, 165, 0, 100));
  const deploySec = Math.max(0, Math.round(ramp(f, 110, 165, 29, 18)));

  const c1 = pop(f, 8, 14, 140);
  const c2 = pop(f, 32, 14, 140);
  const c3 = pop(f, 70, 14, 140);
  const win = pop(f, 22, 15, 120);

  return (
    <SceneShell variant="wipe" accent={L.blue} tone={{a: 'rgba(37,99,235,0.16)', b: 'rgba(6,182,212,0.14)'}}>
      <Sfx at={-8} file="whoosh" vol={0.48} />
      <Sfx at={10} file="pop" vol={0.35} />
      <Sfx at={34} file="pop" vol={0.35} />
      <Sfx at={72} file="blip" vol={0.4} />
      <Sfx at={112} file="progress" vol={0.32} />
      <Sfx at={165} file="ding" vol={0.5} />

      {/* Top Headline */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.blue, letterSpacing: '0.12em', marginBottom: 8}}>
            SOCIAL PROOF & KECEPATAN DEPLOY
          </div>
          <KText
            at={4}
            stagger={4}
            words={[
              {t: 'Dipercaya'},
              {t: 'Ribuan'},
              {t: 'Developer', style: {...Serif, color: L.blue, fontSize: 72}},
            ]}
            style={{fontSize: 60, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', lineHeight: 1.05}}
          />
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 20px', borderRadius: 16, border: `1px solid ${L.border}`, boxShadow: L.shadow}}>
          <ElainaLogo s={34} radius={8} />
          <div style={{fontFamily: MONO, fontSize: 15}}>
            <div style={{fontWeight: 800, color: L.text}}>elainacloud.my.id</div>
            <div style={{color: L.green, fontWeight: 700}}>● Live Metrics Terverifikasi</div>
          </div>
        </div>
      </div>

      {/* Left Column: 3 Animated Metric Cards */}
      <div style={{position: 'absolute', left: 80, top: 184, width: 690, display: 'flex', flexDirection: 'column', gap: 20}}>
        {/* Stat 1: 1.099+ Pengguna Aktif */}
        <div style={{background: '#fff', borderRadius: 26, padding: '24px 30px', border: `1px solid ${L.border}`, boxShadow: L.shadow, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: clamp(c1 * 2), transform: `translateX(${(1 - c1) * -60}px)`}}>
          <div>
            <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.blue, letterSpacing: '0.08em'}}>PENGGUNA AKTIF TERDAFTAR</div>
            <div style={{fontFamily: SANS, fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.04em', lineHeight: 1.05, marginTop: 4}}>
              {users.toLocaleString('id-ID')}+
            </div>
          </div>
          <div style={{padding: '10px 18px', borderRadius: 999, background: '#EFF6FF', color: L.blue, fontFamily: MONO, fontSize: 15, fontWeight: 800}}>
            TERPERCAYA
          </div>
        </div>

        {/* Stat 2: 63+ Server Deployed 24/7 */}
        <div style={{background: '#fff', borderRadius: 26, padding: '24px 30px', border: `1px solid ${L.border}`, boxShadow: L.shadow, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: clamp(c2 * 2), transform: `translateX(${(1 - c2) * -60}px)`}}>
          <div>
            <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: L.green, letterSpacing: '0.08em'}}>SERVER DEPLOYED 24/7</div>
            <div style={{fontFamily: SANS, fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.04em', lineHeight: 1.05, marginTop: 4}}>
              {servers}+ <span style={{fontSize: 26, color: L.muted, fontWeight: 700}}>Active Containers</span>
            </div>
          </div>
          <div style={{width: 52, height: 52, borderRadius: 16, background: 'rgba(16,185,129,0.14)', display: 'grid', placeItems: 'center'}}>
            <Check s={28} color={L.green} />
          </div>
        </div>

        {/* Stat 3: < 30s Aktivasi Otomatis */}
        <div style={{background: '#0F172A', borderRadius: 26, padding: '24px 30px', boxShadow: L.shadowLg, color: '#fff', opacity: clamp(c3 * 2), transform: `translateX(${(1 - c3) * -60}px)`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 800, color: '#38BDF8', letterSpacing: '0.08em'}}>PROSES AKTIVASI OTOMATIS</div>
              <div style={{fontFamily: SANS, fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4}}>
                &lt; 30 Detik <span style={{fontSize: 20, color: '#34D399', fontFamily: MONO}}>({deployPct === 100 ? `DONE ${deploySec}s` : `${deployPct}%`})</span>
              </div>
            </div>
            <div style={{width: 52, height: 52, borderRadius: 16, background: 'rgba(56,189,248,0.18)', display: 'grid', placeItems: 'center'}}>
              <BoltIcon s={28} color="#FBBF24" />
            </div>
          </div>
          <div style={{height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.14)', marginTop: 16, overflow: 'hidden'}}>
            <div style={{width: `${deployPct}%`, height: '100%', borderRadius: 6, background: 'linear-gradient(90deg, #38BDF8, #34D399)'}} />
          </div>
        </div>
      </div>

      {/* Right Column: Real Homepage Screenshot inside 3D MacWindow */}
      <div style={{position: 'absolute', right: 80, top: 184, width: 1020, height: 560, perspective: 1500}}>
        <MacWindow
          title="Safari — https://elainacloud.my.id"
          style={{height: '100%', opacity: clamp(win * 2), transform: `translateY(${(1 - win) * 44}px) rotateY(${(1 - win) * -12}deg)`}}
        >
          <Img
            src={img('screenshots/home_desktop_top.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: `scale(${1 + Math.sin(f / 40) * 0.015})`}}
          />
        </MacWindow>
      </div>
    </SceneShell>
  );
};
