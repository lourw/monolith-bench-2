import type { ReactNode } from 'react';

export type DataBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataBadgeSize = 'sm' | 'md' | 'lg';

export interface DataBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataBadgeTone;
  size?: DataBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataBadgeTone;
}

export interface DataBadgeGroupProps {
  items: ReadonlyArray<DataBadgeItem>;
  title?: string;
  size?: DataBadgeSize;
  testId?: string;
  onSelect?: (item: DataBadgeItem) => void;
}
