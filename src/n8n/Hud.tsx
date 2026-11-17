import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import data from '../data/n8n-subtitles.json';
import {C, FONT, clamp} from './theme';
import {ICONS} from './icons';
import {EXEC_END, EXEC_START} from './data';

const fmt = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${String(m).padStart(2, '0')}:${s.toFixed(1).padStart(4, '0')}`;
};

const LogoMark: React.FC = () => (
  <svg width={46} height={46} viewBox="0 0 44 44">
    <rect width="44" height="44" rx="13" fill={C.coral} />
    <circle cx="13" cy="14" r="4.2" fill="#0E0F12" />
    <circle cx="31" cy="30" r="4.2" fill="#0E0F12" />
    <path d="M13 14 C 25 14, 19 30, 31 30" stroke="#0E0F12" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const TopBar: React.FC<{t: number; frame: number}> = ({t, frame}) => {
  const running = t >= EXEC_START && t < EXEC_END;
  const finished = t >= EXEC_END;
  const el = Math.max(0, Math.min(t, EXEC_END) - EXEC_START);
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.3);
  const tone = finished ? C.green : running ? C.coral : C.dim;
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top: 64, height: 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 30}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 84, padding: '0 28px 0 18px', borderRadius: 28, background: 'rgba(26,27,32,0.94)', border: `1.5px solid ${C.border}`}}>
        <LogoMark />
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.ink, letterSpacing: '-0.01em'}}>OpsFlow</div>
        <div style={{fontFamily: FONT.mono, fontSize: 26, color: C.dim}}>/</div>
        <div style={{fontFamily: FONT.mono, fontSize: 25, color: C.muted}}>agentic-server</div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, height: 84, padding: '0 22px', borderRadius: 28, background: 'rgba(26,27,32,0.94)', border: `1.5px solid ${running ? 'rgba(255,109,90,0.6)' : C.border}`}}>
          <div style={{width: 16, height: 16, borderRadius: 8, background: tone, opacity: running ? pulse : 1}} />
          <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: finished ? C.green : C.ink}}>
            {finished ? `✓ ${el.toFixed(1)}s` : running ? fmt(el) : 'idle'}
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 84, padding: '0 20px', borderRadius: 28, background: 'rgba(26,27,32,0.94)', border: `1.5px solid ${C.border}`}}>
          <div style={{width: 54, height: 30, borderRadius: 15, background: C.green, position: 'relative'}}>
            <div style={{position: 'absolute', right: 4, top: 4, width: 22, height: 22, borderRadius: 11, background: '#0E0F12'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PROMPT = 'Cek VPS-2, fix bug login, lalu rangkum log';

export const PromptBubble: React.FC<{t: number}> = ({t}) => {
  const inP = interpolate(t, [6.5, 6.95], [0, 1], clamp);
  const outP = interpolate(t, [9.3, 9.9], [1, 0], clamp);
  const o = Math.min(inP, outP);
  if (o <= 0) return null;
  const typed = PROMPT.slice(0, Math.floor(interpolate(t, [6.95, 8.8], [0, PROMPT.length], clamp)));
  const sent = t >= 9.1;
  const rise = interpolate(t, [9.1, 9.9], [0, -34], clamp);
  const caret = !sent && Math.floor(t * 2.6) % 2 === 0;
  return (
    <div style={{position: 'absolute', left: 48, right: 48, top: 1322, height: 100, zIndex: 25, opacity: o, transform: `translateY(${(1 - inP) * 24 + rise}px)`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px 0 32px', borderRadius: 36, background: C.tile, border: `2px solid ${sent ? C.coral : C.border}`, boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
      <div style={{flex: 1, fontFamily: FONT.mono, fontSize: 30, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden'}}>
        <span style={{color: C.coral, fontWeight: 700}}>› </span>
        {typed}
        <span style={{opacity: caret ? 1 : 0, color: C.coral}}>▍</span>
      </div>
      <div style={{width: 68, height: 68, borderRadius: 34, background: C.coral, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${sent ? 0.9 : 1})`}}>
        <ICONS.arrowUp c="#0E0F12" s={34} />
      </div>
    </div>
  );
};

const IconBtn: React.FC<{k: 'fit' | 'plus' | 'minus'}> = ({k}) => {
  const I = ICONS[k];
  return (
    <div style={{width: 68, height: 68, borderRadius: 22, background: C.tile2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <I c={C.muted} s={32} />
    </div>
  );
};

export const Toolbar: React.FC<{t: number; frame: number}> = ({t, frame}) => {
  const running = t >= 9.4 && t < EXEC_END + 0.2;
  const finished = t >= EXEC_END + 0.2;
  const bump = interpolate(t, [8.95, 9.1, 9.35], [0, 1, 0], clamp);
  const ripple = interpolate(t, [9.1, 9.8], [0, 1], clamp);
  const label = finished ? 'Executed' : running ? 'Executing…' : 'Execute workflow';
  const bg = finished ? 'rgba(61,220,151,0.16)' : running ? C.tile2 : C.coral;
  const fg = finished ? C.green : running ? C.coral : '#0E0F12';
  const Ico = finished ? ICONS.check : running ? ICONS.spinner : ICONS.play;
  return (
    <div style={{position: 'absolute', left: '50%', top: 1458, transform: 'translateX(-50%)', zIndex: 30, display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 36, background: 'rgba(26,27,32,0.96)', border: `1.5px solid ${C.border}`, boxShadow: '0 24px 50px rgba(0,0,0,0.5)'}}>
      <IconBtn k="fit" />
      <IconBtn k="plus" />
      <IconBtn k="minus" />
      <div style={{width: 2, height: 40, background: C.border, margin: '0 6px'}} />
      <div style={{position: 'relative', width: 380, height: 68}}>
        {ripple > 0 && ripple < 1 && (
          <div style={{position: 'absolute', inset: -ripple * 26, borderRadius: 22 + ripple * 26, border: `3px solid ${C.coral}`, opacity: 1 - ripple}} />
        )}
        <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: bg, border: running ? `2px solid ${C.coral}` : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, transform: `scale(${1 - 0.06 * bump})`}}>
          <div style={{display: 'flex', transform: running ? `rotate(${frame * 9}deg)` : undefined}}>
            <Ico c={fg} s={32} />
          </div>
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 31, color: fg}}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export const Toast: React.FC<{frame: number}> = ({frame}) => {
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const at = EXEC_END + 0.1;
  if (t < at || t > at + 3.6) return null;
  const p = spring({frame: frame - at * fps, fps, config: {damping: 14, stiffness: 160, mass: 0.7}});
  const out = interpolate(t, [at + 3.0, at + 3.6], [1, 0], clamp);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 166, display: 'flex', justifyContent: 'center', zIndex: 40, opacity: Math.min(1, p) * out, transform: `translateY(${(1 - p) * -30}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 30px', borderRadius: 26, background: C.tile, border: `2px solid ${C.green}`, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
        <div style={{width: 40, height: 40, borderRadius: 20, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <ICONS.check c="#0E0F12" s={24} />
        </div>
        <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: C.ink}}>Workflow berhasil dieksekusi</div>
      </div>
    </div>
  );
};

/* ───────────── Subtitle (kata aktif menyala koral) ───────────── */
type Word = {text: string; start: number; end: number};
type Caption = {id: number; lines: string[]; words: Word[]; start: number; end: number};
const CAPTIONS = data.captions as unknown as Caption[];

export const N8nSubtitles: React.FC<{bottom?: number; fontSize?: number}> = ({bottom = 230, fontSize = 44}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const inP = interpolate(t, [cap.start, cap.start + 0.14], [0, 1], clamp);
  const outP = interpolate(t, [cap.end - 0.1, cap.end], [1, 0], clamp);
  let idx = 0;
  const lines = cap.lines.map((l) => {
    const n = l.split(' ').length;
    const ws = cap.words.slice(idx, idx + n);
    idx += n;
    return ws;
  });
  return (
    <div style={{position: 'absolute', left: 48, right: 48, bottom, zIndex: 60, display: 'flex', justifyContent: 'center', opacity: Math.min(inP, outP), transform: `translateY(${(1 - inP) * 8}px)`, pointerEvents: 'none'}}>
      <div style={{padding: '18px 30px', borderRadius: 30, background: 'rgba(14,15,18,0.82)', border: `1.5px solid ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
        {lines.map((ws, li) => (
          <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 14px'}}>
            {ws.map((w, wi) => {
              const active = t >= w.start && t < w.end;
              const spoken = t >= w.end;
              return (
                <span key={wi} style={{fontFamily: FONT.sans, fontWeight: active ? 800 : 700, fontSize, lineHeight: 1.25, letterSpacing: '-0.01em', color: active ? '#0E0F12' : spoken ? C.ink : 'rgba(243,240,234,0.45)', background: active ? C.coral : 'transparent', padding: '2px 10px', borderRadius: 12}}>
                  {w.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
