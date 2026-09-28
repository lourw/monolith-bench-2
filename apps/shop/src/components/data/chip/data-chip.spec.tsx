import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataChip } from './data-chip';
import { DataChipGroup } from './data-chip-group';
import {
  DATA_CHIP_TONES,
  isDataChipTone,
  toneFromValue,
} from './data-chip-variants';

describe('DataChip', () => {
  it('renders the label', () => {
    render(<DataChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataChip label="Parent">
        <span>child content</span>
      </DataChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataChipGroup', () => {
  it('renders every item', () => {
    render(
      <DataChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataChipGroup items={[]} />);
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
    for (const tone of DATA_CHIP_TONES) {
      expect(isDataChipTone(tone)).toBe(true);
    }
    expect(isDataChipTone('bogus')).toBe(false);
  });
});
