import type { ReactNode } from 'react';

export type FeedbackHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackHeaderSize = 'sm' | 'md' | 'lg';

export interface FeedbackHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackHeaderTone;
  size?: FeedbackHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackHeaderTone;
}

export interface FeedbackHeaderGroupProps {
  items: ReadonlyArray<FeedbackHeaderItem>;
  title?: string;
  size?: FeedbackHeaderSize;
  testId?: string;
  onSelect?: (item: FeedbackHeaderItem) => void;
}
