import React from 'react';
import {AbsoluteFill, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONO, SANS, SERIF, Theme, ease} from './util';

// Subtle Technical Grid Stars
const GridStars: React.FC<{n?: number}> = ({n = 45}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: (random(`x${i}`) * 1040 + 20),
            top: (random(`y${i}`) * 1880 + 20),
            width: 2 + random(`s${i}`) * 2,
            height: 2 + random(`s${i}`) * 2,
            borderRadius: '50%',
            background: '#94A3B8',
            opacity: 0.15 + 0.35 * Math.abs(Math.sin(f / 45 + i)),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1: INTRO (The Strange Names)
   ══════════════════════════════════════════════════════════════════════════ */
const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <GridStars />

      {/* Legacy Names (Strikethrough) */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          fontFamily: MONO,
          fontSize: 120,
          fontWeight: 800,
          color: '#334155',
          opacity: 1 - ease(f, 150, 190),
        }}
      >
        <div style={{fontSize: 22, color: '#64748B', letterSpacing: 3, marginBottom: -10}}>LEGACY CONVENTIONS</div>
        {['PRO', 'FLASH', 'MINI'].map((w, i) => (
          <span key={w} style={{position: 'relative', lineHeight: 1.15, opacity: ease(f, i * 14, i * 14 + 20)}}>
            {w}
            <span
              style={{
                position: 'absolute',
                left: -12,
                top: '52%',
                height: 8,
                width: `${ease(f, 60 + i * 16, 90 + i * 16) * 115}%`,
                background: '#EF4444',
                transform: 'rotate(-2deg)',
              }}
            />
          </span>
        ))}
      </div>

      {/* Frontier Class Names Emergence */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: ease(f, 170, 200) * (1 - ease(f, 330, 360)),
        }}
      >
        <div style={{fontFamily: MONO, fontSize: 22, color: '#38BDF8', letterSpacing: 4}}>NEW FRONTIER PARADIGM</div>
        {['OPUS', 'HYDROGEN', 'ASTRA'].map((w, i) => {
          const s = spring({frame: f - 175 - i * 14, fps, config: {damping: 14}});
          return (
            <div
              key={w}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                padding: '14px 44px',
                borderRadius: 20,
                backgroundColor: '#0F172A',
                border: '1.5px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 12px 30px -10px rgba(56, 189, 248, 0.2)',
                transform: `scale(${0.7 + 0.3 * s})`,
                opacity: s,
              }}
            >
              <span style={{fontFamily: MONO, fontSize: 18, color: '#64748B'}}>CLASS 0{i + 1}</span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: w === 'HYDROGEN' ? 90 : 100,
                  fontWeight: 900,
                  letterSpacing: -1,
                  color: '#FFFFFF',
                }}
              >
                {w}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hero Architectural Title */}
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          opacity: ease(f, 360, 400),
          transform: `scale(${0.92 + 0.08 * ease(f, 360, 410)})`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: 8,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 4,
            color: '#38BDF8',
            marginBottom: 24,
          }}
        >
          TECHNICAL INQUIRY
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: '#FFFFFF',
          }}
        >
          BEYOND<br />THE NAMES
        </div>
        <div
          style={{
            fontFamily: SANS,
            marginTop: 24,
            fontSize: 38,
            fontWeight: 600,
            color: '#94A3B8',
          }}
        >
          The Architecture Behind Frontier AI
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: EVO (Evolution of Naming)
   ══════════════════════════════════════════════════════════════════════════ */
const Evo: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{padding: '380px 60px 0', alignItems: 'center'}}>
      {/* Top: Technical Labels */}
      <div
        style={{
          width: '100%',
          padding: '28px 36px',
          borderRadius: 20,
          backgroundColor: '#0F172A',
          border: '1px solid rgba(255,255,255,0.08)',
          opacity: ease(f, 10, 30),
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
          <span style={{fontFamily: MONO, fontSize: 18, color: '#64748B', letterSpacing: 2}}>FASE 01 // ERA SPESIFIKASI</span>
          <span style={{padding: '4px 14px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', fontFamily: MONO, fontSize: 16, color: '#94A3B8'}}>FUNGSI</span>
        </div>
        <div style={{fontFamily: SANS, fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16}}>
          Label Teknis &amp; Deskriptif
        </div>
        <div style={{display: 'flex', gap: 14, flexWrap: 'wrap'}}>
          {['Flash · Ringkas', 'Pro · Profesional', 'Mini · Cepat'].map((w, i) => (
            <span
              key={w}
              style={{
                fontFamily: MONO,
                fontSize: 20,
                padding: '8px 20px',
                borderRadius: 10,
                backgroundColor: '#1E293B',
                color: '#CBD5E1',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: ease(f, 30 + i * 15, 50 + i * 15),
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Transition Vector */}
      <svg width="60" height="180" style={{margin: '20px 0'}}>
        <line x1="30" y1="0" x2="30" y2={ease(f, 100, 180) * 140} stroke="#38BDF8" strokeWidth="4" strokeDasharray="6 6" />
        <polygon points="18,135 42,135 30,165" fill="#38BDF8" opacity={ease(f, 175, 195)} />
      </svg>

      {/* Bottom: Frontier Class Identity */}
      <div
        style={{
          width: '100%',
          padding: '28px 36px',
          borderRadius: 20,
          backgroundColor: '#0F172A',
          border: '1.5px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 16px 40px -15px rgba(56, 189, 248, 0.15)',
          opacity: ease(f, 190, 220),
          transform: `translateY(${(1 - ease(f, 190, 220)) * 24}px)`,
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18}}>
          <span style={{fontFamily: MONO, fontSize: 18, color: '#38BDF8', letterSpacing: 2}}>FASE 02 // ERA KONTEMPORER</span>
          <span style={{padding: '4px 14px', borderRadius: 8, backgroundColor: 'rgba(56,189,248,0.15)', border: '1px solid #38BDF8', fontFamily: MONO, fontSize: 16, color: '#38BDF8', fontWeight: 700}}>IDENTITAS</span>
        </div>
        <div style={{fontFamily: SANS, fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16}}>
          Kelas Karakter &amp; Cerita Abadi
        </div>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          {['Astra', 'Sol', 'Terra', 'Luna', 'Hydrogen', 'Carbon', 'Opus', 'Sonnet', 'Haiku'].map((w, i) => (
            <span
              key={w}
              style={{
                fontFamily: MONO,
                fontSize: 20,
                fontWeight: 700,
                padding: '8px 20px',
                borderRadius: 10,
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                opacity: ease(f, 215 + i * 10, 235 + i * 10),
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: OPENAI (The Cosmic Identity)
   ══════════════════════════════════════════════════════════════════════════ */
const Orbit: React.FC = () => {
  const f = useCurrentFrame();
  const a = f / 70, cx = 540, cy = 680;
  const t = {x: cx + Math.cos(a) * 230, y: cy + Math.sin(a) * 230};
  const l = {x: t.x + Math.cos(a * 4) * 85, y: t.y + Math.sin(a * 4) * 85};

  const L = [
    {name: 'ASTRA', latin: 'Ad Astra (Bintang)', desc: 'Frontier Tier Tertinggi · Pekerjaan Tersulit', color: '#F8FAFC', at: 30},
    {name: 'SOL', latin: 'Sol (Matahari)', desc: 'Model Penyeimbang · Biaya & Kecerdasan Optimal', color: '#F59E0B', at: 180},
    {name: 'TERRA', latin: 'Terra (Bumi)', desc: 'Fondasi Utama · Beban Operasional Harian', color: '#38BDF8', at: 340},
    {name: 'LUNA', latin: 'Luna (Bulan)', desc: 'Cepat & Hemat · Pemrosesan Volume Masif', color: '#94A3B8', at: 480},
  ];

  const activeIdx = f < 180 ? 0 : f < 340 ? 1 : f < 480 ? 2 : 3;
  const act = L[activeIdx];

  return (
    <AbsoluteFill>
      <GridStars n={60} />

      {/* Astronomical Radar Blueprint */}
      <svg width="1080" height="1920" style={{position: 'absolute'}}>
        {/* Orbital Dash Rings */}
        <circle cx={cx} cy={cy} r="320" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 8" />
        <circle cx={cx} cy={cy} r="230" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="2" strokeDasharray="8 10" />
        <circle cx={cx} cy={cy} r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 6" />

        {/* Central Sun (Sol) */}
        <defs>
          <radialGradient id="sunTech">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={65 * ease(f, 30, 80)} fill="url(#sunTech)" style={{filter: 'drop-shadow(0 0 35px rgba(245,158,11,0.4))'}} />

        {/* Orbiting Astra Star Marker */}
        <g transform={`translate(${cx},${cy - 320}) scale(${ease(f, 30, 80)})`}>
          <circle cx="0" cy="0" r="14" fill="#FFFFFF" style={{filter: 'drop-shadow(0 0 15px #FFFFFF)'}} />
          <line x1="-24" y1="0" x2="24" y2="0" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="0" y1="-24" x2="0" y2="24" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Orbiting Terra Body */}
        <circle cx={t.x} cy={t.y} r={24 * ease(f, 150, 200)} fill="#38BDF8" style={{filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.5))'}} />

        {/* Orbiting Luna Satellite */}
        <circle cx={l.x} cy={l.y} r={10 * ease(f, 220, 260)} fill="#E2E8F0" />
      </svg>

      {/* Active Celestial Node HUD Card */}
      <div
        key={act.name}
        style={{
          position: 'absolute',
          top: 960,
          left: 64,
          right: 64,
          padding: '28px 36px',
          borderRadius: 20,
          backgroundColor: '#0F172A',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 16px 40px -15px rgba(245, 158, 11, 0.2)',
          opacity: ease(f - act.at, 0, 14),
          transform: `translateY(${(1 - ease(f - act.at, 0, 14)) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <span style={{fontFamily: MONO, fontSize: 18, color: '#F59E0B', letterSpacing: 2}}>COSMIC METAPHOR // {activeIdx + 1} OF 4</span>
          <span style={{fontFamily: MONO, fontSize: 18, color: '#94A3B8'}}>{act.latin}</span>
        </div>
        <div style={{fontFamily: SANS, fontSize: 64, fontWeight: 900, color: act.color, letterSpacing: -1}}>
          {act.name}
        </div>
        <div style={{fontFamily: SANS, fontSize: 26, fontWeight: 600, color: '#94A3B8', marginTop: 8}}>
          {act.desc}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: DEEPMIND (Language of Elements)
   ══════════════════════════════════════════════════════════════════════════ */
const Elements: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const E = [
    {n: '01', s: 'H', name: 'Hydrogen', role: 'Eksekusi Cepat & Berulang', note: 'Unsur Paling Ringan', at: 30},
    {n: '10', s: 'Ne', name: 'Neon', role: 'Keseimbangan Dalam & Efisien', note: 'Gas Mulia Berpendar', at: 180},
    {n: '18', s: 'Ar', name: 'Argon', role: 'Frontier Penalaran Efisien', note: 'Gas Inert Stabil', at: 340},
    {n: '06', s: 'C', name: 'Carbon', role: 'Masalah Terberat Frontier', note: 'Fondasi Kompleksitas', at: 500},
  ];

  return (
    <AbsoluteFill style={{padding: '380px 60px 0'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24}}>
        {E.map((e) => {
          const s = spring({frame: f - e.at, fps, config: {damping: 14}});
          return (
            <div
              key={e.s}
              style={{
                height: 420,
                borderRadius: 20,
                padding: '24px 28px',
                position: 'relative',
                backgroundColor: '#0F172A',
                border: '1.5px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 12px 30px -10px rgba(16, 185, 129, 0.15)',
                opacity: s,
                transform: `scale(${0.85 + 0.15 * s})`,
              }}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontFamily: MONO, fontSize: 24, fontWeight: 700, color: '#10B981'}}>{e.n}</span>
                <span style={{fontFamily: MONO, fontSize: 14, color: '#64748B'}}>ELEMENT</span>
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 140,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#FFFFFF',
                  margin: '12px 0',
                }}
              >
                {e.s}
              </div>
              <div style={{position: 'absolute', bottom: 24, left: 28, right: 28}}>
                <div style={{fontFamily: SANS, fontSize: 32, fontWeight: 800, color: '#10B981'}}>{e.name}</div>
                <div style={{fontFamily: SANS, fontSize: 20, fontWeight: 600, color: '#94A3B8', marginTop: 4}}>{e.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: ANTHROPIC (Language of Art)
   ══════════════════════════════════════════════════════════════════════════ */
const Art: React.FC = () => {
  const f = useCurrentFrame();

  const Row: React.FC<{name: string; sub: string; tag: string; at: number; children: React.ReactNode}> = ({
    name,
    sub,
    tag,
    at,
    children,
  }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 250,
        padding: '20px 32px',
        borderRadius: 20,
        backgroundColor: '#0F172A',
        border: '1.5px solid rgba(249, 115, 22, 0.3)',
        boxShadow: '0 12px 30px -10px rgba(249, 115, 22, 0.15)',
        opacity: ease(f, at, at + 20),
        transform: `translateX(${(1 - ease(f, at, at + 20)) * -40}px)`,
      }}
    >
      <div style={{width: 380}}>
        <div style={{fontFamily: MONO, fontSize: 16, color: '#F97316', letterSpacing: 2}}>{tag}</div>
        <div style={{fontFamily: SERIF, fontSize: 64, fontWeight: 900, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.1}}>
          {name}
        </div>
        <div style={{fontFamily: SANS, fontSize: 22, fontWeight: 700, color: '#94A3B8', marginTop: 4}}>{sub}</div>
      </div>
      <div style={{flex: 1}}>{children}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{padding: '380px 60px 0', display: 'flex', flexDirection: 'column', gap: 24}}>
      {/* Haiku (5-7-5) */}
      <Row name="Haiku" sub="3 Baris · Ringkas & Cepat" tag="STRUKTUR JEPANG" at={30}>
        {[5, 7, 5].map((u, i) => (
          <div
            key={i}
            style={{
              height: 20,
              margin: '0 0 16px',
              borderRadius: 10,
              background: i === 1 ? '#F97316' : '#334155',
              width: u * 60 * ease(f, 50 + i * 18, 90 + i * 18),
            }}
          />
        ))}
      </Row>

      {/* Sonnet (14 Lines) */}
      <Row name="Sonnet" sub="14 Baris · Format Seimbang" tag="PUISI KLASIK" at={200}>
        {Array.from({length: 14}).map((_, i) => (
          <div
            key={i}
            style={{
              height: 8,
              margin: '0 0 6px',
              borderRadius: 4,
              background: i >= 8 ? '#F97316' : '#334155',
              width: 440 * ease(f, 220 + i * 5, 250 + i * 5),
            }}
          />
        ))}
      </Row>

      {/* Opus (Magnum Opus) */}
      <Row name="Opus" sub="Karya Agung Komposisi" tag="MAGNUM OPUS" at={360}>
        <svg width="440" height="140">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" x2={440 * ease(f, 380, 420)} y1={18 + i * 26} y2={18 + i * 26} stroke="#334155" strokeWidth="3" />
          ))}
          {Array.from({length: 6}).map((_, i) => (
            <ellipse
              key={i}
              cx={36 + i * 72}
              cy={18 + ((i * 3) % 5) * 26}
              rx="16"
              ry="12"
              fill="#F97316"
              opacity={ease(f, 420 + i * 8, 440 + i * 8)}
            />
          ))}
        </svg>
      </Row>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 6: COMPARE (Comparative Analysis)
   ══════════════════════════════════════════════════════════════════════════ */
const Compare: React.FC = () => {
  const f = useCurrentFrame();

  const R = [
    {who: 'OPENAI', id: 'KOSMOS', t: 'Astra › Sol › Terra › Luna', strat: 'Hierarki Bertingkat Eksplisit', ac: '#F59E0B', at: 30},
    {who: 'GOOGLE DEEPMIND', id: 'UNSUR', t: 'Hydrogen · Neon · Argon · Carbon', strat: 'Katalog Karakter Berdiri Sendiri', ac: '#10B981', at: 180},
    {who: 'ANTHROPIC', id: 'SASTRA', t: 'Haiku › Sonnet › Opus › Fable', strat: 'Tangga Estetika Lintas Generasi', ac: '#F97316', at: 340},
  ];

  return (
    <AbsoluteFill style={{padding: '380px 60px 0', display: 'flex', flexDirection: 'column', gap: 24}}>
      {R.map((r) => {
        const o = ease(f, r.at, r.at + 22);
        return (
          <div
            key={r.who}
            style={{
              opacity: o,
              transform: `translateX(${(1 - o) * 50}px)`,
              backgroundColor: '#0F172A',
              border: `1.5px solid ${r.ac}55`,
              borderRadius: 20,
              padding: '28px 36px',
              boxShadow: `0 14px 35px -12px ${r.ac}20`,
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontFamily: MONO, fontSize: 18, color: r.ac, letterSpacing: 2, fontWeight: 700}}>{r.who}</span>
              <span style={{padding: '4px 14px', borderRadius: 8, backgroundColor: `${r.ac}15`, border: `1px solid ${r.ac}`, fontFamily: MONO, fontSize: 16, color: r.ac, fontWeight: 700}}>
                {r.id}
              </span>
            </div>
            <div style={{fontFamily: SANS, fontSize: 44, fontWeight: 900, color: '#FFFFFF', marginTop: 12}}>
              {r.t}
            </div>
            <div style={{fontFamily: SANS, fontSize: 22, fontWeight: 600, color: '#94A3B8', marginTop: 8}}>
              {r.strat}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 7: CLOSE (Philosophical Closing)
   ══════════════════════════════════════════════════════════════════════════ */
const Close: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <GridStars n={70} />

      {/* 3 Pillars Convergence */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          gap: 24,
          opacity: 1 - ease(f, 380, 420),
        }}
      >
        {[
          {w: 'BINTANG', ac: '#F59E0B', sub: 'Kosmologi'},
          {w: 'UNSUR', ac: '#10B981', sub: 'Materi'},
          {w: 'SASTRA', ac: '#F97316', sub: 'Bahasa'},
        ].map((item, i) => (
          <div
            key={item.w}
            style={{
              padding: '32px 36px',
              borderRadius: 20,
              backgroundColor: '#0F172A',
              border: `1.5px solid ${item.ac}55`,
              textAlign: 'center',
              width: 280,
              opacity: ease(f, 30 + i * 20, 60 + i * 20),
              transform: `translateY(${(1 - ease(f, 30 + i * 20, 60 + i * 20)) * 30}px)`,
            }}
          >
            <div style={{fontFamily: MONO, fontSize: 16, color: item.ac, letterSpacing: 2}}>{item.sub}</div>
            <div style={{fontFamily: SANS, fontSize: 48, fontWeight: 900, color: '#FFFFFF', marginTop: 10}}>{item.w}</div>
          </div>
        ))}
      </div>

      {/* Grand Finale Architectural Reveal */}
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          opacity: ease(f, 420, 460),
          transform: `scale(${0.92 + 0.08 * ease(f, 420, 470)})`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: 8,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 4,
            color: '#38BDF8',
            marginBottom: 24,
          }}
        >
          FRONTIER HORIZON
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: '#FFFFFF',
          }}
        >
          BEYOND<br />THE NAMES
        </div>
        <div
          style={{
            fontFamily: SANS,
            marginTop: 24,
            fontSize: 36,
            fontWeight: 600,
            color: '#94A3B8',
          }}
        >
          Batas Imajinasi &amp; Penamaan Ciptaan Manusia
        </div>
        <div
          style={{
            fontFamily: MONO,
            marginTop: 36,
            fontSize: 22,
            fontWeight: 700,
            color: '#64748B',
            letterSpacing: 3,
          }}
        >
          rhmt ofc · rhmt.biz.id
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const VISUALS: Record<Theme, React.FC> = {
  intro: Intro,
  evo: Evo,
  openai: Orbit,
  deepmind: Elements,
  anthropic: Art,
  compare: Compare,
  close: Close,
};
