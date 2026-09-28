import type { ReactNode } from 'react';

export type FormsTileTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsTileSize = 'sm' | 'md' | 'lg';

export interface FormsTileProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsTileTone;
  size?: FormsTileSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsTileItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsTileTone;
}

export interface FormsTileGroupProps {
  items: ReadonlyArray<FormsTileItem>;
  title?: string;
  size?: FormsTileSize;
  testId?: string;
  onSelect?: (item: FormsTileItem) => void;
}
