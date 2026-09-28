import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsInsightsPage } from './analytics-insights-page';
import { AnalyticsInsightsSummary } from './analytics-insights-summary';
import {
  ANALYTICS_INSIGHTS_FEATURE,
  ANALYTICS_INSIGHTS_ROUTE,
} from './analytics-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_INSIGHTS_ROUTE]}>
      <AnalyticsInsightsPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsInsightsSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
