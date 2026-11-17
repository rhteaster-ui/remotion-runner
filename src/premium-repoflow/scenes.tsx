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
          gap: 18,
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
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                flexShrink: 0,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2.5" />
                <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: 2,
                }}
              >
                Web GitHub Standar di HP
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#cbd5e1',
                }}
              >
                Batas 100 file, gagal ekstrak ZIP, rawan broken commit.
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 15,
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

        {/* REAL REPOFLOW MOBILE MOCKUP HERO (AUTHENTIC SCREENSHOT) */}
        <div
          style={{
            opacity: heroIn,
            transform: `translateY(${(1 - heroIn) * 24 + floatY}px)`,
            width: '100%',
            maxWidth: 620,
            backgroundColor: '#0c1017',
            border: '2.5px solid rgba(56, 189, 248, 0.6)',
            borderRadius: 36,
            padding: '14px 14px 20px',
            boxShadow: '0 28px 70px rgba(14, 165, 233, 0.28), 0 0 0 1px rgba(56, 189, 248, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Top Phone Pill Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px 12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308'}} />
              <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981'}} />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#38bdf8',
                  marginLeft: 6,
                }}
              >
                repoflow.web.id • @rhmt-ofc
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                color: '#10b981',
                padding: '3px 8px',
                borderRadius: 6,
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              24 REPOSITORIES
            </span>
          </div>

          {/* Authentic Real Mobile Screenshot */}
          <div
            style={{
              width: '100%',
              height: 540,
              borderRadius: 24,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#07090e',
              marginTop: 10,
            }}
          >
            <Img
              src={staticFile('assets/repoflow/real_mobile_dashboard.png')}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Floating Verified Solution Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: -18,
              backgroundColor: '#07090e',
              border: '2px solid #38bdf8',
              borderRadius: 24,
              padding: '8px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.45)',
            }}
          >
            <span style={{color: '#38bdf8', fontSize: 16, fontWeight: 900}}>✓</span>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 14,
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '0.04em',
              }}
            >
              SOLUSI REPOFLOW: 100% DI BROWSER HP
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 2: UNPACK (CLEAN LIGHT STUDIO)
   Ekstraksi Memori Klien Instan Tanpa Server Pihak Ketiga (JSZip Worker)
   ========================================================================= */
export const RepoFlowUnpackScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const benchIn = expoIn(frame, 12, 14);
  const pillsIn = expoIn(frame, 22, 14);

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

      {/* Main Visual Stage (Authentic RepoFlow Upload Workbench) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
          width: '100%',
          maxWidth: 920,
        }}
      >
        {/* Real Upload Workbench Card */}
        <div
          style={{
            opacity: benchIn,
            transform: `translateY(${(1 - benchIn) * 18}px)`,
            width: '100%',
            backgroundColor: '#ffffff',
            border: '2.5px solid rgba(2, 132, 199, 0.45)',
            borderRadius: 28,
            padding: 16,
            boxShadow: '0 24px 60px rgba(2, 132, 199, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Header bar of workbench */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px 14px',
              borderBottom: '1.5px solid #e2e8f0',
              marginBottom: 12,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#0284c7',
                }}
              />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                RepoFlow Upload Engine • JSZip Worker
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                color: '#059669',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '4px 12px',
                borderRadius: 8,
              }}
            >
              LATENCY: 48ms
            </span>
          </div>

          {/* Authentic Real Upload Workbench Screenshot */}
          <div
            style={{
              width: '100%',
              height: 480,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#090d16',
            }}
          >
            <Img
              src={staticFile('assets/repoflow/crop_upload_workbench.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
        </div>

        {/* Technical Guarantee Badges */}
        <div
          style={{
            opacity: pillsIn,
            transform: `translateY(${(1 - pillsIn) * 14}px)`,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
                fontWeight: 900,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ZIP
            </div>
            <div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#0f172a'}}>
                Zip-Slip Guard
              </div>
              <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b', fontWeight: 600}}>
                Traversal Path Blocked
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                fontWeight: 900,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              RAM
            </div>
            <div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#0f172a'}}>
                0 Server Relay
              </div>
              <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b', fontWeight: 600}}>
                100% In-Memory RAM
              </div>
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 3: ATOMIC TREE (DARK STUDIO SLATE)
   Inspeksi Repo & Real Code Preview + 1-Ref Atomic Git Commit
   ========================================================================= */
export const RepoFlowTreeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const inspectorIn = expoIn(frame, 12, 14);
  const flowIn = expoIn(frame, 24, 14);

  const floatGlow = Math.sin(frame * 0.1) * 0.1 + 0.9;

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

      {/* Main Visual Stage (Authentic RepoFlow File Tree & Real Code Editor) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
          maxWidth: 920,
        }}
      >
        {/* REAL REPO INSPECTOR WORKSPACE CARD */}
        <div
          style={{
            opacity: inspectorIn,
            transform: `translateY(${(1 - inspectorIn) * 20}px)`,
            width: '100%',
            backgroundColor: '#0c1017',
            border: '2.5px solid #38bdf8',
            borderRadius: 28,
            padding: 16,
            boxShadow: `0 24px 60px rgba(14, 165, 233, ${0.28 * floatGlow}), 0 0 0 1px rgba(56, 189, 248, 0.3)`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top Bar with real repo info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px 14px',
              borderBottom: '1.5px solid rgba(255, 255, 255, 0.1)',
              marginBottom: 12,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981'}} />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#38bdf8',
                }}
              >
                @rhmt-ofc / e-rekap
              </span>
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 13,
                  color: '#94a3b8',
                  padding: '3px 8px',
                  borderRadius: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                package.json
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                color: REPO_TOKENS.mint,
                padding: '4px 10px',
                borderRadius: 6,
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
              }}
            >
              REALTIME CODE PREVIEW
            </span>
          </div>

          {/* Authentic Real Repo & Code Screenshot */}
          <div
            style={{
              width: '100%',
              height: 480,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#07090e',
            }}
          >
            <Img
              src={staticFile('assets/repoflow/crop_repo_inspector.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
        </div>

        {/* Git Tree Telemetry Cards */}
        <div
          style={{
            opacity: flowIn,
            transform: `translateY(${(1 - flowIn) * 16}px)`,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: '#0c1017',
              border: '1.5px solid rgba(56, 189, 248, 0.35)',
              borderRadius: 18,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#38bdf8'}}>
              1-Ref Atomic Push
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#94a3b8', fontWeight: 500}}>
              Git Trees API: Zero Broken Commit
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#0c1017',
              border: '1.5px solid rgba(16, 185, 129, 0.35)',
              borderRadius: 18,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#10b981'}}>
              Blob SHA-1 Pre-Compute
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#94a3b8', fontWeight: 500}}>
              Direct Ingest: Zero Payload Overhead
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
  const dialogIn = expoIn(frame, 12, 14);
  const featuresIn = expoIn(frame, 24, 14);

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

      {/* Main Visual Stage (Authentic RepoFlow Vault Modal Dialog) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
          maxWidth: 900,
        }}
      >
        {/* Real Vault Dialog Card */}
        <div
          style={{
            opacity: dialogIn,
            transform: `translateY(${(1 - dialogIn) * 18}px)`,
            width: '100%',
            backgroundColor: '#ffffff',
            border: '2.5px solid rgba(2, 132, 199, 0.45)',
            borderRadius: 28,
            padding: 16,
            boxShadow: '0 24px 60px rgba(2, 132, 199, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Header of Dialog */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 14px 14px',
              borderBottom: '1.5px solid #e2e8f0',
              marginBottom: 12,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#0284c7'}} />
              <span style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#0f172a'}}>
                RepoFlow Vault Dialog • @rhmt-ofc
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 13,
                fontWeight: 800,
                color: '#0284c7',
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                border: '1px solid rgba(2, 132, 199, 0.3)',
              }}
            >
              AES-GCM 256
            </span>
          </div>

          {/* Authentic Real Vault Modal Screenshot */}
          <div
            style={{
              width: '100%',
              height: 480,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#0c1017',
            }}
          >
            <Img
              src={staticFile('assets/repoflow/crop_vault_dialog.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>

        {/* Security Telemetry Points */}
        <div
          style={{
            opacity: featuresIn,
            transform: `translateY(${(1 - featuresIn) * 14}px)`,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4}}>
              Non-Extractable Key
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b', fontWeight: 500}}>
              DevTools browser tidak bisa mengekstrak kunci privat token.
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 4}}>
              IndexedDB Isolated
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b', fontWeight: 500}}>
              Token hanya tersimpan di memori perangkat lokal Anda.
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 5: BRAND & ECOSYSTEM (DARK STUDIO SLATE)
   Karya Orisinal Rahmat • RHMT OFC | repoflow.web.id | rhmt.biz.id
   ========================================================================= */
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
