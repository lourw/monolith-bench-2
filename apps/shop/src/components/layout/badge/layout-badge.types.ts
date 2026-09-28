import type { ReactNode } from 'react';

export type LayoutBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutBadgeSize = 'sm' | 'md' | 'lg';

export interface LayoutBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutBadgeTone;
  size?: LayoutBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutBadgeTone;
}

export interface LayoutBadgeGroupProps {
  items: ReadonlyArray<LayoutBadgeItem>;
  title?: string;
  size?: LayoutBadgeSize;
  testId?: string;
  onSelect?: (item: LayoutBadgeItem) => void;
}
