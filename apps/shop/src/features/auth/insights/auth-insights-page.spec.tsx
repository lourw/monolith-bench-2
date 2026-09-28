import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthInsightsPage } from './auth-insights-page';
import { AuthInsightsSummary } from './auth-insights-summary';
import {
  AUTH_INSIGHTS_FEATURE,
  AUTH_INSIGHTS_ROUTE,
} from './auth-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_INSIGHTS_ROUTE]}>
      <AuthInsightsPage />
    </MemoryRouter>,
  );
}

describe('AuthInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(AUTH_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<AuthInsightsSummary />);
    expect(
      screen.getByTestId(`${AUTH_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
