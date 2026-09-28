import type { ReactNode } from 'react';

export type FormsBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsBadgeSize = 'sm' | 'md' | 'lg';

export interface FormsBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsBadgeTone;
  size?: FormsBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsBadgeTone;
}

export interface FormsBadgeGroupProps {
  items: ReadonlyArray<FormsBadgeItem>;
  title?: string;
  size?: FormsBadgeSize;
  testId?: string;
  onSelect?: (item: FormsBadgeItem) => void;
}
