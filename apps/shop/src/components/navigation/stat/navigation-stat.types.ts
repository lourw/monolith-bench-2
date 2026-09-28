import type { ReactNode } from 'react';

export type NavigationStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationStatSize = 'sm' | 'md' | 'lg';

export interface NavigationStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationStatTone;
  size?: NavigationStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationStatTone;
}

export interface NavigationStatGroupProps {
  items: ReadonlyArray<NavigationStatItem>;
  title?: string;
  size?: NavigationStatSize;
  testId?: string;
  onSelect?: (item: NavigationStatItem) => void;
}
