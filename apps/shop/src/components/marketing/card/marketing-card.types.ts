import type { ReactNode } from 'react';

export type MarketingCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingCardSize = 'sm' | 'md' | 'lg';

export interface MarketingCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingCardTone;
  size?: MarketingCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingCardTone;
}

export interface MarketingCardGroupProps {
  items: ReadonlyArray<MarketingCardItem>;
  title?: string;
  size?: MarketingCardSize;
  testId?: string;
  onSelect?: (item: MarketingCardItem) => void;
}
