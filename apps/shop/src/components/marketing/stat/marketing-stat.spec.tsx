import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingStat } from './marketing-stat';
import { MarketingStatGroup } from './marketing-stat-group';
import {
  MARKETING_STAT_TONES,
  isMarketingStatTone,
  toneFromValue,
} from './marketing-stat-variants';

describe('MarketingStat', () => {
  it('renders the label', () => {
    render(<MarketingStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingStat label="Parent">
        <span>child content</span>
      </MarketingStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingStatGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-marketing-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingStatGroup items={[]} />);
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
    for (const tone of MARKETING_STAT_TONES) {
      expect(isMarketingStatTone(tone)).toBe(true);
    }
    expect(isMarketingStatTone('bogus')).toBe(false);
  });
});
