import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyChip } from './typography-chip';
import { TypographyChipGroup } from './typography-chip-group';
import {
  TYPOGRAPHY_CHIP_TONES,
  isTypographyChipTone,
  toneFromValue,
} from './typography-chip-variants';

describe('TypographyChip', () => {
  it('renders the label', () => {
    render(<TypographyChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyChip label="Parent">
        <span>child content</span>
      </TypographyChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyChipGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-chip-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyChipGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_CHIP_TONES) {
      expect(isTypographyChipTone(tone)).toBe(true);
    }
    expect(isTypographyChipTone('bogus')).toBe(false);
  });
});
