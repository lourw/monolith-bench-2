import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsList } from './charts-list';
import { ChartsListGroup } from './charts-list-group';
import {
  CHARTS_LIST_TONES,
  isChartsListTone,
  toneFromValue,
} from './charts-list-variants';

describe('ChartsList', () => {
  it('renders the label', () => {
    render(<ChartsList label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<ChartsList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsList label="Parent">
        <span>child content</span>
      </ChartsList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsListGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsListGroup items={[]} />);
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
    for (const tone of CHARTS_LIST_TONES) {
      expect(isChartsListTone(tone)).toBe(true);
    }
    expect(isChartsListTone('bogus')).toBe(false);
  });
});
