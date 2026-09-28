import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutHeader } from './layout-header';
import { LayoutHeaderGroup } from './layout-header-group';
import {
  LAYOUT_HEADER_TONES,
  isLayoutHeaderTone,
  toneFromValue,
} from './layout-header-variants';

describe('LayoutHeader', () => {
  it('renders the label', () => {
    render(<LayoutHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <LayoutHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutHeader label="Parent">
        <span>child content</span>
      </LayoutHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutHeaderGroup items={[]} />);
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
    for (const tone of LAYOUT_HEADER_TONES) {
      expect(isLayoutHeaderTone(tone)).toBe(true);
    }
    expect(isLayoutHeaderTone('bogus')).toBe(false);
  });
});
