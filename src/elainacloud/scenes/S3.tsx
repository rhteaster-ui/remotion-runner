import React from 'react';
import {Img} from 'remotion';
import storyboard from '../../data/elainacloud-storyboard.json';
import {L, MONO, SANS, clamp, pop, ramp} from '../theme';
import {Check, Cursor, KText, MacWindow, SceneShell, Serif, Sfx, img, useSF} from '../kit';

const TIERS = storyboard.pricing.panelPterodactyl;

export const S3: React.FC = () => {
  const f = useSF();
  const trackShift = ramp(f, 95, 210, 0, -560);
  const browserIn = pop(f, 18, 15, 130);
  const elaina5Glow = f >= 205;

  return (
    <SceneShell variant="iris" accent={L.blue} tone={{a: 'rgba(37,99,235,0.18)', b: 'rgba(16,185,129,0.15)'}}>
      <Sfx at={-8} file="whoosh" vol={0.48} />
      <Sfx at={14} file="pop" vol={0.35} />
      <Sfx at={95} file="whoosh_short" vol={0.35} />
      <Sfx at={135} file="click" vol={0.4} />
      <Sfx at={215} file="ding" vol={0.4} />

      {/* Header */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <div>
          <div style={{fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.blue, letterSpacing: '0.12em', marginBottom: 6}}>
            PILIHAN PAKET & TRANSPARANSI HARGA
          </div>
          <KText
            at={4}
            stagger={4}
            words={[
              {t: 'Panel'},
              {t: 'Pterodactyl'},
              {t: 'Mulai'},
              {t: 'Rp 5.000', style: {...Serif, color: L.blue, fontSize: 70}},
            ]}
            style={{fontSize: 58, fontWeight: 800, color: L.text, letterSpacing: '-0.03em', lineHeight: 1.05}}
          />
        </div>
        <div style={{padding: '10px 20px', borderRadius: 999, background: '#ECFDF5', border: '1.5px solid rgba(16,185,129,0.3)', fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.green}}>
          TRIAL FREE 512 MB · GRATIS 3 HARI
        </div>
      </div>

      {/* Top Row: Sliding 6 Tier Pricing Cards */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 170, height: 295, overflow: 'hidden'}}>
        <div style={{display: 'flex', gap: 22, transform: `translateX(${trackShift}px)`}}>
          {TIERS.map((tier, i) => {
            const s = pop(f, 10 + i * 9, 13, 150);
            const isPopular = tier.name === 'Elaina 1';
            const isMax = tier.name === 'Elaina 5';
            const highlight = isPopular || (isMax && elaina5Glow);
            return (
              <div
                key={tier.name}
                style={{
                  width: 365,
                  flexShrink: 0,
                  background: isPopular ? 'linear-gradient(150deg, #2563EB, #1D4ED8)' : '#FFFFFF',
                  color: isPopular ? '#FFFFFF' : L.text,
                  borderRadius: 26,
                  padding: '22px 24px',
                  border: highlight ? `2.5px solid ${isMax ? L.emerald : '#60A5FA'}` : `1px solid ${L.border}`,
                  boxShadow: highlight ? L.shadowLg : L.shadow,
                  opacity: clamp(s * 2),
                  transform: `translateY(${(1 - s) * 36}px) scale(${isMax && elaina5Glow ? 1.03 : 1})`,
                  fontFamily: SANS,
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontFamily: MONO, fontSize: 13, fontWeight: 800, color: isPopular ? '#BAE6FD' : L.blue}}>
                    {tier.badge || 'PTERODACTYL'}
                  </span>
                  <span style={{fontFamily: MONO, fontSize: 13, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: isPopular ? 'rgba(255,255,255,0.18)' : '#F1F5F9', color: isPopular ? '#fff' : L.sub}}>
                    {tier.ram}
                  </span>
                </div>
                <div style={{fontSize: 28, fontWeight: 800, marginTop: 10}}>{tier.name}</div>
                <div style={{display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8}}>
                  <span style={{fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em'}}>{tier.price}</span>
                  <span style={{fontSize: 16, opacity: 0.78}}>{tier.period}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: `1px solid ${isPopular ? 'rgba(255,255,255,0.2)' : L.border}`, fontFamily: MONO, fontSize: 14, opacity: 0.9}}>
                  <span>CPU {tier.cpu}</span>
                  <span>{tier.ssd} SSD</span>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: 4}}>
                    <Check s={14} color={isPopular ? '#6EE7B7' : L.green} /> Anti-DDoS
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom: Real Pricing Panel Screenshot Preview */}
      <div style={{position: 'absolute', left: 160, right: 160, top: 486, height: 266, perspective: 1400}}>
        <MacWindow
          title="Safari — elainacloud.my.id · Perbandingan Paket Panel"
          style={{height: '100%', opacity: clamp(browserIn * 2), transform: `translateY(${(1 - browserIn) * 40}px)`}}
        >
          <Img
            src={img('screenshots/home_pricing_panel.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%'}}
          />
        </MacWindow>
      </div>

      <Cursor path={[{f: 80, x: 580, y: 360}, {f: 135, x: 650, y: 295}, {f: 215, x: 1480, y: 295}]} clicks={[135]} />
    </SceneShell>
  );
};
