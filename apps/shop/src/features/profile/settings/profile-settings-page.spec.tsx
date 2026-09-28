import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileSettingsPage } from './profile-settings-page';
import { ProfileSettingsSummary } from './profile-settings-summary';
import {
  PROFILE_SETTINGS_FEATURE,
  PROFILE_SETTINGS_ROUTE,
} from './profile-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_SETTINGS_ROUTE]}>
      <ProfileSettingsPage />
    </MemoryRouter>,
  );
}

describe('ProfileSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROFILE_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileSettingsSummary />);
    expect(
      screen.getByTestId(`${PROFILE_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
