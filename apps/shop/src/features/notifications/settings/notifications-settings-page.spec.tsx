import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsSettingsPage } from './notifications-settings-page';
import { NotificationsSettingsSummary } from './notifications-settings-summary';
import {
  NOTIFICATIONS_SETTINGS_FEATURE,
  NOTIFICATIONS_SETTINGS_ROUTE,
} from './notifications-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_SETTINGS_ROUTE]}>
      <NotificationsSettingsPage />
    </MemoryRouter>,
  );
}

describe('NotificationsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${NOTIFICATIONS_SETTINGS_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsSettingsSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
