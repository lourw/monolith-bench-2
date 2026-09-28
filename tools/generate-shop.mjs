#!/usr/bin/env node
/**
 * Deterministic generator for the large shop workspace.
 *
 * Everything lives inside the shop app's source tree, imported file-to-file:
 *
 * Produces:
 *   - 70  utilities      apps/shop/src/utils/<group>/<group>-<kind>.ts
 *   - 130 ui components  apps/shop/src/components/<group>/<kind>/
 *   - 300 features       apps/shop/src/features/<domain>/<kind>/
 *   - apps/shop/src/app/feature-routes.tsx wiring every feature into the app
 *   - apps/shop/e2e/features/*.spec.ts  (E2E_SPEC_COUNT specs, one test each,
 *     every test padded to ~27s by apps/shop/e2e/support/pacing.ts)
 *
 * The import graph is acyclic by construction: util -> ui -> feature, and a
 * module only ever imports modules with a lower index in the same tier.
 *
 * Re-running the script is idempotent (same seed => same output).
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'apps', 'shop', 'src');

// ---------------------------------------------------------------------------
// Deterministic PRNG (mulberry32)
// ---------------------------------------------------------------------------
function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = makeRng(20260914);
const randInt = (min, max) => min + Math.floor(rng() * (max - min + 1));
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Naming helpers
// ---------------------------------------------------------------------------
const pascal = (s) =>
  s
    .split('-')
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
const camel = (s) => {
  const p = pascal(s);
  return p[0].toLowerCase() + p.slice(1);
};
const upper = (s) => s.replace(/-/g, '_').toUpperCase();
const title = (s) =>
  s
    .split('-')
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(' ');

// ---------------------------------------------------------------------------
// Catalogue of names
// ---------------------------------------------------------------------------
const FEATURE_DOMAINS = [
  'cart',
  'checkout',
  'wishlist',
  'reviews',
  'search',
  'recommendations',
  'orders',
  'returns',
  'account',
  'addresses',
  'payments',
  'shipping',
  'loyalty',
  'promotions',
  'gift-cards',
  'inventory',
  'notifications',
  'support',
  'compare',
  'subscriptions',
  'bundles',
  'sizing',
  'store-locator',
  'tracking',
  'preorders',
  'catalog',
  'auth',
  'profile',
  'analytics',
  'feedback',
];
const FEATURE_KINDS = [
  'overview',
  'summary',
  'details',
  'history',
  'settings',
  'editor',
  'list',
  'wizard',
  'dashboard',
  'insights',
];
const UI_GROUPS = [
  'core',
  'forms',
  'layout',
  'feedback',
  'navigation',
  'data',
  'commerce',
  'media',
  'overlay',
  'typography',
  'charts',
  'inputs',
  'marketing',
];
const UI_KINDS = [
  'badge',
  'card',
  'panel',
  'tile',
  'banner',
  'chip',
  'stat',
  'list',
  'toolbar',
  'header',
];
const UTIL_GROUPS = [
  'format',
  'validate',
  'math',
  'collection',
  'async',
  'storage',
  'i18n',
];
const UTIL_KINDS = [
  'currency',
  'date',
  'number',
  'percent',
  'text',
  'slug',
  'phone',
  'address',
  'name',
  'code',
];
const TRANSFORMS = [
  'upper',
  'lower',
  'title',
  'kebab',
  'reverse',
  'digits',
  'padded',
  'prefixed',
];

// ---------------------------------------------------------------------------
// Build the lib descriptors
// ---------------------------------------------------------------------------
const utils = [];
UTIL_GROUPS.forEach((g) =>
  UTIL_KINDS.forEach((k) => {
    const name = `${g}-${k}`;
    utils.push({
      tier: 'util',
      name,
      group: g,
      kind: k,
      dir: `util-${name}`,
      transform: pick(TRANSFORMS),
      deps: [],
    });
  }),
);
utils.forEach((u, i) => {
  if (i > 0) u.deps = pickN(utils.slice(0, i), randInt(0, Math.min(2, i)));
});

const uis = [];
UI_GROUPS.forEach((g) =>
  UI_KINDS.forEach((k) => {
    const name = `${g}-${k}`;
    uis.push({
      tier: 'ui',
      name,
      group: g,
      kind: k,
      dir: `ui-${name}`,
      utilDeps: [],
      uiDeps: [],
    });
  }),
);
uis.forEach((u, i) => {
  u.utilDeps = pickN(utils, randInt(1, 3));
  u.uiDeps = i > 0 && rng() < 0.6 ? pickN(uis.slice(0, i), 1) : [];
});

const features = [];
FEATURE_DOMAINS.forEach((d) =>
  FEATURE_KINDS.forEach((k) => {
    const name = `${d}-${k}`;
    features.push({
      tier: 'feature',
      name,
      domain: d,
      kind: k,
      dir: `feature-${name}`,
      route: `/features/${name}`,
      testId: `feature-${name}`,
      itemCount: randInt(5, 12),
      uiDeps: [],
      utilDeps: [],
      featureDeps: [],
    });
  }),
);
features.forEach((f, i) => {
  f.uiDeps = pickN(uis, randInt(3, 5));
  f.utilDeps = pickN(utils, randInt(1, 3));
  f.featureDeps = i > 0 && rng() < 0.35 ? pickN(features.slice(0, i), 1) : [];
});

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------
function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content.endsWith('\n') ? content : content + '\n');
}

// Remove previously generated output so renames do not leave stale dirs.
// Only generated folders are removed; handwritten code (features/products,
// features/product-detail, components/shared, ...) is left alone.
rmSync(join(SRC, 'utils'), { recursive: true, force: true });
for (const g of UI_GROUPS) {
  rmSync(join(SRC, 'components', g), { recursive: true, force: true });
}
for (const d of FEATURE_DOMAINS) {
  rmSync(join(SRC, 'features', d), { recursive: true, force: true });
}
rmSync(join(ROOT, 'apps/shop/e2e/features'), {
  recursive: true,
  force: true,
});
rmSync(join(ROOT, 'apps/shop/e2e/journeys'), {
  recursive: true,
  force: true,
});

// ---------------------------------------------------------------------------
// Shared per-module scaffolding
// ---------------------------------------------------------------------------
const utilDir = (lib) => join(SRC, 'utils', lib.group);
const uiDir = (lib) => join(SRC, 'components', lib.group, lib.kind);
const featureDir = (lib) => join(SRC, 'features', lib.domain, lib.kind);
function libRoot(lib) {
  if (lib.tier === 'util') return utilDir(lib);
  if (lib.tier === 'ui') return uiDir(lib);
  return featureDir(lib);
}

// Relative import specifier (no extension) from a directory to a file.
function imp(fromDir, toFile) {
  const rel = relative(fromDir, toFile).split(sep).join('/');
  return rel.startsWith('.') ? rel : `./${rel}`;
}
const utilFile = (d) => join(utilDir(d), d.name);
const uiFile = (d) => join(uiDir(d), d.name);
const uiGroupFile = (d) => join(uiDir(d), `${d.name}-group`);
const featureSummaryFile = (d) => join(featureDir(d), `${d.name}-summary`);
const MODELS_FILE = join(SRC, 'models', 'product.model');
const SHARED_UI = join(SRC, 'components', 'shared');

// ---------------------------------------------------------------------------
// UTIL modules
// ---------------------------------------------------------------------------
function transformExpr(transform, v) {
  switch (transform) {
    case 'upper':
      return `${v}.toUpperCase()`;
    case 'lower':
      return `${v}.toLowerCase()`;
    case 'title':
      return `titleCase(${v})`;
    case 'kebab':
      return `kebabCase(${v})`;
    case 'reverse':
      return `reverseText(${v})`;
    case 'digits':
      return `onlyDigits(${v}) || ${v}`;
    case 'padded':
      return `padCode(${v}, 4)`;
    case 'prefixed':
      return `'${'#'}' + ${v}`;
    default:
      return v;
  }
}

function genUtil(lib) {
  const P = pascal(lib.name),
    c = camel(lib.name),
    U = upper(lib.name);
  const root = libRoot(lib);

  const depImports = lib.deps
    .map((d) => `import { ${camel(d.name)} } from '${imp(root, utilFile(d))}';`)
    .join('\n');
  const TRANSFORM_HELPER = {
    title: 'titleCase',
    kebab: 'kebabCase',
    reverse: 'reverseText',
    digits: 'onlyDigits',
    padded: 'padCode',
  };
  const helperNames = ['clampLength', 'hashString', 'normalizeInput'];
  if (TRANSFORM_HELPER[lib.transform])
    helperNames.push(TRANSFORM_HELPER[lib.transform]);
  const helperImports = helperNames
    .sort()
    .map((h) => `  ${h},`)
    .join('\n');
  const chain = lib.deps.length
    ? `const staged = [${lib.deps.map((d) => camel(d.name)).join(', ')}].reduce<string>(\n    (acc, fn) => fn(acc),\n    normalized,\n  );`
    : 'const staged = normalized;';

  write(
    join(root, `${lib.name}.ts`),
    `import type { Product } from '${imp(root, MODELS_FILE)}';
${depImports ? depImports + '\n' : ''}import {
${helperImports}
} from './${lib.name}-helpers';

export interface ${P}Options {
  /** BCP-47 locale used for locale-aware operations. */
  locale?: string;
  /** Maximum length of the produced string. */
  maxLength?: number;
  /** Value returned when the input is empty. */
  fallback?: string;
}

export interface ${P}Summary {
  count: number;
  longest: string;
  shortest: string;
  checksum: number;
}

export const ${U}_DEFAULTS: Required<${P}Options> = {
  locale: 'en-US',
  maxLength: 64,
  fallback: '—',
};

export const ${U}_KIND = '${lib.name}' as const;

/**
 * Formats a raw value using the "${lib.transform}" strategy.
 */
export function ${c}(
  value: string | number,
  options: ${P}Options = {},
): string {
  const opts: Required<${P}Options> = { ...${U}_DEFAULTS, ...options };
  const normalized = normalizeInput(value);
  if (normalized.length === 0) {
    return opts.fallback;
  }
  ${chain}
  const transformed = ${transformExpr(lib.transform, 'staged')};
  return clampLength(transformed, opts.maxLength);
}

export function ${c}Many(
  values: ReadonlyArray<string | number>,
  options: ${P}Options = {},
): string[] {
  return values.map((value) => ${c}(value, options));
}

export function is${P}Valid(value: unknown): value is string | number {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }
  if (typeof value === 'string') {
    return normalizeInput(value).length > 0;
  }
  return false;
}

export function ${c}Product(product: Product, options?: ${P}Options): string {
  const label = \`\${product.name} \${product.category}\`;
  return ${c}(label, options);
}

export function compare${P}(a: string | number, b: string | number): number {
  const left = ${c}(a);
  const right = ${c}(b);
  if (left === right) {
    return 0;
  }
  return left < right ? -1 : 1;
}

export function summarize${P}(values: ReadonlyArray<string | number>): ${P}Summary {
  const formatted = ${c}Many(values);
  let longest = '';
  let shortest = formatted[0] ?? '';
  let checksum = 0;
  for (const entry of formatted) {
    if (entry.length > longest.length) {
      longest = entry;
    }
    if (entry.length < shortest.length) {
      shortest = entry;
    }
    checksum = (checksum + hashString(entry)) % 1_000_003;
  }
  return { count: formatted.length, longest, shortest, checksum };
}

export function ${c}Keyed<T extends Record<string, string | number>>(
  records: ReadonlyArray<T>,
  key: keyof T,
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const record of records) {
    const bucket = ${c}(record[key]);
    const existing = grouped.get(bucket);
    if (existing) {
      existing.push(record);
    } else {
      grouped.set(bucket, [record]);
    }
  }
  return grouped;
}
`,
  );

  write(
    join(root, `${lib.name}-helpers.ts`),
    `/**
 * Internal helpers for ${lib.dir}.
 */
export function normalizeInput(value: string | number): string {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '';
  }
  return value.trim().replace(/\\s+/g, ' ');
}

export function clampLength(value: string, maxLength: number): string {
  if (maxLength <= 0) {
    return '';
  }
  if (value.length <= maxLength) {
    return value;
  }
  if (maxLength <= 1) {
    return value.slice(0, maxLength);
  }
  return value.slice(0, maxLength - 1) + '…';
}

export function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) + hash + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function titleCase(value: string): string {
  return value
    .split(' ')
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function padCode(value: string, width: number): string {
  if (value.length >= width) {
    return value;
  }
  return value.padStart(width, '0');
}

export function onlyDigits(value: string): string {
  return value.replace(/\\D+/g, '');
}

export function reverseText(value: string): string {
  return Array.from(value).reverse().join('');
}

export function chunk<T>(items: ReadonlyArray<T>, size: number): T[][] {
  if (size <= 0) {
    return [Array.from(items)];
  }
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}
`,
  );

  write(
    join(root, `${lib.name}.spec.ts`),
    `import { describe, expect, it } from 'vitest';
import {
  ${U}_DEFAULTS,
  ${U}_KIND,
  compare${P},
  ${c},
  ${c}Keyed,
  ${c}Many,
  ${c}Product,
  is${P}Valid,
  summarize${P},
} from './${lib.name}';
import { chunk, clampLength, hashString } from './${lib.name}-helpers';

describe('${lib.dir}', () => {
  it('exposes its kind', () => {
    expect(${U}_KIND).toBe('${lib.name}');
  });

  it('returns the fallback for empty input', () => {
    expect(${c}('')).toBe(${U}_DEFAULTS.fallback);
    expect(${c}('   ')).toBe(${U}_DEFAULTS.fallback);
    expect(${c}('', { fallback: 'n/a' })).toBe('n/a');
  });

  it('formats non-empty values into a bounded string', () => {
    const result = ${c}('Wireless Headphones 42', { maxLength: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('is deterministic', () => {
    expect(${c}('same input')).toBe(${c}('same input'));
    expect(compare${P}('same', 'same')).toBe(0);
  });

  it('formats many values', () => {
    expect(${c}Many(['a', 2, 'c'])).toHaveLength(3);
  });

  it('validates input', () => {
    expect(is${P}Valid('value')).toBe(true);
    expect(is${P}Valid(12)).toBe(true);
    expect(is${P}Valid('')).toBe(false);
    expect(is${P}Valid(Number.NaN)).toBe(false);
    expect(is${P}Valid(null)).toBe(false);
  });

  it('formats a product', () => {
    const result = ${c}Product({
      id: '1',
      name: 'Desk Lamp',
      description: 'A lamp',
      price: 19.99,
      category: 'Home',
      imageUrl: '',
      inStock: true,
      rating: 4,
      reviewCount: 2,
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it('summarizes values', () => {
    const summary = summarize${P}(['alpha', 'be', 'gamma-ray']);
    expect(summary.count).toBe(3);
    expect(summary.longest.length).toBeGreaterThanOrEqual(summary.shortest.length);
    expect(summary.checksum).toBeGreaterThanOrEqual(0);
  });

  it('groups records by a key', () => {
    const grouped = ${c}Keyed(
      [
        { id: 'a', status: 'open' },
        { id: 'b', status: 'open' },
        { id: 'c', status: 'closed' },
      ],
      'status',
    );
    expect(grouped.size).toBe(2);
  });

  it('helpers behave', () => {
    expect(clampLength('abcdef', 3)).toHaveLength(3);
    expect(hashString('x')).toBe(hashString('x'));
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
`,
  );
}

// ---------------------------------------------------------------------------
// UI modules
// ---------------------------------------------------------------------------
function genUi(lib) {
  const P = pascal(lib.name),
    U = upper(lib.name);
  const root = libRoot(lib);
  const [fmt, ...restUtils] = lib.utilDeps;
  const depUi = lib.uiDeps[0];

  write(
    join(root, `${lib.name}.types.ts`),
    `import type { ReactNode } from 'react';

export type ${P}Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ${P}Size = 'sm' | 'md' | 'lg';

export interface ${P}Props {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ${P}Tone;
  size?: ${P}Size;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ${P}Item {
  id: string;
  label: string;
  value?: string | number;
  tone?: ${P}Tone;
}

export interface ${P}GroupProps {
  items: ReadonlyArray<${P}Item>;
  title?: string;
  size?: ${P}Size;
  testId?: string;
  onSelect?: (item: ${P}Item) => void;
}
`,
  );

  write(
    join(root, `${lib.name}-variants.ts`),
    `import type { CSSProperties } from 'react';
import type { ${P}Size, ${P}Tone } from './${lib.name}.types';

export const ${U}_TONES: ReadonlyArray<${P}Tone> = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
];

export const ${U}_SIZES: ReadonlyArray<${P}Size> = ['sm', 'md', 'lg'];

const TONE_COLORS: Record<${P}Tone, { background: string; color: string; border: string }> = {
  neutral: { background: '#f7f7f9', color: '#333333', border: '#dcdce3' },
  info: { background: '#e8f1fd', color: '#1d4ed8', border: '#bfd7fb' },
  success: { background: '#e7f7ee', color: '#15803d', border: '#b7e4c7' },
  warning: { background: '#fff7e6', color: '#b45309', border: '#fde3a7' },
  danger: { background: '#fdecec', color: '#b91c1c', border: '#f7c1c1' },
};

const SIZE_PADDING: Record<${P}Size, string> = {
  sm: '4px 8px',
  md: '8px 12px',
  lg: '12px 16px',
};

const SIZE_FONT: Record<${P}Size, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
};

export function resolve${P}Style(tone: ${P}Tone, size: ${P}Size): CSSProperties {
  const palette = TONE_COLORS[tone];
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '4px',
    padding: SIZE_PADDING[size],
    fontSize: SIZE_FONT[size],
    borderRadius: '6px',
    border: \`1px solid \${palette.border}\`,
    backgroundColor: palette.background,
    color: palette.color,
  };
}

export function toneFromValue(value: string | number | undefined): ${P}Tone {
  if (value === undefined) {
    return 'neutral';
  }
  const numeric = typeof value === 'number' ? value : Number.parseFloat(value);
  if (Number.isNaN(numeric)) {
    return 'info';
  }
  if (numeric < 0) {
    return 'danger';
  }
  if (numeric === 0) {
    return 'warning';
  }
  return 'success';
}

export function is${P}Tone(value: string): value is ${P}Tone {
  return (${U}_TONES as ReadonlyArray<string>).includes(value);
}
`,
  );

  const utilImports = lib.utilDeps
    .map((d) => `import { ${camel(d.name)} } from '${imp(root, utilFile(d))}';`)
    .join('\n');
  const uiImport = depUi
    ? `import { ${pascal(depUi.name)} } from '${imp(root, uiFile(depUi))}';\n`
    : '';
  const ariaExpr = restUtils.reduce(
    (acc, d) => `${camel(d.name)}(${acc})`,
    'label',
  );

  write(
    join(root, `${lib.name}.tsx`),
    `${utilImports}
${uiImport}import type { ${P}Props } from './${lib.name}.types';
import { resolve${P}Style } from './${lib.name}-variants';

export function ${P}({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-${lib.name}',
  onSelect,
  children,
}: ${P}Props) {
  const formatted = value === undefined ? '' : ${camel(fmt.name)}(value);
  const style = resolve${P}Style(tone, size);
  const ariaLabel = ${ariaExpr};

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-${lib.name} ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
${depUi ? `      <${pascal(depUi.name)} label="${title(depUi.name)}" value={value} tone={tone} size="sm" />\n` : ''}    </div>
  );
}

export default ${P};
`,
  );

  write(
    join(root, `${lib.name}-group.tsx`),
    `import { ${P} } from './${lib.name}';
import type { ${P}GroupProps, ${P}Item } from './${lib.name}.types';
import { toneFromValue } from './${lib.name}-variants';

export function ${P}Group({
  items,
  title,
  size = 'md',
  testId = 'ui-${lib.name}-group',
  onSelect,
}: ${P}GroupProps) {
  const handleSelect = (item: ${P}Item) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <${P}
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={\`\${testId}-\${item.id}\`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? <p className="ui-group-empty">Nothing to show</p> : null}
    </section>
  );
}

export default ${P}Group;
`,
  );

  write(
    join(root, `${lib.name}.spec.tsx`),
    `import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ${P} } from './${lib.name}';
import { ${P}Group } from './${lib.name}-group';
import { ${U}_TONES, is${P}Tone, toneFromValue } from './${lib.name}-variants';

describe('${P}', () => {
  it('renders the label', () => {
    render(<${P} label="Total" value={42} />);
    expect(screen.getByTestId('ui-${lib.name}')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<${P} label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<${P} label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-${lib.name}'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <${P} label="Parent">
        <span>child content</span>
      </${P}>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('${P}Group', () => {
  it('renders every item', () => {
    render(
      <${P}Group
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-${lib.name}-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-${lib.name}-group-b')).toHaveAttribute('data-tone', 'danger');
  });

  it('shows an empty message', () => {
    render(<${P}Group items={[]} />);
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });
});

describe('variants', () => {
  it('derives tones from values', () => {
    expect(toneFromValue(undefined)).toBe('neutral');
    expect(toneFromValue(0)).toBe('warning');
    expect(toneFromValue(5)).toBe('success');
    expect(toneFromValue('abc')).toBe('info');
  });

  it('validates tones', () => {
    for (const tone of ${U}_TONES) {
      expect(is${P}Tone(tone)).toBe(true);
    }
    expect(is${P}Tone('bogus')).toBe(false);
  });
});
`,
  );
}

// ---------------------------------------------------------------------------
// FEATURE modules
// ---------------------------------------------------------------------------
function genFeature(lib) {
  const P = pascal(lib.name),
    c = camel(lib.name),
    U = upper(lib.name);
  const T = title(lib.name);
  const root = libRoot(lib);
  const [uiHeader, uiPanel, uiTable, ...uiExtra] = lib.uiDeps;
  const [fmtAmount, ...moreUtils] = lib.utilDeps;
  const nameExpr = (moreUtils.length ? moreUtils : [fmtAmount]).reduce(
    (acc, d) => `${camel(d.name)}(${acc})`,
    'item.name',
  );
  const depFeature = lib.featureDeps[0];

  // ---- model -------------------------------------------------------------
  write(
    join(root, `${lib.name}.model.ts`),
    `import type { Product } from '${imp(root, MODELS_FILE)}';

export type ${P}Status = 'active' | 'pending' | 'archived';

export interface ${P}Item {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  status: ${P}Status;
  tags: string[];
  product: Product;
  createdAt: string;
}

export interface ${P}Totals {
  amount: number;
  quantity: number;
  active: number;
  pending: number;
  archived: number;
}

export const ${U}_ITEM_COUNT = ${lib.itemCount};

export const ${U}_STATUSES: ReadonlyArray<${P}Status> = ['active', 'pending', 'archived'];

const NAMES = [
  'Aurora', 'Basalt', 'Cobalt', 'Dune', 'Ember', 'Fjord', 'Granite', 'Harbor',
  'Iris', 'Juniper', 'Kestrel', 'Lumen', 'Meadow', 'Nimbus', 'Onyx', 'Prism',
];

const TAGS = ['featured', 'seasonal', 'clearance', 'new', 'bundle', 'gift'];

function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

export function build${P}Product(index: number): Product {
  return {
    id: \`${lib.name}-p\${index}\`,
    name: \`\${NAMES[index % NAMES.length]} \${index + 1}\`,
    description: \`${T} product number \${index + 1}\`,
    price: Math.round(seeded(index, 1) * 20000) / 100,
    category: '${title(lib.domain)}',
    imageUrl: \`https://picsum.photos/seed/${lib.name}-\${index}/300/200\`,
    inStock: seeded(index, 2) > 0.25,
    rating: Math.round(seeded(index, 3) * 50) / 10,
    reviewCount: Math.floor(seeded(index, 4) * 500),
  };
}

export function build${P}Item(index: number): ${P}Item {
  const product = build${P}Product(index);
  const status = ${U}_STATUSES[index % ${U}_STATUSES.length];
  const tagCount = 1 + (index % 3);
  const tags: string[] = [];
  for (let i = 0; i < tagCount; i++) {
    tags.push(TAGS[(index + i) % TAGS.length]);
  }
  return {
    id: \`${lib.name}-\${index + 1}\`,
    name: \`${T} \${NAMES[index % NAMES.length]}\`,
    amount: Math.round(product.price * (1 + (index % 4))),
    quantity: 1 + (index % 5),
    status,
    tags,
    product,
    createdAt: new Date(Date.UTC(2026, index % 12, 1 + (index % 27))).toISOString(),
  };
}

export function build${P}Items(count: number = ${U}_ITEM_COUNT): ${P}Item[] {
  const items: ${P}Item[] = [];
  for (let i = 0; i < count; i++) {
    items.push(build${P}Item(i));
  }
  return items;
}

export function empty${P}Totals(): ${P}Totals {
  return { amount: 0, quantity: 0, active: 0, pending: 0, archived: 0 };
}
`,
  );

  // ---- routes / meta -------------------------------------------------------
  write(
    join(root, `${lib.name}.routes.ts`),
    `export const ${U}_ROUTE = '${lib.route}';

export const ${U}_TEST_ID = '${lib.testId}';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ${U}_FEATURE: FeatureMeta = {
  id: '${lib.name}',
  title: '${T}',
  route: ${U}_ROUTE,
  testId: ${U}_TEST_ID,
  domain: '${lib.domain}',
  kind: '${lib.kind}',
  itemCount: ${lib.itemCount},
};

export function ${c}ItemPath(itemId: string): string {
  return \`\${${U}_ROUTE}/\${encodeURIComponent(itemId)}\`;
}
`,
  );

  // ---- utils ---------------------------------------------------------------
  const utilImports = lib.utilDeps
    .map((d) => `import { ${camel(d.name)} } from '${imp(root, utilFile(d))}';`)
    .join('\n');
  write(
    join(root, `${lib.name}.utils.ts`),
    `${utilImports}
import {
  empty${P}Totals,
  type ${P}Item,
  type ${P}Status,
  type ${P}Totals,
} from './${lib.name}.model';

export type ${P}SortKey = 'name' | 'amount' | 'quantity' | 'createdAt';

export function total${P}(items: ReadonlyArray<${P}Item>): ${P}Totals {
  const totals = empty${P}Totals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function group${P}ByStatus(
  items: ReadonlyArray<${P}Item>,
): Record<${P}Status, ${P}Item[]> {
  const grouped: Record<${P}Status, ${P}Item[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filter${P}(
  items: ReadonlyArray<${P}Item>,
  query: string,
): ${P}Item[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return Array.from(items);
  }
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(needle)) {
      return true;
    }
    if (item.status.includes(needle)) {
      return true;
    }
    return item.tags.some((tag) => tag.includes(needle));
  });
}

export function sort${P}(
  items: ReadonlyArray<${P}Item>,
  key: ${P}SortKey,
  direction: 'asc' | 'desc' = 'asc',
): ${P}Item[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left === right) {
      return 0;
    }
    return left < right ? -factor : factor;
  });
}

export function describe${P}Item(item: ${P}Item): string {
  const amount = ${camel(fmtAmount.name)}(item.amount);
  const name = ${nameExpr};
  return \`\${name} · \${amount} · \${item.quantity} pcs · \${item.status}\`;
}

export function format${P}Amount(amount: number): string {
  return ${camel(fmtAmount.name)}(amount);
}

export function ${c}StatusTone(
  status: ${P}Status,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function pick${P}Highlights(
  items: ReadonlyArray<${P}Item>,
  limit = 3,
): ${P}Item[] {
  return sort${P}(items, 'amount', 'desc').slice(0, Math.max(0, limit));
}
`,
  );

  // ---- hook ----------------------------------------------------------------
  write(
    join(root, `use-${lib.name}.ts`),
    `import { useCallback, useEffect, useMemo, useState } from 'react';
import { build${P}Items, type ${P}Item, ${U}_ITEM_COUNT } from './${lib.name}.model';
import {
  filter${P},
  sort${P},
  total${P},
  type ${P}SortKey,
} from './${lib.name}.utils';

export interface Use${P}Options {
  itemCount?: number;
  initialSort?: ${P}SortKey;
}

export interface Use${P}Result {
  items: ${P}Item[];
  allItems: ${P}Item[];
  selected: ${P}Item | null;
  query: string;
  sortKey: ${P}SortKey;
  loading: boolean;
  error: string | null;
  totals: ReturnType<typeof total${P}>;
  select: (id: string | null) => void;
  setQuery: (query: string) => void;
  setSortKey: (key: ${P}SortKey) => void;
  refresh: () => void;
}

export function use${P}(options: Use${P}Options = {}): Use${P}Result {
  const { itemCount = ${U}_ITEM_COUNT, initialSort = 'name' } = options;
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<${P}SortKey>(initialSort);

  const allItems = useMemo(() => {
    // version is part of the memo key so refresh() rebuilds the dataset.
    return build${P}Items(itemCount + (version % 2));
  }, [itemCount, version]);

  const items = useMemo(
    () => sort${P}(filter${P}(allItems, query), sortKey),
    [allItems, query, sortKey],
  );

  const selected = useMemo(
    () => allItems.find((item) => item.id === selectedId) ?? null,
    [allItems, selectedId],
  );

  const totals = useMemo(() => total${P}(items), [items]);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 25);
    return () => clearTimeout(timer);
  }, [loading]);

  const refresh = useCallback(() => {
    setLoading(true);
    setVersion((v) => v + 1);
  }, []);

  const select = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  return {
    items,
    allItems,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  };
}
`,
  );

  // ---- sections ------------------------------------------------------------
  write(
    join(root, `${lib.name}-header.tsx`),
    `import { ${pascal(uiHeader.name)} } from '${imp(root, uiFile(uiHeader))}';
import { ${U}_FEATURE } from './${lib.name}.routes';

export interface ${P}HeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ${P}Header({ count, total, loading, onRefresh }: ${P}HeaderProps) {
  return (
    <header className="feature-header" data-testid={\`\${${U}_FEATURE.testId}-header\`}>
      <div>
        <h1 className="feature-title">{${U}_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {${U}_FEATURE.domain} · {${U}_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <${pascal(uiHeader.name)} label="Items" value={count} tone="info" />
        <${pascal(uiHeader.name)} label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={\`\${${U}_FEATURE.testId}-refresh\`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
`,
  );

  write(
    join(root, `${lib.name}-filters.tsx`),
    `import type { ChangeEvent } from 'react';
import { ${U}_FEATURE } from './${lib.name}.routes';
import type { ${P}SortKey } from './${lib.name}.utils';

export interface ${P}FiltersProps {
  query: string;
  sortKey: ${P}SortKey;
  onQueryChange: (query: string) => void;
  onSortChange: (key: ${P}SortKey) => void;
}

const SORT_OPTIONS: ReadonlyArray<{ value: ${P}SortKey; label: string }> = [
  { value: 'name', label: 'Name' },
  { value: 'amount', label: 'Amount' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'createdAt', label: 'Created' },
];

export function ${P}Filters({
  query,
  sortKey,
  onQueryChange,
  onSortChange,
}: ${P}FiltersProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ${P}SortKey);
  };

  return (
    <div className="feature-filters">
      <input
        type="search"
        className="feature-input"
        placeholder="Filter ${T.toLowerCase()}…"
        value={query}
        onChange={handleQuery}
        data-testid={\`\${${U}_FEATURE.testId}-filter\`}
      />
      <select
        className="feature-select"
        value={sortKey}
        onChange={handleSort}
        data-testid={\`\${${U}_FEATURE.testId}-sort\`}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
`,
  );

  write(
    join(root, `${lib.name}-table.tsx`),
    `import { ${pascal(uiTable.name)} } from '${imp(root, uiFile(uiTable))}';
import type { ${P}Item } from './${lib.name}.model';
import { ${U}_FEATURE } from './${lib.name}.routes';
import { format${P}Amount, ${c}StatusTone } from './${lib.name}.utils';

export interface ${P}TableProps {
  items: ReadonlyArray<${P}Item>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ${P}Table({ items, selectedId, onSelect }: ${P}TableProps) {
  if (items.length === 0) {
    return (
      <p className="feature-empty" data-testid={\`\${${U}_FEATURE.testId}-empty\`}>
        No ${T.toLowerCase()} entries match the current filter.
      </p>
    );
  }

  return (
    <table className="feature-table" data-testid={\`\${${U}_FEATURE.testId}-table\`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={item.id === selectedId ? 'feature-row selected' : 'feature-row'}
            data-testid={\`\${${U}_FEATURE.testId}-row\`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{format${P}Amount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <${pascal(uiTable.name)}
                label={item.status}
                tone={${c}StatusTone(item.status)}
                size="sm"
                testId={\`\${${U}_FEATURE.testId}-status-\${item.id}\`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`,
  );

  const extraUiImports = uiExtra
    .map((d) => `import { ${pascal(d.name)} } from '${imp(root, uiFile(d))}';`)
    .join('\n');
  const extraUiJsx = uiExtra
    .map(
      (d) =>
        `        <${pascal(d.name)} label="${title(d.name)}" value={selected.product.rating} size="sm" />`,
    )
    .join('\n');
  write(
    join(root, `${lib.name}-panel.tsx`),
    `import { ${pascal(uiPanel.name)}Group } from '${imp(root, uiGroupFile(uiPanel))}';
${extraUiImports ? extraUiImports + '\n' : ''}import type { ${P}Item } from './${lib.name}.model';
import { ${U}_FEATURE } from './${lib.name}.routes';
import { describe${P}Item } from './${lib.name}.utils';

export interface ${P}PanelProps {
  selected: ${P}Item | null;
  onClear: () => void;
}

export function ${P}Panel({ selected, onClear }: ${P}PanelProps) {
  if (!selected) {
    return (
      <aside className="feature-panel" data-testid={\`\${${U}_FEATURE.testId}-panel\`}>
        <p className="feature-panel-hint">Select an entry to see its details.</p>
      </aside>
    );
  }

  return (
    <aside className="feature-panel" data-testid={\`\${${U}_FEATURE.testId}-panel\`}>
      <h2 className="feature-panel-title" data-testid={\`\${${U}_FEATURE.testId}-panel-name\`}>
        {selected.name}
      </h2>
      <p className="feature-panel-description">{describe${P}Item(selected)}</p>
      <${pascal(uiPanel.name)}Group
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
${extraUiJsx ? extraUiJsx + '\n' : ''}      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={\`\${${U}_FEATURE.testId}-clear\`}
      >
        Clear selection
      </button>
    </aside>
  );
}
`,
  );

  write(
    join(root, `${lib.name}-summary.tsx`),
    `import { ${pascal(uiHeader.name)}Group } from '${imp(root, uiGroupFile(uiHeader))}';
import { build${P}Items } from './${lib.name}.model';
import { ${U}_FEATURE } from './${lib.name}.routes';
import { pick${P}Highlights, total${P} } from './${lib.name}.utils';

export interface ${P}SummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ${P}Summary({ compact = false, limit = 3 }: ${P}SummaryProps) {
  const items = build${P}Items();
  const totals = total${P}(items);
  const highlights = pick${P}Highlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={\`\${${U}_FEATURE.testId}-summary\`}
    >
      <h3 className="feature-summary-title">{${U}_FEATURE.title}</h3>
      <${pascal(uiHeader.name)}Group
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
`,
  );

  const depSummaryImport = depFeature
    ? `import { ${pascal(depFeature.name)}Summary } from '${imp(root, featureSummaryFile(depFeature))}';\n`
    : '';
  const depSummaryJsx = depFeature
    ? `          <${pascal(depFeature.name)}Summary compact />\n`
    : '';
  write(
    join(root, `${lib.name}-page.tsx`),
    `import { ErrorMessage } from '${imp(root, join(SHARED_UI, 'error-message', 'error-message'))}';
import { LoadingSpinner } from '${imp(root, join(SHARED_UI, 'loading-spinner', 'loading-spinner'))}';
${depSummaryImport}import { ${P}Filters } from './${lib.name}-filters';
import { ${P}Header } from './${lib.name}-header';
import { ${P}Panel } from './${lib.name}-panel';
import { ${P}Table } from './${lib.name}-table';
import { ${U}_FEATURE } from './${lib.name}.routes';
import { use${P} } from './use-${lib.name}';

export function ${P}Page() {
  const {
    items,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  } = use${P}();

  return (
    <section className="feature-page" data-testid={${U}_FEATURE.testId}>
      <${P}Header
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <${P}Filters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <${P}Table
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <${P}Panel selected={selected} onClear={() => select(null)} />
${depSummaryJsx}        </div>
      </div>
    </section>
  );
}

export default ${P}Page;
`,
  );

  // ---- specs ---------------------------------------------------------------
  write(
    join(root, `${lib.name}-page.spec.tsx`),
    `import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ${P}Page } from './${lib.name}-page';
import { ${P}Summary } from './${lib.name}-summary';
import { ${U}_FEATURE, ${U}_ROUTE } from './${lib.name}.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[${U}_ROUTE]}>
      <${P}Page />
    </MemoryRouter>,
  );
}

describe('${P}Page', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(${U}_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(${U}_FEATURE.title);
  });

  it('renders one row per item', () => {
    renderPage();
    expect(screen.getAllByTestId(\`\${${U}_FEATURE.testId}-row\`)).toHaveLength(${U}_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(\`\${${U}_FEATURE.testId}-row\`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(screen.getByTestId(\`\${${U}_FEATURE.testId}-panel-name\`)).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(\`\${${U}_FEATURE.testId}-clear\`));
    expect(screen.queryByTestId(\`\${${U}_FEATURE.testId}-panel-name\`)).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(screen.getByTestId(\`\${${U}_FEATURE.testId}-filter\`), {
      target: { value: 'zzz-no-match' },
    });
    expect(screen.getByTestId(\`\${${U}_FEATURE.testId}-empty\`)).toBeInTheDocument();
  });
});

describe('${P}Summary', () => {
  it('renders the summary block', () => {
    render(<${P}Summary />);
    expect(screen.getByTestId(\`\${${U}_FEATURE.testId}-summary\`)).toBeInTheDocument();
  });
});
`,
  );

  write(
    join(root, `${lib.name}.utils.spec.ts`),
    `import { describe, expect, it } from 'vitest';
import { build${P}Items, ${U}_ITEM_COUNT } from './${lib.name}.model';
import {
  describe${P}Item,
  filter${P},
  group${P}ByStatus,
  pick${P}Highlights,
  sort${P},
  total${P},
  ${c}StatusTone,
} from './${lib.name}.utils';

describe('${lib.name} utils', () => {
  const items = build${P}Items();

  it('builds the configured number of items', () => {
    expect(items).toHaveLength(${U}_ITEM_COUNT);
    expect(new Set(items.map((item) => item.id)).size).toBe(${U}_ITEM_COUNT);
  });

  it('totals amounts and statuses', () => {
    const totals = total${P}(items);
    expect(totals.amount).toBe(items.reduce((sum, item) => sum + item.amount, 0));
    expect(totals.active + totals.pending + totals.archived).toBe(items.length);
  });

  it('groups by status', () => {
    const grouped = group${P}ByStatus(items);
    const total = grouped.active.length + grouped.pending.length + grouped.archived.length;
    expect(total).toBe(items.length);
  });

  it('filters by name, status and tag', () => {
    expect(filter${P}(items, '')).toHaveLength(items.length);
    expect(filter${P}(items, 'active').every((item) => item.status === 'active' || item.tags.some((t) => t.includes('active')) || item.name.toLowerCase().includes('active'))).toBe(true);
    expect(filter${P}(items, 'no-such-thing-xyz')).toHaveLength(0);
  });

  it('sorts by key in both directions', () => {
    const asc = sort${P}(items, 'amount', 'asc');
    const desc = sort${P}(items, 'amount', 'desc');
    for (let i = 1; i < asc.length; i++) {
      expect(asc[i - 1].amount).toBeLessThanOrEqual(asc[i].amount);
    }
    expect(desc[0].amount).toBe(asc[asc.length - 1].amount);
  });

  it('describes an item', () => {
    const description = describe${P}Item(items[0]);
    expect(description).toContain('pcs');
    expect(description).toContain(items[0].status);
  });

  it('maps statuses to tones', () => {
    expect(${c}StatusTone('active')).toBe('success');
    expect(${c}StatusTone('pending')).toBe('warning');
    expect(${c}StatusTone('archived')).toBe('neutral');
  });

  it('picks highlights', () => {
    expect(pick${P}Highlights(items, 2)).toHaveLength(2);
    expect(pick${P}Highlights(items, 0)).toHaveLength(0);
  });
});
`,
  );

  write(
    join(root, `use-${lib.name}.spec.ts`),
    `import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ${U}_ITEM_COUNT } from './${lib.name}.model';
import { use${P} } from './use-${lib.name}';

describe('use${P}', () => {
  it('starts with the full dataset and nothing selected', () => {
    const { result } = renderHook(() => use${P}());
    expect(result.current.items).toHaveLength(${U}_ITEM_COUNT);
    expect(result.current.selected).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('selects and clears an item', () => {
    const { result } = renderHook(() => use${P}());
    const first = result.current.items[0];
    act(() => result.current.select(first.id));
    expect(result.current.selected?.id).toBe(first.id);
    act(() => result.current.select(null));
    expect(result.current.selected).toBeNull();
  });

  it('filters and sorts', () => {
    const { result } = renderHook(() => use${P}());
    act(() => result.current.setQuery('no-match-at-all'));
    expect(result.current.items).toHaveLength(0);
    act(() => result.current.setQuery(''));
    act(() => result.current.setSortKey('amount'));
    const amounts = result.current.items.map((item) => item.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
  });

  it('honours a custom item count', () => {
    const { result } = renderHook(() => use${P}({ itemCount: 3 }));
    expect(result.current.allItems).toHaveLength(3);
  });

  it('enters a loading state on refresh', () => {
    const { result } = renderHook(() => use${P}());
    act(() => result.current.refresh());
    expect(result.current.loading).toBe(true);
  });
});
`,
  );
}

// ---------------------------------------------------------------------------
// App wiring
// ---------------------------------------------------------------------------
function genAppRoutes() {
  const lines = [];
  lines.push(`/* eslint-disable */`);
  lines.push(`// GENERATED by tools/generate-shop.mjs — do not edit by hand.`);
  lines.push(`import { lazy } from 'react';`);
  lines.push(`import { Route } from 'react-router-dom';`);
  lines.push('');
  lines.push(`export interface FeatureLink {`);
  lines.push(`  id: string;`);
  lines.push(`  title: string;`);
  lines.push(`  route: string;`);
  lines.push(`  domain: string;`);
  lines.push(`}`);
  lines.push('');
  lines.push(`export const FEATURE_LINKS: ReadonlyArray<FeatureLink> = [`);
  for (const f of features) {
    lines.push(
      `  { id: '${f.name}', title: '${title(f.name)}', route: '${f.route}', domain: '${f.domain}' },`,
    );
  }
  lines.push(`];`);
  lines.push('');
  for (const f of features) {
    lines.push(`const ${pascal(f.name)}Page = lazy(() =>`);
    lines.push(
      `  import('${imp(join(SRC, 'app'), join(featureDir(f), `${f.name}-page`))}').then((m) => ({ default: m.${pascal(f.name)}Page })),`,
    );
    lines.push(`);`);
  }
  lines.push('');
  lines.push(`export const featureRoutes = [`);
  for (const f of features) {
    lines.push(
      `  <Route key="${f.name}" path="${f.route}" element={<${pascal(f.name)}Page />} />,`,
    );
  }
  lines.push(`];`);
  write(join(ROOT, 'apps/shop/src/app/feature-routes.tsx'), lines.join('\n'));

  write(
    join(ROOT, 'apps/shop/src/app/feature-index.tsx'),
    `import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURE_LINKS } from './feature-routes';

export function FeatureIndex() {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const map = new Map<string, typeof FEATURE_LINKS>();
    for (const link of FEATURE_LINKS) {
      if (needle && !link.title.toLowerCase().includes(needle)) {
        continue;
      }
      const bucket = map.get(link.domain) ?? [];
      map.set(link.domain, [...bucket, link]);
    }
    return Array.from(map.entries());
  }, [query]);

  return (
    <section className="feature-index" data-testid="feature-index">
      <header className="feature-header">
        <h1 className="feature-title">Features</h1>
        <input
          type="search"
          className="feature-input"
          placeholder="Filter features…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          data-testid="feature-index-filter"
        />
      </header>
      {grouped.map(([domain, links]) => (
        <section key={domain} className="feature-index-group" data-testid={\`feature-index-\${domain}\`}>
          <h2 className="feature-index-domain">{domain}</h2>
          <ul className="feature-index-links">
            {links.map((link) => (
              <li key={link.id}>
                <Link to={link.route}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}

export default FeatureIndex;
`,
  );
}

// ---------------------------------------------------------------------------
// E2E specs
// ---------------------------------------------------------------------------
// Exactly this many e2e specs are generated, one test per spec. Features are
// sampled evenly across the list so every domain is covered.
const E2E_SPEC_COUNT = 100;

function genE2e() {
  const e2eRoot = join(ROOT, 'apps/shop/e2e');
  const step = features.length / E2E_SPEC_COUNT;
  const selected = Array.from(
    { length: E2E_SPEC_COUNT },
    (_, i) => features[Math.floor(i * step)],
  );
  for (const f of selected) {
    const U = upper(f.name);
    write(
      join(e2eRoot, 'features', `${f.name}.spec.ts`),
      `import { expect, test } from '@playwright/test';
import { ${U}_FEATURE } from '${imp(join(e2eRoot, 'features'), join(featureDir(f), `${f.name}.routes`))}';
import { ${U}_ITEM_COUNT } from '${imp(join(e2eRoot, 'features'), join(featureDir(f), `${f.name}.model`))}';
import { padTo } from '../support/pacing';

test.describe('${title(f.name)}', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(${U}_FEATURE.route);
    await expect(page.getByTestId(${U}_FEATURE.testId)).toBeVisible();
    const heading = page.getByTestId(\`\${${U}_FEATURE.testId}-header\`).getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(${U}_FEATURE.title);
    const rows = page.getByTestId(\`\${${U}_FEATURE.testId}-row\`);
    await expect(rows).toHaveCount(${U}_ITEM_COUNT);
    await padTo(startedAt);
  });
});
`,
    );
  }
  return selected.length;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

utils.forEach(genUtil);
uis.forEach(genUi);
features.forEach(genFeature);
genAppRoutes();
const e2eSpecCount = genE2e();

console.log(
  `generated ${utils.length} utilities, ${uis.length} ui components, ${features.length} features`,
);
console.log(`generated ${e2eSpecCount} e2e specs (one ~25s test each)`);

if (!process.argv.includes('--no-format')) {
  console.log('formatting generated files with prettier…');
  execSync(
    'npx prettier --write --log-level warn "apps/shop/src/{utils,components,features}/**/*.{ts,tsx}" "apps/shop/src/app/feature-*.tsx" "apps/shop/e2e/**/*.ts"',
    { cwd: ROOT, stdio: 'inherit' },
  );
}
