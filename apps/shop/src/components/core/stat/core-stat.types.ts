import type { ReactNode } from 'react';

export type CoreStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreStatSize = 'sm' | 'md' | 'lg';

export interface CoreStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreStatTone;
  size?: CoreStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreStatTone;
}

export interface CoreStatGroupProps {
  items: ReadonlyArray<CoreStatItem>;
  title?: string;
  size?: CoreStatSize;
  testId?: string;
  onSelect?: (item: CoreStatItem) => void;
}
