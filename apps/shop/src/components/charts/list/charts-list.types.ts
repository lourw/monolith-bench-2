import type { ReactNode } from 'react';

export type ChartsListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsListSize = 'sm' | 'md' | 'lg';

export interface ChartsListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsListTone;
  size?: ChartsListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsListTone;
}

export interface ChartsListGroupProps {
  items: ReadonlyArray<ChartsListItem>;
  title?: string;
  size?: ChartsListSize;
  testId?: string;
  onSelect?: (item: ChartsListItem) => void;
}
