import type { ReactNode } from 'react';

export type ChartsChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsChipSize = 'sm' | 'md' | 'lg';

export interface ChartsChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsChipTone;
  size?: ChartsChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsChipTone;
}

export interface ChartsChipGroupProps {
  items: ReadonlyArray<ChartsChipItem>;
  title?: string;
  size?: ChartsChipSize;
  testId?: string;
  onSelect?: (item: ChartsChipItem) => void;
}
