import React from 'react';
import {tokens} from '../tokens';

interface StampProps {
  text: string;
  color?: string; // misal tokens.hot atau tokens.mint
  tilt?: number;
  scale?: number;
  style?: React.CSSProperties;
}

export const Stamp: React.FC<StampProps> = ({
  text,
  color = tokens.hot,
  tilt = -6,
  scale = 1,
  style = {},
}) => {
  if (scale <= 0.01) return null;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `5px solid ${color}`,
        borderRadius: 14,
        padding: '10px 24px',
        color: color,
        fontWeight: 900,
        fontSize: 36,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        transform: `scale(${scale}) rotate(${tilt}deg)`,
        transformOrigin: 'center center',
        boxShadow: `4px 4px 0px rgba(20, 16, 43, 0.4)`,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        userSelect: 'none',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
