import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsToolbar } from './forms-toolbar';
import { FormsToolbarGroup } from './forms-toolbar-group';
import {
  FORMS_TOOLBAR_TONES,
  isFormsToolbarTone,
  toneFromValue,
} from './forms-toolbar-variants';

describe('FormsToolbar', () => {
  it('renders the label', () => {
    render(<FormsToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <FormsToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsToolbar label="Parent">
        <span>child content</span>
      </FormsToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <FormsToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-toolbar-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsToolbarGroup items={[]} />);
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
    for (const tone of FORMS_TOOLBAR_TONES) {
      expect(isFormsToolbarTone(tone)).toBe(true);
    }
    expect(isFormsToolbarTone('bogus')).toBe(false);
  });
});
