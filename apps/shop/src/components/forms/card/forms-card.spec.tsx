import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsCard } from './forms-card';
import { FormsCardGroup } from './forms-card-group';
import {
  FORMS_CARD_TONES,
  isFormsCardTone,
  toneFromValue,
} from './forms-card-variants';

describe('FormsCard', () => {
  it('renders the label', () => {
    render(<FormsCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsCard label="Parent">
        <span>child content</span>
      </FormsCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsCardGroup', () => {
  it('renders every item', () => {
    render(
      <FormsCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsCardGroup items={[]} />);
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
    for (const tone of FORMS_CARD_TONES) {
      expect(isFormsCardTone(tone)).toBe(true);
    }
    expect(isFormsCardTone('bogus')).toBe(false);
  });
});
