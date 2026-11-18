import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {TerminalSlab} from '../kit/TerminalSlab';
import {Stamp} from '../kit/Stamp';
import {StickerCard} from '../kit/StickerCard';

export const S3NaN: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Markers
  const hitNan = useHit('nan');
  const hitBukan = useHit('bukan');
  const hitNumber = useHit('number');
  const hitEsteh = useHit('esteh');
  const hitTipenya = useHit('tipenya');

  const sinceNumber = useSince('number');
  const sinceEsteh = useSince('esteh');
  const sinceTipenya = useSince('tipenya');

  // Glitch effect on 'number'
  const isGlitch = sinceNumber >= 0 && sinceNumber < 8;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.darkBg,
        overflow: 'hidden',
      }}
    >
      <WatHUD sceneNum={3} totalScenes={5} title="typeof NaN === 'number'" />

      {/* Panggung Utama */}
      <div
        style={{
          position: 'absolute',
          top: 170,
          left: 64,
          right: 64,
          height: 1010,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {sinceEsteh < 0 ? (
          <>
            {/* Terminal typeof NaN */}
            <div style={{width: '100%', maxWidth: 880}}>
              <TerminalSlab
                promptText="typeof NaN"
                resultText={sinceNumber >= 0 ? "'number'" : undefined}
                isGlitch={isGlitch}
              />
            </div>

            {/* Chip NaN besar & Stamp BUKAN ANGKA */}
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <div
                style={{
                  backgroundColor: tokens.hot,
                  color: '#FFFFFF',
                  padding: '18px 40px',
                  borderRadius: 20,
                  fontWeight: 900,
                  fontSize: 52,
                  border: `4px solid ${tokens.ink}`,
                  boxShadow: `8px 8px 0px ${tokens.ink}`,
                  transform: `scale(${hitNan})`,
                }}
              >
                NaN (Not a Number)
              </div>

              {hitBukan > 0 && (
                <Stamp text="BUKAN ANGKA" color={tokens.hot} tilt={6} scale={hitBukan} />
              )}
            </div>

            {/* NaN === NaN -> false (Cermin Komedi) */}
            {sinceNumber >= 0 && (
              <StickerCard bg="#14102B" tilt={-1} style={{width: '100%', maxWidth: 880, color: '#FFFFFF'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{fontFamily: 'monospace', fontSize: 32, fontWeight: 800}}>
                    <span style={{color: tokens.hot}}>NaN</span>
                    <span style={{color: '#FFFFFF'}}> === </span>
                    <span style={{color: tokens.hot}}>NaN</span>
                    <span style={{color: tokens.mint}}> // false</span>
                  </div>

                  <div
                    style={{
                      backgroundColor: tokens.js,
                      color: tokens.ink,
                      fontWeight: 900,
                      fontSize: 24,
                      padding: '8px 18px',
                      borderRadius: 12,
                    }}
                  >
                    "siapa lu?" 🤔
                  </div>
                </div>
              </StickerCard>
            )}
          </>
        ) : (
          /* Meja Warteg & Gelas Es Teh SVG */
          <div style={{width: '100%', maxWidth: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
            <StickerCard bg={tokens.paper} tilt={1} style={{width: '100%', textAlign: 'center'}}>
              <div style={{fontWeight: 900, fontSize: 36, marginBottom: 16}}>
                WARTEG LOGIKA JAVASCRIPT
              </div>

              {/* Gelas Es Teh SVG */}
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40}}>
                <svg width="220" height="300" viewBox="0 0 200 280">
                  {/* Gelas Kaca */}
                  <polygon
                    points="30,40 170,40 150,260 50,260"
                    fill="rgba(255,255,255,0.4)"
                    stroke={tokens.ink}
                    strokeWidth="6"
                  />
                  {/* Air Teh Cokelat */}
                  <polygon
                    points="38,100 162,100 146,252 54,252"
                    fill="#C67D28"
                    opacity="0.85"
                  />
                  {/* Es Batu */}
                  <rect x="65" y="115" width="40" height="40" rx="8" fill="#FFFFFF" opacity="0.7" stroke={tokens.ink} strokeWidth="3" />
                  <rect x="110" y="145" width="38" height="38" rx="8" fill="#FFFFFF" opacity="0.7" stroke={tokens.ink} strokeWidth="3" />
                  {/* Sedotan Hijau */}
                  <line x1="120" y1="10" x2="90" y2="240" stroke={tokens.mint} strokeWidth="12" strokeLinecap="round" />
                </svg>

                {/* Dialog Pelayan */}
                <div style={{textAlign: 'left', maxWidth: 420}}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: `3px solid ${tokens.ink}`,
                      borderRadius: 16,
                      padding: '16px 22px',
                      boxShadow: `6px 6px 0px ${tokens.ink}`,
                    }}
                  >
                    <div style={{fontWeight: 900, fontSize: 26, color: tokens.hot}}>
                      "Mas, ini bukan es teh..."
                    </div>
                    {sinceTipenya >= 0 && (
                      <div style={{fontWeight: 900, fontSize: 32, color: tokens.ink, marginTop: 10}}>
                        "...tapi tipenya es teh!"
                      </div>
                    )}
                  </div>

                  {sinceTipenya >= 0 && (
                    <div style={{marginTop: 18}}>
                      <Stamp text="BUKAN ES TEH" color={tokens.hot} tilt={-6} scale={hitTipenya} />
                    </div>
                  )}
                </div>
              </div>
            </StickerCard>
          </div>
        )}
      </div>

      {/* Presenter Elaina */}
      <Elaina
        side="right"
        track={[
          {atFrame: 0, pose: 'chin_rest'},
          {at: 'tipenya', pose: 'arms_crossed', reaction: 'exclamation'},
        ]}
      />
    </div>
  );
};
