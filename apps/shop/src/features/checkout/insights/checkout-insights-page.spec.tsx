import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutInsightsPage } from './checkout-insights-page';
import { CheckoutInsightsSummary } from './checkout-insights-summary';
import {
  CHECKOUT_INSIGHTS_FEATURE,
  CHECKOUT_INSIGHTS_ROUTE,
} from './checkout-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_INSIGHTS_ROUTE]}>
      <CheckoutInsightsPage />
    </MemoryRouter>,
  );
}

describe('CheckoutInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CHECKOUT_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutInsightsSummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
