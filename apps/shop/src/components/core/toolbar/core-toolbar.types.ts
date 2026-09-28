import type { ReactNode } from 'react';

export type CoreToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreToolbarSize = 'sm' | 'md' | 'lg';

export interface CoreToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreToolbarTone;
  size?: CoreToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreToolbarTone;
}

export interface CoreToolbarGroupProps {
  items: ReadonlyArray<CoreToolbarItem>;
  title?: string;
  size?: CoreToolbarSize;
  testId?: string;
  onSelect?: (item: CoreToolbarItem) => void;
}
