import type { ReactNode } from 'react';

export type MarketingBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingBannerSize = 'sm' | 'md' | 'lg';

export interface MarketingBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingBannerTone;
  size?: MarketingBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingBannerTone;
}

export interface MarketingBannerGroupProps {
  items: ReadonlyArray<MarketingBannerItem>;
  title?: string;
  size?: MarketingBannerSize;
  testId?: string;
  onSelect?: (item: MarketingBannerItem) => void;
}
