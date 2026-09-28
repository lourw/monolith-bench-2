import type { ReactNode } from 'react';

export type OverlayBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayBadgeSize = 'sm' | 'md' | 'lg';

export interface OverlayBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayBadgeTone;
  size?: OverlayBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayBadgeTone;
}

export interface OverlayBadgeGroupProps {
  items: ReadonlyArray<OverlayBadgeItem>;
  title?: string;
  size?: OverlayBadgeSize;
  testId?: string;
  onSelect?: (item: OverlayBadgeItem) => void;
}
