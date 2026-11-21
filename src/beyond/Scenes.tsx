import React from 'react';
import {AbsoluteFill, Img, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SANS, SERIF, Theme, ease} from './util';

// true setelah logo resmi ditaruh di public/logos/{openai,gemini,claude}.svg
const OFFICIAL_LOGOS = false;
const Logo: React.FC<{name: 'openai' | 'gemini' | 'claude'; label: string; color: string}> = ({name, label, color}) =>
  OFFICIAL_LOGOS ? <Img src={staticFile(`logos/${name}.svg`)} style={{height: 80}} /> :
  <div style={{display: 'inline-block', fontWeight: 800, fontSize: 48, color, border: `4px solid ${color}`, borderRadius: 22, padding: '8px 28px'}}>{label}</div>;

const Stars: React.FC<{n?: number}> = ({n = 70}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill>{Array.from({length: n}).map((_, i) => (
    <div key={i} style={{position: 'absolute', left: random(`x${i}`) * 1080, top: random(`y${i}`) * 1920, width: 3 + random(`s${i}`) * 5, height: 3 + random(`s${i}`) * 5,
      borderRadius: '50%', background: '#fff', opacity: 0.2 + 0.6 * Math.abs(Math.sin(f / 35 + i))}} />))}</AbsoluteFill>;
};

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const col = ['#ff3d9a', '#ffd23f', '#4cc9f0'];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Stars />
      <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 200, fontWeight: 900, color: 'rgba(255,255,255,0.35)', opacity: 1 - ease(f, 150, 190)}}>
        {['PRO', 'FLASH', 'MINI'].map((w, i) => (
          <span key={w} style={{position: 'relative', lineHeight: 1.1, opacity: ease(f, i * 12, i * 12 + 20)}}>{w}
            <span style={{position: 'absolute', left: -10, top: '54%', height: 18, width: `${ease(f, 60 + i * 15, 90 + i * 15) * 110}%`, background: '#ffd23f', transform: 'rotate(-3deg)'}} /></span>))}
      </div>
      <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: ease(f, 170, 200) * (1 - ease(f, 330, 360))}}>
        {['OPUS', 'HYDROGEN', 'ASTRA'].map((w, i) => {
          const s = spring({frame: f - 175 - i * 12, fps, config: {damping: 12}});
          return <span key={w} style={{fontSize: w === 'HYDROGEN' ? 170 : 220, fontWeight: 900, lineHeight: 1.1, color: col[i], transform: `scale(${0.5 + 0.5 * s}) rotate(${(1 - s) * -6}deg)`, textShadow: `0 0 60px ${col[i]}99`}}>{w}</span>;
        })}
      </div>
      <div style={{position: 'absolute', textAlign: 'center', opacity: ease(f, 370, 410), transform: `scale(${0.9 + 0.1 * ease(f, 370, 420)})`}}>
        <div style={{fontSize: 170, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(90deg,#ffd23f,#ff3d9a)', WebkitBackgroundClip: 'text', color: 'transparent'}}>BEYOND<br />THE<br />NAMES</div>
        <div style={{marginTop: 30, fontSize: 52, fontWeight: 700}}>The Philosophy Behind Frontier AI</div>
      </div>
    </AbsoluteFill>
  );
};

const Chip: React.FC<{w: string; at: number; bg: string; fg?: string}> = ({w, at, bg, fg = '#0b1026'}) => {
  const f = useCurrentFrame(); const o = ease(f, at, at + 18);
  return <span style={{opacity: o, transform: `translateY(${(1 - o) * 30}px) scale(${0.9 + 0.1 * o})`, fontWeight: 900, fontSize: 80, padding: '8px 36px', borderRadius: 24, background: bg, color: fg, display: 'inline-block'}}>{w}</span>;
};
const Evo: React.FC = () => {
  const f = useCurrentFrame();
  const C = ['#ff3d9a', '#ffd23f', '#4cc9f0', '#7bf1a8', '#ff9f1c', '#b388ff', '#ff5d73', '#00f5d4'];
  return (
    <AbsoluteFill style={{padding: '420px 60px 0', alignItems: 'center'}}>
      <div style={{fontSize: 56, fontWeight: 800, color: '#9bb4e6'}}>FUNGSI</div>
      <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20}}>
        {['Flash', 'Pro', 'Mini'].map((w, i) => <Chip key={w} w={w} at={10 + i * 15} bg="#33405f" fg="#d6e2ff" />)}
      </div>
      <svg width="60" height="220" style={{margin: '30px 0'}}>
        <line x1="30" y1="0" x2="30" y2={ease(f, 120, 200) * 180} stroke="#4cc9f0" strokeWidth="10" strokeLinecap="round" />
        <polygon points="6,170 54,170 30,215" fill="#4cc9f0" opacity={ease(f, 195, 215)} />
      </svg>
      <div style={{fontSize: 56, fontWeight: 800, color: '#4cc9f0', opacity: ease(f, 200, 220)}}>IDENTITAS</div>
      <div style={{display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20}}>
        {['Astra', 'Sol', 'Luna', 'Hydrogen', 'Carbon', 'Opus', 'Sonnet', 'Haiku'].map((w, i) => <Chip key={w} w={w} at={230 + i * 14} bg={C[i]} />)}
      </div>
    </AbsoluteFill>
  );
};

const Orbit: React.FC = () => {
  const f = useCurrentFrame();
  const a = f / 70, cx = 540, cy = 700;
  const t = {x: cx + Math.cos(a) * 230, y: cy + Math.sin(a) * 230};
  const l = {x: t.x + Math.cos(a * 4) * 80, y: t.y + Math.sin(a * 4) * 80};
  const L = [['ASTRA', 'Bintang · kelas teratas', '#ffffff', 40, 200], ['SOL', 'Matahari · seimbang', '#ffb703', 200, 340], ['TERRA', 'Bumi · kerja harian', '#38bdf8', 340, 450], ['LUNA', 'Bulan · cepat & hemat', '#e5e7eb', 450, 9999]] as const;
  const act = L.find((x) => f >= x[3] && f < x[4]) ?? L[0];
  return (
    <AbsoluteFill>
      <Stars n={90} />
      <svg width="1080" height="1920" style={{position: 'absolute'}}>
        <circle cx={cx} cy={cy} r="230" fill="none" stroke="#ffffff" strokeOpacity={0.3 * ease(f, 330, 370)} strokeWidth="3" strokeDasharray="8 14" />
        <g transform={`translate(${cx},${cy - 290}) scale(${(0.5 + 0.5 * ease(f, 40, 90)) * (1 + 0.06 * Math.sin(f / 10))})`} opacity={ease(f, 40, 90)}>
          <path d="M0,-100 Q0,0 100,0 Q0,0 0,100 Q0,0 -100,0 Q0,0 0,-100Z" fill="#fff" style={{filter: 'drop-shadow(0 0 30px #fff)'}} />
        </g>
        <defs><radialGradient id="sun"><stop offset="0%" stopColor="#fff7d6" /><stop offset="100%" stopColor="#ff9f1c" /></radialGradient></defs>
        <circle cx={cx} cy={cy} r={95 * ease(f, 190, 250)} fill="url(#sun)" style={{filter: 'drop-shadow(0 0 60px #ff9f1c)'}} />
        <circle cx={t.x} cy={t.y} r={36 * ease(f, 330, 370)} fill="#38bdf8" />
        <circle cx={l.x} cy={l.y} r={16 * ease(f, 440, 480)} fill="#e5e7eb" />
      </svg>
      <div key={act[0]} style={{position: 'absolute', top: 1010, left: 0, right: 0, textAlign: 'center', opacity: ease(f - act[3], 0, 14)}}>
        <div style={{fontSize: 190, fontWeight: 900, lineHeight: 1, color: act[2]}}>{act[0]}</div>
        <div style={{fontSize: 60, fontWeight: 700, marginTop: 6}}>{act[1]}</div>
      </div>
    </AbsoluteFill>
  );
};

const Elements: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const E = [
    {n: 1, s: 'H', name: 'Hydrogen', role: 'Cepat · berulang', c: '#ff5d73', at: 30},
    {n: 10, s: 'Ne', name: 'Neon', role: 'Seimbang · dalam', c: '#ff9f1c', at: 200},
    {n: 18, s: 'Ar', name: 'Argon', role: 'Frontier efisien', c: '#b388ff', at: 350},
    {n: 6, s: 'C', name: 'Carbon', role: 'Masalah terberat', c: '#2ec4b6', at: 500},
  ];
  return (
    <AbsoluteFill style={{padding: '380px 50px 0'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        {E.map((e) => {
          const s = spring({frame: f - e.at, fps, config: {damping: 14}});
          const glow = e.s === 'Ne' ? 30 + 30 * Math.sin(f / 8) : 10;
          return (
            <div key={e.s} style={{height: 450, borderRadius: 32, padding: 28, position: 'relative', background: e.c, color: '#0b1026', opacity: s,
              transform: `scale(${0.8 + 0.2 * s})`, boxShadow: `0 0 ${glow + 20}px ${e.c}`}}>
              <div style={{fontSize: 52, fontWeight: 800}}>{e.n}</div>
              <div style={{fontSize: 210, fontWeight: 900, lineHeight: 0.95}}>{e.s}</div>
              <div style={{position: 'absolute', bottom: 24, left: 28, right: 28}}>
                <div style={{fontSize: 58, fontWeight: 900}}>{e.name}</div>
                <div style={{fontSize: 40, fontWeight: 700}}>{e.role}</div>
              </div>
            </div>);
        })}
      </div>
    </AbsoluteFill>
  );
};

const Art: React.FC = () => {
  const f = useCurrentFrame();
  const ink = '#2b1a10', ac = '#d9480f';
  const Row: React.FC<{name: string; sub: string; at: number; children: React.ReactNode}> = ({name, sub, at, children}) => (
    <div style={{display: 'flex', alignItems: 'center', height: 300, opacity: ease(f, at, at + 25), transform: `translateX(${(1 - ease(f, at, at + 25)) * -80}px)`}}>
      <div style={{width: 470}}>
        <div style={{fontFamily: SERIF, fontSize: 112, fontWeight: 900, fontStyle: 'italic', lineHeight: 1}}>{name}</div>
        <div style={{fontSize: 48, fontWeight: 800, color: ac, marginTop: 8}}>{sub}</div>
      </div>
      <div style={{flex: 1}}>{children}</div>
    </div>);
  return (
    <AbsoluteFill style={{padding: '360px 60px 0', color: ink}}>
      <Row name="Haiku" sub="5 · 7 · 5" at={40}>
        {[5, 7, 5].map((u, i) => <div key={i} style={{height: 26, margin: '0 0 24px', borderRadius: 13, background: i === 1 ? ac : ink, width: u * 70 * ease(f, 60 + i * 20, 100 + i * 20)}} />)}
      </Row>
      <Row name="Sonnet" sub="14 baris" at={200}>
        {Array.from({length: 14}).map((_, i) => <div key={i} style={{height: 10, margin: '0 0 9px', borderRadius: 5, background: i > 7 ? ac : ink, width: 460 * ease(f, 220 + i * 6, 250 + i * 6)}} />)}
      </Row>
      <Row name="Opus" sub="Karya" at={360}>
        <svg width="440" height="180">
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="0" x2={440 * ease(f, 380, 430)} y1={20 + i * 32} y2={20 + i * 32} stroke={ink} strokeWidth="4" />)}
          {Array.from({length: 7}).map((_, i) => <ellipse key={i} cx={30 + i * 62} cy={20 + ((i * 3) % 5) * 32} rx="20" ry="15" fill={ac} opacity={ease(f, 430 + i * 8, 445 + i * 8)} />)}
        </svg>
      </Row>
    </AbsoluteFill>
  );
};

const Compare: React.FC = () => {
  const f = useCurrentFrame();
  const R = [
    {c: '#6a5cff', who: 'OPENAI', id: 'KOSMOS', t: 'Astra › Sol › Terra › Luna', at: 30},
    {c: '#00c2a8', who: 'DEEPMIND', id: 'UNSUR', t: 'Hydrogen · Neon · Argon · Carbon', at: 190},
    {c: '#ff7a3d', who: 'ANTHROPIC', id: 'SASTRA', t: 'Haiku › Sonnet › Opus › Fable', at: 340},
  ];
  return (
    <AbsoluteFill style={{padding: '380px 50px 0', display: 'flex', flexDirection: 'column', gap: 22}}>
      {R.map((r) => {
        const o = ease(f, r.at, r.at + 25);
        return (
          <div key={r.who} style={{opacity: o, transform: `translateX(${(1 - o) * 120}px)`, background: r.c, borderRadius: 32, padding: '22px 36px', height: 300, color: '#fff'}}>
            <div style={{fontSize: 44, fontWeight: 800, opacity: 0.9}}>{r.who}</div>
            <div style={{fontSize: 132, fontWeight: 900, lineHeight: 1}}>{r.id}</div>
            <div style={{fontSize: 42, fontWeight: 700, marginTop: 8}}>{r.t}</div>
          </div>);
      })}
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
  const f = useCurrentFrame();
  const W = [['BINTANG', '#4cc9f0', 40], ['UNSUR', '#00f5d4', 130], ['SASTRA', '#ffb86b', 220]] as const;
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <Stars n={120} />
      <div style={{position: 'absolute', top: 440, textAlign: 'center', opacity: 1 - ease(f, 400, 440)}}>
        {W.map(([w, c, at]) => <div key={w} style={{fontSize: 190, fontWeight: 900, lineHeight: 1.1, color: c, opacity: ease(f, at, at + 30), transform: `translateY(${(1 - ease(f, at, at + 30)) * 60}px)`}}>{w}</div>)}
      </div>
      <div style={{position: 'absolute', top: 520, textAlign: 'center', opacity: ease(f, 440, 490)}}>
        <div style={{fontSize: 160, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(90deg,#ff6bd6,#4cc9f0)', WebkitBackgroundClip: 'text', color: 'transparent'}}>BEYOND<br />THE<br />NAMES</div>
      </div>
    </AbsoluteFill>
  );
};

export const VISUALS: Record<Theme, React.FC> = {intro: Intro, evo: Evo, openai: Orbit, deepmind: Elements, anthropic: Art, compare: Compare, close: Close};
