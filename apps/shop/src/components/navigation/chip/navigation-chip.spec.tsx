import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationChip } from './navigation-chip';
import { NavigationChipGroup } from './navigation-chip-group';
import {
  NAVIGATION_CHIP_TONES,
  isNavigationChipTone,
  toneFromValue,
} from './navigation-chip-variants';

describe('NavigationChip', () => {
  it('renders the label', () => {
    render(<NavigationChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationChip label="Parent">
        <span>child content</span>
      </NavigationChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationChipGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-chip-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationChipGroup items={[]} />);
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
    for (const tone of NAVIGATION_CHIP_TONES) {
      expect(isNavigationChipTone(tone)).toBe(true);
    }
    expect(isNavigationChipTone('bogus')).toBe(false);
  });
});
