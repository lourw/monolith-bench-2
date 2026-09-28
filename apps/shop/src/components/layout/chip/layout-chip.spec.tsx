import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutChip } from './layout-chip';
import { LayoutChipGroup } from './layout-chip-group';
import {
  LAYOUT_CHIP_TONES,
  isLayoutChipTone,
  toneFromValue,
} from './layout-chip-variants';

describe('LayoutChip', () => {
  it('renders the label', () => {
    render(<LayoutChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<LayoutChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutChip label="Parent">
        <span>child content</span>
      </LayoutChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutChipGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutChipGroup items={[]} />);
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
    for (const tone of LAYOUT_CHIP_TONES) {
      expect(isLayoutChipTone(tone)).toBe(true);
    }
    expect(isLayoutChipTone('bogus')).toBe(false);
  });
});
