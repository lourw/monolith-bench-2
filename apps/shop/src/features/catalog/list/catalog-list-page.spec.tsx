import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogListPage } from './catalog-list-page';
import { CatalogListSummary } from './catalog-list-summary';
import {
  CATALOG_LIST_FEATURE,
  CATALOG_LIST_ROUTE,
} from './catalog-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_LIST_ROUTE]}>
      <CatalogListPage />
    </MemoryRouter>,
  );
}

describe('CatalogListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(CATALOG_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_LIST_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CATALOG_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${CATALOG_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${CATALOG_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogListSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogListSummary />);
    expect(
      screen.getByTestId(`${CATALOG_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
