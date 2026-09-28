import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayToolbar } from './overlay-toolbar';
import { OverlayToolbarGroup } from './overlay-toolbar-group';
import {
  OVERLAY_TOOLBAR_TONES,
  isOverlayToolbarTone,
  toneFromValue,
} from './overlay-toolbar-variants';

describe('OverlayToolbar', () => {
  it('renders the label', () => {
    render(<OverlayToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayToolbar label="Parent">
        <span>child content</span>
      </OverlayToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-overlay-toolbar-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayToolbarGroup items={[]} />);
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
    for (const tone of OVERLAY_TOOLBAR_TONES) {
      expect(isOverlayToolbarTone(tone)).toBe(true);
    }
    expect(isOverlayToolbarTone('bogus')).toBe(false);
  });
});
