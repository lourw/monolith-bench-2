import type { ReactNode } from 'react';

export type CoreBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreBannerSize = 'sm' | 'md' | 'lg';

export interface CoreBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreBannerTone;
  size?: CoreBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreBannerTone;
}

export interface CoreBannerGroupProps {
  items: ReadonlyArray<CoreBannerItem>;
  title?: string;
  size?: CoreBannerSize;
  testId?: string;
  onSelect?: (item: CoreBannerItem) => void;
}
