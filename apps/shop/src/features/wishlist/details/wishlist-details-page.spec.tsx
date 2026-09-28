import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistDetailsPage } from './wishlist-details-page';
import { WishlistDetailsSummary } from './wishlist-details-summary';
import {
  WISHLIST_DETAILS_FEATURE,
  WISHLIST_DETAILS_ROUTE,
} from './wishlist-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_DETAILS_ROUTE]}>
      <WishlistDetailsPage />
    </MemoryRouter>,
  );
}

describe('WishlistDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistDetailsSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
