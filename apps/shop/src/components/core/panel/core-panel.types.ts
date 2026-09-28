import type { ReactNode } from 'react';

export type CorePanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CorePanelSize = 'sm' | 'md' | 'lg';

export interface CorePanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CorePanelTone;
  size?: CorePanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CorePanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CorePanelTone;
}

export interface CorePanelGroupProps {
  items: ReadonlyArray<CorePanelItem>;
  title?: string;
  size?: CorePanelSize;
  testId?: string;
  onSelect?: (item: CorePanelItem) => void;
}
