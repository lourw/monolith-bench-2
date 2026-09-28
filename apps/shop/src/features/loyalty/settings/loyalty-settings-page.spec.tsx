import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltySettingsPage } from './loyalty-settings-page';
import { LoyaltySettingsSummary } from './loyalty-settings-summary';
import {
  LOYALTY_SETTINGS_FEATURE,
  LOYALTY_SETTINGS_ROUTE,
} from './loyalty-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_SETTINGS_ROUTE]}>
      <LoyaltySettingsPage />
    </MemoryRouter>,
  );
}

describe('LoyaltySettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${LOYALTY_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltySettingsSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltySettingsSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
