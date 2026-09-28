import type { ReactNode } from 'react';

export type DataStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataStatSize = 'sm' | 'md' | 'lg';

export interface DataStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataStatTone;
  size?: DataStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataStatTone;
}

export interface DataStatGroupProps {
  items: ReadonlyArray<DataStatItem>;
  title?: string;
  size?: DataStatSize;
  testId?: string;
  onSelect?: (item: DataStatItem) => void;
}
