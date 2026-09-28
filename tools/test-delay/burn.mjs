/**
 * Fixed-work CPU burn.
 *
 * Runs a fixed number of iterations rather than for a fixed duration, so faster
 * hardware finishes sooner. A sleep, or a loop spinning until a deadline, takes
 * the same wall time everywhere and hides the difference.
 *
 * The loop is a serial dependent integer chain with no allocation, so it tracks
 * clock speed rather than allocator, memory bandwidth and GC.
 */

/** Units taking ~1s on one GitHub Actions vCPU. Measure with calibrate.mjs. */
export const UNITS_PER_SECOND = 150_000_000;

/** Returns the accumulator so the work cannot be optimized away. */
export function burnCpu(units) {
  let a = 1;
  let b = 0x9e3779b9;
  for (let i = 0; i < units; i++) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a ^ (a >>> 15);
    t = Math.imul(t, 1 | a) >>> 0;
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0;
    b = (b ^ (t ^ (t >>> 14))) >>> 0;
  }
  return b;
}

export function envNumber(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') {
    return fallback;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function sleep(ms) {
  return ms > 0
    ? new Promise((resolve) => setTimeout(resolve, ms))
    : Promise.resolve();
}
