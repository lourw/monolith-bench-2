import type { ReactNode } from 'react';

export type NavigationToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationToolbarSize = 'sm' | 'md' | 'lg';

export interface NavigationToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationToolbarTone;
  size?: NavigationToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationToolbarTone;
}

export interface NavigationToolbarGroupProps {
  items: ReadonlyArray<NavigationToolbarItem>;
  title?: string;
  size?: NavigationToolbarSize;
  testId?: string;
  onSelect?: (item: NavigationToolbarItem) => void;
}
