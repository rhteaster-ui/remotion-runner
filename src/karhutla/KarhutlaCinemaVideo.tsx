import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {loadFont as loadJakarta} from '@remotion/google-fonts/PlusJakartaSans';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import timeline from '../data/karhutla-timeline.json';

const jakarta = loadJakarta('normal', {weights: ['400', '500', '600', '700'], subsets: ['latin']});
const serif = loadSerif('italic', {weights: ['400'], subsets: ['latin']});
const mono = loadMono('normal', {weights: ['400', '600', '700'], subsets: ['latin']});

const SANS = `${jakarta.fontFamily}, -apple-system, sans-serif`;
const SERIF = `${serif.fontFamily}, Georgia, serif`;
const MONO = `${mono.fontFamily}, Menlo, monospace`;

export const KARHUTLA_FPS = timeline.fps;
export const KARHUTLA_W = timeline.width;
export const KARHUTLA_H = timeline.height;
export const KARHUTLA_TOTAL_FRAMES = timeline.totalFrames;

const E = Easing.bezier(0.25, 0.1, 0.25, 1);
const ramp = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E});
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const media = (f: string) => staticFile(`media/karhutla/${f}`);
const XFADE = 24; // Smooth 0.8s cinematic cross-dissolve between chapters

type WordTiming = {word: string; start: number; end: number};

/** 2.39:1 Anamorphic Matte Bars + Subtle Telemetry + Clean Film Subtitles */
const CinemaFrameOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  let idx = 0;
  timeline.scenes.forEach((s, i) => {
    if (frame >= s.startFrame) idx = i;
  });
  const sc = timeline.scenes[idx];
  const sf = frame - sc.startFrame;
  const t = sf / KARHUTLA_FPS;
  const words = (sc.wordTimings || []) as WordTiming[];

  // Split into clean 9-word cinematic subtitle lines inside bottom matte bar
  const CHUNK = 9;
  const chunks: WordTiming[][] = [];
  for (let i = 0; i < words.length; i += CHUNK) chunks.push(words.slice(i, i + CHUNK));
  let cIdx = 0;
  chunks.forEach((c, i) => {
    if (t >= c[0].start - 0.1) cIdx = i;
  });
  const activeChunk = chunks[cIdx] || [];
  const subFade = sf <= 8 ? ramp(sf, 0, 8) : sf >= sc.durationInFrames - 12 ? ramp(sf, sc.durationInFrames - 12, sc.durationInFrames, 1, 0) : 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 70}}>
      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 54%, rgba(2,4,8,0.72) 100%)',
        }}
      />

      {/* Subtle animated 35mm film grain */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          opacity: 0.045,
          backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 0.7px, transparent 0.7px)`,
          backgroundSize: '4px 4px',
          transform: `translate(${(random(`gx-${frame}`) - 0.5) * 8}px, ${(random(`gy-${frame}`) - 0.5) * 8}px)`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Top Cinema Matte Bar (88px) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 88,
          background: '#05070A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 64px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{fontFamily: MONO, fontSize: 13, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)'}}>
          0{idx + 1} / {sc.title.toUpperCase()}
        </div>
        <div style={{fontFamily: MONO, fontSize: 13, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)'}}>
          INDONESIA · 27 NOVEMBER 2026
        </div>
      </div>

      {/* Bottom Cinema Matte Bar (104px) with crisp film subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 104,
          background: '#05070A',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 120px',
        }}
      >
        <div style={{fontFamily: SANS, fontSize: 27, fontWeight: 500, letterSpacing: '0.01em', textAlign: 'center', opacity: subFade, lineHeight: 1.35}}>
          {activeChunk.map((w, i) => {
            const spoken = t >= w.start - 0.05;
            const active = t >= w.start - 0.05 && t <= w.end + 0.14;
            return (
              <span
                key={`${cIdx}-${i}`}
                style={{
                  display: 'inline-block',
                  marginRight: '0.28em',
                  color: active ? '#FDE68A' : spoken ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.48)',
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Minimal Documentary Editorial Lower-Third (no UI boxes) */
const LowerThird: React.FC<{f: number; at: number; dur: number; eyebrow: string; headline: string; accent?: string}> = ({
  f,
  at,
  dur,
  eyebrow,
  headline,
  accent = '#F59E0B',
}) => {
  const inP = ramp(f, at, at + 22);
  const outP = ramp(f, at + dur - 22, at + dur, 1, 0);
  const o = inP * outP;
  if (o <= 0.01) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 72,
        bottom: 138,
        zIndex: 50,
        opacity: o,
        transform: `translateY(${(1 - inP) * 16}px)`,
        borderLeft: `3px solid ${accent}`,
        paddingLeft: 20,
        textShadow: '0 2px 16px rgba(0,0,0,0.85)',
      }}
    >
      <div style={{fontFamily: MONO, fontSize: 14, fontWeight: 700, letterSpacing: '0.22em', color: accent}}>{eyebrow}</div>
      <div style={{fontFamily: SANS, fontSize: 34, fontWeight: 600, color: '#FFFFFF', marginTop: 4, letterSpacing: '-0.01em'}}>{headline}</div>
    </div>
  );
};

/** C1: Cold Open — Aerial Misty Canopy + Title Reveal */
const Chapter1Canopy: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const zoom = ramp(f, 0, dur, 1.0, 1.08);
  const titleIn = ramp(f, 24, 60);
  const titleOut = ramp(f, 190, 230, 1, 0);
  const fadeOut = ramp(f, dur - XFADE, dur, 1, 0);

  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`, filter: 'contrast(1.12) saturate(0.84) brightness(0.82)'}}>
        <OffthreadVideo src={media('clip_mist.mp4')} loop muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,10,16,0.45) 0%, rgba(5,10,16,0.18) 50%, rgba(5,10,16,0.62) 100%)'}} />

      {/* Center Documentary Opening Title */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: titleIn * titleOut,
          transform: `translateY(${(1 - titleIn) * 18}px)`,
          textShadow: '0 6px 32px rgba(0,0,0,0.75)',
        }}
      >
        <div style={{fontFamily: MONO, fontSize: 16, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.78)', marginBottom: 14}}>
          LAPORAN LINGKUNGAN · NOVEMBER 2026
        </div>
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 94, color: '#FFFFFF', letterSpacing: '0.01em'}}>
          Di Balik Kabut Nusantara
        </div>
        <div style={{width: 72 * titleIn, height: 1.5, background: 'rgba(255,255,255,0.6)', marginTop: 18}} />
      </div>
    </AbsoluteFill>
  );
};

/** C2: Wildfire Real Footage -> Flames Horizon + 437 Hotspot Telemetry */
const Chapter2Hotspot: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const inFade = ramp(f, 0, XFADE);
  const outFade = ramp(f, dur - XFADE, dur, 1, 0);
  const split = 230;
  const photoAlpha = ramp(f, split - 24, split + 18);
  const kbZoom = ramp(f, split - 24, dur, 1.0, 1.12);

  return (
    <AbsoluteFill style={{opacity: inFade * outFade}}>
      {/* Real intense wildfire video clip */}
      <div style={{position: 'absolute', inset: 0, filter: 'contrast(1.16) saturate(1.18) brightness(0.88)'}}>
        <OffthreadVideo src={media('clip_fire.mp4')} loop muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {/* Cross-dissolve to high-contrast flames over dark forest smoke */}
      {f >= split - 26 && (
        <div style={{position: 'absolute', inset: 0, opacity: photoAlpha, transform: `scale(${kbZoom})`, filter: 'contrast(1.18) saturate(1.2) brightness(0.86)'}}>
          <Img src={media('img_fire_flames.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}

      {/* Subtle warm ember atmosphere */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,6,4,0.38) 0%, rgba(12,6,4,0.12) 45%, rgba(10,5,4,0.72) 100%)'}} />

      <LowerThird
        f={f}
        at={45}
        dur={290}
        eyebrow="SIPONGI+ KEMENHUT · 27 NOVEMBER 2026"
        headline="437 Titik Panas Terdeteksi Nasional"
        accent="#F59E0B"
      />
    </AbsoluteFill>
  );
};

/** C3: Satellite Perspective — Borneo/Sumatra -> Copernicus 2026 + Eastern Shift */
const Chapter3Satellite: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const inFade = ramp(f, 0, XFADE);
  const outFade = ramp(f, dur - XFADE, dur, 1, 0);
  const split = 210;
  const copAlpha = ramp(f, split - 24, split + 22);
  const panX1 = ramp(f, 0, split + 20, 20, -35);
  const zoom1 = ramp(f, 0, split + 20, 1.08, 1.18);
  const zoom2 = ramp(f, split - 24, dur, 1.24, 1.36);
  const pulse = 0.55 + 0.45 * Math.sin(f / 6);

  return (
    <AbsoluteFill style={{opacity: inFade * outFade}}>
      {/* Shot A: NASA Terra Borneo & Sumatra */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${panX1}px) scale(${zoom1})`, filter: 'contrast(1.12) saturate(0.95) brightness(0.86)'}}>
        <Img src={media('img_borneo_sumatra.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {/* Shot B: Copernicus 2026 Indonesia Aerosol/Wildfire Smoke Plume (zoomed cleanly over archipelago, hiding outer logos) */}
      {f >= split - 26 && (
        <div style={{position: 'absolute', inset: 0, opacity: copAlpha, transform: `scale(${zoom2})`, transformOrigin: '54% 52%', filter: 'contrast(1.14) saturate(1.05) brightness(0.88)'}}>
          <Img src={media('img_copernicus_2026.webp')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          {/* Minimalist Satellite Reticle over Papua Selatan */}
          <div style={{position: 'absolute', left: '62%', top: '53%', opacity: ramp(f, split + 30, split + 65)}}>
            <div style={{width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #F87171', opacity: pulse, transform: 'translate(-50%, -50%)'}} />
            <div style={{position: 'absolute', left: 16, top: -8, fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: '#FECACA', whiteSpace: 'nowrap', textShadow: '0 2px 8px #000'}}>
              PAPUA SELATAN · 179–222
            </div>
          </div>
        </div>
      )}

      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,8,14,0.4) 0%, transparent 40%, rgba(4,8,14,0.68) 100%)'}} />

      <LowerThird
        f={f}
        at={40}
        dur={350}
        eyebrow="KONSENTRASI KAWASAN TIMUR"
        headline="Papua Selatan · Sulawesi Tenggara · Maluku Utara"
        accent="#EF4444"
      />
    </AbsoluteFill>
  );
};

/** C4: Monsoon Transition — Orbital Storms -> Heavy Forest Rain + Flood Warning */
const Chapter4Monsoon: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const inFade = ramp(f, 0, XFADE);
  const outFade = ramp(f, dur - XFADE, dur, 1, 0);
  const split = 210;
  const rainAlpha = ramp(f, split - 24, split + 20);

  return (
    <AbsoluteFill style={{opacity: inFade * outFade}}>
      {/* Shot A: Orbital Supercell Storm Clouds */}
      <div style={{position: 'absolute', inset: 0, filter: 'contrast(1.18) saturate(0.88) brightness(0.85)'}}>
        <OffthreadVideo src={media('clip_storms.mp4')} loop muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {/* Shot B: Real Heavy Rain in Forest */}
      {f >= split - 26 && (
        <div style={{position: 'absolute', inset: 0, opacity: rainAlpha, filter: 'contrast(1.15) saturate(0.75) brightness(0.80)'}}>
          <OffthreadVideo src={media('clip_rain.mp4')} loop muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}

      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,12,24,0.42) 0%, rgba(6,12,24,0.16) 50%, rgba(4,8,16,0.75) 100%)'}} />

      <LowerThird
        f={f}
        at={60}
        dur={390}
        eyebrow="PERINGATAN DINI BMKG & BNPB"
        headline="Peralihan Musim Hujan: Waspada Banjir Bandang & Longsor"
        accent="#38BDF8"
      />
    </AbsoluteFill>
  );
};

/** C5: Epilogue — Aerial Wildfire Plume Dissolving into Quiet Forest Mist & End Slate */
const Chapter5Epilogue: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const inFade = ramp(f, 0, XFADE);
  const kbZoom = ramp(f, 0, 220, 1.0, 1.1);
  const mistAlpha = ramp(f, 175, 225);
  const slateIn = ramp(f, 290, 330);
  const fadeOut = ramp(f, dur - 30, dur, 1, 0);

  return (
    <AbsoluteFill style={{opacity: inFade * fadeOut}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${kbZoom})`, filter: 'contrast(1.14) saturate(0.85) brightness(0.82)'}}>
        <Img src={media('img_fire_smoke.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>

      {f >= 170 && (
        <div style={{position: 'absolute', inset: 0, opacity: mistAlpha, filter: 'contrast(1.1) saturate(0.78) brightness(0.65)'}}>
          <OffthreadVideo src={media('clip_mist.mp4')} loop muted startFrom={60} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}

      {/* Darken cleanly for Closing Credits */}
      <div style={{position: 'absolute', inset: 0, background: `rgba(5,7,10,${0.32 + 0.62 * slateIn})`}} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: slateIn,
          transform: `translateY(${(1 - slateIn) * 14}px)`,
        }}
      >
        <div style={{fontFamily: MONO, fontSize: 15, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.65)'}}>
          SUMBER DATA TERVERIFIKASI
        </div>
        <div style={{fontFamily: SANS, fontSize: 34, fontWeight: 600, color: '#FFFFFF', marginTop: 14, letterSpacing: '0.04em'}}>
          SiPongi+ Kemenhut · BMKG · BNPB
        </div>
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 28, color: '#FDE68A', marginTop: 10}}>
          27 November 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CHAPTERS = [Chapter1Canopy, Chapter2Hotspot, Chapter3Satellite, Chapter4Monsoon, Chapter5Epilogue];

export const KarhutlaCinemaVideo: React.FC = () => (
  <AbsoluteFill style={{background: '#05070A'}}>
    {/* Deep Ambient Cinematic Underscore */}
    <Audio src={staticFile('audio/karhutla/ambient_cinema.mp3')} volume={0.42} />

    {timeline.scenes.map((sc, i) => {
      const Comp = CHAPTERS[i];
      const ov = i === 0 ? 0 : XFADE;
      const from = sc.startFrame - ov;
      const next = timeline.scenes[i + 1];
      const end = next ? next.startFrame + XFADE : KARHUTLA_TOTAL_FRAMES;
      const dur = end - from;

      return (
        <React.Fragment key={sc.id}>
          <Sequence from={from} durationInFrames={dur}>
            <Comp dur={dur} />
          </Sequence>
          <Sequence from={sc.startFrame} durationInFrames={Math.ceil(sc.audioDuration * KARHUTLA_FPS) + 6}>
            <Audio src={staticFile(sc.audio)} volume={1} />
          </Sequence>
          {i > 0 && (
            <Sequence from={sc.startFrame - 6} durationInFrames={45}>
              <Audio src={staticFile('audio/sfx/impact.mp3')} volume={0.22} />
            </Sequence>
          )}
        </React.Fragment>
      );
    })}

    <CinemaFrameOverlay />
  </AbsoluteFill>
);
