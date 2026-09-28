import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingCard } from './marketing-card';
import { MarketingCardGroup } from './marketing-card-group';
import {
  MARKETING_CARD_TONES,
  isMarketingCardTone,
  toneFromValue,
} from './marketing-card-variants';

describe('MarketingCard', () => {
  it('renders the label', () => {
    render(<MarketingCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingCard label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingCard label="Parent">
        <span>child content</span>
      </MarketingCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingCardGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-marketing-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingCardGroup items={[]} />);
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
    for (const tone of MARKETING_CARD_TONES) {
      expect(isMarketingCardTone(tone)).toBe(true);
    }
    expect(isMarketingCardTone('bogus')).toBe(false);
  });
});
