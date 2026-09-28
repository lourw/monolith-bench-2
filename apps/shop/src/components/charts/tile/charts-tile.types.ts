import type { ReactNode } from 'react';

export type ChartsTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsTileSize = 'sm' | 'md' | 'lg';

export interface ChartsTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsTileTone;
  size?: ChartsTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsTileTone;
}

export interface ChartsTileGroupProps {
  items: ReadonlyArray<ChartsTileItem>;
  title?: string;
  size?: ChartsTileSize;
  testId?: string;
  onSelect?: (item: ChartsTileItem) => void;
}
