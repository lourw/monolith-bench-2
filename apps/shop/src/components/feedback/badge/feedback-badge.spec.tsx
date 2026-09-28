import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackBadge } from './feedback-badge';
import { FeedbackBadgeGroup } from './feedback-badge-group';
import {
  FEEDBACK_BADGE_TONES,
  isFeedbackBadgeTone,
  toneFromValue,
} from './feedback-badge-variants';

describe('FeedbackBadge', () => {
  it('renders the label', () => {
    render(<FeedbackBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackBadge label="Parent">
        <span>child content</span>
      </FeedbackBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-feedback-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackBadgeGroup items={[]} />);
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
    for (const tone of FEEDBACK_BADGE_TONES) {
      expect(isFeedbackBadgeTone(tone)).toBe(true);
    }
    expect(isFeedbackBadgeTone('bogus')).toBe(false);
  });
});
