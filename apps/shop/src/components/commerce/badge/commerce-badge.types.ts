import type { ReactNode } from 'react';

export type CommerceBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceBadgeSize = 'sm' | 'md' | 'lg';

export interface CommerceBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceBadgeTone;
  size?: CommerceBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceBadgeTone;
}

export interface CommerceBadgeGroupProps {
  items: ReadonlyArray<CommerceBadgeItem>;
  title?: string;
  size?: CommerceBadgeSize;
  testId?: string;
  onSelect?: (item: CommerceBadgeItem) => void;
}
