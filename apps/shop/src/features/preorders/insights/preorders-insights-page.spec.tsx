import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PreordersInsightsPage } from './preorders-insights-page';
import { PreordersInsightsSummary } from './preorders-insights-summary';
import {
  PREORDERS_INSIGHTS_FEATURE,
  PREORDERS_INSIGHTS_ROUTE,
} from './preorders-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PREORDERS_INSIGHTS_ROUTE]}>
      <PreordersInsightsPage />
    </MemoryRouter>,
  );
}

describe('PreordersInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PREORDERS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PREORDERS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(PREORDERS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PREORDERS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PreordersInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<PreordersInsightsSummary />);
    expect(
      screen.getByTestId(`${PREORDERS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
