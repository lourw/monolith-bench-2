import type { ReactNode } from 'react';

export type TypographyStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyStatSize = 'sm' | 'md' | 'lg';

export interface TypographyStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyStatTone;
  size?: TypographyStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyStatTone;
}

export interface TypographyStatGroupProps {
  items: ReadonlyArray<TypographyStatItem>;
  title?: string;
  size?: TypographyStatSize;
  testId?: string;
  onSelect?: (item: TypographyStatItem) => void;
}
