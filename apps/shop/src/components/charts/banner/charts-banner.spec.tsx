import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsBanner } from './charts-banner';
import { ChartsBannerGroup } from './charts-banner-group';
import {
  CHARTS_BANNER_TONES,
  isChartsBannerTone,
  toneFromValue,
} from './charts-banner-variants';

describe('ChartsBanner', () => {
  it('renders the label', () => {
    render(<ChartsBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <ChartsBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsBanner label="Parent">
        <span>child content</span>
      </ChartsBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsBannerGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsBannerGroup items={[]} />);
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
    for (const tone of CHARTS_BANNER_TONES) {
      expect(isChartsBannerTone(tone)).toBe(true);
    }
    expect(isChartsBannerTone('bogus')).toBe(false);
  });
});
