import type { ReactNode } from 'react';

export type LayoutPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type LayoutPanelSize = 'sm' | 'md' | 'lg';

export interface LayoutPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: LayoutPanelTone;
  size?: LayoutPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface LayoutPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: LayoutPanelTone;
}

export interface LayoutPanelGroupProps {
  items: ReadonlyArray<LayoutPanelItem>;
  title?: string;
  size?: LayoutPanelSize;
  testId?: string;
  onSelect?: (item: LayoutPanelItem) => void;
}
