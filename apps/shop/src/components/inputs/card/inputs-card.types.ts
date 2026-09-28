import type { ReactNode } from 'react';

export type InputsCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type InputsCardSize = 'sm' | 'md' | 'lg';

export interface InputsCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: InputsCardTone;
  size?: InputsCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface InputsCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: InputsCardTone;
}

export interface InputsCardGroupProps {
  items: ReadonlyArray<InputsCardItem>;
  title?: string;
  size?: InputsCardSize;
  testId?: string;
  onSelect?: (item: InputsCardItem) => void;
}
