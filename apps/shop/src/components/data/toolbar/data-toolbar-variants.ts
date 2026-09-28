import type { CSSProperties } from 'react';
import type { DataToolbarSize, DataToolbarTone } from './data-toolbar.types';

export const DATA_TOOLBAR_TONES: ReadonlyArray<DataToolbarTone> = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
];

export const DATA_TOOLBAR_SIZES: ReadonlyArray<DataToolbarSize> = [
  'sm',
  'md',
  'lg',
];

const TONE_COLORS: Record<
  DataToolbarTone,
  { background: string; color: string; border: string }
> = {
  neutral: { background: '#f7f7f9', color: '#333333', border: '#dcdce3' },
  info: { background: '#e8f1fd', color: '#1d4ed8', border: '#bfd7fb' },
  success: { background: '#e7f7ee', color: '#15803d', border: '#b7e4c7' },
  warning: { background: '#fff7e6', color: '#b45309', border: '#fde3a7' },
  danger: { background: '#fdecec', color: '#b91c1c', border: '#f7c1c1' },
};

const SIZE_PADDING: Record<DataToolbarSize, string> = {
  sm: '4px 8px',
  md: '8px 12px',
  lg: '12px 16px',
};

const SIZE_FONT: Record<DataToolbarSize, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
};

export function resolveDataToolbarStyle(
  tone: DataToolbarTone,
  size: DataToolbarSize,
): CSSProperties {
  const palette = TONE_COLORS[tone];
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: '4px',
    padding: SIZE_PADDING[size],
    fontSize: SIZE_FONT[size],
    borderRadius: '6px',
    border: `1px solid ${palette.border}`,
    backgroundColor: palette.background,
    color: palette.color,
  };
}

export function toneFromValue(
  value: string | number | undefined,
): DataToolbarTone {
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

export function isDataToolbarTone(value: string): value is DataToolbarTone {
  return (DATA_TOOLBAR_TONES as ReadonlyArray<string>).includes(value);
}
