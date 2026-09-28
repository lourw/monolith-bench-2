import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingPanel } from './marketing-panel';
import { MarketingPanelGroup } from './marketing-panel-group';
import {
  MARKETING_PANEL_TONES,
  isMarketingPanelTone,
  toneFromValue,
} from './marketing-panel-variants';

describe('MarketingPanel', () => {
  it('renders the label', () => {
    render(<MarketingPanel label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-panel')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingPanel label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingPanel label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-panel'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingPanel label="Parent">
        <span>child content</span>
      </MarketingPanel>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingPanelGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingPanelGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(
      screen.getByTestId('ui-marketing-panel-group-a'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-panel-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingPanelGroup items={[]} />);
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
    for (const tone of MARKETING_PANEL_TONES) {
      expect(isMarketingPanelTone(tone)).toBe(true);
    }
    expect(isMarketingPanelTone('bogus')).toBe(false);
  });
});
