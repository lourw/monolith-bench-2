import type { ReactNode } from 'react';

export type MediaBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaBannerSize = 'sm' | 'md' | 'lg';

export interface MediaBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaBannerTone;
  size?: MediaBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaBannerTone;
}

export interface MediaBannerGroupProps {
  items: ReadonlyArray<MediaBannerItem>;
  title?: string;
  size?: MediaBannerSize;
  testId?: string;
  onSelect?: (item: MediaBannerItem) => void;
}
