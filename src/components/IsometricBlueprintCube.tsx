import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

interface IsometricBlueprintCubeProps {
  color?: string;
  size?: number;
  expanded?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  delay?: number;
}

export const IsometricBlueprintCube: React.FC<IsometricBlueprintCubeProps> = ({
  color = '#38bdf8',
  size = 460,
  expanded = true,
  leftLabel = 'struktur',
  rightLabel = 'isi + kode',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const progress = spring({
    fps,
    frame: animFrame,
    config: {damping: 15, mass: 0.9, stiffness: 120},
  });

  const layerSpacing = expanded ? interpolate(progress, [0, 1], [0, 36]) : 0;
  const pulse = Math.sin(frame / 12) * 3;

  // Isometric projection helper points for a diamond rhombus (W: 240, H: 120)
  const cx = 250;
  const cy = 240 + pulse;
  const rw = 140;
  const rh = 70;

  const layers = [
    {id: 'layer-1', offset: -1.5 * layerSpacing, alpha: 0.95},
    {id: 'layer-2', offset: -0.5 * layerSpacing, alpha: 0.75},
    {id: 'layer-3', offset: 0.5 * layerSpacing, alpha: 0.55},
    {id: 'layer-4', offset: 1.5 * layerSpacing, alpha: 0.35},
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{overflow: 'visible'}}
      >
        {/* Base Ellipse Grid / Ground Ring */}
        <ellipse
          cx={cx}
          cy={380}
          rx="180"
          ry="36"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.3"
        />
        <ellipse
          cx={cx}
          cy={380}
          rx="120"
          ry="24"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.2"
        />

        {/* 4 Floating Layer Rhombuses */}
        {layers.map((l) => {
          const y = cy + l.offset;
          const pTop = `${cx},${y - rh}`;
          const pRight = `${cx + rw},${y}`;
          const pBottom = `${cx},${y + rh}`;
          const pLeft = `${cx - rw},${y}`;
          const points = `${pTop} ${pRight} ${pBottom} ${pLeft}`;

          return (
            <g key={l.id}>
              {/* Semi-transparent surface fill */}
              <polygon
                points={points}
                fill={color}
                fillOpacity={0.06 * l.alpha}
              />
              {/* Outer perimeter stroke */}
              <polygon
                points={points}
                stroke={color}
                strokeWidth="2"
                strokeOpacity={l.alpha}
              />
              {/* Inner concentric contour */}
              <polygon
                points={`${cx},${y - rh * 0.6} ${cx + rw * 0.6},${y} ${cx},${y + rh * 0.6} ${cx - rw * 0.6},${y}`}
                stroke={color}
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity={l.alpha * 0.6}
              />
            </g>
          );
        })}

        {/* Left Structure Dimension Callout */}
        {leftLabel && (
          <g opacity={progress}>
            {/* Vertical Bracket Line */}
            <line x1="80" y1={cy - 65} x2="80" y2={cy + 65} stroke={color} strokeWidth="1.5" />
            <line x1="72" y1={cy - 65} x2="88" y2={cy - 65} stroke={color} strokeWidth="1.5" />
            <line x1="72" y1={cy + 65} x2="88" y2={cy + 65} stroke={color} strokeWidth="1.5" />
            {/* Label */}
            <text
              x="65"
              y={cy + 5}
              fill={color}
              fontFamily={FONT.mono}
              fontSize="16"
              fontWeight="600"
              textAnchor="end"
              letterSpacing="0.04em"
            >
              {leftLabel}
            </text>
          </g>
        )}

        {/* Right Code/Content Dimension Callout */}
        {rightLabel && (
          <g opacity={progress}>
            {/* Vertical Dashed Bracket Line */}
            <line
              x1="420"
              y1={cy - 45}
              x2="420"
              y2={cy + 45}
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Label */}
            <text
              x="435"
              y={cy + 5}
              fill={color}
              fontFamily={FONT.mono}
              fontSize="16"
              fontWeight="600"
              textAnchor="start"
              letterSpacing="0.04em"
            >
              {rightLabel}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
