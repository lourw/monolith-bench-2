import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayHeader } from './overlay-header';
import { OverlayHeaderGroup } from './overlay-header-group';
import {
  OVERLAY_HEADER_TONES,
  isOverlayHeaderTone,
  toneFromValue,
} from './overlay-header-variants';

describe('OverlayHeader', () => {
  it('renders the label', () => {
    render(<OverlayHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayHeader label="Parent">
        <span>child content</span>
      </OverlayHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayHeaderGroup items={[]} />);
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
    for (const tone of OVERLAY_HEADER_TONES) {
      expect(isOverlayHeaderTone(tone)).toBe(true);
    }
    expect(isOverlayHeaderTone('bogus')).toBe(false);
  });
});
