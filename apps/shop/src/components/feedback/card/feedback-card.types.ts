import type { ReactNode } from 'react';

export type FeedbackCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackCardSize = 'sm' | 'md' | 'lg';

export interface FeedbackCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackCardTone;
  size?: FeedbackCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackCardTone;
}

export interface FeedbackCardGroupProps {
  items: ReadonlyArray<FeedbackCardItem>;
  title?: string;
  size?: FeedbackCardSize;
  testId?: string;
  onSelect?: (item: FeedbackCardItem) => void;
}
