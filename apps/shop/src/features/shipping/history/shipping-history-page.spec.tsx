import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingHistoryPage } from './shipping-history-page';
import { ShippingHistorySummary } from './shipping-history-summary';
import {
  SHIPPING_HISTORY_FEATURE,
  SHIPPING_HISTORY_ROUTE,
} from './shipping-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_HISTORY_ROUTE]}>
      <ShippingHistoryPage />
    </MemoryRouter>,
  );
}

describe('ShippingHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingHistorySummary', () => {
  it('renders the summary block', () => {
    render(<ShippingHistorySummary />);
    expect(
      screen.getByTestId(`${SHIPPING_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
