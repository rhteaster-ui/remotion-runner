import React from 'react';
import {chipTokens} from './tokens';
import {FONT} from '../theme-tokens';

interface ChipHUDProps {
  index: string;
  label: string;
  dark?: boolean;
}

export const ChipHUD: React.FC<ChipHUDProps> = ({index, label, dark = true}) => {
  const border = dark ? 'rgba(255,255,255,0.22)' : chipTokens.ink;
  const bg = dark ? 'rgba(17, 16, 29, 0.72)' : chipTokens.white;
  const textCol = dark ? chipTokens.white : chipTokens.ink;

  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        left: 56,
        right: 56,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 80,
        pointerEvents: 'none',
      }}
    >
      {/* Left Scene Index Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 20px',
          borderRadius: 999,
          backgroundColor: bg,
          border: `3px solid ${border}`,
          boxShadow: dark ? '4px 4px 0px rgba(225,29,72,0.55)' : `4px 4px 0px ${chipTokens.ink}`,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: chipTokens.crimson,
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: textCol,
          }}
        >
          {index} · {label}
        </span>
      </div>

      {/* Right Personal Brand Badge (pure rhmt ofc — ZERO Gemini logo) */}
      <div
        style={{
          padding: '10px 20px',
          borderRadius: 999,
          backgroundColor: dark ? chipTokens.gold : chipTokens.ink,
          border: `3px solid ${dark ? chipTokens.ink : chipTokens.ink}`,
          boxShadow: dark ? `4px 4px 0px ${chipTokens.crimson}` : `4px 4px 0px ${chipTokens.crimson}`,
        }}
      >
        <span
          style={{
            fontFamily: FONT.space,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: dark ? chipTokens.ink : chipTokens.white,
          }}
        >
          rhmt ofc
        </span>
      </div>
    </div>
  );
};
