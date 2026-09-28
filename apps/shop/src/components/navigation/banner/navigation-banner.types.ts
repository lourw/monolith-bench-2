import type { ReactNode } from 'react';

export type NavigationBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationBannerSize = 'sm' | 'md' | 'lg';

export interface NavigationBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationBannerTone;
  size?: NavigationBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationBannerTone;
}

export interface NavigationBannerGroupProps {
  items: ReadonlyArray<NavigationBannerItem>;
  title?: string;
  size?: NavigationBannerSize;
  testId?: string;
  onSelect?: (item: NavigationBannerItem) => void;
}
