import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CorePanel } from './core-panel';
import { CorePanelGroup } from './core-panel-group';
import {
  CORE_PANEL_TONES,
  isCorePanelTone,
  toneFromValue,
} from './core-panel-variants';

describe('CorePanel', () => {
  it('renders the label', () => {
    render(<CorePanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CorePanel label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CorePanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CorePanel label="Parent">
        <span>child content</span>
      </CorePanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CorePanelGroup', () => {
  it('renders every item', () => {
    render(
      <CorePanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CorePanelGroup items={[]} />);
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
    for (const tone of CORE_PANEL_TONES) {
      expect(isCorePanelTone(tone)).toBe(true);
    }
    expect(isCorePanelTone('bogus')).toBe(false);
  });
});
