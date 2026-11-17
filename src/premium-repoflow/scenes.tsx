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

// Helper for smooth spring/expo entry
const expoIn = (f: number, delay = 0, dur = 14) => {
  return interpolate(f - delay, [0, dur], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

/* =========================================================================
   SCENE 1: HOOK (DARK BLUEPRINT)
   Masalah Push ZIP & Limit Web GitHub vs RepoFlow
   ========================================================================= */
export const RepoFlowHookScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const card1In = expoIn(frame, 14, 14);
  const card2In = expoIn(frame, 24, 14);
  const vsIn = expoIn(frame, 20, 10);

  const bounce = Math.sin(frame * 0.1) * 4;

  return (
    <RepoFlowShell mode="dark" activeStep={0} subtitle="PROBLEM & PARADIGM SHIFT">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 32,
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
              fontSize: 48,
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

      {/* Main Comparison Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
        }}
      >
        {/* CARD 1: Web GitHub Biasa (The Problem) */}
        <div
          style={{
            opacity: card1In,
            transform: `translateY(${(1 - card1In) * 20}px)`,
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
            borderRadius: 18,
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
                <path d="M12 8v5M12 16h.01" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: 4,
                }}
              >
                Web GitHub Standar
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 15,
                  color: '#cbd5e1',
                  lineHeight: 1.3,
                }}
              >
                Limit drag & drop file, tidak bisa ekstrak ZIP, rawan broken state.
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              fontWeight: 800,
              padding: '6px 12px',
              borderRadius: 8,
              backgroundColor: 'rgba(239, 68, 68, 0.25)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.5)',
            }}
          >
            TERBATAS
          </span>
        </div>

        {/* VS Indicator */}
        <div
          style={{
            opacity: vsIn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '-6px 0',
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: '#07090e',
              border: '1.5px solid #38bdf8',
              color: '#38bdf8',
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 14px',
              borderRadius: 20,
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.3)',
            }}
          >
            VS SOLUSI REPOFLOW
          </div>
        </div>

        {/* CARD 2: RepoFlow Modern Web Manager (The Solution) */}
        <div
          style={{
            opacity: card2In,
            transform: `translateY(${(1 - card2In) * 20 + bounce}px)`,
            backgroundColor: 'rgba(14, 165, 233, 0.12)',
            border: '2px solid #38bdf8',
            borderRadius: 20,
            padding: '26px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(14, 165, 233, 0.25)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Img
              src={staticFile('assets/repoflow/icon_3d_centered.png')}
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                boxShadow: '0 8px 20px rgba(56, 189, 248, 0.4)',
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#38bdf8',
                  marginBottom: 4,
                }}
              >
                RepoFlow Web Manager
              </div>
              <div
                style={{
                  fontFamily: REPO_FONT.sans,
                  fontSize: 15,
                  color: '#f8fafc',
                  lineHeight: 1.3,
                }}
              >
                Upload ZIP, ekstrak instan di RAM browser, commit atomik 100% rapi.
              </div>
            </div>
          </div>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: 8,
              backgroundColor: REPO_TOKENS.mint,
              color: '#07090e',
              boxShadow: `0 0 14px ${REPO_TOKENS.mint}`,
            }}
          >
            OTOMATIS
          </span>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 2: UNPACK (CRISP LIGHT)
   Ekstraksi Memori Klien Instan di Browser
   ========================================================================= */
export const RepoFlowUnpackScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const zipIn = expoIn(frame, 12, 14);
  const treeIn = expoIn(frame, 22, 14);
  const badgeIn = expoIn(frame, 32, 12);

  // Simulated unzip progress
  const progress = Math.min(100, Math.floor(interpolate(frame, [14, 38], [0, 100])));

  return (
    <RepoFlowShell mode="light" activeStep={1} subtitle="CLIENT-SIDE MEMORY EXTRACTION">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 28,
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

      {/* Interactive Unpacking Visualizer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* ZIP Drop Container */}
        <div
          style={{
            opacity: zipIn,
            transform: `translateY(${(1 - zipIn) * 18}px)`,
            backgroundColor: '#ffffff',
            border: '2px dashed #0284c7',
            borderRadius: 18,
            padding: '20px 24px',
            boxShadow: '0 8px 24px rgba(2, 132, 199, 0.08)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: 'rgba(2, 132, 199, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284c7',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  <path d="M14 2v6h6M10 12v6M10 15h4" stroke="#0284c7" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.mono,
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#0f172a',
                  }}
                >
                  project-source-code.zip
                </div>
                <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b'}}>
                  Ukuran: 34.6 MB · 128 Berkas Terdeteksi
                </div>
              </div>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 14,
                fontWeight: 800,
                color: '#0284c7',
              }}
            >
              {progress}%
            </span>
          </div>

          {/* Progress Bar Fill */}
          <div
            style={{
              marginTop: 14,
              height: 6,
              borderRadius: 3,
              backgroundColor: '#e2e8f0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#0284c7',
                borderRadius: 3,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>

        {/* Extracted File Tree Cards */}
        <div
          style={{
            opacity: treeIn,
            transform: `translateY(${(1 - treeIn) * 18}px)`,
            backgroundColor: '#ffffff',
            border: '1.5px solid rgba(15, 23, 42, 0.12)',
            borderRadius: 18,
            padding: '20px 24px',
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
          }}
        >
          <div
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              fontWeight: 700,
              color: '#64748b',
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>BERKAS HASIL EKSTRAKSI MEMORI</span>
            <span style={{color: REPO_TOKENS.mint}}>SANITY CHECK: OK</span>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            {[
              {name: 'src/App.tsx', type: 'TSX', size: '4.8 KB', color: '#0284c7'},
              {name: 'src/lib/github.ts', type: 'TS', size: '6.2 KB', color: '#0284c7'},
              {name: 'package.json', type: 'JSON', size: '1.1 KB', color: '#eab308'},
              {name: 'public/icon.png', type: 'PNG', size: '155 KB', color: '#10b981'},
            ].map((f, i) => (
              <div
                key={f.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span
                    style={{
                      fontFamily: REPO_FONT.mono,
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 4,
                      backgroundColor: f.color,
                      color: '#ffffff',
                    }}
                  >
                    {f.type}
                  </span>
                  <span
                    style={{
                      fontFamily: REPO_FONT.mono,
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    {f.name}
                  </span>
                </div>
                <span style={{fontFamily: REPO_FONT.mono, fontSize: 12, color: '#64748b'}}>
                  {f.size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Banner */}
        <div
          style={{
            opacity: badgeIn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 12,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            color: '#065f46',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="#059669"
              strokeWidth="2"
            />
          </svg>
          Zip-Slip Guard Terverifikasi: Blokir Traversal & File Berbahaya
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 3: TREE (DARK CYBER BLUEPRINT)
   Atomic Git Tree Push & Zero Broken State
   ========================================================================= */
export const RepoFlowTreeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const blobIn = expoIn(frame, 14, 14);
  const treeIn = expoIn(frame, 24, 14);
  const commitIn = expoIn(frame, 34, 14);
  const badgeIn = expoIn(frame, 44, 12);

  const pulse = Math.sin(frame * 0.15) * 0.08 + 1;

  return (
    <RepoFlowShell mode="dark" activeStep={2} subtitle="ATOMIC GIT TREE ARCHITECTURE">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 30,
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
          [ ATOMIC BATCH ENGINE ]
        </div>
        <FigmaAnchorFrame tag="ZERO BROKEN STATE" borderColor="#38bdf8">
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
            Bukan Satu File Satu Commit, <br />
            <span style={{color: '#38bdf8'}}>Dirakit Jadi 1 Tree Utuh!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Git Pipeline Interactive Graph */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Step 1: Git Blobs Paralel */}
        <div
          style={{
            opacity: blobIn,
            transform: `translateY(${(1 - blobIn) * 18}px)`,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 11,
                  fontWeight: 800,
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  padding: '4px 8px',
                  borderRadius: 6,
                }}
              >
                TAHAP 01
              </span>
              <span
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Paralel Git Blobs (`git.createBlob`)
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 13, color: REPO_TOKENS.mint}}>
              N Files Concurrency
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              color: '#94a3b8',
              backgroundColor: '#07090e',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid rgba(148, 163, 184, 0.15)',
            }}
          >
            SHA-1 Blobs: 4a9f2b8... · 7c1e90a... · d5f6b21... (Verified)
          </div>
        </div>

        {/* Connector Arrow */}
        <div style={{display: 'flex', justifyContent: 'center', margin: '-8px 0'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4v16m0 0l-5-5m5 5l5-5"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 2: Atomic Git Tree */}
        <div
          style={{
            opacity: treeIn,
            transform: `translateY(${(1 - treeIn) * 18}px)`,
            backgroundColor: 'rgba(14, 165, 233, 0.15)',
            border: '2px solid #38bdf8',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: '0 12px 30px rgba(14, 165, 233, 0.25)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 11,
                  fontWeight: 800,
                  backgroundColor: '#38bdf8',
                  color: '#07090e',
                  padding: '4px 8px',
                  borderRadius: 6,
                }}
              >
                TAHAP 02
              </span>
              <span
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#38bdf8',
                }}
              >
                Satu Git Tree Utuh (`git.createTree`)
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 13, color: '#f8fafc'}}>
              1 Single API Call
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              color: '#e2e8f0',
              lineHeight: 1.4,
            }}
          >
            Merakit seluruh struktur folder dan file menjadi pohon Git tunggal yang presisi.
          </div>
        </div>

        {/* Connector Arrow */}
        <div style={{display: 'flex', justifyContent: 'center', margin: '-8px 0'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4v16m0 0l-5-5m5 5l5-5"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 3: Atomic Branch Pointer Update */}
        <div
          style={{
            opacity: commitIn,
            transform: `translateY(${(1 - commitIn) * 18}px)`,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid rgba(16, 185, 129, 0.5)',
            borderRadius: 16,
            padding: '18px 22px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 11,
                  fontWeight: 800,
                  backgroundColor: REPO_TOKENS.mint,
                  color: '#07090e',
                  padding: '4px 8px',
                  borderRadius: 6,
                }}
              >
                TAHAP 03
              </span>
              <span
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 18,
                  fontWeight: 800,
                  color: REPO_TOKENS.mint,
                }}
              >
                Geser Pointer HEAD (`git.updateRef`)
              </span>
            </div>
            <span style={{fontFamily: REPO_FONT.mono, fontSize: 13, color: '#ffffff'}}>
              Atomic Shift
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: REPO_FONT.mono,
              fontSize: 12,
              color: '#cbd5e1',
            }}
          >
            Branch utama hanya bergeser jika seluruh berkas sukses diverifikasi tanpa cacat.
          </div>
        </div>

        {/* Impact Callout Pill */}
        <div
          style={{
            opacity: badgeIn,
            transform: `scale(${pulse})`,
            marginTop: 8,
            backgroundColor: '#07090e',
            border: `2px solid ${REPO_TOKENS.mint}`,
            borderRadius: 14,
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            boxShadow: `0 0 20px rgba(16, 185, 129, 0.35)`,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#10b981"
              strokeWidth="2.5"
            />
          </svg>
          <span
            style={{
              fontFamily: REPO_FONT.mono,
              fontSize: 14,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.04em',
            }}
          >
            HASIL: NOL RISIKO REPO SETENGAH TERISI / RUSAK!
          </span>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 4: VAULT (CRISP LIGHT SECURITY)
   Enkripsi Token Web Crypto AES-256 Non-Extractable
   ========================================================================= */
export const RepoFlowVaultScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const vaultIn = expoIn(frame, 12, 14);
  const tagsIn = expoIn(frame, 24, 14);
  const proofIn = expoIn(frame, 36, 12);

  const lockSpin = (frame * 1.5) % 360;

  return (
    <RepoFlowShell mode="light" activeStep={3} subtitle="MILITARY-GRADE CLIENT SECURITY">
      {/* Top Hook Statement */}
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 16}px)`,
          textAlign: 'center',
          marginBottom: 28,
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
          [ LOCAL WEB CRYPTO API ]
        </div>
        <FigmaAnchorFrame tag="AES-GCM 256-BIT" borderColor="#0284c7">
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
            Token GitHub Dienkripsi <br />
            <span style={{color: '#0284c7'}}>AES-256 Non-Extractable!</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Security Vault Card */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            opacity: vaultIn,
            transform: `translateY(${(1 - vaultIn) * 18}px)`,
            backgroundColor: '#ffffff',
            border: '2px solid #0284c7',
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: '0 16px 36px rgba(2, 132, 199, 0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              {/* Rotating Mechanical Lock Ring */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(2, 132, 199, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 4,
                    borderRadius: '50%',
                    border: '2px dashed #0284c7',
                    transform: `rotate(${lockSpin}deg)`,
                  }}
                />
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="#0284c7" strokeWidth="2.5" />
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="#0284c7" strokeWidth="2.5" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: REPO_FONT.display,
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: 4,
                  }}
                >
                  IndexedDB Secure Vault
                </div>
                <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, color: '#64748b'}}>
                  Schema: RepoFlowSecure.keys (Dexie v5)
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 12,
                fontWeight: 800,
                padding: '6px 12px',
                borderRadius: 8,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#059669',
                border: '1px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              ENCRYPTED AT REST
            </span>
          </div>

          {/* Cipher Display Box */}
          <div
            style={{
              marginTop: 18,
              backgroundColor: '#0f172a',
              borderRadius: 12,
              padding: '14px 18px',
              border: '1px solid #1e293b',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                color: '#94a3b8',
                marginBottom: 6,
              }}
            >
              <span>PAYLOAD DI DEVTOOLS BROWSER</span>
              <span style={{color: '#38bdf8'}}>AES-GCM CIPHERTEXT</span>
            </div>
            <div
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 13,
                fontWeight: 700,
                color: '#38bdf8',
                wordBreak: 'break-all',
              }}
            >
              v1:9bA7c1D4...:4f8e21aa78d91c2b045fe9873a2bc014
            </div>
          </div>
        </div>

        {/* 3 Pillar Security Features */}
        <div
          style={{
            opacity: tagsIn,
            transform: `translateY(${(1 - tagsIn) * 18}px)`,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: 14,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 15,
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: 4,
              }}
            >
              Non-Extractable Key
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b'}}>
              Kunci enkripsi tidak dapat diekspor keluar memori browser.
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: 14,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: REPO_FONT.display,
                fontSize: 15,
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: 4,
              }}
            >
              Zero Server Leakage
            </div>
            <div style={{fontFamily: REPO_FONT.sans, fontSize: 13, color: '#64748b'}}>
              Token tidak pernah dikirim ke database backend mana pun.
            </div>
          </div>
        </div>

        {/* DevTools Safe Proof */}
        <div
          style={{
            opacity: proofIn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '12px 18px',
            borderRadius: 12,
            backgroundColor: '#0f172a',
            color: '#f8fafc',
            fontFamily: REPO_FONT.mono,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.2)',
          }}
        >
          <span style={{color: '#38bdf8'}}>DEVTOOLS CONSOLE:</span>
          <span>CryptoKey.extractable === false (100% PRIVATE)</span>
        </div>
      </div>
    </RepoFlowShell>
  );
};

/* =========================================================================
   SCENE 5: BRAND & CALL TO ACTION (DARK FINALE)
   Karya Orisinal Rahmat / RHMT OFC & Link repoflow.web.id
   ========================================================================= */
export const RepoFlowBrandScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = expoIn(frame, 4, 12);
  const mockupIn = expoIn(frame, 12, 14);
  const cardIn = expoIn(frame, 22, 14);
  const ctaIn = expoIn(frame, 32, 12);

  const glowPulse = Math.sin(frame * 0.12) * 0.08 + 1;

  return (
    <RepoFlowShell mode="dark" activeStep={4} subtitle="OFFICIAL DEVELOPER CREATION">
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
            marginBottom: 6,
          }}
        >
          [ INDEPENDENT ENGINEER SPOTLIGHT ]
        </div>
        <FigmaAnchorFrame tag="RHMT OFC OFFICIAL" borderColor="#38bdf8">
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
            Dirancang Mandiri oleh <br />
            <span style={{color: '#38bdf8'}}>Rahmat · RHMT OFC</span>
          </h1>
        </FigmaAnchorFrame>
      </div>

      {/* Main Showcase Stage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {/* App Showcase Preview Card */}
        <div
          style={{
            opacity: mockupIn,
            transform: `translateY(${(1 - mockupIn) * 18}px)`,
            width: '100%',
            backgroundColor: '#0d131f',
            border: '2px solid rgba(56, 189, 248, 0.45)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#131c2e',
              borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308'}} />
              <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981'}} />
              <span
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 12,
                  color: '#94a3b8',
                  marginLeft: 8,
                }}
              >
                https://repoflow.web.id
              </span>
            </div>
            <span
              style={{
                fontFamily: REPO_FONT.mono,
                fontSize: 11,
                color: '#38bdf8',
                fontWeight: 700,
              }}
            >
              LIVE PRODUCTION
            </span>
          </div>

          <Img
            src={staticFile('assets/repoflow/real_rendered_app.png')}
            style={{
              width: '100%',
              height: 220,
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
        </div>

        {/* Creator Badges & Tech Stack */}
        <div
          style={{
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * 18}px)`,
            width: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            border: '1.5px solid rgba(148, 163, 184, 0.2)',
            borderRadius: 16,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                fontFamily: REPO_FONT.display,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              R
            </div>
            <div>
              <div
                style={{
                  fontFamily: REPO_FONT.display,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#ffffff',
                }}
              >
                Rahmat (rhmt ofc)
              </div>
              <div style={{fontFamily: REPO_FONT.mono, fontSize: 13, color: '#38bdf8'}}>
                Portfolio Resmi: rhmt.biz.id
              </div>
            </div>
          </div>

          <div style={{display: 'flex', gap: 6}}>
            {['React 19', 'TypeScript', 'Web Crypto'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: REPO_FONT.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 7px',
                  borderRadius: 6,
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action Pulse Button */}
        <div
          style={{
            opacity: ctaIn,
            transform: `scale(${glowPulse})`,
            width: '100%',
            backgroundColor: '#0ea5e9',
            borderRadius: 16,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            boxShadow: '0 0 35px rgba(14, 165, 233, 0.65)',
            border: '2px solid #ffffff',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
              letterSpacing: '0.02em',
            }}
          >
            Coba Sekarang: repoflow.web.id
          </span>
        </div>
      </div>
    </RepoFlowShell>
  );
};
