import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MediaHeader } from './media-header';
import { MediaHeaderGroup } from './media-header-group';
import {
  MEDIA_HEADER_TONES,
  isMediaHeaderTone,
  toneFromValue,
} from './media-header-variants';

describe('MediaHeader', () => {
  it('renders the label', () => {
    render(<MediaHeader label="Total" value={42} />);
    expect(screen.getByTestId('ui-media-header')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MediaHeader label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MediaHeader label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-media-header'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MediaHeader label="Parent">
        <span>child content</span>
      </MediaHeader>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MediaHeaderGroup', () => {
  it('renders every item', () => {
    render(
      <MediaHeaderGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-media-header-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-media-header-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MediaHeaderGroup items={[]} />);
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
    for (const tone of MEDIA_HEADER_TONES) {
      expect(isMediaHeaderTone(tone)).toBe(true);
    }
    expect(isMediaHeaderTone('bogus')).toBe(false);
  });
});
