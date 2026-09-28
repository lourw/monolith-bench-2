import type { ReactNode } from 'react';

export type OverlayBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayBannerSize = 'sm' | 'md' | 'lg';

export interface OverlayBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayBannerTone;
  size?: OverlayBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayBannerTone;
}

export interface OverlayBannerGroupProps {
  items: ReadonlyArray<OverlayBannerItem>;
  title?: string;
  size?: OverlayBannerSize;
  testId?: string;
  onSelect?: (item: OverlayBannerItem) => void;
}
