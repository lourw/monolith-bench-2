import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { InventorySettingsPage } from './inventory-settings-page';
import { InventorySettingsSummary } from './inventory-settings-summary';
import {
  INVENTORY_SETTINGS_FEATURE,
  INVENTORY_SETTINGS_ROUTE,
} from './inventory-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[INVENTORY_SETTINGS_ROUTE]}>
      <InventorySettingsPage />
    </MemoryRouter>,
  );
}

describe('InventorySettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(INVENTORY_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      INVENTORY_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(INVENTORY_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${INVENTORY_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('InventorySettingsSummary', () => {
  it('renders the summary block', () => {
    render(<InventorySettingsSummary />);
    expect(
      screen.getByTestId(`${INVENTORY_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
