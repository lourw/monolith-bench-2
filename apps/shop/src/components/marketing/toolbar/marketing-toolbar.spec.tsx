import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingToolbar } from './marketing-toolbar';
import { MarketingToolbarGroup } from './marketing-toolbar-group';
import {
  MARKETING_TOOLBAR_TONES,
  isMarketingToolbarTone,
  toneFromValue,
} from './marketing-toolbar-variants';

describe('MarketingToolbar', () => {
  it('renders the label', () => {
    render(<MarketingToolbar label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-toolbar')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingToolbar label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingToolbar label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-toolbar'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingToolbar label="Parent">
        <span>child content</span>
      </MarketingToolbar>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingToolbarGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingToolbarGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-marketing-toolbar-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-toolbar-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingToolbarGroup items={[]} />);
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
    for (const tone of MARKETING_TOOLBAR_TONES) {
      expect(isMarketingToolbarTone(tone)).toBe(true);
    }
    expect(isMarketingToolbarTone('bogus')).toBe(false);
  });
});
