import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayChip } from './overlay-chip';
import { OverlayChipGroup } from './overlay-chip-group';
import {
  OVERLAY_CHIP_TONES,
  isOverlayChipTone,
  toneFromValue,
} from './overlay-chip-variants';

describe('OverlayChip', () => {
  it('renders the label', () => {
    render(<OverlayChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayChip label="Parent">
        <span>child content</span>
      </OverlayChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayChipGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayChipGroup items={[]} />);
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
    for (const tone of OVERLAY_CHIP_TONES) {
      expect(isOverlayChipTone(tone)).toBe(true);
    }
    expect(isOverlayChipTone('bogus')).toBe(false);
  });
});
