import type { ReactNode } from 'react';

export type DataListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataListSize = 'sm' | 'md' | 'lg';

export interface DataListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataListTone;
  size?: DataListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataListTone;
}

export interface DataListGroupProps {
  items: ReadonlyArray<DataListItem>;
  title?: string;
  size?: DataListSize;
  testId?: string;
  onSelect?: (item: DataListItem) => void;
}
