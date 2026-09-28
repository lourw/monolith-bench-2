import type { ReactNode } from 'react';

export type TypographyHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyHeaderSize = 'sm' | 'md' | 'lg';

export interface TypographyHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyHeaderTone;
  size?: TypographyHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyHeaderTone;
}

export interface TypographyHeaderGroupProps {
  items: ReadonlyArray<TypographyHeaderItem>;
  title?: string;
  size?: TypographyHeaderSize;
  testId?: string;
  onSelect?: (item: TypographyHeaderItem) => void;
}
