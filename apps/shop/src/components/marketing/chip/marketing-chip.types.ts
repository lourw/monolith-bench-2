import type { ReactNode } from 'react';

export type MarketingChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingChipSize = 'sm' | 'md' | 'lg';

export interface MarketingChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingChipTone;
  size?: MarketingChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingChipTone;
}

export interface MarketingChipGroupProps {
  items: ReadonlyArray<MarketingChipItem>;
  title?: string;
  size?: MarketingChipSize;
  testId?: string;
  onSelect?: (item: MarketingChipItem) => void;
}
