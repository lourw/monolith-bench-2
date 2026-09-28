import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsInsightsPage } from './notifications-insights-page';
import { NotificationsInsightsSummary } from './notifications-insights-summary';
import {
  NOTIFICATIONS_INSIGHTS_FEATURE,
  NOTIFICATIONS_INSIGHTS_ROUTE,
} from './notifications-insights.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_INSIGHTS_ROUTE]}>
      <NotificationsInsightsPage />
    </MemoryRouter>,
  );
}

describe('NotificationsInsightsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_INSIGHTS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_INSIGHTS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_INSIGHTS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsInsightsSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsInsightsSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
