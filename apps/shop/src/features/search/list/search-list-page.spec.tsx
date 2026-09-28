import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchListPage } from './search-list-page';
import { SearchListSummary } from './search-list-summary';
import { SEARCH_LIST_FEATURE, SEARCH_LIST_ROUTE } from './search-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_LIST_ROUTE]}>
      <SearchListPage />
    </MemoryRouter>,
  );
}

describe('SearchListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(SEARCH_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_LIST_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${SEARCH_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${SEARCH_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchListSummary', () => {
  it('renders the summary block', () => {
    render(<SearchListSummary />);
    expect(
      screen.getByTestId(`${SEARCH_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
