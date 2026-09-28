import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationToolbar } from './navigation-toolbar';
import { NavigationToolbarGroup } from './navigation-toolbar-group';
import {
  NAVIGATION_TOOLBAR_TONES,
  isNavigationToolbarTone,
  toneFromValue,
} from './navigation-toolbar-variants';

describe('NavigationToolbar', () => {
  it('renders the label', () => {
    render(<NavigationToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationToolbar
        label="Tone"
        tone="danger"
        size="lg"
        testId="custom"
      />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationToolbar label="Parent">
        <span>child content</span>
      </NavigationToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-toolbar-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationToolbarGroup items={[]} />);
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
    for (const tone of NAVIGATION_TOOLBAR_TONES) {
      expect(isNavigationToolbarTone(tone)).toBe(true);
    }
    expect(isNavigationToolbarTone('bogus')).toBe(false);
  });
});
