import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchDetailsPage } from './search-details-page';
import { SearchDetailsSummary } from './search-details-summary';
import {
  SEARCH_DETAILS_FEATURE,
  SEARCH_DETAILS_ROUTE,
} from './search-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_DETAILS_ROUTE]}>
      <SearchDetailsPage />
    </MemoryRouter>,
  );
}

describe('SearchDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_DETAILS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<SearchDetailsSummary />);
    expect(
      screen.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
