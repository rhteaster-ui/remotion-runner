import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  GeminiSparkSvg,
  OPS_THEME,
  OpsBezierWire,
  OpsBottomTelemetryStrip,
  OpsCanvas,
  OpsHeader,
  OpsHook,
  OpsNodeBox,
  OpsPipelineRail,
} from '../components/OpsKit';
import {FONT} from '../lib/theme';
import {pop} from '../lib/anim';

/* Crisp inline SVG icons (zero emoji) */
const CodeSvg: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SearchSvg: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.2" y2="16.2" />
  </svg>
);

const ServerSvg: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="7" cy="7" r="1" fill={color} />
    <circle cx="7" cy="17" r="1" fill={color} />
  </svg>
);

const PromptSvg: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    <line x1="7" y1="10" x2="17" y2="10" />
    <line x1="7" y1="13" x2="13" y2="13" />
  </svg>
);

const GitBranchSvg: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M18 8.5c0 4-12 2-12 7" />
  </svg>
);

const GlobeSvg: React.FC<{color: string; size?: number}> = ({color, size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </svg>
);

const TerminalSvg: React.FC<{color: string; size?: number}> = ({color, size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const CheckSvg: React.FC<{color: string; size?: number}> = ({color, size = 24}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ============================================================================
   SCENE 1: HOOK (Dark Graphite) — Chat Biasa vs Agentic Ops Server
   ============================================================================ */
export const OpsHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.dark;

  const pLeft = pop(frame, 8, fps, 150);
  const pRight = pop(frame, 20, fps, 150);
  const stagePop = pop(frame, 30, fps, 130);
  const node1 = pop(frame, 42, fps, 150);
  const node2 = pop(frame, 58, fps, 150);
  const node3 = pop(frame, 74, fps, 150);
  const logStep = Math.floor(interpolate(frame, [60, 260], [0, 3.99], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  const logs = [
    '[INGRESS] telegram -> prompt verified (owner #8343466107)',
    '[TUNNEL]  vps1 (rdev) --ssh--> vps2 (rhmtdev) active',
    '[AGENT]   agy executing: edit code + check pm2 status',
    '[SSE]     task-map updated -> delivering output 200 OK',
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="dark" />
      <OpsHeader mode="dark" index={1} total={5} statusText="WORKFLOW READY" accent={t.amber} />

      <OpsHook
        mode="dark"
        kicker="01 // PARADIGM SHIFT"
        headlineTop="Bukan AI chat biasa,"
        highlight="Server Bekerja Otomatis"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={0} accent={t.amber} />

      {/* Main Stage (Y: 476..1560) */}
      <div
        style={{
          position: 'absolute',
          top: 476,
          left: 72,
          right: 72,
          height: 1084,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Top Contrast Cards */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
          <div
            style={{
              backgroundColor: t.surface,
              border: `1.5px solid ${t.border}`,
              borderRadius: 18,
              padding: '22px 22px',
              opacity: pLeft * 0.72,
              transform: `translateY(${(1 - pLeft) * 20}px)`,
            }}
          >
            <div style={{fontFamily: FONT.mono, fontSize: 13, fontWeight: 700, color: t.muted, letterSpacing: '0.08em'}}>
              MODE PASIF
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 700, color: t.ink2, marginTop: 8}}>
              Chat 1 Arah
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 18, color: t.muted, marginTop: 10, lineHeight: 1.4}}>
              Tanya, copy-paste manual, eksekusi sendiri.
            </div>
          </div>

          <div
            style={{
              backgroundColor: t.surfaceRaised,
              border: `2px solid ${t.amber}`,
              borderRadius: 18,
              padding: '22px 22px',
              boxShadow: t.shadowSm,
              opacity: pRight,
              transform: `translateY(${(1 - pRight) * 20}px) scale(${0.96 + 0.04 * pRight})`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontSize: 13, fontWeight: 800, color: t.amber, letterSpacing: '0.08em'}}>
                AGENTIC OPS
              </span>
              <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: t.emerald}} />
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 28, fontWeight: 800, color: t.ink, marginTop: 8}}>
              1 Prompt → Jalan
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 18, color: t.ink2, marginTop: 10, lineHeight: 1.4}}>
              Baca file, jalankan bash, pantau live di web.
            </div>
          </div>
        </div>

        {/* Live Trigger Pipeline Preview */}
        <div
          style={{
            flex: 1,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.border}`,
            borderRadius: 22,
            padding: 26,
            boxShadow: t.shadow,
            position: 'relative',
            overflow: 'hidden',
            opacity: stagePop,
            transform: `translateY(${(1 - stagePop) * 24}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
            <span style={{fontFamily: FONT.mono, fontSize: 15, fontWeight: 700, color: t.ink2}}>
              PIPELINE EKSEKUSI LANGSUNG
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                fontWeight: 700,
                color: t.emerald,
                padding: '4px 10px',
                borderRadius: 999,
                backgroundColor: t.emeraldSoft,
              }}
            >
              ACTIVE STREAM
            </span>
          </div>

          <div style={{position: 'relative', height: 590}}>
            <svg width="884" height="590" viewBox="0 0 884 590" style={{position: 'absolute', inset: 0}}>
              <OpsBezierWire p0={[290, 95]} p1={[385, 95]} p2={[385, 240]} p3={[470, 240]} color={t.amber} active speed={0.025} />
              <OpsBezierWire p0={[665, 294]} p1={[665, 368]} p2={[310, 355]} p3={[310, 425]} color={t.cyan} active speed={0.025} phaseOffset={0.35} />
              <OpsBezierWire p0={[520, 480]} p1={[570, 480]} p2={[570, 480]} p3={[620, 480]} color={t.emerald} active speed={0.028} phaseOffset={0.6} />
            </svg>

            <OpsNodeBox
              mode="dark"
              title="Bot Telegram"
              subtitle="Perintah Tuan Masuk"
              badge="ONLINE"
              badgeColor={t.emerald}
              accent={t.emerald}
              active
              iconImg="assets/ops/tg-official.svg"
              style={{position: 'absolute', left: 10, top: 38, width: 280, opacity: node1, transform: `scale(${0.92 + 0.08 * node1})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="Terminal SSH"
              subtitle="Dispatch VPS-1 → VPS-2"
              badge="1 TTY"
              badgeColor={t.amber}
              accent={t.amber}
              active
              iconImg="assets/ops/termux-official.svg"
              style={{position: 'absolute', left: 470, top: 185, width: 390, opacity: node2, transform: `scale(${0.92 + 0.08 * node2})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="AGY Agent"
              subtitle="Code · Bash · Search"
              badge="WORKING"
              badgeColor={t.amber}
              accent={t.amber}
              active
              iconImg="assets/ops/agy-official.png"
              style={{position: 'absolute', left: 20, top: 425, width: 500, opacity: node3, transform: `scale(${0.92 + 0.08 * node3})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="Output"
              subtitle="Balas + Web"
              badge="200 OK"
              badgeColor={t.emerald}
              accent={t.emerald}
              active
              iconSvg={<CheckSvg color={t.emerald} size={28} />}
              style={{position: 'absolute', left: 620, top: 425, width: 254, opacity: node3}}
            />
          </div>

          {/* Live Console Strip */}
          <div
            style={{
              marginTop: 10,
              backgroundColor: t.well,
              border: `1.5px solid ${t.border}`,
              borderRadius: 14,
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {logs.map((line, i) => {
              const shown = i <= logStep;
              const current = i === logStep;
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 15,
                    fontWeight: current ? 700 : 500,
                    color: !shown ? 'rgba(125,135,153,0.28)' : current ? t.amber : t.emerald,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {shown ? `› ${line}` : `  ${line}`}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="dark"
        command="$ tg-bot -> ssh vps2 agy --autonomous"
        status="Menghubungkan prompt ke mesin eksekusi..."
        accent={t.amber}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: BRIDGE (Warm Paper) — Telegram/WA -> Prompt -> Terminal -> VPS1<->VPS2
   ============================================================================ */
export const OpsBridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.light;

  const pIng = pop(frame, 4, fps, 150);
  const pProm = pop(frame, 18, fps, 150);
  const pTerm = pop(frame, 32, fps, 150);
  const pVps = pop(frame, 48, fps, 140);
  const waPulse = Math.sin(frame * 0.08) > 0;

  return (
    <AbsoluteFill>
      <OpsCanvas mode="light" />
      <OpsHeader mode="light" index={2} total={5} statusText="SSH BRIDGE OK" accent={t.cyan} />

      <OpsHook
        mode="light"
        kicker="02 // MULTI-VPS INGRESS"
        headlineTop="Dari chat HP, tembus"
        highlight="Dua Server Sekaligus"
        accent={t.cyan}
      />

      <OpsPipelineRail mode="light" activeIdx={1} accent={t.cyan} />

      <div
        style={{
          position: 'absolute',
          top: 476,
          left: 72,
          right: 72,
          height: 1084,
          backgroundColor: t.surface,
          border: `1.5px solid ${t.border}`,
          borderRadius: 24,
          boxShadow: t.shadow,
          padding: 26,
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'relative', width: '100%', height: 890}}>
          <svg width="884" height="890" viewBox="0 0 884 890" style={{position: 'absolute', inset: 0}}>
            {/* TG + WA -> Prompt */}
            <OpsBezierWire p0={[215, 130]} p1={[215, 210]} p2={[380, 185]} p3={[380, 240]} color={t.amber} active speed={0.025} />
            <OpsBezierWire p0={[665, 130]} p1={[665, 210]} p2={[500, 185]} p3={[500, 240]} color={t.emerald} active={waPulse} speed={0.02} phaseOffset={0.4} />
            {/* Prompt -> Terminal */}
            <OpsBezierWire p0={[442, 345]} p1={[442, 395]} p2={[442, 395]} p3={[442, 440]} color={t.amber} active speed={0.03} phaseOffset={0.2} />
            {/* Terminal -> VPS-1 & VPS-2 */}
            <OpsBezierWire p0={[340, 545]} p1={[215, 575]} p2={[215, 620]} p3={[215, 665]} color={t.cyan} active speed={0.026} phaseOffset={0.15} />
            <OpsBezierWire p0={[544, 545]} p1={[665, 575]} p2={[665, 620]} p3={[665, 665]} color={t.amber} active speed={0.026} phaseOffset={0.5} />
            {/* Bidirectional SSH Tunnel between VPS-1 <-> VPS-2 */}
            <OpsBezierWire
              p0={[395, 735]}
              p1={[430, 735]}
              p2={[454, 735]}
              p3={[488, 735]}
              color={t.emerald}
              active
              bidirectional
              speed={0.035}
              label="SSH LIVE"
              labelBg="#FFFFFF"
              labelColor="#059669"
            />
          </svg>

          {/* Row 1: Dual Ingress Bots */}
          <OpsNodeBox
            mode="light"
            title="Bot Telegram"
            subtitle="tg-bot · @agency"
            badge="ONLINE"
            badgeColor={t.emerald}
            accent={t.amber}
            active
            iconImg="assets/ops/tg-official.svg"
            style={{position: 'absolute', left: 20, top: 20, width: 390, opacity: pIng, transform: `translateY(${(1 - pIng) * 16}px)`}}
          />
          <OpsNodeBox
            mode="light"
            title="Bot WhatsApp"
            subtitle={waPulse ? 'wa-bot · ready' : 'wa-bot · standby'}
            badge={waPulse ? 'SYNC' : 'IDLE'}
            badgeColor={waPulse ? t.emerald : t.muted}
            accent={t.emerald}
            active={waPulse}
            iconImg="assets/ops/wa-official.svg"
            style={{position: 'absolute', right: 20, top: 20, width: 390, opacity: pIng, transform: `translateY(${(1 - pIng) * 16}px)`}}
          />

          {/* Row 2: Prompt */}
          <OpsNodeBox
            mode="light"
            title="Unified Prompt"
            subtitle="Instruksi Owner + Lampiran"
            badge="VIA TG"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconSvg={<PromptSvg color={t.amber} />}
            style={{position: 'absolute', left: 212, top: 240, width: 460, opacity: pProm, transform: `scale(${0.94 + 0.06 * pProm})`}}
          />

          {/* Row 3: Terminal (Termux official) */}
          <OpsNodeBox
            mode="light"
            title="Terminal Bridge"
            subtitle="Termux / Shell · Auto-Dispatch"
            badge="ACTIVE"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconImg="assets/ops/termux-official.svg"
            style={{position: 'absolute', left: 192, top: 440, width: 500, opacity: pTerm, transform: `scale(${0.94 + 0.06 * pTerm})`}}
          />

          {/* Row 4: VPS-1 <-> VPS-2 */}
          <OpsNodeBox
            mode="light"
            title="VPS-1 · Gateway"
            subtitle="rdev · 2 vCPU · Bot Host"
            badge="PORT 2000"
            badgeColor={t.cyan}
            accent={t.cyan}
            active
            iconSvg={<ServerSvg color={t.cyan} />}
            style={{position: 'absolute', left: 10, top: 665, width: 385, opacity: pVps, transform: `translateY(${(1 - pVps) * 18}px)`}}
          />
          <OpsNodeBox
            mode="light"
            title="VPS-2 · Worker"
            subtitle="rhmtdev · 4 vCPU · 8GB RAM"
            badge="AGY ENGINE"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconSvg={<ServerSvg color={t.amber} />}
            style={{position: 'absolute', right: 10, top: 665, width: 385, opacity: pVps, transform: `translateY(${(1 - pVps) * 18}px)`}}
          />
        </div>

        {/* Bottom Architectural Fact Pill inside Stage */}
        <div
          style={{
            marginTop: 18,
            padding: '18px 22px',
            borderRadius: 16,
            backgroundColor: t.well,
            border: `1.5px solid ${t.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: t.ink}}>
            DUAL-NODE SYNC · REAL-TIME TUNNEL
          </span>
          <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: t.emerald}}>
            ZERO DATA DRIFT
          </span>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="light"
        command="ssh -o BatchMode=yes vps2 'agy run'"
        status="VPS-1 Gateway tersinkron penuh ke VPS-2 Worker"
        accent={t.cyan}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: AGENT (Dark Graphite) — AGY Agent + Tools + Multi-Account Pool
   ============================================================================ */
export const OpsAgentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.dark;

  const pMain = pop(frame, 4, fps, 150);
  const activeToolIdx = Math.floor(interpolate(frame, [45, 270], [0, 3.99], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const subPop = pop(frame, 55, fps, 140);
  const haloRot = frame * 1.6;
  const acctIdx = Math.floor(frame / 55) % 2;

  const tools = [
    {title: 'Code / Files', sub: 'Edit & baca repo', icon: <CodeSvg color={t.emerald} />, color: t.emerald},
    {title: 'Web Search', sub: 'Riset & cek docs', icon: <SearchSvg color={t.cyan} />, color: t.cyan},
    {title: 'Bash / VPS-2', sub: 'Build, PM2 & test', icon: <TerminalSvg color={t.amber} />, color: t.amber},
    {title: 'Subagent', sub: 'Delegasi paralel', icon: <GitBranchSvg color={t.emerald} />, color: t.emerald},
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="dark" />
      <OpsHeader mode="dark" index={3} total={5} statusText="AGY WORKING" accent={t.amber} />

      <OpsHook
        mode="dark"
        kicker="03 // EKSEKUSI OTONOM"
        headlineTop="Di Worker, Agen AI"
        highlight="Kerjakan Tugas Nyata"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={2} accent={t.amber} />

      <div
        style={{
          position: 'absolute',
          top: 476,
          left: 72,
          right: 72,
          height: 1084,
          backgroundColor: t.surface,
          border: `1.5px solid ${t.border}`,
          borderRadius: 24,
          boxShadow: t.shadow,
          padding: 26,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Hero AGY Agent Wide Card */}
        <div
          style={{
            backgroundColor: t.surfaceRaised,
            border: `2px solid ${t.amber}`,
            borderRadius: 20,
            padding: '22px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            opacity: pMain,
            transform: `translateY(${(1 - pMain) * 16}px)`,
          }}
        >
          <div style={{position: 'relative', width: 84, height: 84, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="84" height="84" viewBox="0 0 84 84" style={{position: 'absolute', inset: 0, transform: `rotate(${haloRot}deg)`}}>
              <circle cx="42" cy="42" r="38" fill="none" stroke={t.amber} strokeWidth="2.5" strokeDasharray="12 10" strokeOpacity="0.8" />
            </svg>
            <div style={{width: 64, height: 64, borderRadius: 16, backgroundColor: t.well, border: `1.5px solid ${t.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Img src={staticFile('assets/ops/agy-official.png')} style={{width: 44, height: 44, objectFit: 'contain'}} />
            </div>
          </div>

          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 30, color: t.ink}}>
                AGY Orchestrator
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 13, color: t.amber, padding: '5px 12px', borderRadius: 999, backgroundColor: t.amberSoft, border: `1.5px solid ${t.amber}`}}>
                WORKING
              </span>
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 16, color: t.ink2, marginTop: 8}}>
              Tool aktif: <span style={{color: tools[activeToolIdx].color, fontWeight: 700}}>{tools[activeToolIdx].title}</span>
            </div>
          </div>
        </div>

        {/* Connector Fan SVG */}
        <svg width="884" height="74" viewBox="0 0 884 74">
          {[108, 330, 554, 776].map((tx, idx) => {
            const isAct = idx === activeToolIdx;
            const col = tools[idx].color;
            return (
              <OpsBezierWire
                key={idx}
                p0={[442, 4]}
                p1={[442, 40]}
                p2={[tx, 30]}
                p3={[tx, 70]}
                color={col}
                active={isAct || idx < activeToolIdx}
                speed={0.035}
                phaseOffset={idx * 0.22}
              />
            );
          })}
        </svg>

        {/* 4 Tool Nodes (2x2 clean grid) */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
          {tools.map((tool, idx) => {
            const isAct = idx === activeToolIdx;
            const isDone = idx < activeToolIdx;
            const stText = isAct ? 'LIVE' : isDone ? 'DONE' : 'READY';
            const stCol = isAct ? t.amber : isDone ? t.emerald : t.muted;
            const cardPop = pop(frame, 18 + idx * 9, fps, 150);
            return (
              <OpsNodeBox
                key={tool.title}
                mode="dark"
                title={tool.title}
                subtitle={tool.sub}
                badge={stText}
                badgeColor={stCol}
                accent={tool.color}
                active={isAct}
                iconSvg={tool.icon}
                style={{opacity: cardPop, transform: `translateY(${(1 - cardPop) * 16}px)`}}
              />
            );
          })}
        </div>

        {/* Live Execution Trace Strip + Downward Feed Wires */}
        <div
          style={{
            marginTop: 6,
            backgroundColor: t.well,
            border: `1.5px solid ${t.borderStrong}`,
            borderRadius: 16,
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.amber, letterSpacing: '0.08em'}}>
              LIVE AGENT EXECUTION TRACE
            </span>
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.emerald}}>
              STEP {activeToolIdx + 1} / 4
            </span>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10}}>
            {[
              {k: 'read_file / edit_file', v: 'Update kode & UI dashboard', ok: activeToolIdx >= 0},
              {k: 'search_web', v: 'Verifikasi referensi teknis', ok: activeToolIdx >= 1},
              {k: 'run_command (bash)', v: 'Test Playwright & PM2 check', ok: activeToolIdx >= 2},
              {k: 'invoke_subagent', v: 'Paralel worker tanpa blokir', ok: activeToolIdx >= 3},
            ].map((row, rIdx) => {
              const cur = rIdx === activeToolIdx;
              return (
                <div
                  key={row.k}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    backgroundColor: cur ? t.surfaceRaised : t.surface,
                    border: `1.5px solid ${cur ? t.amber : row.ok ? t.emerald : t.border}`,
                  }}
                >
                  <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 14, color: cur ? t.amber : row.ok ? t.emerald : t.muted}}>
                    {cur ? '▶ ' : row.ok ? '✓ ' : '· '}
                    {row.k}
                  </div>
                  <div style={{fontFamily: FONT.sans, fontSize: 15, color: t.ink2, marginTop: 4}}>
                    {row.v}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-nodes Connector SVG */}
        <svg width="884" height="44" viewBox="0 0 884 44">
          {[148, 442, 736].map((tx, idx) => (
            <OpsBezierWire
              key={idx}
              p0={[442, 4]}
              p1={[442, 22]}
              p2={[tx, 18]}
              p3={[tx, 40]}
              color={idx === 0 ? t.cyan : idx === 1 ? t.amber : t.emerald}
              active
              speed={0.03}
              phaseOffset={idx * 0.3}
            />
          ))}
        </svg>

        {/* Sub-nodes Row: Model, Account Pool (AI Pro / Free), Context */}
        <div
          style={{
            borderTop: `1.5px dashed ${t.borderStrong}`,
            paddingTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr 0.95fr',
            gap: 14,
            opacity: subPop,
            transform: `translateY(${(1 - subPop) * 16}px)`,
          }}
        >
          <div style={{backgroundColor: t.well, border: `1.5px solid ${t.cyan}`, borderRadius: 16, padding: '16px 18px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <GeminiSparkSvg size={18} color={t.cyan} rotate={frame * 1.5} />
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.cyan}}>MODEL</span>
            </div>
            <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 20, color: t.ink, marginTop: 8}}>
              Gemini 3.8 / 4
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 14, color: t.muted, marginTop: 4}}>
              Hydrogen & Flash
            </div>
          </div>

          <div style={{backgroundColor: t.well, border: `1.5px solid ${t.amber}`, borderRadius: 16, padding: '16px 18px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.amber}}>MULTI-AKUN</span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 999,
                  backgroundColor: acctIdx === 0 ? t.cyanSoft : t.surfaceRaised,
                  color: acctIdx === 0 ? t.cyan : t.ink2,
                }}
              >
                {acctIdx === 0 ? 'AI PRO' : 'FREE'}
              </span>
            </div>
            <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 20, color: t.ink, marginTop: 8}}>
              {acctIdx === 0 ? 'rai · akun2 · rhmt' : 'anuadlh · 100%'}
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 14, color: t.muted, marginTop: 4}}>
              Auto-rotasi kuota
            </div>
          </div>

          <div style={{backgroundColor: t.well, border: `1.5px solid ${t.emerald}`, borderRadius: 16, padding: '16px 18px'}}>
            <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.emerald}}>KONTEKS</div>
            <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 20, color: t.ink, marginTop: 8}}>
              {Math.min(12, 3 + Math.floor(frame / 28))} Step Live
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 14, color: t.muted, marginTop: 4}}>
              Stream JSONL
            </div>
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="dark"
        command={`tool -> ${tools[activeToolIdx].title.toLowerCase()} (auto-verify)`}
        status="Pool: 4 akun AI Pro + 1 Free tersinkron"
        accent={t.amber}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 4: WEB DASHBOARD (Warm Paper) — Ops Deck + Task Map Live UI
   ============================================================================ */
export const OpsWebDashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.light;

  const p1 = pop(frame, 4, fps, 145);
  const p2 = pop(frame, 20, fps, 145);
  const chartProg = interpolate(frame, [10, 95], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const barProg = spring({frame: frame - 18, fps, config: {damping: 16, stiffness: 90}});

  const quotas = [
    {alias: 'rai', plan: 'AI Pro', pct: 86, status: 'gemini siap', col: t.amber},
    {alias: 'akun2', plan: 'AI Pro', pct: 93, status: 'siap', col: t.emerald},
    {alias: 'anuadlh', plan: 'Free', pct: 100, status: 'siap', col: t.emerald},
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="light" />
      <OpsHeader mode="light" index={4} total={5} statusText="DASHBOARD LIVE" accent={t.emerald} />

      <OpsHook
        mode="light"
        kicker="04 // OBSERVABILITAS WEB"
        headlineTop="Pantau semuanya di"
        highlight="Ops Deck & Task Map"
        accent={t.emerald}
      />

      <OpsPipelineRail mode="light" activeIdx={3} accent={t.emerald} />

      <div
        style={{
          position: 'absolute',
          top: 476,
          left: 72,
          right: 72,
          height: 1084,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Top Mock Panel: Ops Deck Telemetry + Quota Matrix */}
        <div
          style={{
            backgroundColor: t.surface,
            border: `1.5px solid ${t.border}`,
            borderRadius: 22,
            padding: 24,
            boxShadow: t.shadow,
            opacity: p1,
            transform: `translateY(${(1 - p1) * 18}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <GlobeSvg color={t.ink} />
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 24, color: t.ink}}>
                Ops Deck · Cluster Control
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.emerald, backgroundColor: t.emeraldSoft, padding: '5px 12px', borderRadius: 999}}>
              KLUSTER SEHAT
            </span>
          </div>

          {/* Animated SVG CPU / RAM Chart */}
          <div style={{backgroundColor: t.well, border: `1.5px solid ${t.border}`, borderRadius: 16, padding: '14px 16px', marginBottom: 18}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 14, color: t.ink2, marginBottom: 8}}>
              <span>Telemetri VPS-2 (CPU + RAM)</span>
              <span style={{fontWeight: 700, color: t.amber}}>CPU {Math.round(8 + 9 * chartProg)}% · RAM 13%</span>
            </div>
            <svg width="852" height="120" viewBox="0 0 852 120">
              {[25, 60, 95].map((y) => (
                <line key={y} x1="0" y1={y} x2="852" y2={y} stroke={t.border} strokeWidth="1" />
              ))}
              {/* RAM Line */}
              <path
                d="M 0 88 L 140 86 L 280 87 L 420 84 L 560 85 L 700 82 L 852 80"
                fill="none"
                stroke={t.cyan}
                strokeWidth="3.5"
                strokeDasharray="920"
                strokeDashoffset={920 * (1 - chartProg)}
                strokeLinecap="round"
              />
              {/* CPU Line */}
              <path
                d="M 0 100 L 120 96 L 240 102 L 360 72 L 480 82 L 600 58 L 720 74 L 852 64"
                fill="none"
                stroke={t.amber}
                strokeWidth="4"
                strokeDasharray="960"
                strokeDashoffset={960 * (1 - chartProg)}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Quota Rows */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {quotas.map((q) => (
              <div
                key={q.alias}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '190px 1fr 135px',
                  alignItems: 'center',
                  gap: 14,
                  padding: '10px 14px',
                  backgroundColor: t.well,
                  borderRadius: 12,
                  border: `1px solid ${t.border}`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: t.ink}}>{q.alias}</span>
                  <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 12, padding: '2px 8px', borderRadius: 999, backgroundColor: q.plan === 'AI Pro' ? t.cyanSoft : '#FFFFFF', color: q.plan === 'AI Pro' ? t.cyan : t.muted, border: `1px solid ${t.border}`}}>
                    {q.plan}
                  </span>
                </div>
                <div style={{height: 10, borderRadius: 999, backgroundColor: '#DED9CC', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${q.pct * barProg}%`, backgroundColor: q.col, borderRadius: 999}} />
                </div>
                <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: q.col, textAlign: 'right'}}>
                  {q.pct}% · {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Mock Panel: Task Map n8n Real-Time Stream */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0E1117',
            border: `2px solid #262C39`,
            borderRadius: 22,
            padding: 24,
            boxShadow: t.shadowSm,
            opacity: p2,
            transform: `translateY(${(1 - p2) * 18}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 24, color: '#F4F6FA'}}>
              Task Map · Workflow Aliran Agen
            </span>
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: '#10B981', backgroundColor: 'rgba(16,185,129,0.16)', padding: '5px 12px', borderRadius: 999}}>
              ● SSE STREAM
            </span>
          </div>

          <div style={{position: 'relative', height: 220}}>
            <svg width="888" height="220" viewBox="0 0 888 220" style={{position: 'absolute', inset: 0}}>
              <OpsBezierWire p0={[150, 110]} p1={[185, 110]} p2={[195, 110]} p3={[230, 110]} color="#F59E0B" active speed={0.032} />
              <OpsBezierWire p0={[375, 110]} p1={[410, 110]} p2={[420, 110]} p3={[455, 110]} color="#38BDF8" active speed={0.032} phaseOffset={0.33} />
              <OpsBezierWire p0={[650, 110]} p1={[685, 110]} p2={[695, 110]} p3={[730, 110]} color="#10B981" active speed={0.032} phaseOffset={0.66} />
            </svg>

            {[
              {x: 10, w: 145, img: 'assets/ops/tg-official.svg', label: 'Bot TG', col: '#10B981'},
              {x: 230, w: 145, img: 'assets/ops/termux-official.svg', label: 'Termux', col: '#F59E0B'},
              {x: 455, w: 195, img: 'assets/ops/agy-official.png', label: 'AGY Agent', col: '#38BDF8'},
              {x: 730, w: 148, img: '', label: 'Output', col: '#10B981'},
            ].map((n) => (
              <div
                key={n.label}
                style={{
                  position: 'absolute',
                  left: n.x,
                  top: 52,
                  width: n.w,
                  height: 116,
                  borderRadius: 16,
                  backgroundColor: '#161A23',
                  border: `2px solid ${n.col}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                {n.img ? (
                  <Img src={staticFile(n.img)} style={{width: 40, height: 40, objectFit: 'contain', borderRadius: 8}} />
                ) : (
                  <CheckSvg color="#10B981" size={38} />
                )}
                <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: '#F4F6FA'}}>{n.label}</span>
              </div>
            ))}
          </div>

          <div style={{fontFamily: FONT.mono, fontSize: 15, color: '#B5BECA', display: 'flex', justifyContent: 'space-between'}}>
            <span>Panah menyala otomatis sesuai node yang aktif</span>
            <span style={{color: '#F59E0B', fontWeight: 700}}>168.144.101.145</span>
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="light"
        command="GET /api/task-map/stream -> 200 OK"
        status="Monitoring CPU, RAM, Kuota AI Pro/Free & SSE Workflow"
        accent={t.emerald}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: BRANDING (Dark Graphite) — Rohmatulloh / rhmt ofc / rhmt.biz.id
   ============================================================================ */
export const OpsBrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.dark;

  const pHero = pop(frame, 4, fps, 145);
  const pStack = pop(frame, 20, fps, 145);
  const pLinks = pop(frame, 36, fps, 140);
  const ctaPulse = 1 + 0.03 * Math.sin(frame * 0.16);
  const sparkRot = frame * 1.3;

  const pillars = [
    {k: 'FULLSTACK', v: 'Web & UI Anti-Slop', col: t.amber, icon: <CodeSvg color={t.amber} />},
    {k: 'DEVOPS LINUX', v: 'Dual-VPS & PM2', col: t.cyan, icon: <ServerSvg color={t.cyan} />},
    {k: 'AGENTIC AI', v: 'Bot & Remotion Auto', col: t.emerald, icon: <GeminiSparkSvg size={24} color={t.emerald} rotate={sparkRot} />},
  ];

  const channels = [
    {label: 'PORTOFOLIO', value: 'rhmt.biz.id', accent: t.amber},
    {label: 'GITHUB', value: 'github.com/rhmt-ofc', accent: t.cyan},
    {label: 'TIKTOK', value: '@rhmtofc', accent: t.emerald},
    {label: 'KOMUNITAS', value: 'RHMT OFC', accent: t.amber},
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="dark" />
      <OpsHeader mode="dark" index={5} total={5} statusText="RHMT OFC" accent={t.amber} />

      <OpsHook
        mode="dark"
        kicker="05 // SYSTEM ARCHITECT"
        headlineTop="Diracik mandiri oleh"
        highlight="Rohmatulloh · rhmt ofc"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={4} accent={t.amber} />

      <div
        style={{
          position: 'absolute',
          top: 476,
          left: 72,
          right: 72,
          height: 1084,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Identity Dossier Card */}
        <div
          style={{
            backgroundColor: t.surface,
            border: `2px solid ${t.amber}`,
            borderRadius: 24,
            padding: 28,
            boxShadow: t.shadow,
            opacity: pHero,
            transform: `translateY(${(1 - pHero) * 20}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
            <div
              style={{
                width: 108,
                height: 108,
                borderRadius: 24,
                backgroundColor: t.amber,
                color: '#090B0E',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 0 rgba(0,0,0,0.45)',
              }}
            >
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 38, lineHeight: 1}}>
                RH
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, marginTop: 4, letterSpacing: '0.08em'}}>
                OFC
              </span>
            </div>

            <div style={{flex: 1}}>
              <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 14, color: t.amber, letterSpacing: '0.1em'}}>
                PELAJAR MA · INDEPENDENT BUILDER
              </div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 38, color: t.ink, marginTop: 6, lineHeight: 1.1}}>
                R_HMT OFC
              </div>
              <div style={{fontFamily: FONT.sans, fontSize: 20, color: t.ink2, marginTop: 10, lineHeight: 1.35}}>
                Eksplorasi mandiri web engineering, infrastruktur server Linux, dan sistem AI agentic.
              </div>
            </div>
          </div>

          {/* 3 Capability Pillars */}
          <div
            style={{
              marginTop: 26,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
              opacity: pStack,
              transform: `translateY(${(1 - pStack) * 14}px)`,
            }}
          >
            {pillars.map((pil) => (
              <div
                key={pil.k}
                style={{
                  backgroundColor: t.well,
                  border: `1.5px solid ${t.border}`,
                  borderRadius: 16,
                  padding: '16px 16px',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                  {pil.icon}
                  <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: pil.col}} />
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 13, color: pil.col, letterSpacing: '0.06em'}}>
                  {pil.k}
                </div>
                <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 19, color: t.ink, marginTop: 6}}>
                  {pil.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Channels + CTA Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: t.surface,
            border: `1.5px solid ${t.border}`,
            borderRadius: 24,
            padding: 28,
            boxShadow: t.shadowSm,
            opacity: pLinks,
            transform: `translateY(${(1 - pLinks) * 20}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: t.muted, letterSpacing: '0.08em', marginBottom: 16}}>
              EKOSISTEM & KANAL RESMI
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              {channels.map((ch) => (
                <div
                  key={ch.label}
                  style={{
                    backgroundColor: t.surfaceRaised,
                    border: `1.5px solid ${t.borderStrong}`,
                    borderRadius: 16,
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: ch.accent, letterSpacing: '0.08em'}}>
                    {ch.label}
                  </span>
                  <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 25, color: t.ink}}>
                    {ch.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Architectural Philosophy Strip (balances middle space cleanly) */}
            <div
              style={{
                marginTop: 18,
                padding: '18px 20px',
                borderRadius: 16,
                backgroundColor: t.well,
                border: `1.5px dashed ${t.borderStrong}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 14,
              }}
            >
              <div>
                <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 13, color: t.emerald, letterSpacing: '0.08em'}}>
                  DESIGN & OPS PRINCIPLE
                </div>
                <div style={{fontFamily: FONT.sans, fontWeight: 600, fontSize: 19, color: t.ink, marginTop: 4}}>
                  Dari chat di HP, orkestrasi 2 VPS real-time tanpa template pasaran.
                </div>
              </div>
              <GeminiSparkSvg size={32} color={t.amber} rotate={sparkRot} />
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: '22px 26px',
              borderRadius: 18,
              backgroundColor: t.amber,
              color: '#090B0E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `scale(${ctaPulse})`,
            }}
          >
            <div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 30, lineHeight: 1.1}}>
                Follow @rhmtofc
              </div>
              <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, marginTop: 4}}>
                Kunjungi rhmt.biz.id · Bedah Arsitektur Berikutnya
              </div>
            </div>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                backgroundColor: '#090B0E',
                color: t.amber,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 28,
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="dark"
        command="open https://rhmt.biz.id · github.com/rhmt-ofc"
        status="RHMT OFC · Build in Public, Zero AI Slop"
        accent={t.amber}
      />
    </AbsoluteFill>
  );
};
