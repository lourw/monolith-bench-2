import type { ReactNode } from 'react';

export type OverlayHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayHeaderSize = 'sm' | 'md' | 'lg';

export interface OverlayHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayHeaderTone;
  size?: OverlayHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayHeaderTone;
}

export interface OverlayHeaderGroupProps {
  items: ReadonlyArray<OverlayHeaderItem>;
  title?: string;
  size?: OverlayHeaderSize;
  testId?: string;
  onSelect?: (item: OverlayHeaderItem) => void;
}
