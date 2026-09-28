import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceList } from './commerce-list';
import { CommerceListGroup } from './commerce-list-group';
import {
  COMMERCE_LIST_TONES,
  isCommerceListTone,
  toneFromValue,
} from './commerce-list-variants';

describe('CommerceList', () => {
  it('renders the label', () => {
    render(<CommerceList label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceList label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceList label="Parent">
        <span>child content</span>
      </CommerceList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceListGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceListGroup items={[]} />);
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
    for (const tone of COMMERCE_LIST_TONES) {
      expect(isCommerceListTone(tone)).toBe(true);
    }
    expect(isCommerceListTone('bogus')).toBe(false);
  });
});
