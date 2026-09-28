import type { ReactNode } from 'react';

export type MarketingStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingStatSize = 'sm' | 'md' | 'lg';

export interface MarketingStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingStatTone;
  size?: MarketingStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingStatTone;
}

export interface MarketingStatGroupProps {
  items: ReadonlyArray<MarketingStatItem>;
  title?: string;
  size?: MarketingStatSize;
  testId?: string;
  onSelect?: (item: MarketingStatItem) => void;
}
