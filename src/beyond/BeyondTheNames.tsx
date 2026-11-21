import React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Backdrop } from './Backdrops';
import { BeatVisual, ChapterTitle, Subtitle } from './Scenes';
import { MODELS } from './script';
import { E, p, THEMES } from './theme';
import { ChapterSeg, OVERLAP, TL, TOTAL_FRAMES } from './timeline';

/** Kilatan anamorfik + whiteout di batas bab (cut tersembunyi di puncaknya). */
const Flare: React.FC<{ b: number; light: boolean }> = ({ b, light }) => {
  const f = useCurrentFrame();
  if (f < b - 14 || f > b + 20) return null;
  const up = p(f, b - 14, b, E.in);
  const down = 1 - p(f, b, b + 20, E.out);
  const a = f < b ? up : down;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 200 }}>
      <div style={{ position: 'absolute', inset: 0, background: light ? '#FFFFFF' : '#DCE6FF', opacity: a * 0.55 }} />
      <div style={{ position: 'absolute', left: '-10%', width: '120%', top: '50%', height: 6 + a * 40, marginTop: -(3 + a * 20), background: 'linear-gradient(90deg, transparent, #FFFFFF 30%, #FFFFFF 70%, transparent)', filter: 'blur(6px)', opacity: a, transform: `scaleX(${0.3 + 0.7 * a})` }} />
    </AbsoluteFill>
  );
};

const ChapterWrap: React.FC<{ seg: ChapterSeg }> = ({ seg }) => {
  const f = useCurrentFrame();
  const { chapter } = seg;
  const push = 1 + 0.05 * (1 - p(f, 0, 45));
  return (
    <AbsoluteFill>
      <Backdrop theme={chapter.theme} />
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        {seg.titleDur > 0 && (
          <Sequence from={0} durationInFrames={seg.titleDur} layout="none">
            <ChapterTitle ch={chapter} />
          </Sequence>
        )}
        {seg.beats.map((b, i) => {
          const last = i === seg.beats.length - 1;
          const extra = last ? 0 : OVERLAP;
          return (
            <Sequence key={i} from={b.from - seg.start} durationInFrames={b.dur + extra} layout="none">
              <BeatVisual chapter={chapter} v={b.beat.v} m={b.beat.m} />
            </Sequence>
          );
        })}
      </AbsoluteFill>
      {seg.beats.map(
        (b, i) =>
          b.beat.text && (
            <Sequence key={`s${i}`} from={b.from - seg.start + 6} durationInFrames={b.dur - 10} layout="none">
              <Subtitle text={b.beat.text} theme={chapter.theme} />
            </Sequence>
          )
      )}
    </AbsoluteFill>
  );
};

type Cue = { f: number; n: string; v?: number; d: number };
const LEN: Record<string, number> = { whoosh: 1.6, hit: 2.4, shimmer: 2, tick: 0.12, pluck: 1.4, riser: 3.2, page: 0.7 };

const cues = (): Cue[] => {
  const c: Cue[] = [];
  const add = (f: number, n: string, v = 0.5) => c.push({ f, n, v, d: Math.ceil(LEN[n] * 30) + 2 });
  TL.forEach((seg) => {
    if (seg.index > 0) {
      add(seg.start - 14, 'whoosh', 0.55);
      add(seg.start + 6, 'hit', 0.7);
    }
    seg.beats.forEach((b) => {
      if (b.beat.v === 'title') { add(b.from - 20, 'riser', 0.5); add(b.from + 40, 'hit', 0.8); }
      if (b.beat.v === 'model' && b.beat.m) {
        const co = MODELS[b.beat.m].company;
        if (co === 'anthropic') { add(b.from + 8, 'pluck', 0.5); if (b.beat.m !== 'haiku') add(b.from + 4, 'page', 0.4); }
        else add(b.from + 8, 'shimmer', 0.45);
      }
      if (b.beat.v === 'periodic') [0, 1, 2, 3].forEach((i) => add(b.from + 50 + i * 18, 'tick', 0.6));
      if (['cosmos', 'forms', 'orrery', 'atomic', 'scale', 'z2', 'z6'].includes(b.beat.v)) add(b.from + 10, 'shimmer', 0.35);
      if (b.beat.v === 'end') add(b.from + 4, 'shimmer', 0.5);
    });
  });
  return c;
};
const CUES = cues();

export const BeyondTheNames: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#05070D' }}>
      <Audio
        src={staticFile('audio/bed.mp3')}
        volume={(g) => interpolate(g, [0, 90, TOTAL_FRAMES - 180, TOTAL_FRAMES], [0, 0.5, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />
      {CUES.map((c, i) => (
        <Sequence key={i} from={Math.max(0, c.f)} durationInFrames={c.d} layout="none">
          <Audio src={staticFile(`audio/${c.n}.wav`)} volume={c.v} />
        </Sequence>
      ))}

      {TL.map((seg) => (
        <Sequence key={seg.chapter.id} from={seg.start} durationInFrames={seg.end - seg.start} layout="none">
          <ChapterWrap seg={seg} />
        </Sequence>
      ))}

      {TL.slice(1).map((seg) => (
        <Flare key={`fl-${seg.chapter.id}`} b={seg.start} light={THEMES[seg.chapter.theme].light} />
      ))}
    </AbsoluteFill>
  );
};
