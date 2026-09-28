import type { ReactNode } from 'react';

export type LayoutStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutStatSize = 'sm' | 'md' | 'lg';

export interface LayoutStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutStatTone;
  size?: LayoutStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutStatTone;
}

export interface LayoutStatGroupProps {
  items: ReadonlyArray<LayoutStatItem>;
  title?: string;
  size?: LayoutStatSize;
  testId?: string;
  onSelect?: (item: LayoutStatItem) => void;
}
