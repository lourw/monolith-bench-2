import type { ReactNode } from 'react';

export type CoreHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreHeaderSize = 'sm' | 'md' | 'lg';

export interface CoreHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreHeaderTone;
  size?: CoreHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreHeaderTone;
}

export interface CoreHeaderGroupProps {
  items: ReadonlyArray<CoreHeaderItem>;
  title?: string;
  size?: CoreHeaderSize;
  testId?: string;
  onSelect?: (item: CoreHeaderItem) => void;
}
