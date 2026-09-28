import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataBanner } from './data-banner';
import { DataBannerGroup } from './data-banner-group';
import {
  DATA_BANNER_TONES,
  isDataBannerTone,
  toneFromValue,
} from './data-banner-variants';

describe('DataBanner', () => {
  it('renders the label', () => {
    render(<DataBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataBanner label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataBanner label="Parent">
        <span>child content</span>
      </DataBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataBannerGroup', () => {
  it('renders every item', () => {
    render(
      <DataBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataBannerGroup items={[]} />);
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
    for (const tone of DATA_BANNER_TONES) {
      expect(isDataBannerTone(tone)).toBe(true);
    }
    expect(isDataBannerTone('bogus')).toBe(false);
  });
});
