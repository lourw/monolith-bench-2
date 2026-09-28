import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationTile } from './navigation-tile';
import { NavigationTileGroup } from './navigation-tile-group';
import {
  NAVIGATION_TILE_TONES,
  isNavigationTileTone,
  toneFromValue,
} from './navigation-tile-variants';

describe('NavigationTile', () => {
  it('renders the label', () => {
    render(<NavigationTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationTile label="Parent">
        <span>child content</span>
      </NavigationTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationTileGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-tile-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationTileGroup items={[]} />);
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
    for (const tone of NAVIGATION_TILE_TONES) {
      expect(isNavigationTileTone(tone)).toBe(true);
    }
    expect(isNavigationTileTone('bogus')).toBe(false);
  });
});
