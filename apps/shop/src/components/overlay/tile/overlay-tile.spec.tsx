import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayTile } from './overlay-tile';
import { OverlayTileGroup } from './overlay-tile-group';
import {
  OVERLAY_TILE_TONES,
  isOverlayTileTone,
  toneFromValue,
} from './overlay-tile-variants';

describe('OverlayTile', () => {
  it('renders the label', () => {
    render(<OverlayTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayTile label="Parent">
        <span>child content</span>
      </OverlayTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayTileGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayTileGroup items={[]} />);
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
    for (const tone of OVERLAY_TILE_TONES) {
      expect(isOverlayTileTone(tone)).toBe(true);
    }
    expect(isOverlayTileTone('bogus')).toBe(false);
  });
});
