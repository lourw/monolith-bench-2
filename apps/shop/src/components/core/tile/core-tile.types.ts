import type { ReactNode } from 'react';

export type CoreTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreTileSize = 'sm' | 'md' | 'lg';

export interface CoreTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreTileTone;
  size?: CoreTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreTileTone;
}

export interface CoreTileGroupProps {
  items: ReadonlyArray<CoreTileItem>;
  title?: string;
  size?: CoreTileSize;
  testId?: string;
  onSelect?: (item: CoreTileItem) => void;
}
