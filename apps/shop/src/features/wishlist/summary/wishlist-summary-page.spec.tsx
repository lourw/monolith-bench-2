import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistSummaryPage } from './wishlist-summary-page';
import { WishlistSummarySummary } from './wishlist-summary-summary';
import {
  WISHLIST_SUMMARY_FEATURE,
  WISHLIST_SUMMARY_ROUTE,
} from './wishlist-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_SUMMARY_ROUTE]}>
      <WishlistSummaryPage />
    </MemoryRouter>,
  );
}

describe('WishlistSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistSummarySummary', () => {
  it('renders the summary block', () => {
    render(<WishlistSummarySummary />);
    expect(
      screen.getByTestId(`${WISHLIST_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
