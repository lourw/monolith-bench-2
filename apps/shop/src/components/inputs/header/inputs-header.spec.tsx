import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsHeader } from './inputs-header';
import { InputsHeaderGroup } from './inputs-header-group';
import {
  INPUTS_HEADER_TONES,
  isInputsHeaderTone,
  toneFromValue,
} from './inputs-header-variants';

describe('InputsHeader', () => {
  it('renders the label', () => {
    render(<InputsHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <InputsHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsHeader label="Parent">
        <span>child content</span>
      </InputsHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <InputsHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsHeaderGroup items={[]} />);
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
    for (const tone of INPUTS_HEADER_TONES) {
      expect(isInputsHeaderTone(tone)).toBe(true);
    }
    expect(isInputsHeaderTone('bogus')).toBe(false);
  });
});
