import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistOverviewPage } from './wishlist-overview-page';
import { WishlistOverviewSummary } from './wishlist-overview-summary';
import {
  WISHLIST_OVERVIEW_FEATURE,
  WISHLIST_OVERVIEW_ROUTE,
} from './wishlist-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_OVERVIEW_ROUTE]}>
      <WishlistOverviewPage />
    </MemoryRouter>,
  );
}

describe('WishlistOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistOverviewSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
