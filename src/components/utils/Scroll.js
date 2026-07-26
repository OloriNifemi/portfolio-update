// Cubic bezier approximation for a smooth ease — close to EASE from theme.js
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animateScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Smoothly scrolls to a target element with a controllable duration,
 * accounting for a fixed header offset.
 */
export function scrollToSection(id, { offset = 80, duration = 700 } = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
  animateScrollTo(targetY, duration);
}

/**
 * Smoothly scrolls to the top of the page.
 */
export function scrollToTopSmooth({ duration = 700 } = {}) {
  animateScrollTo(0, duration);
}