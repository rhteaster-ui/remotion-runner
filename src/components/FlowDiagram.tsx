import React from 'react';
import {FONT} from '../theme-tokens';

export interface FlowNode {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'primary' | 'secondary' | 'danger' | 'warning';
  icon?: string;
}

interface FlowDiagramProps {
  nodes: FlowNode[];
  boundaryWarning?: {
    label: string;
    items: string[];
  };
  theme?: 'dark' | 'light';
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  boundaryWarning,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const cardBg = isDark ? '#141d2e' : '#ffffff';
  const border = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.2)';
  const textPrimary = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '16px 0',
      }}
    >
      {/* Node Hierarchy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {nodes.map((node, idx) => {
          const isDanger = node.type === 'danger';
          const isPrimary = node.type === 'primary';
          const borderColor = isDanger ? '#ef4444' : isPrimary ? '#3b82f6' : border;

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div
                style={{
                  backgroundColor: cardBg,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 12,
                  padding: '14px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 160,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {node.icon && <span style={{fontSize: 24, marginBottom: 6}}>{node.icon}</span>}
                <span
                  style={{
                    fontFamily: FONT.space,
                    fontSize: 20,
                    fontWeight: 700,
                    color: textPrimary,
                    textAlign: 'center',
                  }}
                >
                  {node.title}
                </span>
                {node.subtitle && (
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      color: textMuted,
                      marginTop: 4,
                      textAlign: 'center',
                    }}
                  >
                    {node.subtitle}
                  </span>
                )}
              </div>

              {/* Connecting Arrow (between items) */}
              {idx < nodes.length - 1 && (
                <div style={{display: 'flex', alignItems: 'center', color: textMuted}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" strokeDasharray="4 4" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Red Boundary Line & Limitations (BATAS) */}
      {boundaryWarning && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginTop: 12,
          }}
        >
          {/* Dashed Red Divider */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, width: '100%'}}>
            <div
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontFamily: FONT.mono,
                fontSize: 14,
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 4,
                letterSpacing: '0.08em',
              }}
            >
              BATAS
            </div>
            <div
              style={{
                flex: 1,
                borderBottom: '2px dashed #ef4444',
                opacity: 0.8,
              }}
            />
          </div>

          {/* Unidentifiable Attributes Card */}
          <div
            style={{
              backgroundColor: isDark ? '#140c10' : '#fef2f2',
              border: '1.5px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 12,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: FONT.space,
                fontSize: 17,
                fontWeight: 700,
                color: '#ef4444',
              }}
            >
              <span>{boundaryWarning.label}</span>
              <span style={{fontSize: 14, fontFamily: FONT.mono, opacity: 0.8}}>tidak bisa dipastikan</span>
            </div>

            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4}}>
              {boundaryWarning.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: isDark ? '#2a1218' : '#fee2e2',
                    padding: '6px 14px',
                    borderRadius: 6,
                    fontFamily: FONT.mono,
                    fontSize: 15,
                    color: isDark ? '#fca5a5' : '#b91c1c',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
