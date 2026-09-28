import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthDashboardPage } from './auth-dashboard-page';
import { AuthDashboardSummary } from './auth-dashboard-summary';
import {
  AUTH_DASHBOARD_FEATURE,
  AUTH_DASHBOARD_ROUTE,
} from './auth-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_DASHBOARD_ROUTE]}>
      <AuthDashboardPage />
    </MemoryRouter>,
  );
}

describe('AuthDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(AUTH_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<AuthDashboardSummary />);
    expect(
      screen.getByTestId(`${AUTH_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
