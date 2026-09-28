import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogInsightsPage } from './catalog-insights-page';
import { CatalogInsightsSummary } from './catalog-insights-summary';
import {
  CATALOG_INSIGHTS_FEATURE,
  CATALOG_INSIGHTS_ROUTE,
} from './catalog-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_INSIGHTS_ROUTE]}>
      <CatalogInsightsPage />
    </MemoryRouter>,
  );
}

describe('CatalogInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CATALOG_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogInsightsSummary />);
    expect(
      screen.getByTestId(`${CATALOG_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
