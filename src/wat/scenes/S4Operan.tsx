import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useHit, useSince} from '../clock';
import {tokens} from '../tokens';
import {WatHUD} from '../WatHUD';
import {Elaina} from '../Elaina';
import {StickerCard} from '../kit/StickerCard';
import {Stamp} from '../kit/Stamp';

export const S4Operan: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Markers
  const hitArray = useHit('array');
  const hitObjek = useHit('objek');
  const hitObj = useHit('obj');
  const hitTukar = useHit('tukar');
  const hitNol = useHit('nol');
  const hitResep = useHit('resep');
  const hitTelor = useHit('telor');
  const hitMartabak = useHit('martabak');
  const hitTerigu = useHit('terigu');
  const hitSemen = useHit('semen');

  const sinceNol = useSince('nol');
  const sinceResep = useSince('resep');
  const sinceSemen = useSince('semen');

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: tokens.warm,
        overflow: 'hidden',
      }}
    >
      <WatHUD sceneNum={4} totalScenes={5} title="[] + {} vs {} + []" />

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
        {sinceResep < 0 ? (
          /* FASE 1: Komparasi [] + {} vs {} + [] */
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{display: 'flex', gap: 20, alignItems: 'stretch'}}>
              {/* Panel Kiri: [] + {} */}
              <StickerCard bg="#FFFFFF" tilt={-1} style={{flex: 1, padding: '28px 24px'}}>
                <div style={{fontSize: 20, fontWeight: 800, color: '#777777', marginBottom: 12}}>
                  OPERAN NORMAL
                </div>
                <div style={{fontFamily: 'monospace', fontSize: 34, fontWeight: 900, color: tokens.ink}}>
                  [] + {}
                </div>
                {hitObj > 0 && (
                  <div
                    style={{
                      marginTop: 20,
                      backgroundColor: tokens.js,
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: `3px solid ${tokens.ink}`,
                      fontWeight: 900,
                      fontSize: 26,
                      color: tokens.ink,
                      textAlign: 'center',
                    }}
                  >
                    "[object Object]"
                  </div>
                )}
              </StickerCard>

              {/* Tanda beda hasil */}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: 48, fontWeight: 900, color: tokens.ink}}>≠</span>
              </div>

              {/* Panel Kanan: {} + [] */}
              <StickerCard bg="#FFFFFF" tilt={1} style={{flex: 1, padding: '28px 24px', position: 'relative'}}>
                {/* Wajib ada lencana (di console) sesuai aturan instruksi */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: tokens.ink,
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 8,
                  }}
                >
                  (di console)
                </div>

                <div style={{fontSize: 20, fontWeight: 800, color: '#777777', marginBottom: 12}}>
                  POSISI DIBALIK
                </div>
                <div style={{fontFamily: 'monospace', fontSize: 34, fontWeight: 900, color: tokens.ink}}>
                  {} + []
                </div>

                {hitNol > 0 && (
                  <div
                    style={{
                      marginTop: 20,
                      backgroundColor: tokens.hot,
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: `3px solid ${tokens.ink}`,
                      fontWeight: 900,
                      fontSize: 34,
                      color: '#FFFFFF',
                      textAlign: 'center',
                    }}
                  >
                    0
                  </div>
                )}
              </StickerCard>
            </div>

            {sinceNol >= 0 && (
              <div style={{textAlign: 'center'}}>
                <Stamp text="TUKER POSISI = BEDA DUNIA" color={tokens.hot} tilt={-2} scale={hitNol} />
              </div>
            )}
          </div>
        ) : (
          /* FASE 2: Resep Martabak vs Semen Tiga Roda */
          <div style={{width: '100%', maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 24}}>
            <div style={{display: 'flex', gap: 24}}>
              {/* Martabak */}
              <StickerCard bg="#FFF3D6" tilt={-1} style={{flex: 1, textAlign: 'center'}}>
                <div style={{fontWeight: 900, fontSize: 26, color: tokens.ink, marginBottom: 8}}>
                  TELOR + TERIGU
                </div>
                <div style={{fontSize: 60, margin: '14px 0'}}>🥞</div>
                <div
                  style={{
                    backgroundColor: tokens.mint,
                    color: tokens.ink,
                    fontWeight: 900,
                    fontSize: 26,
                    padding: '8px 16px',
                    borderRadius: 12,
                    border: `3px solid ${tokens.ink}`,
                  }}
                >
                  MARTABAK
                </div>
              </StickerCard>

              {/* Semen Tiga Roda */}
              <StickerCard bg="#E2E8F0" tilt={2} style={{flex: 1, textAlign: 'center', position: 'relative'}}>
                <div style={{fontWeight: 900, fontSize: 26, color: tokens.ink, marginBottom: 8}}>
                  TERIGU + TELOR
                </div>
                <div style={{fontSize: 60, margin: '14px 0'}}>🧱</div>
                <div
                  style={{
                    backgroundColor: tokens.hot,
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: 26,
                    padding: '8px 16px',
                    borderRadius: 12,
                    border: `3px solid ${tokens.ink}`,
                  }}
                >
                  SEMEN TIGA RODA
                </div>

                {sinceSemen >= 0 && (
                  <div style={{position: 'absolute', top: -20, right: -20}}>
                    <Stamp text="ABSURD" color={tokens.hot} tilt={12} scale={hitSemen} />
                  </div>
                )}
              </StickerCard>
            </div>
          </div>
        )}
      </div>

      {/* Presenter Elaina di kiri */}
      <Elaina
        side="left"
        track={[
          {atFrame: 0, pose: 'excited'},
          {at: 'resep', pose: 'open_hand', reaction: 'sparkle'},
          {at: 'semen', pose: 'chin_rest', reaction: 'exclamation'},
        ]}
      />
    </div>
  );
};
