import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceChip } from './commerce-chip';
import { CommerceChipGroup } from './commerce-chip-group';
import {
  COMMERCE_CHIP_TONES,
  isCommerceChipTone,
  toneFromValue,
} from './commerce-chip-variants';

describe('CommerceChip', () => {
  it('renders the label', () => {
    render(<CommerceChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceChip label="Parent">
        <span>child content</span>
      </CommerceChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceChipGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceChipGroup items={[]} />);
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
    for (const tone of COMMERCE_CHIP_TONES) {
      expect(isCommerceChipTone(tone)).toBe(true);
    }
    expect(isCommerceChipTone('bogus')).toBe(false);
  });
});
