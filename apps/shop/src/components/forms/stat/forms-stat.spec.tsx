import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsStat } from './forms-stat';
import { FormsStatGroup } from './forms-stat-group';
import {
  FORMS_STAT_TONES,
  isFormsStatTone,
  toneFromValue,
} from './forms-stat-variants';

describe('FormsStat', () => {
  it('renders the label', () => {
    render(<FormsStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsStat label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsStat label="Parent">
        <span>child content</span>
      </FormsStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsStatGroup', () => {
  it('renders every item', () => {
    render(
      <FormsStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-stat-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsStatGroup items={[]} />);
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
    for (const tone of FORMS_STAT_TONES) {
      expect(isFormsStatTone(tone)).toBe(true);
    }
    expect(isFormsStatTone('bogus')).toBe(false);
  });
});
