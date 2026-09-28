import type { ReactNode } from 'react';

export type CommerceTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceTileSize = 'sm' | 'md' | 'lg';

export interface CommerceTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceTileTone;
  size?: CommerceTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceTileTone;
}

export interface CommerceTileGroupProps {
  items: ReadonlyArray<CommerceTileItem>;
  title?: string;
  size?: CommerceTileSize;
  testId?: string;
  onSelect?: (item: CommerceTileItem) => void;
}
