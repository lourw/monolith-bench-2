import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchHistoryPage } from './search-history-page';
import { SearchHistorySummary } from './search-history-summary';
import {
  SEARCH_HISTORY_FEATURE,
  SEARCH_HISTORY_ROUTE,
} from './search-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_HISTORY_ROUTE]}>
      <SearchHistoryPage />
    </MemoryRouter>,
  );
}

describe('SearchHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_HISTORY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchHistorySummary', () => {
  it('renders the summary block', () => {
    render(<SearchHistorySummary />);
    expect(
      screen.getByTestId(`${SEARCH_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
