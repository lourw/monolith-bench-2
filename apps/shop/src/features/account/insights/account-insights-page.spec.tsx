import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountInsightsPage } from './account-insights-page';
import { AccountInsightsSummary } from './account-insights-summary';
import {
  ACCOUNT_INSIGHTS_FEATURE,
  ACCOUNT_INSIGHTS_ROUTE,
} from './account-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_INSIGHTS_ROUTE]}>
      <AccountInsightsPage />
    </MemoryRouter>,
  );
}

describe('AccountInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ACCOUNT_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<AccountInsightsSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
