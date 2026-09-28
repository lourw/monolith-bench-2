import type { ReactNode } from 'react';

export type FormsListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsListSize = 'sm' | 'md' | 'lg';

export interface FormsListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsListTone;
  size?: FormsListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsListTone;
}

export interface FormsListGroupProps {
  items: ReadonlyArray<FormsListItem>;
  title?: string;
  size?: FormsListSize;
  testId?: string;
  onSelect?: (item: FormsListItem) => void;
}
