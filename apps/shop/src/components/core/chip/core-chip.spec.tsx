import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreChip } from './core-chip';
import { CoreChipGroup } from './core-chip-group';
import {
  CORE_CHIP_TONES,
  isCoreChipTone,
  toneFromValue,
} from './core-chip-variants';

describe('CoreChip', () => {
  it('renders the label', () => {
    render(<CoreChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreChip label="Parent">
        <span>child content</span>
      </CoreChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreChipGroup', () => {
  it('renders every item', () => {
    render(
      <CoreChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreChipGroup items={[]} />);
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
    for (const tone of CORE_CHIP_TONES) {
      expect(isCoreChipTone(tone)).toBe(true);
    }
    expect(isCoreChipTone('bogus')).toBe(false);
  });
});
