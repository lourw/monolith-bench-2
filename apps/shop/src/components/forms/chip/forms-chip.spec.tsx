import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsChip } from './forms-chip';
import { FormsChipGroup } from './forms-chip-group';
import {
  FORMS_CHIP_TONES,
  isFormsChipTone,
  toneFromValue,
} from './forms-chip-variants';

describe('FormsChip', () => {
  it('renders the label', () => {
    render(<FormsChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsChip label="Parent">
        <span>child content</span>
      </FormsChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsChipGroup', () => {
  it('renders every item', () => {
    render(
      <FormsChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsChipGroup items={[]} />);
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
    for (const tone of FORMS_CHIP_TONES) {
      expect(isFormsChipTone(tone)).toBe(true);
    }
    expect(isFormsChipTone('bogus')).toBe(false);
  });
});
