import type { ReactNode } from 'react';

export type InputsPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsPanelSize = 'sm' | 'md' | 'lg';

export interface InputsPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsPanelTone;
  size?: InputsPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsPanelTone;
}

export interface InputsPanelGroupProps {
  items: ReadonlyArray<InputsPanelItem>;
  title?: string;
  size?: InputsPanelSize;
  testId?: string;
  onSelect?: (item: InputsPanelItem) => void;
}
