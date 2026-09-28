import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsListPage } from './reviews-list-page';
import { ReviewsListSummary } from './reviews-list-summary';
import {
  REVIEWS_LIST_FEATURE,
  REVIEWS_LIST_ROUTE,
} from './reviews-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_LIST_ROUTE]}>
      <ReviewsListPage />
    </MemoryRouter>,
  );
}

describe('ReviewsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(REVIEWS_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${REVIEWS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${REVIEWS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsListSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsListSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
