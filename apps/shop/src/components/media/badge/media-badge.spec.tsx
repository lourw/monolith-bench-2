import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaBadge } from './media-badge';
import { MediaBadgeGroup } from './media-badge-group';
import {
  MEDIA_BADGE_TONES,
  isMediaBadgeTone,
  toneFromValue,
} from './media-badge-variants';

describe('MediaBadge', () => {
  it('renders the label', () => {
    render(<MediaBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaBadge label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaBadge label="Parent">
        <span>child content</span>
      </MediaBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <MediaBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaBadgeGroup items={[]} />);
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
    for (const tone of MEDIA_BADGE_TONES) {
      expect(isMediaBadgeTone(tone)).toBe(true);
    }
    expect(isMediaBadgeTone('bogus')).toBe(false);
  });
});
