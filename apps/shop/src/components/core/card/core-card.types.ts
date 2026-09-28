import type { ReactNode } from 'react';

export type CoreCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CoreCardSize = 'sm' | 'md' | 'lg';

export interface CoreCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CoreCardTone;
  size?: CoreCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CoreCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CoreCardTone;
}

export interface CoreCardGroupProps {
  items: ReadonlyArray<CoreCardItem>;
  title?: string;
  size?: CoreCardSize;
  testId?: string;
  onSelect?: (item: CoreCardItem) => void;
}
