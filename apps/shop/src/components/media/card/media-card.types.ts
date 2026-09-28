import type { ReactNode } from 'react';

export type MediaCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaCardSize = 'sm' | 'md' | 'lg';

export interface MediaCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaCardTone;
  size?: MediaCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaCardTone;
}

export interface MediaCardGroupProps {
  items: ReadonlyArray<MediaCardItem>;
  title?: string;
  size?: MediaCardSize;
  testId?: string;
  onSelect?: (item: MediaCardItem) => void;
}
