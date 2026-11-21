import {Easing, interpolate} from 'remotion';
export const SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
export const ACC = '#f5c542'; // satu-satunya aksen UI di seluruh video
export const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
