import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceBadge } from './commerce-badge';
import { CommerceBadgeGroup } from './commerce-badge-group';
import {
  COMMERCE_BADGE_TONES,
  isCommerceBadgeTone,
  toneFromValue,
} from './commerce-badge-variants';

describe('CommerceBadge', () => {
  it('renders the label', () => {
    render(<CommerceBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceBadge label="Parent">
        <span>child content</span>
      </CommerceBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceBadgeGroup items={[]} />);
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
    for (const tone of COMMERCE_BADGE_TONES) {
      expect(isCommerceBadgeTone(tone)).toBe(true);
    }
    expect(isCommerceBadgeTone('bogus')).toBe(false);
  });
});
