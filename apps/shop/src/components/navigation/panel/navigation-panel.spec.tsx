import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavigationPanel } from './navigation-panel';
import { NavigationPanelGroup } from './navigation-panel-group';
import {
  NAVIGATION_PANEL_TONES,
  isNavigationPanelTone,
  toneFromValue,
} from './navigation-panel-variants';

describe('NavigationPanel', () => {
  it('renders the label', () => {
    render(<NavigationPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-navigation-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <NavigationPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<NavigationPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-navigation-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <NavigationPanel label="Parent">
        <span>child content</span>
      </NavigationPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('NavigationPanelGroup', () => {
  it('renders every item', () => {
    render(
      <NavigationPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-navigation-panel-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-navigation-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<NavigationPanelGroup items={[]} />);
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
    for (const tone of NAVIGATION_PANEL_TONES) {
      expect(isNavigationPanelTone(tone)).toBe(true);
    }
    expect(isNavigationPanelTone('bogus')).toBe(false);
  });
});
