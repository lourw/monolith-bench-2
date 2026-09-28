import type { ReactNode } from 'react';

export type MarketingBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingBadgeSize = 'sm' | 'md' | 'lg';

export interface MarketingBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingBadgeTone;
  size?: MarketingBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingBadgeTone;
}

export interface MarketingBadgeGroupProps {
  items: ReadonlyArray<MarketingBadgeItem>;
  title?: string;
  size?: MarketingBadgeSize;
  testId?: string;
  onSelect?: (item: MarketingBadgeItem) => void;
}
