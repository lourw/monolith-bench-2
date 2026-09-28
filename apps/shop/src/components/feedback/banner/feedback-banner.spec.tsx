import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FeedbackBanner } from './feedback-banner';
import { FeedbackBannerGroup } from './feedback-banner-group';
import {
  FEEDBACK_BANNER_TONES,
  isFeedbackBannerTone,
  toneFromValue,
} from './feedback-banner-variants';

describe('FeedbackBanner', () => {
  it('renders the label', () => {
    render(<FeedbackBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-feedback-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FeedbackBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FeedbackBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-feedback-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FeedbackBanner label="Parent">
        <span>child content</span>
      </FeedbackBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FeedbackBannerGroup', () => {
  it('renders every item', () => {
    render(
      <FeedbackBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-feedback-banner-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-feedback-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FeedbackBannerGroup items={[]} />);
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
    for (const tone of FEEDBACK_BANNER_TONES) {
      expect(isFeedbackBannerTone(tone)).toBe(true);
    }
    expect(isFeedbackBannerTone('bogus')).toBe(false);
  });
});
