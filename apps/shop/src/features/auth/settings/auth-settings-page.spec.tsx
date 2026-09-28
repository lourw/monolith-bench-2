import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthSettingsPage } from './auth-settings-page';
import { AuthSettingsSummary } from './auth-settings-summary';
import {
  AUTH_SETTINGS_FEATURE,
  AUTH_SETTINGS_ROUTE,
} from './auth-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_SETTINGS_ROUTE]}>
      <AuthSettingsPage />
    </MemoryRouter>,
  );
}

describe('AuthSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(AUTH_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_SETTINGS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${AUTH_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<AuthSettingsSummary />);
    expect(
      screen.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
