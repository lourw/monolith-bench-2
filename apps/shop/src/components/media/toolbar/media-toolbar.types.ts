import type { ReactNode } from 'react';

export type MediaToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaToolbarSize = 'sm' | 'md' | 'lg';

export interface MediaToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaToolbarTone;
  size?: MediaToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaToolbarTone;
}

export interface MediaToolbarGroupProps {
  items: ReadonlyArray<MediaToolbarItem>;
  title?: string;
  size?: MediaToolbarSize;
  testId?: string;
  onSelect?: (item: MediaToolbarItem) => void;
}
