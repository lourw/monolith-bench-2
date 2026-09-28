import type { ReactNode } from 'react';

export type ChartsHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsHeaderSize = 'sm' | 'md' | 'lg';

export interface ChartsHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsHeaderTone;
  size?: ChartsHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsHeaderTone;
}

export interface ChartsHeaderGroupProps {
  items: ReadonlyArray<ChartsHeaderItem>;
  title?: string;
  size?: ChartsHeaderSize;
  testId?: string;
  onSelect?: (item: ChartsHeaderItem) => void;
}
