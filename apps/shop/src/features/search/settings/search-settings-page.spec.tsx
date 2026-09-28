import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchSettingsPage } from './search-settings-page';
import { SearchSettingsSummary } from './search-settings-summary';
import {
  SEARCH_SETTINGS_FEATURE,
  SEARCH_SETTINGS_ROUTE,
} from './search-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_SETTINGS_ROUTE]}>
      <SearchSettingsPage />
    </MemoryRouter>,
  );
}

describe('SearchSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<SearchSettingsSummary />);
    expect(
      screen.getByTestId(`${SEARCH_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
