import type { ReactNode } from 'react';

export type ChartsBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsBadgeSize = 'sm' | 'md' | 'lg';

export interface ChartsBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsBadgeTone;
  size?: ChartsBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsBadgeTone;
}

export interface ChartsBadgeGroupProps {
  items: ReadonlyArray<ChartsBadgeItem>;
  title?: string;
  size?: ChartsBadgeSize;
  testId?: string;
  onSelect?: (item: ChartsBadgeItem) => void;
}
