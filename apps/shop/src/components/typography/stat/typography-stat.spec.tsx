import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyStat } from './typography-stat';
import { TypographyStatGroup } from './typography-stat-group';
import {
  TYPOGRAPHY_STAT_TONES,
  isTypographyStatTone,
  toneFromValue,
} from './typography-stat-variants';

describe('TypographyStat', () => {
  it('renders the label', () => {
    render(<TypographyStat label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-stat')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyStat label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyStat label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-stat'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyStat label="Parent">
        <span>child content</span>
      </TypographyStat>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyStatGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyStatGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-stat-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-stat-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyStatGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_STAT_TONES) {
      expect(isTypographyStatTone(tone)).toBe(true);
    }
    expect(isTypographyStatTone('bogus')).toBe(false);
  });
});
