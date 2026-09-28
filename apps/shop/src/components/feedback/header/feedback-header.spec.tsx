import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackHeader } from './feedback-header';
import { FeedbackHeaderGroup } from './feedback-header-group';
import {
  FEEDBACK_HEADER_TONES,
  isFeedbackHeaderTone,
  toneFromValue,
} from './feedback-header-variants';

describe('FeedbackHeader', () => {
  it('renders the label', () => {
    render(<FeedbackHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackHeader label="Parent">
        <span>child content</span>
      </FeedbackHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-feedback-header-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackHeaderGroup items={[]} />);
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
    for (const tone of FEEDBACK_HEADER_TONES) {
      expect(isFeedbackHeaderTone(tone)).toBe(true);
    }
    expect(isFeedbackHeaderTone('bogus')).toBe(false);
  });
});
