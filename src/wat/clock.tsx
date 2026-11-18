import React, {createContext, useContext} from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/wat-cues.json';

export const SceneStart = createContext<number>(0);

export const useGlobalFrame = (): number => {
  const localFrame = useCurrentFrame();
  const start = useContext(SceneStart);
  return localFrame + start;
};

export const markerFrame = (name: string): number => {
  const m = (data.markers as Record<string, {f: number; t: number}>)[name];
  if (!m) {
    console.warn(`Marker "${name}" tidak ditemukan di wat-cues.json`);
    return 0;
  }
  return m.f;
};

/** frame sejak marker terjadi. Negatif = belum terjadi. */
export const useSince = (name: string): number => {
  const gf = useGlobalFrame();
  return gf - markerFrame(name);
};

/** 0 sebelum marker, lalu spring yang mulai TEPAT di frame marker kata. */
export const useHit = (
  name: string,
  cfg = {damping: 11, mass: 0.6, stiffness: 160}
): number => {
  const {fps} = useVideoConfig();
  const s = useSince(name);
  return s < 0 ? 0 : spring({frame: s, fps, config: cfg});
};
