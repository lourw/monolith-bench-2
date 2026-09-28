import type { ReactNode } from 'react';

export type MediaHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaHeaderSize = 'sm' | 'md' | 'lg';

export interface MediaHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaHeaderTone;
  size?: MediaHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaHeaderTone;
}

export interface MediaHeaderGroupProps {
  items: ReadonlyArray<MediaHeaderItem>;
  title?: string;
  size?: MediaHeaderSize;
  testId?: string;
  onSelect?: (item: MediaHeaderItem) => void;
}
