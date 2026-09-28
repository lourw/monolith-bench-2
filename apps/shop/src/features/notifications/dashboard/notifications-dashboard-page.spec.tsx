import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsDashboardPage } from './notifications-dashboard-page';
import { NotificationsDashboardSummary } from './notifications-dashboard-summary';
import {
  NOTIFICATIONS_DASHBOARD_FEATURE,
  NOTIFICATIONS_DASHBOARD_ROUTE,
} from './notifications-dashboard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_DASHBOARD_ROUTE]}>
      <NotificationsDashboardPage />
    </MemoryRouter>,
  );
}

describe('NotificationsDashboardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_DASHBOARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_DASHBOARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_DASHBOARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(
        `${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsDashboardSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsDashboardSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
