import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsSettingsPage } from './returns-settings-page';
import { ReturnsSettingsSummary } from './returns-settings-summary';
import {
  RETURNS_SETTINGS_FEATURE,
  RETURNS_SETTINGS_ROUTE,
} from './returns-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_SETTINGS_ROUTE]}>
      <ReturnsSettingsPage />
    </MemoryRouter>,
  );
}

describe('ReturnsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RETURNS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RETURNS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsSettingsSummary />);
    expect(
      screen.getByTestId(`${RETURNS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
