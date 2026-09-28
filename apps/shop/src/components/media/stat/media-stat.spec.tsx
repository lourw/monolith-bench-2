import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaStat } from './media-stat';
import { MediaStatGroup } from './media-stat-group';
import {
  MEDIA_STAT_TONES,
  isMediaStatTone,
  toneFromValue,
} from './media-stat-variants';

describe('MediaStat', () => {
  it('renders the label', () => {
    render(<MediaStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaStat label="Parent">
        <span>child content</span>
      </MediaStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaStatGroup', () => {
  it('renders every item', () => {
    render(
      <MediaStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaStatGroup items={[]} />);
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
    for (const tone of MEDIA_STAT_TONES) {
      expect(isMediaStatTone(tone)).toBe(true);
    }
    expect(isMediaStatTone('bogus')).toBe(false);
  });
});
