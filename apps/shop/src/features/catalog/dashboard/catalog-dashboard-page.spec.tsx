import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogDashboardPage } from './catalog-dashboard-page';
import { CatalogDashboardSummary } from './catalog-dashboard-summary';
import {
  CATALOG_DASHBOARD_FEATURE,
  CATALOG_DASHBOARD_ROUTE,
} from './catalog-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_DASHBOARD_ROUTE]}>
      <CatalogDashboardPage />
    </MemoryRouter>,
  );
}

describe('CatalogDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CATALOG_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogDashboardSummary />);
    expect(
      screen.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
