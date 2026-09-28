import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsBadge } from './inputs-badge';
import { InputsBadgeGroup } from './inputs-badge-group';
import {
  INPUTS_BADGE_TONES,
  isInputsBadgeTone,
  toneFromValue,
} from './inputs-badge-variants';

describe('InputsBadge', () => {
  it('renders the label', () => {
    render(<InputsBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <InputsBadge label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsBadge label="Parent">
        <span>child content</span>
      </InputsBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <InputsBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsBadgeGroup items={[]} />);
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
    for (const tone of INPUTS_BADGE_TONES) {
      expect(isInputsBadgeTone(tone)).toBe(true);
    }
    expect(isInputsBadgeTone('bogus')).toBe(false);
  });
});
