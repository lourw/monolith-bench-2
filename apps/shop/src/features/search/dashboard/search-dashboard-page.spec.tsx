import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchDashboardPage } from './search-dashboard-page';
import { SearchDashboardSummary } from './search-dashboard-summary';
import {
  SEARCH_DASHBOARD_FEATURE,
  SEARCH_DASHBOARD_ROUTE,
} from './search-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_DASHBOARD_ROUTE]}>
      <SearchDashboardPage />
    </MemoryRouter>,
  );
}

describe('SearchDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SEARCH_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<SearchDashboardSummary />);
    expect(
      screen.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
