import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaCard } from './media-card';
import { MediaCardGroup } from './media-card-group';
import {
  MEDIA_CARD_TONES,
  isMediaCardTone,
  toneFromValue,
} from './media-card-variants';

describe('MediaCard', () => {
  it('renders the label', () => {
    render(<MediaCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<MediaCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaCard label="Parent">
        <span>child content</span>
      </MediaCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaCardGroup', () => {
  it('renders every item', () => {
    render(
      <MediaCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaCardGroup items={[]} />);
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
    for (const tone of MEDIA_CARD_TONES) {
      expect(isMediaCardTone(tone)).toBe(true);
    }
    expect(isMediaCardTone('bogus')).toBe(false);
  });
});
