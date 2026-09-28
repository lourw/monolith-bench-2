import type { ReactNode } from 'react';

export type CommercePanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommercePanelSize = 'sm' | 'md' | 'lg';

export interface CommercePanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommercePanelTone;
  size?: CommercePanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommercePanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommercePanelTone;
}

export interface CommercePanelGroupProps {
  items: ReadonlyArray<CommercePanelItem>;
  title?: string;
  size?: CommercePanelSize;
  testId?: string;
  onSelect?: (item: CommercePanelItem) => void;
}
