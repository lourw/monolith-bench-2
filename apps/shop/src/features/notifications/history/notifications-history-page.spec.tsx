import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsHistoryPage } from './notifications-history-page';
import { NotificationsHistorySummary } from './notifications-history-summary';
import {
  NOTIFICATIONS_HISTORY_FEATURE,
  NOTIFICATIONS_HISTORY_ROUTE,
} from './notifications-history.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_HISTORY_ROUTE]}>
      <NotificationsHistoryPage />
    </MemoryRouter>,
  );
}

describe('NotificationsHistoryPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_HISTORY_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_HISTORY_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_HISTORY_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_HISTORY_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${NOTIFICATIONS_HISTORY_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsHistorySummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsHistorySummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_HISTORY_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
