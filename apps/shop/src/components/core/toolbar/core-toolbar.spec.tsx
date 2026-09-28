import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreToolbar } from './core-toolbar';
import { CoreToolbarGroup } from './core-toolbar-group';
import {
  CORE_TOOLBAR_TONES,
  isCoreToolbarTone,
  toneFromValue,
} from './core-toolbar-variants';

describe('CoreToolbar', () => {
  it('renders the label', () => {
    render(<CoreToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CoreToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreToolbar label="Parent">
        <span>child content</span>
      </CoreToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <CoreToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreToolbarGroup items={[]} />);
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
    for (const tone of CORE_TOOLBAR_TONES) {
      expect(isCoreToolbarTone(tone)).toBe(true);
    }
    expect(isCoreToolbarTone('bogus')).toBe(false);
  });
});
