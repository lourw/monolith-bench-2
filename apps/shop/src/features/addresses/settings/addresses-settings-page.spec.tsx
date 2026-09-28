import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AddressesSettingsPage } from './addresses-settings-page';
import { AddressesSettingsSummary } from './addresses-settings-summary';
import {
  ADDRESSES_SETTINGS_FEATURE,
  ADDRESSES_SETTINGS_ROUTE,
} from './addresses-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ADDRESSES_SETTINGS_ROUTE]}>
      <AddressesSettingsPage />
    </MemoryRouter>,
  );
}

describe('AddressesSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ADDRESSES_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ADDRESSES_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(ADDRESSES_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${ADDRESSES_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AddressesSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<AddressesSettingsSummary />);
    expect(
      screen.getByTestId(`${ADDRESSES_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
