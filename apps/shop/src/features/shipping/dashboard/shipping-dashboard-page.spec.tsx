import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingDashboardPage } from './shipping-dashboard-page';
import { ShippingDashboardSummary } from './shipping-dashboard-summary';
import {
  SHIPPING_DASHBOARD_FEATURE,
  SHIPPING_DASHBOARD_ROUTE,
} from './shipping-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_DASHBOARD_ROUTE]}>
      <ShippingDashboardPage />
    </MemoryRouter>,
  );
}

describe('ShippingDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingDashboardSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
