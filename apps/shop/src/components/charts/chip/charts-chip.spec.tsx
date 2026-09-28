import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsChip } from './charts-chip';
import { ChartsChipGroup } from './charts-chip-group';
import {
  CHARTS_CHIP_TONES,
  isChartsChipTone,
  toneFromValue,
} from './charts-chip-variants';

describe('ChartsChip', () => {
  it('renders the label', () => {
    render(<ChartsChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<ChartsChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsChip label="Parent">
        <span>child content</span>
      </ChartsChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsChipGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsChipGroup items={[]} />);
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
    for (const tone of CHARTS_CHIP_TONES) {
      expect(isChartsChipTone(tone)).toBe(true);
    }
    expect(isChartsChipTone('bogus')).toBe(false);
  });
});
