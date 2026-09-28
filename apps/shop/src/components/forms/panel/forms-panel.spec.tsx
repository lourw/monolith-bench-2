import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsPanel } from './forms-panel';
import { FormsPanelGroup } from './forms-panel-group';
import {
  FORMS_PANEL_TONES,
  isFormsPanelTone,
  toneFromValue,
} from './forms-panel-variants';

describe('FormsPanel', () => {
  it('renders the label', () => {
    render(<FormsPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsPanel label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsPanel label="Parent">
        <span>child content</span>
      </FormsPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsPanelGroup', () => {
  it('renders every item', () => {
    render(
      <FormsPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsPanelGroup items={[]} />);
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
    for (const tone of FORMS_PANEL_TONES) {
      expect(isFormsPanelTone(tone)).toBe(true);
    }
    expect(isFormsPanelTone('bogus')).toBe(false);
  });
});
