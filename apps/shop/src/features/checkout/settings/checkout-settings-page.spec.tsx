import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutSettingsPage } from './checkout-settings-page';
import { CheckoutSettingsSummary } from './checkout-settings-summary';
import {
  CHECKOUT_SETTINGS_FEATURE,
  CHECKOUT_SETTINGS_ROUTE,
} from './checkout-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[CHECKOUT_SETTINGS_ROUTE]}>
      <CheckoutSettingsPage />
    </MemoryRouter>,
  );
}

describe('CheckoutSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(CHECKOUT_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      CHECKOUT_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(CHECKOUT_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${CHECKOUT_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CheckoutSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<CheckoutSettingsSummary />);
    expect(
      screen.getByTestId(`${CHECKOUT_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
