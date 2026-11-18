import React from 'react';
import {tokens} from '../tokens';

interface BurstProps {
  color?: string;
  size?: number;
  scale?: number;
  style?: React.CSSProperties;
}

export const Burst: React.FC<BurstProps> = ({
  color = tokens.js,
  size = 280,
  scale = 1,
  style = {},
}) => {
  if (scale <= 0.01) return null;
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{overflow: 'visible'}}
      >
        <polygon
          points="50,0 63,28 95,20 78,48 100,70 69,72 65,100 45,78 18,92 26,62 0,50 25,35 15,10 42,24"
          fill={color}
          stroke={tokens.ink}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
