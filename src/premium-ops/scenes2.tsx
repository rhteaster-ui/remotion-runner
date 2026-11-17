import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {EREKAP_FONT, EREKAP_TOKENS as T} from '../lib/erekapTokens';
import {
  ActivitySvg,
  AgentCoreSvg,
  CodeSvg,
  GitBranchSvg,
  GlobeSvg,
  OpsKicker,
  OpsPremiumShell,
  OpsTactileCard,
  Reveal,
  SearchSvg,
  Shine,
  Sparks,
  Tap,
  TerminalSvg,
  WordReveal,
  useProg,
} from './shell';

/* ============================================================================
   SCENE 3: WORKER & MULTI-AKUN (Dark Canopy) — Edit Kode, Riset, Bash, Sub-Agen
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
      icon: <CodeSvg color={T.lime} size={24} />,
      bar: prog(3.0, 1.0),
    },
    {
      title: 'Riset Web',
      metric: '14 sumber terverifikasi',
      at: 4.3,
      icon: <SearchSvg color={T.lime} size={24} />,
      bar: prog(4.4, 1.0),
    },
    {
      title: 'Perintah Bash',
      metric: 'npm run build · 0 err',
      at: 5.7,
      icon: <TerminalSvg color={T.lime} size={24} />,
      bar: prog(5.8, 1.0),
    },
    {
      title: 'Sub-Agen Paralel',
      metric: '3 worker aktif serentak',
      at: 7.0,
      icon: <GitBranchSvg color={T.lime} size={24} />,
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
      activeStatusLabel="MULTI-AKUN ROTATE"
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
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.08,
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
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    backgroundColor: 'rgba(163,230,53,0.14)',
                    border: '1px solid rgba(163,230,53,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tool.icon}
                </div>
                <span
                  style={{
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 13,
                    fontWeight: 800,
                    color: tool.bar > 0.85 ? T.lime : 'rgba(220,252,231,0.75)',
                  }}
                >
                  {tool.bar > 0.85 ? 'DONE' : 'EXEC'}
                </span>
              </div>
              <div style={{fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 4}}>
                {tool.title}
              </div>
              <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, color: 'rgba(220,252,231,0.76)', marginBottom: 12}}>
                {tool.metric}
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.round(tool.bar * 100)}%`,
                    borderRadius: 999,
                    backgroundColor: T.lime,
                  }}
                />
              </div>
            </OpsTactileCard>
          </Reveal>
        ))}
      </div>

      {/* Multi-Account Pro & Free Rotation Strip */}
      <Reveal at={8.1}>
        <OpsTactileCard dark accentBorder style={{padding: 22}}>
          <Shine at={11.4} />
          <Sparks at={11.45} count={14} radius={130} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 800, color: T.lime}}>
              AUTO-ROTATE // PRO & FREE POOL
            </span>
            <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 13, color: 'rgba(220,252,231,0.8)'}}>
              ZERO RATE-LIMIT
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
                    borderRadius: 18,
                    backgroundColor: isActive ? 'rgba(163,230,53,0.18)' : 'rgba(255,255,255,0.05)',
                    border: isActive
                      ? `1.5px solid ${T.lime}`
                      : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6}}>
                    <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 800, color: '#FFFFFF'}}>
                      {acc.id}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontFamily: EREKAP_FONT.mono,
                        fontSize: 12,
                        fontWeight: 800,
                        backgroundColor: acc.tier === 'PRO' ? T.lime : 'rgba(255,255,255,0.16)',
                        color: acc.tier === 'PRO' ? T.limeInk : '#FFFFFF',
                      }}
                    >
                      {acc.tier}
                    </span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: EREKAP_FONT.mono, fontSize: 14}}>
                    <span style={{color: isActive ? T.lime : 'rgba(220,252,231,0.72)'}}>
                      {isActive ? 'ACTIVE' : 'STANDBY'}
                    </span>
                    <span style={{color: '#FFFFFF', opacity: isActive ? pulse : 0.75}}>{acc.quota}</span>
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
   SCENE 4: WEB OPS DECK & TASK MAP (Crisp Light) — Workflow, CPU, Kuota
   ============================================================================ */
export const OpsPremiumWebScene: React.FC = () => {
  const {now, prog} = useProg();
  const verifyHot = prog(5.5, 0.45);
  const dashOffset = -(now * 44) % 24;
  const chartDraw = prog(1.6, 1.4);

  const nodes = [
    {label: 'Trigger', sub: 'Bot', activeAt: 1.4},
    {label: 'Router', sub: 'SSH', activeAt: 2.4},
    {label: 'Worker', sub: 'Agent', activeAt: 3.4},
    {label: 'Verify', sub: '200 OK', activeAt: 4.5},
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
          accentColor={T.canopyMid}
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: T.ink,
          }}
        />
      </div>

      {/* Workflow Task Map Card */}
      <Reveal at={1.0}>
        <OpsTactileCard dark={false} raised accentBorder style={{padding: 24}}>
          <Tap at={5.5} from={{x: 180, y: 110}} ripple={T.canopyMid} />
          <Shine at={5.65} alpha={0.6} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
            <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 800, color: T.canopy}}>
              TASK MAP // LIVE WORKFLOW
            </span>
            <span
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                fontFamily: EREKAP_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                backgroundColor: verifyHot > 0.5 ? T.lime : T.surfaceMint,
                color: T.canopyDeep,
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
                stroke={T.canopyMid}
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
                    padding: '16px 10px',
                    borderRadius: 18,
                    textAlign: 'center',
                    backgroundColor: on ? T.canopyDeep : T.surface,
                    color: on ? '#FFFFFF' : T.ink,
                    border: on ? `1.5px solid ${T.lime}` : `1px solid ${T.borderStrong}`,
                    boxShadow: T.shadowCard,
                  }}
                >
                  <div style={{fontSize: 18, fontWeight: 800}}>{n.label}</div>
                  <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 13, color: on ? T.lime : T.inkMuted, marginTop: 4}}>
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
              <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <ActivitySvg color={T.canopy} size={20} />
                <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 800, color: T.canopy}}>
                  CPU & RAM
                </span>
              </div>
              <span style={{fontFamily: EREKAP_FONT.mono, fontSize: 16, fontWeight: 800, color: T.ink}}>
                34%
              </span>
            </div>
            <svg width="100%" height="96" viewBox="0 0 260 96">
              <defs>
                <linearGradient id="cpuArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.canopyMid} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={T.canopyMid} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0 72 L36 60 L72 64 L108 42 L144 48 L180 28 L216 36 L260 22 L260 96 L0 96 Z"
                fill="url(#cpuArea)"
                opacity={chartDraw}
              />
              <path
                d="M0 72 L36 60 L72 64 L108 42 L144 48 L180 28 L216 36 L260 22"
                fill="none"
                stroke={T.canopy}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="340"
                strokeDashoffset={340 * (1 - chartDraw)}
              />
            </svg>
            <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 13, color: T.inkMuted, marginTop: 6}}>
              1.2 GB / 2.0 GB RAM · STABLE
            </div>
          </OpsTactileCard>
        </Reveal>

        <Reveal at={3.8}>
          <OpsTactileCard dark={false} style={{padding: 22}}>
            <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 800, color: T.canopy, marginBottom: 14}}>
              KUOTA TIAP AKUN
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
                    <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: EREKAP_FONT.mono, fontSize: 14, fontWeight: 700, marginBottom: 5}}>
                      <span style={{color: T.ink}}>{q.label}</span>
                      <span style={{color: T.canopyMid}}>{Math.round(w)}%</span>
                    </div>
                    <div style={{height: 8, borderRadius: 999, backgroundColor: T.surfaceMint, overflow: 'hidden'}}>
                      <div style={{height: '100%', width: `${w}%`, borderRadius: 999, backgroundColor: T.canopyMid}} />
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
   SCENE 5: PERSONAL BRANDING (Dark Canopy) — Rahmat / RHMT OFC & rhmt.biz.id
   ============================================================================ */
export const OpsPremiumBrandScene: React.FC = () => {
  const {prog} = useProg();
  const brandHot = prog(2.3, 0.45);
  const ctaHot = prog(11.4, 0.45);

  return (
    <OpsPremiumShell
      mode="dark"
      from="opsdeck"
      moves={[{t: 0.7, tab: 'trigger'}]}
      statusLabel="CREATOR"
      activeStatusLabel="RHMT OFC"
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
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
          }}
        />
      </div>

      {/* Creator Identity Card */}
      <Reveal at={1.8}>
        <OpsTactileCard dark raised accentBorder style={{padding: 28}}>
          <Shine at={2.4} />
          <Sparks at={2.35} count={20} radius={175} />
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: 28,
                overflow: 'hidden',
                border: `2.5px solid ${T.lime}`,
                boxShadow: '0 0 28px rgba(163,230,53,0.35)',
                flexShrink: 0,
              }}
            >
              <Img
                src={staticFile('assets/ops/pp-dev.png')}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6}}>
                <span style={{fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF'}}>
                  Rahmat
                </span>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 14,
                    fontWeight: 800,
                    backgroundColor: T.lime,
                    color: T.limeInk,
                  }}
                >
                  RHMT OFC
                </span>
              </div>
              <div style={{fontSize: 19, color: 'rgba(220,252,231,0.85)', lineHeight: 1.4}}>
                Pelajar yang ngulik Fullstack, DevOps Linux, dan Otomasi AI.
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 22}}>
            {['Fullstack Web', 'DevOps Linux', 'Otomasi AI'].map((stack, i) => (
              <Reveal key={stack} at={4.6 + i * 1.1}>
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 16,
                    backgroundColor: 'rgba(7,41,25,0.72)',
                    border: '1px solid rgba(163,230,53,0.32)',
                    textAlign: 'center',
                    fontFamily: EREKAP_FONT.mono,
                    fontSize: 15,
                    fontWeight: 700,
                    color: T.lime,
                  }}
                >
                  {stack}
                </div>
              </Reveal>
            ))}
          </div>
        </OpsTactileCard>
      </Reveal>

      {/* Portfolio CTA Card */}
      <Reveal at={10.2}>
        <OpsTactileCard dark style={{padding: 24}}>
          <Tap at={11.4} from={{x: 150, y: 110}} />
          <Shine at={11.55} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  backgroundColor: T.lime,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GlobeSvg color={T.limeInk} size={28} />
              </div>
              <div>
                <div style={{fontFamily: EREKAP_FONT.mono, fontSize: 24, fontWeight: 800, color: '#FFFFFF'}}>
                  rhmt.biz.id
                </div>
                <div style={{fontSize: 17, color: 'rgba(220,252,231,0.78)'}}>
                  Follow @rhmtofc · Bedah arsitektur berikutnya
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                borderRadius: 16,
                backgroundColor: ctaHot > 0.5 ? T.lime : 'rgba(163,230,53,0.16)',
                color: ctaHot > 0.5 ? T.limeInk : T.lime,
                fontFamily: EREKAP_FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                border: `1px solid ${T.lime}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <AgentCoreSvg color={ctaHot > 0.5 ? T.limeInk : T.lime} size={20} />
              VISIT
            </div>
          </div>
        </OpsTactileCard>
      </Reveal>
    </OpsPremiumShell>
  );
};
