import type { ReactNode } from 'react';

export type OverlayStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayStatSize = 'sm' | 'md' | 'lg';

export interface OverlayStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayStatTone;
  size?: OverlayStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayStatTone;
}

export interface OverlayStatGroupProps {
  items: ReadonlyArray<OverlayStatItem>;
  title?: string;
  size?: OverlayStatSize;
  testId?: string;
  onSelect?: (item: OverlayStatItem) => void;
}
