import type { ReactNode } from 'react';

export type TypographyCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyCardSize = 'sm' | 'md' | 'lg';

export interface TypographyCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyCardTone;
  size?: TypographyCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyCardTone;
}

export interface TypographyCardGroupProps {
  items: ReadonlyArray<TypographyCardItem>;
  title?: string;
  size?: TypographyCardSize;
  testId?: string;
  onSelect?: (item: TypographyCardItem) => void;
}
