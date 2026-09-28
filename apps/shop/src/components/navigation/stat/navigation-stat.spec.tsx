import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationStat } from './navigation-stat';
import { NavigationStatGroup } from './navigation-stat-group';
import {
  NAVIGATION_STAT_TONES,
  isNavigationStatTone,
  toneFromValue,
} from './navigation-stat-variants';

describe('NavigationStat', () => {
  it('renders the label', () => {
    render(<NavigationStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationStat label="Parent">
        <span>child content</span>
      </NavigationStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationStatGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-stat-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationStatGroup items={[]} />);
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
    for (const tone of NAVIGATION_STAT_TONES) {
      expect(isNavigationStatTone(tone)).toBe(true);
    }
    expect(isNavigationStatTone('bogus')).toBe(false);
  });
});
