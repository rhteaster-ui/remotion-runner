import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {StickerCard} from '../kit/StickerCard';
import {Stamp} from '../kit/Stamp';

export const S2PlusTempel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Markers
  const hitTeks = useHit('teks');
  const hitPlus = useHit('plus');
  const hitTempel = useHit('tempel');
  const hitMinus = useHit('minus');
  const hitDua = useHit('dua');
  const hitKonsisten = useHit('konsisten');
  const hitPercaya = useHit('percaya');
  const hitKasir = useHit('kasir');
  const hitSeribu1 = useHit('seribu1');
  const hitSeribu2 = useHit('seribu2');
  const hitTotal = useHit('total');

  const sinceMinus = useSince('minus');
  const sinceDua = useSince('dua');
  const sinceKasir = useSince('kasir');
  const sinceTotal = useSince('total');

  // Struk roll down animation
  const receiptRoll = sinceKasir >= 0
    ? spring({frame: sinceKasir, fps, config: {damping: 14, mass: 0.8, stiffness: 120}})
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.paper,
        overflow: 'hidden',
      }}
    >
      <WatHUD sceneNum={2} totalScenes={5} title="Plus Tempel, Minus Hitung" />

      {/* Panggung Komedi Utama */}
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
        {sinceKasir < 0 ? (
          <>
            {/* Visual Formula: 1 + "1" -> Lem Stik */}
            <StickerCard bg="#FFFFFF" tilt={-1} style={{width: '100%', maxWidth: 880}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                {/* Chip Biru 1 */}
                <div
                  style={{
                    backgroundColor: tokens.sky,
                    color: tokens.ink,
                    padding: '16px 36px',
                    borderRadius: 18,
                    fontWeight: 900,
                    fontSize: 48,
                    border: `4px solid ${tokens.ink}`,
                    boxShadow: `4px 4px 0px ${tokens.ink}`,
                  }}
                >
                  1
                </div>

                {/* Plus or Lem Stik */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {hitTempel > 0 ? (
                    <div
                      style={{
                        backgroundColor: tokens.hot,
                        color: '#FFFFFF',
                        padding: '8px 20px',
                        borderRadius: 12,
                        fontWeight: 900,
                        fontSize: 24,
                        border: `3px solid ${tokens.ink}`,
                        transform: 'rotate(-4deg)',
                      }}
                    >
                      LEM STIK
                    </div>
                  ) : (
                    <span style={{fontSize: 64, fontWeight: 900, color: tokens.ink}}>+</span>
                  )}
                </div>

                {/* Chip Teks "1" */}
                <div
                  style={{
                    backgroundColor: tokens.mint,
                    color: tokens.ink,
                    padding: '16px 36px',
                    borderRadius: 18,
                    fontWeight: 900,
                    fontSize: 48,
                    border: `4px solid ${tokens.ink}`,
                    boxShadow: `4px 4px 0px ${tokens.ink}`,
                    transform: `scale(${hitTeks})`,
                  }}
                >
                  "1"
                </div>

                <span style={{fontSize: 54, fontWeight: 900, color: tokens.ink}}>=</span>

                {/* Hasil '11' */}
                <div
                  style={{
                    backgroundColor: tokens.js,
                    color: tokens.ink,
                    padding: '16px 36px',
                    borderRadius: 18,
                    fontWeight: 900,
                    fontSize: 52,
                    border: `4px solid ${tokens.ink}`,
                    boxShadow: `6px 6px 0px ${tokens.ink}`,
                    transform: `scale(${hitTempel})`,
                  }}
                >
                  "11"
                </div>
              </div>

              {/* Baris Minus: "5" - 3 = 2 */}
              {sinceMinus >= 0 && (
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: `3px dashed ${tokens.ink}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <span style={{fontWeight: 900, fontSize: 44, color: tokens.mint}}>"5"</span>
                  <span style={{fontSize: 54, fontWeight: 900, color: tokens.ink}}>-</span>
                  <span style={{fontWeight: 900, fontSize: 44, color: tokens.sky}}>3</span>
                  <span style={{fontSize: 54, fontWeight: 900, color: tokens.ink}}>=</span>
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: 56,
                      color: tokens.hot,
                      backgroundColor: '#FFFFFF',
                      padding: '8px 28px',
                      borderRadius: 16,
                      border: `3px solid ${tokens.ink}`,
                      boxShadow: `4px 4px 0px ${tokens.ink}`,
                      transform: `scale(${hitDua})`,
                    }}
                  >
                    2
                  </span>
                </div>
              )}
            </StickerCard>

            {/* Stempel Berdampingan: PLUS = TEMPEL vs MINUS = HITUNG */}
            <div style={{display: 'flex', gap: 20, width: '100%', maxWidth: 880, justifyContent: 'center'}}>
              <Stamp text="PLUS = TEMPEL" color={tokens.hot} tilt={-3} scale={hitTempel} />
              {sinceDua >= 0 && (
                <Stamp text="MINUS = HITUNG" color={tokens.mint} tilt={3} scale={hitDua} />
              )}
            </div>

            {/* Konsisten? Enggak. PD 100% */}
            {hitKonsisten > 0 && (
              <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
                <div
                  style={{
                    backgroundColor: tokens.ink,
                    color: '#FFFFFF',
                    padding: '12px 28px',
                    borderRadius: 16,
                    fontWeight: 900,
                    fontSize: 30,
                    textDecoration: 'line-through',
                    textDecorationColor: tokens.hot,
                  }}
                >
                  KONSISTEN? X
                </div>

                {hitPercaya > 0 && (
                  <div
                    style={{
                      backgroundColor: tokens.js,
                      color: tokens.ink,
                      padding: '12px 28px',
                      borderRadius: 16,
                      fontWeight: 900,
                      fontSize: 30,
                      border: `3px solid ${tokens.ink}`,
                      boxShadow: `4px 4px 0px ${tokens.ink}`,
                    }}
                  >
                    PD: 100% BANGET!
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Struk Kasir Minimarket JS */
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 720,
              transform: `scale(${receiptRoll})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Slot Atas */}
            <div
              style={{
                height: 18,
                backgroundColor: tokens.ink,
                borderRadius: 9,
                marginBottom: -6,
                zIndex: 20,
                position: 'relative',
              }}
            />

            {/* Kertas Struk */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: `4px solid ${tokens.ink}`,
                padding: '36px 42px',
                fontFamily: '"Courier New", Courier, monospace',
                color: tokens.ink,
                boxShadow: `12px 12px 0px ${tokens.ink}`,
                position: 'relative',
              }}
            >
              <div style={{textAlign: 'center', borderBottom: `2px dashed ${tokens.ink}`, paddingBottom: 16}}>
                <div style={{fontSize: 32, fontWeight: 900}}>MINIMARKET JS 24 JAM</div>
                <div style={{fontSize: 20, fontWeight: 700, color: 'rgba(20,16,43,0.7)'}}>KASIR: V8 ENGINE</div>
              </div>

              <div style={{marginTop: 24, fontSize: 28, lineHeight: 2}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>BELANJA</span>
                  <span style={{fontWeight: 900}}>{hitSeribu1 > 0 ? 'Rp 1.000' : '...'}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>PARKIR</span>
                  <span style={{fontWeight: 900}}>{hitSeribu2 > 0 ? 'Rp 1.000' : '...'}</span>
                </div>
              </div>

              {/* Total Row */}
              {sinceTotal >= 0 && (
                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: `3px solid ${tokens.ink}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: tokens.js,
                    padding: '16px 20px',
                    borderRadius: 12,
                    border: `3px solid ${tokens.ink}`,
                  }}
                >
                  <span style={{fontSize: 32, fontWeight: 900}}>TOTAL:</span>
                  <span style={{fontSize: 40, fontWeight: 900, color: tokens.hot}}>
                    Rp 10.001.000
                  </span>
                </div>
              )}

              {/* Stempel RUGI BANDAR */}
              {sinceTotal >= 0 && (
                <div style={{position: 'absolute', bottom: 30, right: 30}}>
                  <Stamp text="RUGI BANDAR" color={tokens.hot} tilt={-12} scale={hitTotal} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Presenter Elaina */}
      <Elaina
        side="left"
        track={[
          {atFrame: 0, pose: 'open_hand'},
          {at: 'percaya', pose: 'double_peace', reaction: 'sparkle'},
          {at: 'total', pose: 'arms_crossed', reaction: 'sweat'},
        ]}
      />
    </div>
  );
};
