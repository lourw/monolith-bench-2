import type { ReactNode } from 'react';

export type NavigationPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationPanelSize = 'sm' | 'md' | 'lg';

export interface NavigationPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationPanelTone;
  size?: NavigationPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationPanelTone;
}

export interface NavigationPanelGroupProps {
  items: ReadonlyArray<NavigationPanelItem>;
  title?: string;
  size?: NavigationPanelSize;
  testId?: string;
  onSelect?: (item: NavigationPanelItem) => void;
}
