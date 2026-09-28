import type { ReactNode } from 'react';

export type InputsListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsListSize = 'sm' | 'md' | 'lg';

export interface InputsListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsListTone;
  size?: InputsListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsListTone;
}

export interface InputsListGroupProps {
  items: ReadonlyArray<InputsListItem>;
  title?: string;
  size?: InputsListSize;
  testId?: string;
  onSelect?: (item: InputsListItem) => void;
}
