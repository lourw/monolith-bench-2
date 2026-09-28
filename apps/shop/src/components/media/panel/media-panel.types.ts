import type { ReactNode } from 'react';

export type MediaPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type MediaPanelSize = 'sm' | 'md' | 'lg';

export interface MediaPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: MediaPanelTone;
  size?: MediaPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface MediaPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: MediaPanelTone;
}

export interface MediaPanelGroupProps {
  items: ReadonlyArray<MediaPanelItem>;
  title?: string;
  size?: MediaPanelSize;
  testId?: string;
  onSelect?: (item: MediaPanelItem) => void;
}
