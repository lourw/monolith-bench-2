import type { ReactNode } from 'react';

export type MarketingTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MarketingTileSize = 'sm' | 'md' | 'lg';

export interface MarketingTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MarketingTileTone;
  size?: MarketingTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MarketingTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MarketingTileTone;
}

export interface MarketingTileGroupProps {
  items: ReadonlyArray<MarketingTileItem>;
  title?: string;
  size?: MarketingTileSize;
  testId?: string;
  onSelect?: (item: MarketingTileItem) => void;
}
