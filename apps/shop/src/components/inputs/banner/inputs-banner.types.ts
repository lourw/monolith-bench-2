import type { ReactNode } from 'react';

export type InputsBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsBannerSize = 'sm' | 'md' | 'lg';

export interface InputsBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsBannerTone;
  size?: InputsBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsBannerTone;
}

export interface InputsBannerGroupProps {
  items: ReadonlyArray<InputsBannerItem>;
  title?: string;
  size?: InputsBannerSize;
  testId?: string;
  onSelect?: (item: InputsBannerItem) => void;
}
