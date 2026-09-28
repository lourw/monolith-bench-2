import type { ReactNode } from 'react';

export type OverlayToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayToolbarSize = 'sm' | 'md' | 'lg';

export interface OverlayToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayToolbarTone;
  size?: OverlayToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayToolbarTone;
}

export interface OverlayToolbarGroupProps {
  items: ReadonlyArray<OverlayToolbarItem>;
  title?: string;
  size?: OverlayToolbarSize;
  testId?: string;
  onSelect?: (item: OverlayToolbarItem) => void;
}
