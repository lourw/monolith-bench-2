import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersListPage } from './orders-list-page';
import { OrdersListSummary } from './orders-list-summary';
import { ORDERS_LIST_FEATURE, ORDERS_LIST_ROUTE } from './orders-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_LIST_ROUTE]}>
      <OrdersListPage />
    </MemoryRouter>,
  );
}

describe('OrdersListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(ORDERS_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${ORDERS_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${ORDERS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersListSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersListSummary />);
    expect(
      screen.getByTestId(`${ORDERS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
