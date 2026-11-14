import React from 'react';
import {FONT} from '../theme-tokens';

interface TagPill {
  label: string;
  count?: number;
  active?: boolean;
}

interface ForensicWindowProps {
  title: string;
  warningBadge?: string;
  searchInput?: string;
  tags?: TagPill[];
  resultCountText?: string;
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

export const ForensicWindow: React.FC<ForensicWindowProps> = ({
  title,
  warningBadge,
  searchInput,
  tags,
  resultCountText,
  theme = 'dark',
  children,
}) => {
  const isDark = theme === 'dark';
  const bg = isDark ? '#0b101b' : '#ffffff';
  const border = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(100, 116, 139, 0.2)';
  const textPrimary = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const inputBg = isDark ? '#141d2e' : '#f1f5f9';

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: bg,
        borderRadius: 16,
        border: `1.5px solid ${border}`,
        boxShadow: isDark
          ? '0 20px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 20px 40px rgba(15,23,42,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: `1px solid ${border}`,
          backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        }}
      >
        {/* Traffic lights */}
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444'}} />
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b'}} />
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981'}} />
          <span
            style={{
              marginLeft: 12,
              fontFamily: FONT.mono,
              fontSize: 18,
              fontWeight: 600,
              color: textPrimary,
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </span>
        </div>

        {/* Warning or Status Badge */}
        {warningBadge && (
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 15,
              fontWeight: 600,
              color: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.14)',
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {warningBadge}
          </div>
        )}
      </div>

      {/* Optional Search Bar */}
      {searchInput !== undefined && (
        <div style={{padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12}}>
          <div
            style={{
              backgroundColor: inputBg,
              border: `1.5px solid ${isDark ? '#3b82f6' : '#2563eb'}`,
              borderRadius: 8,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: FONT.mono,
              fontSize: 22,
              color: textPrimary,
              fontWeight: 600,
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.25)',
            }}
          >
            <span>{searchInput}</span>
            <span style={{color: '#3b82f6', animation: 'blink 1s infinite', marginLeft: 2}}>|</span>
          </div>

          {/* Tags / filters */}
          {tags && tags.length > 0 && (
            <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 20,
                    backgroundColor: tag.active ? '#3b82f622' : isDark ? '#1e293b' : '#e2e8f0',
                    border: `1px solid ${tag.active ? '#3b82f6' : 'transparent'}`,
                    fontFamily: FONT.space,
                    fontSize: 16,
                    color: tag.active ? '#60a5fa' : textMuted,
                    fontWeight: 600,
                  }}
                >
                  <span>{tag.label}</span>
                  {tag.count !== undefined && (
                    <span
                      style={{
                        backgroundColor: tag.active ? '#3b82f6' : isDark ? '#334155' : '#cbd5e1',
                        color: tag.active ? '#ffffff' : textPrimary,
                        fontSize: 13,
                        padding: '1px 6px',
                        borderRadius: 10,
                        fontWeight: 700,
                      }}
                    >
                      {tag.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {resultCountText && (
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 17,
                color: textMuted,
                marginTop: 4,
              }}
            >
              {resultCountText}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div style={{padding: '12px 20px 20px', flex: 1}}>{children}</div>
    </div>
  );
};
