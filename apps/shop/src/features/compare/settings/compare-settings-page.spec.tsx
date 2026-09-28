import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareSettingsPage } from './compare-settings-page';
import { CompareSettingsSummary } from './compare-settings-summary';
import {
  COMPARE_SETTINGS_FEATURE,
  COMPARE_SETTINGS_ROUTE,
} from './compare-settings.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_SETTINGS_ROUTE]}>
      <CompareSettingsPage />
    </MemoryRouter>,
  );
}

describe('CompareSettingsPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(COMPARE_SETTINGS_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_SETTINGS_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_SETTINGS_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${COMPARE_SETTINGS_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareSettingsSummary', () => {
  it('renders the summary block', () => {
    render(<CompareSettingsSummary />);
    expect(
      screen.getByTestId(`${COMPARE_SETTINGS_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
