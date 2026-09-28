import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsHeader } from './charts-header';
import { ChartsHeaderGroup } from './charts-header-group';
import {
  CHARTS_HEADER_TONES,
  isChartsHeaderTone,
  toneFromValue,
} from './charts-header-variants';

describe('ChartsHeader', () => {
  it('renders the label', () => {
    render(<ChartsHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <ChartsHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsHeader label="Parent">
        <span>child content</span>
      </ChartsHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsHeaderGroup items={[]} />);
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
    for (const tone of CHARTS_HEADER_TONES) {
      expect(isChartsHeaderTone(tone)).toBe(true);
    }
    expect(isChartsHeaderTone('bogus')).toBe(false);
  });
});
