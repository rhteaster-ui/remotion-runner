import React from 'react';
import {Img} from 'remotion';
import {L, MONO, SANS, clamp, pad2, pop, ramp} from '../theme';
import {BoltIcon, Check, Chip, ElainaLogo, KText, MacWindow, SceneShell, Serif, Sfx, img, useSF} from '../kit';

export const S1: React.FC = () => {
  const f = useSF();
  const sL = pop(f, 4, 14, 130);
  const sR = pop(f, 16, 14, 125);
  const painShake = f < 135 ? Math.sin(f * 1.4) * 3 : 0;
  const phaseB = ramp(f, 135, 165);
  const winIn = pop(f, 148, 14, 120);
  const uptime = Math.max(0, f - 150) * 41;
  const hh = Math.floor(uptime / 3600) % 24;
  const mm = Math.floor(uptime / 60) % 60;
  const ss = Math.floor(uptime) % 60;

  return (
    <SceneShell variant="none" tone={{a: 'rgba(37,99,235,0.18)', b: 'rgba(16,185,129,0.14)'}}>
      <Sfx at={2} file="whoosh" vol={0.45} />
      <Sfx at={14} file="impact" vol={0.28} />
      <Sfx at={140} file="whoosh_short" vol={0.42} />
      <Sfx at={156} file="pop" vol={0.45} />
      <Sfx at={225} file="ding" vol={0.35} />
      <Sfx at={295} file="pop" vol={0.45} />

      {/* Clean white fade-in */}
      <div style={{position: 'absolute', left: 0, top: -60, width: 1920, height: 1080, background: '#fff', opacity: ramp(f, 0, 14, 1, 0), zIndex: 90}} />

      {/* Left Headline Column */}
      <div style={{position: 'absolute', left: 84, top: 68, width: 780}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 999, background: '#fff', border: '1.5px solid rgba(37,99,235,0.22)', boxShadow: '0 10px 28px rgba(37,99,235,0.12)', fontFamily: MONO, fontSize: 15, fontWeight: 800, color: L.blue, letterSpacing: '0.08em', opacity: sL, transform: `translateY(${(1 - sL) * 16}px)`}}>
          <ElainaLogo s={26} radius={7} />
          PANEL PTERODACTYL 24/7 · ELAINA CLOUD
        </div>

        <KText
          at={10}
          stagger={4}
          words={[
            {t: 'Bot'},
            {t: 'WhatsApp'},
            {t: 'sering'},
            {t: 'mati?', style: {...Serif, color: L.red, fontSize: 92}},
          ]}
          style={{fontSize: 78, fontWeight: 800, color: L.text, lineHeight: 1.05, letterSpacing: '-0.035em', marginTop: 22}}
        />

        <div style={{fontFamily: SANS, fontSize: 28, fontWeight: 500, color: L.sub, marginTop: 18, lineHeight: 1.4, opacity: ramp(f, 36, 56), transform: `translateY(${(1 - ramp(f, 36, 56)) * 16}px)`}}>
          Pindah ke <strong style={{color: L.blue}}>Panel Elaina Cloud</strong> — server bot 24 jam nonstop, anti lemot, dan siap jalan dalam hitungan detik.
        </div>

        {/* 2 Hero Offer Cards (Trial Free & Rp 5.000) */}
        <div style={{display: 'flex', gap: 20, marginTop: 34}}>
          <div style={{flex: 1, background: '#fff', borderRadius: 24, padding: '22px 24px', border: `2px solid ${L.emerald}`, boxShadow: L.shadow, opacity: clamp(pop(f, 160, 13, 150) * 2), transform: `translateY(${(1 - pop(f, 160, 13, 150)) * 28}px)`}}>
            <div style={{fontFamily: MONO, fontSize: 13, fontWeight: 800, color: L.green, letterSpacing: '0.08em'}}>COBA DULU</div>
            <div style={{fontFamily: SANS, fontSize: 40, fontWeight: 800, color: L.text, marginTop: 4}}>Gratis 3 Hari</div>
            <div style={{fontFamily: MONO, fontSize: 15, color: L.muted, marginTop: 4}}>512 MB RAM · Trial Free</div>
          </div>

          <div style={{flex: 1, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 24, padding: '22px 24px', boxShadow: '0 22px 50px rgba(37,99,235,0.28)', color: '#fff', opacity: clamp(pop(f, 200, 13, 150) * 2), transform: `translateY(${(1 - pop(f, 200, 13, 150)) * 28}px)`}}>
            <div style={{fontFamily: MONO, fontSize: 13, fontWeight: 800, color: '#BAE6FD', letterSpacing: '0.08em'}}>PAKET POPULER</div>
            <div style={{fontFamily: SANS, fontSize: 40, fontWeight: 800, marginTop: 4}}>Rp 5.000<span style={{fontSize: 18, fontWeight: 600, opacity: 0.85}}>/bln</span></div>
            <div style={{fontFamily: MONO, fontSize: 15, color: '#E0F2FE', marginTop: 4}}>Elaina 1 · 1 GB RAM · SSD</div>
          </div>
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26}}>
          {['Baileys WA', 'Discord Bot', 'Anti-DDoS', 'Uptime 99.9%'].map((t, i) => {
            const s = pop(f, 70 + i * 7, 14, 160);
            return (
              <Chip key={t} style={{opacity: clamp(s * 2), transform: `scale(${0.75 + 0.25 * s})`}}>
                <Check s={16} color={L.green} /> {t}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Right Stage: Phase A Pain Card -> Phase B Real Panel Window */}
      <div style={{position: 'absolute', right: 80, top: 64, width: 920, height: 670, perspective: 1500}}>
        {/* Phase A: Server Lemot Card (exits smoothly when phaseB hits 1) */}
        {phaseB < 0.99 && (
          <div style={{position: 'absolute', inset: 40, opacity: sR * (1 - phaseB), transform: `translateX(${painShake + phaseB * 90}px) scale(${1 - phaseB * 0.1})`, background: '#fff', borderRadius: 30, border: '2px solid rgba(220,38,38,0.22)', boxShadow: L.shadowLg, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 56, height: 56, borderRadius: 18, background: 'rgba(220,38,38,0.1)', display: 'grid', placeItems: 'center'}}>
                  <Img src={img('tools/whatsapp.svg')} style={{width: 30, height: 30}} />
                </div>
                <div>
                  <div style={{fontFamily: SANS, fontSize: 28, fontWeight: 800, color: L.text}}>Hosting Biasa / Gratisan</div>
                  <div style={{fontFamily: MONO, fontSize: 16, color: L.red, fontWeight: 700}}>● CONNECTION LOST · OOM KILLED</div>
                </div>
              </div>
              <span style={{padding: '8px 16px', borderRadius: 999, background: '#FEF2F2', color: L.red, fontFamily: MONO, fontSize: 15, fontWeight: 800}}>ERROR 503</span>
            </div>

            <div style={{background: '#0F172A', borderRadius: 20, padding: 26, fontFamily: MONO, fontSize: 19, color: '#FCA5A5', lineHeight: 1.7}}>
              <div>[Baileys] Connecting to WhatsApp socket...</div>
              <div style={{color: '#FBBF24'}}>[WARN] CPU throttled 99% · RAM Limit Exceeded</div>
              <div style={{color: '#F87171'}}>[ERROR] Process killed (exit code 137) — Bot Offline!</div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: SANS, fontSize: 20, color: L.muted}}>
              <span>Sering restart sendiri & mahal?</span>
              <span style={{color: L.blue, fontWeight: 800}}>Saatnya pindah →</span>
            </div>
          </div>
        )}

        {/* Phase B: Real Elaina Cloud Panel Screenshot in 3D MacWindow */}
        {f >= 135 && (
          <div style={{position: 'absolute', inset: 0, opacity: clamp(winIn * 2), transform: `translateY(${(1 - winIn) * 60}px) rotateY(${(1 - winIn) * -14}deg)`}}>
            <MacWindow title="Safari — https://elainacloud.my.id/panel" style={{height: 640}}>
              <Img
                src={img('screenshots/panel_desktop_top.png')}
                style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: `scale(${1 + Math.sin(f / 45) * 0.015})`}}
              />
            </MacWindow>

            {/* Floating Live 24/7 Uptime Badge */}
            <div style={{position: 'absolute', right: -14, bottom: -6, background: '#fff', borderRadius: 20, padding: '14px 22px', border: `1.5px solid ${L.emerald}`, boxShadow: L.shadowLg, display: 'flex', alignItems: 'center', gap: 12, opacity: ramp(f, 165, 185)}}>
              <div style={{width: 38, height: 38, borderRadius: 12, background: 'rgba(16,185,129,0.14)', display: 'grid', placeItems: 'center'}}>
                <BoltIcon s={22} color={L.green} />
              </div>
              <div>
                <div style={{fontFamily: MONO, fontSize: 12, fontWeight: 800, color: L.green}}>24/7 NONSTOP UPTIME</div>
                <div style={{fontFamily: MONO, fontSize: 20, fontWeight: 800, color: L.text}}>aktif {pad2(hh)}:{pad2(mm)}:{pad2(ss)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SceneShell>
  );
};
