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
import {FONT} from '../lib/theme';
import {
  GeminiSparkSvg,
  REPOFLOW_THEME,
  RepoFlowCanvas,
  RepoFlowHeader,
  RepoFlowStageCard,
  RepoFlowStepper,
  RepoFlowTelemetryBar,
  RepoFlowTopHook,
  SpatialWorkbenchPlateSvg,
} from '../components/RepoFlowKit';

/* ───────────────────────────────────────────────────────────
   SCENE 1: Problem & Terminal CLI vs Web GitHub Bottleneck
   Mode: Dark
   ─────────────────────────────────────────────────────────── */
export const RepoFlowHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME.dark;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const blink = frame % 20 < 10;

  return (
    <AbsoluteFill>
      <RepoFlowCanvas mode="dark" />
      <RepoFlowHeader mode="dark" index={0} total={5} statusText="DIAGNOSTIC" accent={t.rose} />
      <RepoFlowTopHook
        mode="dark"
        badge="GIT WORKFLOW BOTTLENECK"
        badgeColor={t.rose}
        pre="Capek Bolak-Balik"
        focal="Terminal Git"
        post="& Limit Upload Web?"
        accent={t.rose}
      />
      <RepoFlowStepper mode="dark" currentStep={0} metricText="LIMIT: 100 FILES" accent={t.rose} />

      <RepoFlowStageCard
        mode="dark"
        title="git.workflow.conflict"
        badge="BOTTLENECK DETECTED"
        badgeColor={t.rose}
        accent={t.rose}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, height: '100%', justifyContent: 'space-between'}}>
          {/* Card 1: Terminal Frustration */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 18,
              backgroundColor: '#05070B',
              border: `2px solid ${t.borderStrong}`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 17, color: t.muted}}>
                terminal.bash — limited device
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: t.rose}}>
                [NOT INSTALLED]
              </span>
            </div>
            <div style={{fontFamily: FONT.mono, fontSize: 19, color: t.ink, lineHeight: 1.6}}>
              <div style={{color: t.muted}}>$ git init && git remote add origin ...</div>
              <div style={{color: t.muted}}>$ git push -u origin main</div>
              <div style={{color: t.rose, fontWeight: 700, marginTop: 4}}>
                fatal: git command not found / SSH keys missing {blink ? '_' : ''}
              </div>
            </div>
          </div>

          {/* Card 2: GitHub Web 100 Files Limit */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 18,
              backgroundColor: '#160B0E',
              border: `2px solid ${t.rose}`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, color: t.rose}}>
                ⚠️ GitHub Web Upload Blocker
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: '#FFFFFF', backgroundColor: t.rose, padding: '3px 10px', borderRadius: 6}}>
                MAX 100 FILES
              </span>
            </div>
            <div style={{fontFamily: FONT.sans, fontSize: 20, color: '#FECDD3', lineHeight: 1.45, fontWeight: 500}}>
              Proyek dengan 500+ file (folder <code>node_modules</code>, asset, kode) otomatis ditolak browser web GitHub biasa.
            </div>
          </div>

          {/* Solution Teaser Drop Zone */}
          <div
            style={{
              padding: '22px 24px',
              borderRadius: 18,
              backgroundColor: t.surfaceRaised,
              border: `2px dashed ${t.cyan}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: `0 0 24px ${t.cyanSoft}`,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  backgroundColor: '#070A0F',
                  border: `2px solid ${t.cyan}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GeminiSparkSvg size={30} color={t.cyan} rotate={frame * 3} />
              </div>
              <div>
                <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 23, color: t.ink}}>
                  RepoFlow One-Drop Zone
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 17, color: t.cyan, marginTop: 4}}>
                  Drag & Drop .ZIP Tanpa Batas File
                </div>
              </div>
            </div>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                backgroundColor: t.cyan,
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 16,
                color: '#070A0F',
              }}
            >
              READY
            </div>
          </div>
        </div>
      </RepoFlowStageCard>

      <RepoFlowTelemetryBar
        mode="dark"
        tag="BYPASS"
        metricLabel="SOLUTION"
        metricValue="RepoFlow Direct In-Browser Engine"
        accent={t.cyan}
      />
    </AbsoluteFill>
  );
};

/* ───────────────────────────────────────────────────────────
   SCENE 2: Spatial Git Workbench & Web Worker 48ms
   Mode: Light
   ─────────────────────────────────────────────────────────── */
export const RepoFlowWorkbenchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME.light;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const rot = frame * 0.8;
  const pulse = 1 + 0.05 * Math.sin(frame * 0.25);

  return (
    <AbsoluteFill>
      <RepoFlowCanvas mode="light" />
      <RepoFlowHeader mode="light" index={1} total={5} statusText="BENCHMARK" accent={t.cyan} />
      <RepoFlowTopHook
        mode="light"
        badge="SPATIAL GIT WORKBENCH V2.5"
        badgeColor={t.cyan}
        pre="Ekstrak ZIP Instan di Memori"
        focal="48 Milidetik"
        post="via Web Worker"
        accent={t.cyan}
      />
      <RepoFlowStepper mode="light" currentStep={1} metricText="EXTRACT: 48MS" accent={t.cyan} />

      <RepoFlowStageCard
        mode="light"
        title="spatial.workbench.unpacker"
        badge="48MS WEB WORKER"
        badgeColor={t.cyan}
        accent={t.cyan}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
          {/* Spatial 3D Plate Display */}
          <div
            style={{
              height: 430,
              borderRadius: 20,
              backgroundColor: '#070A0F',
              border: `2px solid ${REPOFLOW_THEME.dark.borderStrong}`,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SpatialWorkbenchPlateSvg size={420} rotation={rot} pulseGlow={pulse} />

            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(10, 16, 26, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
              }}
            >
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8'}} />
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: '#f1f5f9'}}>
                3D SPATIAL ORBIT ACTIVE
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 18,
                right: 22,
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 16,
                color: '#eab308',
                backgroundColor: 'rgba(10, 16, 26, 0.85)',
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid rgba(234, 179, 8, 0.4)',
              }}
            >
              ZERO DISK I/O
            </div>
          </div>

          {/* 3 Benchmark Spec Cards */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14}}>
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 32, color: t.cyan, lineHeight: 1.1}}>
                48ms
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted, marginTop: 4}}>
                Multi-thread unpack
              </span>
            </div>

            <div
              style={{
                padding: '16px 18px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 32, color: t.gold, lineHeight: 1.1}}>
                100%
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted, marginTop: 4}}>
                In-Memory parse
              </span>
            </div>

            <div
              style={{
                padding: '16px 18px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 32, color: t.emerald, lineHeight: 1.1}}>
                Auto
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted, marginTop: 4}}>
                Tree hierarchy
              </span>
            </div>
          </div>

          {/* Bottom App Inspection Strip */}
          <div
            style={{
              padding: '14px 20px',
              borderRadius: 14,
              backgroundColor: t.surfaceRaised,
              border: `1px solid ${t.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: t.ink}}>
              📁 project-bundle.zip (1,420 files / 24MB)
            </span>
            <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: t.emerald}}>
              TREE EXPANDED ✓
            </span>
          </div>
        </div>
      </RepoFlowStageCard>

      <RepoFlowTelemetryBar
        mode="light"
        tag="WORKER"
        metricLabel="THREAD STATUS"
        metricValue="Web Worker In-Memory Extraction Active"
        accent={t.cyan}
      />
    </AbsoluteFill>
  );
};

/* ───────────────────────────────────────────────────────────
   SCENE 3: 1-Ref Atomic Git Tree Commit Architecture
   Mode: Dark
   ─────────────────────────────────────────────────────────── */
export const RepoFlowAtomicScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME.dark;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const shaSuffix = Math.floor(100000 + (frame * 123) % 900000).toString(16);

  return (
    <AbsoluteFill>
      <RepoFlowCanvas mode="dark" />
      <RepoFlowHeader mode="dark" index={2} total={5} statusText="ATOMIC ENGINE" accent={t.cyan} />
      <RepoFlowTopHook
        mode="dark"
        badge="GITHUB REST/GRAPHQL API"
        badgeColor={t.cyan}
        pre="Bukan Commit Satuan,"
        focal="1-Ref Atomic Tree"
        post="Langsung ke SHA!"
        accent={t.cyan}
      />
      <RepoFlowStepper mode="dark" currentStep={2} metricText="ONE-REF SHA" accent={t.cyan} />

      <RepoFlowStageCard
        mode="dark"
        title="git.tree.commit.pipeline"
        badge="ATOMIC TRANSACTION"
        badgeColor={t.cyan}
        accent={t.cyan}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
          {/* Architecture Pipeline Flow */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {/* Step 1 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 38, height: 38, borderRadius: 10, backgroundColor: '#070A0F', border: `1.5px solid ${t.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, color: t.cyan, fontSize: 16}}>
                  01
                </div>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 20, color: t.ink}}>
                    POST /repos/.../git/trees
                  </div>
                  <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted, marginTop: 2}}>
                    Hierarki berkas dipetakan menjadi Single Tree Hash
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: t.emerald}}>
                201 CREATED
              </span>
            </div>

            {/* Step 2 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 38, height: 38, borderRadius: 10, backgroundColor: '#070A0F', border: `1.5px solid ${t.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 800, color: t.gold, fontSize: 16}}>
                  02
                </div>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 20, color: t.ink}}>
                    POST /repos/.../git/commits
                  </div>
                  <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted, marginTop: 2}}>
                    Commit tunggal mengikat parent commit & new tree
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: t.emerald}}>
                LINKED
              </span>
            </div>

            {/* Step 3 (The Atomic Ref Patch) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 20px',
                borderRadius: 16,
                backgroundColor: '#091522',
                border: `2px solid ${t.cyan}`,
                boxShadow: `0 0 20px ${t.cyanSoft}`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <div style={{width: 38, height: 38, borderRadius: 10, backgroundColor: t.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.mono, fontWeight: 900, color: '#070A0F', fontSize: 16}}>
                  03
                </div>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 21, color: '#FFFFFF'}}>
                    PATCH /git/refs/heads/main
                  </div>
                  <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: t.cyan, marginTop: 2}}>
                    1-Ref Atomic Pointer Update — Instan & Bebas Konflik
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 16, color: '#FFFFFF', backgroundColor: t.cyan, padding: '4px 12px', borderRadius: 8}}>
                ATOMIC
              </span>
            </div>
          </div>

          {/* Live SHA Hash Display Box */}
          <div
            style={{
              padding: '22px 24px',
              borderRadius: 18,
              backgroundColor: '#05070B',
              border: `2px solid ${t.borderStrong}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 16, color: t.muted}}>
                LIVE COMMIT SHA MANIFEST
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 15, color: t.cyan}}>
                ONE REF BUNDLE
              </span>
            </div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontWeight: 800,
                fontSize: 24,
                color: t.ink,
                letterSpacing: '0.04em',
                wordBreak: 'break-all',
              }}
            >
              commit 7f8a3c9e42{shaSuffix}
            </div>
            <div style={{display: 'flex', gap: 12, marginTop: 4}}>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: t.emerald, backgroundColor: t.emeraldSoft, padding: '3px 10px', borderRadius: 6}}>
                ✓ Zero Dirty Commits
              </span>
              <span style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 15, color: t.gold, backgroundColor: t.goldSoft, padding: '3px 10px', borderRadius: 6}}>
                ✓ 10x API Speed
              </span>
            </div>
          </div>
        </div>
      </RepoFlowStageCard>

      <RepoFlowTelemetryBar
        mode="dark"
        tag="COMMIT"
        metricLabel="API STRATEGY"
        metricValue="1-Ref Atomic Git Tree SHA Pointer"
        accent={t.cyan}
      />
    </AbsoluteFill>
  );
};

/* ───────────────────────────────────────────────────────────
   SCENE 4: Security & AES-256 GCM Client-Side Encryption
   Mode: Light
   ─────────────────────────────────────────────────────────── */
export const RepoFlowSecurityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME.light;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const lockPulse = 1 + 0.04 * Math.sin(frame * 0.3);

  return (
    <AbsoluteFill>
      <RepoFlowCanvas mode="light" />
      <RepoFlowHeader mode="light" index={3} total={5} statusText="PRIVACY VAULT" accent={t.emerald} />
      <RepoFlowTopHook
        mode="light"
        badge="ZERO-KNOWLEDGE PRIVACY"
        badgeColor={t.emerald}
        pre="Aman Tanpa Server Perantara,"
        focal="AES-256 GCM"
        post="100% Client-Side"
        accent={t.emerald}
      />
      <RepoFlowStepper mode="light" currentStep={3} metricText="MILITARY GRADE" accent={t.emerald} />

      <RepoFlowStageCard
        mode="light"
        title="crypto.subtle.gcm.vault"
        badge="MILITARY ENCRYPTION"
        badgeColor={t.emerald}
        accent={t.emerald}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
          {/* Central Security Shield Visual */}
          <div
            style={{
              padding: '28px 24px',
              borderRadius: 20,
              backgroundColor: '#070C12',
              border: `2px solid ${REPOFLOW_THEME.dark.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
              {/* Shield & Lock Vector SVG */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 22,
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '2px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${lockPulse})`,
                  boxShadow: '0 0 24px rgba(16, 185, 129, 0.35)',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <div>
                <div style={{fontFamily: FONT.space, fontWeight: 800, fontSize: 26, color: '#FFFFFF'}}>
                  Web Crypto API AES-GCM
                </div>
                <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 17, color: '#38bdf8', marginTop: 6}}>
                  PBKDF2 100,000 Iterations Key Derivation
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontWeight: 900,
                fontSize: 16,
                color: '#10b981',
                padding: '6px 14px',
                borderRadius: 999,
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1.5px solid #10b981',
              }}
            >
              ENCRYPTED
            </div>
          </div>

          {/* 3 Privacy Pillars */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: t.emerald}}>01</span>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 19, color: t.ink}}>
                    Zero Server Storage & Database
                  </div>
                  <div style={{fontFamily: FONT.mono, fontSize: 15, color: t.muted}}>
                    Tidak ada server backend perantara yang menyimpan PAT atau source code.
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: t.emerald}}>100% LOCAL</span>
            </div>

            <div
              style={{
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: t.cyan}}>02</span>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 19, color: t.ink}}>
                    Direct TLS Socket to GitHub
                  </div>
                  <div style={{fontFamily: FONT.mono, fontSize: 15, color: t.muted}}>
                    Koneksi HTTP REST langsung dari browser Anda ke <code>api.github.com</code>.
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: t.cyan}}>DIRECT</span>
            </div>

            <div
              style={{
                padding: '16px 20px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: t.gold}}>03</span>
                <div>
                  <div style={{fontFamily: FONT.space, fontWeight: 700, fontSize: 19, color: t.ink}}>
                    Auto-Purge on Tab Close
                  </div>
                  <div style={{fontFamily: FONT.mono, fontSize: 15, color: t.muted}}>
                    Kunci sesi enkripsi dihapus dari memori begitu tab browser ditutup.
                  </div>
                </div>
              </div>
              <span style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 16, color: t.gold}}>PURGED</span>
            </div>
          </div>
        </div>
      </RepoFlowStageCard>

      <RepoFlowTelemetryBar
        mode="light"
        tag="SECURITY"
        metricLabel="ENCRYPTION"
        metricValue="AES-GCM 256-bit Client-Side Verified"
        accent={t.emerald}
      />
    </AbsoluteFill>
  );
};

/* ───────────────────────────────────────────────────────────
   SCENE 5: Personal Branding RHMT OFC & Call To Action
   Mode: Dark
   ─────────────────────────────────────────────────────────── */
export const RepoFlowBrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = REPOFLOW_THEME.dark;
  const p = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const pulse = 1 + 0.05 * Math.sin(frame * 0.2);

  return (
    <AbsoluteFill>
      <RepoFlowCanvas mode="dark" />
      <RepoFlowHeader mode="dark" index={4} total={5} statusText="OFFICIAL LAUNCH" accent={t.gold} />
      <RepoFlowTopHook
        mode="dark"
        badge="OFFICIAL CREATION"
        badgeColor={t.gold}
        pre="Inovasi Canggih Dirancang Mandiri oleh"
        focal="Rahmat"
        post="di rhmt ofc"
        accent={t.gold}
      />
      <RepoFlowStepper mode="dark" currentStep={4} metricText="REPOFLOW LIVE" accent={t.gold} />

      <RepoFlowStageCard
        mode="dark"
        title="repoflow.official.workbench"
        badge="PUBLIC PRODUCTION"
        badgeColor={t.gold}
        accent={t.gold}
        style={{
          opacity: p,
          transform: `translateY(${(1 - p) * 20}px)`,
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* Main Hero Showcase Centerpiece */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            {/* Ultra HD Favicon Badge with Luminous Halo */}
            <div
              style={{
                position: 'relative',
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)',
                  transform: `scale(${pulse * 1.2})`,
                  filter: 'blur(16px)',
                }}
              />
              <Img
                src={staticFile('assets/repoflow/favicon_badge_ultra_hd.png')}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 42,
                  objectFit: 'cover',
                  border: `3px solid ${t.cyan}`,
                  boxShadow: `0 0 35px ${t.cyanSoft}`,
                  transform: `scale(${pulse})`,
                }}
              />
            </div>

            <div
              style={{
                fontFamily: FONT.space,
                fontWeight: 800,
                fontSize: 34,
                color: t.ink,
                letterSpacing: '-0.02em',
                marginTop: 22,
                textAlign: 'center',
              }}
            >
              REPOFLOW // SPATIAL GIT
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontWeight: 700,
                fontSize: 20,
                color: t.muted,
                marginTop: 6,
                letterSpacing: '0.04em',
              }}
            >
              Client-Side Git Push Engine v2.5
            </div>
          </div>

          {/* Action Link Pills */}
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 14}}>
            {/* Live Domain CTA Button */}
            <div
              style={{
                padding: '18px 24px',
                borderRadius: 18,
                backgroundColor: '#0C1B2E',
                border: `2px solid ${t.cyan}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: `0 0 25px ${t.cyanSoft}`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <GeminiSparkSvg size={24} color={t.cyan} rotate={frame * 3} />
                <span style={{fontFamily: FONT.mono, fontWeight: 900, fontSize: 24, color: '#FFFFFF'}}>
                  repoflow.web.id
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 16,
                  color: '#070A0F',
                  backgroundColor: t.cyan,
                  padding: '6px 16px',
                  borderRadius: 999,
                }}
              >
                TRY NOW
              </span>
            </div>

            {/* Developer Branding Verified Pill */}
            <div
              style={{
                padding: '16px 22px',
                borderRadius: 16,
                backgroundColor: t.surfaceRaised,
                border: `1.5px solid ${t.borderStrong}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Img
                  src={staticFile('assets/ops/pp-dev.png')}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `2px solid ${t.gold}`,
                  }}
                />
                <div>
                  <div style={{fontFamily: FONT.mono, fontWeight: 800, fontSize: 20, color: t.ink}}>
                    rhmt ofc
                  </div>
                  <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 15, color: t.muted}}>
                    Portfolio: rhmt.biz.id
                  </div>
                </div>
              </div>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontWeight: 800,
                  fontSize: 15,
                  color: t.gold,
                  padding: '4px 12px',
                  borderRadius: 8,
                  backgroundColor: t.goldSoft,
                  border: `1px solid ${t.gold}`,
                }}
              >
                OFFICIAL
              </span>
            </div>
          </div>
        </div>
      </RepoFlowStageCard>

      <RepoFlowTelemetryBar
        mode="dark"
        tag="LIVE"
        metricLabel="LAUNCH"
        metricValue="repoflow.web.id · by rhmt ofc"
        accent={t.gold}
      />
    </AbsoluteFill>
  );
};
