import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaPanel } from './media-panel';
import { MediaPanelGroup } from './media-panel-group';
import {
  MEDIA_PANEL_TONES,
  isMediaPanelTone,
  toneFromValue,
} from './media-panel-variants';

describe('MediaPanel', () => {
  it('renders the label', () => {
    render(<MediaPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaPanel label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaPanel label="Parent">
        <span>child content</span>
      </MediaPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaPanelGroup', () => {
  it('renders every item', () => {
    render(
      <MediaPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaPanelGroup items={[]} />);
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
    for (const tone of MEDIA_PANEL_TONES) {
      expect(isMediaPanelTone(tone)).toBe(true);
    }
    expect(isMediaPanelTone('bogus')).toBe(false);
  });
});
