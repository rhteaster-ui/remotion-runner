import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export interface PermissionItem {
  id: string;
  name: string;
  description: string;
  risk: 'critical' | 'high' | 'warning';
  icon?: string;
}

interface PermissionAlertCardsProps {
  permissions: PermissionItem[];
  title?: string;
  delay?: number;
}

export const PermissionAlertCards: React.FC<PermissionAlertCardsProps> = ({
  permissions,
  title = 'IZIN SENSITIF TERDETEKSI',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const containerScale = spring({
    fps,
    frame: animFrame,
    config: {damping: 14, mass: 0.8},
  });

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transform: `scale(${containerScale})`,
      }}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: FONT.space,
            fontSize: 18,
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '0.04em',
            marginBottom: 4,
          }}
        >
          <span>{title}</span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              color: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              padding: '2px 8px',
              borderRadius: 4,
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            {permissions.length} BAHAYA
          </span>
        </div>
      )}

      {permissions.map((p, idx) => {
        const itemDelay = delay + idx * 4;
        const itemFrame = Math.max(0, frame - itemDelay);
        const itemScale = spring({
          fps,
          frame: itemFrame,
          config: {damping: 12, mass: 0.8},
        });

        const riskColor = {
          critical: '#ef4444',
          high: '#f97316',
          warning: '#f59e0b',
        }[p.risk];

        return (
          <div
            key={p.id}
            style={{
              backgroundColor: '#0c101a',
              border: `1.5px solid ${riskColor}40`,
              borderRadius: 12,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 12px ${riskColor}15`,
              transform: `scale(${itemScale})`,
            }}
          >
            <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                {p.icon && <span style={{fontSize: 20}}>{p.icon}</span>}
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#f8fafc',
                  }}
                >
                  {p.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  color: '#94a3b8',
                }}
              >
                {p.description}
              </span>
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                color: riskColor,
                backgroundColor: `${riskColor}18`,
                padding: '4px 8px',
                borderRadius: 4,
                border: `1px solid ${riskColor}60`,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {p.risk}
            </div>
          </div>
        );
      })}
    </div>
  );
};
