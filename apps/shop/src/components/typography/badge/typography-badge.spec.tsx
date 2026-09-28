import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyBadge } from './typography-badge';
import { TypographyBadgeGroup } from './typography-badge-group';
import {
  TYPOGRAPHY_BADGE_TONES,
  isTypographyBadgeTone,
  toneFromValue,
} from './typography-badge-variants';

describe('TypographyBadge', () => {
  it('renders the label', () => {
    render(<TypographyBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyBadge label="Parent">
        <span>child content</span>
      </TypographyBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-badge-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyBadgeGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_BADGE_TONES) {
      expect(isTypographyBadgeTone(tone)).toBe(true);
    }
    expect(isTypographyBadgeTone('bogus')).toBe(false);
  });
});
