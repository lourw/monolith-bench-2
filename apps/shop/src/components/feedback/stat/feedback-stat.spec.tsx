import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackStat } from './feedback-stat';
import { FeedbackStatGroup } from './feedback-stat-group';
import {
  FEEDBACK_STAT_TONES,
  isFeedbackStatTone,
  toneFromValue,
} from './feedback-stat-variants';

describe('FeedbackStat', () => {
  it('renders the label', () => {
    render(<FeedbackStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackStat label="Parent">
        <span>child content</span>
      </FeedbackStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackStatGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-feedback-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackStatGroup items={[]} />);
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
    for (const tone of FEEDBACK_STAT_TONES) {
      expect(isFeedbackStatTone(tone)).toBe(true);
    }
    expect(isFeedbackStatTone('bogus')).toBe(false);
  });
});
