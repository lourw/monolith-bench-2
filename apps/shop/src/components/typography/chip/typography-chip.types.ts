import type { ReactNode } from 'react';

export type TypographyChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyChipSize = 'sm' | 'md' | 'lg';

export interface TypographyChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyChipTone;
  size?: TypographyChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyChipTone;
}

export interface TypographyChipGroupProps {
  items: ReadonlyArray<TypographyChipItem>;
  title?: string;
  size?: TypographyChipSize;
  testId?: string;
  onSelect?: (item: TypographyChipItem) => void;
}
