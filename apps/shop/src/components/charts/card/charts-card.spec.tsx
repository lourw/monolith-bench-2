import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsCard } from './charts-card';
import { ChartsCardGroup } from './charts-card-group';
import {
  CHARTS_CARD_TONES,
  isChartsCardTone,
  toneFromValue,
} from './charts-card-variants';

describe('ChartsCard', () => {
  it('renders the label', () => {
    render(<ChartsCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<ChartsCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsCard label="Parent">
        <span>child content</span>
      </ChartsCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsCardGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsCardGroup items={[]} />);
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
    for (const tone of CHARTS_CARD_TONES) {
      expect(isChartsCardTone(tone)).toBe(true);
    }
    expect(isChartsCardTone('bogus')).toBe(false);
  });
});
