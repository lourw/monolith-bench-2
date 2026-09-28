import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyTile } from './typography-tile';
import { TypographyTileGroup } from './typography-tile-group';
import {
  TYPOGRAPHY_TILE_TONES,
  isTypographyTileTone,
  toneFromValue,
} from './typography-tile-variants';

describe('TypographyTile', () => {
  it('renders the label', () => {
    render(<TypographyTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyTile label="Parent">
        <span>child content</span>
      </TypographyTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyTileGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-tile-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyTileGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_TILE_TONES) {
      expect(isTypographyTileTone(tone)).toBe(true);
    }
    expect(isTypographyTileTone('bogus')).toBe(false);
  });
});
