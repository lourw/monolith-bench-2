import type { ReactNode } from 'react';

export type DataHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataHeaderSize = 'sm' | 'md' | 'lg';

export interface DataHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataHeaderTone;
  size?: DataHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataHeaderTone;
}

export interface DataHeaderGroupProps {
  items: ReadonlyArray<DataHeaderItem>;
  title?: string;
  size?: DataHeaderSize;
  testId?: string;
  onSelect?: (item: DataHeaderItem) => void;
}
