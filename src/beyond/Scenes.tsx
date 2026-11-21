import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {Scene, T} from './data';
import {HEROES} from './Heroes';
import {ACC, ease} from './util';

const Stars: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill>{Array.from({length: 70}).map((_, i) => <div key={i} style={{position: 'absolute', left: random(`x${i}`) * 1080, top: random(`y${i}`) * 1920, width: 4, height: 4,
    borderRadius: '50%', background: '#fff', opacity: 0.15 + 0.5 * Math.abs(Math.sin(f / 35 + i))}} />)}</AbsoluteFill>;
};
const BIG = {fontWeight: 900, lineHeight: 1.05, textAlign: 'center'} as const;

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Stars />
      <div style={{position: 'absolute', ...BIG, fontSize: 190, color: 'rgba(255,255,255,0.35)', opacity: 1 - ease(f, 150, 190)}}>
        {['PRO', 'FLASH', 'MINI'].map((w, i) => <div key={w} style={{position: 'relative', display: 'inline-block', opacity: ease(f, i * 12, i * 12 + 20)}}>{w}
          <span style={{position: 'absolute', left: -10, top: '54%', height: 16, width: `${ease(f, 60 + i * 15, 90 + i * 15) * 110}%`, background: ACC}} /></div>)}
      </div>
      <div style={{position: 'absolute', ...BIG, fontSize: 190, opacity: ease(f, 170, 200) * (1 - ease(f, 330, 360)), transform: `scale(${0.9 + 0.1 * ease(f, 170, 220)})`}}>OPUS<br />HYDROGEN<br />ASTRA</div>
      <div style={{position: 'absolute', ...BIG, opacity: ease(f, 370, 410)}}>
        <div style={{fontSize: 170}}>BEYOND<br />THE NAMES</div>
        <div style={{height: 10, width: 360, background: ACC, margin: '30px auto'}} />
        <div style={{fontSize: 52, fontWeight: 700}}>The Philosophy Behind Frontier AI</div>
      </div>
    </AbsoluteFill>
  );
};

const Evo: React.FC = () => {
  const f = useCurrentFrame();
  const Chip = ({w, at, on}: {w: string; at: number; on?: boolean}) => <span style={{opacity: ease(f, at, at + 18), fontSize: 76, fontWeight: 900, padding: '8px 32px', borderRadius: 22,
    border: `4px solid ${on ? ACC : 'rgba(255,255,255,0.4)'}`, color: on ? '#fff' : 'rgba(255,255,255,0.6)'}}>{w}</span>;
  return (
    <AbsoluteFill style={{padding: '400px 60px 0', alignItems: 'center'}}>
      <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center'}}>{['Flash', 'Pro', 'Mini'].map((w, i) => <Chip key={w} w={w} at={10 + i * 15} />)}</div>
      <svg width="60" height="220" style={{margin: '30px 0'}}><line x1="30" y1="0" x2="30" y2={ease(f, 100, 180) * 180} stroke={ACC} strokeWidth="10" strokeLinecap="round" />
        <polygon points="6,170 54,170 30,215" fill={ACC} opacity={ease(f, 175, 195)} /></svg>
      <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center'}}>
        {['Astra', 'Sol', 'Luna', 'Hydrogen', 'Carbon', 'Opus', 'Sonnet', 'Haiku'].map((w, i) => <Chip key={w} w={w} at={200 + i * 12} on />)}</div>
    </AbsoluteFill>
  );
};

const Model: React.FC<{s: Scene}> = ({s}) => {
  const f = useCurrentFrame();
  const H = HEROES[s.id];
  const o = ease(f, T, T + 28);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 190, top: 300, width: 700, height: 700, opacity: o, transform: `scale(${0.85 + 0.15 * o})`}}><H f={f} /></div>
      <div style={{position: 'absolute', top: 1030, left: 0, right: 0, ...BIG, opacity: o}}>
        <div style={{fontSize: s.name!.length > 6 ? 150 : 180}}>{s.name}</div>
        <div style={{fontSize: 48, fontWeight: 600, opacity: 0.85, marginTop: 8}}>{s.role}</div>
      </div>
    </AbsoluteFill>
  );
};

const Compare: React.FC = () => {
  const f = useCurrentFrame();
  const R = [['OPENAI', 'KOSMOS', 'Astra › Sol › Terra › Luna', 30], ['DEEPMIND', 'UNSUR', 'Hydrogen · Neon · Argon · Carbon', 170], ['ANTHROPIC', 'SASTRA', 'Haiku › Sonnet › Opus › Fable', 310]] as const;
  return (
    <AbsoluteFill style={{padding: '380px 50px 0', display: 'flex', flexDirection: 'column', gap: 22}}>
      {R.map(([a, b, c, at]) => { const o = ease(f, at, at + 25);
        return <div key={a} style={{opacity: o, transform: `translateX(${(1 - o) * 100}px)`, background: 'rgba(255,255,255,0.07)', borderLeft: `12px solid ${ACC}`, borderRadius: 28, padding: '20px 36px', height: 300}}>
          <div style={{fontSize: 44, fontWeight: 800, color: ACC}}>{a}</div>
          <div style={{fontSize: 130, fontWeight: 900, lineHeight: 1}}>{b}</div>
          <div style={{fontSize: 42, fontWeight: 700, marginTop: 8}}>{c}</div></div>; })}
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <Stars />
      <div style={{position: 'absolute', top: 460, ...BIG, fontSize: 180, opacity: 1 - ease(f, 330, 370)}}>
        {['BINTANG', 'UNSUR', 'SASTRA'].map((w, i) => <div key={w} style={{opacity: ease(f, 40 + i * 90, 70 + i * 90), transform: `translateY(${(1 - ease(f, 40 + i * 90, 70 + i * 90)) * 50}px)`}}>{w}</div>)}</div>
      <div style={{position: 'absolute', top: 540, ...BIG, opacity: ease(f, 370, 420)}}>
        <div style={{fontSize: 160}}>BEYOND<br />THE NAMES</div><div style={{height: 10, width: 360, background: ACC, margin: '30px auto'}} /></div>
    </AbsoluteFill>
  );
};

export const Visual: React.FC<{s: Scene}> = ({s}) =>
  s.id === 'intro' ? <Intro /> : s.id === 'evo' ? <Evo /> : s.id === 'compare' ? <Compare /> : s.id === 'close' ? <Close /> : <Model s={s} />;
