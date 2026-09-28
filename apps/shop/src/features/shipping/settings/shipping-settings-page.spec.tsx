import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShippingSettingsPage } from './shipping-settings-page';
import { ShippingSettingsSummary } from './shipping-settings-summary';
import {
  SHIPPING_SETTINGS_FEATURE,
  SHIPPING_SETTINGS_ROUTE,
} from './shipping-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SHIPPING_SETTINGS_ROUTE]}>
      <ShippingSettingsPage />
    </MemoryRouter>,
  );
}

describe('ShippingSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SHIPPING_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SHIPPING_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(SHIPPING_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SHIPPING_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ShippingSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<ShippingSettingsSummary />);
    expect(
      screen.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
