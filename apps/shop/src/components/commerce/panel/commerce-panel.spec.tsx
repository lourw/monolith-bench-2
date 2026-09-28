import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommercePanel } from './commerce-panel';
import { CommercePanelGroup } from './commerce-panel-group';
import {
  COMMERCE_PANEL_TONES,
  isCommercePanelTone,
  toneFromValue,
} from './commerce-panel-variants';

describe('CommercePanel', () => {
  it('renders the label', () => {
    render(<CommercePanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-commerce-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <CommercePanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CommercePanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-commerce-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CommercePanel label="Parent">
        <span>child content</span>
      </CommercePanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CommercePanelGroup', () => {
  it('renders every item', () => {
    render(
      <CommercePanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-commerce-panel-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-commerce-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CommercePanelGroup items={[]} />);
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
    for (const tone of COMMERCE_PANEL_TONES) {
      expect(isCommercePanelTone(tone)).toBe(true);
    }
    expect(isCommercePanelTone('bogus')).toBe(false);
  });
});
