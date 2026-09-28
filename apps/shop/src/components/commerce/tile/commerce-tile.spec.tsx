import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceTile } from './commerce-tile';
import { CommerceTileGroup } from './commerce-tile-group';
import {
  COMMERCE_TILE_TONES,
  isCommerceTileTone,
  toneFromValue,
} from './commerce-tile-variants';

describe('CommerceTile', () => {
  it('renders the label', () => {
    render(<CommerceTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceTile label="Parent">
        <span>child content</span>
      </CommerceTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceTileGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceTileGroup items={[]} />);
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
    for (const tone of COMMERCE_TILE_TONES) {
      expect(isCommerceTileTone(tone)).toBe(true);
    }
    expect(isCommerceTileTone('bogus')).toBe(false);
  });
});
