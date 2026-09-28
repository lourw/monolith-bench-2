import type { ReactNode } from 'react';

export type CommerceHeaderTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceHeaderSize = 'sm' | 'md' | 'lg';

export interface CommerceHeaderProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceHeaderTone;
  size?: CommerceHeaderSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceHeaderItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceHeaderTone;
}

export interface CommerceHeaderGroupProps {
  items: ReadonlyArray<CommerceHeaderItem>;
  title?: string;
  size?: CommerceHeaderSize;
  testId?: string;
  onSelect?: (item: CommerceHeaderItem) => void;
}
