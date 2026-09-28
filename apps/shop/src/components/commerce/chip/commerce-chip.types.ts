import type { ReactNode } from 'react';

export type CommerceChipTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceChipSize = 'sm' | 'md' | 'lg';

export interface CommerceChipProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceChipTone;
  size?: CommerceChipSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceChipItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceChipTone;
}

export interface CommerceChipGroupProps {
  items: ReadonlyArray<CommerceChipItem>;
  title?: string;
  size?: CommerceChipSize;
  testId?: string;
  onSelect?: (item: CommerceChipItem) => void;
}
