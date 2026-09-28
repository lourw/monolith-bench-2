import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayoutList } from './layout-list';
import { LayoutListGroup } from './layout-list-group';
import {
  LAYOUT_LIST_TONES,
  isLayoutListTone,
  toneFromValue,
} from './layout-list-variants';

describe('LayoutList', () => {
  it('renders the label', () => {
    render(<LayoutList label="Total" value={42} />);
    expect(screen.getByTestId('ui-layout-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<LayoutList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<LayoutList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-layout-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <LayoutList label="Parent">
        <span>child content</span>
      </LayoutList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('LayoutListGroup', () => {
  it('renders every item', () => {
    render(
      <LayoutListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-layout-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-layout-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<LayoutListGroup items={[]} />);
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
    for (const tone of LAYOUT_LIST_TONES) {
      expect(isLayoutListTone(tone)).toBe(true);
    }
    expect(isLayoutListTone('bogus')).toBe(false);
  });
});
