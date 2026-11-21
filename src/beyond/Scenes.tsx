import React from 'react';
import {AbsoluteFill, random, spring, staticFile, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONO, SANS, SERIF, Theme, ease} from './util';

// Ganti ke true setelah menaruh logo resmi di public/logos/{openai,gemini,claude}.svg
const OFFICIAL_LOGOS = false;
const Logo: React.FC<{name: 'openai' | 'gemini' | 'claude'; label: string; color: string}> = ({name, label, color}) =>
  OFFICIAL_LOGOS ? (
    <Img src={staticFile(`logos/${name}.svg`)} style={{height: 72}} />
  ) : (
    <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, letterSpacing: 2, color, border: `2px solid ${color}`, borderRadius: 18, padding: '10px 26px'}}>{label}</div>
  );

const Stars: React.FC<{n?: number; color?: string}> = ({n = 90, color = '#fff'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({length: n}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: random(`x${i}`) * 1080, top: random(`y${i}`) * 1920,
          width: 2 + random(`s${i}`) * 3, height: 2 + random(`s${i}`) * 3, borderRadius: '50%', background: color,
          opacity: 0.25 + 0.5 * Math.abs(Math.sin(f / 40 + i))}} />
      ))}
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const old = ['PRO', 'FLASH', 'MINI'];
  const nw = ['OPUS', 'HYDROGEN', 'ASTRA'];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Stars n={60} />
      <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, fontFamily: MONO, fontSize: 100, color: '#64748b', opacity: 1 - ease(f, 150, 190)}}>
        {old.map((w, i) => (
          <span key={w} style={{position: 'relative', opacity: ease(f, i * 12, i * 12 + 20)}}>
            {w}
            <span style={{position: 'absolute', left: 0, top: '52%', height: 6, width: `${ease(f, 60 + i * 15, 90 + i * 15) * 100}%`, background: '#7dd3fc'}} />
          </span>
        ))}
      </div>
      <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: ease(f, 170, 200) * (1 - ease(f, 330, 360))}}>
        {nw.map((w, i) => {
          const s = spring({frame: f - 175 - i * 12, fps, config: {damping: 14}});
          return <span key={w} style={{fontSize: 120, fontWeight: 800, letterSpacing: 6, transform: `scale(${0.6 + 0.4 * s})`, color: '#eaf0ff', textShadow: '0 0 40px #7dd3fc88'}}>{w}</span>;
        })}
      </div>
      <div style={{position: 'absolute', textAlign: 'center', opacity: ease(f, 370, 410)}}>
        <div style={{fontSize: 108, fontWeight: 800, letterSpacing: 8, lineHeight: 1.05}}>BEYOND<br />THE NAMES</div>
        <div style={{marginTop: 26, fontFamily: MONO, fontSize: 28, letterSpacing: 4, color: '#7dd3fc'}}>THE PHILOSOPHY BEHIND FRONTIER AI</div>
      </div>
    </AbsoluteFill>
  );
};

const Chip: React.FC<{w: string; at: number; mono?: boolean; color: string}> = ({w, at, mono, color}) => {
  const f = useCurrentFrame();
  return <span style={{opacity: ease(f, at, at + 18), transform: `translateY(${(1 - ease(f, at, at + 18)) * 24}px)`, fontFamily: mono ? MONO : SANS,
    fontWeight: mono ? 400 : 700, fontSize: 54, padding: '12px 28px', border: `2px solid ${color}`, borderRadius: 16, color, display: 'inline-block'}}>{w}</span>;
};

const Evo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: '400px 70px 0', alignItems: 'center'}}>
      <div style={{fontFamily: MONO, fontSize: 30, letterSpacing: 4, color: '#94a3b8'}}>FUNGSI</div>
      <div style={{display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24}}>
        {['Flash', 'Pro', 'Mini'].map((w, i) => <Chip key={w} w={w} at={10 + i * 15} mono color="#94a3b8" />)}
      </div>
      <svg width="40" height="260" style={{margin: '40px 0'}}>
        <line x1="20" y1="0" x2="20" y2={ease(f, 120, 220) * 240} stroke="#c4b5fd" strokeWidth="4" />
        <polygon points="6,236 34,236 20,262" fill="#c4b5fd" opacity={ease(f, 215, 230)} />
      </svg>
      <div style={{fontFamily: MONO, fontSize: 30, letterSpacing: 4, color: '#c4b5fd', opacity: ease(f, 200, 220)}}>IDENTITAS</div>
      <div style={{display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24, maxWidth: 940}}>
        {['Astra', 'Sol', 'Luna', 'Hydrogen', 'Carbon', 'Opus', 'Sonnet', 'Haiku'].map((w, i) => <Chip key={w} w={w} at={230 + i * 14} color="#eaf0ff" />)}
      </div>
    </AbsoluteFill>
  );
};

const Orbit: React.FC = () => {
  const f = useCurrentFrame();
  const a = f / 80, cx = 540, cy = 860;
  const t = {x: cx + Math.cos(a) * 260, y: cy + Math.sin(a) * 260};
  const l = {x: t.x + Math.cos(a * 4) * 85, y: t.y + Math.sin(a * 4) * 85};
  const legend = [['ASTRA', 'bintang · kelas teratas', 60], ['SOL', 'matahari · seimbang', 220], ['TERRA', 'bumi · kerja harian', 360], ['LUNA', 'bulan · cepat & hemat', 470]] as const;
  return (
    <AbsoluteFill>
      <Stars />
      <div style={{position: 'absolute', top: 120 + 130, left: 0}} />
      <div style={{position: 'absolute', top: 330, left: 70}}><Logo name="openai" label="OpenAI · GPT" color="#9ab8ff" /></div>
      <svg width="1080" height="1920" style={{position: 'absolute'}}>
        <circle cx={cx} cy={cy} r="260" fill="none" stroke="#9ab8ff" strokeOpacity={0.25 * ease(f, 340, 380)} strokeDasharray="6 10" />
        <g transform={`translate(${cx},${cy - 470}) scale(${0.6 + 0.4 * ease(f, 40, 90) + 0.05 * Math.sin(f / 12)})`} opacity={ease(f, 40, 90)}>
          <path d="M0,-90 Q0,0 90,0 Q0,0 0,90 Q0,0 -90,0 Q0,0 0,-90Z" fill="#fff" style={{filter: 'drop-shadow(0 0 24px #9ab8ff)'}} />
        </g>
        <defs><radialGradient id="sun"><stop offset="0%" stopColor="#fff7d6" /><stop offset="100%" stopColor="#f59e0b" /></radialGradient></defs>
        <circle cx={cx} cy={cy} r={80 * ease(f, 200, 260)} fill="url(#sun)" style={{filter: 'drop-shadow(0 0 40px #f59e0b)'}} />
        <circle cx={t.x} cy={t.y} r={30 * ease(f, 340, 380)} fill="#38bdf8" />
        <circle cx={l.x} cy={l.y} r={13 * ease(f, 450, 490)} fill="#d4d4d8" />
      </svg>
      <div style={{position: 'absolute', top: 1360, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', fontFamily: MONO}}>
        {legend.map(([n, d, at]) => (
          <div key={n} style={{opacity: ease(f, at, at + 20), textAlign: 'center'}}>
            <div style={{fontSize: 36, fontWeight: 700, color: '#fff'}}>{n}</div>
            <div style={{fontSize: 18, color: '#9ab8ff', marginTop: 6, maxWidth: 220}}>{d}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Elements: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const E = [
    {n: 1, s: 'H', name: 'Hydrogen', role: 'cepat · berulang', at: 30},
    {n: 10, s: 'Ne', name: 'Neon', role: 'seimbang · mendalam', at: 200},
    {n: 18, s: 'Ar', name: 'Argon', role: 'frontier efisien', at: 350},
    {n: 6, s: 'C', name: 'Carbon', role: 'masalah terberat', at: 500},
  ];
  return (
    <AbsoluteFill style={{padding: '380px 60px 0', fontFamily: MONO}}>
      <div style={{marginBottom: 28}}><Logo name="gemini" label="Google DeepMind · Gemini 4" color="#5eead4" /></div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>
        {E.map((e) => {
          const s = spring({frame: f - e.at, fps, config: {damping: 15}});
          const glow = e.s === 'Ne' ? 20 + 18 * Math.sin(f / 10) : 0;
          return (
            <div key={e.s} style={{height: 400, border: '2px solid #5eead4', borderRadius: 20, padding: 26, position: 'relative', opacity: s,
              transform: `scale(${0.85 + 0.15 * s})`, background: 'rgba(94,234,212,0.06)', boxShadow: e.s === 'Ne' ? `0 0 ${glow + 10}px #5eead4aa` : 'none'}}>
              <div style={{fontSize: 30, color: '#5eead4'}}>{e.n}</div>
              <div style={{fontSize: 150, fontWeight: 800, lineHeight: 1, marginTop: 20}}>{e.s}</div>
              <div style={{position: 'absolute', bottom: 26, left: 26, right: 26}}>
                <div style={{fontSize: 38, fontWeight: 700}}>{e.name}</div>
                <div style={{fontSize: 22, color: '#5eead4', marginTop: 6}}>{e.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Art: React.FC = () => {
  const f = useCurrentFrame();
  const ink = '#2a1f14', ac = '#c2410c';
  const Row: React.FC<{name: string; sub: string; at: number; children: React.ReactNode}> = ({name, sub, at, children}) => (
    <div style={{display: 'flex', alignItems: 'center', height: 330, opacity: ease(f, at, at + 25)}}>
      <div style={{width: 420}}>
        <div style={{fontFamily: SERIF, fontSize: 88, fontWeight: 700, fontStyle: 'italic'}}>{name}</div>
        <div style={{fontFamily: MONO, fontSize: 22, color: ac, marginTop: 6}}>{sub}</div>
      </div>
      <div style={{flex: 1}}>{children}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{padding: '330px 70px 0', color: ink}}>
      <div style={{marginBottom: 10}}><Logo name="claude" label="Anthropic · Claude" color={ac} /></div>
      <Row name="Haiku" sub="5 · 7 · 5" at={40}>
        {[5, 7, 5].map((u, i) => <div key={i} style={{height: 14, margin: '0 0 22px', borderRadius: 7, background: ink, width: u * 40 * ease(f, 60 + i * 20, 100 + i * 20)}} />)}
      </Row>
      <Row name="Sonnet" sub="14 baris" at={200}>
        {Array.from({length: 14}).map((_, i) => <div key={i} style={{height: 6, margin: '0 0 10px', borderRadius: 3, background: ink, width: 520 * ease(f, 220 + i * 6, 250 + i * 6)}} />)}
      </Row>
      <Row name="Opus" sub="karya · komposisi" at={360}>
        <svg width="520" height="150">
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="0" x2={520 * ease(f, 380, 430)} y1={20 + i * 26} y2={20 + i * 26} stroke={ink} strokeWidth="2" />)}
          {Array.from({length: 9}).map((_, i) => <ellipse key={i} cx={30 + i * 55} cy={20 + ((i * 3) % 5) * 26} rx="14" ry="10" fill={ac} opacity={ease(f, 430 + i * 8, 445 + i * 8)} />)}
        </svg>
      </Row>
    </AbsoluteFill>
  );
};

const Compare: React.FC = () => {
  const f = useCurrentFrame();
  const R = [
    {c: '#9ab8ff', who: 'OPENAI', id: 'KOSMOS', t: 'Astra › Sol › Terra › Luna', n: 'Satu keluarga, tingkatan eksplisit', at: 30},
    {c: '#5eead4', who: 'GOOGLE DEEPMIND', id: 'UNSUR', t: 'Hydrogen · Neon · Argon · Carbon', n: 'Katalog nama yang berdiri sendiri', at: 190},
    {c: '#e07a4f', who: 'ANTHROPIC', id: 'SASTRA', t: 'Haiku › Sonnet › Opus › Fable', n: 'Tangga jelas, nama bertahan lintas generasi', at: 340},
  ];
  return (
    <AbsoluteFill style={{padding: '400px 60px 0', gap: 30, display: 'flex', flexDirection: 'column'}}>
      {R.map((r) => (
        <div key={r.who} style={{opacity: ease(f, r.at, r.at + 25), transform: `translateX(${(1 - ease(f, r.at, r.at + 25)) * 80}px)`,
          borderLeft: `8px solid ${r.c}`, padding: '10px 30px', background: `${r.c}12`, height: 330}}>
          <div style={{fontFamily: MONO, fontSize: 24, color: r.c, letterSpacing: 3}}>{r.who}</div>
          <div style={{fontSize: 84, fontWeight: 800, margin: '6px 0'}}>{r.id}</div>
          <div style={{fontFamily: MONO, fontSize: 28}}>{r.t}</div>
          <div style={{fontSize: 26, opacity: 0.7, marginTop: 10}}>{r.n}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
  const f = useCurrentFrame();
  const W = [['BINTANG', '#9ab8ff', 40], ['UNSUR', '#5eead4', 130], ['SASTRA', '#e07a4f', 220]] as const;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Stars n={120} />
      <div style={{position: 'absolute', top: 560, textAlign: 'center', opacity: 1 - ease(f, 400, 440)}}>
        {W.map(([w, c, at]) => <div key={w} style={{fontSize: 110, fontWeight: 800, letterSpacing: 8, color: c, opacity: ease(f, at, at + 30), margin: '10px 0'}}>{w}</div>)}
      </div>
      <div style={{position: 'absolute', top: 700, textAlign: 'center', opacity: ease(f, 440, 490)}}>
        <div style={{fontSize: 96, fontWeight: 800, letterSpacing: 8, lineHeight: 1.05}}>BEYOND<br />THE NAMES</div>
        <div style={{marginTop: 24, fontFamily: MONO, fontSize: 26, letterSpacing: 4, color: '#7dd3fc'}}>THE PHILOSOPHY BEHIND FRONTIER AI</div>
      </div>
    </AbsoluteFill>
  );
};

export const VISUALS: Record<Theme, React.FC> = {intro: Intro, evo: Evo, openai: Orbit, deepmind: Elements, anthropic: Art, compare: Compare, close: Close};
