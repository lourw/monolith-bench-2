import type { ReactNode } from 'react';

export type NavigationListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationListSize = 'sm' | 'md' | 'lg';

export interface NavigationListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationListTone;
  size?: NavigationListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationListTone;
}

export interface NavigationListGroupProps {
  items: ReadonlyArray<NavigationListItem>;
  title?: string;
  size?: NavigationListSize;
  testId?: string;
  onSelect?: (item: NavigationListItem) => void;
}
