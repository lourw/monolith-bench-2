import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayBanner } from './overlay-banner';
import { OverlayBannerGroup } from './overlay-banner-group';
import {
  OVERLAY_BANNER_TONES,
  isOverlayBannerTone,
  toneFromValue,
} from './overlay-banner-variants';

describe('OverlayBanner', () => {
  it('renders the label', () => {
    render(<OverlayBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayBanner label="Parent">
        <span>child content</span>
      </OverlayBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayBannerGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayBannerGroup items={[]} />);
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
    for (const tone of OVERLAY_BANNER_TONES) {
      expect(isOverlayBannerTone(tone)).toBe(true);
    }
    expect(isOverlayBannerTone('bogus')).toBe(false);
  });
});
