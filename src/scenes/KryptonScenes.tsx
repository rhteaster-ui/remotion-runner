import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background, Header} from '../components/Chrome';
import {EditorialCard, POSTERS, PosterFrame, StepStepper} from '../components/PosterStage';
import {ModelCoreIcon} from '../components/ModelIcons';
import {kAnchor} from '../lib/kryptonAnchors';
import {CW, FONT, M, Mode, pal} from '../lib/theme';
import {pop} from '../lib/anim';

const KHeadline: React.FC<{kicker: string; title: string; mode: Mode; accent: string; size?: number}> = ({
  kicker,
  title,
  mode,
  accent,
  size = 68,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal(mode);
  const o = pop(frame, 3, fps);
  return (
    <div style={{position: 'absolute', left: M, top: 224, width: CW, opacity: Math.min(1, o), transform: `translateY(${(1 - o) * 20}px)`}}>
      <div style={{fontFamily: FONT.mono, fontWeight: 700, fontSize: 22, color: accent, letterSpacing: '0.07em'}}>
        {kicker}
      </div>
      <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: size, lineHeight: 1.12, color: p.ink, marginTop: 10, letterSpacing: '-0.02em'}}>
        {title}
      </div>
    </div>
  );
};

// Sharp vector SVG icons (no generic emojis)
const LeakRadarIcon: React.FC<{color?: string}> = ({color = '#10b981'}) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="12" x2="18.5" y2="5.5" />
  </svg>
);

const ShieldCheckIcon: React.FC<{color?: string}> = ({color = '#f59e0b'}) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Cube3DIcon: React.FC<{color?: string}> = ({color = '#10b981'}) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ChatSparkIcon: React.FC<{color?: string}> = ({color = '#0284c7'}) => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
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
      <Background mode="dark" accent={isKryptonPhase ? '#10b981' : '#4285f4'} />
      <Header index={1} total={6} label="HOOK" mode="dark" />
      <KHeadline
        kicker="GEMINI 4 · RUMOR WATCH"
        title={isKryptonPhase ? 'Muncul Isu Baru: Krypton' : 'Setelah Argon, Carbon & Hydrogen'}
        mode="dark"
        accent={isKryptonPhase ? '#10b981' : '#38bdf8'}
        size={62}
      />

      {/* Stage Hero: Sequential 3 official posters fanning into Krypton leak poster */}
      <div style={{position: 'absolute', left: M, top: 410, width: CW, height: 560}}>
        {!isKryptonPhase ? (
          <>
            <PosterFrame
              poster={POSTERS.argon}
              mode="dark"
              enterAt={Math.max(4, aArgon - 6)}
              width={660}
              height={372}
              tiltDeg={-4}
              style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
            />
            <PosterFrame
              poster={POSTERS.carbon}
              mode="dark"
              enterAt={Math.max(12, aCarbon - 6)}
              width={660}
              height={372}
              tiltDeg={2}
              style={{position: 'absolute', right: 0, top: 88, zIndex: 2}}
            />
            <PosterFrame
              poster={POSTERS.hydrogen}
              mode="dark"
              enterAt={Math.max(20, aHyd - 6)}
              width={660}
              height={372}
              tiltDeg={-2}
              style={{position: 'absolute', left: 138, top: 184, zIndex: 3}}
            />
          </>
        ) : (
          <PosterFrame
            poster={POSTERS.kryptonLeak1}
            mode="dark"
            enterAt={aKrypton}
            width={CW}
            height={526}
            tiltDeg={1.5}
            zoomFrom={1.0}
            zoomTo={1.1}
          />
        )}
      </div>

      {/* Editorial Analysis Deck */}
      <div style={{position: 'absolute', left: M, top: 1005, width: CW, display: 'flex', flexDirection: 'column', gap: 22}}>
        <StepStepper
          mode="dark"
          enterAt={6}
          steps={[
            {label: 'ARGON', accent: '#ff9800', active: !isKryptonPhase && frame >= aArgon, done: isKryptonPhase},
            {label: 'CARBON', accent: '#4285f4', active: !isKryptonPhase && frame >= aCarbon, done: isKryptonPhase},
            {label: 'HYDROGEN', accent: '#00e676', active: !isKryptonPhase && frame >= aHyd, done: isKryptonPhase},
            {label: 'KRYPTON?', accent: '#10b981', active: isKryptonPhase},
          ]}
        />
        <EditorialCard
          mode="dark"
          accent={isKryptonPhase ? '#10b981' : '#4285f4'}
          kicker={isKryptonPhase ? 'TRENDING DI KOMUNITAS AI' : 'SERI RESMI GEMINI 4'}
          title={isKryptonPhase ? 'Checkpoint Misterius: krypton-a' : 'Tiga Varian Resmi Sudah Rilis'}
          body={
            isKryptonPhase
              ? 'Belum genap sebulan seri Gemini 4 lengkap, muncul bocoran nama baru yang ramai dibahas di X.'
              : 'Argon, Carbon, dan Hydrogen sudah diumumkan resmi di blog.google untuk tiap kelas kerja.'
          }
          enterAt={isKryptonPhase ? aKrypton + 6 : 12}
          icon={isKryptonPhase ? <LeakRadarIcon color="#10b981" /> : <ModelCoreIcon m="carbon" size={30} />}
          tag={isKryptonPhase ? 'NEW ISSUE' : '3 MODELS'}
        />
      </div>
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
      <Background mode="light" accent={accentMap[activeModel]} />
      <Header index={2} total={6} label="OFFICIAL LINEUP" mode="light" />
      <KHeadline
        kicker="PETA KASTA RESMI GOOGLE DEEPMIND"
        title="Posisi 3 Model Sebelumnya"
        mode="light"
        accent="#0284c7"
        size={64}
      />

      <div style={{position: 'absolute', left: M, top: 405, width: CW}}>
        <PosterFrame
          key={activeModel}
          poster={posterMap[activeModel]}
          mode="light"
          enterAt={activeModel === 'hydrogen' ? 4 : activeModel === 'argon' ? aArgon : aCarbon}
          width={CW}
          height={526}
          zoomFrom={1.01}
          zoomTo={1.07}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 970, width: CW, display: 'flex', flexDirection: 'column', gap: 18}}>
        <EditorialCard
          mode="light"
          accent="#00e676"
          kicker="01 · RAPID EXECUTION"
          title="Gemini 4 Hydrogen"
          body="Eksekusi cepat, hemat kuota, dan andalan coding harian serta workflow agentic."
          enterAt={Math.max(4, aHyd - 6)}
          icon={<ModelCoreIcon m="hydrogen" size={28} />}
          tag={activeModel === 'hydrogen' ? 'ACTIVE' : 'SPEED'}
        />
        <EditorialCard
          mode="light"
          accent="#ff9800"
          kicker="02 · LONG-HORIZON"
          title="Gemini 4 Argon"
          body="Fokus reasoning jangka panjang, konteks 1M token, dan navigasi repo besar."
          enterAt={Math.max(10, aArgon - 6)}
          icon={<ModelCoreIcon m="argon" size={28} />}
          tag={activeModel === 'argon' ? 'ACTIVE' : '1M CTX'}
        />
        <EditorialCard
          mode="light"
          accent="#4285f4"
          kicker="03 · FRONTIER FLAGSHIP"
          title="Gemini 4 Carbon"
          body="Kasta terkuat saat ini untuk riset ilmiah mendalam dan keamanan siber."
          enterAt={Math.max(16, aCarbon - 6)}
          icon={<ModelCoreIcon m="carbon" size={28} />}
          tag={activeModel === 'carbon' ? 'ACTIVE' : 'FLAGSHIP'}
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
      <Background mode="dark" accent="#10b981" />
      <Header index={3} total={6} label="KRYPTON LEAK" mode="dark" />
      <KHeadline
        kicker="ASAL-USUL BOCORAN · X & REDDIT"
        title="Kode Internal: krypton-a"
        mode="dark"
        accent="#10b981"
        size={64}
      />

      <div style={{position: 'absolute', left: M, top: 410, width: CW}}>
        <PosterFrame
          key={showSecond ? 'leak2' : 'leak1'}
          poster={showSecond ? POSTERS.kryptonLeak2 : POSTERS.kryptonLeak1}
          mode="dark"
          enterAt={showSecond ? aTester : 4}
          width={CW}
          height={526}
          tiltDeg={showSecond ? -1.5 : 1.5}
          zoomFrom={1.0}
          zoomTo={1.09}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 985, width: CW, display: 'flex', flexDirection: 'column', gap: 22}}>
        <StepStepper
          mode="dark"
          enterAt={6}
          steps={[
            {label: 'ARGON', accent: '#ff9800', active: false, done: true},
            {label: 'CARBON', accent: '#4285f4', active: false, done: true},
            {label: 'HYDROGEN', accent: '#00e676', active: false, done: true},
            {label: 'KRYPTON-A', accent: '#10b981', active: true},
          ]}
        />
        <EditorialCard
          mode="dark"
          accent="#10b981"
          kicker="JEJAK PENGUJIAN"
          title="Terdeteksi di Arena Blind Testing"
          body="Sejumlah leaker di X dan r/GeminiAI membagikan perbandingan output dari checkpoint anonim berkode krypton-a."
          enterAt={10}
          icon={<LeakRadarIcon color="#10b981" />}
          tag="BLIND ARENA"
        />
        <EditorialCard
          mode="dark"
          accent="#38bdf8"
          kicker="POLA PENAMAAN"
          title="Melanjutkan Seri Unsur Gemini 4"
          body="Penamaan Krypton mengikuti pola keluarga unsur DeepMind setelah Hydrogen, Carbon, dan Argon."
          enterAt={Math.max(20, aTester)}
          icon={<ModelCoreIcon m="carbon" size={28} color="#38bdf8" />}
          tag="CODENAME"
        />
      </div>
    </AbsoluteFill>
  );
};

export const K4Klaim: React.FC = () => {
  const frame = useCurrentFrame();
  const aSvg = kAnchor('s4-klaim', 'svg', 0, 9.0);
  const aKomp = kAnchor('s4-klaim', 'kompetitor', 0, 15.0);
  const activePoster = frame >= aKomp ? POSTERS.kryptonLeak1 : POSTERS.kryptonYt;

  return (
    <AbsoluteFill>
      <Background mode="light" accent="#0284c7" />
      <Header index={4} total={6} label="CLAIMS" mode="light" />
      <KHeadline
        kicker="KLAIM PERFORMA YANG BEREDAR"
        title="Kenapa Ramai Dibahas?"
        mode="light"
        accent="#0284c7"
        size={64}
      />

      <div style={{position: 'absolute', left: M, top: 405, width: CW}}>
        <PosterFrame
          key={frame >= aKomp ? 'yt-end' : 'yt-main'}
          poster={activePoster}
          mode="light"
          enterAt={frame >= aKomp ? aKomp : 4}
          width={CW}
          height={526}
          zoomFrom={1.02}
          zoomTo={1.12}
          panX={frame >= aSvg ? -14 : 0}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 970, width: CW, display: 'flex', flexDirection: 'column', gap: 18}}>
        <EditorialCard
          mode="light"
          accent="#4285f4"
          kicker="01 · STRESS TEST"
          title="Heavy Coding & Deep Thinking"
          body="Diklaim memakai thinking token jauh lebih dalam untuk debugging dan arsitektur kode kompleks."
          enterAt={8}
          icon={<ModelCoreIcon m="argon" size={28} color="#4285f4" />}
          tag="CODING"
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
        />
      </div>
    </AbsoluteFill>
  );
};

export const K5Status: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background mode="dark" accent="#f59e0b" />
      <Header index={5} total={6} label="FACT CHECK" mode="dark" />
      <KHeadline
        kicker="VERIFIKASI FAKTA RESMI"
        title="Belum Dikonfirmasi Google"
        mode="dark"
        accent="#f59e0b"
        size={62}
      />

      <div style={{position: 'absolute', left: M, top: 410, width: CW}}>
        <PosterFrame
          poster={POSTERS.kryptonLeak2}
          mode="dark"
          enterAt={4}
          width={CW}
          height={526}
          zoomFrom={1.0}
          zoomTo={1.05}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 985, width: CW, display: 'flex', flexDirection: 'column', gap: 22}}>
        <EditorialCard
          mode="dark"
          accent="#f59e0b"
          kicker="STATUS SAAT INI"
          title="Belum Ada Blog atau Model Card Resmi"
          body="Google DeepMind belum merilis pengumuman, dokumentasi API, maupun jadwal rilis publik untuk Krypton."
          enterAt={8}
          icon={<ShieldCheckIcon color="#f59e0b" />}
          tag="UNCONFIRMED"
        />
        <EditorialCard
          mode="dark"
          accent="#94a3b8"
          kicker="CATATAN KREDIBILITAS"
          title="Murni Pantauan Bocoran Komunitas"
          body="Perlakukan klaim performa yang beredar sebagai rumor pengujian internal sampai ada konfirmasi resmi."
          enterAt={24}
          icon={<LeakRadarIcon color="#94a3b8" />}
          tag="RUMOR ONLY"
        />
      </div>
    </AbsoluteFill>
  );
};

export const K6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = pal('light');
  const cardO = pop(frame, 10, fps);

  return (
    <AbsoluteFill>
      <Background mode="light" accent="#0284c7" />
      <Header index={6} total={6} label="DISKUSI" mode="light" />
      <KHeadline
        kicker="PENDAPAT KALIAN?"
        title="Kasta Baru atau Eksperimen?"
        mode="light"
        accent="#0284c7"
        size={60}
      />

      <div style={{position: 'absolute', left: M, top: 405, width: CW}}>
        <PosterFrame
          poster={POSTERS.kryptonLeak1}
          mode="light"
          enterAt={4}
          width={CW}
          height={490}
          zoomFrom={1.02}
          zoomTo={1.08}
        />
      </div>

      <div style={{position: 'absolute', left: M, top: 935, width: CW, display: 'flex', flexDirection: 'column', gap: 20}}>
        <EditorialCard
          mode="light"
          accent="#0284c7"
          kicker="TULIS DI KOMENTAR"
          title="Bakal Rilis di Atas Carbon?"
          body="Atau Krypton ini hanya checkpoint eksperimen internal yang tidak dilepas ke publik?"
          enterAt={8}
          icon={<ChatSparkIcon color="#0284c7" />}
          tag="DISKUSI"
        />

        {/* Creator Signature End-Card: rhmt ofc */}
        <div
          style={{
            width: '100%',
            borderRadius: 24,
            backgroundColor: '#0b1120',
            border: '2px solid #1e293b',
            boxShadow: '0 22px 48px rgba(15,23,42,0.22)',
            padding: '28px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: Math.min(1, cardO),
            transform: `translateY(${(1 - cardO) * 20}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Img
              src={staticFile('assets/gemini.svg')}
              style={{width: 44, height: 44}}
            />
            <div>
              <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: '#f8fafc', letterSpacing: '-0.01em'}}>
                rhmt ofc
              </div>
              <div style={{fontFamily: FONT.mono, fontWeight: 600, fontSize: 18, color: '#38bdf8', marginTop: 4}}>
                FOLLOW UNTUK UPDATE AI TERBARU
              </div>
            </div>
          </div>
          <div
            style={{
              padding: '12px 22px',
              borderRadius: 14,
              backgroundColor: '#10b981',
              fontFamily: FONT.mono,
              fontWeight: 800,
              fontSize: 20,
              color: '#052e16',
              letterSpacing: '0.05em',
            }}
          >
            @rhmtofc
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
