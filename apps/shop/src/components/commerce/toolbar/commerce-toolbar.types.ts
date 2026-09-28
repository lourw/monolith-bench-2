import type { ReactNode } from 'react';

export type CommerceToolbarTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceToolbarSize = 'sm' | 'md' | 'lg';

export interface CommerceToolbarProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceToolbarTone;
  size?: CommerceToolbarSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceToolbarItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceToolbarTone;
}

export interface CommerceToolbarGroupProps {
  items: ReadonlyArray<CommerceToolbarItem>;
  title?: string;
  size?: CommerceToolbarSize;
  testId?: string;
  onSelect?: (item: CommerceToolbarItem) => void;
}
