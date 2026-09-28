import type { ReactNode } from 'react';

export type MarketingHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingHeaderSize = 'sm' | 'md' | 'lg';

export interface MarketingHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingHeaderTone;
  size?: MarketingHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingHeaderTone;
}

export interface MarketingHeaderGroupProps {
  items: ReadonlyArray<MarketingHeaderItem>;
  title?: string;
  size?: MarketingHeaderSize;
  testId?: string;
  onSelect?: (item: MarketingHeaderItem) => void;
}
