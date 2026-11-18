import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, MODELS, ModelKey, Mode, pal} from '../lib/theme';
import {clamp01, pop} from '../lib/anim';
import {ModelCoreIcon} from './ModelIcons';

const DARK_TILE = '#0f172a';

const TIER_META: Record<ModelKey, {tier: string; tag: string}> = {
  argon: {tier: 'PRO TIER', tag: 'CODE & LOGIC'},
  carbon: {tier: 'ULTRA TIER', tag: 'DEEP REASONING'},
  hydrogen: {tier: 'FLASH TIER', tag: 'HYPERSPEED'},
};

export const ElementTile: React.FC<{
  m: ModelKey;
  w: number;
  h: number;
  start: number;
  symSize?: number;
  nameSize?: number;
}> = ({m, w, h, start, nameSize = 28}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const model = MODELS[m];
  const meta = TIER_META[m];
  const p = pop(frame, start, fps);
  const o = clamp01(p);
  const iconSize = h > 300 ? 88 : h > 220 ? 68 : 52;
  return (
    <div
      style={{
        width: w,
        height: h,
        position: 'relative',
        borderRadius: 30,
        backgroundColor: DARK_TILE,
        border: `2px solid ${model.accent}77`,
        boxShadow: `0 18px 40px rgba(0,0,0,0.45), inset 0 0 50px -15px ${model.accent}33`,
        opacity: o,
        transform: `translateY(${(1 - p) * 40}px) scale(${0.92 + 0.08 * Math.min(1.05, p)})`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 18px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 18, color: model.accent, letterSpacing: '0.06em'}}>
          {meta.tier}
        </div>
        <Img src={staticFile('assets/portfolio/rhmt-mark.svg')} style={{width: 24, height: 24}} />
      </div>

      <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            position: 'absolute',
            width: iconSize * 1.5,
            height: iconSize * 1.5,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${model.accent}33 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
        <ModelCoreIcon m={m} size={iconSize} color={model.accent} />
      </div>

      <div style={{textAlign: 'center', width: '100%'}}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontWeight: 800,
            fontSize: nameSize,
            color: '#f8fafc',
            letterSpacing: '0.02em',
          }}
        >
          {model.name.toUpperCase()}
        </div>
        <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 16, color: '#94a3b8', marginTop: 4, letterSpacing: '0.04em'}}>
          {meta.tag}
        </div>
      </div>
    </div>
  );
};

export const StatCard: React.FC<{
  mode: Mode;
  w: number;
  h: number;
  start: number;
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  sub?: string;
  accent: string;
  valueSize?: number;
  text?: string;
}> = ({mode, w, h, start, label, value, decimals = 0, prefix = '', suffix = '', sub, accent, valueSize = 96, text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const s = pop(frame, start, fps);
  const k = interpolate(frame, [start, start + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shown = text ?? `${prefix}${(value * k).toFixed(decimals)}${suffix}`;
  return (
    <div
      style={{
        width: w,
        height: h,
        boxSizing: 'border-box',
        padding: '22px 28px',
        borderRadius: 28,
        backgroundColor: p.surface,
        border: `2px solid ${p.line}`,
        boxShadow: `0 14px 34px ${p.shadow}`,
        opacity: clamp01(s),
        transform: `translateY(${(1 - s) * 30}px)`,
        overflow: 'hidden',
      }}
    >
      <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: p.muted, letterSpacing: '0.04em', whiteSpace: 'nowrap'}}>{label}</div>
      <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: valueSize, lineHeight: 1.05, color: accent, marginTop: 6, whiteSpace: 'nowrap', letterSpacing: '-0.02em'}}>
        {shown}
      </div>
      {sub ? <div style={{fontFamily: FONT.mono, fontWeight: 400, fontSize: 22, color: p.muted, marginTop: 6, whiteSpace: 'nowrap'}}>{sub}</div> : null}
    </div>
  );
};

export const Chip: React.FC<{mode: Mode; w: number; start: number; text: string; accent?: string}> = ({mode, w, start, text, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const s = pop(frame, start, fps);
  return (
    <div
      style={{
        width: w,
        height: 76,
        boxSizing: 'border-box',
        borderRadius: 38,
        backgroundColor: p.surface,
        border: `2px solid ${accent ?? p.line}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: clamp01(s),
        transform: `translateY(${(1 - s) * 20}px)`,
      }}
    >
      <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: p.ink, letterSpacing: '0.03em', whiteSpace: 'nowrap'}}>{text}</span>
    </div>
  );
};

export const Bar: React.FC<{mode: Mode; w: number; start: number; label: string; value: number; max: number; decimals?: number; color: string}> = ({
  mode,
  w,
  start,
  label,
  value,
  max,
  decimals = 0,
  color,
}) => {
  const frame = useCurrentFrame();
  const p = pal(mode);
  const k = interpolate(frame, [start, start + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const labelW = 170;
  const trackW = w - labelW - 120;
  return (
    <div style={{display: 'flex', alignItems: 'center', width: w, height: 44, opacity: clamp01(k * 3)}}>
      <div style={{width: labelW, fontFamily: FONT.sans, fontWeight: 800, fontSize: 26, color: p.ink}}>{label}</div>
      <div style={{width: trackW, height: 22, borderRadius: 11, backgroundColor: p.surface2, overflow: 'hidden'}}>
        <div style={{width: `${(value / max) * 100 * k}%`, height: '100%', borderRadius: 11, backgroundColor: color}} />
      </div>
      <div style={{width: 120, textAlign: 'right', fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: p.ink}}>
        {(value * k).toFixed(decimals)}%
      </div>
    </div>
  );
};
