import React from 'react';
import {tokens} from '../tokens';

interface TerminalSlabProps {
  promptText: string;
  resultText?: string;
  isGlitch?: boolean;
  style?: React.CSSProperties;
}

export const TerminalSlab: React.FC<TerminalSlabProps> = ({
  promptText,
  resultText,
  isGlitch = false,
  style = {},
}) => {
  return (
    <div
      style={{
        backgroundColor: '#050508',
        border: `4px solid ${tokens.ink}`,
        borderRadius: 24,
        boxShadow: `10px 10px 0px ${tokens.ink}`,
        padding: '32px 36px',
        fontFamily: '"JetBrains Mono", monospace',
        color: '#FFFFFF',
        fontSize: 38,
        lineHeight: 1.6,
        ...style,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
        <span style={{color: tokens.mint, fontWeight: 900}}>&gt;</span>
        <span style={{fontWeight: 700}}>{promptText}</span>
      </div>

      {resultText && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '2px dashed rgba(255, 255, 255, 0.2)',
            color: isGlitch ? tokens.hot : tokens.js,
            fontWeight: 900,
            fontSize: 44,
            textShadow: isGlitch
              ? `-3px 0 ${tokens.sky}, 3px 0 ${tokens.hot}`
              : 'none',
          }}
        >
          {resultText}
        </div>
      )}
    </div>
  );
};
