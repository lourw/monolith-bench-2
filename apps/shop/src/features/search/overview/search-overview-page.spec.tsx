import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchOverviewPage } from './search-overview-page';
import { SearchOverviewSummary } from './search-overview-summary';
import {
  SEARCH_OVERVIEW_FEATURE,
  SEARCH_OVERVIEW_ROUTE,
} from './search-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_OVERVIEW_ROUTE]}>
      <SearchOverviewPage />
    </MemoryRouter>,
  );
}

describe('SearchOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<SearchOverviewSummary />);
    expect(
      screen.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
