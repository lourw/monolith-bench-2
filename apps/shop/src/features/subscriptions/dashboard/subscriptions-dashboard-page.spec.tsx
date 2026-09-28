import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsDashboardPage } from './subscriptions-dashboard-page';
import { SubscriptionsDashboardSummary } from './subscriptions-dashboard-summary';
import {
  SUBSCRIPTIONS_DASHBOARD_FEATURE,
  SUBSCRIPTIONS_DASHBOARD_ROUTE,
} from './subscriptions-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_DASHBOARD_ROUTE]}>
      <SubscriptionsDashboardPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsDashboardSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
