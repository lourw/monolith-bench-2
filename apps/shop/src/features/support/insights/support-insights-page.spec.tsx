import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportInsightsPage } from './support-insights-page';
import { SupportInsightsSummary } from './support-insights-summary';
import {
  SUPPORT_INSIGHTS_FEATURE,
  SUPPORT_INSIGHTS_ROUTE,
} from './support-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_INSIGHTS_ROUTE]}>
      <SupportInsightsPage />
    </MemoryRouter>,
  );
}

describe('SupportInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUPPORT_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<SupportInsightsSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
