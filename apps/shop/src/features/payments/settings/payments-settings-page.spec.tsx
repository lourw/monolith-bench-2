import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsSettingsPage } from './payments-settings-page';
import { PaymentsSettingsSummary } from './payments-settings-summary';
import {
  PAYMENTS_SETTINGS_FEATURE,
  PAYMENTS_SETTINGS_ROUTE,
} from './payments-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_SETTINGS_ROUTE]}>
      <PaymentsSettingsPage />
    </MemoryRouter>,
  );
}

describe('PaymentsSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PAYMENTS_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsSettingsSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
