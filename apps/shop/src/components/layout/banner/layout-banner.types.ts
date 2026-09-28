import type { ReactNode } from 'react';

export type LayoutBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutBannerSize = 'sm' | 'md' | 'lg';

export interface LayoutBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutBannerTone;
  size?: LayoutBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutBannerTone;
}

export interface LayoutBannerGroupProps {
  items: ReadonlyArray<LayoutBannerItem>;
  title?: string;
  size?: LayoutBannerSize;
  testId?: string;
  onSelect?: (item: LayoutBannerItem) => void;
}
