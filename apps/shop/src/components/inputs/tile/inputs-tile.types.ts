import type { ReactNode } from 'react';

export type InputsTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsTileSize = 'sm' | 'md' | 'lg';

export interface InputsTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsTileTone;
  size?: InputsTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsTileTone;
}

export interface InputsTileGroupProps {
  items: ReadonlyArray<InputsTileItem>;
  title?: string;
  size?: InputsTileSize;
  testId?: string;
  onSelect?: (item: InputsTileItem) => void;
}
