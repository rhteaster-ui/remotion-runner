import React from 'react';
import {FONT} from '../theme-tokens';

export interface CodeLine {
  num: number;
  code: string;
  isActive?: boolean;
  highlightText?: string;
  badge?: {
    label: string;
    icon?: string;
    color?: string;
  };
}

interface CodeInspectorProps {
  lines: CodeLine[];
  theme?: 'dark' | 'light';
  fontSize?: number;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({
  lines,
  theme = 'dark',
  fontSize = 20,
}) => {
  const isDark = theme === 'dark';
  const bg = isDark ? '#080d1a' : '#f8fafc';
  const textMuted = isDark ? '#64748b' : '#94a3b8';
  const activeBg = isDark ? 'rgba(234, 179, 8, 0.12)' : 'rgba(234, 179, 8, 0.18)';
  const activeBorder = '#eab308';

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: bg,
        borderRadius: 10,
        padding: '12px 0',
        fontFamily: FONT.mono,
        fontSize,
        lineHeight: 1.6,
        overflow: 'hidden',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {lines.map((line) => {
        const isActive = line.isActive;

        // Render code with highlightText if specified
        let codeContent: React.ReactNode = line.code;
        if (line.highlightText && line.code.includes(line.highlightText)) {
          const parts = line.code.split(line.highlightText);
          codeContent = (
            <>
              {parts[0]}
              <span
                style={{
                  backgroundColor: '#eab308',
                  color: '#000000',
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontWeight: 700,
                  boxShadow: '0 0 10px rgba(234, 179, 8, 0.6)',
                }}
              >
                {line.highlightText}
              </span>
              {parts.slice(1).join(line.highlightText)}
            </>
          );
        }

        return (
          <div
            key={line.num}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 16px',
              backgroundColor: isActive ? activeBg : 'transparent',
              borderLeft: isActive ? `4px solid ${activeBorder}` : '4px solid transparent',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 16, overflow: 'hidden'}}>
              {/* Line number */}
              <span
                style={{
                  color: isActive ? activeBorder : textMuted,
                  width: 32,
                  textAlign: 'right',
                  userSelect: 'none',
                  fontSize: fontSize - 2,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {line.num}
              </span>

              {/* Code line content */}
              <span
                style={{
                  color: isDark ? '#e2e8f0' : '#1e293b',
                  whiteSpace: 'pre',
                }}
              >
                {codeContent}
              </span>
            </div>

            {/* Inline Warning/Notice Badge */}
            {line.badge && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  borderRadius: 6,
                  backgroundColor: line.badge.color ? `${line.badge.color}22` : 'rgba(234, 179, 8, 0.2)',
                  border: `1px solid ${line.badge.color || '#eab308'}`,
                  color: line.badge.color || '#eab308',
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                {line.badge.icon && <span>{line.badge.icon}</span>}
                <span>{line.badge.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
