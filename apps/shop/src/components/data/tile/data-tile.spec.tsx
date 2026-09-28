import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTile } from './data-tile';
import { DataTileGroup } from './data-tile-group';
import {
  DATA_TILE_TONES,
  isDataTileTone,
  toneFromValue,
} from './data-tile-variants';

describe('DataTile', () => {
  it('renders the label', () => {
    render(<DataTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataTile label="Parent">
        <span>child content</span>
      </DataTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataTileGroup', () => {
  it('renders every item', () => {
    render(
      <DataTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataTileGroup items={[]} />);
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
    for (const tone of DATA_TILE_TONES) {
      expect(isDataTileTone(tone)).toBe(true);
    }
    expect(isDataTileTone('bogus')).toBe(false);
  });
});
