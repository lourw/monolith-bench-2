import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BundlesSettingsPage } from './bundles-settings-page';
import { BundlesSettingsSummary } from './bundles-settings-summary';
import {
  BUNDLES_SETTINGS_FEATURE,
  BUNDLES_SETTINGS_ROUTE,
} from './bundles-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[BUNDLES_SETTINGS_ROUTE]}>
      <BundlesSettingsPage />
    </MemoryRouter>,
  );
}

describe('BundlesSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(BUNDLES_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      BUNDLES_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(BUNDLES_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${BUNDLES_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('BundlesSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<BundlesSettingsSummary />);
    expect(
      screen.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
