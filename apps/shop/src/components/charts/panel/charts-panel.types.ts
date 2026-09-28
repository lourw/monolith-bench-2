import type { ReactNode } from 'react';

export type ChartsPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type ChartsPanelSize = 'sm' | 'md' | 'lg';

export interface ChartsPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: ChartsPanelTone;
  size?: ChartsPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface ChartsPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: ChartsPanelTone;
}

export interface ChartsPanelGroupProps {
  items: ReadonlyArray<ChartsPanelItem>;
  title?: string;
  size?: ChartsPanelSize;
  testId?: string;
  onSelect?: (item: ChartsPanelItem) => void;
}
