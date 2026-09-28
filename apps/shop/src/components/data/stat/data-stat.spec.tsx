import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataStat } from './data-stat';
import { DataStatGroup } from './data-stat-group';
import {
  DATA_STAT_TONES,
  isDataStatTone,
  toneFromValue,
} from './data-stat-variants';

describe('DataStat', () => {
  it('renders the label', () => {
    render(<DataStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataStat label="Parent">
        <span>child content</span>
      </DataStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataStatGroup', () => {
  it('renders every item', () => {
    render(
      <DataStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataStatGroup items={[]} />);
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
    for (const tone of DATA_STAT_TONES) {
      expect(isDataStatTone(tone)).toBe(true);
    }
    expect(isDataStatTone('bogus')).toBe(false);
  });
});
