import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommerceToolbar } from './commerce-toolbar';
import { CommerceToolbarGroup } from './commerce-toolbar-group';
import {
  COMMERCE_TOOLBAR_TONES,
  isCommerceToolbarTone,
  toneFromValue,
} from './commerce-toolbar-variants';

describe('CommerceToolbar', () => {
  it('renders the label', () => {
    render(<CommerceToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommerceToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommerceToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommerceToolbar label="Parent">
        <span>child content</span>
      </CommerceToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommerceToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <CommerceToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-commerce-toolbar-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommerceToolbarGroup items={[]} />);
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
    for (const tone of COMMERCE_TOOLBAR_TONES) {
      expect(isCommerceToolbarTone(tone)).toBe(true);
    }
    expect(isCommerceToolbarTone('bogus')).toBe(false);
  });
});
