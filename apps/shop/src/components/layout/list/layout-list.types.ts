import type { ReactNode } from 'react';

export type LayoutListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutListSize = 'sm' | 'md' | 'lg';

export interface LayoutListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutListTone;
  size?: LayoutListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutListTone;
}

export interface LayoutListGroupProps {
  items: ReadonlyArray<LayoutListItem>;
  title?: string;
  size?: LayoutListSize;
  testId?: string;
  onSelect?: (item: LayoutListItem) => void;
}
