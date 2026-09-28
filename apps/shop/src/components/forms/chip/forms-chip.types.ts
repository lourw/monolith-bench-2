import type { ReactNode } from 'react';

export type FormsChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsChipSize = 'sm' | 'md' | 'lg';

export interface FormsChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsChipTone;
  size?: FormsChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsChipTone;
}

export interface FormsChipGroupProps {
  items: ReadonlyArray<FormsChipItem>;
  title?: string;
  size?: FormsChipSize;
  testId?: string;
  onSelect?: (item: FormsChipItem) => void;
}
