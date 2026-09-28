import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsStat } from './charts-stat';
import { ChartsStatGroup } from './charts-stat-group';
import {
  CHARTS_STAT_TONES,
  isChartsStatTone,
  toneFromValue,
} from './charts-stat-variants';

describe('ChartsStat', () => {
  it('renders the label', () => {
    render(<ChartsStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<ChartsStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsStat label="Parent">
        <span>child content</span>
      </ChartsStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsStatGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsStatGroup items={[]} />);
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
    for (const tone of CHARTS_STAT_TONES) {
      expect(isChartsStatTone(tone)).toBe(true);
    }
    expect(isChartsStatTone('bogus')).toBe(false);
  });
});
