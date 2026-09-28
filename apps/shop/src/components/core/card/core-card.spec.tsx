import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreCard } from './core-card';
import { CoreCardGroup } from './core-card-group';
import {
  CORE_CARD_TONES,
  isCoreCardTone,
  toneFromValue,
} from './core-card-variants';

describe('CoreCard', () => {
  it('renders the label', () => {
    render(<CoreCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-core-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<CoreCard label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CoreCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-core-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <CoreCard label="Parent">
        <span>child content</span>
      </CoreCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('CoreCardGroup', () => {
  it('renders every item', () => {
    render(
      <CoreCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-core-card-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-core-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<CoreCardGroup items={[]} />);
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
    for (const tone of CORE_CARD_TONES) {
      expect(isCoreCardTone(tone)).toBe(true);
    }
    expect(isCoreCardTone('bogus')).toBe(false);
  });
});
