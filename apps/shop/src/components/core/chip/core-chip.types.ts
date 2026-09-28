import type { ReactNode } from 'react';

export type CoreChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreChipSize = 'sm' | 'md' | 'lg';

export interface CoreChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreChipTone;
  size?: CoreChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreChipTone;
}

export interface CoreChipGroupProps {
  items: ReadonlyArray<CoreChipItem>;
  title?: string;
  size?: CoreChipSize;
  testId?: string;
  onSelect?: (item: CoreChipItem) => void;
}
