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
const CodeSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SearchSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.2" y2="16.2" />
  </svg>
);

const ServerSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="7" cy="7" r="1.1" fill={color} />
    <circle cx="7" cy="17" r="1.1" fill={color} />
  </svg>
);

const PromptSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
    <line x1="7" y1="10" x2="17" y2="10" />
    <line x1="7" y1="13" x2="13" y2="13" />
  </svg>
);

const GitBranchSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M18 8.5c0 4-12 2-12 7" />
  </svg>
);

const GlobeSvg: React.FC<{color: string; size?: number}> = ({color, size = 30}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </svg>
);

const TerminalSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const CheckSvg: React.FC<{color: string; size?: number}> = ({color, size = 34}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  const stagePop = pop(frame, 28, fps, 130);
  const node1 = pop(frame, 36, fps, 150);
  const node2 = pop(frame, 52, fps, 150);
  const node3 = pop(frame, 68, fps, 150);
  const stepIdx = Math.floor(interpolate(frame, [45, 250], [0, 3.99], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  const liveSteps = [
    '01 · Prompt masuk dari Bot Telegram',
    '02 · Tunnel SSH VPS-1 → VPS-2 aktif',
    '03 · AGY Agent eksekusi bash & kode',
    '04 · Task Map live update 200 OK',
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="dark" />
      <OpsHeader mode="dark" index={1} total={5} statusText="READY" accent={t.amber} />

      <OpsHook
        mode="dark"
        kicker="01 // PARADIGM SHIFT"
        headlineTop="Bukan AI chat biasa,"
        highlight="Server Kerja Otomatis"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={0} accent={t.amber} />

      {/* Main Stage (Y: 472..1566) */}
      <div
        style={{
          position: 'absolute',
          top: 472,
          left: 68,
          right: 68,
          height: 1094,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Top Contrast Cards (Big Bold Mobile Fonts) */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
          <div
            style={{
              backgroundColor: t.surface,
              border: `2px solid ${t.border}`,
              borderRadius: 22,
              padding: '24px 26px',
              opacity: pLeft * 0.78,
              transform: `translateY(${(1 - pLeft) * 20}px)`,
            }}
          >
            <div style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: t.muted, letterSpacing: '0.07em'}}>
              MODE PASIF
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 34, fontWeight: 800, color: t.ink2, marginTop: 8}}>
              Chat 1 Arah
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 22, color: t.muted, marginTop: 10, lineHeight: 1.35}}>
              Cuma tanya jawab, lalu eksekusi manual.
            </div>
          </div>

          <div
            style={{
              backgroundColor: t.surfaceRaised,
              border: `2.5px solid ${t.amber}`,
              borderRadius: 22,
              padding: '24px 26px',
              boxShadow: t.shadowSm,
              opacity: pRight,
              transform: `translateY(${(1 - pRight) * 20}px) scale(${0.96 + 0.04 * pRight})`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 800, color: t.amber, letterSpacing: '0.07em'}}>
                AGENTIC OPS
              </span>
              <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: t.emerald}} />
            </div>
            <div style={{fontFamily: FONT.space, fontSize: 34, fontWeight: 800, color: t.ink, marginTop: 8}}>
              1 Prompt → Jalan
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 22, color: t.ink2, marginTop: 10, lineHeight: 1.35}}>
              Edit kode, bash, dan pantau web live.
            </div>
          </div>
        </div>

        {/* Live Trigger Pipeline Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: t.surface,
            border: `2px solid ${t.borderStrong}`,
            borderRadius: 24,
            padding: 26,
            boxShadow: t.shadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: stagePop,
            transform: `translateY(${(1 - stagePop) * 22}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 19, fontWeight: 800, color: t.ink2, letterSpacing: '0.04em'}}>
              ALUR EKSEKUSI LANGSUNG
            </span>
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                color: t.emerald,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: t.emeraldSoft,
              }}
            >
              ● STREAMING
            </span>
          </div>

          <div style={{position: 'relative', width: 892, height: 615}}>
            <svg width="892" height="615" viewBox="0 0 892 615" style={{position: 'absolute', inset: 0}}>
              <OpsBezierWire p0={[215, 168]} p1={[215, 290]} p2={[350, 290]} p3={[452, 290]} color={t.amber} active speed={0.025} />
              <OpsBezierWire p0={[668, 355]} p1={[668, 415]} p2={[245, 375]} p3={[245, 445]} color={t.cyan} active speed={0.025} phaseOffset={0.35} />
              <OpsBezierWire p0={[486, 512]} p1={[525, 512]} p2={[540, 512]} p3={[572, 512]} color={t.emerald} active speed={0.03} phaseOffset={0.6} />
            </svg>

            <OpsNodeBox
              mode="dark"
              title="Bot Telegram"
              subtitle="Perintah Masuk"
              badge="ONLINE"
              badgeColor={t.emerald}
              accent={t.emerald}
              active
              iconImg="assets/ops/tg-official.svg"
              style={{position: 'absolute', left: 8, top: 42, width: 414, opacity: node1, transform: `scale(${0.93 + 0.07 * node1})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="Terminal SSH"
              subtitle="VPS-1 → VPS-2"
              badge="1 TTY"
              badgeColor={t.amber}
              accent={t.amber}
              active
              iconImg="assets/ops/termux-official.svg"
              style={{position: 'absolute', left: 452, top: 226, width: 432, opacity: node2, transform: `scale(${0.93 + 0.07 * node2})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="AGY Agent"
              subtitle="Code · Bash · Web"
              badge="WORKING"
              badgeColor={t.amber}
              accent={t.amber}
              active
              iconImg="assets/ops/agy-official.png"
              style={{position: 'absolute', left: 8, top: 445, width: 478, opacity: node3, transform: `scale(${0.93 + 0.07 * node3})`}}
            />

            <OpsNodeBox
              mode="dark"
              title="Output"
              subtitle="Balas + Web"
              badge="200 OK"
              badgeColor={t.emerald}
              accent={t.emerald}
              active
              iconSvg={<CheckSvg color={t.emerald} size={36} />}
              style={{position: 'absolute', left: 572, top: 445, width: 312, opacity: node3}}
            />
          </div>

          {/* Crisp Single-Row Live Action Pill (No Tiny Wall of Logs) */}
          <div
            style={{
              backgroundColor: t.well,
              border: `2px solid ${t.amber}`,
              borderRadius: 16,
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <span style={{fontFamily: FONT.mono, fontSize: 22, fontWeight: 700, color: t.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
              › {liveSteps[stepIdx]}
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 800, color: t.amber, flexShrink: 0}}>
              LIVE
            </span>
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="dark"
        command="$ tg-bot -> ssh vps2 agy --autonomous"
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
      <OpsHeader mode="light" index={2} total={5} statusText="SSH LIVE" accent={t.cyan} />

      <OpsHook
        mode="light"
        kicker="02 // DUAL-VPS BRIDGE"
        headlineTop="Dari chat HP, tembus"
        highlight="Dua Server Sekaligus"
        accent={t.cyan}
      />

      <OpsPipelineRail mode="light" activeIdx={1} accent={t.cyan} />

      <div
        style={{
          position: 'absolute',
          top: 472,
          left: 68,
          right: 68,
          height: 1094,
          backgroundColor: t.surface,
          border: `2px solid ${t.borderStrong}`,
          borderRadius: 26,
          boxShadow: t.shadow,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{position: 'relative', width: 896, height: 928}}>
          <svg width="896" height="928" viewBox="0 0 896 928" style={{position: 'absolute', inset: 0}}>
            {/* TG + WA -> Prompt */}
            <OpsBezierWire p0={[218, 154]} p1={[218, 224]} p2={[380, 198]} p3={[380, 260]} color={t.amber} active speed={0.025} />
            <OpsBezierWire p0={[678, 154]} p1={[678, 224]} p2={[516, 198]} p3={[516, 260]} color={t.emerald} active={waPulse} speed={0.02} phaseOffset={0.4} />
            {/* Prompt -> Terminal */}
            <OpsBezierWire p0={[448, 386]} p1={[448, 434]} p2={[448, 434]} p3={[448, 480]} color={t.amber} active speed={0.03} phaseOffset={0.2} />
            {/* Terminal -> VPS-1 & VPS-2 */}
            <OpsBezierWire p0={[340, 606]} p1={[194, 636]} p2={[194, 676]} p3={[194, 728]} color={t.cyan} active speed={0.026} phaseOffset={0.15} />
            <OpsBezierWire p0={[556, 606]} p1={[702, 636]} p2={[702, 676]} p3={[702, 728]} color={t.amber} active speed={0.026} phaseOffset={0.5} />
            {/* Bidirectional SSH Tunnel between VPS-1 <-> VPS-2 */}
            <OpsBezierWire
              p0={[382, 794]}
              p1={[420, 794]}
              p2={[476, 794]}
              p3={[514, 794]}
              color={t.emerald}
              active
              bidirectional
              speed={0.035}
              label="SSH"
              labelBg="#FFFFFF"
              labelColor="#059669"
            />
          </svg>

          <OpsNodeBox
            mode="light"
            title="Bot Telegram"
            subtitle="tg-bot · rdev"
            badge="ONLINE"
            badgeColor={t.emerald}
            accent={t.amber}
            active
            iconImg="assets/ops/tg-official.svg"
            style={{position: 'absolute', left: 8, top: 28, width: 420, opacity: pIng, transform: `translateY(${(1 - pIng) * 16}px)`}}
          />
          <OpsNodeBox
            mode="light"
            title="Bot WhatsApp"
            subtitle={waPulse ? 'wa-bot · sync' : 'wa-bot · standby'}
            badge={waPulse ? 'SYNC' : 'IDLE'}
            badgeColor={waPulse ? t.emerald : t.muted}
            accent={t.emerald}
            active={waPulse}
            iconImg="assets/ops/wa-official.svg"
            style={{position: 'absolute', right: 8, top: 28, width: 420, opacity: pIng, transform: `translateY(${(1 - pIng) * 16}px)`}}
          />

          <OpsNodeBox
            mode="light"
            title="Unified Prompt"
            subtitle="Instruksi Owner + Media"
            badge="VIA TG"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconSvg={<PromptSvg color={t.amber} />}
            style={{position: 'absolute', left: 178, top: 260, width: 540, opacity: pProm, transform: `scale(${0.94 + 0.06 * pProm})`}}
          />

          <OpsNodeBox
            mode="light"
            title="Terminal Bridge"
            subtitle="Termux / Auto-Dispatch"
            badge="ACTIVE"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconImg="assets/ops/termux-official.svg"
            style={{position: 'absolute', left: 158, top: 480, width: 580, opacity: pTerm, transform: `scale(${0.94 + 0.06 * pTerm})`}}
          />

          <OpsNodeBox
            mode="light"
            title="VPS-1 Gateway"
            subtitle="rdev · 2 vCPU"
            badge="GATEWAY"
            badgeColor={t.cyan}
            accent={t.cyan}
            active
            iconSvg={<ServerSvg color={t.cyan} />}
            style={{position: 'absolute', left: 8, top: 728, width: 374, opacity: pVps, transform: `translateY(${(1 - pVps) * 18}px)`}}
          />
          <OpsNodeBox
            mode="light"
            title="VPS-2 Worker"
            subtitle="rhmtdev · 4 vCPU"
            badge="WORKER"
            badgeColor={t.amber}
            accent={t.amber}
            active
            iconSvg={<ServerSvg color={t.amber} />}
            style={{position: 'absolute', right: 8, top: 728, width: 374, opacity: pVps, transform: `translateY(${(1 - pVps) * 18}px)`}}
          />
        </div>

        <div
          style={{
            padding: '18px 24px',
            borderRadius: 16,
            backgroundColor: t.well,
            border: `1.5px solid ${t.borderStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: t.ink}}>
            DUAL-VPS TUNNEL TERHUBUNG
          </span>
          <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, color: t.emerald}}>
            SSH 2-ARAH
          </span>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="light"
        command="ssh vps1 <-> vps2 'dual-cluster sync'"
        accent={t.cyan}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: AGENT (Dark Graphite) — AGY Agent + 4 Tools + Sub-nodes (Clean & Big)
   ============================================================================ */
export const OpsAgentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.dark;

  const pMain = pop(frame, 4, fps, 150);
  const haloRot = frame * 1.6;
  const acctIdx = Math.floor(frame / 46) % 2;

  // Exact voiceover sync for s3-agent:
  // frame 0 - 150 (0.00s - 5.04s): "Di dalam worker, agen AI langsung mengeksekusi tugas nyata..." (Ready / Plan)
  // frame 151 - 189 (5.04s - 6.32s): "mengedit kode," -> Tool 0 (Code / Files)
  // frame 190 - 222 (6.32s - 7.42s): "riset web," -> Tool 1 (Web Search)
  // frame 223 - 282 (7.42s - 9.42s): "menjalankan perintah bash," -> Tool 2 (Bash / VPS-2)
  // frame >= 283 (9.42s - 13.98s): "sampai memanggil sub-agen paralel dengan rotasi akun AI Pro dan Free." -> Tool 3 (Subagent)
  let activeToolIdx = 0;
  let isExecuting = false;

  if (frame < 151) {
    activeToolIdx = 0;
    isExecuting = false;
  } else if (frame < 190) {
    activeToolIdx = 0;
    isExecuting = true;
  } else if (frame < 223) {
    activeToolIdx = 1;
    isExecuting = true;
  } else if (frame < 283) {
    activeToolIdx = 2;
    isExecuting = true;
  } else {
    activeToolIdx = 3;
    isExecuting = true;
  }

  const tools = [
    {
      title: 'Code / Files',
      sub: 'Edit & baca repo',
      icon: <CodeSvg color={t.emerald} />,
      color: t.emerald,
      codeSnippet: 'edit_file(OpsFlowScenes.tsx)',
    },
    {
      title: 'Web Search',
      sub: 'Riset & verifikasi',
      icon: <SearchSvg color={t.cyan} />,
      color: t.cyan,
      codeSnippet: 'search_web("remotion api")',
    },
    {
      title: 'Bash / VPS-2',
      sub: 'Build, PM2 & test',
      icon: <TerminalSvg color={t.amber} />,
      color: t.amber,
      codeSnippet: 'vps-2:~$ bash build.sh (OK)',
    },
    {
      title: 'Subagent',
      sub: 'Tugas paralel',
      icon: <GitBranchSvg color={t.emerald} />,
      color: t.emerald,
      codeSnippet: 'spawn worker [AI Pro / Free]',
    },
  ];

  const isLeftActive = isExecuting && (activeToolIdx === 0 || activeToolIdx === 2);
  const isRightActive = isExecuting && (activeToolIdx === 1 || activeToolIdx === 3);

  return (
    <AbsoluteFill>
      <OpsCanvas mode="dark" />
      <OpsHeader mode="dark" index={3} total={5} statusText={isExecuting ? 'EXECUTING' : 'PLANNING'} accent={t.amber} />

      <OpsHook
        mode="dark"
        kicker="03 // EKSEKUSI OTONOM"
        headlineTop="Di Worker, Agen AI"
        highlight="Kerjakan Tugas Nyata"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={2} accent={t.amber} />

      {/* Main Tactical Card — Spacious, Uncluttered, Anti-Slop */}
      <div
        style={{
          position: 'absolute',
          top: 472,
          left: 68,
          right: 68,
          height: 870,
          backgroundColor: t.surface,
          border: `2px solid ${t.borderStrong}`,
          borderRadius: 28,
          boxShadow: t.shadow,
          padding: '28px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Hero AGY Orchestrator Card */}
        <div
          style={{
            backgroundColor: t.surfaceRaised,
            border: `2.5px solid ${t.amber}`,
            borderRadius: 22,
            padding: '22px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            opacity: pMain,
            transform: `translateY(${(1 - pMain) * 16}px)`,
          }}
        >
          <div style={{position: 'relative', width: 92, height: 92, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="92" height="92" viewBox="0 0 92 92" style={{position: 'absolute', inset: 0, transform: `rotate(${haloRot}deg)`}}>
              <circle cx="46" cy="46" r="42" fill="none" stroke={t.amber} strokeWidth="3" strokeDasharray="14 10" strokeOpacity="0.85" />
            </svg>
            <div style={{width: 72, height: 72, borderRadius: 18, backgroundColor: t.well, border: `2px solid ${t.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Img src={staticFile('assets/ops/agy-official.png')} style={{width: 50, height: 50, objectFit: 'contain'}} />
            </div>
          </div>

          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 34, color: t.ink}}>
                AGY Orchestrator
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: t.amber, padding: '5px 14px', borderRadius: 999, backgroundColor: t.amberSoft, border: `1.5px solid ${t.amber}`}}>
                {isExecuting ? 'WORKING' : 'STANDBY'}
              </span>
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 21, color: t.ink2, marginTop: 6}}>
              {isExecuting ? (
                <>Sedang jalan: <span style={{color: tools[activeToolIdx].color, fontWeight: 800}}>{tools[activeToolIdx].title}</span></>
              ) : (
                <>Alur: <span style={{color: t.amber, fontWeight: 700}}>Menyiapkan alur eksekusi</span></>
              )}
            </div>
            {/* Integrated Model & Account Pool Metadata Badges (No messy extra cards) */}
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 12}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 15,
                  color: t.cyan,
                  padding: '4px 12px',
                  borderRadius: 8,
                  backgroundColor: t.cyanSoft,
                  border: `1.5px solid ${t.cyan}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <GeminiSparkSvg size={15} color={t.cyan} />
                Gemini 3.8 / 4
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 15,
                  color: acctIdx === 0 ? t.amber : t.emerald,
                  padding: '4px 12px',
                  borderRadius: 8,
                  backgroundColor: acctIdx === 0 ? t.amberSoft : t.emeraldSoft,
                  border: `1.5px solid ${acctIdx === 0 ? t.amber : t.emerald}`,
                }}
              >
                {acctIdx === 0 ? '4 Akun AI Pro' : '1 Akun Free'}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 700,
                  fontSize: 15,
                  color: t.ink2,
                  padding: '4px 12px',
                  borderRadius: 8,
                  backgroundColor: t.well,
                  border: `1.5px solid ${t.borderStrong}`,
                }}
              >
                VPS-2 Worker
              </span>
            </div>
          </div>
        </div>

        {/* Precision Orthogonal Bus / Circuit Conduit */}
        <div style={{position: 'relative', width: '100%', height: 56}}>
          <svg width="892" height="56" viewBox="0 0 892 56" style={{position: 'absolute', inset: 0}}>
            {/* Bus Traces */}
            <path
              d="M 446 0 L 446 28 L 218 28 L 218 56"
              fill="none"
              stroke={isLeftActive ? (activeToolIdx === 2 ? t.amber : t.emerald) : t.border}
              strokeWidth={isLeftActive ? 3 : 2}
              strokeDasharray={isLeftActive ? 'none' : '4 4'}
              opacity={isLeftActive ? 1 : 0.55}
            />
            <path
              d="M 446 0 L 446 28 L 674 28 L 674 56"
              fill="none"
              stroke={isRightActive ? (activeToolIdx === 3 ? t.emerald : t.cyan) : t.border}
              strokeWidth={isRightActive ? 3 : 2}
              strokeDasharray={isRightActive ? 'none' : '4 4'}
              opacity={isRightActive ? 1 : 0.55}
            />

            {/* Traveling Data Pulse on Active Line */}
            {isLeftActive && (() => {
              const u = (frame * 0.045) % 1;
              const totalL = 28 + (446 - 218) + 28; // 284px
              const dist = u * totalL;
              let px = 446;
              let py = 0;
              if (dist <= 28) {
                px = 446;
                py = dist;
              } else if (dist <= 28 + (446 - 218)) {
                px = 446 - (dist - 28);
                py = 28;
              } else {
                px = 218;
                py = 28 + (dist - 28 - (446 - 218));
              }
              const col = activeToolIdx === 2 ? t.amber : t.emerald;
              return <circle cx={px} cy={py} r={5} fill={col} />;
            })()}

            {isRightActive && (() => {
              const u = (frame * 0.045) % 1;
              const totalL = 28 + (674 - 446) + 28; // 284px
              const dist = u * totalL;
              let px = 446;
              let py = 0;
              if (dist <= 28) {
                px = 446;
                py = dist;
              } else if (dist <= 28 + (674 - 446)) {
                px = 446 + (dist - 28);
                py = 28;
              } else {
                px = 674;
                py = 28 + (dist - 28 - (674 - 446));
              }
              const col = activeToolIdx === 3 ? t.emerald : t.cyan;
              return <circle cx={px} cy={py} r={5} fill={col} />;
            })()}

            {/* Junction & Terminal Pins */}
            <circle cx="446" cy="2" r="5" fill={t.amber} />
            <circle cx="446" cy="28" r="4" fill={isExecuting ? t.amber : t.borderStrong} />
            <circle cx="218" cy="54" r="5" fill={isLeftActive ? (activeToolIdx === 2 ? t.amber : t.emerald) : t.borderStrong} />
            <circle cx="674" cy="54" r="5" fill={isRightActive ? (activeToolIdx === 3 ? t.emerald : t.cyan) : t.borderStrong} />
          </svg>
        </div>

        {/* 4 Tool Workstation Nodes (Spacious 2x2 Grid with Big Readable Fonts & Code Snippets) */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
          {tools.map((tool, idx) => {
            const isAct = isExecuting && idx === activeToolIdx;
            const isDone = isExecuting ? idx < activeToolIdx : false;
            const stText = isAct ? 'LIVE' : isDone ? 'DONE' : 'READY';
            const stCol = isAct ? t.amber : isDone ? t.emerald : t.muted;
            const cardPop = pop(frame, 12 + idx * 8, fps, 150);
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
                style={{
                  padding: '24px 22px',
                  opacity: cardPop,
                  transform: `translateY(${(1 - cardPop) * 16}px)`,
                }}
              >
                {/* Embedded Execution Trace Box */}
                <div
                  style={{
                    marginTop: 14,
                    padding: '10px 14px',
                    borderRadius: 12,
                    backgroundColor: t.well,
                    border: `1.5px solid ${isAct ? tool.color : t.border}`,
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: isAct ? tool.color : t.muted,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: isAct ? tool.color : isDone ? t.emerald : t.muted,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {tool.codeSnippet}
                  </span>
                </div>
              </OpsNodeBox>
            );
          })}
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="dark"
        command={
          !isExecuting
            ? 'orchestrator -> standby (vps-2 worker ready)'
            : `tool -> ${tools[activeToolIdx].title.toLowerCase()} (${tools[activeToolIdx].codeSnippet})`
        }
        accent={isExecuting ? tools[activeToolIdx].color : t.amber}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 4: WEB DASHBOARD (Warm Paper) — Ops Deck + Task Map Live UI (Readable!)
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
    {alias: 'rai', plan: 'AI Pro', pct: 86, col: t.amber},
    {alias: 'akun2', plan: 'AI Pro', pct: 93, col: t.emerald},
    {alias: 'anuadlh', plan: 'Free', pct: 100, col: t.emerald},
  ];

  return (
    <AbsoluteFill>
      <OpsCanvas mode="light" />
      <OpsHeader mode="light" index={4} total={5} statusText="WEB LIVE" accent={t.emerald} />

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
          top: 472,
          left: 68,
          right: 68,
          height: 1094,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Top Mock Panel: Ops Deck Telemetry + Quota Matrix */}
        <div
          style={{
            backgroundColor: t.surface,
            border: `2px solid ${t.borderStrong}`,
            borderRadius: 24,
            padding: 26,
            boxShadow: t.shadow,
            opacity: p1,
            transform: `translateY(${(1 - p1) * 18}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <GlobeSvg color={t.ink} size={34} />
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 32, color: t.ink}}>
                Ops Deck
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 17, color: t.emerald, backgroundColor: t.emeraldSoft, padding: '6px 14px', borderRadius: 999}}>
              KLUSTER SEHAT
            </span>
          </div>

          {/* Animated SVG CPU / RAM Chart */}
          <div style={{backgroundColor: t.well, border: `1.5px solid ${t.borderStrong}`, borderRadius: 18, padding: '16px 18px', marginBottom: 18}}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 19, color: t.ink2, marginBottom: 10}}>
              <span style={{fontWeight: 700}}>Telemetri VPS-2</span>
              <span style={{fontWeight: 800, color: t.amber}}>CPU {Math.round(8 + 9 * chartProg)}% · RAM 13%</span>
            </div>
            <svg width="852" height="125" viewBox="0 0 852 125">
              {[25, 62, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="852" y2={y} stroke={t.borderStrong} strokeWidth="1" strokeOpacity="0.45" />
              ))}
              <path
                d="M 0 92 L 140 90 L 280 91 L 420 88 L 560 89 L 700 85 L 852 84"
                fill="none"
                stroke={t.cyan}
                strokeWidth="4.5"
                strokeDasharray="920"
                strokeDashoffset={920 * (1 - chartProg)}
                strokeLinecap="round"
              />
              <path
                d="M 0 105 L 120 100 L 240 108 L 360 72 L 480 84 L 600 54 L 720 74 L 852 62"
                fill="none"
                stroke={t.amber}
                strokeWidth="5"
                strokeDasharray="960"
                strokeDashoffset={960 * (1 - chartProg)}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Thick Readable Quota Rows */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {quotas.map((q) => (
              <div
                key={q.alias}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr 90px',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 18px',
                  backgroundColor: t.well,
                  borderRadius: 14,
                  border: `1.5px solid ${t.border}`,
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: t.ink}}>{q.alias}</span>
                  <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, padding: '3px 10px', borderRadius: 999, backgroundColor: q.plan === 'AI Pro' ? t.cyanSoft : '#FFFFFF', color: q.plan === 'AI Pro' ? t.cyan : t.muted, border: `1px solid ${t.border}`}}>
                    {q.plan}
                  </span>
                </div>
                <div style={{height: 14, borderRadius: 999, backgroundColor: '#DAD4C6', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${q.pct * barProg}%`, backgroundColor: q.col, borderRadius: 999}} />
                </div>
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, color: q.col, textAlign: 'right'}}>
                  {q.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Mock Panel: Task Map Real-Time Stream */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0E1117',
            border: `2.5px solid #2A3140`,
            borderRadius: 24,
            padding: 26,
            boxShadow: t.shadowSm,
            opacity: p2,
            transform: `translateY(${(1 - p2) * 18}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 30, color: '#F4F6FA'}}>
              Task Map · Workflow
            </span>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: '#10B981', backgroundColor: 'rgba(16,185,129,0.16)', padding: '6px 14px', borderRadius: 999}}>
              ● SSE STREAM
            </span>
          </div>

          <div style={{position: 'relative', width: 892, height: 220}}>
            <svg width="892" height="220" viewBox="0 0 892 220" style={{position: 'absolute', inset: 0}}>
              <OpsBezierWire p0={[178, 110]} p1={[202, 110]} p2={[208, 110]} p3={[234, 110]} color="#F59E0B" active speed={0.032} />
              <OpsBezierWire p0={[410, 110]} p1={[432, 110]} p2={[438, 110]} p3={[464, 110]} color="#38BDF8" active speed={0.032} phaseOffset={0.33} />
              <OpsBezierWire p0={[654, 110]} p1={[678, 110]} p2={[684, 110]} p3={[710, 110]} color="#10B981" active speed={0.032} phaseOffset={0.66} />
            </svg>

            {[
              {x: 4, w: 174, img: 'assets/ops/tg-official.svg', label: 'Bot TG', col: '#10B981'},
              {x: 234, w: 176, img: 'assets/ops/termux-official.svg', label: 'Termux', col: '#F59E0B'},
              {x: 464, w: 190, img: 'assets/ops/agy-official.png', label: 'AGY', col: '#38BDF8'},
              {x: 710, w: 176, img: '', label: 'Output', col: '#10B981'},
            ].map((n) => (
              <div
                key={n.label}
                style={{
                  position: 'absolute',
                  left: n.x,
                  top: 34,
                  width: n.w,
                  height: 152,
                  borderRadius: 18,
                  backgroundColor: '#161A23',
                  border: `2.5px solid ${n.col}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {n.img ? (
                  <Img src={staticFile(n.img)} style={{width: 54, height: 54, objectFit: 'contain', borderRadius: 10}} />
                ) : (
                  <CheckSvg color="#10B981" size={48} />
                )}
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 21, color: '#F4F6FA'}}>{n.label}</span>
              </div>
            ))}
          </div>

          <div style={{fontFamily: FONT.mono, fontSize: 19, color: '#CBD3DF', display: 'flex', justifyContent: 'space-between'}}>
            <span>Panah menyala real-time</span>
            <span style={{color: '#F59E0B', fontWeight: 800}}>rhmt-dashboard</span>
          </div>
        </div>
      </div>

      <OpsBottomTelemetryStrip
        mode="light"
        command="GET /api/task-map/stream -> 200 OK"
        accent={t.emerald}
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: BRANDING (Dark Graphite) — Rahmat / rhmt ofc + PP Dev Profile
   ============================================================================ */
export const OpsBrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = OPS_THEME.dark;

  const pHero = pop(frame, 4, fps, 145);
  const pStack = pop(frame, 18, fps, 145);
  const pLinks = pop(frame, 32, fps, 140);
  const ctaPulse = 1 + 0.03 * Math.sin(frame * 0.16);
  const sparkRot = frame * 1.3;
  const ringRot = frame * 0.9;

  const pillars = [
    {k: 'FULLSTACK', v: 'Web Anti-Slop', col: t.amber, icon: <CodeSvg color={t.amber} size={30} />},
    {k: 'DEVOPS', v: 'Dual-VPS & PM2', col: t.cyan, icon: <ServerSvg color={t.cyan} size={30} />},
    {k: 'AGENTIC AI', v: 'Bot & Remotion', col: t.emerald, icon: <GeminiSparkSvg size={28} color={t.emerald} rotate={sparkRot} />},
  ];

  const channels = [
    {label: 'PORTOFOLIO', value: 'rhmt.biz.id', accent: t.amber},
    {label: 'GITHUB', value: 'rhmt-ofc', accent: t.cyan},
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
        highlight="Rahmat · rhmt ofc"
        accent={t.amber}
      />

      <OpsPipelineRail mode="dark" activeIdx={4} accent={t.amber} />

      <div
        style={{
          position: 'absolute',
          top: 472,
          left: 68,
          right: 68,
          height: 1094,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Identity Hero Card with Official PP Dev Portrait */}
        <div
          style={{
            backgroundColor: t.surface,
            border: `2.5px solid ${t.amber}`,
            borderRadius: 26,
            padding: 28,
            boxShadow: t.shadow,
            opacity: pHero,
            transform: `translateY(${(1 - pHero) * 20}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
            <div style={{position: 'relative', width: 176, height: 176, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="176" height="176" viewBox="0 0 176 176" style={{position: 'absolute', inset: 0, transform: `rotate(${ringRot}deg)`}}>
                <circle cx="88" cy="88" r="84" fill="none" stroke={t.amber} strokeWidth="3.5" strokeDasharray="18 12" />
              </svg>
              <Img
                src={staticFile('assets/ops/pp-dev.png')}
                style={{
                  width: 156,
                  height: 156,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${t.ink}`,
                }}
              />
            </div>

            <div style={{flex: 1}}>
              <div style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: t.amber, letterSpacing: '0.07em'}}>
                PELAJAR MA · BUILDER
              </div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 44, color: t.ink, marginTop: 6, lineHeight: 1.08}}>
                Rahmat · R_HMT
              </div>
              <div style={{fontFamily: FONT.sans, fontSize: 23, color: t.ink2, marginTop: 10, lineHeight: 1.35}}>
                Ngulik fullstack web, DevOps Linux, dan ekosistem AI agentic mandiri.
              </div>
            </div>
          </div>

          {/* 3 Clean Pillar Cards */}
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
                  border: `1.5px solid ${t.borderStrong}`,
                  borderRadius: 18,
                  padding: '18px 18px',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                  {pil.icon}
                  <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: pil.col}} />
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: pil.col, letterSpacing: '0.05em'}}>
                  {pil.k}
                </div>
                <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 24, color: t.ink, marginTop: 6}}>
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
            border: `2px solid ${t.borderStrong}`,
            borderRadius: 26,
            padding: 28,
            boxShadow: t.shadowSm,
            opacity: pLinks,
            transform: `translateY(${(1 - pLinks) * 20}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            {channels.map((ch) => (
              <div
                key={ch.label}
                style={{
                  backgroundColor: t.surfaceRaised,
                  border: `1.5px solid ${t.borderStrong}`,
                  borderRadius: 18,
                  padding: '22px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: ch.accent, letterSpacing: '0.07em'}}>
                  {ch.label}
                </span>
                <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 32, color: t.ink}}>
                  {ch.value}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 20,
              backgroundColor: t.amber,
              color: '#090B0E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `scale(${ctaPulse})`,
            }}
          >
            <div>
              <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 36, lineHeight: 1.1}}>
                Follow @rhmtofc
              </div>
              <div style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, marginTop: 6}}>
                Cek rhmt.biz.id · Bedah Arsitektur Lainnya
              </div>
            </div>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 16,
                backgroundColor: '#090B0E',
                color: t.amber,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 32,
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
        accent={t.amber}
      />
    </AbsoluteFill>
  );
};
