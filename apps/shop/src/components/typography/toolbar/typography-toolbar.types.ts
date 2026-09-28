import type { ReactNode } from 'react';

export type TypographyToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyToolbarSize = 'sm' | 'md' | 'lg';

export interface TypographyToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyToolbarTone;
  size?: TypographyToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyToolbarTone;
}

export interface TypographyToolbarGroupProps {
  items: ReadonlyArray<TypographyToolbarItem>;
  title?: string;
  size?: TypographyToolbarSize;
  testId?: string;
  onSelect?: (item: TypographyToolbarItem) => void;
}
