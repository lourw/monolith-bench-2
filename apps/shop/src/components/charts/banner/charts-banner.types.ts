import type { ReactNode } from 'react';

export type ChartsBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsBannerSize = 'sm' | 'md' | 'lg';

export interface ChartsBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsBannerTone;
  size?: ChartsBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsBannerTone;
}

export interface ChartsBannerGroupProps {
  items: ReadonlyArray<ChartsBannerItem>;
  title?: string;
  size?: ChartsBannerSize;
  testId?: string;
  onSelect?: (item: ChartsBannerItem) => void;
}
