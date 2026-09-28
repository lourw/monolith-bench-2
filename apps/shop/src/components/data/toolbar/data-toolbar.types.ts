import type { ReactNode } from 'react';

export type DataToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataToolbarSize = 'sm' | 'md' | 'lg';

export interface DataToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataToolbarTone;
  size?: DataToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataToolbarTone;
}

export interface DataToolbarGroupProps {
  items: ReadonlyArray<DataToolbarItem>;
  title?: string;
  size?: DataToolbarSize;
  testId?: string;
  onSelect?: (item: DataToolbarItem) => void;
}
