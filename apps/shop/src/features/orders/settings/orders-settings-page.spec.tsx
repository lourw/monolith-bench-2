import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { OrdersSettingsPage } from './orders-settings-page';
import { OrdersSettingsSummary } from './orders-settings-summary';
import {
  ORDERS_SETTINGS_FEATURE,
  ORDERS_SETTINGS_ROUTE,
} from './orders-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ORDERS_SETTINGS_ROUTE]}>
      <OrdersSettingsPage />
    </MemoryRouter>,
  );
}

describe('OrdersSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ORDERS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ORDERS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(ORDERS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('OrdersSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<OrdersSettingsSummary />);
    expect(
      screen.getByTestId(`${ORDERS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
