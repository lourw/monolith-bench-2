import type { ReactNode } from 'react';

export type TypographyTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyTileSize = 'sm' | 'md' | 'lg';

export interface TypographyTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyTileTone;
  size?: TypographyTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyTileTone;
}

export interface TypographyTileGroupProps {
  items: ReadonlyArray<TypographyTileItem>;
  title?: string;
  size?: TypographyTileSize;
  testId?: string;
  onSelect?: (item: TypographyTileItem) => void;
}
