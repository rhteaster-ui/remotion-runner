import {spring} from 'remotion';

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const pop = (frame: number, start: number, fps: number, stiffness = 170) =>
  spring({
    frame: frame - start,
    fps,
    config: {damping: 14, stiffness, mass: 0.7},
  });
