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
import {AgencyPresenterAnchor} from '../components/AgencyPresenterAnchor';
import {
  BendaBackground,
  BendaHook,
  BendaStepper,
  BendaWatermark,
} from '../components/PosterStage';
import {CW, FONT, M} from '../lib/theme';
import {pop} from '../lib/anim';

const STEPPER_NODES = [
  {label: 'AI BIASA VS AGENTIC'},
  {label: 'OPPO A3S ORIGIN'},
  {label: 'ARSITEKTUR 2 VPS'},
  {label: 'REMOTION OTONOM'},
  {label: 'RHMT.BIZ.ID'},
];

/* Official Google Gemini Spark SVG */
const GeminiSpark: React.FC<{size?: number; color?: string; rotate?: number}> = ({
  size = 32,
  color = '#38bdf8',
  rotate = 0,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{transform: `rotate(${rotate}deg)`}}
  >
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill={color}
    />
  </svg>
);

/* ============================================================================
   SCENE 1: HOOK (Dark #0b0b0d — Chat Biasa vs Autonomous Agentic Orbit)
   ============================================================================ */
export const StoryHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const heroPop = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const splitProgress = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orbitAngle = frame * 1.8;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={5} />

      <BendaHook
        mode="dark"
        lead="Kebanyakan orang pakai AI cuma buat:"
        anchorText="Tanya Jawab di Chat"
        accent="#38bdf8"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop="1 / 5"
        counterSub="paradigm shift"
        nodes={STEPPER_NODES.map((n, i) => ({
          ...n,
          active: i === 0,
          done: i < 0,
        }))}
      />

      {/* Main Visual Stage (Y: 450 - 1280) */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 455,
          width: CW,
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Contrast Battle Cards: Static Chat vs Autonomous Agentic */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: 24,
            opacity: heroPop,
            transform: `scale(${0.92 + 0.08 * heroPop})`,
          }}
        >
          {/* Card A: AI Pasif / Chat Biasa */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(24, 24, 28, 0.72)',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              opacity: 1 - splitProgress * 0.35,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#94a3b8',
                }}
              />
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  color: '#94a3b8',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                AI CHAT BIASA
              </span>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 12,
                padding: '16px 14px',
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: FONT.sans,
                fontSize: 19,
                color: '#cbd5e1',
                lineHeight: 1.4,
              }}
            >
              "Buatin ide caption..."
            </div>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 15,
                color: '#64748b',
                marginTop: 'auto',
              }}
            >
              [Menunggu Prompt Manual]
            </div>
          </div>

          {/* Card B: Agentic Otonom 24 Jam */}
          <div
            style={{
              flex: 1.25,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '2px solid #38bdf8',
              borderRadius: 20,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 36px rgba(56, 189, 248, 0.22)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <GeminiSpark size={20} color="#38bdf8" rotate={orbitAngle} />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    color: '#38bdf8',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                  }}
                >
                  AGENTIC OTONOM
                </span>
              </div>
              <span
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 6,
                }}
              >
                24H ACTIVE
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 12,
                padding: '14px 14px',
                border: '1px solid rgba(56, 189, 248, 0.2)',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, color: '#f8fafc', fontWeight: 600}}>
                <span style={{color: '#22c55e'}}>✓</span> Baca & Tulis Berkas Otomatis
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, color: '#f8fafc', fontWeight: 600}}>
                <span style={{color: '#22c55e'}}>✓</span> Eksekusi Shell & Git Terminal
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 17, color: '#f8fafc', fontWeight: 600}}>
                <span style={{color: '#22c55e'}}>✓</span> Render Video Headless
              </div>
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 14,
                color: '#38bdf8',
                letterSpacing: '0.04em',
                fontWeight: 700,
              }}
            >
              ● Self-Orchestrated Linux Pipeline
            </div>
          </div>
        </div>

        {/* Central Kinetic Core Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 28px',
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <GeminiSpark size={24} color="#facc15" rotate={orbitAngle * 1.5} />
          <span
            style={{
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 22,
              color: '#f8fafc',
            }}
          >
            Bukan Sekadar Chatbox · Ini Mesin Eksekusi
          </span>
        </div>
      </div>

      {/* Zona 4: Mascot Presenter (Reaktif Idea AHA!) */}
      <AgencyPresenterAnchor
        gesture="idea"
        theme="dark"
        size={270}
        bottomOffset={175}
        side="center"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 2: ORIGIN STORY (Light #F7F8FA — Dari Oppo A3s ke Portofolio Web)
   ============================================================================ */
export const StoryOriginScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const popAnim = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const evolve = interpolate(frame, [80, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={2} total={5} />

      <BendaHook
        mode="light"
        lead="Perjalanan Awal Ngoding:"
        anchorText="Modal HP Oppo A3s"
        accent="#2563eb"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#2563eb"
        counterTop="2 / 5"
        counterSub="origin story"
        nodes={STEPPER_NODES.map((n, i) => ({
          ...n,
          active: i === 1,
          done: i < 1,
        }))}
      />

      {/* Main Visual Stage (Y: 450 - 1280) */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 455,
          width: CW,
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: 24,
            opacity: popAnim,
            transform: `scale(${0.92 + 0.08 * popAnim})`,
          }}
        >
          {/* Box Kiri: Masa Lalu (HP Oppo A3s) */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: 22,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#64748b',
                  letterSpacing: '0.06em',
                }}
              >
                TITIK AWAL · TUGAS P5
              </span>
            </div>

            {/* Smartphone Wireframe SVG */}
            <div
              style={{
                backgroundColor: '#f1f5f9',
                borderRadius: 16,
                padding: '20px 16px',
                border: '1.5px solid #cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  backgroundColor: '#94a3b8',
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                Oppo A3s
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: '#64748b',
                  textAlign: 'center',
                }}
              >
                2GB RAM · Layar Retak · Tanpa Laptop
              </div>
            </div>

            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                color: '#475569',
                lineHeight: 1.4,
                fontWeight: 600,
              }}
            >
              "Rasa penasaran ngoding justru tumbuh saat alat paling terbatas."
            </div>
          </div>

          {/* Box Kanan: Hasil Sekarang (rhmt.biz.id & Modern Stack) */}
          <div
            style={{
              flex: 1.3,
              backgroundColor: '#ffffff',
              border: '2.5px solid #2563eb',
              borderRadius: 22,
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 12px 32px rgba(37, 99, 235, 0.14)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#2563eb',
                  letterSpacing: '0.06em',
                }}
              >
                SEKARANG · KARYA NYATA
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563eb',
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                PROD
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#eff6ff',
                borderRadius: 16,
                padding: '16px 16px',
                border: '1.5px solid #bfdbfe',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#1e40af',
                }}
              >
                rhmt.biz.id
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  color: '#3b82f6',
                  fontWeight: 600,
                }}
              >
                Portofolio Resmi & Sistem Arsitektur
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontFamily: FONT.mono,
                fontSize: 14,
                color: '#334155',
                fontWeight: 600,
              }}
            >
              <div>→ Next.js + React Modern Frontend</div>
              <div>→ Agentic Automation Pipeline</div>
              <div>→ Autonomous DevOps 24 Jam</div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            padding: '12px 28px',
            borderRadius: 999,
            backgroundColor: '#ffffff',
            border: '1.5px solid #cbd5e1',
            boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
            fontFamily: FONT.sans,
            fontWeight: 700,
            fontSize: 20,
            color: '#1e293b',
          }}
        >
          Keterbatasan Bukan Alasan Untuk Berhenti Berkarya
        </div>
      </div>

      {/* Zona 4: Mascot Presenter (Peek 3D Menoleh Kiri-Kanan) */}
      <AgencyPresenterAnchor
        gesture="peek_3d"
        theme="light"
        size={270}
        bottomOffset={175}
        side="center"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 3: ARCHITECTURE (Dark #0b0b0d — Bedah Arsitektur 2 Server VPS)
   ============================================================================ */
export const StoryArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const popAnim = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const pulse = Math.sin(frame * 0.18) * 0.5 + 0.5;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={5} />

      <BendaHook
        mode="dark"
        lead="Arsitektur Sistem Otonom:"
        anchorText="2 Server VPS Linux"
        accent="#22c55e"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#22c55e"
        counterTop="3 / 5"
        counterSub="infrastructure"
        nodes={STEPPER_NODES.map((n, i) => ({
          ...n,
          active: i === 2,
          done: i < 2,
        }))}
      />

      {/* Main Visual Stage (Y: 450 - 1280) */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 455,
          width: CW,
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            gap: 20,
            opacity: popAnim,
            transform: `scale(${0.92 + 0.08 * popAnim})`,
            alignItems: 'stretch',
          }}
        >
          {/* VPS 1: Gateway */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(20, 24, 33, 0.82)',
              border: '2px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 22,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#38bdf8',
                  boxShadow: '0 0 10px #38bdf8',
                }}
              />
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  color: '#38bdf8',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                VPS 1 · GATEWAY
              </span>
            </div>

            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 19,
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              Pintu Masuk Pesan
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 14,
                padding: '14px 12px',
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: FONT.mono,
                fontSize: 15,
                color: '#94a3b8',
              }}
            >
              <div>• Telegram Bot API</div>
              <div>• WhatsApp Baileys Bot</div>
              <div>• Webhook Router</div>
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                color: '#64748b',
                marginTop: 'auto',
              }}
            >
              Fast Ingress · RAM 2GB
            </div>
          </div>

          {/* High-speed Bridge Indicator */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '0 6px',
            }}
          >
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                color: '#22c55e',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              SSH TUNNEL
            </div>
            <div
              style={{
                width: 48,
                height: 3,
                backgroundColor: '#22c55e',
                boxShadow: '0 0 12px #22c55e',
              }}
            />
            <span style={{color: '#22c55e', fontSize: 20}}>▶</span>
          </div>

          {/* VPS 2: Worker */}
          <div
            style={{
              flex: 1.25,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid #22c55e',
              borderRadius: 22,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 12px 36px rgba(34, 197, 94, 0.18)',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    boxShadow: '0 0 12px #22c55e',
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 16,
                    color: '#22c55e',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                  }}
                >
                  VPS 2 · WORKER
                </span>
              </div>
              <span
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.16)',
                  color: '#22c55e',
                  fontFamily: FONT.mono,
                  fontSize: 13,
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                8GB RAM
              </span>
            </div>

            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 19,
                fontWeight: 700,
                color: '#f8fafc',
              }}
            >
              Mesin Eksekusi Tugas Berat
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 14,
                padding: '14px 12px',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                fontFamily: FONT.mono,
                fontSize: 15,
                color: '#e2e8f0',
              }}
            >
              <div>✓ Gemini 2.5 TTS Generator</div>
              <div>✓ Remotion Video Rendering</div>
              <div>✓ Automated Git Deployments</div>
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                color: '#22c55e',
                fontWeight: 700,
                marginTop: 'auto',
              }}
            >
              Heavy Orchestration Engine
            </div>
          </div>
        </div>

        {/* Security / Clean Architecture Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 24px',
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{color: '#22c55e', fontWeight: 800}}>●</span>
          <span
            style={{
              fontFamily: FONT.sans,
              fontWeight: 600,
              fontSize: 19,
              color: '#cbd5e1',
            }}
          >
            Pemisahan Ingress & Worker Menjaga Kecepatan & Stabilitas
          </span>
        </div>
      </div>

      {/* Zona 4: Mascot Presenter (Idle Confident Presenter) */}
      <AgencyPresenterAnchor
        gesture="idle"
        theme="dark"
        size={270}
        bottomOffset={175}
        side="center"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 4: EXECUTION (Light #F7F8FA — Video Ini Dirender Otomatis)
   ============================================================================ */
export const StoryExecutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const popAnim = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const spin = frame * 2.2;

  return (
    <AbsoluteFill>
      <BendaBackground mode="light" />
      <BendaWatermark mode="light" index={4} total={5} />

      <BendaHook
        mode="light"
        lead="Bukti Eksekusi Nyata:"
        anchorText="Render Otomatis Dari Kode"
        accent="#ea580c"
        enterAt={2}
      />

      <BendaStepper
        mode="light"
        accent="#ea580c"
        counterTop="4 / 5"
        counterSub="autonomous render"
        nodes={STEPPER_NODES.map((n, i) => ({
          ...n,
          active: i === 3,
          done: i < 3,
        }))}
      />

      {/* Main Visual Stage (Y: 450 - 1280) */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 455,
          width: CW,
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* Terminal Code Mockup */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#0f172a',
            border: '2px solid #cbd5e1',
            borderRadius: 22,
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.15)',
            opacity: popAnim,
            transform: `scale(${0.92 + 0.08 * popAnim})`,
          }}
        >
          {/* Mac-style Window Dots */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12}}>
            <div style={{display: 'flex', gap: 8}}>
              <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444'}} />
              <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b'}} />
              <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981'}} />
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 14, color: '#94a3b8', fontWeight: 600}}>
              terminal · remotion render engine
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 13, color: '#22c55e', fontWeight: 700}}>
              ● RUNNING
            </span>
          </div>

          {/* Terminal Lines */}
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 16,
              lineHeight: 1.6,
              color: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div>
              <span style={{color: '#38bdf8'}}>$</span> remotion render StorytellingVideo out/tiktok-v3.mp4
            </div>
            <div style={{color: '#94a3b8'}}>
              [TTS] Fetching Gemini 2.5 Puck Voiceover... <span style={{color: '#22c55e'}}>OK</span>
            </div>
            <div style={{color: '#94a3b8'}}>
              [FFmpeg] Detecting audio silences & word timings... <span style={{color: '#22c55e'}}>0 drifting</span>
            </div>
            <div style={{color: '#94a3b8'}}>
              [React] Rendering 1821 frames @ 1080x1920 (9:16)...
            </div>
            <div style={{color: '#facc15', fontWeight: 700}}>
              ✓ Video rendered in 38.4s without video editor!
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 18,
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            Zero Manual Editing
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 12,
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 18,
              color: '#0f172a',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            TypeScript Code → MP4
          </div>
        </div>
      </div>

      {/* Zona 4: Mascot Presenter (Jump & Spin 360° Selebrasi!) */}
      <AgencyPresenterAnchor
        gesture="jump_spin"
        theme="light"
        size={270}
        bottomOffset={175}
        side="center"
      />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SCENE 5: OUTRO & CTA (Dark #0b0b0d — rhmt.biz.id & Follow @rhmtofc)
   ============================================================================ */
export const StoryOutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const popAnim = spring({frame, fps, config: {damping: 14, stiffness: 140}});
  const rotate = frame * 1.5;

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={5} />

      <BendaHook
        mode="dark"
        lead="Keterbatasan Bukan Halangan:"
        anchorText="Eksplorasi di rhmt.biz.id"
        accent="#38bdf8"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38bdf8"
        counterTop="5 / 5"
        counterSub="call to action"
        nodes={STEPPER_NODES.map((n, i) => ({
          ...n,
          active: i === 4,
          done: i < 4,
        }))}
      />

      {/* Main Visual Stage (Y: 450 - 1280) */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 455,
          width: CW,
          height: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Portofolio Showcase Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: '2.5px solid #38bdf8',
            borderRadius: 24,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(56, 189, 248, 0.22)',
            opacity: popAnim,
            transform: `scale(${0.92 + 0.08 * popAnim})`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <GeminiSpark size={28} color="#38bdf8" rotate={rotate} />
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 20,
                color: '#38bdf8',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              RHMT OFC · OFFICIAL CREATOR
            </span>
          </div>

          <div
            style={{
              fontFamily: FONT.space,
              fontSize: 48,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            rhmt.biz.id
          </div>

          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 21,
              lineHeight: 1.45,
              color: '#cbd5e1',
              maxWidth: 620,
              fontWeight: 600,
            }}
          >
            Eksplorasi sistem otonom, proyek AI agentic, dan portofolio teknologi lengkap.
          </div>

          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <div
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                backgroundColor: 'rgba(56, 189, 248, 0.16)',
                border: '1.5px solid rgba(56, 189, 248, 0.5)',
                fontFamily: FONT.mono,
                fontSize: 18,
                color: '#38bdf8',
                fontWeight: 800,
              }}
            >
              Follow TikTok @rhmtofc
            </div>
            <div
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.14)',
                fontFamily: FONT.mono,
                fontSize: 18,
                color: '#f8fafc',
                fontWeight: 700,
              }}
            >
              GitHub: rhmt-ofc
            </div>
          </div>
        </div>

        {/* Motivational Closer */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontWeight: 700,
            fontSize: 22,
            color: '#94a3b8',
            textAlign: 'center',
          }}
        >
          Komen di bawah: bedah kodingan terminalnya di next video?
        </div>
      </div>

      {/* Zona 4: Mascot Presenter (Thumbs Up & Buoyant Smile ^^) */}
      <AgencyPresenterAnchor
        gesture="thumbs_up"
        theme="dark"
        size={270}
        bottomOffset={175}
        side="center"
      />
    </AbsoluteFill>
  );
};
