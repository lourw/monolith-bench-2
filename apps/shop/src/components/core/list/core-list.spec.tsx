import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreList } from './core-list';
import { CoreListGroup } from './core-list-group';
import {
  CORE_LIST_TONES,
  isCoreListTone,
  toneFromValue,
} from './core-list-variants';

describe('CoreList', () => {
  it('renders the label', () => {
    render(<CoreList label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreList label="Parent">
        <span>child content</span>
      </CoreList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreListGroup', () => {
  it('renders every item', () => {
    render(
      <CoreListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreListGroup items={[]} />);
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
    for (const tone of CORE_LIST_TONES) {
      expect(isCoreListTone(tone)).toBe(true);
    }
    expect(isCoreListTone('bogus')).toBe(false);
  });
});
