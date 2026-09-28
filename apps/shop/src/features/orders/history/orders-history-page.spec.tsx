import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersHistoryPage } from './orders-history-page';
import { OrdersHistorySummary } from './orders-history-summary';
import {
  ORDERS_HISTORY_FEATURE,
  ORDERS_HISTORY_ROUTE,
} from './orders-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_HISTORY_ROUTE]}>
      <OrdersHistoryPage />
    </MemoryRouter>,
  );
}

describe('OrdersHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersHistorySummary', () => {
  it('renders the summary block', () => {
    render(<OrdersHistorySummary />);
    expect(
      screen.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
