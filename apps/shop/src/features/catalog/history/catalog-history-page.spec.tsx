import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogHistoryPage } from './catalog-history-page';
import { CatalogHistorySummary } from './catalog-history-summary';
import {
  CATALOG_HISTORY_FEATURE,
  CATALOG_HISTORY_ROUTE,
} from './catalog-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_HISTORY_ROUTE]}>
      <CatalogHistoryPage />
    </MemoryRouter>,
  );
}

describe('CatalogHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CATALOG_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogHistorySummary', () => {
  it('renders the summary block', () => {
    render(<CatalogHistorySummary />);
    expect(
      screen.getByTestId(`${CATALOG_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
