import type { ReactNode } from 'react';

export type InputsChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsChipSize = 'sm' | 'md' | 'lg';

export interface InputsChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsChipTone;
  size?: InputsChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsChipTone;
}

export interface InputsChipGroupProps {
  items: ReadonlyArray<InputsChipItem>;
  title?: string;
  size?: InputsChipSize;
  testId?: string;
  onSelect?: (item: InputsChipItem) => void;
}
