import type { ReactNode } from 'react';

export type NavigationChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationChipSize = 'sm' | 'md' | 'lg';

export interface NavigationChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationChipTone;
  size?: NavigationChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationChipTone;
}

export interface NavigationChipGroupProps {
  items: ReadonlyArray<NavigationChipItem>;
  title?: string;
  size?: NavigationChipSize;
  testId?: string;
  onSelect?: (item: NavigationChipItem) => void;
}
