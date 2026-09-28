import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchSummaryPage } from './search-summary-page';
import { SearchSummarySummary } from './search-summary-summary';
import {
  SEARCH_SUMMARY_FEATURE,
  SEARCH_SUMMARY_ROUTE,
} from './search-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_SUMMARY_ROUTE]}>
      <SearchSummaryPage />
    </MemoryRouter>,
  );
}

describe('SearchSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchSummarySummary', () => {
  it('renders the summary block', () => {
    render(<SearchSummarySummary />);
    expect(
      screen.getByTestId(`${SEARCH_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
