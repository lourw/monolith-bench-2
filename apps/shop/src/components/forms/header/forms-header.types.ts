import type { ReactNode } from 'react';

export type FormsHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsHeaderSize = 'sm' | 'md' | 'lg';

export interface FormsHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsHeaderTone;
  size?: FormsHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsHeaderTone;
}

export interface FormsHeaderGroupProps {
  items: ReadonlyArray<FormsHeaderItem>;
  title?: string;
  size?: FormsHeaderSize;
  testId?: string;
  onSelect?: (item: FormsHeaderItem) => void;
}
