import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsDashboardPage } from './payments-dashboard-page';
import { PaymentsDashboardSummary } from './payments-dashboard-summary';
import {
  PAYMENTS_DASHBOARD_FEATURE,
  PAYMENTS_DASHBOARD_ROUTE,
} from './payments-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_DASHBOARD_ROUTE]}>
      <PaymentsDashboardPage />
    </MemoryRouter>,
  );
}

describe('PaymentsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsDashboardSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
