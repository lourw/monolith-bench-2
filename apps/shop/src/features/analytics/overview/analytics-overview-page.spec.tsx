import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsOverviewPage } from './analytics-overview-page';
import { AnalyticsOverviewSummary } from './analytics-overview-summary';
import {
  ANALYTICS_OVERVIEW_FEATURE,
  ANALYTICS_OVERVIEW_ROUTE,
} from './analytics-overview.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_OVERVIEW_ROUTE]}>
      <AnalyticsOverviewPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsOverviewPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_OVERVIEW_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_OVERVIEW_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_OVERVIEW_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_OVERVIEW_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsOverviewSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsOverviewSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
