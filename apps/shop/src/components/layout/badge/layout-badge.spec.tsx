import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutBadge } from './layout-badge';
import { LayoutBadgeGroup } from './layout-badge-group';
import {
  LAYOUT_BADGE_TONES,
  isLayoutBadgeTone,
  toneFromValue,
} from './layout-badge-variants';

describe('LayoutBadge', () => {
  it('renders the label', () => {
    render(<LayoutBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <LayoutBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutBadge label="Parent">
        <span>child content</span>
      </LayoutBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutBadgeGroup items={[]} />);
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
    for (const tone of LAYOUT_BADGE_TONES) {
      expect(isLayoutBadgeTone(tone)).toBe(true);
    }
    expect(isLayoutBadgeTone('bogus')).toBe(false);
  });
});
