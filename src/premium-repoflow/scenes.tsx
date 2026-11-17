import React from 'react';
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {FigmaAnchorFrame, RepoFlowShell} from './shell';
import {REPO_FONT, REPO_TOKENS} from './tokens';

// Helper for smooth expo entry
const expoIn = (f: number, delay = 0, dur = 14) => {
  return interpolate(f - delay, [0, dur], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/* =========================================================================
   SCENE 1: HOOK (DARK BLUEPRINT)
   Masalah Push ZIP ke GitHub vs Solusi Nyata RepoFlow
   ========================================================================= */
export const RepoFlowHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = expoIn(frame, 4, 14);
  const problemIn = expoIn(frame, 12, 12);
  const heroIn = spring({
    frame: frame - 18,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.9},
  });

  const floatY = Math.sin(frame * 0.08) * 6;

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
        <div
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
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
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Mau Push Project ke GitHub, <br />
            <span style={{color: '#38bdf8'}}>Dibatasi 100 File & Sering Macet?</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Limitation Callout Banner */}
      <div
        style={{
          opacity: problemIn,
          transform: `translateY(${(1 - problemIn) * 12}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1.5px solid rgba(239, 68, 68, 0.45)',
          borderRadius: 14,
          padding: '12px 20px',
          marginBottom: 20,
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
              <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 16,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              Web GitHub Standar
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.sans,
                fontSize: 13,
                color: '#cbd5e1',
              }}
            >
              Batas 100 berkas, dilarang upload ZIP, rawan broken commit.
            </div>
          </div>
        </div>
        <span
          style={{
            fontFamily: REPO_FONT.mono,
            fontSize: 12,
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

      {/* REAL REPOFLOW SCREENSHOT HERO SHOWCASE */}
      <div
        style={{
          opacity: Math.max(0, heroIn),
          transform: `translateY(${(1 - heroIn) * 24 + floatY}px) scale(${0.96 + heroIn * 0.04})`,
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          backgroundColor: '#0a0e17',
          border: '2px solid rgba(56, 189, 248, 0.55)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2)',
        }}
      >
        {/* Window Chrome Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ef4444'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#eab308'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                color: '#94a3b8',
                marginLeft: 12,
                fontWeight: 600,
              }}
            >
              https://www.repoflow.web.id
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              padding: '3px 10px',
              borderRadius: 12,
              border: '1px solid rgba(56, 189, 248, 0.35)',
            }}
          >
            <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38bdf8'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 800,
                color: '#38bdf8',
              }}
            >
              SOLUSI RESMI REPOFLOW
            </span>
          </div>
        </div>

        {/* Real Screenshot Image */}
        <div style={{position: 'relative', width: '100%', height: 530, overflow: 'hidden'}}>
          <Img
            src={staticFile('assets/repoflow/desktop_real.png')}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: 'scale(1.02)',
              transformOrigin: 'top center',
            }}
          />

          {/* Floating Feature Highlight Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: 'rgba(7, 10, 15, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(56, 189, 248, 0.45)',
              borderRadius: 16,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Img
                src={staticFile('assets/repoflow/icon.png')}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.display,
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  RepoFlow Web Client
                </div>
                <div
                  style={{
                    fontFamily: REPO_FONT.sans,
                    fontSize: 12,
                    color: '#94a3b8',
                  }}
                >
                  Drag & Drop ZIP · RAM Unpack · Commit Atomik
                </div>
              </div>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: REPO_TOKENS.mint,
                color: '#07090e',
              }}
            >
              100% BROWSER
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 2: UNPACK (CRISP LIGHT)
   Ekstraksi Memori Klien Instan di Browser (Real Workspace UI)
   ========================================================================= */
export const RepoFlowUnpackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = expoIn(frame, 4, 14);
  const cardIn = spring({
    frame: frame - 12,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.9},
  });

  const floatY = Math.sin(frame * 0.08) * 5;

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
            marginBottom: 8,
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
            Ekstrak Ratusan Berkas ZIP, <br />
            <span style={{color: '#0284c7'}}>Langsung di RAM Browser!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* REAL WORKSPACE SCREENSHOT FRAME */}
      <div
        style={{
          opacity: Math.max(0, cardIn),
          transform: `translateY(${(1 - cardIn) * 24 + floatY}px) scale(${0.96 + cardIn * 0.04})`,
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          backgroundColor: '#0a0e17',
          border: '2px solid rgba(2, 132, 199, 0.45)',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 35px rgba(2, 132, 199, 0.15)',
        }}
      >
        {/* Window Chrome Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ef4444'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#eab308'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                color: '#cbd5e1',
                marginLeft: 12,
                fontWeight: 600,
              }}
            >
              RepoFlow — Client-Side Memory Extraction
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              padding: '3px 10px',
              borderRadius: 12,
              border: '1px solid rgba(2, 132, 199, 0.45)',
            }}
          >
            <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38bdf8'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 800,
                color: '#38bdf8',
              }}
            >
              LATENCY: 48MS
            </span>
          </div>
        </div>

        {/* Real App Screenshot */}
        <div style={{position: 'relative', width: '100%', height: 540, overflow: 'hidden'}}>
          <Img
            src={staticFile('assets/repoflow/workspace_real.png')}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: 'scale(1.03)',
              transformOrigin: 'top center',
            }}
          />

          {/* Interactive Floating Metrics */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(2, 132, 199, 0.45)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: 'rgba(2, 132, 199, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Zip-Slip & Traversal Guard: PASS
                </div>
                <div style={{fontFamily: REPO_FONT.sans, fontSize: 12, color: '#94a3b8'}}>
                  JSZip in Web Worker · RAM buffer tanpa server pihak ketiga
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: '#0284c7',
                color: '#ffffff',
              }}
            >
              MEMORI AMAN
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 3: TREE (DARK BLUEPRINT)
   Atomic Git Tree Push & Zero Broken State (Real Architecture Diagram)
   ========================================================================= */
export const RepoFlowTreeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = expoIn(frame, 4, 14);
  const cardIn = spring({
    frame: frame - 14,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.9},
  });

  const floatY = Math.sin(frame * 0.08) * 6;

  return (
    <RepoFlowShell mode="dark" activeStep={2} subtitle="ATOMIC GIT TREE ARCHITECTURE">
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
            marginBottom: 8,
          }}
        >
          [ ATOMIC BATCH ENGINE ]
        </div>
        <FigmaAnchorFrame tag="ZERO BROKEN STATE" borderColor="#38bdf8">
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
            Bukan Satu File Satu Commit, <br />
            <span style={{color: '#38bdf8'}}>Satu Git Tree Utuh Sekaligus!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* REAL ARCHITECTURE DIAGRAM SCREENSHOT */}
      <div
        style={{
          opacity: Math.max(0, cardIn),
          transform: `translateY(${(1 - cardIn) * 24 + floatY}px) scale(${0.96 + cardIn * 0.04})`,
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          backgroundColor: '#070a0f',
          border: '2px solid rgba(56, 189, 248, 0.55)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2)',
        }}
      >
        {/* Window Chrome Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ef4444'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#eab308'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                color: '#94a3b8',
                marginLeft: 12,
                fontWeight: 600,
              }}
            >
              RepoFlow — Arsitektur Pohon Git Atomik
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              padding: '3px 10px',
              borderRadius: 12,
              border: '1px solid rgba(16, 185, 129, 0.35)',
            }}
          >
            <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 800,
                color: '#10b981',
              }}
            >
              1 REST CALL ONLY
            </span>
          </div>
        </div>

        {/* Real Architecture Diagram Image */}
        <div style={{position: 'relative', width: '100%', height: 540, overflow: 'hidden'}}>
          <Img
            src={staticFile('assets/repoflow/arch_real.png')}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: 'scale(1.08)',
              transformOrigin: 'top center',
            }}
          />

          {/* Floating Callout Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: 'rgba(7, 10, 15, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(16, 185, 129, 0.55)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: 'rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Nol Risiko Broken State
                </div>
                <div style={{fontFamily: REPO_FONT.sans, fontSize: 12, color: '#94a3b8'}}>
                  Parallel Blobs → Single Git Tree SHA → Atomic Ref Update
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: REPO_TOKENS.mint,
                color: '#07090e',
              }}
            >
              ATOMIC PUSH
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 4: VAULT (CRISP LIGHT SECURITY)
   Enkripsi Token Web Crypto AES-256 Non-Extractable (Real Protocol UI)
   ========================================================================= */
export const RepoFlowVaultScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = expoIn(frame, 4, 14);
  const cardIn = spring({
    frame: frame - 14,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.9},
  });

  const floatY = Math.sin(frame * 0.08) * 5;

  return (
    <RepoFlowShell mode="light" activeStep={3} subtitle="MILITARY-GRADE CLIENT SECURITY">
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
            marginBottom: 8,
          }}
        >
          [ LOCAL WEB CRYPTO API ]
        </div>
        <FigmaAnchorFrame tag="MILITARY GRADE CIPHER" borderColor="#0284c7">
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
            Token Akses GitHub Kamu, <br />
            <span style={{color: '#0284c7'}}>AES-GCM 256-Bit Non-Extractable!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* REAL PROTOCOL SCREENSHOT FRAME */}
      <div
        style={{
          opacity: Math.max(0, cardIn),
          transform: `translateY(${(1 - cardIn) * 24 + floatY}px) scale(${0.96 + cardIn * 0.04})`,
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          backgroundColor: '#0a0e17',
          border: '2px solid rgba(2, 132, 199, 0.45)',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 35px rgba(2, 132, 199, 0.15)',
        }}
      >
        {/* Window Chrome Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ef4444'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#eab308'}} />
            <div style={{width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10b981'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                color: '#cbd5e1',
                marginLeft: 12,
                fontWeight: 600,
              }}
            >
              RepoFlow — Protokol Keamanan & Brankas Token
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              padding: '3px 10px',
              borderRadius: 12,
              border: '1px solid rgba(2, 132, 199, 0.45)',
            }}
          >
            <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38bdf8'}} />
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                fontWeight: 800,
                color: '#38bdf8',
              }}
            >
              AES-GCM 256
            </span>
          </div>
        </div>

        {/* Real Protocol Screenshot */}
        <div style={{position: 'relative', width: '100%', height: 540, overflow: 'hidden'}}>
          <Img
            src={staticFile('assets/repoflow/protocol_real.png')}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: 'scale(1.04)',
              transformOrigin: 'top center',
            }}
          />

          {/* Floating Security Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.94)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(2, 132, 199, 0.45)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: 'rgba(2, 132, 199, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#38bdf8" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Non-Extractable Key di DevTools
                </div>
                <div style={{fontFamily: REPO_FONT.sans, fontSize: 12, color: '#94a3b8'}}>
                  Hanya tersimpan di IndexedDB lokal perangkat · Zero Telemetry
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 8,
                backgroundColor: '#0284c7',
                color: '#ffffff',
              }}
            >
              TERPROTEKSI
            </span>
          </div>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 5: BRAND & FINALE (DARK SPACE)
   Karya Orisinal RHMT OFC & Call to Action
   ========================================================================= */
export const RepoFlowBrandScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = expoIn(frame, 4, 14);
  const cardIn = spring({
    frame: frame - 14,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.9},
  });

  const pulse = Math.sin(frame * 0.1) * 0.04 + 1;

  return (
    <RepoFlowShell mode="dark" activeStep={4} subtitle="ORIGINAL CREATION & ECOSYSTEM">
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
            fontSize: 13,
            fontWeight: 700,
            color: REPO_TOKENS.sky,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          [ OFFICIAL RELEASE ]
        </div>
        <FigmaAnchorFrame tag="SOLO DEVELOPER" borderColor="#38bdf8">
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
            Karya Orisinal Developer <br />
            <span style={{color: '#38bdf8'}}>Rahmat (RHMT ofc)</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* CREATOR SHOWCASE & PORTFOLIO CARD */}
      <div
        style={{
          opacity: Math.max(0, cardIn),
          transform: `translateY(${(1 - cardIn) * 24}px)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        {/* Main Developer Identity Card */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid rgba(56, 189, 248, 0.45)',
            borderRadius: 22,
            padding: '24px 28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div
              style={{
                position: 'relative',
                width: 90,
                height: 90,
                borderRadius: 22,
                overflow: 'hidden',
                border: '2px solid #38bdf8',
                boxShadow: '0 8px 24px rgba(56, 189, 248, 0.35)',
              }}
            >
              <Img
                src={staticFile('assets/repoflow/pp-dev.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

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
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                  }}
                >
                  RHMT OFC
                </span>
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 14,
                  color: '#94a3b8',
                  lineHeight: 1.3,
                  marginBottom: 6,
                }}
              >
                Developer & Creator of RepoFlow Client Suite
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 13,
                  color: '#38bdf8',
                  fontWeight: 600,
                }}
              >
                https://rhmt.biz.id
              </div>
            </div>
          </div>

          <Img
            src={staticFile('assets/repoflow/icon.png')}
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 8px 24px rgba(56, 189, 248, 0.3)',
            }}
          />
        </div>

        {/* Tech Stack Chips */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'space-between',
          }}
        >
          {[
            {label: 'React 19', note: 'Frontend Engine'},
            {label: 'TypeScript', note: 'Strict Type Safety'},
            {label: 'Tailwind CSS', note: 'Design Tokens'},
            {label: 'Web Crypto', note: 'AES-GCM 256'},
          ].map((item) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                backgroundColor: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 14,
                padding: '12px 14px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: 2,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 11,
                  color: '#64748b',
                }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Launch Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            marginTop: 6,
            backgroundColor: '#0284c7',
            backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            borderRadius: 18,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            boxShadow: '0 12px 35px rgba(2, 132, 199, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontFamily: REPO_FONT.display,
              fontSize: 20,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            Buka repoflow.web.id Sekarang!
          </span>
        </div>
      </div>
    </RepoFlowShell>
  );
};
