import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MarketingList } from './marketing-list';
import { MarketingListGroup } from './marketing-list-group';
import {
  MARKETING_LIST_TONES,
  isMarketingListTone,
  toneFromValue,
} from './marketing-list-variants';

describe('MarketingList', () => {
  it('renders the label', () => {
    render(<MarketingList label="Total" value={42} />);
    expect(screen.getByTestId('ui-marketing-list')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('applies tone and size attributes', () => {
    render(
      <MarketingList label="Tone" tone="danger" size="lg" testId="custom" />,
    );
    const el = screen.getByTestId('custom');
    expect(el).toHaveAttribute('data-tone', 'danger');
    expect(el).toHaveAttribute('data-size', 'lg');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<MarketingList label="Click me" onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('ui-marketing-list'));
    expect(onSelect).toHaveBeenCalledWith('Click me');
  });

  it('renders children', () => {
    render(
      <MarketingList label="Parent">
        <span>child content</span>
      </MarketingList>,
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

describe('MarketingListGroup', () => {
  it('renders every item', () => {
    render(
      <MarketingListGroup
        title="Group"
        items={[
          { id: 'a', label: 'Alpha', value: 1 },
          { id: 'b', label: 'Beta', value: -1 },
        ]}
      />,
    );
    expect(screen.getByTestId('ui-marketing-list-group-a')).toBeInTheDocument();
    expect(screen.getByTestId('ui-marketing-list-group-b')).toHaveAttribute(
      'data-tone',
      'danger',
    );
  });

  it('shows an empty message', () => {
    render(<MarketingListGroup items={[]} />);
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
    for (const tone of MARKETING_LIST_TONES) {
      expect(isMarketingListTone(tone)).toBe(true);
    }
    expect(isMarketingListTone('bogus')).toBe(false);
  });
});
