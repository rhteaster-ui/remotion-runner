import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  BendaBackground,
  BendaHook,
  BendaStepper,
  BendaWatermark,
} from '../components/PosterStage';
import {pop} from '../lib/anim';
import {CW, FONT, M} from '../lib/theme';
import {FILOSOFI_FONT, FILOSOFI_TOKENS as T} from './filosofiTokens';

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 1: HOOK & REVEAL (Dark Canvas — 3 Raksasa AI)
   ══════════════════════════════════════════════════════════════════════════ */
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p1 = pop(frame, 10, fps, 170);
  const p2 = pop(frame, 24, fps, 170);
  const p3 = pop(frame, 38, fps, 170);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={1} total={5} />

      <BendaHook
        mode="dark"
        lead="Bukan Sekadar Angka Versi:"
        anchorText="Opus · Gemini · o1"
        tail="Deklarasi filosofi peradaban raksasa AI"
        accent="#38BDF8"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#38BDF8"
        counterTop="3 LAB"
        counterSub="frontier resmi"
        nodes={[
          {label: 'ANTHROPIC', done: true},
          {label: 'GOOGLE', done: true},
          {label: 'OPENAI', active: true},
        ]}
      />

      {/* Tri-Core Architectural Radar */}
      <div
        style={{
          position: 'absolute',
          left: M,
          top: 480,
          width: CW,
          height: 780,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Card 1: Anthropic */}
        <div
          style={{
            padding: '28px 32px',
            borderRadius: 20,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${T.claude}55`,
            boxShadow: `0 12px 30px -10px ${T.claude}25`,
            opacity: Math.min(1, p1),
            transform: `translateY(${(1 - p1) * 20}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{fontFamily: FONT.mono, fontSize: 16, color: T.claude, letterSpacing: '0.1em', fontWeight: 700}}>
              ANTHROPIC · CLAUDE
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>
              Opus · Sonnet · Haiku
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 4}}>
              Metafora Karya Sastra &amp; Struktur Puisi Klasik
            </div>
          </div>
          <div style={{padding: '10px 18px', borderRadius: 12, backgroundColor: `${T.claude}20`, border: `1px solid ${T.claude}`}}>
            <span style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 700, color: T.claude}}>SASTRA</span>
          </div>
        </div>

        {/* Card 2: Google DeepMind */}
        <div
          style={{
            padding: '28px 32px',
            borderRadius: 20,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${T.gemini}55`,
            boxShadow: `0 12px 30px -10px ${T.gemini}25`,
            opacity: Math.min(1, p2),
            transform: `translateY(${(1 - p2) * 20}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{fontFamily: FONT.mono, fontSize: 16, color: T.gemini, letterSpacing: '0.1em', fontWeight: 700}}>
              GOOGLE DEEPMIND · GEMINI
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>
              Gemini · Flash · Astra
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 4}}>
              Kosmologi Bintang Kembar &amp; Spektrum Foton Cahaya
            </div>
          </div>
          <div style={{padding: '10px 18px', borderRadius: 12, backgroundColor: `${T.gemini}20`, border: `1px solid ${T.gemini}`}}>
            <span style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 700, color: T.gemini}}>KOSMOS</span>
          </div>
        </div>

        {/* Card 3: OpenAI */}
        <div
          style={{
            padding: '28px 32px',
            borderRadius: 20,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${T.openai}55`,
            boxShadow: `0 12px 30px -10px ${T.openai}25`,
            opacity: Math.min(1, p3),
            transform: `translateY(${(1 - p3) * 20}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{fontFamily: FONT.mono, fontSize: 16, color: T.openai, letterSpacing: '0.1em', fontWeight: 700}}>
              OPENAI · PARADIGMA BARU
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginTop: 4}}>
              Omni (4o) · Reasoning (o1)
            </div>
            <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 4}}>
              Merengkuh Segalanya &amp; Reset ke Angka Satu
            </div>
          </div>
          <div style={{padding: '10px 18px', borderRadius: 12, backgroundColor: `${T.openai}20`, border: `1px solid ${T.openai}`}}>
            <span style={{fontFamily: FONT.mono, fontSize: 16, fontWeight: 700, color: T.openai}}>NALAR</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 2: ANTHROPIC CLAUDE (Metafora Sastra Klasik)
   ══════════════════════════════════════════════════════════════════════════ */
export const S2Claude: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const c1 = pop(frame, 6, fps, 180);
  const c2 = pop(frame, 24, fps, 180);
  const c3 = pop(frame, 42, fps, 180);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={2} total={5} />

      <BendaHook
        mode="dark"
        lead="Anthropic Claude:"
        anchorText="Metafora Sastra Klasik"
        tail="Struktur puisi & karya seni agung peradaban"
        accent={T.claude}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={T.claude}
        counterTop="3 TIER"
        counterSub="hirarki sastra"
        nodes={[
          {label: 'OPUS', active: true},
          {label: 'SONNET', done: true},
          {label: 'HAIKU', done: true},
        ]}
      />

      <div
        style={{
          position: 'absolute',
          left: M,
          top: 480,
          width: CW,
          height: 780,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        {/* Tier 1: Opus */}
        <div
          style={{
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#111827',
            border: `2px solid ${T.claude}`,
            boxShadow: `0 10px 30px -8px ${T.claude}33`,
            opacity: Math.min(1, c1),
            transform: `translateY(${(1 - c1) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontFamily: FONT.mono, fontSize: 26, fontWeight: 800, color: T.claude}}>01. OPUS</span>
              <span style={{fontFamily: FONT.mono, fontSize: 16, color: '#E2E8F0', padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(245, 158, 11, 0.2)'}}>
                Magnum Opus
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: T.claude, fontWeight: 700}}>DEEP REASONING</span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#CBD5E1', marginTop: 10, lineHeight: 1.4}}>
            Dari bahasa Latin untuk <strong style={{color: '#FFFFFF'}}>karya seni agung</strong>. Dirancang untuk pemecahan masalah paling berat, analisis kode mendalam, dan riset ilmiah komprehensif.
          </p>
        </div>

        {/* Tier 2: Sonnet */}
        <div
          style={{
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            opacity: Math.min(1, c2),
            transform: `translateY(${(1 - c2) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontFamily: FONT.mono, fontSize: 26, fontWeight: 800, color: '#FBBF24'}}>02. SONNET</span>
              <span style={{fontFamily: FONT.mono, fontSize: 16, color: '#E2E8F0', padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(251, 191, 36, 0.2)'}}>
                14 Baris Berirama
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: '#FBBF24', fontWeight: 700}}>BALANCED WORKHORSE</span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 10, lineHeight: 1.4}}>
            Puisi klasik 14 baris berstruktur ketat. Melambangkan <strong style={{color: '#F8FAFC'}}>keseimbangan sempurna</strong> antara kecerdasan tinggi dan kecepatan eksekusi harian para engineer.
          </p>
        </div>

        {/* Tier 3: Haiku */}
        <div
          style={{
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(245, 158, 11, 0.25)',
            opacity: Math.min(1, c3),
            transform: `translateY(${(1 - c3) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <span style={{fontFamily: FONT.mono, fontSize: 26, fontWeight: 800, color: '#FDE68A'}}>03. HAIKU</span>
              <span style={{fontFamily: FONT.mono, fontSize: 16, color: '#E2E8F0', padding: '4px 10px', borderRadius: 8, backgroundColor: 'rgba(253, 230, 138, 0.15)'}}>
                Puisi 3 Baris (5-7-5)
              </span>
            </div>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: '#FDE68A', fontWeight: 700}}>ULTRA LOW LATENCY</span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 10, lineHeight: 1.4}}>
            Puisi tradisional Jepang yang ringkas dan tanpa jeda. Model instan dengan <strong style={{color: '#F8FAFC'}}>latensi sub-detik</strong> untuk pemrosesan data volume masif.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 3: GOOGLE DEEPMIND (Kosmologi & Fisika Semesta)
   ══════════════════════════════════════════════════════════════════════════ */
export const S3Gemini: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const g1 = pop(frame, 6, fps, 180);
  const g2 = pop(frame, 24, fps, 180);
  const rot = interpolate(frame, [0, 300], [0, 360]);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={3} total={5} />

      <BendaHook
        mode="dark"
        lead="Google DeepMind:"
        anchorText="Kosmologi &amp; Fisika"
        tail="Bintang kembar native multimodal &amp; foton cahaya"
        accent={T.gemini}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={T.gemini}
        counterTop="NATIVE"
        counterSub="multimodal core"
        nodes={[
          {label: 'GEMINI', active: true},
          {label: 'FLASH', done: true},
          {label: 'ASTRA', done: true},
        ]}
      />

      <div
        style={{
          position: 'absolute',
          left: M,
          top: 480,
          width: CW,
          height: 780,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Animated Central Spark Logo */}
        <div style={{position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div
            style={{
              position: 'absolute',
              width: 130,
              height: 130,
              borderRadius: '50%',
              border: `2px dashed ${T.geminiCyan}66`,
              transform: `rotate(${rot}deg)`,
            }}
          />
          <svg width="84" height="84" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
              fill="url(#gemini-spark)"
            />
            <defs>
              <linearGradient id="gemini-spark" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4285F4" />
                <stop offset="0.5" stopColor="#9B72CB" />
                <stop offset="1" stopColor="#D96570" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Pillar 1: Gemini & Flash */}
        <div
          style={{
            width: '100%',
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${T.gemini}`,
            boxShadow: `0 10px 30px -8px ${T.gemini}33`,
            opacity: Math.min(1, g1),
            transform: `translateY(${(1 - g1) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: T.gemini}}>
              GEMINI · RASI BINTANG KEMBAR
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: '#38BDF8', fontWeight: 700}}>
              FOTON CAHAYA
            </span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#CBD5E1', marginTop: 10, lineHeight: 1.4}}>
            Lambang <strong style={{color: '#FFFFFF'}}>bintang kembar</strong>—arsitektur native multimodal di mana teks, penglihatan, dan audio diproses dalam satu kesatuan otak tanpa translasi terpisah. Lini <strong style={{color: '#38BDF8'}}>Flash</strong> mengadopsi kecepatan transmisi foton tercepat di alam semesta.
          </p>
        </div>

        {/* Pillar 2: Project Astra */}
        <div
          style={{
            width: '100%',
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#0F172A',
            border: '1.5px solid rgba(129, 140, 248, 0.4)',
            opacity: Math.min(1, g2),
            transform: `translateY(${(1 - g2) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: '#818CF8'}}>
              PROJECT ASTRA · AD ASTRA
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: '#818CF8', fontWeight: 700}}>
              UNIVERSAL AGENT
            </span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#94A3B8', marginTop: 10, lineHeight: 1.4}}>
            Diambil dari pepatah Latin kuno <em>"Per aspera ad astra"</em>—menuju bintang-bintang. Representasi visi AI masa depan yang mampu memahami dunia nyata secara terus menerus (*continuous video understanding*).
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 4: OPENAI (Omni & Reset Paradigma o1)
   ══════════════════════════════════════════════════════════════════════════ */
export const S4OpenAI: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const o1 = pop(frame, 6, fps, 180);
  const o2 = pop(frame, 28, fps, 180);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={4} total={5} />

      <BendaHook
        mode="dark"
        lead="OpenAI Paradigm Reset:"
        anchorText="Omni &amp; Reset ke Angka 1"
        tail="Transisi dari tebak kata menuju penalaran terstruktur"
        accent={T.openai}
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent={T.openai}
        counterTop="REASONING"
        counterSub="tree-of-thought"
        nodes={[
          {label: 'GPT-4o', done: true},
          {label: 'o1', active: true},
        ]}
      />

      <div
        style={{
          position: 'absolute',
          left: M,
          top: 480,
          width: CW,
          height: 780,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Card 1: Omni */}
        <div
          style={{
            padding: '24px 30px',
            borderRadius: 18,
            backgroundColor: '#0F172A',
            border: `1.5px solid ${T.openai}66`,
            opacity: Math.min(1, o1),
            transform: `translateY(${(1 - o1) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 24, fontWeight: 800, color: T.openai}}>
              GPT-4o · OMNI ("OMNIS")
            </span>
            <span style={{fontFamily: FONT.mono, fontSize: 15, color: '#34D399', fontWeight: 700}}>
              ALL-ENCOMPASSING
            </span>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, color: '#CBD5E1', marginTop: 10, lineHeight: 1.4}}>
            Dari bahasa Latin <em>Omnis</em> yang berarti <strong style={{color: '#FFFFFF'}}>merengkuh segalanya</strong>. Mengintegrasikan suara, ekspresi, dan teks secara utuh tanpa hambatan model terpisah.
          </p>
        </div>

        {/* Card 2: o1 Reset */}
        <div
          style={{
            padding: '26px 32px',
            borderRadius: 18,
            backgroundColor: '#111827',
            border: `2px solid ${T.openai}`,
            boxShadow: `0 12px 35px -8px ${T.openai}40`,
            opacity: Math.min(1, o2),
            transform: `translateY(${(1 - o2) * 16}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 26, fontWeight: 800, color: '#FFFFFF'}}>
              OPENAI o1 · RESET PARADIGMA
            </span>
            <div style={{padding: '6px 14px', borderRadius: 8, backgroundColor: `${T.openai}33`, border: `1px solid ${T.openai}`}}>
              <span style={{fontFamily: FONT.mono, fontSize: 15, fontWeight: 800, color: T.openai}}>CHAIN OF THOUGHT</span>
            </div>
          </div>
          <p style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 21, color: '#E2E8F0', marginTop: 12, lineHeight: 1.45}}>
            OpenAI sengaja <strong style={{color: T.openai}}>mereset penomoran kembali ke angka 1</strong>. Ini sinyal resmi bahwa fase LLM konvensional telah usai: AI kini berpikir sebelum merespons, memvalidasi hipotesis langkah demi langkah (*Tree-of-Thought*).
          </p>

          {/* Interactive Steps Visual */}
          <div style={{display: 'flex', gap: 12, marginTop: 18}}>
            {['Analisis Hipotesis', 'Koreksi Diri', 'Sintesis Bukti'].map((step, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 10,
                  backgroundColor: '#1E293B',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  textAlign: 'center',
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#A7F3D0',
                }}
              >
                ✓ {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SCENE 5: OUTRO (Sintesis & Personal Branding rhmt ofc)
   ══════════════════════════════════════════════════════════════════════════ */
export const S5Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const o1 = pop(frame, 6, fps, 175);
  const o2 = pop(frame, 24, fps, 175);

  return (
    <AbsoluteFill>
      <BendaBackground mode="dark" />
      <BendaWatermark mode="dark" index={5} total={5} />

      <BendaHook
        mode="dark"
        lead="Deklarasi Peradaban:"
        anchorText="Tiga Visi AI Masa Depan"
        tail="Simak eksplorasi teknologi bersama rhmt ofc"
        accent="#00E5FF"
        enterAt={2}
      />

      <BendaStepper
        mode="dark"
        accent="#00E5FF"
        counterTop="SINTESIS"
        counterSub="rhmt ofc"
        nodes={[
          {label: 'SASTRA', done: true},
          {label: 'KOSMOS', done: true},
          {label: 'NALAR', done: true},
          {label: 'RHMT', active: true},
        ]}
      />

      <div
        style={{
          position: 'absolute',
          left: M,
          top: 480,
          width: CW,
          height: 780,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* 3 Pillars Summary */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            opacity: Math.min(1, o1),
            transform: `translateY(${(1 - o1) * 16}px)`,
          }}
        >
          <div style={{padding: '16px 24px', borderRadius: 14, backgroundColor: '#0F172A', border: `1.5px solid ${T.claude}55`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, color: T.claude}}>ANTHROPIC</span>
            <span style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, fontWeight: 700, color: '#FFFFFF'}}>Karya Sastra Pikiran Manusia</span>
          </div>
          <div style={{padding: '16px 24px', borderRadius: 14, backgroundColor: '#0F172A', border: `1.5px solid ${T.gemini}55`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, color: T.gemini}}>GOOGLE</span>
            <span style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, fontWeight: 700, color: '#FFFFFF'}}>Instrumen Pengamat Semesta</span>
          </div>
          <div style={{padding: '16px 24px', borderRadius: 14, backgroundColor: '#0F172A', border: `1.5px solid ${T.openai}55`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, color: T.openai}}>OPENAI</span>
            <span style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 20, fontWeight: 700, color: '#FFFFFF'}}>Mesin Penalaran Mutlak</span>
          </div>
        </div>

        {/* Creator Branding Card */}
        <div
          style={{
            width: '100%',
            padding: '32px 36px',
            borderRadius: 24,
            backgroundColor: '#0F172A',
            border: '2px solid rgba(0, 229, 255, 0.5)',
            boxShadow: '0 20px 45px -10px rgba(0, 229, 255, 0.25)',
            opacity: Math.min(1, o2),
            transform: `translateY(${(1 - o2) * 16}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 14,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <Img src={staticFile('assets/portfolio/rhmt-mark.svg')} style={{width: 38, height: 38}} />
            <span style={{fontFamily: FONT.mono, fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em'}}>
              rhmt ofc
            </span>
          </div>
          <div style={{fontFamily: FILOSOFI_FONT.sans, fontSize: 22, color: '#94A3B8'}}>
            Eksplorasi Teknologi, Arsitektur AI &amp; Engineering Bersama <strong style={{color: '#FFFFFF'}}>Rahmat</strong>
          </div>
          <div
            style={{
              marginTop: 6,
              padding: '10px 24px',
              borderRadius: 12,
              backgroundColor: 'rgba(0, 229, 255, 0.12)',
              border: '1.5px solid #00E5FF',
              fontFamily: FONT.mono,
              fontSize: 18,
              fontWeight: 700,
              color: '#00E5FF',
              letterSpacing: '0.05em',
            }}
          >
            rhmt.biz.id
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
