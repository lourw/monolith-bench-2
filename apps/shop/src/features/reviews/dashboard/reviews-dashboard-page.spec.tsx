import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsDashboardPage } from './reviews-dashboard-page';
import { ReviewsDashboardSummary } from './reviews-dashboard-summary';
import {
  REVIEWS_DASHBOARD_FEATURE,
  REVIEWS_DASHBOARD_ROUTE,
} from './reviews-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_DASHBOARD_ROUTE]}>
      <ReviewsDashboardPage />
    </MemoryRouter>,
  );
}

describe('ReviewsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${REVIEWS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsDashboardSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
