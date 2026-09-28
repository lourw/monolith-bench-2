import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackChip } from './feedback-chip';
import { FeedbackChipGroup } from './feedback-chip-group';
import {
  FEEDBACK_CHIP_TONES,
  isFeedbackChipTone,
  toneFromValue,
} from './feedback-chip-variants';

describe('FeedbackChip', () => {
  it('renders the label', () => {
    render(<FeedbackChip label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-chip')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackChip label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackChip label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-chip'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackChip label="Parent">
        <span>child content</span>
      </FeedbackChip>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackChipGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackChipGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-feedback-chip-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-chip-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackChipGroup items={[]} />);
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
    for (const tone of FEEDBACK_CHIP_TONES) {
      expect(isFeedbackChipTone(tone)).toBe(true);
    }
    expect(isFeedbackChipTone('bogus')).toBe(false);
  });
});
