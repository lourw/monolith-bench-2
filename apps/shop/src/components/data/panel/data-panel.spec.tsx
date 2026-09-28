import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataPanel } from './data-panel';
import { DataPanelGroup } from './data-panel-group';
import {
  DATA_PANEL_TONES,
  isDataPanelTone,
  toneFromValue,
} from './data-panel-variants';

describe('DataPanel', () => {
  it('renders the label', () => {
    render(<DataPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataPanel label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataPanel label="Parent">
        <span>child content</span>
      </DataPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataPanelGroup', () => {
  it('renders every item', () => {
    render(
      <DataPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataPanelGroup items={[]} />);
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
    for (const tone of DATA_PANEL_TONES) {
      expect(isDataPanelTone(tone)).toBe(true);
    }
    expect(isDataPanelTone('bogus')).toBe(false);
  });
});
