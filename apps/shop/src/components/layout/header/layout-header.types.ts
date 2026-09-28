import type { ReactNode } from 'react';

export type LayoutHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutHeaderSize = 'sm' | 'md' | 'lg';

export interface LayoutHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutHeaderTone;
  size?: LayoutHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutHeaderTone;
}

export interface LayoutHeaderGroupProps {
  items: ReadonlyArray<LayoutHeaderItem>;
  title?: string;
  size?: LayoutHeaderSize;
  testId?: string;
  onSelect?: (item: LayoutHeaderItem) => void;
}
