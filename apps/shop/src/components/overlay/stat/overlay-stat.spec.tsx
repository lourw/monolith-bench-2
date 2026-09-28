import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayStat } from './overlay-stat';
import { OverlayStatGroup } from './overlay-stat-group';
import {
  OVERLAY_STAT_TONES,
  isOverlayStatTone,
  toneFromValue,
} from './overlay-stat-variants';

describe('OverlayStat', () => {
  it('renders the label', () => {
    render(<OverlayStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayStat label="Parent">
        <span>child content</span>
      </OverlayStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayStatGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayStatGroup items={[]} />);
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
    for (const tone of OVERLAY_STAT_TONES) {
      expect(isOverlayStatTone(tone)).toBe(true);
    }
    expect(isOverlayStatTone('bogus')).toBe(false);
  });
});
