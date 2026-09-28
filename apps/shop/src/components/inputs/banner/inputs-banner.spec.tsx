import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { InputsBanner } from './inputs-banner';
import { InputsBannerGroup } from './inputs-banner-group';
import {
  INPUTS_BANNER_TONES,
  isInputsBannerTone,
  toneFromValue,
} from './inputs-banner-variants';

describe('InputsBanner', () => {
  it('renders the label', () => {
    render(<InputsBanner label="Total" value={42} />);
    expect(screen.getByTestId('ui-inputs-banner')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <InputsBanner label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<InputsBanner label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-inputs-banner'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <InputsBanner label="Parent">
        <span>child content</span>
      </InputsBanner>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('InputsBannerGroup', () => {
  it('renders every item', () => {
    render(
      <InputsBannerGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-inputs-banner-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-inputs-banner-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<InputsBannerGroup items={[]} />);
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
    for (const tone of INPUTS_BANNER_TONES) {
      expect(isInputsBannerTone(tone)).toBe(true);
    }
    expect(isInputsBannerTone('bogus')).toBe(false);
  });
});
