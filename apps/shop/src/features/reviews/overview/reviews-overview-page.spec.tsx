import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsOverviewPage } from './reviews-overview-page';
import { ReviewsOverviewSummary } from './reviews-overview-summary';
import {
  REVIEWS_OVERVIEW_FEATURE,
  REVIEWS_OVERVIEW_ROUTE,
} from './reviews-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_OVERVIEW_ROUTE]}>
      <ReviewsOverviewPage />
    </MemoryRouter>,
  );
}

describe('ReviewsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${REVIEWS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsOverviewSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
