import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsInsightsPage } from './promotions-insights-page';
import { PromotionsInsightsSummary } from './promotions-insights-summary';
import {
  PROMOTIONS_INSIGHTS_FEATURE,
  PROMOTIONS_INSIGHTS_ROUTE,
} from './promotions-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_INSIGHTS_ROUTE]}>
      <PromotionsInsightsPage />
    </MemoryRouter>,
  );
}

describe('PromotionsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsInsightsSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
