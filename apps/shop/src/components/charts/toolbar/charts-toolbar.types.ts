import type { ReactNode } from 'react';

export type ChartsToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsToolbarSize = 'sm' | 'md' | 'lg';

export interface ChartsToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsToolbarTone;
  size?: ChartsToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsToolbarTone;
}

export interface ChartsToolbarGroupProps {
  items: ReadonlyArray<ChartsToolbarItem>;
  title?: string;
  size?: ChartsToolbarSize;
  testId?: string;
  onSelect?: (item: ChartsToolbarItem) => void;
}
