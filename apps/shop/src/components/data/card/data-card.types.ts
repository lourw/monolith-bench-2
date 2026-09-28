import type { ReactNode } from 'react';

export type DataCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataCardSize = 'sm' | 'md' | 'lg';

export interface DataCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataCardTone;
  size?: DataCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataCardTone;
}

export interface DataCardGroupProps {
  items: ReadonlyArray<DataCardItem>;
  title?: string;
  size?: DataCardSize;
  testId?: string;
  onSelect?: (item: DataCardItem) => void;
}
