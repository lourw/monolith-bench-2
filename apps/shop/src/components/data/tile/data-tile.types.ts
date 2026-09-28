import type { ReactNode } from 'react';

export type DataTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataTileSize = 'sm' | 'md' | 'lg';

export interface DataTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataTileTone;
  size?: DataTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataTileTone;
}

export interface DataTileGroupProps {
  items: ReadonlyArray<DataTileItem>;
  title?: string;
  size?: DataTileSize;
  testId?: string;
  onSelect?: (item: DataTileItem) => void;
}
