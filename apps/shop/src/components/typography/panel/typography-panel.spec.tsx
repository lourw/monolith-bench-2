import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyPanel } from './typography-panel';
import { TypographyPanelGroup } from './typography-panel-group';
import {
  TYPOGRAPHY_PANEL_TONES,
  isTypographyPanelTone,
  toneFromValue,
} from './typography-panel-variants';

describe('TypographyPanel', () => {
  it('renders the label', () => {
    render(<TypographyPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyPanel label="Parent">
        <span>child content</span>
      </TypographyPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyPanelGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-panel-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyPanelGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_PANEL_TONES) {
      expect(isTypographyPanelTone(tone)).toBe(true);
    }
    expect(isTypographyPanelTone('bogus')).toBe(false);
  });
});
