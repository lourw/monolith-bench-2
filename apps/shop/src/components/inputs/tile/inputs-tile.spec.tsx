import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsTile } from './inputs-tile';
import { InputsTileGroup } from './inputs-tile-group';
import {
  INPUTS_TILE_TONES,
  isInputsTileTone,
  toneFromValue,
} from './inputs-tile-variants';

describe('InputsTile', () => {
  it('renders the label', () => {
    render(<InputsTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<InputsTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsTile label="Parent">
        <span>child content</span>
      </InputsTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsTileGroup', () => {
  it('renders every item', () => {
    render(
      <InputsTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsTileGroup items={[]} />);
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
    for (const tone of INPUTS_TILE_TONES) {
      expect(isInputsTileTone(tone)).toBe(true);
    }
    expect(isInputsTileTone('bogus')).toBe(false);
  });
});
