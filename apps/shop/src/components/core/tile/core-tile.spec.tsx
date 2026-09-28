import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreTile } from './core-tile';
import { CoreTileGroup } from './core-tile-group';
import {
  CORE_TILE_TONES,
  isCoreTileTone,
  toneFromValue,
} from './core-tile-variants';

describe('CoreTile', () => {
  it('renders the label', () => {
    render(<CoreTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreTile label="Parent">
        <span>child content</span>
      </CoreTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreTileGroup', () => {
  it('renders every item', () => {
    render(
      <CoreTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreTileGroup items={[]} />);
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
    for (const tone of CORE_TILE_TONES) {
      expect(isCoreTileTone(tone)).toBe(true);
    }
    expect(isCoreTileTone('bogus')).toBe(false);
  });
});
