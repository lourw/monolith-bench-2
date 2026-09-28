import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationList } from './navigation-list';
import { NavigationListGroup } from './navigation-list-group';
import {
  NAVIGATION_LIST_TONES,
  isNavigationListTone,
  toneFromValue,
} from './navigation-list-variants';

describe('NavigationList', () => {
  it('renders the label', () => {
    render(<NavigationList label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationList label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationList label="Parent">
        <span>child content</span>
      </NavigationList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationListGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-list-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationListGroup items={[]} />);
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
    for (const tone of NAVIGATION_LIST_TONES) {
      expect(isNavigationListTone(tone)).toBe(true);
    }
    expect(isNavigationListTone('bogus')).toBe(false);
  });
});
