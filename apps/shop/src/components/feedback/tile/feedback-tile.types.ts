import type { ReactNode } from 'react';

export type FeedbackTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackTileSize = 'sm' | 'md' | 'lg';

export interface FeedbackTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackTileTone;
  size?: FeedbackTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackTileTone;
}

export interface FeedbackTileGroupProps {
  items: ReadonlyArray<FeedbackTileItem>;
  title?: string;
  size?: FeedbackTileSize;
  testId?: string;
  onSelect?: (item: FeedbackTileItem) => void;
}
