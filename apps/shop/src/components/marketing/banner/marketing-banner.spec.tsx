import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingBanner } from './marketing-banner';
import { MarketingBannerGroup } from './marketing-banner-group';
import {
  MARKETING_BANNER_TONES,
  isMarketingBannerTone,
  toneFromValue,
} from './marketing-banner-variants';

describe('MarketingBanner', () => {
  it('renders the label', () => {
    render(<MarketingBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingBanner label="Parent">
        <span>child content</span>
      </MarketingBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingBannerGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-marketing-banner-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingBannerGroup items={[]} />);
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
    for (const tone of MARKETING_BANNER_TONES) {
      expect(isMarketingBannerTone(tone)).toBe(true);
    }
    expect(isMarketingBannerTone('bogus')).toBe(false);
  });
});
