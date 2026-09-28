import type { ReactNode } from 'react';

export type CoreListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreListSize = 'sm' | 'md' | 'lg';

export interface CoreListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreListTone;
  size?: CoreListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreListTone;
}

export interface CoreListGroupProps {
  items: ReadonlyArray<CoreListItem>;
  title?: string;
  size?: CoreListSize;
  testId?: string;
  onSelect?: (item: CoreListItem) => void;
}
