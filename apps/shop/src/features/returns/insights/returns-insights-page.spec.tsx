import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsInsightsPage } from './returns-insights-page';
import { ReturnsInsightsSummary } from './returns-insights-summary';
import {
  RETURNS_INSIGHTS_FEATURE,
  RETURNS_INSIGHTS_ROUTE,
} from './returns-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_INSIGHTS_ROUTE]}>
      <ReturnsInsightsPage />
    </MemoryRouter>,
  );
}

describe('ReturnsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RETURNS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsInsightsSummary />);
    expect(
      screen.getByTestId(`${RETURNS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
