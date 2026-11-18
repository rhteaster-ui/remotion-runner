import React from 'react';
import {tokens} from './tokens';

interface WatHUDProps {
  sceneNum: number;
  totalScenes?: number;
  title?: string;
}

export const WatHUD: React.FC<WatHUDProps> = ({
  sceneNum,
  totalScenes = 5,
  title,
}) => {
  const padNum = String(sceneNum).padStart(2, '0');
  const padTotal = String(totalScenes).padStart(2, '0');

  return (
    <div
      style={{
        position: 'absolute',
        top: 64,
        left: 64,
        right: 64,
        height: 76,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
      }}
    >
      {/* Mantra Chip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          backgroundColor: tokens.paper,
          border: `3px solid ${tokens.ink}`,
          borderRadius: 14,
          padding: '8px 18px',
          boxShadow: `4px 4px 0px ${tokens.ink}`,
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 20,
            fontWeight: 800,
            color: tokens.ink,
            letterSpacing: '1px',
          }}
        >
          MANTRA {padNum}/{padTotal}
        </span>
        {title && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'rgba(20, 16, 43, 0.7)',
              borderLeft: `2px solid ${tokens.ink}`,
              paddingLeft: 10,
            }}
          >
            {title}
          </span>
        )}
      </div>

      {/* Brand Wordmark (rhmt ofc) - Pure Text Typography */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: tokens.ink,
          border: `3px solid ${tokens.paper}`,
          borderRadius: 14,
          padding: '8px 18px',
          boxShadow: `4px 4px 0px rgba(0, 0, 0, 0.4)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: tokens.js,
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 20,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '1.5px',
            textTransform: 'lowercase',
          }}
        >
          rhmt ofc
        </span>
      </div>
    </div>
  );
};
