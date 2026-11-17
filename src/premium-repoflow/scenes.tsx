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
   SCENE 1: HOOK (DARK BLUEPRINT)
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
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 14,
            fontWeight: 700,
            color: REPO_TOKENS.sky,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          [ GITHUB WORKFLOW BOTTLENECK ]
        </div>
        <FigmaAnchorFrame tag="DEVELOPER PAIN POINT" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Mau Push ZIP ke GitHub, <br />
            <span style={{color: '#38bdf8'}}>Malah Sering Gagal & Ribet?</span>
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
          position: 'relative',
        }}
      >
        {/* Pain Point Banner */}
        <div
          style={{
            width: '100%',
            opacity: card1In,
            transform: `translateY(${(1 - card1In) * 16}px)`,
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
            borderRadius: 16,
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
                <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Web GitHub Standar
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 14,
                  color: '#cbd5e1',
                }}
              >
                Batas 100 file, tidak bisa ekstrak ZIP, rawan broken state di HP.
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 11,
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.5)',
            }}
          >
            TERBATAS
          </span>
        </div>

        {/* REAL REPOFLOW MOBILE MOCKUP HERO */}
        <div
          style={{
            opacity: heroIn,
            transform: `translateY(${(1 - heroIn) * 24 + floatY}px)`,
            width: '100%',
            maxWidth: 580,
            backgroundColor: '#0c1017',
            border: '2px solid rgba(56, 189, 248, 0.5)',
            borderRadius: 28,
            padding: 12,
            boxShadow: '0 24px 60px rgba(14, 165, 233, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.2)',
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
              padding: '6px 14px 10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#eab308'}} />
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981'}} />
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '0.04em',
              }}
            >
              repoflow.web.id • @rhmt-ofc
            </span>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 10,
                color: '#10b981',
                padding: '2px 6px',
                borderRadius: 4,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
              }}
            >
              24 REPOS
            </span>
          </div>

          {/* Authentic Real Mobile Screenshot */}
          <div
            style={{
              width: '100%',
              height: 440,
              borderRadius: 18,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#07090e',
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
              bottom: -14,
              backgroundColor: '#07090e',
              border: '1.5px solid #38bdf8',
              borderRadius: 20,
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(56, 189, 248, 0.4)',
            }}
          >
            <span style={{color: '#38bdf8', fontSize: 13, fontWeight: 800}}>✓</span>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                color: '#f8fafc',
                letterSpacing: '0.04em',
              }}
            >
              SOLUSI REPOFLOW: 100% DI BROWSER
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 2: UNPACK (CRISP LIGHT)
   Ekstraksi Memori Klien Instan di Browser (JSZip Worker, Zero Backend)
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
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            color: REPO_TOKENS.skyDark,
            letterSpacing: '0.08em',
            marginBottom: 6,
          }}
        >
          [ ZERO BACKEND EXTRACTION ]
        </div>
        <FigmaAnchorFrame tag="RAM BROWSER STREAM" borderColor="#0284c7">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#0f172a',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Ekstrak Ratusan File <br />
            <span style={{color: '#0284c7'}}>Langsung di RAM Browser!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Workbench Visualizer featuring Authentic RepoFlow Upload Engine */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* Real Upload Workbench Card */}
        <div
          style={{
            opacity: benchIn,
            transform: `translateY(${(1 - benchIn) * 18}px)`,
            width: '100%',
            backgroundColor: '#ffffff',
            border: '2px solid rgba(2, 132, 199, 0.4)',
            borderRadius: 22,
            padding: 12,
            boxShadow: '0 16px 40px rgba(2, 132, 199, 0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Header bar of workbench */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 12px 10px',
              borderBottom: '1px solid #e2e8f0',
              marginBottom: 10,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#0284c7',
                }}
              />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                RepoFlow Upload Engine • JSZip Worker
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 800,
                color: '#059669',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '3px 8px',
                borderRadius: 6,
              }}
            >
              LATENCY: 48ms
            </span>
          </div>

          {/* Authentic Real Upload Workbench Screenshot */}
          <div
            style={{
              width: '100%',
              height: 380,
              borderRadius: 14,
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
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 14,
              padding: '12px 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0284c7',
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              ZIP
            </div>
            <div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 700, color: '#0f172a'}}>
                Zip-Slip Guard
              </div>
              <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#64748b'}}>
                Traversal Path Blocked
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 14,
              padding: '12px 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              RAM
            </div>
            <div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 700, color: '#0f172a'}}>
                0 Server Relay
              </div>
              <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#64748b'}}>
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
   SCENE 3: TREE & CODE INSPECTOR (DARK CYBER BLUEPRINT)
   Inspeksi Repo Nyata & Preview Kode Berkas + 1-Ref Atomic Git Tree
   ========================================================================= */
export const RepoFlowTreeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const inspectorIn = expoIn(frame, 12, 14);
  const flowIn = expoIn(frame, 24, 14);

  const floatGlow = Math.sin(frame * 0.1) * 0.1 + 0.9;

  return (
    <RepoFlowShell mode="dark" activeStep={2} subtitle="ATOMIC GIT TREE & CODE INSPECTION">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            color: REPO_TOKENS.sky,
            letterSpacing: '0.08em',
            marginBottom: 6,
          }}
        >
          [ AUTHENTIC REPO REVIEW & ATOMIC COMMIT ]
        </div>
        <FigmaAnchorFrame tag="LIVE FILE INSPECTION" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Inspeksi Repo & Baca Kode, <br />
            <span style={{color: '#38bdf8'}}>Plus Commit 1-Ref Atomik!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage: Authentic RepoFlow File Tree & Real Code Editor */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
        }}
      >
        {/* REAL REPO INSPECTOR WORKSPACE CARD */}
        <div
          style={{
            opacity: inspectorIn,
            transform: `translateY(${(1 - inspectorIn) * 20}px)`,
            width: '100%',
            backgroundColor: '#0c1017',
            border: '2px solid #38bdf8',
            borderRadius: 22,
            padding: 12,
            boxShadow: `0 20px 50px rgba(14, 165, 233, ${0.25 * floatGlow}), 0 0 0 1px rgba(56, 189, 248, 0.3)`,
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
              padding: '6px 12px 10px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: 8,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981'}} />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#38bdf8',
                }}
              >
                @rhmt-ofc / e-rekap
              </span>
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 10,
                  color: '#94a3b8',
                  padding: '2px 6px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                }}
              >
                package.json
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 10,
                fontWeight: 800,
                color: REPO_TOKENS.mint,
                padding: '2px 8px',
                borderRadius: 4,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
              }}
            >
              REALTIME CODE PREVIEW
            </span>
          </div>

          {/* Authentic Real Repo & Code Screenshot */}
          <div
            style={{
              width: '100%',
              height: 380,
              borderRadius: 14,
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

        {/* 3-Step Atomic Git Engine Pipeline */}
        <div
          style={{
            opacity: flowIn,
            transform: `translateY(${(1 - flowIn) * 14}px)`,
            width: '100%',
            backgroundColor: 'rgba(14, 165, 233, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 16,
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 800, color: '#38bdf8'}}>
              Parallel Blobs
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#94a3b8'}}>
              SHA-1 Kalkulasi
            </div>
          </div>
          <div style={{color: '#38bdf8', fontWeight: 800}}>→</div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 800, color: '#ffffff'}}>
              1 Git Tree Utuh
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#94a3b8'}}>
              Arsitektur Pohon
            </div>
          </div>
          <div style={{color: '#38bdf8', fontWeight: 800}}>→</div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 800, color: REPO_TOKENS.mint}}>
              Atomic Commit
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#94a3b8'}}>
              0 Broken State
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 4: VAULT (CRISP LIGHT)
   Enkripsi Token Web Crypto AES-256 Non-Extractable & Zero Server Leak
   ========================================================================= */
export const RepoFlowVaultScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const modalIn = expoIn(frame, 12, 14);
  const featuresIn = expoIn(frame, 22, 14);

  return (
    <RepoFlowShell mode="light" activeStep={3} subtitle="CLIENT-SIDE SECURITY VAULT">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            color: REPO_TOKENS.skyDark,
            letterSpacing: '0.08em',
            marginBottom: 6,
          }}
        >
          [ MILITARY GRADE VAULT ]
        </div>
        <FigmaAnchorFrame tag="WEB CRYPTO API" borderColor="#0284c7">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#0f172a',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Enkripsi Token Lokal <br />
            <span style={{color: '#0284c7'}}>AES-GCM 256-Bit Non-Extractable!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage: Real Vault Dialog */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
        }}
      >
        {/* Real Vault Modal Screenshot Frame */}
        <div
          style={{
            opacity: modalIn,
            transform: `translateY(${(1 - modalIn) * 18}px)`,
            width: '100%',
            maxWidth: 620,
            backgroundColor: '#ffffff',
            border: '2px solid rgba(2, 132, 199, 0.4)',
            borderRadius: 22,
            padding: 12,
            boxShadow: '0 16px 40px rgba(2, 132, 199, 0.15)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 12px 10px',
              borderBottom: '1px solid #e2e8f0',
              marginBottom: 8,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <span style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0284c7'}} />
              <span style={{fontFamily: REPO_FONT.mono, fontSize: 12, fontWeight: 700, color: '#0f172a'}}>
                RepoFlow Vault Dialog • @rhmt-ofc
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 10,
                fontWeight: 800,
                color: '#0284c7',
                padding: '2px 8px',
                borderRadius: 4,
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
              }}
            >
              AES-GCM 256
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: 380,
              borderRadius: 14,
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
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '12px 16px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2}}>
              Non-Extractable Key
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#64748b'}}>
              DevTools browser tidak bisa mengekstrak kunci privat token.
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '12px 16px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 2}}>
              IndexedDB Isolated
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 11, color: '#64748b'}}>
              Token hanya tersimpan di memori perangkat lokal Anda.
            </div>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 5: BRAND & ECOSYSTEM (DARK SLEEK THEME)
   Karya Orisinal Rahmat • RHMT OFC | repoflow.web.id | rhmt.biz.id
   ========================================================================= */
export const RepoFlowBrandScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const cardIn = expoIn(frame, 12, 14);
  const badgesIn = expoIn(frame, 24, 14);
  const ctaIn = expoIn(frame, 34, 14);

  const pulse = Math.sin(frame * 0.12) * 0.06 + 1;

  return (
    <RepoFlowShell mode="dark" activeStep={4} subtitle="ECOSYSTEM & ORIGINAL BRANDING">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            color: REPO_TOKENS.sky,
            letterSpacing: '0.08em',
            marginBottom: 6,
          }}
        >
          [ INDEPENDENT TECH CREATOR ]
        </div>
        <FigmaAnchorFrame tag="PRODUKSI ASLI INDONESIA" borderColor="#38bdf8">
          <h1
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Karya Orisinal Developer <br />
            <span style={{color: '#38bdf8'}}>Rahmat • RHMT OFC</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Visual Stage: Official Portfolio Integration */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
        }}
      >
        {/* Creator Identity Card */}
        <div
          style={{
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * 18}px)`,
            width: '100%',
            backgroundColor: 'rgba(14, 165, 233, 0.08)',
            border: '2px solid #38bdf8',
            borderRadius: 24,
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 20px 50px rgba(14, 165, 233, 0.25)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <Img
              src={staticFile('assets/repoflow/pp-dev.png')}
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                border: '2.5px solid #38bdf8',
                boxShadow: '0 8px 24px rgba(56, 189, 248, 0.4)',
              }}
            />
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4}}>
                <span
                  style={{
                    fontFamily: REPO_FONT.display,
                    fontSize: 26,
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  Rahmat
                </span>
                <span
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 6,
                    backgroundColor: '#38bdf8',
                    color: '#07090e',
                  }}
                >
                  RHMT OFC
                </span>
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 15,
                  color: '#94a3b8',
                  lineHeight: 1.3,
                }}
              >
                Kreator Resmi & Architect di Balik <br />
                <span style={{color: '#38bdf8', fontWeight: 700}}>rhmt.biz.id</span> &{' '}
                <span style={{color: '#38bdf8', fontWeight: 700}}>repoflow.web.id</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                color: REPO_TOKENS.mint,
                padding: '4px 10px',
                borderRadius: 6,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              VERIFIED CREATOR
            </span>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 11, color: '#64748b'}}>
              @rhmt-ofc • GitHub
            </span>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div
          style={{
            opacity: badgesIn,
            transform: `translateY(${(1 - badgesIn) * 14}px)`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {['Antigravity CLI', 'React 19', 'TypeScript', 'Google Gemini AI', 'GitHub API'].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#cbd5e1',
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Interactive CTA Button */}
        <div
          style={{
            opacity: ctaIn,
            transform: `scale(${pulse})`,
            marginTop: 8,
          }}
        >
          <div
            style={{
              backgroundColor: '#38bdf8',
              color: '#07090e',
              fontFamily: REPO_FONT.display,
              fontSize: 22,
              fontWeight: 800,
              padding: '16px 36px',
              borderRadius: 16,
              boxShadow: '0 12px 36px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              letterSpacing: '-0.01em',
            }}
          >
            <span>Buka repoflow.web.id Sekarang!</span>
            <span style={{fontSize: 24}}>→</span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};
