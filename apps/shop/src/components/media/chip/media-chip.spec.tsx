import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaChip } from './media-chip';
import { MediaChipGroup } from './media-chip-group';
import {
  MEDIA_CHIP_TONES,
  isMediaChipTone,
  toneFromValue,
} from './media-chip-variants';

describe('MediaChip', () => {
  it('renders the label', () => {
    render(<MediaChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaChip label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaChip label="Parent">
        <span>child content</span>
      </MediaChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaChipGroup', () => {
  it('renders every item', () => {
    render(
      <MediaChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaChipGroup items={[]} />);
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
    for (const tone of MEDIA_CHIP_TONES) {
      expect(isMediaChipTone(tone)).toBe(true);
    }
    expect(isMediaChipTone('bogus')).toBe(false);
  });
});
