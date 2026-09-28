import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutToolbar } from './layout-toolbar';
import { LayoutToolbarGroup } from './layout-toolbar-group';
import {
  LAYOUT_TOOLBAR_TONES,
  isLayoutToolbarTone,
  toneFromValue,
} from './layout-toolbar-variants';

describe('LayoutToolbar', () => {
  it('renders the label', () => {
    render(<LayoutToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <LayoutToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutToolbar label="Parent">
        <span>child content</span>
      </LayoutToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutToolbarGroup items={[]} />);
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
    for (const tone of LAYOUT_TOOLBAR_TONES) {
      expect(isLayoutToolbarTone(tone)).toBe(true);
    }
    expect(isLayoutToolbarTone('bogus')).toBe(false);
  });
});
