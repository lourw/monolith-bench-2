import type { ReactNode } from 'react';

export type LayoutTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutTileSize = 'sm' | 'md' | 'lg';

export interface LayoutTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutTileTone;
  size?: LayoutTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutTileTone;
}

export interface LayoutTileGroupProps {
  items: ReadonlyArray<LayoutTileItem>;
  title?: string;
  size?: LayoutTileSize;
  testId?: string;
  onSelect?: (item: LayoutTileItem) => void;
}
