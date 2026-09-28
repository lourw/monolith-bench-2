import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsHistoryPage } from './analytics-history-page';
import { AnalyticsHistorySummary } from './analytics-history-summary';
import {
  ANALYTICS_HISTORY_FEATURE,
  ANALYTICS_HISTORY_ROUTE,
} from './analytics-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_HISTORY_ROUTE]}>
      <AnalyticsHistoryPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsHistorySummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
