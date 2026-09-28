import type { ReactNode } from 'react';

export type TypographyBadgeTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyBadgeSize = 'sm' | 'md' | 'lg';

export interface TypographyBadgeProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyBadgeTone;
  size?: TypographyBadgeSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyBadgeItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyBadgeTone;
}

export interface TypographyBadgeGroupProps {
  items: ReadonlyArray<TypographyBadgeItem>;
  title?: string;
  size?: TypographyBadgeSize;
  testId?: string;
  onSelect?: (item: TypographyBadgeItem) => void;
}
