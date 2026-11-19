import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { LaptopMockup, PhoneMockup } from "./DeviceMockups";
import { Subtitles } from "./Subtitles";

// ─── Utility helpers ──────────────────────────────────────────────────────────

const easeOut = Easing.out(Easing.cubic);

function useSmoothSpring(frame: number, delay: number, fps: number) {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 80, mass: 1.1 },
    durationInFrames: 50,
  });
}

// ─── Ambient Glow / Mesh Background ──────────────────────────────────────────

const AnimatedBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const slow = frame * 0.004;
  const med = frame * 0.007;

  // Orb positions gently drift
  const orb1x = 50 + Math.sin(slow) * 8;
  const orb1y = 40 + Math.cos(slow * 0.9) * 6;
  const orb2x = 72 + Math.cos(med) * 6;
  const orb2y = 65 + Math.sin(med * 1.1) * 5;
  const orb3x = 20 + Math.sin(med * 0.7 + 1) * 7;
  const orb3y = 55 + Math.cos(slow * 1.2) * 8;

  const meshOpacity = interpolate(frame, [0, 40], [0, 0.18], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ zIndex: 0 }}>
      {/* Deep background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, #0d1b2a 0%, #060d16 55%, #03080f 100%)",
        }}
      />

      {/* Mesh grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: meshOpacity,
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          left: `${orb1x}%`,
          top: `${orb1y}%`,
          width: 680,
          height: 680,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb2x}%`,
          top: `${orb2y}%`,
          width: 520,
          height: 520,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb3x}%`,
          top: `${orb3y}%`,
          width: 440,
          height: 440,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(3,8,15,0.6) 0%, transparent 20%, transparent 80%, rgba(3,8,15,0.75) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Headline / Badge area ────────────────────────────────────────────────────

const HeadlineBadge: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const sp = useSmoothSpring(frame, 8, fps);
  const fadeIn = interpolate(frame, [8, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const translateY = interpolate(sp, [0, 1], [-28, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 42,
        left: 60,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: fadeIn,
        transform: `translateY(${translateY}px)`,
        zIndex: 10,
      }}
    >
      {/* Platform pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(99,102,241,0.15)",
          border: "1px solid rgba(99,102,241,0.4)",
          borderRadius: 999,
          padding: "5px 14px 5px 10px",
          backdropFilter: "blur(8px)",
          width: "fit-content",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#818cf8",
            boxShadow: "0 0 8px rgba(129,140,248,0.9)",
            display: "inline-block",
            animation: "none",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a5b4fc",
          }}
        >
          Platform Review
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
          fontSize: 38,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "#f1f5f9",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(135deg, #e0e7ff 0%, #818cf8 50%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Xiiclass
        </span>
        <br />
        <span style={{ color: "#94a3b8", fontSize: 24, fontWeight: 500 }}>
          Learning Experience
        </span>
      </div>
    </div>
  );
};

// ─── Floating info badges ─────────────────────────────────────────────────────

const FloatingBadge: React.FC<{
  frame: number;
  fps: number;
  delay: number;
  x: number;
  y: number;
  label: string;
  value: string;
  accentColor: string;
}> = ({ frame, fps, delay, x, y, label, value, accentColor }) => {
  const sp = useSmoothSpring(frame, delay, fps);
  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const scale = interpolate(sp, [0, 1], [0.78, 1]);

  // Gentle float
  const floatY = Math.sin(frame * 0.03 + delay) * 3.5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        opacity,
        transform: `scale(${scale})`,
        zIndex: 20,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.82)",
          border: `1px solid ${accentColor}40`,
          borderRadius: 14,
          padding: "10px 16px",
          backdropFilter: "blur(12px)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}20`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 110,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#64748b",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: accentColor,
            letterSpacing: "-0.01em",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

// ─── Decorative line accent ───────────────────────────────────────────────────

const LineAccent: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 148,
        left: 60,
        right: 60,
        height: 1,
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, rgba(99,102,241,0.6) 0%, rgba(56,189,248,0.4) 60%, transparent 100%)",
        }}
      />
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const XiiclassReview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  // width=1920, height=1080

  // ── Entrance springs ──
  const laptopSpring = useSmoothSpring(frame, 15, fps);
  const phoneSpring = useSmoothSpring(frame, 28, fps);

  // ── Laptop: slides in from left ──
  const laptopWidth = 1200;
  const laptopEnterX = interpolate(laptopSpring, [0, 1], [-120, 0]);
  const laptopOpacity = interpolate(frame, [15, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // ── Phone: slides in from right + slight drop ──
  const phoneWidth = 320;
  const phoneEnterX = interpolate(phoneSpring, [0, 1], [80, 0]);
  const phoneEnterY = interpolate(phoneSpring, [0, 1], [30, 0]);
  const phoneOpacity = interpolate(frame, [28, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  // ── Layout geometry ──
  // Laptop: left-center stage
  // Rough laptop rendered height for a 1200px wide mockup is ~780px (aspect ~1.54:1)
  const laptopRenderHeight = laptopWidth / 1.54; // ≈ 779px
  const laptopLeft = 60;
  const laptopTop = (height - laptopRenderHeight) / 2 - 20; // vertically centered slightly up

  // Phone: right side of laptop, vertically centered on laptop's visible area
  // Gap between laptop right edge and phone
  const gapBetween = 24;
  const phoneRenderHeight = phoneWidth * 2.0; // ≈ 640px (tall phone aspect)
  const phoneLeft = laptopLeft + laptopWidth + gapBetween;
  const phoneCenterY = laptopTop + laptopRenderHeight / 2;
  const phoneTop = phoneCenterY - phoneRenderHeight / 2;

  // Gentle subtle parallax on group
  const groupParallaxY = Math.sin(frame * 0.015) * 3;

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 0: Animated background ── */}
      <AnimatedBackground frame={frame} />

      {/* ── Layer 1: Headline / badge ── */}
      <HeadlineBadge frame={frame} fps={fps} />

      {/* ── Layer 2: Main stage — mockups ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${groupParallaxY}px)`,
          zIndex: 5,
        }}
      >
        {/* Laptop */}
        <div
          style={{
            position: "absolute",
            left: laptopLeft,
            top: laptopTop,
            opacity: laptopOpacity,
            transform: `translateX(${laptopEnterX}px)`,
            filter:
              laptopOpacity < 1
                ? `blur(${interpolate(laptopOpacity, [0, 1], [4, 0])}px)`
                : undefined,
          }}
        >
          <LaptopMockup enterFrame={15} width={laptopWidth} />
        </div>

        {/* Phone */}
        <div
          style={{
            position: "absolute",
            left: phoneLeft,
            top: phoneTop,
            opacity: phoneOpacity,
            transform: `translate(${phoneEnterX}px, ${phoneEnterY}px)`,
            filter:
              phoneOpacity < 1
                ? `blur(${interpolate(phoneOpacity, [0, 1], [4, 0])}px)`
                : undefined,
          }}
        >
          <PhoneMockup enterFrame={28} width={phoneWidth} />
        </div>
      </div>

      {/* ── Layer 3: Subtitles ── */}
      <Subtitles />
    </AbsoluteFill>
  );
};

