import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsChip } from './inputs-chip';
import { InputsChipGroup } from './inputs-chip-group';
import {
  INPUTS_CHIP_TONES,
  isInputsChipTone,
  toneFromValue,
} from './inputs-chip-variants';

describe('InputsChip', () => {
  it('renders the label', () => {
    render(<InputsChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<InputsChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsChip label="Parent">
        <span>child content</span>
      </InputsChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsChipGroup', () => {
  it('renders every item', () => {
    render(
      <InputsChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsChipGroup items={[]} />);
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
    for (const tone of INPUTS_CHIP_TONES) {
      expect(isInputsChipTone(tone)).toBe(true);
    }
    expect(isInputsChipTone('bogus')).toBe(false);
  });
});
