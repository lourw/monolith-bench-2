import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsSummaryPage } from './reviews-summary-page';
import { ReviewsSummarySummary } from './reviews-summary-summary';
import {
  REVIEWS_SUMMARY_FEATURE,
  REVIEWS_SUMMARY_ROUTE,
} from './reviews-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_SUMMARY_ROUTE]}>
      <ReviewsSummaryPage />
    </MemoryRouter>,
  );
}

describe('ReviewsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsSummarySummary />);
    expect(
      screen.getByTestId(`${REVIEWS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
