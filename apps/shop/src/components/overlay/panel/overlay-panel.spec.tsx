import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayPanel } from './overlay-panel';
import { OverlayPanelGroup } from './overlay-panel-group';
import {
  OVERLAY_PANEL_TONES,
  isOverlayPanelTone,
  toneFromValue,
} from './overlay-panel-variants';

describe('OverlayPanel', () => {
  it('renders the label', () => {
    render(<OverlayPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayPanel label="Parent">
        <span>child content</span>
      </OverlayPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayPanelGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayPanelGroup items={[]} />);
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
    for (const tone of OVERLAY_PANEL_TONES) {
      expect(isOverlayPanelTone(tone)).toBe(true);
    }
    expect(isOverlayPanelTone('bogus')).toBe(false);
  });
});
