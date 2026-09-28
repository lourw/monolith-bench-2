import type { ReactNode } from 'react';

export type CommerceBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceBannerSize = 'sm' | 'md' | 'lg';

export interface CommerceBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceBannerTone;
  size?: CommerceBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceBannerTone;
}

export interface CommerceBannerGroupProps {
  items: ReadonlyArray<CommerceBannerItem>;
  title?: string;
  size?: CommerceBannerSize;
  testId?: string;
  onSelect?: (item: CommerceBannerItem) => void;
}
