import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaBanner } from './media-banner';
import { MediaBannerGroup } from './media-banner-group';
import {
  MEDIA_BANNER_TONES,
  isMediaBannerTone,
  toneFromValue,
} from './media-banner-variants';

describe('MediaBanner', () => {
  it('renders the label', () => {
    render(<MediaBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MediaBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaBanner label="Parent">
        <span>child content</span>
      </MediaBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaBannerGroup', () => {
  it('renders every item', () => {
    render(
      <MediaBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaBannerGroup items={[]} />);
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
    for (const tone of MEDIA_BANNER_TONES) {
      expect(isMediaBannerTone(tone)).toBe(true);
    }
    expect(isMediaBannerTone('bogus')).toBe(false);
  });
});
