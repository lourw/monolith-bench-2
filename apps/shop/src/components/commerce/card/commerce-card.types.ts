import type { ReactNode } from 'react';

export type CommerceCardTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type CommerceCardSize = 'sm' | 'md' | 'lg';

export interface CommerceCardProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: CommerceCardTone;
  size?: CommerceCardSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface CommerceCardItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: CommerceCardTone;
}

export interface CommerceCardGroupProps {
  items: ReadonlyArray<CommerceCardItem>;
  title?: string;
  size?: CommerceCardSize;
  testId?: string;
  onSelect?: (item: CommerceCardItem) => void;
}
