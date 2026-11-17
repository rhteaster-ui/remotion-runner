import React from 'react';
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {FigmaAnchorFrame, RepoFlowShell} from './shell';
import {REPO_FONT, REPO_TOKENS} from './tokens';

// Smooth spring/expo entry helper
const expoIn = (f: number, delay = 0, dur = 14) => {
  return interpolate(f - delay, [0, dur], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/* =========================================================================
   SCENE 1: HOOK (DARK STUDIO SLATE)
   Masalah Push ZIP & Limit Web GitHub vs Real RepoFlow Mobile Experience
   ========================================================================= */
export const RepoFlowHookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const card1In = expoIn(frame, 12, 14);
  const heroIn = expoIn(frame, 22, 16);

  const floatY = Math.sin(frame * 0.08) * 8;

  return (
    <RepoFlowShell mode="dark" activeStep={0} subtitle="PROBLEM & PARADIGM SHIFT">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <FigmaAnchorFrame tag="GITHUB WORKFLOW BOTTLENECK" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Mau Push Project ke GitHub, <br />
            <span style={{color: '#38bdf8'}}>Malah Dibatasi & Gagal di HP?</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Comparison & Visual Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          width: '100%',
          maxWidth: 900,
          position: 'relative',
        }}
      >
        {/* Pain Point Banner (Large & High-Contrast) */}
        <div
          style={{
            width: '100%',
            opacity: card1In,
            transform: `translateY(${(1 - card1In) * 16}px)`,
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '2px solid rgba(239, 68, 68, 0.55)',
            borderRadius: 20,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                flexShrink: 0,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.5" />
                <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: 4,
                }}
              >
                Web GitHub Standar di HP
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#e2e8f0',
                }}
              >
                Batas 100 file, gagal ekstrak ZIP, rawan broken commit.
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: 8,
              backgroundColor: 'rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              border: '1.5px solid rgba(239, 68, 68, 0.6)',
              flexShrink: 0,
            }}
          >
            TERBATAS
          </span>
        </div>

        {/* HERO REPOFLOW MOBILE STUDIO STAGE */}
        <div
          style={{
            opacity: heroIn,
            transform: `translateY(${(1 - heroIn) * 24 + floatY}px)`,
            width: '100%',
            backgroundColor: '#0c1017',
            border: '2.5px solid rgba(56, 189, 248, 0.6)',
            borderRadius: 32,
            padding: '24px 28px',
            boxShadow: '0 28px 70px rgba(14, 165, 233, 0.28), 0 0 0 1px rgba(56, 189, 248, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Top Device Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 14,
              borderBottom: '1.5px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#eab308'}} />
              <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981'}} />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#38bdf8',
                  marginLeft: 8,
                }}
              >
                repoflow.web.id • Mobile PWA
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 16,
                fontWeight: 800,
                color: '#10b981',
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              24 REPOSITORIES ACTIVE
            </span>
          </div>

          {/* Interactive Hero Dropzone / Sync Box */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#111827',
              border: '2px dashed rgba(56, 189, 248, 0.45)',
              borderRadius: 24,
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path d="M12 16v-8m0 0l-4 4m4-4l4 4" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 16.5a4.5 4.5 0 00-3.5-4.4 7 7 0 00-13 1.9A5 5 0 004.5 22h15a4.5 4.5 0 00.5-5.5z" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 34,
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              Upload Project ZIP / Folder
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 22,
                color: '#94a3b8',
              }}
            >
              <span style={{color: '#38bdf8', fontWeight: 800}}>1,248 Files</span> siap di-push ke GitHub tanpa batasan ukuran
            </div>
            {/* Chunky Primary Action Button */}
            <div
              style={{
                marginTop: 8,
                backgroundColor: '#0284c7',
                backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: '#ffffff',
                fontFamily: REPO_FONT.display,
                fontSize: 26,
                fontWeight: 800,
                padding: '16px 42px',
                borderRadius: 16,
                border: '1.5px solid #38bdf8',
                boxShadow: '0 10px 25px rgba(2, 132, 199, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.02em',
              }}
            >
              INSTANT PUSH TO GITHUB (1-TAP)
            </div>
          </div>

          {/* Bottom Advantage Row */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: 8,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 700}}>
              <span>✓</span> Zero Backend Server
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 700}}>
              <span>✓</span> Full Mobile Touch PWA
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, color: '#eab308', fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 700}}>
              <span>✓</span> Atomic Single Commit
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 2: UNPACK (CLEAN LIGHT STUDIO)
   Ekstraksi Memori Klien Instan Tanpa Server Pihak Ketiga
   ========================================================================= */
export const RepoFlowUnpackScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const stageIn = expoIn(frame, 12, 14);

  return (
    <RepoFlowShell mode="light" activeStep={1} subtitle="CLIENT-SIDE MEMORY EXTRACTION">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <FigmaAnchorFrame tag="ZERO-SERVER IN-MEMORY STREAM" borderColor="#0284c7">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#0f172a',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Ekstrak Ratusan File ZIP, <br />
            <span style={{color: '#0284c7'}}>100% di RAM Browser!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage (Clean Studio Card) */}
      <div
        style={{
          opacity: stageIn,
          transform: `translateY(${(1 - stageIn) * 18}px)`,
          width: '100%',
          maxWidth: 900,
          backgroundColor: '#ffffff',
          border: '2.5px solid rgba(2, 132, 199, 0.45)',
          borderRadius: 32,
          padding: '28px 32px',
          boxShadow: '0 24px 60px rgba(2, 132, 199, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Header bar of stage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
            borderBottom: '1.5px solid #e2e8f0',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: '#0284c7'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 22,
                fontWeight: 800,
                color: '#0f172a',
              }}
            >
              JSZip Web Worker Engine
            </span>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: '#059669',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid rgba(16, 185, 129, 0.35)',
            }}
          >
            SPEED: 48ms LATENCY
          </span>
        </div>

        {/* High-Impact Stat Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
          }}
        >
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: 22,
              padding: '24px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 68,
                fontWeight: 800,
                color: '#0284c7',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              0 ms
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#334155',
              }}
            >
              Server Upload Wait Time
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: 22,
              padding: '24px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 68,
                fontWeight: 800,
                color: '#10b981',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              48 ms
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.sans,
                fontSize: 22,
                fontWeight: 700,
                color: '#334155',
              }}
            >
              RAM Extraction Latency
            </div>
          </div>
        </div>

        {/* Live File Chips Stream (Crisp & Readable) */}
        <div
          style={{
            backgroundColor: '#090d16',
            borderRadius: 20,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#94a3b8',
              fontFamily: REPO_FONT.mono,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            <span>CLIENT-SIDE DECOMPRESSION STREAM</span>
            <span style={{color: '#10b981'}}>100% IN MEMORY</span>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 10}}>
            <span
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                fontFamily: REPO_FONT.mono,
                fontSize: 20,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 10,
                border: '1px solid rgba(56, 189, 248, 0.4)',
              }}
            >
              ⚡ src/index.ts (4.2 KB)
            </span>
            <span
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontFamily: REPO_FONT.mono,
                fontSize: 20,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 10,
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              ⚡ assets/hero.webp (128 KB)
            </span>
            <span
              style={{
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: '#eab308',
                fontFamily: REPO_FONT.mono,
                fontSize: 20,
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 10,
                border: '1px solid rgba(234, 179, 8, 0.4)',
              }}
            >
              ⚡ package.json (1.1 KB)
            </span>
          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '12px 18px',
            borderRadius: 14,
            backgroundColor: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            fontFamily: REPO_FONT.sans,
            fontSize: 20,
            fontWeight: 700,
            color: '#0284c7',
          }}
        >
          <span>🔒</span> File Anda tidak pernah diunggah ke server perantara mana pun.
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 3: ATOMIC TREE (DARK STUDIO SLATE)
   Inspeksi Repo & Git Tree Atomik Tanpa Broken State
   ========================================================================= */
export const RepoFlowTreeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const stageIn = expoIn(frame, 12, 14);

  return (
    <RepoFlowShell mode="dark" activeStep={2} subtitle="ATOMIC GIT TREE INSPECTOR">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <FigmaAnchorFrame tag="ATOMIC GIT TREE ENGINE" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Inspeksi Repo & Tree Atomik, <br />
            <span style={{color: '#38bdf8'}}>1 Commit Bersih Tanpa Konflik!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage (Dark Studio Slate Card) */}
      <div
        style={{
          opacity: stageIn,
          transform: `translateY(${(1 - stageIn) * 18}px)`,
          width: '100%',
          maxWidth: 900,
          backgroundColor: '#0c1017',
          border: '2.5px solid rgba(56, 189, 248, 0.55)',
          borderRadius: 32,
          padding: '28px 32px',
          boxShadow: '0 28px 70px rgba(14, 165, 233, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Repo Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M5 5l7-3 7 3M5 19l7 3 7-3" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 22,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              rhmt-ofc / repoflow-app
            </span>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 16,
              fontWeight: 800,
              color: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid rgba(56, 189, 248, 0.4)',
            }}
          >
            branch: main (HEAD)
          </span>
        </div>

        {/* Interactive Git Commit Node Visualizer */}
        <div
          style={{
            backgroundColor: '#111827',
            borderRadius: 24,
            padding: '24px 28px',
            border: '1.5px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                boxShadow: '0 0 18px #38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090e',
                fontWeight: 900,
                fontSize: 20,
              }}
            >
              ●
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#38bdf8',
                }}
              >
                commit 8f3c1a2 • HEAD
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                "feat: atomic client-side production deploy"
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 20,
              color: '#94a3b8',
              paddingLeft: 52,
            }}
          >
            1,248 Blobs Created • Single Tree SHA-1 Generated • 1 API Call Ref Push
          </div>
        </div>

        {/* Dual Technical Advantages */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 18,
              padding: '18px 20px',
            }}
          >
            <div style={{fontFamily: REPO_FONT.display, fontSize: 24, fontWeight: 800, color: '#10b981', marginBottom: 4}}>
              ✓ ANTI-CONFLICT STATE
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 18, color: '#cbd5e1'}}>
              Tidak ada commit parsial yang membuat repository corrupt.
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              borderRadius: 18,
              padding: '18px 20px',
            }}
          >
            <div style={{fontFamily: REPO_FONT.display, fontSize: 24, fontWeight: 800, color: '#38bdf8', marginBottom: 4}}>
              ✓ REST API EFFICIENCY
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 18, color: '#cbd5e1'}}>
              Langsung ke GitHub Git Database API via pure fetch.
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 4: VAULT (CLEAN LIGHT STUDIO)
   Enkripsi Token Web Crypto AES-256 Non-Extractable
   ========================================================================= */
export const RepoFlowVaultScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const stageIn = expoIn(frame, 12, 14);

  return (
    <RepoFlowShell mode="light" activeStep={3} subtitle="WEB CRYPTO API HARDENED VAULT">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <FigmaAnchorFrame tag="CLIENT HARDENED SECURITY" borderColor="#0284c7">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#0f172a',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Token GitHub Aman 100%, <br />
            <span style={{color: '#0284c7'}}>Terenkripsi AES-GCM 256-Bit!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage (Clean Studio Card) */}
      <div
        style={{
          opacity: stageIn,
          transform: `translateY(${(1 - stageIn) * 18}px)`,
          width: '100%',
          maxWidth: 900,
          backgroundColor: '#ffffff',
          border: '2.5px solid rgba(2, 132, 199, 0.45)',
          borderRadius: 32,
          padding: '28px 32px',
          boxShadow: '0 24px 60px rgba(2, 132, 199, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
        }}
      >
        {/* Giant Vault Shield & Lock Graphic */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            backgroundColor: 'rgba(2, 132, 199, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7',
          }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="3" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="16" r="2" fill="#0284c7" />
          </svg>
        </div>

        {/* Big Bold Security Metric */}
        <div style={{textAlign: 'center'}}>
          <div
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 60,
              fontWeight: 800,
              color: '#0284c7',
              lineHeight: 1.1,
            }}
          >
            AES-GCM 256-Bit
          </div>
          <div
            style={{
              fontFamily: REPO_FONT.sans,
              fontSize: 24,
              fontWeight: 700,
              color: '#475569',
              marginTop: 6,
            }}
          >
            Web Crypto API • Non-Extractable CryptoKey
          </div>
        </div>

        {/* 3 High-Impact Security Pillars */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 16,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontSize: 24}}>🛡️</span>
              <span style={{fontFamily: REPO_FONT.sans, fontSize: 22, fontWeight: 700, color: '#0f172a'}}>
                PBKDF2 Key Derivation
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 800, color: '#0284c7'}}>
              100,000 Iterasi Salt
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 16,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontSize: 24}}>🔒</span>
              <span style={{fontFamily: REPO_FONT.sans, fontSize: 22, fontWeight: 700, color: '#0f172a'}}>
                Zero External Transmission
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 800, color: '#10b981'}}>
              Lokal di Perangkat RAM
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: 16,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontSize: 24}}>⚡</span>
              <span style={{fontFamily: REPO_FONT.sans, fontSize: 22, fontWeight: 700, color: '#0f172a'}}>
                Fine-Grained Scope Support
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 18, fontWeight: 800, color: '#6366f1'}}>
              Minimal PAT Permission
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 5: BRAND (DARK STUDIO SLATE)
   Karya Orisinal Developer Rahmat • RHMT OFC (rhmt.biz.id)
   ========================================================= */
export const RepoFlowBrandScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const stageIn = expoIn(frame, 12, 14);

  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <RepoFlowShell mode="dark" activeStep={4} subtitle="OFFICIAL CREATOR SHOWCASE">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <FigmaAnchorFrame tag="OFFICIAL CREATOR SHOWCASE" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.18,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Karya Orisinal Developer, <br />
            <span style={{color: '#38bdf8'}}>Rahmat • RHMT OFC</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage (Dark Studio Slate Card) */}
      <div
        style={{
          opacity: stageIn,
          transform: `translateY(${(1 - stageIn) * 18 + floatY}px)`,
          width: '100%',
          maxWidth: 900,
          backgroundColor: '#0c1017',
          border: '2.5px solid rgba(56, 189, 248, 0.6)',
          borderRadius: 32,
          padding: '32px 36px',
          boxShadow: '0 28px 70px rgba(14, 165, 233, 0.28)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Profile Avatar & Creator Badges */}
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <div
            style={{
              position: 'relative',
              width: 130,
              height: 130,
              borderRadius: '50%',
              padding: 5,
              backgroundColor: '#07090e',
              border: '3px solid #38bdf8',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)',
            }}
          >
            <Img
              src={staticFile('assets/repoflow/pp-dev.png')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 44,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              Rahmat
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 26,
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '0.04em',
                marginTop: 4,
              }}
            >
              RHMT OFC
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.sans,
                fontSize: 20,
                fontWeight: 600,
                color: '#94a3b8',
                marginTop: 4,
              }}
            >
              Full-Stack Developer & Automation Engineer
            </div>
          </div>
        </div>

        {/* Massive Portfolio Link Badge */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#0284c7',
            backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            color: '#ffffff',
            borderRadius: 22,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(2, 132, 199, 0.45)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <span style={{fontSize: 32}}>🌐</span>
            <div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 32, fontWeight: 900, color: '#ffffff'}}>
                rhmt.biz.id
              </div>
              <div style={{fontFamily: REPO_FONT.sans, fontSize: 18, color: 'rgba(255, 255, 255, 0.85)'}}>
                Portofolio Resmi & Showcase Proyek Unggulan
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: '#ffffff',
              color: '#0284c7',
              fontFamily: REPO_FONT.mono,
              fontSize: 18,
              fontWeight: 800,
              padding: '8px 18px',
              borderRadius: 12,
            }}
          >
            KUNJUNGI ↗
          </span>
        </div>

        {/* Ecosystem Projects Row */}
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 14,
          }}
        >
          <div
            style={{
              backgroundColor: '#111827',
              border: '1.5px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 16,
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: REPO_FONT.display, fontSize: 22, fontWeight: 800, color: '#38bdf8'}}>
              RepoFlow
            </div>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 15, color: '#94a3b8', marginTop: 2}}>
              repoflow.web.id
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#111827',
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 16,
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: REPO_FONT.display, fontSize: 22, fontWeight: 800, color: '#10b981'}}>
              OpsFlow
            </div>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 15, color: '#94a3b8', marginTop: 2}}>
              Ops Automation
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#111827',
              border: '1.5px solid rgba(234, 179, 8, 0.3)',
              borderRadius: 16,
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{fontFamily: REPO_FONT.display, fontSize: 22, fontWeight: 800, color: '#eab308'}}>
              E-Rekap
            </div>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 15, color: '#94a3b8', marginTop: 2}}>
              Smart Analytics
            </div>
          </div>
        </div>

        {/* Bottom Social Handle Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            color: '#94a3b8',
            fontFamily: REPO_FONT.mono,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          <span>GitHub: @rhmt-ofc</span>
          <span>•</span>
          <span>Telegram: @rAi_engine</span>
        </div>
      </div>
    </RepoFlowShell>
  );
};
