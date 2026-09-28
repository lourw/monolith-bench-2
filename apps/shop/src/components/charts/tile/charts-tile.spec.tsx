import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsTile } from './charts-tile';
import { ChartsTileGroup } from './charts-tile-group';
import {
  CHARTS_TILE_TONES,
  isChartsTileTone,
  toneFromValue,
} from './charts-tile-variants';

describe('ChartsTile', () => {
  it('renders the label', () => {
    render(<ChartsTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<ChartsTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsTile label="Parent">
        <span>child content</span>
      </ChartsTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsTileGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsTileGroup items={[]} />);
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
    for (const tone of CHARTS_TILE_TONES) {
      expect(isChartsTileTone(tone)).toBe(true);
    }
    expect(isChartsTileTone('bogus')).toBe(false);
  });
});
