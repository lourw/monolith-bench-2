import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyInsightsPage } from './loyalty-insights-page';
import { LoyaltyInsightsSummary } from './loyalty-insights-summary';
import {
  LOYALTY_INSIGHTS_FEATURE,
  LOYALTY_INSIGHTS_ROUTE,
} from './loyalty-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_INSIGHTS_ROUTE]}>
      <LoyaltyInsightsPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${LOYALTY_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyInsightsSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
