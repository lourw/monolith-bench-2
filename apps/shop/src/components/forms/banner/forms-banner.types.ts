import type { ReactNode } from 'react';

export type FormsBannerTone =
  'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type FormsBannerSize = 'sm' | 'md' | 'lg';

export interface FormsBannerProps {
  /** Visible label. */
  label: string;
  /** Optional raw value; it is formatted before rendering. */
  value?: string | number;
  tone?: FormsBannerTone;
  size?: FormsBannerSize;
  /** data-testid applied to the root element. */
  testId?: string;
  onSelect?: (label: string) => void;
  children?: ReactNode;
}

export interface FormsBannerItem {
  id: string;
  label: string;
  value?: string | number;
  tone?: FormsBannerTone;
}

export interface FormsBannerGroupProps {
  items: ReadonlyArray<FormsBannerItem>;
  title?: string;
  size?: FormsBannerSize;
  testId?: string;
  onSelect?: (item: FormsBannerItem) => void;
}
