import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsInsightsPage } from './payments-insights-page';
import { PaymentsInsightsSummary } from './payments-insights-summary';
import {
  PAYMENTS_INSIGHTS_FEATURE,
  PAYMENTS_INSIGHTS_ROUTE,
} from './payments-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_INSIGHTS_ROUTE]}>
      <PaymentsInsightsPage />
    </MemoryRouter>,
  );
}

describe('PaymentsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsInsightsSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
