import type { ReactNode } from 'react';

export type FeedbackChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackChipSize = 'sm' | 'md' | 'lg';

export interface FeedbackChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackChipTone;
  size?: FeedbackChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackChipTone;
}

export interface FeedbackChipGroupProps {
  items: ReadonlyArray<FeedbackChipItem>;
  title?: string;
  size?: FeedbackChipSize;
  testId?: string;
  onSelect?: (item: FeedbackChipItem) => void;
}
