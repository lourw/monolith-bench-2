import type { ReactNode } from 'react';

export type FeedbackPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FeedbackPanelSize = 'sm' | 'md' | 'lg';

export interface FeedbackPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FeedbackPanelTone;
  size?: FeedbackPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FeedbackPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FeedbackPanelTone;
}

export interface FeedbackPanelGroupProps {
  items: ReadonlyArray<FeedbackPanelItem>;
  title?: string;
  size?: FeedbackPanelSize;
  testId?: string;
  onSelect?: (item: FeedbackPanelItem) => void;
}
