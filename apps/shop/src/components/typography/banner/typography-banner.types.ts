import type { ReactNode } from 'react';

export type TypographyBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyBannerSize = 'sm' | 'md' | 'lg';

export interface TypographyBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyBannerTone;
  size?: TypographyBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyBannerTone;
}

export interface TypographyBannerGroupProps {
  items: ReadonlyArray<TypographyBannerItem>;
  title?: string;
  size?: TypographyBannerSize;
  testId?: string;
  onSelect?: (item: TypographyBannerItem) => void;
}
