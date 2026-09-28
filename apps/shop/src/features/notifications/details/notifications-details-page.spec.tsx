import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsDetailsPage } from './notifications-details-page';
import { NotificationsDetailsSummary } from './notifications-details-summary';
import {
  NOTIFICATIONS_DETAILS_FEATURE,
  NOTIFICATIONS_DETAILS_ROUTE,
} from './notifications-details.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_DETAILS_ROUTE]}>
      <NotificationsDetailsPage />
    </MemoryRouter>,
  );
}

describe('NotificationsDetailsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_DETAILS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_DETAILS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_DETAILS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_DETAILS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${NOTIFICATIONS_DETAILS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsDetailsSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsDetailsSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_DETAILS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
