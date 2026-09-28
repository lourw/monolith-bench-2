import type { ReactNode } from 'react';

export type InputsStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsStatSize = 'sm' | 'md' | 'lg';

export interface InputsStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsStatTone;
  size?: InputsStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsStatTone;
}

export interface InputsStatGroupProps {
  items: ReadonlyArray<InputsStatItem>;
  title?: string;
  size?: InputsStatSize;
  testId?: string;
  onSelect?: (item: InputsStatItem) => void;
}
