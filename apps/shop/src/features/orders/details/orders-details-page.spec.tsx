import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersDetailsPage } from './orders-details-page';
import { OrdersDetailsSummary } from './orders-details-summary';
import {
  ORDERS_DETAILS_FEATURE,
  ORDERS_DETAILS_ROUTE,
} from './orders-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_DETAILS_ROUTE]}>
      <OrdersDetailsPage />
    </MemoryRouter>,
  );
}

describe('OrdersDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersDetailsSummary />);
    expect(
      screen.getByTestId(`${ORDERS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
