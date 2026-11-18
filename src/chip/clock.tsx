import {createContext, useContext} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/chip-cues.json';

export const ChipSceneStart = createContext(0);

export const useGlobalFrame = () => useCurrentFrame() + useContext(ChipSceneStart);

export const markerFrame = (name: string): number => {
  const m = (data.markers as Record<string, {f: number; t: number}>)[name];
  if (!m) return 0;
  return m.f;
};

export const useSince = (name: string) => useGlobalFrame() - markerFrame(name);

export const useHit = (
  name: string,
  cfg = {damping: 12, mass: 0.6, stiffness: 170},
) => {
  const {fps} = useVideoConfig();
  const s = useSince(name);
  return s < 0 ? 0 : spring({frame: s, fps, config: cfg});
};
