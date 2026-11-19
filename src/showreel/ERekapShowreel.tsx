import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { E, p } from './motion';
import { Bg, CHAPTERS, Header, SubtitlePill, T } from './primitives';
import { SceneCold, ScenePreview, SceneRamp, SceneDevices } from './scenes1';
import { SceneDashboard, SceneExcel, ScenePrint, SceneBackup } from './scenes2';
import { SceneMontage, SceneOutro } from './scenes3';

export const SHOWREEL_TOTAL_FRAMES = 2040; // 68 detik @ 30 FPS (= panjang chip-music-bed.mp3)

type TKind = 'wipe' | 'zoom' | 'flash' | 'whip' | 'iris';

const SCENES: { from: number; dur: number; C: React.FC; sub?: string }[] = [
  { from: 0, dur: 150, C: SceneCold },
  { from: 150, dur: 210, C: ScenePreview, sub: 'Pratinjau proyek E-Rekap langsung dari browser — cepat, terang, dan rapi.' },
  { from: 360, dur: 240, C: SceneRamp, sub: 'Kamera berpindah antar keyframe — melaju cepat, lalu melambat tepat di momen penting.' },
  { from: 600, dur: 210, C: SceneDevices, sub: 'Satu data, semua layar: laptop dan ponsel selalu sinkron.' },
  { from: 810, dur: 210, C: SceneDashboard, sub: 'Angka kehadiran terhitung otomatis — hadir, sakit, izin, dan alpha.' },
  { from: 1020, dur: 240, C: SceneExcel, sub: 'Mode Excel layar penuh: audit kehadiran siswa dengan cepat dan terstruktur.' },
  { from: 1260, dur: 240, C: ScenePrint, sub: 'Format formal A4 dengan Kop Madrasah — siap cetak dan terverifikasi.' },
  { from: 1500, dur: 180, C: SceneBackup, sub: 'Backup spreadsheet satu ketukan, data tersimpan aman di SQLite.' },
  { from: 1680, dur: 150, C: SceneMontage },
  { from: 1830, dur: 210, C: SceneOutro },
];

// transisi pada batas scene i → i+1
const BOUNDARIES: TKind[] = ['wipe', 'zoom', 'flash', 'whip', 'iris', 'wipe', 'zoom', 'flash', 'iris'];
const OV = 14;
const overlapKind = (k?: TKind) => (k === 'zoom' || k === 'whip' ? k : null);

/* ───── transisi berbasis overlap (kedua scene tampil bersamaan) ───── */
const SceneWrap: React.FC<{ enter: TKind | null; exit: TKind | null; children: React.ReactNode }> = ({ enter, exit, children }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  let opacity = 1;
  let scale = 1;
  let tx = 0;
  let blur = 0;
  if (enter) {
    const q = p(f, 0, OV, E.out);
    if (enter === 'zoom') { opacity *= q; scale *= 0.86 + 0.14 * q; blur = Math.max(blur, (1 - q) * 10); }
    if (enter === 'whip') { tx += (1 - q) * 1920; blur = Math.max(blur, (1 - q) * 18); }
  }
  if (exit) {
    const q = p(f, D - OV, D, E.in);
    if (exit === 'zoom') { opacity *= 1 - q; scale *= 1 + 0.22 * q; blur = Math.max(blur, q * 10); }
    if (exit === 'whip') { tx += -q * 1920; blur = Math.max(blur, q * 18); }
  }
  return (
    <AbsoluteFill style={{ opacity, transform: `translateX(${tx}px) scale(${scale})`, filter: blur > 0.1 ? `blur(${blur}px)` : undefined }}>
      {children}
    </AbsoluteFill>
  );
};

/* ───── transisi overlay (cut tersembunyi di bawah panel) ───── */
const Wipe: React.FC<{ b: number }> = ({ b }) => {
  const f = useCurrentFrame();
  if (f < b - 14 || f > b + 30) return null;
  const cols = [T.canopy, T.lime, '#FFFFFF'];
  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none', zIndex: 200 }}>
      {[2, 1, 0].map((i) => {
        const q = p(f, b - 11 + 3 * i, b + 11 + 3 * i, E.inOut);
        return <div key={i} style={{ position: 'absolute', top: -60, bottom: -60, left: `${-170 + 270 * q}%`, width: '160%', background: cols[i], transform: 'skewX(-14deg)' }} />;
      })}
    </AbsoluteFill>
  );
};

const Iris: React.FC<{ b: number }> = ({ b }) => {
  const f = useCurrentFrame();
  if (f < b - 14 || f > b + 16) return null;
  const closing = f < b;
  const r = (closing ? p(f, b - 14, b, E.in) : p(f, b, b + 16, E.out)) * 1700;
  const maskImg = `radial-gradient(circle at 50% 50%, transparent ${r}px, #000 ${r + 1}px)`;
  const icon = p(f, b - 8, b - 2, E.back) * (1 - p(f, b + 2, b + 8));
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 200 }}>
      <AbsoluteFill
        style={
          closing
            ? { background: T.canopy, clipPath: `circle(${r}px at 50% 50%)` }
            : { background: T.canopy, WebkitMaskImage: maskImg, maskImage: maskImg }
        }
      />
      {icon > 0 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Img src={staticFile('assets/erekap/icon-erekap.png')} style={{ width: 200, borderRadius: 46, transform: `scale(${icon})`, opacity: icon }} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ b: number }> = ({ b }) => {
  const f = useCurrentFrame();
  if (f < b - 4 || f > b + 12) return null;
  const q = f < b ? p(f, b - 4, b, E.in) : 1 - p(f, b, b + 12, E.out);
  return <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, #FFFFFF 10%, ${T.lime} 100%)`, opacity: q, pointerEvents: 'none', zIndex: 200 }} />;
};

/* ───── SFX & BGM ───── */
const LEN: Record<string, number> = {
  ding: 1.6, impact: 2, key: 0.06, 'lock-click': 0.35, 'pop-soft': 0.14, pop: 0.11, print: 1.5, riser: 1.3,
  shimmer: 1.7, stamp: 0.5, 'success-arp': 1.3, swell: 3.4, tick: 0.03, 'whoosh-soft': 0.7, 'whoosh-wipe': 1.1,
};
type Cue = { f: number; n: keyof typeof LEN; v?: number };

const buildCues = (): Cue[] => {
  const c: Cue[] = [];
  // transisi
  BOUNDARIES.forEach((k, i) => {
    const b = SCENES[i + 1].from;
    if (k === 'wipe') c.push({ f: b - 12, n: 'whoosh-wipe' });
    if (k === 'iris') c.push({ f: b - 14, n: 'whoosh-wipe' });
    if (k === 'zoom') c.push({ f: b - 4, n: 'whoosh-soft' });
    if (k === 'whip') c.push({ f: b - 2, n: 'whoosh-soft', v: 0.65 });
    if (k === 'flash') c.push({ f: b - 3, n: 'pop' }, { f: b - 1, n: 'shimmer', v: 0.4 });
  });
  // S0
  c.push({ f: 0, n: 'riser', v: 0.35 }, { f: 0, n: 'pop' }, { f: 26, n: 'pop' }, { f: 52, n: 'pop' }, { f: 78, n: 'pop' }, { f: 108, n: 'shimmer' }, { f: 124, n: 'ding', v: 0.45 });
  // S1
  [156, 160, 164, 168, 172, 176].forEach((f) => c.push({ f, n: 'key', v: 0.6 }));
  c.push({ f: 194, n: 'lock-click' }, { f: 250, n: 'pop-soft' }, { f: 257, n: 'pop-soft' }, { f: 264, n: 'pop-soft' }, { f: 270, n: 'pop-soft' });
  // S2
  c.push({ f: 384, n: 'whoosh-soft' }, { f: 392, n: 'tick' }, { f: 408, n: 'tick' }, { f: 456, n: 'tick' }, { f: 480, n: 'swell', v: 0.4 }, { f: 560, n: 'ding', v: 0.4 });
  // S3
  c.push({ f: 612, n: 'pop-soft' }, { f: 646, n: 'pop-soft' }, { f: 660, n: 'tick' });
  // S4
  [818, 824, 830, 836].forEach((f) => c.push({ f, n: 'pop-soft' }));
  [840, 846, 852].forEach((f) => c.push({ f, n: 'tick' }));
  c.push({ f: 940, n: 'success-arp', v: 0.4 });
  // S5
  c.push({ f: 1054, n: 'lock-click' }, { f: 1084, n: 'whoosh-soft', v: 0.5 }, { f: 1090, n: 'tick' }, { f: 1096, n: 'tick' }, { f: 1102, n: 'tick' }, { f: 1108, n: 'tick' }, { f: 1180, n: 'ding', v: 0.45 }, { f: 1246, n: 'lock-click' });
  // S6
  c.push({ f: 1266, n: 'print' }, { f: 1330, n: 'riser', v: 0.4 }, { f: 1380, n: 'stamp', v: 0.8 }, { f: 1380, n: 'impact', v: 0.3 }, { f: 1392, n: 'pop-soft' }, { f: 1402, n: 'pop-soft' }, { f: 1412, n: 'pop-soft' }, { f: 1400, n: 'success-arp', v: 0.4 }, { f: 1446, n: 'lock-click' });
  // S7
  c.push({ f: 1542, n: 'lock-click' }, { f: 1548, n: 'whoosh-soft', v: 0.4 }, { f: 1604, n: 'lock-click' }, { f: 1610, n: 'success-arp', v: 0.4 });
  // S8
  for (let i = 0; i < 6; i++) c.push({ f: 1680 + i * 25, n: 'pop' }, { f: 1680 + i * 25, n: 'whoosh-soft', v: 0.35 });
  // S9
  c.push({ f: 1850, n: 'ding', v: 0.5 }, { f: 1862, n: 'shimmer', v: 0.4 }, { f: 1900, n: 'pop-soft' }, { f: 1908, n: 'pop-soft' }, { f: 1916, n: 'pop-soft' }, { f: 1924, n: 'pop-soft' }, { f: 1940, n: 'success-arp', v: 0.4 }, { f: 1980, n: 'pop' });
  return c;
};
const CUES = buildCues();

/* ───── HUD ───── */
const Hud: React.FC = () => {
  const f = useCurrentFrame();
  const idx = SCENES.findIndex((s) => f >= s.from && f < s.from + s.dur);
  const chapter = Math.max(0, Math.min(CHAPTERS.length - 1, idx - 1));
  const since = f - SCENES[Math.max(1, idx)].from;
  const op = p(f, 156, 176) * (1 - p(f, 1664, 1684));
  if (op <= 0.01) return null;
  const prog = f / SHOWREEL_TOTAL_FRAMES;
  return (
    <div style={{ opacity: op }}>
      <Header chapter={chapter} sinceChapter={Math.max(0, since)} globalFrame={f} />
      <div style={{ position: 'absolute', left: 110, right: 110, bottom: 12, height: 4, borderRadius: 2, background: 'rgba(10,61,38,0.1)', zIndex: 90 }}>
        <div style={{ width: `${prog * 100}%`, height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${T.canopy}, ${T.lime})` }} />
        {SCENES.slice(1, 8).map((s) => (
          <div key={s.from} style={{ position: 'absolute', left: `${(s.from / SHOWREEL_TOTAL_FRAMES) * 100}%`, top: -3, width: 2, height: 10, background: T.canopy, opacity: 0.35 }} />
        ))}
      </div>
    </div>
  );
};

export const ERekapShowreel: React.FC = () => {
  const f = useCurrentFrame();
  const bgm = (g: number) =>
    interpolate(g, [0, 20, 1325, 1380, 1430, 2010, 2040], [0, 0.42, 0.42, 0.16, 0.42, 0.42, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const endFade = p(f, 2010, 2040, E.inOut);

  return (
    <AbsoluteFill style={{ background: T.bg, overflow: 'hidden' }}>
      <Bg />

      <Audio src={staticFile('audio/chip-music-bed.mp3')} volume={bgm} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={c.f} durationInFrames={Math.ceil(LEN[c.n] * 30) + 2} layout="none">
          <Audio src={staticFile(`audio/sfx-erekap/${c.n}.wav`)} volume={c.v ?? 0.5} />
        </Sequence>
      ))}

      {SCENES.map((s, i) => {
        const enter = i > 0 ? overlapKind(BOUNDARIES[i - 1]) : null;
        const exit = i < SCENES.length - 1 ? overlapKind(BOUNDARIES[i]) : null;
        const dur = s.dur + (exit ? OV : 0);
        return (
          <Sequence key={s.from} from={s.from} durationInFrames={dur} layout="none">
            <SceneWrap enter={enter} exit={exit}>
              <s.C />
            </SceneWrap>
          </Sequence>
        );
      })}

      {SCENES.map(
        (s, i) =>
          s.sub && (
            <Sequence key={`sub${i}`} from={s.from + 6} durationInFrames={s.dur - 14} layout="none">
              <SubtitlePill text={s.sub} dur={s.dur - 14} />
            </Sequence>
          )
      )}

      <Hud />

      {BOUNDARIES.map((k, i) => {
        const b = SCENES[i + 1].from;
        if (k === 'wipe') return <Wipe key={i} b={b} />;
        if (k === 'iris') return <Iris key={i} b={b} />;
        if (k === 'flash') return <Flash key={i} b={b} />;
        return null;
      })}

      <AbsoluteFill style={{ background: T.bg, opacity: endFade, pointerEvents: 'none', zIndex: 300 }} />
    </AbsoluteFill>
  );
};
