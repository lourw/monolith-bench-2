import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsDetailsPage } from './recommendations-details-page';
import { RecommendationsDetailsSummary } from './recommendations-details-summary';
import {
  RECOMMENDATIONS_DETAILS_FEATURE,
  RECOMMENDATIONS_DETAILS_ROUTE,
} from './recommendations-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_DETAILS_ROUTE]}>
      <RecommendationsDetailsPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${RECOMMENDATIONS_DETAILS_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_DETAILS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsDetailsSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
