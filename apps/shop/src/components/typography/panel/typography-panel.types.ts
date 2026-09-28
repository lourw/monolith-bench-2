import type { ReactNode } from 'react';

export type TypographyPanelTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type TypographyPanelSize = 'sm' | 'md' | 'lg';

export interface TypographyPanelProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: TypographyPanelTone;
  size?: TypographyPanelSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface TypographyPanelItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: TypographyPanelTone;
}

export interface TypographyPanelGroupProps {
  items: ReadonlyArray<TypographyPanelItem>;
  title?: string;
  size?: TypographyPanelSize;
  testId?: string;
  onSelect?: (item: TypographyPanelItem) => void;
}
