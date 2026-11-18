import React from 'react';
import {tokens} from '../tokens';

interface CodeSlabProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  style?: React.CSSProperties;
  fontSize?: number;
}

export const CodeSlab: React.FC<CodeSlabProps> = ({
  children,
  title = 'console.js',
  badge,
  style = {},
  fontSize = 38,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#0F0D1C',
        border: `4px solid ${tokens.ink}`,
        borderRadius: 24,
        boxShadow: `10px 10px 0px ${tokens.ink}`,
        overflow: 'hidden',
        color: '#FFFFFF',
        fontFamily: '"JetBrains Mono", "Courier New", monospace',
        fontSize,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          backgroundColor: '#1E1A38',
          borderBottom: `3px solid ${tokens.ink}`,
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: tokens.hot}} />
          <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: tokens.js}} />
          <div style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: tokens.mint}} />
          <span style={{fontSize: 20, color: 'rgba(255, 255, 255, 0.7)', marginLeft: 12, fontWeight: 700}}>
            {title}
          </span>
        </div>
        {badge && (
          <div
            style={{
              backgroundColor: tokens.hot,
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 800,
              padding: '4px 12px',
              borderRadius: 8,
              border: `2px solid ${tokens.ink}`,
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Code body */}
      <div style={{padding: '28px 32px', lineHeight: 1.5}}>
        {children}
      </div>
    </div>
  );
};
