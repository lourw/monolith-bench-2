import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsTile } from './forms-tile';
import { FormsTileGroup } from './forms-tile-group';
import {
  FORMS_TILE_TONES,
  isFormsTileTone,
  toneFromValue,
} from './forms-tile-variants';

describe('FormsTile', () => {
  it('renders the label', () => {
    render(<FormsTile label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-tile')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsTile label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsTile label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-tile'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsTile label="Parent">
        <span>child content</span>
      </FormsTile>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsTileGroup', () => {
  it('renders every item', () => {
    render(
      <FormsTileGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-tile-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-tile-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsTileGroup items={[]} />);
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
    for (const tone of FORMS_TILE_TONES) {
      expect(isFormsTileTone(tone)).toBe(true);
    }
    expect(isFormsTileTone('bogus')).toBe(false);
  });
});
