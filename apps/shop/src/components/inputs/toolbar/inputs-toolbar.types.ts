import type { ReactNode } from 'react';

export type InputsToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsToolbarSize = 'sm' | 'md' | 'lg';

export interface InputsToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsToolbarTone;
  size?: InputsToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsToolbarTone;
}

export interface InputsToolbarGroupProps {
  items: ReadonlyArray<InputsToolbarItem>;
  title?: string;
  size?: InputsToolbarSize;
  testId?: string;
  onSelect?: (item: InputsToolbarItem) => void;
}
