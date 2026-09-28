import type { ReactNode } from 'react';

export type MarketingListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingListSize = 'sm' | 'md' | 'lg';

export interface MarketingListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingListTone;
  size?: MarketingListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingListTone;
}

export interface MarketingListGroupProps {
  items: ReadonlyArray<MarketingListItem>;
  title?: string;
  size?: MarketingListSize;
  testId?: string;
  onSelect?: (item: MarketingListItem) => void;
}
