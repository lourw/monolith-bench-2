import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreHeader } from './core-header';
import { CoreHeaderGroup } from './core-header-group';
import {
  CORE_HEADER_TONES,
  isCoreHeaderTone,
  toneFromValue,
} from './core-header-variants';

describe('CoreHeader', () => {
  it('renders the label', () => {
    render(<CoreHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreHeader label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreHeader label="Parent">
        <span>child content</span>
      </CoreHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <CoreHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreHeaderGroup items={[]} />);
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
    for (const tone of CORE_HEADER_TONES) {
      expect(isCoreHeaderTone(tone)).toBe(true);
    }
    expect(isCoreHeaderTone('bogus')).toBe(false);
  });
});
