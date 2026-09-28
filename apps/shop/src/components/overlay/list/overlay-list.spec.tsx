import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OverlayList } from './overlay-list';
import { OverlayListGroup } from './overlay-list-group';
import {
  OVERLAY_LIST_TONES,
  isOverlayListTone,
  toneFromValue,
} from './overlay-list-variants';

describe('OverlayList', () => {
  it('renders the label', () => {
    render(<OverlayList label="Total" value={42} />);
    expect(screen.getByTestId('ui-overlay-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <OverlayList label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<OverlayList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-overlay-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <OverlayList label="Parent">
        <span>child content</span>
      </OverlayList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('OverlayListGroup', () => {
  it('renders every item', () => {
    render(
      <OverlayListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-overlay-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-overlay-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<OverlayListGroup items={[]} />);
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
    for (const tone of OVERLAY_LIST_TONES) {
      expect(isOverlayListTone(tone)).toBe(true);
    }
    expect(isOverlayListTone('bogus')).toBe(false);
  });
});
