import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyBanner } from './typography-banner';
import { TypographyBannerGroup } from './typography-banner-group';
import {
  TYPOGRAPHY_BANNER_TONES,
  isTypographyBannerTone,
  toneFromValue,
} from './typography-banner-variants';

describe('TypographyBanner', () => {
  it('renders the label', () => {
    render(<TypographyBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyBanner label="Parent">
        <span>child content</span>
      </TypographyBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyBannerGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-banner-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyBannerGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_BANNER_TONES) {
      expect(isTypographyBannerTone(tone)).toBe(true);
    }
    expect(isTypographyBannerTone('bogus')).toBe(false);
  });
});
