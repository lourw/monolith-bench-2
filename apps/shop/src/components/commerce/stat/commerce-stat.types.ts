import type { ReactNode } from 'react';

export type CommerceStatTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceStatSize = 'sm' | 'md' | 'lg';

export interface CommerceStatProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceStatTone;
  size?: CommerceStatSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceStatItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceStatTone;
}

export interface CommerceStatGroupProps {
  items: ReadonlyArray<CommerceStatItem>;
  title?: string;
  size?: CommerceStatSize;
  testId?: string;
  onSelect?: (item: CommerceStatItem) => void;
}
