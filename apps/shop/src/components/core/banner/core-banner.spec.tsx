import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreBanner } from './core-banner';
import { CoreBannerGroup } from './core-banner-group';
import {
  CORE_BANNER_TONES,
  isCoreBannerTone,
  toneFromValue,
} from './core-banner-variants';

describe('CoreBanner', () => {
  it('renders the label', () => {
    render(<CoreBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreBanner label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreBanner label="Parent">
        <span>child content</span>
      </CoreBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreBannerGroup', () => {
  it('renders every item', () => {
    render(
      <CoreBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreBannerGroup items={[]} />);
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
    for (const tone of CORE_BANNER_TONES) {
      expect(isCoreBannerTone(tone)).toBe(true);
    }
    expect(isCoreBannerTone('bogus')).toBe(false);
  });
});
