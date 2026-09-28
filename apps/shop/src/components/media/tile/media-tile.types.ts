import type { ReactNode } from 'react';

export type MediaTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaTileSize = 'sm' | 'md' | 'lg';

export interface MediaTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaTileTone;
  size?: MediaTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaTileTone;
}

export interface MediaTileGroupProps {
  items: ReadonlyArray<MediaTileItem>;
  title?: string;
  size?: MediaTileSize;
  testId?: string;
  onSelect?: (item: MediaTileItem) => void;
}
