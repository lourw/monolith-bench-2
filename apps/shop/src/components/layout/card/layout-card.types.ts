import type { ReactNode } from 'react';

export type LayoutCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutCardSize = 'sm' | 'md' | 'lg';

export interface LayoutCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutCardTone;
  size?: LayoutCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutCardTone;
}

export interface LayoutCardGroupProps {
  items: ReadonlyArray<LayoutCardItem>;
  title?: string;
  size?: LayoutCardSize;
  testId?: string;
  onSelect?: (item: LayoutCardItem) => void;
}
