import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutTile } from './layout-tile';
import { LayoutTileGroup } from './layout-tile-group';
import {
  LAYOUT_TILE_TONES,
  isLayoutTileTone,
  toneFromValue,
} from './layout-tile-variants';

describe('LayoutTile', () => {
  it('renders the label', () => {
    render(<LayoutTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<LayoutTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutTile label="Parent">
        <span>child content</span>
      </LayoutTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutTileGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutTileGroup items={[]} />);
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
    for (const tone of LAYOUT_TILE_TONES) {
      expect(isLayoutTileTone(tone)).toBe(true);
    }
    expect(isLayoutTileTone('bogus')).toBe(false);
  });
});
