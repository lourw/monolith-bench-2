import type { ReactNode } from 'react';

export type DataBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataBannerSize = 'sm' | 'md' | 'lg';

export interface DataBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataBannerTone;
  size?: DataBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataBannerTone;
}

export interface DataBannerGroupProps {
  items: ReadonlyArray<DataBannerItem>;
  title?: string;
  size?: DataBannerSize;
  testId?: string;
  onSelect?: (item: DataBannerItem) => void;
}
