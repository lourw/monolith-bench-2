import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { StoreLocatorInsightsPage } from './store-locator-insights-page';
import { StoreLocatorInsightsSummary } from './store-locator-insights-summary';
import {
  STORE_LOCATOR_INSIGHTS_FEATURE,
  STORE_LOCATOR_INSIGHTS_ROUTE,
} from './store-locator-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[STORE_LOCATOR_INSIGHTS_ROUTE]}>
      <StoreLocatorInsightsPage />
    </MemoryRouter>,
  );
}

describe('StoreLocatorInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(STORE_LOCATOR_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      STORE_LOCATOR_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(STORE_LOCATOR_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('StoreLocatorInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<StoreLocatorInsightsSummary />);
    expect(
      screen.getByTestId(`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
