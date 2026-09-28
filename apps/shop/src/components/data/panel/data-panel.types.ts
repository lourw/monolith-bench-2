import type { ReactNode } from 'react';

export type DataPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type DataPanelSize = 'sm' | 'md' | 'lg';

export interface DataPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: DataPanelTone;
  size?: DataPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface DataPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: DataPanelTone;
}

export interface DataPanelGroupProps {
  items: ReadonlyArray<DataPanelItem>;
  title?: string;
  size?: DataPanelSize;
  testId?: string;
  onSelect?: (item: DataPanelItem) => void;
}
