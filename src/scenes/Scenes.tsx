import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background, Header, Headline} from '../components/Chrome';
import {Atom} from '../components/Atom';
import {Bar, Chip, ElementTile, StatCard} from '../components/Cards';
import {ModelCoreIcon} from '../components/ModelIcons';
import {ACCENT, CW, FONT, M, MODELS, Mode, ModelKey, pal} from '../lib/theme';
import {clamp01, pop} from '../lib/anim';
import {anchor} from '../lib/anchors';

const TOTAL = 7;
const LIME = ACCENT.hydrogen;

const Frame: React.FC<{mode: Mode; accent: string; index: number; label: string; icon?: boolean; children: React.ReactNode}> = ({
  mode,
  accent,
  index,
  label,
  icon = true,
  children,
}) => (
  <AbsoluteFill>
    <Background mode={mode} accent={accent} />
    <Header index={index} total={TOTAL} label={label} mode={mode} icon={icon} />
    {children}
  </AbsoluteFill>
);

const At: React.FC<{x: number; y: number; children: React.ReactNode}> = ({x, y, children}) => (
  <div style={{position: 'absolute', left: x, top: y}}>{children}</div>
);

const Mono: React.FC<{y: number; start: number; text: string; color: string; size?: number; weight?: number}> = ({y, start, text, color, size = 26, weight = 700}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = clamp01(pop(frame, start, fps));
  return (
    <div style={{position: 'absolute', left: M, top: y, width: CW, textAlign: 'center', fontFamily: FONT.mono, fontWeight: weight, fontSize: size, color, opacity: o, letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>
      {text}
    </div>
  );
};

export const S1Hook: React.FC = () => {
  const id = 's1-hook';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('dark');
  const items: {m: ModelKey; at: number; date: string}[] = [
    {m: 'argon', at: anchor(id, 'Argon,', 0, 2.93), date: '13 OKT'},
    {m: 'carbon', at: anchor(id, 'Carbon,', 0, 3.96), date: '10 NOV'},
    {m: 'hydrogen', at: anchor(id, 'Hydrogen.', 0, 5.02), date: '12 NOV'},
  ];
  return (
    <Frame mode="dark" accent={LIME} index={1} label="MODEL BARU">
      <Headline kicker="// TIGA MODEL BARU" title="GEMINI 4" mode="dark" size={150} />
      <div style={{position: 'absolute', left: M + 148, top: 1100, width: 2 * 320, height: 3, backgroundColor: p.line}} />
      {items.map((it, i) => {
        const x = M + i * 320;
        const dot = clamp01(pop(frame, it.at + 4, fps));
        return (
          <React.Fragment key={it.m}>
            <div style={{position: 'absolute', left: x, top: 620, width: 296, height: 372, borderRadius: 30, border: `2px dashed ${p.line}`, boxSizing: 'border-box'}} />
            <At x={x} y={620}>
              <ElementTile m={it.m} w={296} h={372} start={it.at} />
            </At>
            <div style={{position: 'absolute', left: x + 148 - 11, top: 1092, width: 22, height: 22, borderRadius: 11, backgroundColor: MODELS[it.m].accent, opacity: dot, transform: `scale(${dot})`}} />
            <div style={{position: 'absolute', left: x, top: 1134, width: 296, textAlign: 'center', fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: p.muted, opacity: dot}}>
              {it.date}
            </div>
          </React.Fragment>
        );
      })}
      <Mono y={1250} start={anchor(id, 'peran.', 0, 5.5)} text="SATU KELUARGA · TIGA PERAN" color={p.textAccent} />
    </Frame>
  );
};

const MiniTile: React.FC<{m: ModelKey; size: number}> = ({m, size}) => {
  const model = MODELS[m];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 26,
        backgroundColor: '#0f172a',
        border: `2px solid ${model.accent}77`,
        position: 'relative',
        flexShrink: 0,
        boxShadow: `0 8px 24px rgba(0,0,0,0.35)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Img src={staticFile('assets/gemini.svg')} style={{position: 'absolute', right: 12, top: 12, width: 20, height: 20, opacity: 0.9}} />
      <ModelCoreIcon m={m} size={size * 0.48} color={model.accent} />
    </div>
  );
};

export const S2Peran: React.FC = () => {
  const id = 's2-peran';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('light');
  const rows: {m: ModelKey; at: number; title: string; sub: string}[] = [
    {m: 'argon', at: anchor(id, 'Argon', 0, 0.26), title: 'Kode & analisis', sub: 'Argon · frontier · AI Pro & Ultra'},
    {m: 'carbon', at: anchor(id, 'Carbon', 0, 2.96), title: 'Pekerjaan paling kompleks', sub: 'Carbon · terkuat · AI Ultra'},
    {m: 'hydrogen', at: anchor(id, 'Hydrogen', 0, 6.12), title: 'Kerja harian yang cepat', sub: 'Hydrogen · untuk semua pengguna'},
  ];
  return (
    <Frame mode="light" accent={ACCENT.carbon} index={2} label="PERAN">
      <Headline kicker="// KELUARGA GEMINI 4" title="Tiga peran" mode="light" />
      {rows.map((r, i) => {
        const s = pop(frame, r.at, fps);
        return (
          <div
            key={r.m}
            style={{
              position: 'absolute',
              left: M,
              top: 540 + i * 236,
              width: CW,
              height: 206,
              boxSizing: 'border-box',
              borderRadius: 30,
              backgroundColor: p.surface,
              border: `2px solid ${p.line}`,
              boxShadow: `0 14px 34px ${p.shadow}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              gap: 28,
              opacity: clamp01(s),
              transform: `translateY(${(1 - s) * 36}px)`,
            }}
          >
            <MiniTile m={r.m} size={152} />
            <div>
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 46, color: p.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em'}}>{r.title}</div>
              <div style={{fontFamily: FONT.mono, fontWeight: 400, fontSize: 24, color: p.muted, marginTop: 10, whiteSpace: 'nowrap'}}>{r.sub}</div>
            </div>
          </div>
        );
      })}
    </Frame>
  );
};

export const S3Argon: React.FC = () => {
  const id = 's3-argon';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('dark');
  const a = MODELS.argon.accent;
  const scoreAt = anchor(id, '76', 0, 3.0);
  const cardS = pop(frame, scoreAt, fps);
  return (
    <Frame mode="dark" accent={a} index={3} label="MODEL 01">
      <Headline kicker="// RILIS 13 OKT 2026" title="Gemini 4 Argon" mode="dark" accent={a} />
      <At x={280} y={500}>
        <Atom m="argon" size={520} start={8} />
      </At>
      <div
        style={{
          position: 'absolute', left: M, top: 1050, width: CW, height: 210, boxSizing: 'border-box', padding: '20px 28px', borderRadius: 28,
          backgroundColor: p.surface, border: `2px solid ${p.line}`, boxShadow: `0 14px 34px ${p.shadow}`, opacity: clamp01(cardS), transform: `translateY(${(1 - cardS) * 30}px)`,
        }}
      >
        <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: p.muted, letterSpacing: '0.04em'}}>RIEMANNBENCH · TERTINGGI DI TABEL GOOGLE</div>
        <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18}}>
          <Bar mode="dark" w={CW - 56} start={scoreAt} label="Argon" value={76} max={100} decimals={1} color={a} />
          <Bar mode="dark" w={CW - 56} start={scoreAt + 6} label="Carbon" value={72} max={100} decimals={1} color={p.muted} />
        </div>
      </div>
      <At x={M} y={1292}>
        <Chip mode="dark" w={456} start={anchor(id, 'pelanggan', 0, 9.0)} text="AI PRO & ULTRA" accent={a} />
      </At>
      <At x={M + 480} y={1292}>
        <Chip mode="dark" w={456} start={anchor(id, 'tahan', 0, 6.0)} text="TAHAN PROMPT INJECTION" accent={a} />
      </At>
    </Frame>
  );
};

export const S4Carbon: React.FC = () => {
  const id = 's4-carbon';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('light');
  const a = MODELS.carbon.accent;
  const priceAt = anchor(id, 'API-nya', 0, 8.0);
  const upAt = anchor(id, 'naik', 0, 14.0);
  const ps = pop(frame, priceAt, fps);
  const up = clamp01(pop(frame, upAt, fps));
  return (
    <Frame mode="light" accent={a} index={4} label="MODEL 02">
      <Headline kicker="// RILIS UMUM 10 NOV 2026" title="Gemini 4 Carbon" mode="light" accent={p.textAccent} />
      <At x={310} y={480}>
        <Atom m="carbon" size={460} start={8} />
      </At>
      <At x={M} y={960}>
        <StatCard mode="light" w={456} h={200} start={anchor(id, '59', 0, 4.0)} label="AA INDEX v5.0" value={59} sub="tertinggi di tabel Google" accent={p.textAccent} />
      </At>
      <At x={M + 480} y={960}>
        <StatCard mode="light" w={456} h={200} start={anchor(id, '65,2', 0, 6.0)} label="TERMINAL-BENCH 4.0" value={65.2} decimals={1} suffix="%" sub="tertinggi di tabel Google" accent={p.textAccent} />
      </At>
      <div
        style={{
          position: 'absolute', left: M, top: 1190, width: CW, height: 200, boxSizing: 'border-box', padding: '20px 28px', borderRadius: 28,
          backgroundColor: p.surface, border: `2px solid ${p.line}`, boxShadow: `0 14px 34px ${p.shadow}`, opacity: clamp01(ps), transform: `translateY(${(1 - ps) * 30}px)`,
        }}
      >
        <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: p.muted, letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>HARGA API · INPUT / OUTPUT PER 1 JUTA TOKEN</div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
          <div style={{width: 380}}>
            <div style={{fontFamily: FONT.mono, fontSize: 22, color: p.muted}}>INTRO · S/D 30 NOV</div>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 64, color: p.ink, letterSpacing: '-0.02em', whiteSpace: 'nowrap'}}>$2 / $10</div>
          </div>
          <div style={{width: 100, textAlign: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 56, color: p.muted, opacity: up}}>→</div>
          <div style={{width: 380, opacity: up, transform: `translateX(${(1 - up) * 30}px)`}}>
            <div style={{fontFamily: FONT.mono, fontSize: 22, color: p.muted}}>SETELAH ITU</div>
            <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 64, color: p.textAccent, letterSpacing: '-0.02em', whiteSpace: 'nowrap'}}>$4 / $20</div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export const S5Hydrogen: React.FC = () => {
  const id = 's5-hydrogen';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('dark');
  const a = MODELS.hydrogen.accent;
  const barAt = anchor(id, '57', 0, 7.0);
  const cs = pop(frame, barAt, fps);
  return (
    <Frame mode="dark" accent={a} index={5} label="MODEL 03">
      <Headline kicker="// RILIS 12 NOV 2026" title="Gemini 4 Hydrogen" mode="dark" accent={a} />
      <At x={340} y={470}>
        <Atom m="hydrogen" size={400} start={8} />
      </At>
      <At x={M} y={880}>
        <StatCard mode="dark" w={456} h={200} start={anchor(id, '2,5', 0, 3.0)} label="LEBIH CEPAT" value={2.5} decimals={1} suffix="×" sub="vs Gemini 3.8 Flash" accent={a} />
      </At>
      <At x={M + 480} y={880}>
        <StatCard mode="dark" w={456} h={200} start={anchor(id, 'Empat', 0, 14.0)} label="LEVEL BERPIKIR" value={4} sub="low · medium · high · xhigh" accent={a} />
      </At>
      <div
        style={{
          position: 'absolute', left: M, top: 1110, width: CW, height: 200, boxSizing: 'border-box', padding: '20px 28px', borderRadius: 28,
          backgroundColor: p.surface, border: `2px solid ${p.line}`, boxShadow: `0 14px 34px ${p.shadow}`, opacity: clamp01(cs), transform: `translateY(${(1 - cs) * 30}px)`,
        }}
      >
        <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: p.muted, letterSpacing: '0.04em'}}>TERMINAL-BENCH 4.1</div>
        <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18}}>
          <Bar mode="dark" w={CW - 56} start={barAt} label="Hydrogen" value={57} max={100} decimals={0} color={a} />
          <Bar mode="dark" w={CW - 56} start={anchor(id, '18,2', 0, 10.0)} label="Flash" value={18.2} max={100} decimals={1} color={p.muted} />
        </div>
      </div>
      <At x={M} y={1342}>
        <Chip mode="dark" w={456} start={anchor(id, 'aplikasi', 0, 16.0)} text="GEMINI APP" accent={a} />
      </At>
      <At x={M + 480} y={1342}>
        <Chip mode="dark" w={456} start={anchor(id, 'Search', 0, 17.0)} text="GOOGLE SEARCH" accent={a} />
      </At>
    </Frame>
  );
};

export const S6Duet: React.FC = () => {
  const id = 's6-duet';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('light');
  const link = anchor(id, 'bekerja', 0, 1.0);
  const lk = clamp01(pop(frame, link, fps));
  const dotX = 468 + ((frame * 5) % 144);
  const carbonAt = anchor(id, 'Carbon', 0, 3.0);
  const hydroAt = anchor(id, 'Hydrogen', 0, 5.0);
  return (
    <Frame mode="light" accent={ACCENT.carbon} index={6} label="KERJA SAMA">
      <Headline kicker="// ORCHESTRATOR DI ANTIGRAVITY" title="Carbon + Hydrogen" mode="light" />
      {[M, M + CW - 380].map((gx) => (
        <div key={gx} style={{position: 'absolute', left: gx, top: 540, width: 380, height: 290, borderRadius: 30, border: `2px dashed ${p.line}`, boxSizing: 'border-box'}} />
      ))}
      <At x={M} y={540}>
        <ElementTile m="carbon" w={380} h={290} start={carbonAt} symSize={100} />
      </At>
      <At x={M + CW - 380} y={540}>
        <ElementTile m="hydrogen" w={380} h={290} start={hydroAt} symSize={100} />
      </At>
      <div style={{position: 'absolute', left: 468, top: 684, width: 144, height: 4, borderRadius: 2, backgroundColor: p.line, opacity: lk}} />
      <div style={{position: 'absolute', left: dotX - 9, top: 677, width: 18, height: 18, borderRadius: 9, backgroundColor: '#3a4fe0', opacity: lk}} />
      <div style={{position: 'absolute', left: 452, top: 624, width: 176, textAlign: 'center', fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: p.textAccent, opacity: lk, whiteSpace: 'nowrap'}}>
        ORCHESTRATOR
      </div>
      <div style={{position: 'absolute', left: M, top: 852, width: 380, textAlign: 'center', fontFamily: FONT.mono, fontSize: 22, color: p.muted, opacity: clamp01(pop(frame, carbonAt + 6, fps)), whiteSpace: 'nowrap'}}>
        menyusun rencana
      </div>
      <div style={{position: 'absolute', left: M + CW - 380, top: 852, width: 380, textAlign: 'center', fontFamily: FONT.mono, fontSize: 22, color: p.muted, opacity: clamp01(pop(frame, hydroAt + 6, fps)), whiteSpace: 'nowrap'}}>
        menulis & menguji kode
      </div>
      <At x={M} y={940}>
        <StatCard mode="light" w={456} h={200} start={anchor(id, '24', 0, 9.0)} label="KUOTA LEBIH HEMAT" value={24} prefix="−" suffix="%" sub="vs Carbon sendirian" accent={p.textAccent} />
      </At>
      <At x={M + 480} y={940}>
        <StatCard mode="light" w={456} h={200} start={anchor(id, 'mendekati', 0, 7.0)} label="KEBERHASILAN TUGAS" value={0} text="≈ Carbon" valueSize={72} sub="Terminal-Bench 4.0" accent={p.textAccent} />
      </At>
      <At x={M} y={1180}>
        <Chip mode="light" w={CW} start={anchor(id, 'kuota', 0, 10.0)} text="ORCHESTRATOR · GOOGLE AI ULTRA" accent={ACCENT.carbon} />
      </At>
    </Frame>
  );
};

export const S7Penutup: React.FC = () => {
  const id = 's7-penutup';
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('dark');
  const hero = pop(frame, 4, fps);
  const keys: ModelKey[] = ['argon', 'carbon', 'hydrogen'];
  const label = {argon: 'Argon', carbon: 'Carbon', hydrogen: 'Hydrogen'};
  return (
    <Frame mode="dark" accent={LIME} index={7} label="PENUTUP" icon={false}>
      <Img
        src={staticFile('assets/agent-icon-wordmark.png')}
        style={{position: 'absolute', left: 320, top: 250, width: 440, height: 465, opacity: clamp01(hero), transform: `scale(${0.88 + 0.12 * hero})`}}
      />
      {keys.map((k, i) => (
        <At key={k} x={M + i * 320} y={780}>
          <ElementTile m={k} w={296} h={200} start={anchor(id, label[k], 0, 2.0 + i * 2)} symSize={84} nameSize={26} />
        </At>
      ))}
      <Mono y={1040} start={anchor(id, 'keluarga.', 0, 7.0)} text="TIGA UNSUR · SATU KELUARGA" color={p.textAccent} size={32} />
      <Mono y={1130} start={anchor(id, 'Jadi,', 0, 0.5)} text="Sumber: Google DeepMind · blog.google · Google Cloud docs" color={p.muted} size={20} weight={400} />
      <Mono y={1166} start={anchor(id, 'Jadi,', 0, 0.5)} text="Data per 13 November 2026" color={p.muted} size={20} weight={400} />
    </Frame>
  );
};
