import type { ReactNode } from 'react';

export type ChartsStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsStatSize = 'sm' | 'md' | 'lg';

export interface ChartsStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsStatTone;
  size?: ChartsStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsStatTone;
}

export interface ChartsStatGroupProps {
  items: ReadonlyArray<ChartsStatItem>;
  title?: string;
  size?: ChartsStatSize;
  testId?: string;
  onSelect?: (item: ChartsStatItem) => void;
}
