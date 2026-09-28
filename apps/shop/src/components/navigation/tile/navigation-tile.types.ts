import type { ReactNode } from 'react';

export type NavigationTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type NavigationTileSize = 'sm' | 'md' | 'lg';

export interface NavigationTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: NavigationTileTone;
  size?: NavigationTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface NavigationTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: NavigationTileTone;
}

export interface NavigationTileGroupProps {
  items: ReadonlyArray<NavigationTileItem>;
  title?: string;
  size?: NavigationTileSize;
  testId?: string;
  onSelect?: (item: NavigationTileItem) => void;
}
