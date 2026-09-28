import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyDashboardPage } from './loyalty-dashboard-page';
import { LoyaltyDashboardSummary } from './loyalty-dashboard-summary';
import {
  LOYALTY_DASHBOARD_FEATURE,
  LOYALTY_DASHBOARD_ROUTE,
} from './loyalty-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_DASHBOARD_ROUTE]}>
      <LoyaltyDashboardPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${LOYALTY_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyDashboardSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
