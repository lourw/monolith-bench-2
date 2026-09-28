import type { ReactNode } from 'react';

export type OverlayChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type OverlayChipSize = 'sm' | 'md' | 'lg';

export interface OverlayChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: OverlayChipTone;
  size?: OverlayChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface OverlayChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: OverlayChipTone;
}

export interface OverlayChipGroupProps {
  items: ReadonlyArray<OverlayChipItem>;
  title?: string;
  size?: OverlayChipSize;
  testId?: string;
  onSelect?: (item: OverlayChipItem) => void;
}
