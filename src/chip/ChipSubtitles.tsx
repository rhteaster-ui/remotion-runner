import React, {useMemo} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/chip-cues.json';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

interface WordItem {
  w: string;
  s: number;
  e: number;
  scene: string;
}

interface CueGroup {
  id: number;
  words: WordItem[];
  startSec: number;
  endSec: number;
}

export const ChipSubtitles: React.FC<{bottomOffset?: number}> = ({
  bottomOffset = 84,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentSec = frame / fps;

  const cueGroups = useMemo<CueGroup[]>(() => {
    const rawWords = (data.words || []) as WordItem[];
    const groups: CueGroup[] = [];
    let curGroup: WordItem[] = [];

    const flush = () => {
      if (curGroup.length > 0) {
        groups.push({
          id: groups.length,
          words: curGroup,
          startSec: curGroup[0].s,
          endSec: curGroup[curGroup.length - 1].e,
        });
        curGroup = [];
      }
    };

    for (let i = 0; i < rawWords.length; i++) {
      const item = rawWords[i];
      curGroup.push(item);

      const hasPunct = /[.,?!:…]/.test(item.w);
      const isTooLong = curGroup.length >= 5;
      const nextItem = rawWords[i + 1];
      const hasPause = nextItem && nextItem.s - item.e > 0.32;

      if (hasPunct || isTooLong || hasPause || i === rawWords.length - 1) {
        flush();
      }
    }
    return groups;
  }, []);

  const activeCue = cueGroups.find((g) => {
    const cueStartSec = g.startSec - 2 / fps;
    const cueEndSec = g.endSec + 6 / fps;
    return currentSec >= cueStartSec && currentSec <= cueEndSec;
  });

  if (!activeCue) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        left: 56,
        right: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 95,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 24px',
          maxWidth: 968,
          textAlign: 'center',
        }}
      >
        {activeCue.words.map((item, idx) => {
          const isActive = currentSec >= item.s && currentSec < item.e;
          const isPast = currentSec >= item.e;

          const wordFrame = Math.max(0, Math.round((currentSec - item.s) * fps));
          const popSpring = isActive
            ? spring({
                frame: wordFrame,
                fps,
                config: {damping: 12, mass: 0.45, stiffness: 220},
              })
            : 1;

          return (
            <span
              key={`${activeCue.id}-${idx}-${item.w}`}
              style={{
                fontFamily: FONT.space,
                fontSize: 44,
                fontWeight: 700,
                letterSpacing: '0.4px',
                lineHeight: 1.32,
                display: 'inline-block',
                position: 'relative',
                transform: isActive ? `scale(${1 + 0.06 * popSpring})` : 'scale(1)',
                opacity: isActive ? 1 : isPast ? 0.96 : 0.65,
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    inset: '-2px -10px',
                    backgroundColor: chipTokens.gold,
                    borderRadius: 12,
                    border: `3px solid ${chipTokens.ink}`,
                    boxShadow: `4px 4px 0px ${chipTokens.ink}`,
                    zIndex: -1,
                  }}
                />
              )}
              <span
                style={{
                  color: isActive ? chipTokens.ink : chipTokens.white,
                  WebkitTextStroke: isActive ? '0px transparent' : `8px ${chipTokens.ink}`,
                  paintOrder: 'stroke fill',
                  filter: isActive ? 'none' : `drop-shadow(3px 3px 0px ${chipTokens.ink})`,
                }}
              >
                {item.w}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
