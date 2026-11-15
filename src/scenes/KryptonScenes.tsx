import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Header} from '../components/Chrome';
import {AgencyPresenterAnchor} from '../components/AgencyPresenterAnchor';
import {EditorialCard, KryptonBackground, POSTERS, PosterFrame, StepStepper, TelemetryStrip} from '../components/PosterStage';
import {ModelCoreIcon} from '../components/ModelIcons';
import {kAnchor} from '../lib/kryptonAnchors';
import {CW, FONT, M, Mode, pal} from '../lib/theme';
import {pop} from '../lib/anim';

const KHeadline: React.FC<{kicker: string; title: string; mode: Mode; accent: string; size?: number}> = ({
  kicker,
  title,
  mode,
  accent,
  size = 64,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, 3, fps);
  return (
    <div style={{position: 'absolute', left: M, top: 214, width: CW, opacity: Math.min(1, o), transform: `translateY(${(1 - o) * 18}px)`}}>
      <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 21, color: accent, letterSpacing: '0.08em'}}>
        {kicker}
      </div>
      <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: size, lineHeight: 1.12, color: p.ink, marginTop: 8, letterSpacing: '-0.02em'}}>
        {title}
      </div>
    </div>
  );
};

// Sharp vector SVG icons (no generic emojis)
const LeakRadarIcon: React.FC<{color?: string}> = ({color = '#38bdf8'}) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="12" x2="18.5" y2="5.5" />
  </svg>
);

const ShieldCheckIcon: React.FC<{color?: string}> = ({color = '#f59e0b'}) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Cube3DIcon: React.FC<{color?: string}> = ({color = '#10b981'}) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ChatSparkIcon: React.FC<{color?: string}> = ({color = '#0284c7'}) => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
  </svg>
);

export const K1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const aArgon = kAnchor('s1-hook', 'argon', 0, 1.8);
  const aCarbon = kAnchor('s1-hook', 'carbon', 0, 2.8);
  const aHyd = kAnchor('s1-hook', 'hydrogen', 0, 3.8);
  const aKrypton = kAnchor('s1-hook', 'krypton', 0, 6.0);
  const isKryptonPhase = frame >= aKrypton;

  return (
    <AbsoluteFill>
      <KryptonBackground mode="dark" accent={isKryptonPhase ? '#38bdf8' : '#4285f4'} />
      <Header index={1} total={6} label="HOOK" mode="dark" />
      <KHeadline
        kicker="GEMINI 4 · RUMOR WATCH"
        title={isKryptonPhase ? 'Muncul Isu Baru: Krypton' : 'Setelah Argon, Carbon & Hydrogen'}
        mode="dark"
        accent={isKryptonPhase ? '#38bdf8' : '#60a5fa'}
        size={60}
      />

      {/* Stage Hero: Sequential 3 official posters transitioning into Google-style Krypton Key Art */}
      <div style={{position: 'absolute', left: M, top: 392, width: CW, height: 525}}>
        {!isKryptonPhase ? (
          <>
            <PosterFrame
              poster={POSTERS.argon}
              mode="dark"
              enterAt={Math.max(4, aArgon - 6)}
              width={650}
              height={366}
              tiltDeg={-3}
              style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
            />
            <PosterFrame
              poster={POSTERS.carbon}
              mode="dark"
              enterAt={Math.max(12, aCarbon - 6)}
              width={650}
              height={366}
              tiltDeg={2}
              style={{position: 'absolute', right: 0, top: 76, zIndex: 2}}
            />
            <PosterFrame
              poster={POSTERS.hydrogen}
              mode="dark"
              enterAt={Math.max(20, aHyd - 6)}
              width={650}
              height={366}
              tiltDeg={-1.5}
              style={{position: 'absolute', left: 143, top: 158, zIndex: 3}}
            />
          </>
        ) : (
          <PosterFrame
            poster={POSTERS.kryptonHero}
            mode="dark"
            enterAt={aKrypton}
            width={CW}
            height={510}
            tiltDeg={1.2}
            zoomFrom={1.0}
            zoomTo={1.08}
          />
        )}
      </div>

      {/* Editorial Analysis Deck + Lower Telemetry Stage (Anti-Dead Space) */}
      <div style={{position: 'absolute', left: M, top: 942, width: CW, display: 'flex', flexDirection: 'column', gap: 18}}>
        <StepStepper
          mode="dark"
          enterAt={6}
          steps={[
            {label: 'ARGON', accent: '#ff9800', active: !isKryptonPhase && frame >= aArgon, done: isKryptonPhase},
            {label: 'CARBON', accent: '#4285f4', active: !isKryptonPhase && frame >= aCarbon, done: isKryptonPhase},
            {label: 'HYDROGEN', accent: '#00e676', active: !isKryptonPhase && frame >= aHyd, done: isKryptonPhase},
            {label: 'KRYPTON?', accent: '#38bdf8', active: isKryptonPhase, rumor: true},
          ]}
        />
        <EditorialCard
          mode="dark"
          accent={isKryptonPhase ? '#38bdf8' : '#4285f4'}
          kicker={isKryptonPhase ? 'TRENDING DI KOMUNITAS AI' : 'SERI RESMI GEMINI 4'}
          title={isKryptonPhase ? 'Checkpoint Misterius' : 'Tiga Varian Resmi Sudah Rilis'}
          codeChip={isKryptonPhase ? 'krypton-a' : '3 VARIANTS'}
          body={
            isKryptonPhase
              ? 'Belum genap sebulan seri Gemini 4 lengkap, muncul bocoran nama baru yang ramai dibahas di X.'
              : 'Argon, Carbon, dan Hydrogen sudah diumumkan resmi di blog.google untuk tiap kelas kerja.'
          }
          enterAt={isKryptonPhase ? aKrypton + 6 : 12}
          icon={isKryptonPhase ? <LeakRadarIcon color="#38bdf8" /> : <ModelCoreIcon m="carbon" size={28} />}
          tag={isKryptonPhase ? 'RUMOR WATCH' : 'OFFICIAL'}
        />
        <TelemetryStrip
          mode="dark"
          enterAt={isKryptonPhase ? aKrypton + 12 : 20}
          items={[
            {label: 'OFFICIAL SERIES', value: '3 MODELS', accent: '#00e676'},
            {label: 'CODENAME LEAK', value: isKryptonPhase ? 'krypton-a' : 'PENDING', accent: '#38bdf8'},
            {label: 'VERIFY STATUS', value: 'UNCONFIRMED', accent: '#f59e0b'},
          ]}
        />
      </div>

      <AgencyPresenterAnchor
        gesture={isKryptonPhase ? 'point_up' : 'idle'}
        speechText={isKryptonPhase ? 'Checkpoint baru?' : 'Pantau lineup!'}
        size={165}
        bottomOffset={220}
        side="right"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

export const K2Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const aHyd = kAnchor('s2-recap', 'hydrogen', 0, 3.5);
  const aArgon = kAnchor('s2-recap', 'argon', 0, 7.5);
  const aCarbon = kAnchor('s2-recap', 'carbon', 0, 12.0);

  const activeModel = frame >= aCarbon ? 'carbon' : frame >= aArgon ? 'argon' : 'hydrogen';
  const posterMap = {
    hydrogen: POSTERS.hydrogen,
    argon: POSTERS.argon,
    carbon: POSTERS.carbon,
  };
  const accentMap = {
    hydrogen: '#00e676',
    argon: '#ff9800',
    carbon: '#4285f4',
  };

  return (
    <AbsoluteFill>
      <KryptonBackground mode="light" accent={accentMap[activeModel]} />
      <Header index={2} total={6} label="OFFICIAL LINEUP" mode="light" />
      <KHeadline
        kicker="PETA KASTA RESMI GOOGLE DEEPMIND"
        title="Posisi 3 Model Sebelumnya"
        mode="light"
        accent="#0284c7"
        size={60}
      />

      <div style={{position: 'absolute', left: M, top: 392, width: CW}}>
        <PosterFrame
          key={activeModel}
          poster={posterMap[activeModel]}
          mode="light"
          enterAt={activeModel === 'hydrogen' ? 4 : activeModel === 'argon' ? aArgon : aCarbon}
          width={CW}
          height={504}
          zoomFrom={1.01}
          zoomTo={1.07}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 924, width: CW, display: 'flex', flexDirection: 'column', gap: 16}}>
        <EditorialCard
          mode="light"
          accent="#00e676"
          kicker="01 · RAPID EXECUTION"
          title="Gemini 4 Hydrogen"
          body="Eksekusi cepat, hemat kuota, dan andalan coding harian serta workflow agentic."
          enterAt={Math.max(4, aHyd - 6)}
          icon={<ModelCoreIcon m="hydrogen" size={26} />}
          tag={activeModel === 'hydrogen' ? 'ACTIVE' : 'SPEED'}
          compact
        />
        <EditorialCard
          mode="light"
          accent="#ff9800"
          kicker="02 · LONG-HORIZON"
          title="Gemini 4 Argon"
          body="Fokus reasoning jangka panjang, konteks 1M token, dan navigasi repo besar."
          enterAt={Math.max(10, aArgon - 6)}
          icon={<ModelCoreIcon m="argon" size={26} />}
          tag={activeModel === 'argon' ? 'ACTIVE' : '1M CTX'}
          compact
        />
        <EditorialCard
          mode="light"
          accent="#4285f4"
          kicker="03 · FRONTIER FLAGSHIP"
          title="Gemini 4 Carbon"
          body="Kasta terkuat saat ini untuk riset ilmiah mendalam dan keamanan siber."
          enterAt={Math.max(16, aCarbon - 6)}
          icon={<ModelCoreIcon m="carbon" size={26} />}
          tag={activeModel === 'carbon' ? 'ACTIVE' : 'FLAGSHIP'}
          compact
        />
      </div>
    </AbsoluteFill>
  );
};

export const K3Krypton: React.FC = () => {
  const frame = useCurrentFrame();
  const aTester = kAnchor('s3-krypton', 'tester', 0, 5.5);
  const showSecond = frame >= aTester;

  return (
    <AbsoluteFill>
      <KryptonBackground mode="dark" accent="#38bdf8" />
      <Header index={3} total={6} label="KRYPTON LEAK" mode="dark" />
      <KHeadline
        kicker="ASAL-USUL BOCORAN · X & REDDIT"
        title="Kode Internal: krypton-a"
        mode="dark"
        accent="#38bdf8"
        size={60}
      />

      <div style={{position: 'absolute', left: M, top: 392, width: CW}}>
        <PosterFrame
          key={showSecond ? 'hero-plasma' : 'neural-wave'}
          poster={showSecond ? POSTERS.kryptonHero : POSTERS.kryptonNeural}
          mode="dark"
          enterAt={showSecond ? aTester : 4}
          width={CW}
          height={504}
          tiltDeg={showSecond ? 1.2 : -1.2}
          zoomFrom={1.0}
          zoomTo={1.08}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 924, width: CW, display: 'flex', flexDirection: 'column', gap: 16}}>
        <StepStepper
          mode="dark"
          enterAt={6}
          steps={[
            {label: 'ARGON', accent: '#ff9800', active: false, done: true},
            {label: 'CARBON', accent: '#4285f4', active: false, done: true},
            {label: 'HYDROGEN', accent: '#00e676', active: false, done: true},
            {label: 'KRYPTON-A', accent: '#38bdf8', active: true, rumor: true},
          ]}
        />
        <EditorialCard
          mode="dark"
          accent="#38bdf8"
          kicker="JEJAK PENGUJIAN"
          title="Terdeteksi di Arena Blind Testing"
          codeChip="krypton-a"
          body="Sejumlah leaker di X dan r/GeminiAI membagikan perbandingan output dari checkpoint anonim berkode krypton-a."
          enterAt={10}
          icon={<LeakRadarIcon color="#38bdf8" />}
          tag="BLIND ARENA"
          compact
        />
        <EditorialCard
          mode="dark"
          accent="#60a5fa"
          kicker="POLA PENAMAAN"
          title="Melanjutkan Seri Unsur Gemini 4"
          body="Penamaan Krypton mengikuti pola keluarga unsur DeepMind setelah Hydrogen, Carbon, dan Argon."
          enterAt={18}
          icon={<ModelCoreIcon m="carbon" size={26} color="#60a5fa" />}
          tag="CODENAME"
          compact
        />
        <TelemetryStrip
          mode="dark"
          enterAt={24}
          items={[
            {label: 'CHECKPOINT', value: 'krypton-a', accent: '#38bdf8'},
            {label: 'PLATFORM', value: 'X / r/GeminiAI'},
            {label: 'ARENA LOGS', value: 'BLIND TEST', accent: '#10b981'},
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

export const K4Klaim: React.FC = () => {
  const frame = useCurrentFrame();
  const aSvg = kAnchor('s4-klaim', 'svg', 0, 9.0);
  const aKomp = kAnchor('s4-klaim', 'kompetitor', 0, 15.0);
  const activePoster = frame >= aKomp ? POSTERS.kryptonHero : POSTERS.kryptonLight;

  return (
    <AbsoluteFill>
      <KryptonBackground mode="light" accent="#0284c7" />
      <Header index={4} total={6} label="CLAIMS" mode="light" />
      <KHeadline
        kicker="KLAIM PERFORMA YANG BEREDAR"
        title="Kenapa Ramai Dibahas?"
        mode="light"
        accent="#0284c7"
        size={60}
      />

      <div style={{position: 'absolute', left: M, top: 392, width: CW}}>
        <PosterFrame
          key={frame >= aKomp ? 'hero-end' : 'silk-main'}
          poster={activePoster}
          mode="light"
          enterAt={frame >= aKomp ? aKomp : 4}
          width={CW}
          height={504}
          zoomFrom={1.0}
          zoomTo={1.02}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 924, width: CW, display: 'flex', flexDirection: 'column', gap: 16}}>
        <EditorialCard
          mode="light"
          accent="#4285f4"
          kicker="01 · STRESS TEST"
          title="Heavy Coding & Deep Thinking"
          body="Diklaim memakai thinking token jauh lebih dalam untuk debugging dan arsitektur kode kompleks."
          enterAt={8}
          icon={<ModelCoreIcon m="argon" size={26} color="#4285f4" />}
          tag="CODING"
          compact
        />
        <EditorialCard
          mode="light"
          accent="#10b981"
          kicker="02 · VISUAL CODE"
          title="Pure SVG & Procedural 3D"
          body="Beredar demo satu prompt menghasilkan animasi SVG kompleks dan environment 3D langsung dari kode."
          enterAt={Math.max(18, aSvg - 8)}
          icon={<Cube3DIcon color="#10b981" />}
          tag="3D / SVG"
          compact
        />
        <EditorialCard
          mode="light"
          accent="#f59e0b"
          kicker="03 · RUMOR BENCHMARK"
          title="Disejajarkan Frontier Kompetitor"
          body="Beberapa unggahan di X membandingkan hasilnya langsung melawan model frontier kelas atas."
          enterAt={Math.max(28, aKomp - 8)}
          icon={<LeakRadarIcon color="#f59e0b" />}
          tag="VS FRONTIER"
          compact
        />
      </div>
    </AbsoluteFill>
  );
};

export const K5Status: React.FC = () => {
  return (
    <AbsoluteFill>
      <KryptonBackground mode="dark" accent="#f59e0b" />
      <Header index={5} total={6} label="FACT CHECK" mode="dark" />
      <KHeadline
        kicker="VERIFIKASI FAKTA RESMI"
        title="Belum Dikonfirmasi Google"
        mode="dark"
        accent="#f59e0b"
        size={60}
      />

      <div style={{position: 'absolute', left: M, top: 392, width: CW}}>
        <PosterFrame
          poster={POSTERS.kryptonMinimal}
          mode="dark"
          enterAt={4}
          width={CW}
          height={504}
          zoomFrom={1.0}
          zoomTo={1.05}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 924, width: CW, display: 'flex', flexDirection: 'column', gap: 18}}>
        <EditorialCard
          mode="dark"
          accent="#f59e0b"
          kicker="STATUS SAAT INI"
          title="Belum Ada Blog atau Model Card Resmi"
          body="Google DeepMind belum merilis pengumuman, dokumentasi API, maupun jadwal rilis publik untuk Krypton."
          enterAt={8}
          icon={<ShieldCheckIcon color="#f59e0b" />}
          tag="UNCONFIRMED"
          compact
        />
        <EditorialCard
          mode="dark"
          accent="#94a3b8"
          kicker="CATATAN KREDIBILITAS"
          title="Murni Pantauan Bocoran Komunitas"
          body="Perlakukan klaim performa yang beredar sebagai rumor pengujian internal sampai ada konfirmasi resmi."
          enterAt={22}
          icon={<LeakRadarIcon color="#94a3b8" />}
          tag="RUMOR ONLY"
          compact
        />
        <TelemetryStrip
          mode="dark"
          enterAt={28}
          items={[
            {label: 'BLOG.GOOGLE', value: 'TIDAK ADA', accent: '#ef4444'},
            {label: 'MODEL CARD', value: 'TIDAK ADA', accent: '#ef4444'},
            {label: 'VERDICT', value: 'RUMOR INTERNAL', accent: '#f59e0b'},
          ]}
        />
      </div>

      <AgencyPresenterAnchor
        gesture="warning_stop"
        speechText="Tunggu rilis resmi!"
        size={165}
        bottomOffset={220}
        side="right"
        theme="dark"
      />
    </AbsoluteFill>
  );
};

export const K6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardO = pop(frame, 10, fps);

  return (
    <AbsoluteFill>
      <KryptonBackground mode="light" accent="#0284c7" />
      <Header index={6} total={6} label="DISKUSI" mode="light" />
      <KHeadline
        kicker="PENDAPAT KALIAN?"
        title="Kasta Baru atau Eksperimen?"
        mode="light"
        accent="#0284c7"
        size={58}
      />

      <div style={{position: 'absolute', left: M, top: 392, width: CW}}>
        <PosterFrame
          poster={POSTERS.kryptonLight}
          mode="light"
          enterAt={4}
          width={CW}
          height={490}
          zoomFrom={1.0}
          zoomTo={1.02}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 912, width: CW, display: 'flex', flexDirection: 'column', gap: 18}}>
        <EditorialCard
          mode="light"
          accent="#0284c7"
          kicker="TULIS DI KOMENTAR"
          title="Bakal Rilis di Atas Carbon?"
          body="Atau Krypton ini hanya checkpoint eksperimen internal yang tidak dilepas ke publik?"
          enterAt={8}
          icon={<ChatSparkIcon color="#0284c7" />}
          tag="DISKUSI"
          compact
        />

        {/* Creator Signature End-Card: rhmt ofc */}
        <div
          style={{
            width: '100%',
            borderRadius: 14,
            backgroundColor: '#0b1120',
            border: '1px solid rgba(148, 163, 184, 0.24)',
            boxShadow: '0 20px 44px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.08)',
            padding: '24px 28px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: Math.min(1, cardO),
            transform: `translateY(${(1 - cardO) * 18}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Img
              src={staticFile('assets/gemini.svg')}
              style={{width: 42, height: 42}}
            />
            <div>
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 32, color: '#f8fafc', letterSpacing: '-0.01em'}}>
                rhmt ofc
              </div>
              <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 17, color: '#38bdf8', marginTop: 4}}>
                FOLLOW UNTUK UPDATE AI TERBARU
              </div>
            </div>
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 10,
              backgroundColor: '#00e676',
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 19,
              color: '#052e16',
              letterSpacing: '0.05em',
            }}
          >
            @rhmtofc
          </div>
        </div>

        <TelemetryStrip
          mode="light"
          enterAt={16}
          items={[
            {label: 'SERIES', value: 'GEMINI 4', accent: '#0284c7'},
            {label: 'EPISODE', value: 'KRYPTON WATCH'},
            {label: 'CREATOR', value: 'rhmt ofc', accent: '#059669'},
          ]}
        />
      </div>

      <AgencyPresenterAnchor
        gesture="thumbs_up"
        speechText="Cek update!"
        size={155}
        bottomOffset={215}
        side="right"
        theme="light"
      />
    </AbsoluteFill>
  );
};
