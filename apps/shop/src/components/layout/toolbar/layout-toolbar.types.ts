import type { ReactNode } from 'react';

export type LayoutToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutToolbarSize = 'sm' | 'md' | 'lg';

export interface LayoutToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutToolbarTone;
  size?: LayoutToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutToolbarTone;
}

export interface LayoutToolbarGroupProps {
  items: ReadonlyArray<LayoutToolbarItem>;
  title?: string;
  size?: LayoutToolbarSize;
  testId?: string;
  onSelect?: (item: LayoutToolbarItem) => void;
}
