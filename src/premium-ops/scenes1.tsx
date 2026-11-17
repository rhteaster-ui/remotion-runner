import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {
  OpsKicker,
  OpsPremiumShell,
  OpsTactileCard,
  Reveal,
  Shine,
  Sparks,
  Tap,
  WordReveal,
  useProg,
} from './shell';
import {PORTFOLIO_FONT, PORTFOLIO_TOKENS as P} from './tokens';

/* ============================================================================
   SCENE 1: HOOK (Darkroom Slate) — Chat 1-Arah vs Sistem Agentic Rahmat
   ============================================================================ */
export const OpsPremiumHookScene: React.FC = () => {
  const {now, prog} = useProg();
  const agenticActive = prog(3.75, 0.35);
  const cmdSent = prog(6.45, 0.45);
  const step1 = prog(7.15, 0.35);
  const step2 = prog(7.95, 0.35);
  const step3 = prog(8.75, 0.35);

  const steps = [
    {
      num: '01',
      label: 'Parse Intent & Context',
      icon: 'assets/portfolio/tools/gemini.svg',
      p: step1,
    },
    {
      num: '02',
      label: 'SSH Bridge VPS-1 -> VPS-2',
      icon: 'assets/portfolio/relay.svg',
      p: step2,
    },
    {
      num: '03',
      label: 'Run Bash, Code & PM2',
      icon: 'assets/portfolio/tools/pm2.svg',
      p: step3,
    },
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
          accentColor={P.goldBright}
          style={{
            fontFamily: PORTFOLIO_FONT.display,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.06,
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
                  fontFamily: PORTFOLIO_FONT.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: 'rgba(239, 68, 68, 0.16)',
                  color: '#FCA5A5',
                  border: '1px solid rgba(239, 68, 68, 0.36)',
                  marginBottom: 14,
                }}
              >
                1-ARAH
              </div>
              <div
                style={{
                  fontFamily: PORTFOLIO_FONT.display,
                  fontSize: 27,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                Chat AI Biasa
              </div>
              <div style={{fontSize: 18, color: P.dark.muted, lineHeight: 1.45}}>
                Hanya jawab teks di layar. Tidak bisa sentuh server.
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '10px 14px',
                borderRadius: 12,
                backgroundColor: P.dark.bg,
                border: `1px solid ${P.dark.line}`,
                fontFamily: PORTFOLIO_FONT.mono,
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
            <Sparks at={3.85} count={18} radius={165} color={P.goldBright} />
            <div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: 999,
                    fontFamily: PORTFOLIO_FONT.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    backgroundColor: P.gold,
                    color: '#111720',
                  }}
                >
                  RACIKAN RAHMAT
                </span>
                <Img
                  src={staticFile('assets/portfolio/tools/antigravity.svg')}
                  style={{width: 34, height: 34, objectFit: 'contain'}}
                />
              </div>
              <div
                style={{
                  fontFamily: PORTFOLIO_FONT.display,
                  fontSize: 30,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: P.dark.ink,
                  marginBottom: 10,
                }}
              >
                Sistem Agentic
              </div>
              <div style={{fontSize: 19, color: P.steelIce, lineHeight: 1.45}}>
                Kirim 1 perintah, seluruh worker langsung eksekusi.
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '10px 14px',
                borderRadius: 12,
                backgroundColor: P.dark.bg,
                border: `1px solid ${P.dark.accentBorder}`,
                fontFamily: PORTFOLIO_FONT.mono,
                fontSize: 15,
                fontWeight: 700,
                color: P.goldBright,
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
          <Tap at={6.45} from={{x: 160, y: 120}} ripple={P.goldBright} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Img
                src={staticFile('assets/portfolio/tools/bash.svg')}
                style={{width: 28, height: 28, objectFit: 'contain'}}
              />
              <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 18, fontWeight: 700, color: P.dark.ink}}>
                /audit-server --auto
              </span>
            </div>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontFamily: PORTFOLIO_FONT.mono,
                fontSize: 14,
                fontWeight: 800,
                backgroundColor: cmdSent > 0.5 ? P.gold : P.dark.surface2,
                color: cmdSent > 0.5 ? '#111720' : P.dark.muted,
                border: `1px solid ${cmdSent > 0.5 ? 'transparent' : P.dark.lineStrong}`,
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
                    borderRadius: 14,
                    backgroundColor: active ? P.dark.surface2 : P.dark.bg,
                    border: active
                      ? `1px solid ${P.dark.accentBorder}`
                      : `1px solid ${P.dark.line}`,
                    opacity: 0.45 + 0.55 * s.p,
                    transform: `translateX(${(1 - s.p) * 14}px)`,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <Img
                      src={staticFile(s.icon)}
                      style={{width: 24, height: 24, objectFit: 'contain'}}
                    />
                    <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 15, fontWeight: 800, color: P.goldBright}}>
                      {s.num}
                    </span>
                    <span style={{fontSize: 19, fontWeight: 700, color: P.dark.ink}}>{s.label}</span>
                  </div>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      backgroundColor: active ? P.gold : P.dark.quiet,
                      boxShadow: active ? `0 0 ${8 + Math.sin(now * 6) * 4}px ${P.gold}` : 'none',
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
   SCENE 2: BRIDGE (Daylight Paper) — HP Bot -> Terminal -> SSH Dual-VPS
   ============================================================================ */
export const OpsPremiumBridgeScene: React.FC = () => {
  const {now, prog} = useProg();
  const bridgeHot = prog(4.3, 0.5);
  const packet = (now * 0.75) % 1;

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
          accentColor={P.light.accent}
          style={{
            fontFamily: PORTFOLIO_FONT.display,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: P.light.ink,
          }}
        />
      </div>

      {/* Gateway Bot Input Strip */}
      <Reveal at={1.0}>
        <OpsTactileCard dark={false} style={{padding: 22}}>
          <Tap at={1.45} from={{x: -100, y: 90}} ripple={P.light.accent} />
          <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 700, color: P.light.quiet, marginBottom: 12}}>
            GATEWAY INPUT // MOBILE CLIENT
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14}}>
            {[
              {name: 'Telegram Bot', sub: '@agency_rdev_bot', icon: 'assets/portfolio/tools/telegram.svg'},
              {name: 'WhatsApp', sub: 'Baileys Socket', icon: 'assets/portfolio/tools/whatsapp.svg'},
            ].map((ch) => (
              <div
                key={ch.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  borderRadius: 16,
                  backgroundColor: P.light.surface2,
                  border: `1px solid ${P.light.lineStrong}`,
                }}
              >
                <Img src={staticFile(ch.icon)} style={{width: 34, height: 34, objectFit: 'contain'}} />
                <div>
                  <div style={{fontSize: 19, fontWeight: 800, color: P.light.ink}}>{ch.name}</div>
                  <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, color: P.light.muted}}>{ch.sub}</div>
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
                borderRadius: 18,
                backgroundColor: P.light.surface,
                border: `1.5px solid ${P.light.lineStrong}`,
                boxShadow: P.light.shadow,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
                <Img src={staticFile('assets/portfolio/tools/ubuntu.svg')} style={{width: 26, height: 26, objectFit: 'contain'}} />
                <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 15, fontWeight: 800, color: P.light.accent}}>
                  VPS-1
                </span>
              </div>
              <div style={{fontFamily: PORTFOLIO_FONT.display, fontSize: 22, fontWeight: 700, color: P.light.ink}}>
                Gateway
              </div>
              <div style={{fontSize: 16, color: P.light.muted, marginTop: 4}}>Auth & Router</div>
            </div>

            {/* Encrypted SSH Conduit */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 136}}>
              <div
                style={{
                  padding: '5px 10px',
                  borderRadius: 999,
                  backgroundColor: P.dark.surface,
                  color: P.goldBright,
                  fontFamily: PORTFOLIO_FONT.mono,
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
                  backgroundColor: P.light.surface,
                  border: `1px solid ${P.light.lineStrong}`,
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
                    backgroundColor: P.light.accent,
                  }}
                />
              </div>
              <Img src={staticFile('assets/portfolio/relay.svg')} style={{width: 24, height: 24, objectFit: 'contain'}} />
            </div>

            {/* VPS 2 */}
            <div
              style={{
                padding: 20,
                borderRadius: 18,
                backgroundColor: P.dark.surface,
                border: `1.5px solid ${P.dark.accentBorder}`,
                color: P.dark.ink,
                boxShadow: P.dark.shadow,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10}}>
                <Img src={staticFile('assets/portfolio/tools/antigravity.svg')} style={{width: 26, height: 26, objectFit: 'contain'}} />
                <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 15, fontWeight: 800, color: P.goldBright}}>
                  VPS-2
                </span>
              </div>
              <div style={{fontFamily: PORTFOLIO_FONT.display, fontSize: 22, fontWeight: 700}}>
                Worker
              </div>
              <div style={{fontSize: 16, color: P.dark.muted, marginTop: 4}}>Agent Runtime</div>
            </div>
          </div>

          {/* Live SSH Terminal Strip */}
          <div
            style={{
              marginTop: 18,
              padding: '14px 18px',
              borderRadius: 14,
              backgroundColor: P.dark.bg,
              border: `1px solid ${P.dark.lineStrong}`,
              fontFamily: PORTFOLIO_FONT.mono,
              fontSize: 15,
              color: P.dark.ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              <span style={{color: P.goldBright}}>$</span> ssh -J vps1 vps2 &quot;ag-run --sync&quot;
            </span>
            <span style={{color: P.goldBright, fontWeight: 800}}>
              REAL-TIME
            </span>
          </div>
        </OpsTactileCard>
      </Reveal>
    </OpsPremiumShell>
  );
};
