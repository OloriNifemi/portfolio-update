import { EASE, DURATIONS, DELAYS } from '../constants/theme';

/**
 * Fade up animation variant - useful for entrance animations
 * @param {number} delay - Animation delay in seconds
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const fadeUp = (delay = 0, shouldReduceMotion = false) => ({
  initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATIONS.slow, delay, ease: EASE },
});

/**
 * Scale fade in animation variant
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const scaleFadeIn = (shouldReduceMotion = false) => ({
  initial: shouldReduceMotion ? false : { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: DURATIONS.slower, ease: EASE, delay: DELAYS.small },
});

/**
 * Stagger container variant - for coordinating child animations
 * @param {number} staggerDelay - Delay between each child animation
 * @returns {object} Framer Motion variant
 */
export const staggerContainer = (staggerDelay = 0.1) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.3,
    },
  },
});

/**
 * Stagger item variant - for individual items within a stagger container
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const staggerItem = (shouldReduceMotion = false) => ({
  initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
});

/**
 * Slide and fade variant
 * @param {string} direction - 'left', 'right', 'up', 'down'
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const slideAndFade = (direction = 'up', shouldReduceMotion = false) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return {
    initial: shouldReduceMotion ? false : { opacity: 0, ...directions[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: DURATIONS.slow, ease: EASE },
  };
};

/**
 * Path drawing animation - useful for SVG animations
 * @param {number} delay - Animation delay in seconds
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const drawPath = (delay = 0, shouldReduceMotion = false) => ({
  initial: shouldReduceMotion ? false : { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: DURATIONS.verySlow, delay, ease: EASE },
});

/**
 * Scale up with origin variant
 * @param {string} origin - Transform origin (e.g., 'left', 'top', 'center')
 * @param {number} duration - Animation duration in seconds
 * @param {boolean} shouldReduceMotion - Whether to respect prefers-reduced-motion
 * @returns {object} Framer Motion variant
 */
export const scaleFrom = (origin = 'center', duration = DURATIONS.slower, shouldReduceMotion = false) => ({
  initial: shouldReduceMotion ? false : { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration, ease: EASE },
  style: { transformOrigin: origin },
});

/**
 * Bounce entrance variant
 * @param {number} delay - Animation delay in seconds
 * @returns {object} Framer Motion variant
 */
export const bounceIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: DURATIONS.slow,
    delay,
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
});

/**
 * Hover lift effect
 * @returns {object} Framer Motion variant
 */
export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4 },
  transition: { duration: DURATIONS.fast, ease: EASE },
};
