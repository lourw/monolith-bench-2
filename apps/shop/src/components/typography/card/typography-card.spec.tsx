import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyCard } from './typography-card';
import { TypographyCardGroup } from './typography-card-group';
import {
  TYPOGRAPHY_CARD_TONES,
  isTypographyCardTone,
  toneFromValue,
} from './typography-card-variants';

describe('TypographyCard', () => {
  it('renders the label', () => {
    render(<TypographyCard label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-card')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyCard label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyCard label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-card'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyCard label="Parent">
        <span>child content</span>
      </TypographyCard>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyCardGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyCardGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-card-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-card-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyCardGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_CARD_TONES) {
      expect(isTypographyCardTone(tone)).toBe(true);
    }
    expect(isTypographyCardTone('bogus')).toBe(false);
  });
});
