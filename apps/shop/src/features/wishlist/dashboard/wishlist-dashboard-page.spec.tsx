import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { WishlistDashboardPage } from './wishlist-dashboard-page';
import { WishlistDashboardSummary } from './wishlist-dashboard-summary';
import {
  WISHLIST_DASHBOARD_FEATURE,
  WISHLIST_DASHBOARD_ROUTE,
} from './wishlist-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[WISHLIST_DASHBOARD_ROUTE]}>
      <WishlistDashboardPage />
    </MemoryRouter>,
  );
}

describe('WishlistDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(WISHLIST_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      WISHLIST_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(WISHLIST_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${WISHLIST_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('WishlistDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<WishlistDashboardSummary />);
    expect(
      screen.getByTestId(`${WISHLIST_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
