import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsListPage } from './notifications-list-page';
import { NotificationsListSummary } from './notifications-list-summary';
import {
  NOTIFICATIONS_LIST_FEATURE,
  NOTIFICATIONS_LIST_ROUTE,
} from './notifications-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_LIST_ROUTE]}>
      <NotificationsListPage />
    </MemoryRouter>,
  );
}

describe('NotificationsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_LIST_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_LIST_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsListSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsListSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
