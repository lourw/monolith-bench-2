import type { ReactNode } from 'react';

export type MediaListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaListSize = 'sm' | 'md' | 'lg';

export interface MediaListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaListTone;
  size?: MediaListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaListTone;
}

export interface MediaListGroupProps {
  items: ReadonlyArray<MediaListItem>;
  title?: string;
  size?: MediaListSize;
  testId?: string;
  onSelect?: (item: MediaListItem) => void;
}
