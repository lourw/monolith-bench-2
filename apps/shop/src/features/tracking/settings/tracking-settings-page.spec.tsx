import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { TrackingSettingsPage } from './tracking-settings-page';
import { TrackingSettingsSummary } from './tracking-settings-summary';
import {
  TRACKING_SETTINGS_FEATURE,
  TRACKING_SETTINGS_ROUTE,
} from './tracking-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[TRACKING_SETTINGS_ROUTE]}>
      <TrackingSettingsPage />
    </MemoryRouter>,
  );
}

describe('TrackingSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(TRACKING_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      TRACKING_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(TRACKING_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${TRACKING_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('TrackingSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<TrackingSettingsSummary />);
    expect(
      screen.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
