import React from 'react';
import {AbsoluteFill, Easing, Img, Sequence, Series, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {C, CL, asset} from './theme';
import {Chrome, Chip, Glass, Headline, Rise, SceneFade, Tag, useIn} from './ui';
import {WORKS} from './data';
import type {Work} from './data';

// ---------- 1. Boot (6 dtk) ----------
export const Boot: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = Math.round(interpolate(frame, [10, 130], [1, 100], {...CL, easing: Easing.out(Easing.cubic)}));
  const p = useIn(0);
  const av = useIn(20);
  return (
    <SceneFade inF={8} outF={16}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <Glass
          style={{
            width: 760,
            height: 760,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            opacity: p,
            transform: `scale(${0.9 + 0.1 * p})`,
          }}
        >
          <Img
            src={asset('images/pp-dev-icon.webp')}
            style={{width: 200, height: 200, borderRadius: 48, opacity: av, transform: `scale(${0.6 + 0.4 * av})`}}
          />
          <Tag>R_HMT / Personal Archive</Tag>
          <div style={{fontSize: 140, fontWeight: 300, fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>
            {String(pct).padStart(2, '0')}%
          </div>
          <div style={{width: 520, height: 4, borderRadius: 4, background: C.line}}>
            <div style={{width: `${pct}%`, height: '100%', borderRadius: 4, background: C.silver}} />
          </div>
          <Tag>Membuka ruang eksplorasi.</Tag>
        </Glass>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ---------- 2. Hero (10 dtk) ----------
const STATS: {v: number | string; l: string}[] = [
  {v: 19, l: 'Karya dan eksperimen'},
  {v: 19, l: 'Tools yang dicoba'},
  {v: '∞', l: 'Masih belajar'},
];
const STACK = [
  {src: 'images/anime-v22/elaina.jpg', rot: -9, x: -170, y: 40, d: 30, w: 400, h: 540},
  {src: 'components/works/repo-flow.svg', rot: 8, x: 190, y: -60, d: 20, w: 440, h: 300},
  {src: 'images/pp.webp', rot: 0, x: 0, y: 0, d: 10, w: 460, h: 600},
];

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneFade>
      <Chrome sec="SEC_00" title="Home" sys="SYS.00 // ARCHIVE_START" />
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 120px', gap: 80}}>
        <div style={{flex: 1}}>
          <Rise>
            <Tag style={{marginBottom: 28}}>A personal digital archive</Tag>
          </Rise>
          <Headline size={150} delay={6} lines={[{t: 'Learning'}, {t: 'in Progress.', italic: true}]} />
          <Rise delay={44} style={{marginTop: 28}}>
            <div style={{fontSize: 32, lineHeight: 1.45, color: C.silver, maxWidth: 760}}>
              Aku R_HMT. Belajar web development lewat proyek, eksperimen, dan kolaborasi bersama AI.
            </div>
          </Rise>
          <div style={{display: 'flex', gap: 56, marginTop: 56}}>
            {STATS.map((s, i) => {
              const n = typeof s.v === 'number' ? Math.round(interpolate(frame, [70 + i * 8, 112 + i * 8], [0, s.v], CL)) : s.v;
              return (
                <Rise key={i} delay={64 + i * 8}>
                  <div style={{fontSize: 84, fontWeight: 300, lineHeight: 1}}>{n}</div>
                  <div style={{fontSize: 24, color: C.mute, marginTop: 8}}>{s.l}</div>
                </Rise>
              );
            })}
          </div>
        </div>
        <div style={{width: 720, height: 800, position: 'relative'}}>
          {STACK.map((c, i) => {
            const p = spring({frame: frame - c.d, fps, config: {damping: 200}, durationInFrames: 40});
            const float = Math.sin((frame + i * 25) / 28) * 8;
            return (
              <Img
                key={i}
                src={asset(c.src)}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: c.w,
                  height: c.h,
                  objectFit: 'cover',
                  borderRadius: 28,
                  border: `1px solid ${C.line}`,
                  boxShadow: '0 40px 80px rgba(0,0,0,0.55)',
                  background: C.panel,
                  opacity: p,
                  transform: `translate(-50%,-50%) translate(${c.x}px,${c.y + float + (1 - p) * 80}px) rotate(${c.rot}deg) scale(${0.9 + 0.1 * p})`,
                }}
              />
            );
          })}
          <Rise delay={70} style={{position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)'}}>
            <Chip>R_HMT · Student · Developer · Explorer</Chip>
          </Rise>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

// ---------- 3. Selected Works (18 dtk) ----------
const CARD = 100;
const WorkCard: React.FC<{w: Work}> = ({w}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inP = spring({frame, fps, config: {damping: 200}, durationInFrames: 24});
  const out = interpolate(frame, [CARD - 12, CARD], [0, 1], CL);
  const x = (1 - inP) * 160 - out * 160;
  const zoom = interpolate(frame, [0, CARD], [1, 1.07], CL);
  return (
    <AbsoluteFill style={{opacity: inP * (1 - out), transform: `translateX(${x}px)`}}>
      <div style={{position: 'absolute', left: 96, top: 380, display: 'flex', gap: 56, alignItems: 'center'}}>
        <Glass style={{width: 1000, height: 560, overflow: 'hidden', padding: 0}}>
          <Img src={asset(w.img)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`}} />
        </Glass>
        <div style={{width: 640}}>
          <Tag>{w.no} / {w.cat}</Tag>
          <div style={{fontSize: 68, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '18px 0 22px'}}>{w.title}</div>
          <div style={{fontSize: 30, lineHeight: 1.45, color: C.silver}}>{w.desc}</div>
          <div style={{display: 'flex', gap: 14, marginTop: 30, flexWrap: 'wrap'}}>
            <Chip>{w.status}</Chip>
            <Chip>{w.url}</Chip>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Works: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(WORKS.length - 1, Math.max(0, Math.floor((frame - 40) / CARD)));
  return (
    <SceneFade>
      <Chrome sec="SEC_01" title="The digital archive" sys="SYS.01 // WORKS_TO_ORIGIN" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={72} delay={4} lines={[{t: 'Selected Works.'}, {t: 'Build. Learn. Repeat.', italic: true}]} />
      </div>
      <Rise delay={12} style={{position: 'absolute', right: 96, top: 150, textAlign: 'right'}}>
        <div style={{fontSize: 96, fontWeight: 300, fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>
          {WORKS[idx].no} <span style={{color: C.mute}}>/ 19</span>
        </div>
      </Rise>
      <Sequence from={40}>
        <Series>
          {WORKS.map((w) => (
            <Series.Sequence key={w.no} durationInFrames={CARD}>
              <WorkCard w={w} />
            </Series.Sequence>
          ))}
        </Series>
      </Sequence>
      <div style={{position: 'absolute', left: 96, bottom: 70, display: 'flex', gap: 12}}>
        {WORKS.map((w, i) => (
          <div key={w.no} style={{width: i === idx ? 56 : 14, height: 6, borderRadius: 6, background: i === idx ? C.silver : C.line}} />
        ))}
      </div>
    </SceneFade>
  );
};
