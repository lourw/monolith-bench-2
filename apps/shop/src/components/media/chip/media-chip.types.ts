import type { ReactNode } from 'react';

export type MediaChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaChipSize = 'sm' | 'md' | 'lg';

export interface MediaChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaChipTone;
  size?: MediaChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaChipTone;
}

export interface MediaChipGroupProps {
  items: ReadonlyArray<MediaChipItem>;
  title?: string;
  size?: MediaChipSize;
  testId?: string;
  onSelect?: (item: MediaChipItem) => void;
}
