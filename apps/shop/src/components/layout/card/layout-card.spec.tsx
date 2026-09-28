import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutCard } from './layout-card';
import { LayoutCardGroup } from './layout-card-group';
import {
  LAYOUT_CARD_TONES,
  isLayoutCardTone,
  toneFromValue,
} from './layout-card-variants';

describe('LayoutCard', () => {
  it('renders the label', () => {
    render(<LayoutCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<LayoutCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutCard label="Parent">
        <span>child content</span>
      </LayoutCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutCardGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutCardGroup items={[]} />);
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
    for (const tone of LAYOUT_CARD_TONES) {
      expect(isLayoutCardTone(tone)).toBe(true);
    }
    expect(isLayoutCardTone('bogus')).toBe(false);
  });
});
