import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingHeader } from './marketing-header';
import { MarketingHeaderGroup } from './marketing-header-group';
import {
  MARKETING_HEADER_TONES,
  isMarketingHeaderTone,
  toneFromValue,
} from './marketing-header-variants';

describe('MarketingHeader', () => {
  it('renders the label', () => {
    render(<MarketingHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingHeader label="Parent">
        <span>child content</span>
      </MarketingHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-marketing-header-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingHeaderGroup items={[]} />);
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
    for (const tone of MARKETING_HEADER_TONES) {
      expect(isMarketingHeaderTone(tone)).toBe(true);
    }
    expect(isMarketingHeaderTone('bogus')).toBe(false);
  });
});
