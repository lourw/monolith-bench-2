import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutBanner } from './layout-banner';
import { LayoutBannerGroup } from './layout-banner-group';
import {
  LAYOUT_BANNER_TONES,
  isLayoutBannerTone,
  toneFromValue,
} from './layout-banner-variants';

describe('LayoutBanner', () => {
  it('renders the label', () => {
    render(<LayoutBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <LayoutBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutBanner label="Parent">
        <span>child content</span>
      </LayoutBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutBannerGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutBannerGroup items={[]} />);
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });
});

describe('variants', () => {
  it('derives tones from values', () => {
    expect(toneFromValue(undefined)).toBe('neutral');
    expect(toneFromValue(0)).toBe('warning');
    expect(toneFromValue(5)).toBe('success');
    expect(toneFromValue('abc')).toBe('info');
  });

  it('validates tones', () => {
    for (const tone of LAYOUT_BANNER_TONES) {
      expect(isLayoutBannerTone(tone)).toBe(true);
    }
    expect(isLayoutBannerTone('bogus')).toBe(false);
  });
});
