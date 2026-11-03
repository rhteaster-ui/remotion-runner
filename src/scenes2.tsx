import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, CL, asset} from './theme';
import {Chrome, Chip, Glass, Headline, Logo, Rise, SceneFade, Tag, useIn} from './ui';
import {CHAPTERS, CHARS, FLOW, TOOLS} from './data';

// ---------- 4. Journey (14 dtk) ----------
const CODE = 'const curiosity = true;\nwhile (curiosity) {\n  learn();\n  build();\n  iterate();\n}';
const STEP = 65;

export const Journey: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const idx = Math.min(5, Math.max(0, Math.floor((frame - 30) / STEP)));
  const local = Math.max(0, frame - 30 - idx * STEP);
  const ch = CHAPTERS[idx];
  const p = spring({frame: local, fps, config: {damping: 200}, durationInFrames: 22});
  const typed = CODE.slice(0, Math.floor(interpolate(local, [8, 52], [0, CODE.length], CL)));
  return (
    <SceneFade>
      <Chrome sec="SEC_03" title="The evolution / 6 chapters" sys="SYS.03 // HARDWARE_TO_TECH" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={72} delay={2} lines={[{t: 'Dari tugas sekolah.'}, {t: 'Lalu keterusan.', italic: true}]} />
      </div>
      <Rise delay={10} style={{position: 'absolute', right: 96, top: 150}}>
        <Chip>Oppo A3s · Android 8.1 · tanpa laptop</Chip>
      </Rise>
      <div style={{position: 'absolute', left: 96, top: 400, width: 640}}>
        {CHAPTERS.map((c, i) => {
          const on = i === idx;
          const done = i < idx;
          const vis = useIn(10 + i * 4);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, height: 94, opacity: vis * (on ? 1 : done ? 0.6 : 0.35)}}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  border: `1px solid ${on ? C.silver : C.line}`,
                  background: on ? C.silver : 'transparent',
                  color: on ? C.bg : C.silver,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 500,
                }}
              >
                {i + 1}
              </div>
              <div style={{fontSize: on ? 42 : 34, fontWeight: on ? 700 : 400, letterSpacing: '-0.01em'}}>{c.short}</div>
            </div>
          );
        })}
      </div>
      <Glass style={{position: 'absolute', right: 96, top: 340, width: 1000, height: 600, padding: 56}}>
        <div style={{opacity: p, transform: `translateY(${(1 - p) * 24}px)`}}>
          <Tag>Chapter / 0{idx + 1}</Tag>
          <div style={{fontSize: 60, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, margin: '20px 0 24px'}}>{ch.title}</div>
          <div style={{fontSize: 32, lineHeight: 1.45, color: C.silver}}>{ch.body}</div>
          {idx === 0 ? (
            <pre
              style={{
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.5,
                fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
                color: C.glint,
                background: 'rgba(0,0,0,0.35)',
                border: `1px solid ${C.line}`,
                borderRadius: 18,
                padding: '18px 26px',
                height: 200,
              }}
            >
              {typed}
            </pre>
          ) : (
            <div style={{display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap'}}>
              {ch.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}
        </div>
      </Glass>
    </SceneFade>
  );
};

// ---------- 5. Stack & Tools (10 dtk) ----------
const OrbitPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cx = 1290;
  const cy = 540;
  const rings = [
    {r: 250, items: TOOLS.slice(0, 9), dir: 1, speed: 0.35},
    {r: 395, items: TOOLS.slice(9), dir: -1, speed: 0.22},
  ];
  return (
    <SceneFade>
      <Chrome sec="SEC_04" title="Under the glass / stack & tools" sys="SYS.04 // WORKFLOW_TO_LIFE" />
      <div style={{position: 'absolute', left: 96, top: 330}}>
        <Headline size={110} delay={2} lines={[{t: 'Different tools.'}, {t: 'Masih eksplorasi.', italic: true}]} />
        <Rise delay={40} style={{marginTop: 24, fontSize: 32, color: C.silver, maxWidth: 640, lineHeight: 1.45}}>
          19 tools dari AI, builder, sampai infrastruktur. Yang dicari: relevansi dalam workflow.
        </Rise>
      </div>
      {rings.map((ring, ri) =>
        ring.items.map((name, i) => {
          const ang = ((i / ring.items.length) * 360 + frame * ring.speed * ring.dir) * (Math.PI / 180);
          const x = cx + Math.cos(ang) * ring.r;
          const y = cy + Math.sin(ang) * ring.r;
          const p = spring({frame: frame - (10 + i * 3 + ri * 12), fps, config: {damping: 200}, durationInFrames: 28});
          return (
            <div key={name} style={{position: 'absolute', left: x - 46, top: y - 46, opacity: p, transform: `scale(${p})`}}>
              <Logo name={name} />
            </div>
          );
        }),
      )}
      <Img
        src={asset('images/pp-dev-icon.webp')}
        style={{position: 'absolute', left: cx - 90, top: cy - 90, width: 180, height: 180, borderRadius: 44, border: `1px solid ${C.line}`}}
      />
    </SceneFade>
  );
};

const FlowPhase: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFade>
      <Chrome sec="SEC_04" title="Built into this portfolio" sys="SYS.04 // SOURCE_BUILD_DEPLOY" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={96} delay={2} lines={[{t: 'Under the glass.', italic: true}]} />
      </div>
      <div style={{position: 'absolute', left: 96, right: 96, top: 340, display: 'flex', gap: 40}}>
        {FLOW.map((s, i) => {
          const start = 22 + i * 36;
          const lit = interpolate(frame, [start, start + 18], [0, 1], CL);
          return (
            <Glass key={s.stage} style={{flex: 1, padding: 44, minHeight: 520, borderColor: `rgba(201,209,218,${0.1 + 0.4 * lit})`, opacity: 0.4 + 0.6 * lit}}>
              <Tag>0{i + 1} / {s.stage}</Tag>
              <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 36}}>
                {s.items.map((it) => (
                  <div key={it.label} style={{display: 'flex', alignItems: 'center', gap: 24}}>
                    {it.icon ? (
                      <Logo name={it.icon} size={84} />
                    ) : (
                      <div style={{width: 84, height: 84, borderRadius: 24, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.silver, fontSize: 28}}>
                        {'</>'}
                      </div>
                    )}
                    <div style={{fontSize: 40, fontWeight: 500}}>{it.label}</div>
                  </div>
                ))}
              </div>
            </Glass>
          );
        })}
      </div>
    </SceneFade>
  );
};

export const Stack: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={160}>
      <OrbitPhase />
    </Sequence>
    <Sequence from={150}>
      <FlowPhase />
    </Sequence>
  </AbsoluteFill>
);

// ---------- 6. Personal Universe (8 dtk) ----------
const CharsPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <SceneFade>
      <Chrome sec="SEC_05" title="The personal universe" sys="SYS.05 // HUMAN_X_AI" />
      <div style={{position: 'absolute', left: 96, top: 130}}>
        <Headline size={72} delay={2} lines={[{t: 'My Waifu.'}, {t: 'A little more me.', italic: true}]} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 360, display: 'flex', justifyContent: 'center', gap: 44}}>
        {CHARS.map((c, i) => {
          const p = spring({frame: frame - (10 + i * 10), fps, config: {damping: 200}, durationInFrames: 36});
          const big = i === 1;
          return (
            <div key={c.name} style={{position: 'relative', width: 440, height: 600, opacity: p, transform: `translateY(${(1 - p) * 90}px) scale(${big ? 1.06 : 1})`}}>
              <Img src={asset(c.img)} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 28, border: `1px solid ${C.line}`}} />
              <div style={{position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(180deg, transparent 55%, rgba(8,11,16,0.92))'}} />
              <div style={{position: 'absolute', left: 32, bottom: 30}}>
                <Tag style={{fontSize: 18}}>{c.tag}</Tag>
                <div style={{fontSize: 44, fontWeight: 700, marginTop: 6}}>{c.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </SceneFade>
  );
};

const DuoPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 100], [1.0, 1.06], CL);
  return (
    <SceneFade>
      <AbsoluteFill style={{padding: 96}}>
        <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', border: `1px solid ${C.line}`}}>
          <Img src={asset('images/anime-v22/duo.jpg')} style={{width: '100%', height: '100%', objectFit: 'contain', background: C.panel, transform: `scale(${zoom})`}} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,11,16,0.85), transparent 55%)'}} />
          <div style={{position: 'absolute', left: 64, bottom: 64}}>
            <Tag>Classroom of the Elite</Tag>
            <div style={{marginTop: 10}}>
              <Headline size={120} delay={4} lines={[{t: 'Kings & Queen.', italic: true}]} />
            </div>
            <Rise delay={30} style={{fontSize: 30, color: C.silver, marginTop: 6}}>Ayanokouji × Arisu Sakayanagi</Rise>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFade>
  );
};

export const Universe: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={0} durationInFrames={150}>
      <CharsPhase />
    </Sequence>
    <Sequence from={140}>
      <DuoPhase />
    </Sequence>
  </AbsoluteFill>
);
