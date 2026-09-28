import type { ReactNode } from 'react';

export type NavigationCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationCardSize = 'sm' | 'md' | 'lg';

export interface NavigationCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationCardTone;
  size?: NavigationCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationCardTone;
}

export interface NavigationCardGroupProps {
  items: ReadonlyArray<NavigationCardItem>;
  title?: string;
  size?: NavigationCardSize;
  testId?: string;
  onSelect?: (item: NavigationCardItem) => void;
}
