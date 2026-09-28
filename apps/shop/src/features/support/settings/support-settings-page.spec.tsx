import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SupportSettingsPage } from './support-settings-page';
import { SupportSettingsSummary } from './support-settings-summary';
import {
  SUPPORT_SETTINGS_FEATURE,
  SUPPORT_SETTINGS_ROUTE,
} from './support-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUPPORT_SETTINGS_ROUTE]}>
      <SupportSettingsPage />
    </MemoryRouter>,
  );
}

describe('SupportSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUPPORT_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUPPORT_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(SUPPORT_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUPPORT_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SupportSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<SupportSettingsSummary />);
    expect(
      screen.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
