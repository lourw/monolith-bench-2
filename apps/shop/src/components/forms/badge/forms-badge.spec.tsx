import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FormsBadge } from './forms-badge';
import { FormsBadgeGroup } from './forms-badge-group';
import {
  FORMS_BADGE_TONES,
  isFormsBadgeTone,
  toneFromValue,
} from './forms-badge-variants';

describe('FormsBadge', () => {
  it('renders the label', () => {
    render(<FormsBadge label="Total" value={42} />);
    expect(screen.getByTestId('ui-forms-badge')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(<FormsBadge label="Tone" tone="danger" size="lg" testId="custom" />);
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FormsBadge label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-forms-badge'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <FormsBadge label="Parent">
        <span>child content</span>
      </FormsBadge>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('FormsBadgeGroup', () => {
  it('renders every item', () => {
    render(
      <FormsBadgeGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-forms-badge-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-forms-badge-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<FormsBadgeGroup items={[]} />);
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
    for (const tone of FORMS_BADGE_TONES) {
      expect(isFormsBadgeTone(tone)).toBe(true);
    }
    expect(isFormsBadgeTone('bogus')).toBe(false);
  });
});
