import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// ─── Subtitle data ────────────────────────────────────────────────────────────
// Each cue: { start, end } in seconds, text, optional highlight words

export interface SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  highlight?: string[];
  tag?: "intro" | "feature" | "cta" | "default";
}

export const SUBTITLE_CUES: SubtitleCue[] = [
  {
    startSec: 1,
    endSec: 5,
    text: "Selamat datang di xiiclass —",
    highlight: ["xiiclass"],
    tag: "intro",
  },
  {
    startSec: 5,
    endSec: 9,
    text: "Platform digital MA NU Islamiyah Asembagus.",
    highlight: ["MA NU Islamiyah Asembagus"],
    tag: "intro",
  },
  {
    startSec: 9,
    endSec: 14,
    text: "Akses materi, tugas, dan pengumuman kelas XII",
    highlight: ["materi", "tugas", "pengumuman"],
    tag: "feature",
  },
  {
    startSec: 14,
    endSec: 18,
    text: "di mana saja — dari laptop maupun ponsel.",
    highlight: ["laptop", "ponsel"],
    tag: "feature",
  },
  {
    startSec: 18,
    endSec: 23,
    text: "Antarmuka modern, responsif, dan intuitif.",
    highlight: ["modern", "responsif", "intuitif"],
    tag: "feature",
  },
  {
    startSec: 23,
    endSec: 28,
    text: "Dirancang khusus untuk siswa dan guru.",
    highlight: ["siswa", "guru"],
    tag: "feature",
  },
  {
    startSec: 28,
    endSec: 33,
    text: "Satu platform. Semua kebutuhan belajar.",
    highlight: ["Satu platform", "Semua kebutuhan belajar"],
    tag: "cta",
  },
  {
    startSec: 33,
    endSec: 38,
    text: "xiiclass — Teknologi untuk Generasi Terbaik.",
    highlight: ["xiiclass", "Generasi Terbaik"],
    tag: "cta",
  },
];

// ─── Token renderer with per-word animation ───────────────────────────────────

const AnimatedWord: React.FC<{
  word: string;
  isHighlight: boolean;
  wordIndex: number;
  cueEnterFrame: number;
  tag: SubtitleCue["tag"];
}> = ({ word, isHighlight, wordIndex, cueEnterFrame, tag }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = wordIndex * 2.5;
  const wordSpring = spring({
    frame: frame - cueEnterFrame - delay,
    fps,
    config: { damping: 22, stiffness: 180, mass: 0.6 },
    durationInFrames: 20,
  });

  const translateY = interpolate(wordSpring, [0, 1], [18, 0]);
  const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
  const blurVal = interpolate(wordSpring, [0, 1], [6, 0]);

  const highlightColor =
    tag === "intro"
      ? "#63b3ed" // blue
      : tag === "cta"
      ? "#f6ad55" // amber
      : "#a78bfa"; // violet

  return (
    <span
      style={{
        display: "inline-block",
        transform: `translateY(${translateY}px)`,
        opacity,
        filter: `blur(${blurVal}px)`,
        marginRight: "0.28em",
        color: isHighlight ? highlightColor : "rgba(230,235,245,0.92)",
        fontWeight: isHighlight ? 700 : 400,
        textShadow: isHighlight
          ? `0 0 20px ${highlightColor}88, 0 0 40px ${highlightColor}44`
          : "0 1px 3px rgba(0,0,0,0.5)",
        letterSpacing: isHighlight ? "0.01em" : "0.005em",
        transition: "color 0.1s",
      }}
    >
      {word}
    </span>
  );
};

// ─── Single Cue ───────────────────────────────────────────────────────────────

const SubtitleCueView: React.FC<{
  cue: SubtitleCue;
  cueEnterFrame: number;
  cueExitFrame: number;
}> = ({ cue, cueEnterFrame, cueExitFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exit fade
  const exitDuration = 8;
  const exitFade = interpolate(
    frame,
    [cueExitFrame - exitDuration, cueExitFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Container lift on exit
  const exitLift = interpolate(
    frame,
    [cueExitFrame - exitDuration, cueExitFrame],
    [0, -10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const words = cue.text.split(/\s+/);
  const highlightSet = new Set(
    (cue.highlight || []).flatMap((h) => h.split(/\s+/))
  );

  // Determine if entire multi-word phrase is highlighted
  const highlightedPhrases = cue.highlight || [];

  // Build word highlight map — check if word appears in any highlight phrase
  const isWordHighlighted = (word: string, idx: number): boolean => {
    const cleanWord = word.replace(/[.,!?—–-]/g, "");
    // Simple: check if any highlight phrase contains this word
    return highlightedPhrases.some((phrase) =>
      phrase.split(/\s+/).some((w) => w === cleanWord)
    );
  };

  const tagAccentColor =
    cue.tag === "intro"
      ? "#63b3ed"
      : cue.tag === "cta"
      ? "#f6ad55"
      : "#a78bfa";

  return (
    <div
      style={{
        opacity: exitFade,
        transform: `translateY(${exitLift}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
      }}
    >
      {/* Tag accent pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 2,
          opacity: interpolate(
            spring({
              frame: frame - cueEnterFrame,
              fps,
              config: { damping: 24, stiffness: 160 },
              durationInFrames: 25,
            }),
            [0, 1],
            [0, 1]
          ),
        }}
      >
        {/* Animated left accent bar */}
        <div
          style={{
            width: interpolate(
              spring({
                frame: frame - cueEnterFrame,
                fps,
                config: { damping: 20, stiffness: 120 },
                durationInFrames: 30,
              }),
              [0, 1],
              [0, 32]
            ),
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${tagAccentColor}, ${tagAccentColor}00)`,
            boxShadow: `0 0 8px ${tagAccentColor}88`,
          }}
        />
        <div
          style={{
            height: 3,
            width: interpolate(
              spring({
                frame: frame - cueEnterFrame,
                fps,
                config: { damping: 20, stiffness: 100 },
                durationInFrames: 35,
              }),
              [0, 1],
              [0, 16]
            ),
            borderRadius: 2,
            background: `linear-gradient(90deg, ${tagAccentColor}66, transparent)`,
          }}
        />
      </div>

      {/* Words */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "0 0",
          lineHeight: 1.3,
        }}
      >
        {words.map((word, i) => (
          <AnimatedWord
            key={i}
            word={word}
            isHighlight={isWordHighlighted(word, i)}
            wordIndex={i}
            cueEnterFrame={cueEnterFrame}
            tag={cue.tag}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const SubtitleProgressBar: React.FC<{
  cue: SubtitleCue;
  cueEnterFrame: number;
  cueExitFrame: number;
}> = ({ cue, cueEnterFrame, cueExitFrame }) => {
  const frame = useCurrentFrame();
  const totalFrames = cueExitFrame - cueEnterFrame;
  const progress = Math.min(1, (frame - cueEnterFrame) / totalFrames);

  const tagAccentColor =
    cue.tag === "intro"
      ? "#63b3ed"
      : cue.tag === "cta"
      ? "#f6ad55"
      : "#a78bfa";

  return (
    <div
      style={{
        width: "100%",
        height: 2,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 1,
        overflow: "hidden",
        marginTop: 4,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${tagAccentColor}99, ${tagAccentColor})`,
          borderRadius: 1,
          boxShadow: `0 0 6px ${tagAccentColor}66`,
          transition: "width 0.016s linear",
        }}
      />
    </div>
  );
};

// ─── Main Subtitles Component ─────────────────────────────────────────────────

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeCue = SUBTITLE_CUES.find((cue) => {
    const startFrame = cue.startSec * fps;
    const endFrame = cue.endSec * fps;
    return frame >= startFrame && frame < endFrame;
  });

  if (!activeCue) return null;

  const cueEnterFrame = activeCue.startSec * fps;
  const cueExitFrame = activeCue.endSec * fps;

  return (
    <div style={{ width: "100%" }}>
      <SubtitleCueView
        cue={activeCue}
        cueEnterFrame={cueEnterFrame}
        cueExitFrame={cueExitFrame}
      />
      <SubtitleProgressBar
        cue={activeCue}
        cueEnterFrame={cueEnterFrame}
        cueExitFrame={cueExitFrame}
      />
    </div>
  );
};