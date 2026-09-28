import type { ReactNode } from 'react';

export type FeedbackStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackStatSize = 'sm' | 'md' | 'lg';

export interface FeedbackStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackStatTone;
  size?: FeedbackStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackStatTone;
}

export interface FeedbackStatGroupProps {
  items: ReadonlyArray<FeedbackStatItem>;
  title?: string;
  size?: FeedbackStatSize;
  testId?: string;
  onSelect?: (item: FeedbackStatItem) => void;
}
