import type { ReactNode } from 'react';

export type LayoutChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutChipSize = 'sm' | 'md' | 'lg';

export interface LayoutChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutChipTone;
  size?: LayoutChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutChipTone;
}

export interface LayoutChipGroupProps {
  items: ReadonlyArray<LayoutChipItem>;
  title?: string;
  size?: LayoutChipSize;
  testId?: string;
  onSelect?: (item: LayoutChipItem) => void;
}
