import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationCard } from './navigation-card';
import { NavigationCardGroup } from './navigation-card-group';
import {
  NAVIGATION_CARD_TONES,
  isNavigationCardTone,
  toneFromValue,
} from './navigation-card-variants';

describe('NavigationCard', () => {
  it('renders the label', () => {
    render(<NavigationCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationCard label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationCard label="Parent">
        <span>child content</span>
      </NavigationCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationCardGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-card-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationCardGroup items={[]} />);
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
    for (const tone of NAVIGATION_CARD_TONES) {
      expect(isNavigationCardTone(tone)).toBe(true);
    }
    expect(isNavigationCardTone('bogus')).toBe(false);
  });
});
