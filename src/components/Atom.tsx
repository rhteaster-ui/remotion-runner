import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, ModelKey, MODELS} from '../lib/theme';
import {pop} from '../lib/anim';

const RADII: Record<number, number[]> = {1: [230], 2: [135, 240], 3: [100, 170, 240]};

export const Atom: React.FC<{m: ModelKey; size: number; start?: number}> = ({m, size, start = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const model = MODELS[m];
  const shells = model.shells;
  const radii = RADII[shells.length];
  const a = model.accent;
  const nucleus = pop(frame, start, fps);
  return (
    <svg width={size} height={size} viewBox="0 0 600 600" style={{overflow: 'visible'}}>
      <circle cx={300} cy={300} r={90 * nucleus + 1} fill={a} opacity={0.12} />
      <circle cx={300} cy={300} r={62 * nucleus + 1} fill={a} opacity={0.2} />
      {shells.map((n, k) => {
        const sp = pop(frame, start + 6 + k * 5, fps, 18);
        const r = radii[k] * sp;
        const dir = k % 2 === 0 ? 1 : -1;
        const speed = (0.034 - k * 0.007) * dir;
        return (
          <g key={k}>
            <circle cx={300} cy={300} r={Math.max(r, 0.1)} fill="none" stroke={a} strokeOpacity={0.6} strokeWidth={3} />
            {Array.from({length: n}).map((_, i) => {
              const ang = (i / n) * Math.PI * 2 + frame * speed + k * 0.9;
              const ex = 300 + Math.cos(ang) * r;
              const ey = 300 + Math.sin(ang) * r;
              return (
                <g key={i} opacity={Math.min(1, sp)}>
                  <circle cx={ex} cy={ey} r={20} fill={a} opacity={0.22} />
                  <circle cx={ex} cy={ey} r={11} fill={a} />
                  <circle cx={ex} cy={ey} r={4.5} fill="#ffffff" opacity={0.9} />
                </g>
              );
            })}
          </g>
        );
      })}
      <circle cx={300} cy={300} r={44 * nucleus + 0.1} fill={a} />
      <text
        x={300}
        y={300}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FONT.space}
        fontWeight={700}
        fontSize={model.sym.length > 1 ? 46 : 54}
        fill="#080b10"
        opacity={nucleus}
      >
        {model.sym}
      </text>
    </svg>
  );
};
