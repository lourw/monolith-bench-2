import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsSummaryPage } from './analytics-summary-page';
import { AnalyticsSummarySummary } from './analytics-summary-summary';
import {
  ANALYTICS_SUMMARY_FEATURE,
  ANALYTICS_SUMMARY_ROUTE,
} from './analytics-summary.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_SUMMARY_ROUTE]}>
      <AnalyticsSummaryPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsSummaryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_SUMMARY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_SUMMARY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_SUMMARY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_SUMMARY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsSummarySummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsSummarySummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_SUMMARY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
