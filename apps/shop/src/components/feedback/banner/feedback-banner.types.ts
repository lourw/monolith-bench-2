import type { ReactNode } from 'react';

export type FeedbackBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackBannerSize = 'sm' | 'md' | 'lg';

export interface FeedbackBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackBannerTone;
  size?: FeedbackBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackBannerTone;
}

export interface FeedbackBannerGroupProps {
  items: ReadonlyArray<FeedbackBannerItem>;
  title?: string;
  size?: FeedbackBannerSize;
  testId?: string;
  onSelect?: (item: FeedbackBannerItem) => void;
}
