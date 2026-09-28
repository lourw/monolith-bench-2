import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchInsightsPage } from './search-insights-page';
import { SearchInsightsSummary } from './search-insights-summary';
import {
  SEARCH_INSIGHTS_FEATURE,
  SEARCH_INSIGHTS_ROUTE,
} from './search-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_INSIGHTS_ROUTE]}>
      <SearchInsightsPage />
    </MemoryRouter>,
  );
}

describe('SearchInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<SearchInsightsSummary />);
    expect(
      screen.getByTestId(`${SEARCH_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
