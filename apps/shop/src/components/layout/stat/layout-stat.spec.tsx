import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutStat } from './layout-stat';
import { LayoutStatGroup } from './layout-stat-group';
import {
  LAYOUT_STAT_TONES,
  isLayoutStatTone,
  toneFromValue,
} from './layout-stat-variants';

describe('LayoutStat', () => {
  it('renders the label', () => {
    render(<LayoutStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<LayoutStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutStat label="Parent">
        <span>child content</span>
      </LayoutStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutStatGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutStatGroup items={[]} />);
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
    for (const tone of LAYOUT_STAT_TONES) {
      expect(isLayoutStatTone(tone)).toBe(true);
    }
    expect(isLayoutStatTone('bogus')).toBe(false);
  });
});
