import type { ReactNode } from 'react';

export type NavigationHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationHeaderSize = 'sm' | 'md' | 'lg';

export interface NavigationHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationHeaderTone;
  size?: NavigationHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationHeaderTone;
}

export interface NavigationHeaderGroupProps {
  items: ReadonlyArray<NavigationHeaderItem>;
  title?: string;
  size?: NavigationHeaderSize;
  testId?: string;
  onSelect?: (item: NavigationHeaderItem) => void;
}
