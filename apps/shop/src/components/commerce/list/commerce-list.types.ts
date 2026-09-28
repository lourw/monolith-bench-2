import type { ReactNode } from 'react';

export type CommerceListTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceListSize = 'sm' | 'md' | 'lg';

export interface CommerceListProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceListTone;
  size?: CommerceListSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceListItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceListTone;
}

export interface CommerceListGroupProps {
  items: ReadonlyArray<CommerceListItem>;
  title?: string;
  size?: CommerceListSize;
  testId?: string;
  onSelect?: (item: CommerceListItem) => void;
}
