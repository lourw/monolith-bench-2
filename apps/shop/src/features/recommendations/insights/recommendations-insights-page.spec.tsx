import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsInsightsPage } from './recommendations-insights-page';
import { RecommendationsInsightsSummary } from './recommendations-insights-summary';
import {
  RECOMMENDATIONS_INSIGHTS_FEATURE,
  RECOMMENDATIONS_INSIGHTS_ROUTE,
} from './recommendations-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_INSIGHTS_ROUTE]}>
      <RecommendationsInsightsPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsInsightsSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
