import type { ReactNode } from 'react';

export type InputsHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsHeaderSize = 'sm' | 'md' | 'lg';

export interface InputsHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsHeaderTone;
  size?: InputsHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsHeaderTone;
}

export interface InputsHeaderGroupProps {
  items: ReadonlyArray<InputsHeaderItem>;
  title?: string;
  size?: InputsHeaderSize;
  testId?: string;
  onSelect?: (item: InputsHeaderItem) => void;
}
