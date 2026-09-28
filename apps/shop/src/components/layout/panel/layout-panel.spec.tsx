import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutPanel } from './layout-panel';
import { LayoutPanelGroup } from './layout-panel-group';
import {
  LAYOUT_PANEL_TONES,
  isLayoutPanelTone,
  toneFromValue,
} from './layout-panel-variants';

describe('LayoutPanel', () => {
  it('renders the label', () => {
    render(<LayoutPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <LayoutPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutPanel label="Parent">
        <span>child content</span>
      </LayoutPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutPanelGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutPanelGroup items={[]} />);
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
    for (const tone of LAYOUT_PANEL_TONES) {
      expect(isLayoutPanelTone(tone)).toBe(true);
    }
    expect(isLayoutPanelTone('bogus')).toBe(false);
  });
});
