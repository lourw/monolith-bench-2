import type { ReactNode } from 'react';

export type MarketingPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingPanelSize = 'sm' | 'md' | 'lg';

export interface MarketingPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingPanelTone;
  size?: MarketingPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingPanelTone;
}

export interface MarketingPanelGroupProps {
  items: ReadonlyArray<MarketingPanelItem>;
  title?: string;
  size?: MarketingPanelSize;
  testId?: string;
  onSelect?: (item: MarketingPanelItem) => void;
}
