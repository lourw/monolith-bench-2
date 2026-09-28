import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogSummaryPage } from './catalog-summary-page';
import { CatalogSummarySummary } from './catalog-summary-summary';
import {
  CATALOG_SUMMARY_FEATURE,
  CATALOG_SUMMARY_ROUTE,
} from './catalog-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_SUMMARY_ROUTE]}>
      <CatalogSummaryPage />
    </MemoryRouter>,
  );
}

describe('CatalogSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogSummarySummary', () => {
  it('renders the summary block', () => {
    render(<CatalogSummarySummary />);
    expect(
      screen.getByTestId(`${CATALOG_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
