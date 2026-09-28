import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsDashboardPage } from './analytics-dashboard-page';
import { AnalyticsDashboardSummary } from './analytics-dashboard-summary';
import {
  ANALYTICS_DASHBOARD_FEATURE,
  ANALYTICS_DASHBOARD_ROUTE,
} from './analytics-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_DASHBOARD_ROUTE]}>
      <AnalyticsDashboardPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsDashboardSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
