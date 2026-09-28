import type { ReactNode } from 'react';

export type InputsBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsBadgeSize = 'sm' | 'md' | 'lg';

export interface InputsBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsBadgeTone;
  size?: InputsBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsBadgeTone;
}

export interface InputsBadgeGroupProps {
  items: ReadonlyArray<InputsBadgeItem>;
  title?: string;
  size?: InputsBadgeSize;
  testId?: string;
  onSelect?: (item: InputsBadgeItem) => void;
}
