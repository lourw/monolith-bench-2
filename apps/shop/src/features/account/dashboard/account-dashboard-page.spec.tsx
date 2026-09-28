import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountDashboardPage } from './account-dashboard-page';
import { AccountDashboardSummary } from './account-dashboard-summary';
import {
  ACCOUNT_DASHBOARD_FEATURE,
  ACCOUNT_DASHBOARD_ROUTE,
} from './account-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_DASHBOARD_ROUTE]}>
      <AccountDashboardPage />
    </MemoryRouter>,
  );
}

describe('AccountDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ACCOUNT_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<AccountDashboardSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
