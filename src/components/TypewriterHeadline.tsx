import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT} from '../theme-tokens';

interface TypewriterHeadlineProps {
  prefix?: string;
  text: string;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  charsPerSecond?: number;
  delay?: number;
  fontFamily?: string;
}

export const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  prefix,
  text,
  fontSize = 54,
  color = '#ffffff',
  cursorColor = '#38bdf8',
  charsPerSecond = 12,
  delay = 0,
  fontFamily = FONT.space,
}) => {
  const frame = useCurrentFrame();

  const animFrame = Math.max(0, frame - delay);
  // Total characters to reveal based on frames elapsed (assuming 30fps)
  const currentChars = Math.floor((animFrame / 30) * charsPerSecond);
  const visibleText = text.slice(0, currentChars);

  // Blinking cursor: cycle every 16 frames (~0.5s)
  const isCursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        fontFamily,
        fontSize,
        fontWeight: 700,
        color,
        letterSpacing: '-0.02em',
      }}
    >
      {prefix && (
        <span style={{color: '#94a3b8', fontWeight: 500}}>
          {prefix}
        </span>
      )}

      <span style={{position: 'relative', display: 'inline-flex', alignItems: 'center'}}>
        {visibleText}
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.1,
            height: fontSize * 0.9,
            backgroundColor: isCursorVisible ? cursorColor : 'transparent',
            marginLeft: 6,
            borderRadius: 2,
            boxShadow: isCursorVisible ? `0 0 10px ${cursorColor}` : 'none',
          }}
        />
      </span>
    </div>
  );
};
