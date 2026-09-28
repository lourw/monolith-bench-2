import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceStat } from './commerce-stat';
import { CommerceStatGroup } from './commerce-stat-group';
import {
  COMMERCE_STAT_TONES,
  isCommerceStatTone,
  toneFromValue,
} from './commerce-stat-variants';

describe('CommerceStat', () => {
  it('renders the label', () => {
    render(<CommerceStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceStat label="Parent">
        <span>child content</span>
      </CommerceStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceStatGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceStatGroup items={[]} />);
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
    for (const tone of COMMERCE_STAT_TONES) {
      expect(isCommerceStatTone(tone)).toBe(true);
    }
    expect(isCommerceStatTone('bogus')).toBe(false);
  });
});
