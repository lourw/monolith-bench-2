import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingTile } from './marketing-tile';
import { MarketingTileGroup } from './marketing-tile-group';
import {
  MARKETING_TILE_TONES,
  isMarketingTileTone,
  toneFromValue,
} from './marketing-tile-variants';

describe('MarketingTile', () => {
  it('renders the label', () => {
    render(<MarketingTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingTile label="Parent">
        <span>child content</span>
      </MarketingTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingTileGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-marketing-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingTileGroup items={[]} />);
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
    for (const tone of MARKETING_TILE_TONES) {
      expect(isMarketingTileTone(tone)).toBe(true);
    }
    expect(isMarketingTileTone('bogus')).toBe(false);
  });
});
