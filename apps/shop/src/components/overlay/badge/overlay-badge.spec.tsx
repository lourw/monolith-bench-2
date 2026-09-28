import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayBadge } from './overlay-badge';
import { OverlayBadgeGroup } from './overlay-badge-group';
import {
  OVERLAY_BADGE_TONES,
  isOverlayBadgeTone,
  toneFromValue,
} from './overlay-badge-variants';

describe('OverlayBadge', () => {
  it('renders the label', () => {
    render(<OverlayBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayBadge label="Parent">
        <span>child content</span>
      </OverlayBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayBadgeGroup items={[]} />);
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
    for (const tone of OVERLAY_BADGE_TONES) {
      expect(isOverlayBadgeTone(tone)).toBe(true);
    }
    expect(isOverlayBadgeTone('bogus')).toBe(false);
  });
});
