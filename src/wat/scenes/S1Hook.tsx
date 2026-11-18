import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {CodeSlab} from '../kit/CodeSlab';
import {Burst} from '../kit/Burst';
import {Stamp} from '../kit/Stamp';
import {StickerCard} from '../kit/StickerCard';

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Markers
  const hitSebelas = useHit('sebelas');
  const hitJs = useHit('js');
  const hitSepuluh = useHit('sepuluh');
  const hitSemua = useHit('semua');
  const hitError = useHit('error');

  const sinceSebelas = useSince('sebelas');
  const sinceSepuluh = useSince('sepuluh');
  const sinceSemua = useSince('semua');
  const sinceError = useSince('error');

  // Guncangan satu kali saat '11' menghantam (6 frame meluruh)
  const shakeX = sinceSebelas >= 0 && sinceSebelas < 8
    ? Math.sin(sinceSebelas * 2) * (8 - sinceSebelas) * 2.5
    : 0;

  // Kalender 10 hari Brendan Eich
  const calendarTicks = Math.min(10, Math.max(0, Math.floor(sinceSepuluh / 2)));

  // Grid browser 10x10 (98 nyala kuning, 2 abu-abu)
  const browserLitCount = Math.min(98, Math.max(0, Math.floor(sinceSemua * 3.5)));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.night,
        overflow: 'hidden',
        transform: `translateX(${shakeX}px)`,
      }}
    >
      <WatHUD sceneNum={1} totalScenes={5} title="1 + '1' = '11'" />

      {/* Panggung Komedi Utama (170 - 1180) */}
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
          gap: 32,
        }}
      >
        {/* Main Code Slab */}
        <div style={{position: 'relative', width: '100%', maxWidth: 880}}>
          <CodeSlab title="bukan_matematika.js" fontSize={42}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <span style={{color: tokens.mint, fontWeight: 900}}>const</span>
              <span style={{color: '#FFFFFF', fontWeight: 700}}>hasil =</span>
              <span style={{color: tokens.js, fontWeight: 900}}>1</span>
              <span style={{color: '#FFFFFF'}}>+</span>
              <span style={{color: tokens.mint, fontWeight: 900}}>'1'</span>
              <span style={{color: '#FFFFFF'}}>;</span>
            </div>

            {/* Hasil '11' slam */}
            {sinceSebelas >= 0 && (
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: '2px dashed rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <span style={{color: 'rgba(255,255,255,0.5)', fontSize: 32}}>&gt;&gt;</span>
                  <span
                    style={{
                      color: tokens.js,
                      fontWeight: 900,
                      fontSize: 54,
                      transform: `scale(${1 + 0.15 * (1 - Math.min(1, sinceSebelas / 10))})`,
                      display: 'inline-block',
                    }}
                  >
                    '11'
                  </span>
                  <span style={{color: tokens.hot, fontSize: 28, textDecoration: 'line-through', opacity: 0.6}}>
                    (bukan 2)
                  </span>
                </div>

                {/* Stiker Logo JS */}
                {hitJs > 0 && (
                  <div
                    style={{
                      backgroundColor: tokens.js,
                      color: tokens.ink,
                      fontWeight: 900,
                      fontSize: 28,
                      padding: '8px 16px',
                      borderRadius: 12,
                      border: `3px solid ${tokens.ink}`,
                      boxShadow: `4px 4px 0px ${tokens.ink}`,
                      transform: `scale(${hitJs}) rotate(${hitJs * -4}deg)`,
                    }}
                  >
                    JAVASCRIPT
                  </div>
                )}
              </div>
            )}
          </CodeSlab>

          {/* Burst impact star on '11' */}
          {sinceSebelas >= 0 && sinceSebelas < 15 && (
            <Burst color={tokens.js} size={300} scale={hitSebelas} style={{right: -30, top: -30}} />
          )}
        </div>

        {/* 10 Days Calendar Strip & 98% Browser Grid */}
        {sinceSepuluh >= 0 && sinceError < 0 && (
          <StickerCard bg={tokens.paper} tilt={1} style={{width: '100%', maxWidth: 880, padding: '24px 30px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
              <span style={{fontWeight: 900, fontSize: 26, letterSpacing: '1px'}}>
                1995: DIBIKIN CUMA 10 HARI
              </span>
              <span style={{fontWeight: 800, fontSize: 22, color: tokens.hot}}>
                Brendan Eich
              </span>
            </div>

            {/* 10 Days Boxes */}
            <div style={{display: 'flex', gap: 10, marginBottom: 16}}>
              {Array.from({length: 10}).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 10,
                    border: `3px solid ${tokens.ink}`,
                    backgroundColor: i < calendarTicks ? tokens.mint : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 22,
                    boxShadow: i < calendarTicks ? `2px 2px 0px ${tokens.ink}` : 'none',
                  }}
                >
                  {i < calendarTicks ? '✓' : i + 1}
                </div>
              ))}
            </div>

            {/* 10x10 mini browser grid */}
            {sinceSemua >= 0 && (
              <div>
                <div style={{fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'rgba(20,16,43,0.8)'}}>
                  Dipakai 98% Website di Bumi:
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 6}}>
                  {Array.from({length: 100}).map((_, idx) => (
                    <div
                      key={idx}
                      style={{
                        height: 18,
                        borderRadius: 4,
                        border: `1.5px solid ${tokens.ink}`,
                        backgroundColor:
                          idx < browserLitCount
                            ? idx >= 98
                              ? '#CCCCCC'
                              : tokens.js
                            : '#FFFFFF',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </StickerCard>
        )}

        {/* Error Popup Smashed by NGGAK PERNAH Stamp */}
        {sinceError >= 0 && (
          <div style={{position: 'relative', width: '100%', maxWidth: 880}}>
            <StickerCard
              bg="#FFE5EC"
              tilt={-1}
              style={{
                border: `4px solid ${tokens.hot}`,
                boxShadow: `10px 10px 0px ${tokens.hot}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{color: tokens.hot, fontWeight: 900, fontSize: 32}}>
                  ⚠️ SyntaxError / TypeError?
                </div>
                <div style={{color: tokens.ink, fontSize: 24, fontWeight: 700, marginTop: 6}}>
                  Kamus JavaScript: Error itu haram.
                </div>
              </div>

              {/* Stamp SLAP: NGGAK PERNAH */}
              <Stamp
                text="NGGAK PERNAH"
                color={tokens.hot}
                tilt={-8}
                scale={hitError}
                style={{fontSize: 38, padding: '12px 28px'}}
              />
            </StickerCard>
          </div>
        )}
      </div>

      {/* Presenter Elaina */}
      <Elaina
        side="right"
        track={[
          {atFrame: 0, pose: 'finger_gun'},
          {at: 'js', pose: 'excited', reaction: 'sparkle'},
          {at: 'error', pose: 'chin_rest', reaction: 'exclamation'},
        ]}
      />
    </div>
  );
};
