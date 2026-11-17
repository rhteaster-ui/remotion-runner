import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {
  BridgeSvg,
  CpuSvg,
  OpsKicker,
  OpsPremiumShell,
  OpsTactileCard,
  Reveal,
  ServerSvg,
  ShieldCheckSvg,
  Shine,
  Sparks,
  Tap,
  TerminalSvg,
  WordReveal,
  useProg,
} from './shell';

/* ============================================================================
   SCENE 1: HOOK (Dark Canopy) — Chat 1-Arah vs Sistem Agentic Rahmat
   ============================================================================ */
export const OpsPremiumHookScene: React.FC = () => {
  const {now, prog} = useProg();
  const agenticActive = prog(3.75, 0.35);
  const cmdSent = prog(6.45, 0.45);
  const step1 = prog(7.15, 0.35);
  const step2 = prog(7.95, 0.35);
  const step3 = prog(8.75, 0.35);

  const steps = [
    {num: '01', label: 'Parse Intent & Context', p: step1},
    {num: '02', label: 'SSH Bridge VPS-1 -> VPS-2', p: step2},
    {num: '03', label: 'Run Bash, Code & Verify', p: step3},
  ];

  return (
    <OpsPremiumShell
      mode="dark"
      from="trigger"
      statusLabel="CHAT PASIF"
      activeStatusLabel="AGENTIC AKTIF"
      statusActiveMix={agenticActive}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <Reveal at={0.2}>
          <OpsKicker dark text="01 // PARADIGM SHIFT" />
        </Reveal>
        <WordReveal
          words={[
            {t: 'Bukan', at: 0.55},
            {t: 'chat', at: 0.9},
            {t: 'pasif,', at: 1.3},
            {t: 'ini', at: 1.7},
            {t: 'Sistem', at: 3.45, accent: true},
            {t: 'Agentic.', at: 3.8, accent: true},
          ]}
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        />
      </div>

      {/* Kontras 2 Kartu: Chat 1-Arah vs Sistem Agentic Rahmat */}
      <div style={{display: 'grid', gridTemplateColumns: '0.92fr 1.18fr', gap: 18}}>
        <Reveal at={1.1}>
          <OpsTactileCard
            dark
            style={{
              padding: 24,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: interpolate(agenticActive, [0, 1], [1, 0.52]),
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontFamily: EREKAP_FONT.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: 'rgba(239,68,68,0.18)',
                  color: '#FCA5A5',
                  border: '1px solid rgba(239,68,68,0.4)',
                  marginBottom: 14,
                }}
              >
                1-ARAH
              </div>
              <div style={{fontSize: 27, fontWeight: 800, lineHeight: 1.2, marginBottom: 10}}>
                Chat AI Biasa
              </div>
              <div style={{fontSize: 18, color: 'rgba(220,252,231,0.72)', lineHeight: 1.4}}>
                Hanya jawab teks di layar. Tidak bisa sentuh server.
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '10px 14px',
                borderRadius: 14,
                backgroundColor: 'rgba(0,0,0,0.28)',
                fontFamily: EREKAP_FONT.mono,
                fontSize: 15,
                color: '#FCA5A5',
              }}
            >
              0 eksekusi nyata
            </div>
          </OpsTactileCard>
        </Reveal>

        <Reveal at={3.4}>
          <OpsTactileCard
            dark
            raised
            accentBorder
            style={{
              padding: 26,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Shine at={3.9} />
            <Sparks at={3.85} count={18} radius={165} />
            <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: 999,
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    backgroundColor: T.lime,
                    color: T.limeInk,
                  }}
                >
                  RACIKAN RAHMAT
                </span>
                <Img
                  src={staticFile('assets/ops/agy-official.png')}
                  style={{width: 34, height: 34, borderRadius: 8, objectFit: 'contain'}}
                />
              </div>
              <div style={{fontSize: 30, fontWeight: 800, lineHeight: 1.16, color: '#FFFFFF', marginBottom: 10}}>
                Sistem Agentic
              </div>
              <div style={{fontSize: 19, color: 'rgba(220,252,231,0.9)', lineHeight: 1.4}}>
                Kirim 1 perintah, seluruh worker langsung eksekusi.
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '10px 14px',
                borderRadius: 14,
                backgroundColor: 'rgba(7,41,25,0.72)',
                border: '1px solid rgba(163,230,53,0.35)',
                fontFamily: EREKAP_FONT.mono,
                fontSize: 15,
                fontWeight: 700,
                color: T.lime,
              }}
            >
              STATUS: AUTONOMOUS
            </div>
          </OpsTactileCard>
        </Reveal>
      </div>

      {/* Live Command Dispatch Stage */}
      <Reveal at={5.6}>
        <OpsTactileCard dark style={{padding: 26}}>
          <Tap at={6.45} from={{x: 160, y: 120}} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <TerminalSvg color={T.lime} size={24} />
              <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 18, fontWeight: 700, color: '#FFFFFF'}}>
                /audit-server --auto
              </span>
            </div>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontFamily: EREKAP_FONT.mono,
                fontSize: 14,
                fontWeight: 800,
                backgroundColor: cmdSent > 0.5 ? T.lime : 'rgba(255,255,255,0.12)',
                color: cmdSent > 0.5 ? T.limeInk : 'rgba(255,255,255,0.75)',
              }}
            >
              {step3 > 0.8 ? '200 OK' : cmdSent > 0.5 ? 'RUNNING' : 'QUEUED'}
            </span>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {steps.map((s) => {
              const active = s.p > 0.5;
              return (
                <div
                  key={s.num}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 16,
                    backgroundColor: active ? 'rgba(163,230,53,0.14)' : 'rgba(255,255,255,0.04)',
                    border: active
                      ? '1px solid rgba(163,230,53,0.45)'
                      : '1px solid rgba(255,255,255,0.08)',
                    opacity: 0.45 + 0.55 * s.p,
                    transform: `translateX(${(1 - s.p) * 14}px)`,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 15, fontWeight: 800, color: T.lime}}>
                      {s.num}
                    </span>
                    <span style={{fontSize: 19, fontWeight: 700, color: '#FFFFFF'}}>{s.label}</span>
                  </div>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: active ? T.lime : 'rgba(255,255,255,0.22)',
                      boxShadow: active ? `0 0 ${8 + Math.sin(now * 6) * 4}px ${T.lime}` : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </OpsTactileCard>
      </Reveal>
    </OpsPremiumShell>
  );
};

/* ============================================================================
   SCENE 2: BRIDGE (Crisp Light) — HP Bot -> Terminal -> SSH Dual-VPS
   ============================================================================ */
export const OpsPremiumBridgeScene: React.FC = () => {
  const {now, prog} = useProg();
  const bridgeHot = prog(4.3, 0.5);
  const packet = ((now * 0.75) % 1);

  return (
    <OpsPremiumShell
      mode="light"
      from="trigger"
      moves={[{t: 1.5, tab: 'bridge'}]}
      statusLabel="HP TRIGGER"
      activeStatusLabel="SSH TUNNEL LIVE"
      statusActiveMix={bridgeHot}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Reveal at={0.2}>
          <OpsKicker dark={false} text="02 // DUAL-VPS BRIDGE" />
        </Reveal>
        <WordReveal
          words={[
            {t: 'Dari', at: 0.55},
            {t: 'HP', at: 0.85},
            {t: 'langsung', at: 1.2},
            {t: 'tembus', at: 1.6},
            {t: 'Dual-VPS.', at: 3.8, accent: true},
          ]}
          accentColor={T.canopyMid}
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: T.ink,
          }}
        />
      </div>

      {/* Gateway Bot Input Strip */}
      <Reveal at={1.0}>
        <OpsTactileCard dark={false} style={{padding: 22}}>
          <Tap at={1.45} from={{x: -100, y: 90}} ripple={T.canopyMid} />
          <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 700, color: T.inkMuted, marginBottom: 12}}>
            GATEWAY INPUT // MOBILE CLIENT
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
            {[
              {name: 'Telegram Bot', sub: '@rhmt_ops_bot', icon: 'assets/ops/tg-official.svg'},
              {name: 'WhatsApp', sub: 'Baileys Socket', icon: 'assets/ops/wa-official.svg'},
            ].map((ch) => (
              <div
                key={ch.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 18,
                  backgroundColor: T.surfaceMint,
                  border: `1px solid ${T.borderStrong}`,
                }}
              >
                <Img src={staticFile(ch.icon)} style={{width: 34, height: 34, objectFit: 'contain'}} />
                <div>
                  <div style={{fontSize: 19, fontWeight: 800, color: T.ink}}>{ch.name}</div>
                  <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, color: T.canopyMid}}>{ch.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </OpsTactileCard>
      </Reveal>

      {/* Dual-VPS Architecture Stage */}
      <Reveal at={3.1}>
        <OpsTactileCard dark={false} raised accentBorder style={{padding: 26}}>
          <Shine at={4.45} alpha={0.65} />
          <div style={{display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 14}}>
            {/* VPS 1 */}
            <div
              style={{
                padding: 20,
                borderRadius: 20,
                backgroundColor: T.surface,
                border: `1.5px solid ${T.borderStrong}`,
                boxShadow: T.shadowCard,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
                <ServerSvg color={T.canopy} size={24} />
                <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 15, fontWeight: 800, color: T.canopy}}>
                  VPS-1
                </span>
              </div>
              <div style={{fontSize: 22, fontWeight: 800, color: T.ink}}>Gateway</div>
              <div style={{fontSize: 16, color: T.inkMuted, marginTop: 4}}>Auth & Router</div>
            </div>

            {/* Encrypted SSH Conduit */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 136}}>
              <div
                style={{
                  padding: '5px 10px',
                  borderRadius: 999,
                  backgroundColor: T.canopyDeep,
                  color: T.lime,
                  fontFamily: EREKAP_FONT.mono,
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                SSH · 12ms
              </div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: T.surfaceMint,
                  border: `1px solid ${T.borderStrong}`,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: `${packet * 85}%`,
                    width: 28,
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: T.canopyMid,
                    boxShadow: `0 0 12px ${T.lime}`,
                  }}
                />
              </div>
              <BridgeSvg color={T.canopyMid} size={22} />
            </div>

            {/* VPS 2 */}
            <div
              style={{
                padding: 20,
                borderRadius: 20,
                backgroundColor: T.canopyDeep,
                border: '1.5px solid rgba(163,230,53,0.55)',
                color: '#FFFFFF',
                boxShadow: '0 16px 32px -12px rgba(7,41,25,0.45)',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
                <CpuSvg color={T.lime} size={24} />
                <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 15, fontWeight: 800, color: T.lime}}>
                  VPS-2
                </span>
              </div>
              <div style={{fontSize: 22, fontWeight: 800}}>Worker</div>
              <div style={{fontSize: 16, color: 'rgba(220,252,231,0.78)', marginTop: 4}}>Agent Runtime</div>
            </div>
          </div>

          {/* Live SSH Terminal Strip */}
          <div
            style={{
              marginTop: 18,
              padding: '14px 18px',
              borderRadius: 16,
              backgroundColor: T.canopyDeep,
              fontFamily: EREKAP_FONT.mono,
              fontSize: 15,
              color: '#DCFCE7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <span style={{color: T.lime}}>$</span> ssh -J vps1 vps2 &quot;ag-run --sync&quot;
            </span>
            <span style={{display: 'inline-flex', alignItems: 'center', gap: 6, color: T.lime, fontWeight: 800}}>
              <ShieldCheckSvg color={T.lime} size={18} />
              REAL-TIME
            </span>
          </div>
        </OpsTactileCard>
      </Reveal>
    </OpsPremiumShell>
  );
};
