import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CatalogSettingsPage } from './catalog-settings-page';
import { CatalogSettingsSummary } from './catalog-settings-summary';
import {
  CATALOG_SETTINGS_FEATURE,
  CATALOG_SETTINGS_ROUTE,
} from './catalog-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CATALOG_SETTINGS_ROUTE]}>
      <CatalogSettingsPage />
    </MemoryRouter>,
  );
}

describe('CatalogSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CATALOG_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CATALOG_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(CATALOG_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CATALOG_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CatalogSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<CatalogSettingsSummary />);
    expect(
      screen.getByTestId(`${CATALOG_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
