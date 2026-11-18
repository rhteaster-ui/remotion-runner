import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {StickerCard} from '../kit/StickerCard';
import {Stamp} from '../kit/Stamp';
import {CodeSlab} from '../kit/CodeSlab';

export const S5RapidFire: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const hitMasih = useHit('masih');
  const hitUrutin = useHit('urutin');
  const hitSatu = useHit('satu');
  const hitAbjad = useHit('abjad');
  const hitBplus = useHit('bplus');
  const hitBanana = useHit('banana');

  const sinceSatu = useSince('satu');
  const sinceBplus = useSince('bplus');
  const sinceBanana = useSince('banana');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.mintBg,
        overflow: 'hidden',
      }}
    >
      <WatHUD sceneNum={5} totalScenes={5} title=".sort() & baNaNa" />

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
        {sinceBplus < 0 ? (
          /* BAGIAN 1: Array .sort() */
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Stamp text="MASIH ADA" color={tokens.js} tilt={-3} scale={hitMasih} />
            </div>

            <StickerCard bg="#FFFFFF" tilt={1} style={{padding: '32px 36px'}}>
              <div style={{fontSize: 22, fontWeight: 800, color: '#666666', marginBottom: 12}}>
                [10, 9, 1].sort()
              </div>

              {/* Tiga Balok Angka */}
              <div style={{display: 'flex', gap: 20, justifyContent: 'center', margin: '20px 0'}}>
                {(sinceSatu >= 0 ? [1, 10, 9] : [10, 9, 1]).map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: val === 10 ? tokens.hot : tokens.js,
                      color: tokens.ink,
                      border: `4px solid ${tokens.ink}`,
                      borderRadius: 20,
                      boxShadow: `6px 6px 0px ${tokens.ink}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 54,
                      fontWeight: 900,
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>

              {/* Stiker Sok Pintar */}
              {sinceSatu >= 0 && (
                <div style={{textAlign: 'center', marginTop: 14}}>
                  <Stamp text="DIURUTIN KAYAK ABJAD!" color={tokens.hot} tilt={-4} scale={hitSatu} />
                </div>
              )}
            </StickerCard>
          </div>
        ) : (
          /* BAGIAN 2: 'b' + 'a' + +'a' + 'a' = 'baNaNa' */
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <CodeSlab title="banana.js" fontSize={42}>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center'}}>
                <span style={{color: tokens.mint}}>'b'</span>
                <span>+</span>
                <span style={{color: tokens.mint}}>'a'</span>
                <span>+</span>
                <span
                  style={{
                    color: tokens.hot,
                    backgroundColor: 'rgba(255, 77, 109, 0.2)',
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontWeight: 900,
                  }}
                >
                  +'a'
                </span>
                <span>+</span>
                <span style={{color: tokens.mint}}>'a'</span>
              </div>

              {sinceBanana >= 0 && (
                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: '2px dashed rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{fontSize: 28, color: '#888888'}}>&gt;&gt; hasil:</span>
                  <span style={{fontSize: 54, fontWeight: 900, color: tokens.js}}>
                    'baNaNa'
                  </span>
                </div>
              )}
            </CodeSlab>

            {/* Pisang SVG dengan Kacamata Hitam */}
            {sinceBanana >= 0 && (
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                <svg width="240" height="180" viewBox="0 0 240 180">
                  {/* Pisang Kuning */}
                  <path
                    d="M 30,140 C 90,165 170,145 210,60 C 220,40 215,30 205,35 C 160,85 100,105 45,95 Z"
                    fill={tokens.js}
                    stroke={tokens.ink}
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                  {/* Ujung pisang hijau */}
                  <path d="M 205,35 C 215,30 220,40 210,60 Z" fill={tokens.mint} stroke={tokens.ink} strokeWidth="4" />
                  {/* Kacamata Hitam Thug Life */}
                  <rect x="110" y="70" width="35" height="22" rx="4" fill="#14102B" />
                  <rect x="155" y="65" width="35" height="22" rx="4" fill="#14102B" />
                  <line x1="145" y1="76" x2="155" y2="76" stroke="#14102B" strokeWidth="5" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Presenter Elaina di kanan */}
      <Elaina
        side="right"
        track={[
          {atFrame: 0, pose: 'excited'},
          {at: 'banana', pose: 'double_peace', reaction: 'sparkle'},
        ]}
      />
    </div>
  );
};
