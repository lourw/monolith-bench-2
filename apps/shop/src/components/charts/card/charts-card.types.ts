import type { ReactNode } from 'react';

export type ChartsCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsCardSize = 'sm' | 'md' | 'lg';

export interface ChartsCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsCardTone;
  size?: ChartsCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsCardTone;
}

export interface ChartsCardGroupProps {
  items: ReadonlyArray<ChartsCardItem>;
  title?: string;
  size?: ChartsCardSize;
  testId?: string;
  onSelect?: (item: ChartsCardItem) => void;
}
