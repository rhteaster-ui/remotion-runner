import React from 'react';
import {useCurrentFrame} from 'remotion';

export type ShinaMood = 'happy' | 'working' | 'deadpan' | 'wink';

/**
 * Cute Pixel-Art Antigravity 'A' Companion Mascot (inspired by lunareaii)
 * Crisp 16x16 pixel grid rendered as razor-sharp SVG rectangles.
 */
export const PixelShina: React.FC<{
  size?: number;
  mood?: ShinaMood;
  showHeart?: boolean;
  showSparkle?: boolean;
  showDots?: boolean;
}> = ({size = 210, mood = 'happy', showHeart = false, showSparkle = false, showDots = false}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 9) * 6;
  const blink = f % 95 > 90;

  // 16x15 pixel map for Antigravity 'A' shape:
  // '.' empty, 'K' outline (#0B1221), 'B' cobalt blue (#1D5BFF), 'L' light blue (#3B82F6),
  // 'G' green (#22C55E), 'Y' yellow (#FACC15), 'R' red (#EF4444), 'C' cyan (#38BDF8)
  const grid = [
    '......KKKK......',
    '.....KGGYRK.....',
    '....KGGYYRRK....',
    '....KGCCCRRK....',
    '...KBCCCCCRBK...',
    '...KBBBBBBBBK...',
    '..KBBBBBBBBBBK..',
    '..KBBBBBBBBBBK..',
    '..KBBBBBBBBBBK..',
    '.KBBBBKKKKBBBBK.',
    '.KBBBK....KBBBK.',
    '.KBBK......KBBK.',
    '.KBBK......KBBK.',
    '.KBBK......KBBK.',
    '.KKKK......KKKK.',
  ];

  const palette: Record<string, string> = {
    K: '#0F172A',
    B: '#1D4ED8',
    L: '#3B82F6',
    G: '#10B981',
    Y: '#FACC15',
    R: '#EF4444',
    C: '#38BDF8',
  };

  const rects: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch !== '.') {
        rects.push(
          <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width={10.2} height={10.2} fill={palette[ch]} />
        );
      }
    }
  });

  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      transform: `translateY(${bob}px)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Soft ground shadow */}
      <div style={{
        position: 'absolute', bottom: -8, width: size * 0.68, height: 14,
        borderRadius: '50%', background: 'rgba(15, 23, 42, 0.14)', filter: 'blur(4px)',
      }} />

      <svg width={size} height={size} viewBox="0 0 180 160" style={{overflow: 'visible'}}>
        <g transform="translate(8, 4)">
          {rects}

          {/* Cheek blushes */}
          <rect x={42} y={72} width={14} height={8} fill="#F472B6" rx={2} />
          <rect x={104} y={72} width={14} height={8} fill="#F472B6" rx={2} />

          {/* Eyes by mood */}
          {mood === 'happy' && !blink && (
            <>
              {/* ^ ^ happy eyes */}
              <rect x={48} y={62} width={8} height={8} fill="#0F172A" />
              <rect x={56} y={56} width={8} height={8} fill="#0F172A" />
              <rect x={64} y={62} width={8} height={8} fill="#0F172A" />
              <rect x={92} y={62} width={8} height={8} fill="#0F172A" />
              <rect x={100} y={56} width={8} height={8} fill="#0F172A" />
              <rect x={108} y={62} width={8} height={8} fill="#0F172A" />
              {/* smile */}
              <rect x={74} y={76} width={14} height={7} fill="#0F172A" />
            </>
          )}
          {mood === 'happy' && blink && (
            <>
              <rect x={48} y={64} width={22} height={6} fill="#0F172A" />
              <rect x={92} y={64} width={22} height={6} fill="#0F172A" />
              <rect x={74} y={76} width={14} height={7} fill="#0F172A" />
            </>
          )}

          {mood === 'working' && (
            <>
              {/* focused eyes */}
              <rect x={52} y={58} width={12} height={12} fill="#0F172A" />
              <rect x={98} y={58} width={12} height={12} fill="#0F172A" />
              <rect x={54} y={60} width={4} height={4} fill="#FFFFFF" />
              <rect x={100} y={60} width={4} height={4} fill="#FFFFFF" />
              <rect x={76} y={76} width={10} height={6} fill="#0F172A" />
            </>
          )}

          {mood === 'deadpan' && (
            <>
              {/* - - unimpressed eyes */}
              <rect x={48} y={62} width={22} height={7} fill="#0F172A" />
              <rect x={92} y={62} width={22} height={7} fill="#0F172A" />
              <rect x={72} y={78} width={18} height={6} fill="#0F172A" />
            </>
          )}

          {mood === 'wink' && (
            <>
              <rect x={52} y={58} width={12} height={12} fill="#0F172A" />
              <rect x={54} y={60} width={4} height={4} fill="#FFFFFF" />
              <rect x={94} y={62} width={20} height={7} fill="#0F172A" />
              <rect x={74} y={76} width={14} height={7} fill="#0F172A" />
            </>
          )}

          {/* Floating Pixel Heart */}
          {showHeart && (
            <g transform={`translate(142, ${14 + Math.sin(f / 6) * 4})`}>
              <rect x={0} y={6} width={8} height={8} fill="#F43F5E" />
              <rect x={8} y={0} width={8} height={8} fill="#F43F5E" />
              <rect x={16} y={6} width={8} height={8} fill="#F43F5E" />
              <rect x={24} y={0} width={8} height={8} fill="#F43F5E" />
              <rect x={32} y={6} width={8} height={8} fill="#F43F5E" />
              <rect x={8} y={14} width={24} height={8} fill="#F43F5E" />
              <rect x={16} y={22} width={8} height={8} fill="#F43F5E" />
            </g>
          )}

          {/* Floating Pixel Sparkle */}
          {showSparkle && (
            <g transform={`translate(146, ${12 + Math.cos(f / 6) * 4})`}>
              <rect x={8} y={0} width={8} height={24} fill="#FACC15" />
              <rect x={0} y={8} width={24} height={8} fill="#FACC15" />
            </g>
          )}

          {/* Floating ... dots */}
          {showDots && (
            <g transform="translate(142, 34)">
              <rect x={0} y={0} width={8} height={8} fill="#0F172A" />
              <rect x={14} y={0} width={8} height={8} fill="#0F172A" />
              <rect x={28} y={0} width={8} height={8} fill="#0F172A" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
