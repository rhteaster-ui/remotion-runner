import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  OffthreadVideo,
  staticFile,
} from "remotion";

// ─── Utility ────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

// ─── Laptop Mockup ───────────────────────────────────────────────────────────

export const LaptopMockup: React.FC<{
  enterFrame: number;
  width: number;
}> = ({ enterFrame, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const height = width * 0.625; // 16:10 screen ratio for the body
  const screenW = width * 0.78;
  const screenH = screenW * 0.5625; // 16:9 video inside screen
  const bezelTop = width * 0.025;
  const bezelSide = width * 0.025;
  const bezelBottom = width * 0.065;
  const bodyHeight = screenH + bezelTop + bezelBottom;
  const baseH = width * 0.038;
  const baseW = width * 0.92;
  const totalH = bodyHeight + baseH;

  // Entry spring
  const entryProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.1 },
    durationInFrames: 50,
  });

  const translateY = interpolate(entryProgress, [0, 1], [80, 0]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);

  // Subtle float animation
  const floatY =
    Math.sin((frame / fps) * 0.7 * Math.PI * 2) * 4 +
    Math.sin((frame / fps) * 1.1 * Math.PI * 2) * 2;

  // Glow pulse
  const glowPulse = 0.5 + 0.5 * Math.sin((frame / fps) * 0.4 * Math.PI * 2);

  const screenColor = "#0a0e1a";
  const bodyColor = "#1c1e26";
  const baseColor = "#16181f";
  const hingeColor = "#0f1117";
  const bezelColor = "#12141c";

  return (
    <div
      style={{
        position: "relative",
        width,
        height: totalH,
        transform: `translateY(${translateY + floatY}px)`,
        opacity,
        filter: `drop-shadow(0 32px 64px rgba(0,0,0,0.7)) drop-shadow(0 0 ${
          40 + glowPulse * 20
        }px rgba(99,179,237,${0.08 + glowPulse * 0.06}))`,
      }}
    >
      {/* ── Laptop Body (lid) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width,
          height: bodyHeight,
          background: `linear-gradient(160deg, #2a2d3a 0%, ${bodyColor} 50%, #12141c 100%)`,
          borderRadius: "12px 12px 4px 4px",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Body subtle texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)",
          }}
        />
        {/* Bezel */}
        <div
          style={{
            position: "absolute",
            top: bezelTop,
            left: bezelSide,
            width: screenW,
            height: screenH,
            background: bezelColor,
            borderRadius: 4,
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Screen content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: screenColor,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            {/* Video */}
            <OffthreadVideo
              src={staticFile("record_laptop.mp4")}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              muted
            />
            {/* Screen reflection glare */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "35%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Webcam dot */}
          <div
            style={{
              position: "absolute",
              top: -(bezelTop / 2),
              left: "50%",
              transform: "translate(-50%, 50%)",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1a1c24",
              boxShadow: "0 0 0 1.5px rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Apple-logo style center mark on lid back — subtle */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Hinge ── */}
      <div
        style={{
          position: "absolute",
          top: bodyHeight - 2,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.3,
          height: 5,
          background: hingeColor,
          borderRadius: "0 0 2px 2px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
        }}
      />

      {/* ── Base ── */}
      <div
        style={{
          position: "absolute",
          top: bodyHeight + 3,
          left: "50%",
          transform: "translateX(-50%)",
          width: baseW,
          height: baseH,
          background: `linear-gradient(180deg, #1e2029 0%, ${baseColor} 100%)`,
          borderRadius: "0 0 8px 8px",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Trackpad */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "22%",
            height: "60%",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        />
      </div>
    </div>
  );
};

// ─── Phone Mockup ────────────────────────────────────────────────────────────

export const PhoneMockup: React.FC<{
  enterFrame: number;
  width: number;
}> = ({ enterFrame, width }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const height = width * 2.1; // tall phone ratio
  const screenW = width * 0.86;
  const screenH = screenW * (19.5 / 9); // tall screen
  const bezelV = (height - screenH) / 2;
  const bezelH = (width - screenW) / 2;

  // Staggered entry
  const entryProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 16, stiffness: 55, mass: 0.9 },
    durationInFrames: 55,
  });

  const translateY = interpolate(entryProgress, [0, 1], [100, 0]);
  const translateX = interpolate(entryProgress, [0, 1], [30, 0]);
  const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
  const rotateZ = interpolate(entryProgress, [0, 1], [3, 0]);

  // Subtle float (offset phase from laptop)
  const floatY =
    Math.sin((frame / fps) * 0.7 * Math.PI * 2 + Math.PI * 0.6) * 5 +
    Math.sin((frame / fps) * 1.3 * Math.PI * 2) * 2;

  // Glow pulse (phase offset)
  const glowPulse =
    0.5 + 0.5 * Math.sin((frame / fps) * 0.4 * Math.PI * 2 + Math.PI * 0.4);

  const bodyColor = "#1a1c24";
  const bezelColor = "#0d0f15";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        transform: `translateY(${translateY + floatY}px) translateX(${translateX}px) rotateZ(${rotateZ}deg)`,
        opacity,
        filter: `drop-shadow(0 24px 48px rgba(0,0,0,0.75)) drop-shadow(0 0 ${
          30 + glowPulse * 15
        }px rgba(167,139,250,${0.1 + glowPulse * 0.07}))`,
      }}
    >
      {/* Phone body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, #2a2d3a 0%, ${bodyColor} 50%, #0e1018 100%)`,
          borderRadius: width * 0.14,
          boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 0.5px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Body subtle brush texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.005) 3px, rgba(255,255,255,0.005) 6px)",
          }}
        />

        {/* Volume buttons - left */}
        {[0.28, 0.38, 0.47].map((topRatio, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -3,
              top: `${topRatio * 100}%`,
              width: 3,
              height: i === 0 ? "5%" : "7%",
              background: "#0d0f15",
              borderRadius: "2px 0 0 2px",
            }}
          />
        ))}

        {/* Power button - right */}
        <div
          style={{
            position: "absolute",
            right: -3,
            top: "35%",
            width: 3,
            height: "9%",
            background: "#0d0f15",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Screen area */}
        <div
          style={{
            position: "absolute",
            top: bezelV,
            left: bezelH,
            width: screenW,
            height: screenH,
            background: bezelColor,
            borderRadius: width * 0.1,
            overflow: "hidden",
          }}
        >
          {/* Actual video */}
          <OffthreadVideo
            src={staticFile("record_mobile.mp4")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "inherit",
            }}
            muted
          />

          {/* Dynamic Island / notch */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "35%",
              height: 22,
              background: "#000",
              borderRadius: 20,
              zIndex: 10,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />

          {/* Screen reflection */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
              pointerEvents: "none",
              borderRadius: "inherit",
            }}
          />
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: bezelV * 0.3,
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            height: 4,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};