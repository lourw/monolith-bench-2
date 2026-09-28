import type { ReactNode } from 'react';

export type MediaStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaStatSize = 'sm' | 'md' | 'lg';

export interface MediaStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaStatTone;
  size?: MediaStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaStatTone;
}

export interface MediaStatGroupProps {
  items: ReadonlyArray<MediaStatItem>;
  title?: string;
  size?: MediaStatSize;
  testId?: string;
  onSelect?: (item: MediaStatItem) => void;
}
