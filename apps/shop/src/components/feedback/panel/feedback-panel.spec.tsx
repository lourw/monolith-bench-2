import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackPanel } from './feedback-panel';
import { FeedbackPanelGroup } from './feedback-panel-group';
import {
  FEEDBACK_PANEL_TONES,
  isFeedbackPanelTone,
  toneFromValue,
} from './feedback-panel-variants';

describe('FeedbackPanel', () => {
  it('renders the label', () => {
    render(<FeedbackPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackPanel label="Parent">
        <span>child content</span>
      </FeedbackPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackPanelGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-feedback-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackPanelGroup items={[]} />);
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
    for (const tone of FEEDBACK_PANEL_TONES) {
      expect(isFeedbackPanelTone(tone)).toBe(true);
    }
    expect(isFeedbackPanelTone('bogus')).toBe(false);
  });
});
