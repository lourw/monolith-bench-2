import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsPanel } from './charts-panel';
import { ChartsPanelGroup } from './charts-panel-group';
import {
  CHARTS_PANEL_TONES,
  isChartsPanelTone,
  toneFromValue,
} from './charts-panel-variants';

describe('ChartsPanel', () => {
  it('renders the label', () => {
    render(<ChartsPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <ChartsPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsPanel label="Parent">
        <span>child content</span>
      </ChartsPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsPanelGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsPanelGroup items={[]} />);
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
    for (const tone of CHARTS_PANEL_TONES) {
      expect(isChartsPanelTone(tone)).toBe(true);
    }
    expect(isChartsPanelTone('bogus')).toBe(false);
  });
});
