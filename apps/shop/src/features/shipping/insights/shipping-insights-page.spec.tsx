import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingInsightsPage } from './shipping-insights-page';
import { ShippingInsightsSummary } from './shipping-insights-summary';
import {
  SHIPPING_INSIGHTS_FEATURE,
  SHIPPING_INSIGHTS_ROUTE,
} from './shipping-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_INSIGHTS_ROUTE]}>
      <ShippingInsightsPage />
    </MemoryRouter>,
  );
}

describe('ShippingInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingInsightsSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
