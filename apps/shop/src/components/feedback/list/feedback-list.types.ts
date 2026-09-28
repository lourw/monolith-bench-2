import type { ReactNode } from 'react';

export type FeedbackListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackListSize = 'sm' | 'md' | 'lg';

export interface FeedbackListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackListTone;
  size?: FeedbackListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackListTone;
}

export interface FeedbackListGroupProps {
  items: ReadonlyArray<FeedbackListItem>;
  title?: string;
  size?: FeedbackListSize;
  testId?: string;
  onSelect?: (item: FeedbackListItem) => void;
}
