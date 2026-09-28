import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataList } from './data-list';
import { DataListGroup } from './data-list-group';
import {
  DATA_LIST_TONES,
  isDataListTone,
  toneFromValue,
} from './data-list-variants';

describe('DataList', () => {
  it('renders the label', () => {
    render(<DataList label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataList label="Parent">
        <span>child content</span>
      </DataList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataListGroup', () => {
  it('renders every item', () => {
    render(
      <DataListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataListGroup items={[]} />);
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
    for (const tone of DATA_LIST_TONES) {
      expect(isDataListTone(tone)).toBe(true);
    }
    expect(isDataListTone('bogus')).toBe(false);
  });
});
