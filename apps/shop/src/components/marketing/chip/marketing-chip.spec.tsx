import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingChip } from './marketing-chip';
import { MarketingChipGroup } from './marketing-chip-group';
import {
  MARKETING_CHIP_TONES,
  isMarketingChipTone,
  toneFromValue,
} from './marketing-chip-variants';

describe('MarketingChip', () => {
  it('renders the label', () => {
    render(<MarketingChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingChip label="Parent">
        <span>child content</span>
      </MarketingChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingChipGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-marketing-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingChipGroup items={[]} />);
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
    for (const tone of MARKETING_CHIP_TONES) {
      expect(isMarketingChipTone(tone)).toBe(true);
    }
    expect(isMarketingChipTone('bogus')).toBe(false);
  });
});
