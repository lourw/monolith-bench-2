import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsToolbar } from './inputs-toolbar';
import { InputsToolbarGroup } from './inputs-toolbar-group';
import {
  INPUTS_TOOLBAR_TONES,
  isInputsToolbarTone,
  toneFromValue,
} from './inputs-toolbar-variants';

describe('InputsToolbar', () => {
  it('renders the label', () => {
    render(<InputsToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <InputsToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsToolbar label="Parent">
        <span>child content</span>
      </InputsToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <InputsToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsToolbarGroup items={[]} />);
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
    for (const tone of INPUTS_TOOLBAR_TONES) {
      expect(isInputsToolbarTone(tone)).toBe(true);
    }
    expect(isInputsToolbarTone('bogus')).toBe(false);
  });
});
