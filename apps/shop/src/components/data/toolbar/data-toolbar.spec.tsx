import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataToolbar } from './data-toolbar';
import { DataToolbarGroup } from './data-toolbar-group';
import {
  DATA_TOOLBAR_TONES,
  isDataToolbarTone,
  toneFromValue,
} from './data-toolbar-variants';

describe('DataToolbar', () => {
  it('renders the label', () => {
    render(<DataToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <DataToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataToolbar label="Parent">
        <span>child content</span>
      </DataToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <DataToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataToolbarGroup items={[]} />);
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
    for (const tone of DATA_TOOLBAR_TONES) {
      expect(isDataToolbarTone(tone)).toBe(true);
    }
    expect(isDataToolbarTone('bogus')).toBe(false);
  });
});
