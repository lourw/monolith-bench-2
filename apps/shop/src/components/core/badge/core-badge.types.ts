import type { ReactNode } from 'react';

export type CoreBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreBadgeSize = 'sm' | 'md' | 'lg';

export interface CoreBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreBadgeTone;
  size?: CoreBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreBadgeTone;
}

export interface CoreBadgeGroupProps {
  items: ReadonlyArray<CoreBadgeItem>;
  title?: string;
  size?: CoreBadgeSize;
  testId?: string;
  onSelect?: (item: CoreBadgeItem) => void;
}
