import type { ReactNode } from 'react';

export type FormsPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsPanelSize = 'sm' | 'md' | 'lg';

export interface FormsPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsPanelTone;
  size?: FormsPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsPanelTone;
}

export interface FormsPanelGroupProps {
  items: ReadonlyArray<FormsPanelItem>;
  title?: string;
  size?: FormsPanelSize;
  testId?: string;
  onSelect?: (item: FormsPanelItem) => void;
}
