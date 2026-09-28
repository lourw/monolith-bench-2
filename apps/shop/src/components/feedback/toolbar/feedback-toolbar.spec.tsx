import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackToolbar } from './feedback-toolbar';
import { FeedbackToolbarGroup } from './feedback-toolbar-group';
import {
  FEEDBACK_TOOLBAR_TONES,
  isFeedbackToolbarTone,
  toneFromValue,
} from './feedback-toolbar-variants';

describe('FeedbackToolbar', () => {
  it('renders the label', () => {
    render(<FeedbackToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackToolbar label="Parent">
        <span>child content</span>
      </FeedbackToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-feedback-toolbar-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackToolbarGroup items={[]} />);
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
    for (const tone of FEEDBACK_TOOLBAR_TONES) {
      expect(isFeedbackToolbarTone(tone)).toBe(true);
    }
    expect(isFeedbackToolbarTone('bogus')).toBe(false);
  });
});
