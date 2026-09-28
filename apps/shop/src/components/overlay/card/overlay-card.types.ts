import type { ReactNode } from 'react';

export type OverlayCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayCardSize = 'sm' | 'md' | 'lg';

export interface OverlayCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayCardTone;
  size?: OverlayCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayCardTone;
}

export interface OverlayCardGroupProps {
  items: ReadonlyArray<OverlayCardItem>;
  title?: string;
  size?: OverlayCardSize;
  testId?: string;
  onSelect?: (item: OverlayCardItem) => void;
}
