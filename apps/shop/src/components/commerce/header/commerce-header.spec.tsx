import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceHeader } from './commerce-header';
import { CommerceHeaderGroup } from './commerce-header-group';
import {
  COMMERCE_HEADER_TONES,
  isCommerceHeaderTone,
  toneFromValue,
} from './commerce-header-variants';

describe('CommerceHeader', () => {
  it('renders the label', () => {
    render(<CommerceHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceHeader label="Parent">
        <span>child content</span>
      </CommerceHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-commerce-header-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceHeaderGroup items={[]} />);
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
    for (const tone of COMMERCE_HEADER_TONES) {
      expect(isCommerceHeaderTone(tone)).toBe(true);
    }
    expect(isCommerceHeaderTone('bogus')).toBe(false);
  });
});
