import type { ReactNode } from 'react';

export type FormsCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsCardSize = 'sm' | 'md' | 'lg';

export interface FormsCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsCardTone;
  size?: FormsCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsCardTone;
}

export interface FormsCardGroupProps {
  items: ReadonlyArray<FormsCardItem>;
  title?: string;
  size?: FormsCardSize;
  testId?: string;
  onSelect?: (item: FormsCardItem) => void;
}
