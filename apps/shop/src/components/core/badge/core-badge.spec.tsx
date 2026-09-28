import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreBadge } from './core-badge';
import { CoreBadgeGroup } from './core-badge-group';
import {
  CORE_BADGE_TONES,
  isCoreBadgeTone,
  toneFromValue,
} from './core-badge-variants';

describe('CoreBadge', () => {
  it('renders the label', () => {
    render(<CoreBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreBadge label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreBadge label="Parent">
        <span>child content</span>
      </CoreBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <CoreBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreBadgeGroup items={[]} />);
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
    for (const tone of CORE_BADGE_TONES) {
      expect(isCoreBadgeTone(tone)).toBe(true);
    }
    expect(isCoreBadgeTone('bogus')).toBe(false);
  });
});
