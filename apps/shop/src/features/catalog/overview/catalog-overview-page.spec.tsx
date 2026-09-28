import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogOverviewPage } from './catalog-overview-page';
import { CatalogOverviewSummary } from './catalog-overview-summary';
import {
  CATALOG_OVERVIEW_FEATURE,
  CATALOG_OVERVIEW_ROUTE,
} from './catalog-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_OVERVIEW_ROUTE]}>
      <CatalogOverviewPage />
    </MemoryRouter>,
  );
}

describe('CatalogOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CATALOG_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogOverviewSummary />);
    expect(
      screen.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
