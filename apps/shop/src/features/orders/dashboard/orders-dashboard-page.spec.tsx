import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersDashboardPage } from './orders-dashboard-page';
import { OrdersDashboardSummary } from './orders-dashboard-summary';
import {
  ORDERS_DASHBOARD_FEATURE,
  ORDERS_DASHBOARD_ROUTE,
} from './orders-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_DASHBOARD_ROUTE]}>
      <OrdersDashboardPage />
    </MemoryRouter>,
  );
}

describe('OrdersDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ORDERS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersDashboardSummary />);
    expect(
      screen.getByTestId(`${ORDERS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
