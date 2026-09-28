import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceBanner } from './commerce-banner';
import { CommerceBannerGroup } from './commerce-banner-group';
import {
  COMMERCE_BANNER_TONES,
  isCommerceBannerTone,
  toneFromValue,
} from './commerce-banner-variants';

describe('CommerceBanner', () => {
  it('renders the label', () => {
    render(<CommerceBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceBanner label="Parent">
        <span>child content</span>
      </CommerceBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceBannerGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-commerce-banner-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceBannerGroup items={[]} />);
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
    for (const tone of COMMERCE_BANNER_TONES) {
      expect(isCommerceBannerTone(tone)).toBe(true);
    }
    expect(isCommerceBannerTone('bogus')).toBe(false);
  });
});
