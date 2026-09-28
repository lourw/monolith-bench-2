import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreStat } from './core-stat';
import { CoreStatGroup } from './core-stat-group';
import {
  CORE_STAT_TONES,
  isCoreStatTone,
  toneFromValue,
} from './core-stat-variants';

describe('CoreStat', () => {
  it('renders the label', () => {
    render(<CoreStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreStat label="Parent">
        <span>child content</span>
      </CoreStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreStatGroup', () => {
  it('renders every item', () => {
    render(
      <CoreStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreStatGroup items={[]} />);
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
    for (const tone of CORE_STAT_TONES) {
      expect(isCoreStatTone(tone)).toBe(true);
    }
    expect(isCoreStatTone('bogus')).toBe(false);
  });
});
