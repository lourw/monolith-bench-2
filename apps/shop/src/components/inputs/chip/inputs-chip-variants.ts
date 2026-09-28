import type { CSSProperties } from 'react';
import type { InputsChipSize, InputsChipTone } from './inputs-chip.types';

export const INPUTS_CHIP_TONES: ReadonlyArray<InputsChipTone> = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
];

export const INPUTS_CHIP_SIZES: ReadonlyArray<InputsChipSize> = [
  'sm',
  'md',
  'lg',
];

const TONE_COLORS: Record<
  InputsChipTone,
  { background: string; color: string; border: string }
> = {
  neutral: { background: '#f7f7f9', color: '#333333', border: '#dcdce3' },
  info: { background: '#e8f1fd', color: '#1d4ed8', border: '#bfd7fb' },
  success: { background: '#e7f7ee', color: '#15803d', border: '#b7e4c7' },
  warning: { background: '#fff7e6', color: '#b45309', border: '#fde3a7' },
  danger: { background: '#fdecec', color: '#b91c1c', border: '#f7c1c1' },
};

const SIZE_PADDING: Record<InputsChipSize, string> = {
  sm: '4px 8px',
  md: '8px 12px',
  lg: '12px 16px',
};

const SIZE_FONT: Record<InputsChipSize, string> = {
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
};

export function resolveInputsChipStyle(
  tone: InputsChipTone,
  size: InputsChipSize,
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
): InputsChipTone {
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

export function isInputsChipTone(value: string): value is InputsChipTone {
  return (INPUTS_CHIP_TONES as ReadonlyArray<string>).includes(value);
}
