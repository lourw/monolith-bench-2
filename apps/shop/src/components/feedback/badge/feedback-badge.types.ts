import type { ReactNode } from 'react';

export type FeedbackBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackBadgeSize = 'sm' | 'md' | 'lg';

export interface FeedbackBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackBadgeTone;
  size?: FeedbackBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackBadgeTone;
}

export interface FeedbackBadgeGroupProps {
  items: ReadonlyArray<FeedbackBadgeItem>;
  title?: string;
  size?: FeedbackBadgeSize;
  testId?: string;
  onSelect?: (item: FeedbackBadgeItem) => void;
}
