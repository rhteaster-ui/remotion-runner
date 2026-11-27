import React from 'react';
import {Img} from 'remotion';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {Check, KText, MacWindow, SceneShell, Serif, Sfx, img, useSF} from '../kit';

const SPECS = [
  {at: 28, k: 'PROSESOR NODE', v: 'Intel Xeon Skylake 8-Core', sub: 'Beban stabil 17.5% · Dedicated Panel & Bot', c: L.blue},
  {at: 64, k: 'KAPASITAS & DISK', v: '23.5 GB RAM · 300 GB Disk', sub: 'SMARTNET Germany GmbH (AS203446)', c: L.emerald},
  {at: 102, k: 'LATENSI JARINGAN', v: '2.0 ms Google · 3.3 ms CF', sub: 'Uptime real-time terpantau 24/7', c: L.cyan},
];

export const S5: React.FC = () => {
  const f = useSF();
  const win = pop(f, 8, 14, 125);
  const zoom = f < 130 ? ramp(f, 45, 75, 1, 1.38) : ramp(f, 165, 195, 1.38, 1);
  const oy = ramp(f, 45, 75, 35, 62);

  return (
    <SceneShell variant="soft" accent={L.cyan} tone={{a: 'rgba(6,182,212,0.18)', b: 'rgba(37,99,235,0.14)'}}>
      <Sfx at={-8} file="whoosh" vol={0.48} />
      <Sfx at={12} file="progress" vol={0.28} />
      {SPECS.map((s) => (
        <Sfx key={s.k} at={s.at} file="pop" vol={0.35} dur={16} />
      ))}
      <Sfx at={135} file="ding" vol={0.45} />

      {/* Header */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.blue, letterSpacing: '0.12em', marginBottom: 6}}>
            INFRASTRUKTUR & TELEMETRI REAL-TIME
          </div>
          <KText
            at={4}
            stagger={4}
            words={[
              {t: 'Node'},
              {t: 'Khusus'},
              {t: 'Frankfurt', style: {...Serif, color: L.blue, fontSize: 70}},
            ]}
            style={{fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', lineHeight: 1.05}}
          />
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 20px', borderRadius: 16, border: `1px solid ${L.border}`, boxShadow: L.shadow}}>
          <Img src={img('brand/de.png')} style={{width: 34, height: 22, borderRadius: 4, objectFit: 'cover'}} />
          <div style={{fontFamily: MONO, fontSize: 15}}>
            <div style={{fontWeight: 800, color: L.text}}>Frankfurt am Main, DE</div>
            <div style={{color: L.green, fontWeight: 700}}>● Untuk Panel dan Bot 24/7</div>
          </div>
        </div>
      </div>

      {/* Left: Real Frankfurt Status Screenshot */}
      <div style={{position: 'absolute', left: 80, top: 184, width: 1020, height: 550, perspective: 1400}}>
        <MacWindow
          title="Safari — https://elainacloud.my.id/status (Node Frankfurt)"
          style={{height: '100%', opacity: clamp(win * 2), transform: `translateY(${(1 - win) * 44}px) rotateY(${(1 - win) * 10}deg)`}}
        >
          <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
            <Img
              src={img('screenshots/status_frankfurt_top.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: `scale(${zoom})`,
                transformOrigin: `50% ${oy}%`,
              }}
            />
          </div>
        </MacWindow>
      </div>

      {/* Right: Node Telemetry Spec Cards */}
      <div style={{position: 'absolute', right: 80, top: 184, width: 700, display: 'flex', flexDirection: 'column', gap: 20}}>
        {SPECS.map((sp) => {
          const s = pop(f, sp.at, 13, 145);
          return (
            <div key={sp.k} style={{background: '#fff', borderRadius: 26, padding: '24px 28px', border: `1px solid ${L.border}`, boxShadow: L.shadow, opacity: clamp(s * 2), transform: `translateX(${(1 - s) * 80}px)`}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: MONO, fontSize: 13, fontWeight: 800, color: sp.c, letterSpacing: '0.08em'}}>{sp.k}</span>
                <Check s={20} color={L.green} />
              </div>
              <div style={{fontFamily: SANS, fontSize: 32, fontWeight: 800, color: L.text, marginTop: 6}}>{sp.v}</div>
              <div style={{fontFamily: MONO, fontSize: 15, color: L.muted, marginTop: 6}}>{sp.sub}</div>
            </div>
          );
        })}

        {/* Live Pulse Indicator Card */}
        <div style={{background: '#0F172A', borderRadius: 24, padding: '20px 26px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: ramp(f, 135, 160)}}>
          <div>
            <div style={{fontFamily: MONO, fontSize: 13, color: '#34D399', fontWeight: 800}}>LIVE HEALTH CHECK</div>
            <div style={{fontFamily: SANS, fontSize: 22, fontWeight: 700, marginTop: 4}}>Panel & Bot Stabil Sepanjang Hari</div>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 5, height: 34}}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} style={{width: 6, height: 10 + Math.abs(Math.sin(f / 4 + i * 0.9)) * 22, borderRadius: 3, background: '#34D399'}} />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
