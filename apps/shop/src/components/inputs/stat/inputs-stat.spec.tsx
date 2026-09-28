import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsStat } from './inputs-stat';
import { InputsStatGroup } from './inputs-stat-group';
import {
  INPUTS_STAT_TONES,
  isInputsStatTone,
  toneFromValue,
} from './inputs-stat-variants';

describe('InputsStat', () => {
  it('renders the label', () => {
    render(<InputsStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<InputsStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsStat label="Parent">
        <span>child content</span>
      </InputsStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsStatGroup', () => {
  it('renders every item', () => {
    render(
      <InputsStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsStatGroup items={[]} />);
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
    for (const tone of INPUTS_STAT_TONES) {
      expect(isInputsStatTone(tone)).toBe(true);
    }
    expect(isInputsStatTone('bogus')).toBe(false);
  });
});
