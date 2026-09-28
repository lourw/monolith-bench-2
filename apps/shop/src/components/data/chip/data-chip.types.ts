import type { ReactNode } from 'react';

export type DataChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataChipSize = 'sm' | 'md' | 'lg';

export interface DataChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataChipTone;
  size?: DataChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataChipTone;
}

export interface DataChipGroupProps {
  items: ReadonlyArray<DataChipItem>;
  title?: string;
  size?: DataChipSize;
  testId?: string;
  onSelect?: (item: DataChipItem) => void;
}
