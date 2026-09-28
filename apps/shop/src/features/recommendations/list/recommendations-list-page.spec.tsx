import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsListPage } from './recommendations-list-page';
import { RecommendationsListSummary } from './recommendations-list-summary';
import {
  RECOMMENDATIONS_LIST_FEATURE,
  RECOMMENDATIONS_LIST_ROUTE,
} from './recommendations-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_LIST_ROUTE]}>
      <RecommendationsListPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_LIST_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsListSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsListSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
