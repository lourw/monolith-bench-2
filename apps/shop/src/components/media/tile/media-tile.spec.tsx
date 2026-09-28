import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaTile } from './media-tile';
import { MediaTileGroup } from './media-tile-group';
import {
  MEDIA_TILE_TONES,
  isMediaTileTone,
  toneFromValue,
} from './media-tile-variants';

describe('MediaTile', () => {
  it('renders the label', () => {
    render(<MediaTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaTile label="Parent">
        <span>child content</span>
      </MediaTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaTileGroup', () => {
  it('renders every item', () => {
    render(
      <MediaTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaTileGroup items={[]} />);
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
    for (const tone of MEDIA_TILE_TONES) {
      expect(isMediaTileTone(tone)).toBe(true);
    }
    expect(isMediaTileTone('bogus')).toBe(false);
  });
});
