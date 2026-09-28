import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackTile } from './feedback-tile';
import { FeedbackTileGroup } from './feedback-tile-group';
import {
  FEEDBACK_TILE_TONES,
  isFeedbackTileTone,
  toneFromValue,
} from './feedback-tile-variants';

describe('FeedbackTile', () => {
  it('renders the label', () => {
    render(<FeedbackTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackTile label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackTile label="Parent">
        <span>child content</span>
      </FeedbackTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackTileGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-feedback-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackTileGroup items={[]} />);
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
    for (const tone of FEEDBACK_TILE_TONES) {
      expect(isFeedbackTileTone(tone)).toBe(true);
    }
    expect(isFeedbackTileTone('bogus')).toBe(false);
  });
});
