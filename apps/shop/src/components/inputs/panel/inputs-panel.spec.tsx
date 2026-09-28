import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsPanel } from './inputs-panel';
import { InputsPanelGroup } from './inputs-panel-group';
import {
  INPUTS_PANEL_TONES,
  isInputsPanelTone,
  toneFromValue,
} from './inputs-panel-variants';

describe('InputsPanel', () => {
  it('renders the label', () => {
    render(<InputsPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <InputsPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsPanel label="Parent">
        <span>child content</span>
      </InputsPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsPanelGroup', () => {
  it('renders every item', () => {
    render(
      <InputsPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsPanelGroup items={[]} />);
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
    for (const tone of INPUTS_PANEL_TONES) {
      expect(isInputsPanelTone(tone)).toBe(true);
    }
    expect(isInputsPanelTone('bogus')).toBe(false);
  });
});
