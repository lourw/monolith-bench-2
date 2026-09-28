import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistListPage } from './wishlist-list-page';
import { WishlistListSummary } from './wishlist-list-summary';
import {
  WISHLIST_LIST_FEATURE,
  WISHLIST_LIST_ROUTE,
} from './wishlist-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_LIST_ROUTE]}>
      <WishlistListPage />
    </MemoryRouter>,
  );
}

describe('WishlistListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_LIST_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${WISHLIST_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistListSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistListSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
