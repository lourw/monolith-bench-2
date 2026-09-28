import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsList } from './inputs-list';
import { InputsListGroup } from './inputs-list-group';
import {
  INPUTS_LIST_TONES,
  isInputsListTone,
  toneFromValue,
} from './inputs-list-variants';

describe('InputsList', () => {
  it('renders the label', () => {
    render(<InputsList label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<InputsList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsList label="Parent">
        <span>child content</span>
      </InputsList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsListGroup', () => {
  it('renders every item', () => {
    render(
      <InputsListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsListGroup items={[]} />);
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
    for (const tone of INPUTS_LIST_TONES) {
      expect(isInputsListTone(tone)).toBe(true);
    }
    expect(isInputsListTone('bogus')).toBe(false);
  });
});
