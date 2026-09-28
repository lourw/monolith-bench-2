import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareInsightsPage } from './compare-insights-page';
import { CompareInsightsSummary } from './compare-insights-summary';
import {
  COMPARE_INSIGHTS_FEATURE,
  COMPARE_INSIGHTS_ROUTE,
} from './compare-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_INSIGHTS_ROUTE]}>
      <CompareInsightsPage />
    </MemoryRouter>,
  );
}

describe('CompareInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${COMPARE_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<CompareInsightsSummary />);
    expect(
      screen.getByTestId(`${COMPARE_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
