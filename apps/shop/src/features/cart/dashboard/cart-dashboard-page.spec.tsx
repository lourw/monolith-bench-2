import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartDashboardPage } from './cart-dashboard-page';
import { CartDashboardSummary } from './cart-dashboard-summary';
import {
  CART_DASHBOARD_FEATURE,
  CART_DASHBOARD_ROUTE,
} from './cart-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CART_DASHBOARD_ROUTE]}>
      <CartDashboardPage />
    </MemoryRouter>,
  );
}

describe('CartDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CART_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CART_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CART_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(CART_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CART_DASHBOARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CART_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CART_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CART_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CART_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CART_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CartDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<CartDashboardSummary />);
    expect(
      screen.getByTestId(`${CART_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
