import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationBadge } from './navigation-badge';
import { NavigationBadgeGroup } from './navigation-badge-group';
import {
  NAVIGATION_BADGE_TONES,
  isNavigationBadgeTone,
  toneFromValue,
} from './navigation-badge-variants';

describe('NavigationBadge', () => {
  it('renders the label', () => {
    render(<NavigationBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationBadge label="Parent">
        <span>child content</span>
      </NavigationBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-badge-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationBadgeGroup items={[]} />);
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
    for (const tone of NAVIGATION_BADGE_TONES) {
      expect(isNavigationBadgeTone(tone)).toBe(true);
    }
    expect(isNavigationBadgeTone('bogus')).toBe(false);
  });
});
