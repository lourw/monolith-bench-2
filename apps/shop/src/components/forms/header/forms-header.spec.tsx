import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsHeader } from './forms-header';
import { FormsHeaderGroup } from './forms-header-group';
import {
  FORMS_HEADER_TONES,
  isFormsHeaderTone,
  toneFromValue,
} from './forms-header-variants';

describe('FormsHeader', () => {
  it('renders the label', () => {
    render(<FormsHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FormsHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsHeader label="Parent">
        <span>child content</span>
      </FormsHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <FormsHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsHeaderGroup items={[]} />);
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
    for (const tone of FORMS_HEADER_TONES) {
      expect(isFormsHeaderTone(tone)).toBe(true);
    }
    expect(isFormsHeaderTone('bogus')).toBe(false);
  });
});
