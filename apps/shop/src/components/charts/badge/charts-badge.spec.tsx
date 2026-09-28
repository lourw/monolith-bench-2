import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsBadge } from './charts-badge';
import { ChartsBadgeGroup } from './charts-badge-group';
import {
  CHARTS_BADGE_TONES,
  isChartsBadgeTone,
  toneFromValue,
} from './charts-badge-variants';

describe('ChartsBadge', () => {
  it('renders the label', () => {
    render(<ChartsBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <ChartsBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsBadge label="Parent">
        <span>child content</span>
      </ChartsBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsBadgeGroup items={[]} />);
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
    for (const tone of CHARTS_BADGE_TONES) {
      expect(isChartsBadgeTone(tone)).toBe(true);
    }
    expect(isChartsBadgeTone('bogus')).toBe(false);
  });
});
