import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaList } from './media-list';
import { MediaListGroup } from './media-list-group';
import {
  MEDIA_LIST_TONES,
  isMediaListTone,
  toneFromValue,
} from './media-list-variants';

describe('MediaList', () => {
  it('renders the label', () => {
    render(<MediaList label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaList label="Parent">
        <span>child content</span>
      </MediaList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaListGroup', () => {
  it('renders every item', () => {
    render(
      <MediaListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaListGroup items={[]} />);
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
    for (const tone of MEDIA_LIST_TONES) {
      expect(isMediaListTone(tone)).toBe(true);
    }
    expect(isMediaListTone('bogus')).toBe(false);
  });
});
