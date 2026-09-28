import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TypographyList } from './typography-list';
import { TypographyListGroup } from './typography-list-group';
import {
  TYPOGRAPHY_LIST_TONES,
  isTypographyListTone,
  toneFromValue,
} from './typography-list-variants';

describe('TypographyList', () => {
  it('renders the label', () => {
    render(<TypographyList label="Total" value={42} />);
    expect(screen.getByTestId('ui-typography-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <TypographyList label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<TypographyList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-typography-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <TypographyList label="Parent">
        <span>child content</span>
      </TypographyList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('TypographyListGroup', () => {
  it('renders every item', () => {
    render(
      <TypographyListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-typography-list-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-typography-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<TypographyListGroup items={[]} />);
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
    for (const tone of TYPOGRAPHY_LIST_TONES) {
      expect(isTypographyListTone(tone)).toBe(true);
    }
    expect(isTypographyListTone('bogus')).toBe(false);
  });
});
