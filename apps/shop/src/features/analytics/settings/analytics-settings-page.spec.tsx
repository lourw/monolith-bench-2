import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AnalyticsSettingsPage } from './analytics-settings-page';
import { AnalyticsSettingsSummary } from './analytics-settings-summary';
import {
  ANALYTICS_SETTINGS_FEATURE,
  ANALYTICS_SETTINGS_ROUTE,
} from './analytics-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ANALYTICS_SETTINGS_ROUTE]}>
      <AnalyticsSettingsPage />
    </MemoryRouter>,
  );
}

describe('AnalyticsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ANALYTICS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ANALYTICS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(ANALYTICS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ANALYTICS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AnalyticsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<AnalyticsSettingsSummary />);
    expect(
      screen.getByTestId(`${ANALYTICS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
