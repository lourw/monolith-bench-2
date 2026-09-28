import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataBadge } from './data-badge';
import { DataBadgeGroup } from './data-badge-group';
import {
  DATA_BADGE_TONES,
  isDataBadgeTone,
  toneFromValue,
} from './data-badge-variants';

describe('DataBadge', () => {
  it('renders the label', () => {
    render(<DataBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataBadge label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataBadge label="Parent">
        <span>child content</span>
      </DataBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <DataBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataBadgeGroup items={[]} />);
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
    for (const tone of DATA_BADGE_TONES) {
      expect(isDataBadgeTone(tone)).toBe(true);
    }
    expect(isDataBadgeTone('bogus')).toBe(false);
  });
});
