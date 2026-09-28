import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyHeader } from './typography-header';
import { TypographyHeaderGroup } from './typography-header-group';
import {
  TYPOGRAPHY_HEADER_TONES,
  isTypographyHeaderTone,
  toneFromValue,
} from './typography-header-variants';

describe('TypographyHeader', () => {
  it('renders the label', () => {
    render(<TypographyHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyHeader label="Parent">
        <span>child content</span>
      </TypographyHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-header-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyHeaderGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_HEADER_TONES) {
      expect(isTypographyHeaderTone(tone)).toBe(true);
    }
    expect(isTypographyHeaderTone('bogus')).toBe(false);
  });
});
