// Theme Colors
export const COLORS = {
  light: {
    bg: '#ffffff',
    bgAlt: '#fafafa',
    surface: '#ffffff',
    text: '#111111',
    muted: '#666666',
    subtle: '#999999',
    border: '#e8e8e8',
    accent: '#B89C64',
  },
  dark: {
    bg: '#0B0B0B',
    bgAlt: '#111111',
    surface: '#181818',
    text: '#F7F7F5',
    muted: '#C2C2C2',
    subtle: '#8E8E8E',
    border: '#2C2C2C',
    accent: '#D0B27A',
  },
};

// Animation Constants
export const EASE = [0.16, 1, 0.3, 1];
export const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1];

// Animation Durations (in seconds)
export const DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.0,
  slower: 1.6,
  slowest: 2.8,
};

// Animation Delays
export const DELAYS = {
  none: 0,
  tiny: 0.05,
  small: 0.1,
  normal: 0.2,
  medium: 0.3,
  large: 0.5,
  extraLarge: 1.0,
};

// Transition Timing
export const TRANSITIONS = {
  fast: { duration: DURATIONS.fast, ease: EASE },
  normal: { duration: DURATIONS.normal, ease: EASE },
  smooth: { duration: DURATIONS.slow, ease: EASE },
  verySmoothSlide: { duration: DURATIONS.slower, ease: EASE },
  wiggle: { duration: 2.2, ease: 'easeInOut' },
};

// Preloader Timing
export const PRELOADER = {
  defaultDuration: 3500,
  reducedMotionDuration: 900,
  eyebrowDelay: 0.1,
  headingDelay: 0.3,
  lineDelay: 0.8,
  subtitleDelay: 1.0,
  footerDelay: 1.25,
};

// Image Animation Speeds
export const IMAGE_ANIMATION = {
  shine: {
    duration: 2.8,
    delay: 4,
    repeatDelay: 12,
    ease: 'easeInOut',
  },
};
