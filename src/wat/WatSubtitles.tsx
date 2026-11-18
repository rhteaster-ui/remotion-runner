import React, {useMemo} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/wat-cues.json';
import {tokens} from './tokens';

interface WordItem {
  w: string;
  s: number; // detik mulai
  e: number; // detik selesai
  scene: string;
}

interface CueGroup {
  id: number;
  words: WordItem[];
  startSec: number;
  endSec: number;
}

export const WatSubtitles: React.FC<{bottomOffset?: number}> = ({
  bottomOffset = 84,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentSec = frame / fps;

  // Kelompokkan kata-kata menjadi baris cue (maks 5 kata atau jeda tanda baca / napas)
  const cueGroups = useMemo<CueGroup[]>(() => {
    const rawWords = data.words as WordItem[];
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
      const hasPause = nextItem && (nextItem.s - item.e > 0.35);

      if (hasPunct || isTooLong || hasPause || i === rawWords.length - 1) {
        flush();
      }
    }
    return groups;
  }, []);

  // Cari cue aktif: muncul 2 frame sebelum kata pertama, hilang 6 frame setelah kata terakhir
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
        left: 64,
        right: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px 18px',
          maxWidth: 960,
          textAlign: 'center',
        }}
      >
        {activeCue.words.map((item, idx) => {
          const isActive = currentSec >= item.s && currentSec <= item.e + 0.05;
          const isPast = currentSec > item.e + 0.05;

          // Spring pop untuk kata yang sedang aktif dibaca
          const wordFrame = Math.max(0, Math.round((currentSec - item.s) * fps));
          const popSpring = isActive
            ? spring({frame: wordFrame, fps, config: {damping: 10, mass: 0.5, stiffness: 200}})
            : 1;

          return (
            <span
              key={`${activeCue.id}-${idx}-${item.w}`}
              style={{
                fontFamily: '"Rubik", "Plus Jakarta Sans", sans-serif',
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: '1px',
                lineHeight: 1.3,
                display: 'inline-block',
                position: 'relative',
                transform: isActive ? `scale(${1 + 0.08 * popSpring})` : 'scale(1)',
                transition: 'opacity 0.1s ease',
                opacity: isActive ? 1 : isPast ? 0.95 : 0.55,
              }}
            >
              {/* Dynamic karaoke capsule highlight behind active word */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    inset: '-4px -10px',
                    backgroundColor: tokens.js,
                    borderRadius: 12,
                    border: `3px solid ${tokens.ink}`,
                    boxShadow: `3px 3px 0px ${tokens.ink}`,
                    zIndex: -1,
                  }}
                />
              )}

              {/* Text rendering */}
              <span
                style={{
                  color: isActive ? tokens.ink : '#FFFFFF',
                  WebkitTextStroke: isActive ? 'none' : `8px ${tokens.ink}`,
                  paintOrder: 'stroke fill',
                  filter: isActive ? 'none' : `drop-shadow(3px 3px 0px ${tokens.ink})`,
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
