import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {StickerCard} from '../kit/StickerCard';
import {Stamp} from '../kit/Stamp';
import {CodeSlab} from '../kit/CodeSlab';

export const S6TypeScriptOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const hitTs = useHit('ts');
  const hitAman = useHit('aman');
  const hitEnggak = useHit('enggak');
  const hitMarahin = useHit('marahin');
  const hitLain = useHit('lain');
  const hitTebak = useHit('tebak');
  const hitCta = useHit('cta');

  const sinceLain = useSince('lain');
  const sinceTebak = useSince('tebak');
  const sinceCta = useSince('cta');
  const sinceEnggak = useSince('enggak');
  const sinceMarahin = useSince('marahin');

  // One-shot gentle vibration on TS error
  const tsShakeX = sinceMarahin >= 0 && sinceMarahin < 8
    ? Math.sin(sinceMarahin * 2) * (8 - sinceMarahin) * 2
    : 0;

  // Follow button press animation
  const followPress = sinceCta >= 0
    ? spring({frame: Math.max(0, sinceCta - 15), fps, config: {damping: 10, mass: 0.5, stiffness: 220}})
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.night,
        overflow: 'hidden',
        transform: `translateX(${tsShakeX}px)`,
      }}
    >
      <WatHUD sceneNum={5} totalScenes={5} title="TypeScript & Tesis Penutup" />

      {/* Panggung Utama (170 - 1180) */}
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
        {/* BAGIAN 1: TypeScript Marahin Kamu Duluan (sebelum @lain) */}
        {sinceLain < 0 && (
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <StickerCard bg="#FFFFFF" tilt={-1}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  {/* TypeScript Blue Shield */}
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: '#3178C6',
                      borderRadius: 14,
                      border: `3px solid ${tokens.ink}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 900,
                      fontSize: 32,
                      fontFamily: 'monospace',
                    }}
                  >
                    TS
                  </div>
                  <div>
                    <div style={{fontSize: 28, fontWeight: 900, color: tokens.ink}}>
                      TypeScript Datang...
                    </div>
                    <div style={{fontSize: 20, color: '#666666', fontWeight: 700}}>
                      "Katanya bikin aman?"
                    </div>
                  </div>
                </div>

                {/* Stamp AMAN vs ENGGAK */}
                {sinceEnggak >= 0 ? (
                  <Stamp text="ENGGAK ❌" color={tokens.hot} tilt={6} scale={hitEnggak} />
                ) : (
                  hitAman > 0 && <Stamp text="AMAN ✓" color={tokens.mint} tilt={-4} scale={hitAman} />
                )}
              </div>

              {/* TS Error Red Squiggle Box */}
              {sinceMarahin >= 0 && (
                <div
                  style={{
                    marginTop: 20,
                    padding: '16px 20px',
                    backgroundColor: '#FFF0F3',
                    border: `3px solid ${tokens.hot}`,
                    borderRadius: 14,
                    color: tokens.hot,
                    fontFamily: 'monospace',
                    fontSize: 22,
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>TS2322: Type 'string' is not assignable to type 'number'.</span>
                  </div>
                  <div style={{color: tokens.ink, fontSize: 18, marginTop: 6, fontStyle: 'italic'}}>
                    👉 "Cuma marahin kamu duluan sebelum kodenya jalan."
                  </div>
                </div>
              )}
            </StickerCard>
          </div>
        )}

        {/* BAGIAN 2: Callback Tesis: Bahasa Lain vs JavaScript (sebelum @cta) */}
        {sinceLain >= 0 && sinceCta < 0 && (
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{display: 'flex', gap: 24}}>
              {/* Bahasa Lain */}
              <StickerCard bg="#FFFFFF" tilt={-2} style={{flex: 1}}>
                <div style={{fontSize: 22, fontWeight: 800, color: '#777777'}}>BAHASA LAIN:</div>
                <div style={{fontSize: 32, fontWeight: 900, color: tokens.hot, marginTop: 12}}>
                  🚨 ERROR!
                </div>
                <div style={{fontSize: 18, color: '#555555', marginTop: 8}}>
                  (Tipe data beda, program berhenti)
                </div>
              </StickerCard>

              {/* JavaScript */}
              <StickerCard bg={tokens.js} tilt={2} style={{flex: 1}}>
                <div style={{fontSize: 22, fontWeight: 800, color: 'rgba(20,16,43,0.7)'}}>JAVASCRIPT:</div>
                <div style={{fontSize: 30, fontWeight: 900, color: tokens.ink, marginTop: 12}}>
                  "Ya udah, aku tebak aja." 🤷
                </div>
                {sinceTebak >= 0 && (
                  <div style={{marginTop: 10}}>
                    <Stamp text="NO ERROR" color={tokens.hot} tilt={-5} scale={hitTebak} />
                  </div>
                )}
              </StickerCard>
            </div>
          </div>
        )}

        {/* BAGIAN 3: END CARD (setelah @cta) - PURE RHMT OFC BRANDING */}
        {sinceCta >= 0 && (
          <div
            style={{
              width: '100%',
              maxWidth: 880,
              backgroundColor: tokens.paper,
              border: `5px solid ${tokens.ink}`,
              borderRadius: 32,
              boxShadow: `12px 12px 0px ${tokens.ink}`,
              padding: '40px 48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              gap: 24,
            }}
          >
            <div style={{fontSize: 24, fontWeight: 900, letterSpacing: '2px', color: tokens.hot}}>
              KOMEDI TECH &amp; WEB SERIES
            </div>

            {/* Wordmark rhmt ofc */}
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 68,
                fontWeight: 900,
                color: tokens.ink,
                letterSpacing: '-1px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: tokens.js,
                  border: `4px solid ${tokens.ink}`,
                }}
              />
              rhmt ofc
            </div>

            {/* Links & Channels */}
            <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center'}}>
              <div
                style={{
                  backgroundColor: tokens.ink,
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  fontSize: 24,
                  fontWeight: 800,
                  padding: '10px 22px',
                  borderRadius: 14,
                }}
              >
                rhmt.biz.id
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: tokens.ink,
                  border: `3px solid ${tokens.ink}`,
                  fontFamily: 'monospace',
                  fontSize: 24,
                  fontWeight: 800,
                  padding: '10px 22px',
                  borderRadius: 14,
                  boxShadow: `3px 3px 0px ${tokens.ink}`,
                }}
              >
                github.com/rhmt-ofc
              </div>
            </div>

            {/* Follow Button Press */}
            <div
              style={{
                marginTop: 12,
                backgroundColor: tokens.hot,
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 36,
                letterSpacing: '2px',
                padding: '16px 56px',
                borderRadius: 20,
                border: `4px solid ${tokens.ink}`,
                boxShadow: followPress > 0.5 ? `2px 2px 0px ${tokens.ink}` : `8px 8px 0px ${tokens.ink}`,
                transform: `scale(${followPress > 0.5 ? 0.96 : 1})`,
                transition: 'all 0.1s ease',
              }}
            >
              + FOLLOW
            </div>
          </div>
        )}
      </div>

      {/* Presenter Elaina di kiri */}
      <Elaina
        side="left"
        track={[
          {atFrame: 0, pose: 'finger_gun'},
          {at: 'lain', pose: 'arms_crossed', reaction: 'exclamation'},
          {at: 'cta', pose: 'double_peace', reaction: 'sparkle'},
        ]}
      />
    </div>
  );
};
