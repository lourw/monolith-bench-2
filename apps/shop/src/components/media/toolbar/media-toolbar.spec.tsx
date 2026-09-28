import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaToolbar } from './media-toolbar';
import { MediaToolbarGroup } from './media-toolbar-group';
import {
  MEDIA_TOOLBAR_TONES,
  isMediaToolbarTone,
  toneFromValue,
} from './media-toolbar-variants';

describe('MediaToolbar', () => {
  it('renders the label', () => {
    render(<MediaToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MediaToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaToolbar label="Parent">
        <span>child content</span>
      </MediaToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <MediaToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaToolbarGroup items={[]} />);
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
    for (const tone of MEDIA_TOOLBAR_TONES) {
      expect(isMediaToolbarTone(tone)).toBe(true);
    }
    expect(isMediaToolbarTone('bogus')).toBe(false);
  });
});
