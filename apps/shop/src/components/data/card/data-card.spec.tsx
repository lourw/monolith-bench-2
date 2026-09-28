import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataCard } from './data-card';
import { DataCardGroup } from './data-card-group';
import {
  DATA_CARD_TONES,
  isDataCardTone,
  toneFromValue,
} from './data-card-variants';

describe('DataCard', () => {
  it('renders the label', () => {
    render(<DataCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-data-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<DataCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<DataCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-data-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <DataCard label="Parent">
        <span>child content</span>
      </DataCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('DataCardGroup', () => {
  it('renders every item', () => {
    render(
      <DataCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-data-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-data-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<DataCardGroup items={[]} />);
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
    for (const tone of DATA_CARD_TONES) {
      expect(isDataCardTone(tone)).toBe(true);
    }
    expect(isDataCardTone('bogus')).toBe(false);
  });
});
