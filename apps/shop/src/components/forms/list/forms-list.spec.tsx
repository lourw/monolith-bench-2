import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsList } from './forms-list';
import { FormsListGroup } from './forms-list-group';
import {
  FORMS_LIST_TONES,
  isFormsListTone,
  toneFromValue,
} from './forms-list-variants';

describe('FormsList', () => {
  it('renders the label', () => {
    render(<FormsList label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsList label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsList label="Parent">
        <span>child content</span>
      </FormsList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsListGroup', () => {
  it('renders every item', () => {
    render(
      <FormsListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsListGroup items={[]} />);
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
    for (const tone of FORMS_LIST_TONES) {
      expect(isFormsListTone(tone)).toBe(true);
    }
    expect(isFormsListTone('bogus')).toBe(false);
  });
});
