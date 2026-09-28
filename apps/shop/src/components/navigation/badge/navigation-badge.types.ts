import type { ReactNode } from 'react';

export type NavigationBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationBadgeSize = 'sm' | 'md' | 'lg';

export interface NavigationBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationBadgeTone;
  size?: NavigationBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationBadgeTone;
}

export interface NavigationBadgeGroupProps {
  items: ReadonlyArray<NavigationBadgeItem>;
  title?: string;
  size?: NavigationBadgeSize;
  testId?: string;
  onSelect?: (item: NavigationBadgeItem) => void;
}
