import type { ReactNode } from 'react';

export type MediaBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaBadgeSize = 'sm' | 'md' | 'lg';

export interface MediaBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaBadgeTone;
  size?: MediaBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaBadgeTone;
}

export interface MediaBadgeGroupProps {
  items: ReadonlyArray<MediaBadgeItem>;
  title?: string;
  size?: MediaBadgeSize;
  testId?: string;
  onSelect?: (item: MediaBadgeItem) => void;
}
