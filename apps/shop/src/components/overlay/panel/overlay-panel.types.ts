import type { ReactNode } from 'react';

export type OverlayPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayPanelSize = 'sm' | 'md' | 'lg';

export interface OverlayPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayPanelTone;
  size?: OverlayPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayPanelTone;
}

export interface OverlayPanelGroupProps {
  items: ReadonlyArray<OverlayPanelItem>;
  title?: string;
  size?: OverlayPanelSize;
  testId?: string;
  onSelect?: (item: OverlayPanelItem) => void;
}
