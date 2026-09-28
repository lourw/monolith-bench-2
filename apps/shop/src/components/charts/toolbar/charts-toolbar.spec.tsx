import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChartsToolbar } from './charts-toolbar';
import { ChartsToolbarGroup } from './charts-toolbar-group';
import {
  CHARTS_TOOLBAR_TONES,
  isChartsToolbarTone,
  toneFromValue,
} from './charts-toolbar-variants';

describe('ChartsToolbar', () => {
  it('renders the label', () => {
    render(<ChartsToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-charts-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <ChartsToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChartsToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-charts-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <ChartsToolbar label="Parent">
        <span>child content</span>
      </ChartsToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('ChartsToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <ChartsToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-charts-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-charts-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<ChartsToolbarGroup items={[]} />);
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
    for (const tone of CHARTS_TOOLBAR_TONES) {
      expect(isChartsToolbarTone(tone)).toBe(true);
    }
    expect(isChartsToolbarTone('bogus')).toBe(false);
  });
});
