import type { ReactNode } from 'react';

export type FeedbackToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackToolbarSize = 'sm' | 'md' | 'lg';

export interface FeedbackToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackToolbarTone;
  size?: FeedbackToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackToolbarTone;
}

export interface FeedbackToolbarGroupProps {
  items: ReadonlyArray<FeedbackToolbarItem>;
  title?: string;
  size?: FeedbackToolbarSize;
  testId?: string;
  onSelect?: (item: FeedbackToolbarItem) => void;
}
