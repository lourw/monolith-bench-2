import type { ReactNode } from 'react';

export type OverlayListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayListSize = 'sm' | 'md' | 'lg';

export interface OverlayListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayListTone;
  size?: OverlayListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayListTone;
}

export interface OverlayListGroupProps {
  items: ReadonlyArray<OverlayListItem>;
  title?: string;
  size?: OverlayListSize;
  testId?: string;
  onSelect?: (item: OverlayListItem) => void;
}
