/**
 * Internal helpers for util-collection-date.
 */
export function normalizeInput(value: string | number): string {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '';
  }
  return value.trim().replace(/\s+/g, ' ');
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
  return value.replace(/\D+/g, '');
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
