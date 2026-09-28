import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistInsightsPage } from './wishlist-insights-page';
import { WishlistInsightsSummary } from './wishlist-insights-summary';
import {
  WISHLIST_INSIGHTS_FEATURE,
  WISHLIST_INSIGHTS_ROUTE,
} from './wishlist-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_INSIGHTS_ROUTE]}>
      <WishlistInsightsPage />
    </MemoryRouter>,
  );
}

describe('WishlistInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistInsightsSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
