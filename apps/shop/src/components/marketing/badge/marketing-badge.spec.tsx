import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingBadge } from './marketing-badge';
import { MarketingBadgeGroup } from './marketing-badge-group';
import {
  MARKETING_BADGE_TONES,
  isMarketingBadgeTone,
  toneFromValue,
} from './marketing-badge-variants';

describe('MarketingBadge', () => {
  it('renders the label', () => {
    render(<MarketingBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingBadge label="Parent">
        <span>child content</span>
      </MarketingBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-marketing-badge-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingBadgeGroup items={[]} />);
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
    for (const tone of MARKETING_BADGE_TONES) {
      expect(isMarketingBadgeTone(tone)).toBe(true);
    }
    expect(isMarketingBadgeTone('bogus')).toBe(false);
  });
});
