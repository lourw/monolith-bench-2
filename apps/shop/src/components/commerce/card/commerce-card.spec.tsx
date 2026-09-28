import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceCard } from './commerce-card';
import { CommerceCardGroup } from './commerce-card-group';
import {
  COMMERCE_CARD_TONES,
  isCommerceCardTone,
  toneFromValue,
} from './commerce-card-variants';

describe('CommerceCard', () => {
  it('renders the label', () => {
    render(<CommerceCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceCard label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceCard label="Parent">
        <span>child content</span>
      </CommerceCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceCardGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceCardGroup items={[]} />);
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
    for (const tone of COMMERCE_CARD_TONES) {
      expect(isCommerceCardTone(tone)).toBe(true);
    }
    expect(isCommerceCardTone('bogus')).toBe(false);
  });
});
