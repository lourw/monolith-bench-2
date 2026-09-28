import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogDetailsPage } from './catalog-details-page';
import { CatalogDetailsSummary } from './catalog-details-summary';
import {
  CATALOG_DETAILS_FEATURE,
  CATALOG_DETAILS_ROUTE,
} from './catalog-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_DETAILS_ROUTE]}>
      <CatalogDetailsPage />
    </MemoryRouter>,
  );
}

describe('CatalogDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CATALOG_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogDetailsSummary />);
    expect(
      screen.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
