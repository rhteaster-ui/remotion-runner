import React from 'react';
import {tokens} from '../tokens';

interface StickerCardProps {
  children: React.ReactNode;
  bg?: string;
  tilt?: number; // derajat, misal -2 atau 2
  scale?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const StickerCard: React.FC<StickerCardProps> = ({
  children,
  bg = tokens.paper,
  tilt = 0,
  scale = 1,
  style = {},
}) => {
  return (
    <div
      style={{
        backgroundColor: bg,
        border: `4px solid ${tokens.ink}`,
        borderRadius: 28,
        boxShadow: `10px 10px 0px ${tokens.ink}`,
        transform: `scale(${scale}) rotate(${tilt}deg)`,
        transformOrigin: 'center center',
        padding: '32px 36px',
        color: tokens.ink,
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
