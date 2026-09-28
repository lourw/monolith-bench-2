import type { ReactNode } from 'react';

export type OverlayTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayTileSize = 'sm' | 'md' | 'lg';

export interface OverlayTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayTileTone;
  size?: OverlayTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayTileTone;
}

export interface OverlayTileGroupProps {
  items: ReadonlyArray<OverlayTileItem>;
  title?: string;
  size?: OverlayTileSize;
  testId?: string;
  onSelect?: (item: OverlayTileItem) => void;
}
