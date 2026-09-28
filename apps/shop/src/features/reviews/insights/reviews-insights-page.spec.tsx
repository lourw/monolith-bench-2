import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsInsightsPage } from './reviews-insights-page';
import { ReviewsInsightsSummary } from './reviews-insights-summary';
import {
  REVIEWS_INSIGHTS_FEATURE,
  REVIEWS_INSIGHTS_ROUTE,
} from './reviews-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_INSIGHTS_ROUTE]}>
      <ReviewsInsightsPage />
    </MemoryRouter>,
  );
}

describe('ReviewsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${REVIEWS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsInsightsSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
