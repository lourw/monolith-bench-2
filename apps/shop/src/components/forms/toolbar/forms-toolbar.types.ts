import type { ReactNode } from 'react';

export type FormsToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsToolbarSize = 'sm' | 'md' | 'lg';

export interface FormsToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsToolbarTone;
  size?: FormsToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsToolbarTone;
}

export interface FormsToolbarGroupProps {
  items: ReadonlyArray<FormsToolbarItem>;
  title?: string;
  size?: FormsToolbarSize;
  testId?: string;
  onSelect?: (item: FormsToolbarItem) => void;
}
