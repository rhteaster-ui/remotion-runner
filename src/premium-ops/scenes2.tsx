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
   SCENE 3: WORKER & MULTI-AKUN (Darkroom Slate)
   ============================================================================ */
export const OpsPremiumAgentScene: React.FC = () => {
  const {now, prog} = useProg();
  const rotHot = prog(8.3, 0.45);
  const activeSlot = prog(11.3, 0.4) > 0.5 ? 2 : prog(9.2, 0.4) > 0.5 ? 1 : 0;

  const tools = [
    {
      title: 'Edit Kode',
      metric: 'src/App.tsx +42 -8',
      at: 2.9,
      icon: 'assets/portfolio/tools/typescript.svg',
      bar: prog(3.0, 1.0),
    },
    {
      title: 'Riset Web',
      metric: '14 sumber terverifikasi',
      at: 4.3,
      icon: 'assets/portfolio/tools/playwright.svg',
      bar: prog(4.4, 1.0),
    },
    {
      title: 'Perintah Bash',
      metric: 'npm run build · 0 err',
      at: 5.7,
      icon: 'assets/portfolio/tools/bash.svg',
      bar: prog(5.8, 1.0),
    },
    {
      title: 'Sub-Agen Paralel',
      metric: '3 worker aktif serentak',
      at: 7.0,
      icon: 'assets/portfolio/tools/antigravity.svg',
      bar: prog(7.1, 1.0),
    },
  ];

  const accounts = [
    {id: 'AKUN-01', tier: 'PRO', quota: '92%'},
    {id: 'AKUN-02', tier: 'PRO', quota: '84%'},
    {id: 'AKUN-03', tier: 'FREE', quota: '76%'},
  ];

  return (
    <OpsPremiumShell
      mode="dark"
      from="bridge"
      moves={[{t: 0.7, tab: 'worker'}]}
      statusLabel="WORKER AKTIF"
      activeStatusLabel="9ROUTER ROTATE"
      statusActiveMix={rotHot}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Reveal at={0.2}>
          <OpsKicker dark text="03 // WORKER EXECUTION" />
        </Reveal>
        <WordReveal
          words={[
            {t: 'Eksekusi', at: 0.55},
            {t: 'nyata,', at: 0.95},
            {t: 'Multi-Agen', at: 6.4, accent: true},
            {t: 'Paralel.', at: 6.85, accent: true},
          ]}
          accentColor={P.goldBright}
          style={{
            fontFamily: PORTFOLIO_FONT.display,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
          }}
        />
      </div>

      {/* 2x2 Tool Capability Grid */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        {tools.map((tool) => (
          <Reveal key={tool.title} at={tool.at}>
            <OpsTactileCard dark raised style={{padding: 20}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    backgroundColor: P.dark.bg,
                    border: `1px solid ${P.dark.lineStrong}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                  }}
                >
                  <Img src={staticFile(tool.icon)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                </div>
                <span
                  style={{
                    fontFamily: PORTFOLIO_FONT.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    color: tool.bar > 0.85 ? P.goldBright : P.dark.muted,
                  }}
                >
                  {tool.bar > 0.85 ? 'DONE' : 'EXEC'}
                </span>
              </div>
              <div style={{fontFamily: PORTFOLIO_FONT.display, fontSize: 22, fontWeight: 700, color: P.dark.ink, marginBottom: 4}}>
                {tool.title}
              </div>
              <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, color: P.dark.muted, marginBottom: 12}}>
                {tool.metric}
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: P.dark.bg,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.round(tool.bar * 100)}%`,
                    borderRadius: 999,
                    backgroundColor: P.gold,
                  }}
                />
              </div>
            </OpsTactileCard>
          </Reveal>
        ))}
      </div>

      {/* Multi-Account Pro & Free Rotation Strip (9Router + Gemini) */}
      <Reveal at={8.1}>
        <OpsTactileCard dark accentBorder style={{padding: 22}}>
          <Shine at={11.4} />
          <Sparks at={11.45} count={14} radius={130} color={P.goldBright} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <Img src={staticFile('assets/portfolio/tools/9router.png')} style={{width: 24, height: 24, borderRadius: 6, objectFit: 'contain'}} />
              <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 800, color: P.goldBright}}>
                9ROUTER // PRO & FREE POOL
              </span>
            </div>
            <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 13, color: P.dark.muted}}>
              AUTO-ROTATE
            </span>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12}}>
            {accounts.map((acc, idx) => {
              const isActive = activeSlot === idx;
              const pulse = 0.6 + 0.4 * Math.sin(now * 6 + idx);
              return (
                <div
                  key={acc.id}
                  style={{
                    padding: '14px 14px',
                    borderRadius: 16,
                    backgroundColor: isActive ? P.dark.surface2 : P.dark.bg,
                    border: isActive
                      ? `1.5px solid ${P.gold}`
                      : `1px solid ${P.dark.line}`,
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6}}>
                    <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 800, color: P.dark.ink}}>
                      {acc.id}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontFamily: PORTFOLIO_FONT.mono,
                        fontSize: 12,
                        fontWeight: 800,
                        backgroundColor: acc.tier === 'PRO' ? P.gold : P.dark.surface2,
                        color: acc.tier === 'PRO' ? '#111720' : P.dark.ink,
                      }}
                    >
                      {acc.tier}
                    </span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: PORTFOLIO_FONT.mono, fontSize: 14}}>
                    <span style={{color: isActive ? P.goldBright : P.dark.muted}}>
                      {isActive ? 'ACTIVE' : 'STANDBY'}
                    </span>
                    <span style={{color: P.dark.ink, opacity: isActive ? pulse : 0.75}}>{acc.quota}</span>
                  </div>
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
   SCENE 4: WEB OPS DECK & TASK MAP (Daylight Paper)
   ============================================================================ */
export const OpsPremiumWebScene: React.FC = () => {
  const {now, prog} = useProg();
  const verifyHot = prog(5.5, 0.45);
  const dashOffset = -(now * 44) % 24;
  const chartDraw = prog(1.6, 1.4);

  const nodes = [
    {label: 'Trigger', sub: 'Bot', icon: 'assets/portfolio/tools/telegram.svg', activeAt: 1.4},
    {label: 'Router', sub: 'SSH', icon: 'assets/portfolio/relay.svg', activeAt: 2.4},
    {label: 'Worker', sub: 'AGY', icon: 'assets/portfolio/tools/antigravity.svg', activeAt: 3.4},
    {label: 'Verify', sub: 'CI/CD', icon: 'assets/portfolio/tools/githubactions.svg', activeAt: 4.5},
  ];

  return (
    <OpsPremiumShell
      mode="light"
      from="worker"
      moves={[{t: 0.7, tab: 'opsdeck'}]}
      statusLabel="OPS DECK"
      activeStatusLabel="TASK MAP LIVE"
      statusActiveMix={verifyHot}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Reveal at={0.2}>
          <OpsKicker dark={false} text="04 // WEB OPS DECK & TASK MAP" />
        </Reveal>
        <WordReveal
          words={[
            {t: 'Semua', at: 0.55},
            {t: 'terpantau', at: 0.9},
            {t: 'di', at: 1.3},
            {t: 'Web', at: 2.1, accent: true},
            {t: 'Ops', at: 2.45, accent: true},
            {t: 'Deck.', at: 2.8, accent: true},
          ]}
          accentColor={P.light.accent}
          style={{
            fontFamily: PORTFOLIO_FONT.display,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: P.light.ink,
          }}
        />
      </div>

      {/* Workflow Task Map Card */}
      <Reveal at={1.0}>
        <OpsTactileCard dark={false} raised accentBorder style={{padding: 24}}>
          <Tap at={5.5} from={{x: 180, y: 110}} ripple={P.light.accent} />
          <Shine at={5.65} alpha={0.6} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
            <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 800, color: P.light.accent}}>
              TASK MAP // LIVE WORKFLOW
            </span>
            <span
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                fontFamily: PORTFOLIO_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                backgroundColor: verifyHot > 0.5 ? P.dark.surface : P.light.surface,
                color: verifyHot > 0.5 ? P.goldBright : P.light.ink,
                border: `1px solid ${P.light.lineStrong}`,
              }}
            >
              {verifyHot > 0.5 ? 'ALL NOMINAL' : 'STREAMING'}
            </span>
          </div>

          <div style={{position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'center'}}>
            <svg
              style={{position: 'absolute', left: '10%', right: '10%', top: '50%', width: '80%', height: 12, transform: 'translateY(-50%)', pointerEvents: 'none'}}
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="6"
                x2="400"
                y2="6"
                stroke={P.light.accent}
                strokeWidth="3.5"
                strokeDasharray="10 6"
                strokeDashoffset={dashOffset}
              />
            </svg>

            {nodes.map((n) => {
              const on = prog(n.activeAt, 0.35) > 0.5;
              return (
                <div
                  key={n.label}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '14px 10px',
                    borderRadius: 16,
                    textAlign: 'center',
                    backgroundColor: on ? P.dark.surface : P.light.surface,
                    color: on ? P.dark.ink : P.light.ink,
                    border: on ? `1.5px solid ${P.gold}` : `1px solid ${P.light.lineStrong}`,
                    boxShadow: P.light.shadow,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Img src={staticFile(n.icon)} style={{width: 28, height: 28, objectFit: 'contain'}} />
                  <div style={{fontSize: 17, fontWeight: 800}}>{n.label}</div>
                  <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 12, color: on ? P.goldBright : P.light.muted}}>
                    {n.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </OpsTactileCard>
      </Reveal>

      {/* Telemetry Row: CPU Graph + Account Quota */}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        <Reveal at={2.8}>
          <OpsTactileCard dark={false} style={{padding: 22}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
              <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 800, color: P.light.accent}}>
                CPU & RAM
              </span>
              <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 16, fontWeight: 800, color: P.light.ink}}>
                34%
              </span>
            </div>
            <svg width="100%" height="96" viewBox="0 0 260 96">
              <defs>
                <linearGradient id="cpuAreaSlate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={P.light.accent} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={P.light.accent} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0 72 L36 60 L72 64 L108 42 L144 48 L180 28 L216 36 L260 22 L260 96 L0 96 Z"
                fill="url(#cpuAreaSlate)"
                opacity={chartDraw}
              />
              <path
                d="M0 72 L36 60 L72 64 L108 42 L144 48 L180 28 L216 36 L260 22"
                fill="none"
                stroke={P.light.accent}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="340"
                strokeDashoffset={340 * (1 - chartDraw)}
              />
            </svg>
            <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 13, color: P.light.muted, marginTop: 6}}>
              1.2 GB / 2.0 GB RAM · STABLE
            </div>
          </OpsTactileCard>
        </Reveal>

        <Reveal at={3.8}>
          <OpsTactileCard dark={false} style={{padding: 22}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14}}>
              <Img src={staticFile('assets/portfolio/tools/9router.png')} style={{width: 20, height: 20, borderRadius: 4, objectFit: 'contain'}} />
              <span style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 800, color: P.light.accent}}>
                KUOTA AKUN
              </span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              {[
                {label: 'Pro #1', pct: 92},
                {label: 'Pro #2', pct: 84},
                {label: 'Free #3', pct: 68},
              ].map((q) => {
                const w = interpolate(prog(4.2, 0.9), [0, 1], [0, q.pct]);
                return (
                  <div key={q.label}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: PORTFOLIO_FONT.mono, fontSize: 14, fontWeight: 700, marginBottom: 5}}>
                      <span style={{color: P.light.ink}}>{q.label}</span>
                      <span style={{color: P.light.accent}}>{Math.round(w)}%</span>
                    </div>
                    <div style={{height: 8, borderRadius: 999, backgroundColor: P.light.surface2, overflow: 'hidden'}}>
                      <div style={{height: '100%', width: `${w}%`, borderRadius: 999, backgroundColor: P.light.accent}} />
                    </div>
                  </div>
                );
              })}
            </div>
          </OpsTactileCard>
        </Reveal>
      </div>
    </OpsPremiumShell>
  );
};

/* ============================================================================
   SCENE 5: PERSONAL BRANDING (Darkroom Slate) — Rahmat / RHMT OFC & rhmt.biz.id
   ============================================================================ */
export const OpsPremiumBrandScene: React.FC = () => {
  const {prog} = useProg();
  const brandHot = prog(2.3, 0.45);
  const ctaHot = prog(11.4, 0.45);

  const stacks = [
    {name: 'Fullstack Web', icon: 'assets/portfolio/tools/react.svg'},
    {name: 'DevOps Linux', icon: 'assets/portfolio/tools/ubuntu.svg'},
    {name: 'Otomasi AI', icon: 'assets/portfolio/tools/gemini.svg'},
  ];

  return (
    <OpsPremiumShell
      mode="dark"
      from="opsdeck"
      moves={[{t: 0.7, tab: 'trigger'}]}
      statusLabel="CREATOR"
      activeStatusLabel="R_HMT OFC"
      statusActiveMix={brandHot}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <Reveal at={0.2}>
          <OpsKicker dark text="05 // ARCHITECT & BUILDER" />
        </Reveal>
        <WordReveal
          words={[
            {t: 'Diracik', at: 0.55},
            {t: 'mandiri', at: 1.05},
            {t: 'oleh', at: 1.55},
            {t: 'Rahmat.', at: 2.25, accent: true},
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

      {/* Creator Identity Card */}
      <Reveal at={1.8}>
        <OpsTactileCard dark raised accentBorder style={{padding: 28}}>
          <Shine at={2.4} />
          <Sparks at={2.35} count={20} radius={175} color={P.goldBright} />
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: 24,
                overflow: 'hidden',
                border: `2px solid ${P.gold}`,
                boxShadow: '0 0 28px rgba(197, 162, 117, 0.3)',
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile('assets/portfolio/pp-dev.png')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6}}>
                <span style={{fontFamily: PORTFOLIO_FONT.display, fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: P.dark.ink}}>
                  Rahmat
                </span>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontFamily: PORTFOLIO_FONT.mono,
                    fontSize: 14,
                    fontWeight: 800,
                    backgroundColor: P.gold,
                    color: '#111720',
                  }}
                >
                  RHMT OFC
                </span>
              </div>
              <div style={{fontSize: 19, color: P.dark.muted, lineHeight: 1.45}}>
                Pelajar yang ngulik Fullstack, DevOps Linux, dan Otomasi AI.
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 22}}>
            {stacks.map((s, i) => (
              <Reveal key={s.name} at={4.6 + i * 1.1}>
                <div
                  style={{
                    padding: '12px 12px',
                    borderRadius: 14,
                    backgroundColor: P.dark.bg,
                    border: `1px solid ${P.dark.accentBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    fontFamily: PORTFOLIO_FONT.mono,
                    fontSize: 14,
                    fontWeight: 700,
                    color: P.goldBright,
                  }}
                >
                  <Img src={staticFile(s.icon)} style={{width: 20, height: 20, objectFit: 'contain'}} />
                  <span>{s.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </OpsTactileCard>
      </Reveal>

      {/* Portfolio CTA Card */}
      <Reveal at={10.2}>
        <OpsTactileCard dark style={{padding: 24}}>
          <Tap at={11.4} from={{x: 150, y: 110}} ripple={P.goldBright} />
          <Shine at={11.55} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <Img
                src={staticFile('assets/portfolio/rhmt-mark.svg')}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  objectFit: 'contain',
                  border: `1px solid ${P.dark.accentBorder}`,
                }}
              />
              <div>
                <div style={{fontFamily: PORTFOLIO_FONT.mono, fontSize: 24, fontWeight: 800, color: P.dark.ink}}>
                  rhmt.biz.id
                </div>
                <div style={{fontSize: 17, color: P.dark.muted}}>
                  github.com/rhmt-ofc · @rhmtofc
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                borderRadius: 14,
                backgroundColor: ctaHot > 0.5 ? P.gold : P.dark.surface2,
                color: ctaHot > 0.5 ? '#111720' : P.goldBright,
                fontFamily: PORTFOLIO_FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                border: `1px solid ${P.gold}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Img src={staticFile('assets/portfolio/tools/github.svg')} style={{width: 20, height: 20, objectFit: 'contain'}} />
              EXPLORE
            </div>
          </div>
        </OpsTactileCard>
      </Reveal>
    </OpsPremiumShell>
  );
};
