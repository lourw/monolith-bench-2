import type { ReactNode } from 'react';

export type FormsStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsStatSize = 'sm' | 'md' | 'lg';

export interface FormsStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsStatTone;
  size?: FormsStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsStatTone;
}

export interface FormsStatGroupProps {
  items: ReadonlyArray<FormsStatItem>;
  title?: string;
  size?: FormsStatSize;
  testId?: string;
  onSelect?: (item: FormsStatItem) => void;
}
