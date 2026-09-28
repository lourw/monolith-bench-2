import type { ReactNode } from 'react';

export type MarketingToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingToolbarSize = 'sm' | 'md' | 'lg';

export interface MarketingToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingToolbarTone;
  size?: MarketingToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingToolbarTone;
}

export interface MarketingToolbarGroupProps {
  items: ReadonlyArray<MarketingToolbarItem>;
  title?: string;
  size?: MarketingToolbarSize;
  testId?: string;
  onSelect?: (item: MarketingToolbarItem) => void;
}
