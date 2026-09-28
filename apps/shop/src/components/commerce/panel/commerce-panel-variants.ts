import type { CSSProperties } from 'react';
import type {
  CommercePanelSize,
  CommercePanelTone,
} from './commerce-panel.types';

export const COMMERCE_PANEL_TONES: ReadonlyArray<CommercePanelTone> = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
];

export const COMMERCE_PANEL_SIZES: ReadonlyArray<CommercePanelSize> = [
  'sm',
  'md',
  'lg',
];

const TONE_COLORS: Record<
  CommercePanelTone,
  { background: string; color: string; border: string }
> = {
  neutral: { background: '#f7f7f9', color: '#333333', border: '#dcdce3' },
  info: { background: '#e8f1fd', color: '#1d4ed8', border: '#bfd7fb' },
  success: { background: '#e7f7ee', color: '#15803d', border: '#b7e4c7' },
  warning: { background: '#fff7e6', color: '#b45309', border: '#fde3a7' },
  danger: { background: '#fdecec', color: '#b91c1c', border: '#f7c1c1' },
};

const SIZE_PADDING: Record<CommercePanelSize, string> = {
  sm: '4px 8px',
  md: '8px 12px',
  lg: '12px 16px',
};

const SIZE_FONT: Record<CommercePanelSize, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
};

export function resolveCommercePanelStyle(
  tone: CommercePanelTone,
  size: CommercePanelSize,
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
): CommercePanelTone {
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

export function isCommercePanelTone(value: string): value is CommercePanelTone {
  return (COMMERCE_PANEL_TONES as ReadonlyArray<string>).includes(value);
}
