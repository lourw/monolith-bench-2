import type { ReactNode } from 'react';

export type TypographyListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyListSize = 'sm' | 'md' | 'lg';

export interface TypographyListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyListTone;
  size?: TypographyListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyListTone;
}

export interface TypographyListGroupProps {
  items: ReadonlyArray<TypographyListItem>;
  title?: string;
  size?: TypographyListSize;
  testId?: string;
  onSelect?: (item: TypographyListItem) => void;
}
