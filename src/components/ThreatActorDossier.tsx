import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT} from '../theme-tokens';

export interface DossierField {
  label: string;
  value?: string;
  isRedacted?: boolean;
}

interface ThreatActorDossierProps {
  title?: string;
  statusBadge?: string;
  fields?: DossierField[];
  delay?: number;
}

export const ThreatActorDossier: React.FC<ThreatActorDossierProps> = ({
  title = 'IDENTITAS ASLI PELAKU',
  statusBadge = 'tidak bisa dipastikan',
  fields = [
    {label: 'nama', isRedacted: true},
    {label: 'nomor pribadi', isRedacted: true},
    {label: 'lokasi asli', isRedacted: true},
  ],
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const animFrame = Math.max(0, frame - delay);
  const scale = spring({
    fps,
    frame: animFrame,
    config: {damping: 14, mass: 0.8},
  });

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0c0f18',
        borderRadius: 16,
        border: '1.5px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.7), 0 0 20px rgba(239, 68, 68, 0.15)',
        overflow: 'hidden',
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          backgroundColor: '#161218',
          borderBottom: '1px solid rgba(239, 68, 68, 0.25)',
        }}
      >
        <span
          style={{
            fontFamily: FONT.space,
            fontSize: 17,
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '0.04em',
          }}
        >
          {title}
        </span>

        {statusBadge && (
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 14,
              fontWeight: 700,
              color: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid rgba(239, 68, 68, 0.4)',
              textTransform: 'lowercase',
            }}
          >
            {statusBadge}
          </span>
        )}
      </div>

      {/* Main Body */}
      <div style={{display: 'flex', padding: 20, gap: 20}}>
        {/* Silhouette Avatar */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 12,
            backgroundColor: '#181e2b',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {/* Question mark silhouette */}
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 42,
              fontWeight: 800,
              color: '#475569',
            }}
          >
            ?
          </span>
        </div>

        {/* Redacted Field Rows */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center'}}>
          {fields.map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 12px',
                backgroundColor: '#121722',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  color: '#94a3b8',
                }}
              >
                {f.label}
              </span>

              {f.isRedacted ? (
                <div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
                  <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#475569'}} />
                  <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#475569'}} />
                  <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#475569'}} />
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    color: '#f8fafc',
                    fontWeight: 600,
                  }}
                >
                  {f.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
