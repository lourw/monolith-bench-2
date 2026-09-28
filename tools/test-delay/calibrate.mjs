#!/usr/bin/env node
/**
 * Measures single-core burnCpu() throughput. Run it on a CI runner and paste
 * the result into UNITS_PER_SECOND in burn.mjs.
 */
import { cpus } from 'node:os';
import { burnCpu, UNITS_PER_SECOND } from './burn.mjs';

const SAMPLE = 400_000_000;

burnCpu(50_000_000); // warm up the JIT

const start = process.hrtime.bigint();
burnCpu(SAMPLE);
const seconds = Number(process.hrtime.bigint() - start) / 1e9;
const perSecond = Math.round(SAMPLE / seconds);

console.log(`cores:      ${cpus().length}`);
console.log(`measured:   ${perSecond.toLocaleString()} units/sec`);
console.log(`configured: ${UNITS_PER_SECOND.toLocaleString()} units/sec`);
console.log(
  `5s of configured work takes ${((5 * UNITS_PER_SECOND) / perSecond).toFixed(1)}s here`,
);
console.log(`\n=> set UNITS_PER_SECOND = ${perSecond} in burn.mjs`);
