// Theme Colors
export const COLORS = {
  light: {
    bg: "#ffffff",
    bgAlt: "#fafafa",
    surface: "#ffffff",
    text: "#111111",
    muted: "#666666",
    subtle: "#999999",
    border: "#e8e8e8",
    accent: "#B89C64",
  },
  dark: {
    bg: "#0B0B0B",
    bgAlt: "#111111",
    surface: "#181818",
    text: "#F7F7F5",
    muted: "#C2C2C2",
    subtle: "#8E8E8E",
    border: "#2C2C2C",
    accent: "#D0B27A",
  },
};

// Animation Constants
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1];

// Animation Durations (in seconds)
export const DURATIONS = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  verySlow: 0.7,
  slower: 0.8,
  slowest: 1.5,
};

// Animation Delays
export const DELAYS = {
  none: 0,
  tiny: 0.03,
  small: 0.08,
  normal: 0.15,
  medium: 0.22,
  large: 0.3,
  extraLarge: 0.6,
};

// Transition Timing
export const TRANSITIONS = {
  fast: { duration: DURATIONS.fast, ease: EASE },
  normal: { duration: DURATIONS.normal, ease: EASE },
  smooth: { duration: DURATIONS.slow, ease: EASE },
  verySmoothSlide: { duration: DURATIONS.slower, ease: EASE },
  wiggle: { duration: 1.8, ease: "easeInOut" },
};

// Preloader Timing
export const PRELOADER = {
  defaultDuration: 2200,
  reducedMotionDuration: 700,
  eyebrowDelay: 0.05,
  headingDelay: 0.15,
  lineDelay: 0.35,
  subtitleDelay: 0.45,
  footerDelay: 0.6,
};

// Image Animation Speeds
export const IMAGE_ANIMATION = {
  shine: {
    duration: 2,
    delay: 2.5,
    repeatDelay: 8,
    ease: "easeInOut",
  },
};